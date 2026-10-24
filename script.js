// Song data
let songs = [];
let songMeta = {};
let feedbackMessages = [];
let specialFeedback = {};
let shownSpecialFeedback = new Set();
let choicesSinceFeedback = 0;
let nextFeedbackAt = 5;
let activeSongs = [];
let songMode = 'all'; // 'all' | 'title' | 'bside'
let maxComparisons;
let currentPairIndex = 0;
let wins = [];
let currentSongs = [];
let comparisonHistory = {};
let currentIdx1, currentIdx2;
let playerNickname = '';

// Escape user-entered text before injecting it into innerHTML
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

// Persist the player's nickname (shown on the exported result image)
function saveNickname(value) {
    playerNickname = (value || '').trim();
    localStorage.setItem('rv_nickname', playerNickname);
}

// Playback state — audios filled after DOM ready
// slotMode[i]: 'local' | 'youtube'
let songAudioModes = {};
let slotMode = [null, null];
let audios = [null, null];

// YouTube state
let ytPlayers = [null, null];
let ytPlayerReady = [false, false];
let ytPendingVideoId = [null, null];
let ytPendingPlay = [false, false];
let ytIdCache = {};

// Extract YouTube video ID from a URL or plain 11-char ID
function extractVideoId(input) {
    input = (input || '').trim();
    if (!input) return null;
    let m = input.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    m = input.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    m = input.match(/embed\/([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
    return null;
}

// Check which songs have local audio files
async function buildAudioModes() {
    await Promise.all(songs.map(async song => {
        if (!song.audio) { songAudioModes[song.name] = 'youtube'; return; }
        try {
            const controller = new AbortController();
            const r = await fetch(song.audio, { signal: controller.signal });
            controller.abort();
            songAudioModes[song.name] = r.ok ? 'local' : 'youtube';
        } catch(e) {
            songAudioModes[song.name] = e.name === 'AbortError' ? 'local' : 'youtube';
        }
    }));
}

// Called automatically by YouTube IFrame API script
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < 2; i++) {
        const idx = i;
        ytPlayers[idx] = new YT.Player('ytPlayer' + idx, {
            height: '180', width: '320',
            playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1, iv_load_policy: 3 },
            events: {
                onReady: () => {
                    ytPlayerReady[idx] = true;
                    if (ytPendingVideoId[idx]) {
                        ytPlayers[idx].cueVideoById(ytPendingVideoId[idx]);
                        ytPendingVideoId[idx] = null;
                    }
                    if (ytPendingPlay[idx]) {
                        ytPendingPlay[idx] = false;
                        togglePlay(idx, { stopPropagation() {} });
                    }
                },
                onStateChange: (e) => handleYtStateChange(idx, e),
                onError: (e) => handleYtError(idx, e.data)
            }
        });
    }
}

function handleYtError(index, code) {
    if (code === 150 || code === 101) {
        const songName = currentSongs[index]?.name;
        if (!songName) return;
        delete ytIdCache[songName];
        localStorage.setItem('rv_yt_cache', JSON.stringify(ytIdCache));
        const btn = document.getElementById('play' + (index + 1));
        if (btn) btn.style.display = 'none';
    }
}

function handleYtStateChange(index, event) {
    if (event.data === YT.PlayerState.ENDED) {
        const btn = document.getElementById('play' + (index + 1));
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
        document.body.classList.remove('playing');
    }
}

function cueVideo(playerIndex, videoId) {
    if (ytPlayerReady[playerIndex]) {
        try {
            ytPlayers[playerIndex].cueVideoById(videoId);
            ytPendingVideoId[playerIndex] = null;
        } catch(e) {
            ytPendingVideoId[playerIndex] = videoId;
        }
    } else {
        ytPendingVideoId[playerIndex] = videoId;
    }
}

function stopAllVideos() {
    for (let i = 0; i < 2; i++) {
        ytPendingPlay[i] = false;
        if (slotMode[i] === 'local') {
            audios[i].pause();
            audios[i].currentTime = 0;
        } else if (ytPlayers[i] && ytPlayerReady[i]) {
            try { ytPlayers[i].stopVideo(); } catch(e) {}
        }
        const btn = document.getElementById('play' + (i + 1));
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    }
    document.body.classList.remove('playing');
}

function pauseOther(activeIndex) {
    const other = 1 - activeIndex;
    ytPendingPlay[other] = false;
    if (slotMode[other] === 'local') {
        audios[other].pause();
    } else if (ytPlayers[other] && ytPlayerReady[other]) {
        try { ytPlayers[other].pauseVideo(); } catch(e) {}
    }
    const otherBtn = document.getElementById('play' + (other + 1));
    if (otherBtn) otherBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Load songs from JSON
async function loadSongs() {
    try {
        // All song data lives in data.js (window.APP_DATA), loaded via a
        // <script> tag so it works over http(s) and when opening the file
        // directly (file://), where fetch() of local files is blocked.
        if (!window.APP_DATA) throw new Error('data.js not loaded');
        const data = window.APP_DATA.songs;
        const feedbackData = window.APP_DATA.feedback;
        songMeta = window.APP_DATA.songMeta;
        buildAlbumMarquee(data.albums);
        feedbackMessages = feedbackData.messages || [];
        specialFeedback  = feedbackData.specialFeedback || {};
        songs = data.songs.map(song => ({
            name: song.title,
            audio: song.audio || null,
            ytId: song.ytId || null,
            cover: data.albums.find(album => album.id === song.albumId)?.cover || 'covers/default.png',
            rating: 1200,
            isTitleSong: !!song.isTitleSong
        }));
        songs = songs.sort(() => Math.random() - 0.5);
        wins = new Array(songs.length).fill(0);

        await buildAudioModes();
        rebuildSongPool();

        // Load cached YouTube IDs from localStorage
        const cached = localStorage.getItem('rv_yt_cache');
        if (cached) {
            try { ytIdCache = JSON.parse(cached); } catch(e) { ytIdCache = {}; }
        }

        // Merge ytId from data.js (takes precedence over localStorage)
        songs.forEach(song => {
            if (song.ytId) ytIdCache[song.name] = song.ytId;
        });
        localStorage.setItem('rv_yt_cache', JSON.stringify(ytIdCache));

        rebuildSongPool();
        updateModeHint();
        init();
    } catch (error) {
        console.error('Error loading songs:', error);
        alert('無法載入歌曲資料');
    }
}

// YouTube URL management UI
function openUrlManage() {
    renderUrlManage();
    document.getElementById('url-manage-overlay').classList.remove('hidden');
}

function closeUrlManage() {
    document.getElementById('url-manage-overlay').classList.add('hidden');
}

function renderUrlManage() {
    const list = document.getElementById('url-song-list');
    list.innerHTML = songs.map(song => {
        const mode = songAudioModes[song.name] || 'youtube';
        const ytId = ytIdCache[song.name] || '';
        const statusClass = mode === 'local' ? 'local' : (ytId ? 'youtube' : 'none');
        const statusText  = mode === 'local' ? '本機音訊' : (ytId ? 'YouTube ✓' : '未設定');
        const safeId = ytId.replace(/"/g, '&quot;');
        const safeName = song.name.replace(/"/g, '&quot;');
        return `
            <div class="url-song-row">
                <span class="url-song-name" title="${safeName}">${song.name}</span>
                <span class="url-song-status ${statusClass}">${statusText}</span>
                <input class="url-song-input" type="text"
                    placeholder="貼上 YouTube 網址"
                    value="${safeId}"
                    data-song="${safeName}"
                    onchange="saveYtUrl(this.dataset.song, this.value, this)">
            </div>
        `;
    }).join('');
}

function saveYtUrl(songName, urlOrId, inputEl) {
    const videoId = extractVideoId(urlOrId);
    if (urlOrId.trim() && !videoId) {
        inputEl.style.borderColor = '#e91e63';
        return;
    }
    if (videoId) {
        ytIdCache[songName] = videoId;
        inputEl.value = videoId;
        inputEl.style.borderColor = '#4caf50';
    } else {
        delete ytIdCache[songName];
        inputEl.style.borderColor = '#eee';
    }
    localStorage.setItem('rv_yt_cache', JSON.stringify(ytIdCache));

    // Update status badge without re-rendering the whole list
    const row = inputEl.closest('.url-song-row');
    const badge = row.querySelector('.url-song-status');
    const mode = songAudioModes[songName] || 'youtube';
    if (mode === 'local') {
        badge.className = 'url-song-status local';
        badge.textContent = '本機音訊';
    } else if (videoId) {
        badge.className = 'url-song-status youtube';
        badge.textContent = 'YouTube ✓';
    } else {
        badge.className = 'url-song-status none';
        badge.textContent = '未設定';
    }
}

// Progress persistence
function saveProgress() {
    const session = {
        songMode,
        songOrder: activeSongs.map(s => s.name),
        ratings: Object.fromEntries(activeSongs.map(s => [s.name, s.rating])),
        comparisonHistory: { ...comparisonHistory },
        currentPairIndex,
        maxComparisons
    };
    localStorage.setItem('rv_progress', JSON.stringify(session));
}

function clearProgress() {
    localStorage.removeItem('rv_progress');
}

function getSavedProgress() {
    try {
        const raw = localStorage.getItem('rv_progress');
        if (!raw) return null;
        const s = JSON.parse(raw);
        return (s.currentPairIndex > 0 && s.currentPairIndex < s.maxComparisons) ? s : null;
    } catch(e) { return null; }
}

function restoreProgress(saved) {
    songMode = saved.songMode || 'all';
    const radio = document.querySelector(`input[name="song-mode"][value="${songMode}"]`);
    if (radio) radio.checked = true;
    updateModeHint();

    songs.forEach(s => {
        if (saved.ratings[s.name] !== undefined) s.rating = saved.ratings[s.name];
    });

    rebuildSongPool();
    const nameToSong = Object.fromEntries(activeSongs.map(s => [s.name, s]));
    const reordered = saved.songOrder.map(n => nameToSong[n]).filter(Boolean);
    if (reordered.length >= 2) activeSongs = reordered;

    comparisonHistory = saved.comparisonHistory || {};
    currentPairIndex = saved.currentPairIndex;
    maxComparisons = saved.maxComparisons;
}

function continueComparison() {
    undoState = null;
    lastStageIndex = -1;
    resetMoodOrbs();
    document.body.classList.add('comparing');
    document.getElementById('undo-btn').style.display = 'none';
    const saved = getSavedProgress();
    if (!saved) { beginComparison(); return; }
    restoreProgress(saved);
    document.getElementById('start-screen').classList.add('hidden');
    showScreen(document.getElementById('comparison-view'));
    loadPair();
}

function getActiveSongPool() {
    if (songMode === 'title') return songs.filter(s => s.isTitleSong);
    if (songMode === 'bside') return songs.filter(s => !s.isTitleSong);
    return songs;
}

function rebuildSongPool() {
    activeSongs = getActiveSongPool();
    maxComparisons = Math.round(activeSongs.length * 1.5);
    if (maxComparisons < 1 && activeSongs.length >= 2) maxComparisons = 1;
}

function setSongMode(mode) {
    songMode = mode;
    localStorage.setItem('rv_song_mode', mode);
    updateModeHint();
}

function updateModeHint() {
    const counts = {
        all:   Math.round(songs.length * 1.5),
        title: Math.round(songs.filter(s => s.isTitleSong).length * 1.5),
        bside: Math.round(songs.filter(s => !s.isTitleSong).length * 1.5),
    };
    const el = document.getElementById('mode-hint');
    if (el) el.textContent = `約 ${counts[songMode]} 輪比較`;
}

function beginComparison() {
    undoState = null;
    lastStageIndex = -1;
    choicesSinceFeedback = 0;
    nextFeedbackAt = Math.floor(Math.random() * 3) + 4;
    shownSpecialFeedback = new Set();
    clearProgress();
    rebuildSongPool();
    if (activeSongs.length < 2) {
        alert('目前沒有足夠的歌曲可比較，請確認資料是否正確。');
        return;
    }
    currentPairIndex = 0;
    comparisonHistory = {};
    songs.forEach(song => song.rating = 1200);
    resetMoodOrbs();
    document.body.classList.add('comparing');
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('ranking-view').classList.add('hidden');
    showScreen(document.getElementById('comparison-view'));
    loadPair();
}

function smartSelectPair() {
    let bestI = 0, bestJ = 1, bestScore = Infinity;
    for (let i = 0; i < activeSongs.length; i++) {
        for (let j = i + 1; j < activeSongs.length; j++) {
            const key = i + '-' + j;
            const timesCompared = comparisonHistory[key] || 0;
            const ratingDiff = Math.abs(activeSongs[i].rating - activeSongs[j].rating);
            const score = ratingDiff + timesCompared * 500;
            if (score < bestScore) {
                bestScore = score;
                bestI = i;
                bestJ = j;
            }
        }
    }
    return [bestI, bestJ];
}

function init() {
    const saved = getSavedProgress();
    const area = document.getElementById('continue-area');
    const hint = document.getElementById('continue-hint');
    if (saved) {
        area.classList.remove('hidden');
        const modeText = saved.songMode === 'title' ? '主打歌' : saved.songMode === 'bside' ? '收錄曲' : '全部歌曲';
        hint.textContent = `上次進度：${saved.currentPairIndex} / ${saved.maxComparisons} 輪（${modeText}）`;
    } else {
        area.classList.add('hidden');
    }
    document.getElementById('comparison-view').style.display = 'none';
    showScreen(document.getElementById('start-screen'));
}

let undoState = null;

// Tournament framing for the comparison progress bar — purely cosmetic staging
// over the same Elo pairwise engine, not a real elimination bracket.
const TOURNAMENT_STAGES = [
    { icon: 'fa-flag-checkered', label: '資格賽',  threshold: 0 },
    { icon: 'fa-fire', label: '16強賽', threshold: 0.25 },
    { icon: 'fa-bolt', label: '8強賽',  threshold: 0.5 },
    { icon: 'fa-trophy', label: '準決賽', threshold: 0.75 },
    { icon: 'fa-crown', label: '冠軍戰', threshold: 0.95 },
];
let lastStageIndex = -1;

function getStageIndex(progressFraction) {
    let idx = 0;
    for (let i = 0; i < TOURNAMENT_STAGES.length; i++) {
        if (progressFraction >= TOURNAMENT_STAGES[i].threshold) idx = i;
    }
    return idx;
}

function updateStageUI(progressFraction) {
    const showStages = songMode !== 'title';
    const badge = document.getElementById('stage-badge');
    const track = document.getElementById('stage-tracker');
    const announcement = document.getElementById('stage-announce');
    [badge, track, announcement].forEach(el => {
        if (el) el.style.display = showStages ? '' : 'none';
    });
    if (!showStages) {
        lastStageIndex = -1;
        if (announcement) announcement.classList.remove('show');
        document.querySelectorAll('.confetti-particle').forEach(el => el.remove());
        return;
    }

    const idx = getStageIndex(progressFraction);
    const stage = TOURNAMENT_STAGES[idx];

    if (badge) badge.innerHTML = `<i class="fas ${stage.icon} fa-fw" aria-hidden="true"></i> ${stage.label}`;

    if (track) {
        const fillPercent = (idx / (TOURNAMENT_STAGES.length - 1)) * 100;
        track.innerHTML = `
            <div class="stage-track-line-bg"></div>
            <div class="stage-track-line-fill" style="width:${fillPercent}%"></div>
            ${TOURNAMENT_STAGES.map((s, i) => {
                const state = i < idx ? 'done' : i === idx ? 'active' : 'upcoming';
                return `
                    <div class="stage-node ${state}">
                        <span class="stage-node-icon"><i class="fas ${i < idx ? 'fa-check' : s.icon}" aria-hidden="true"></i></span>
                        <span class="stage-node-label">${s.label}</span>
                    </div>
                `;
            }).join('')}
        `;
    }

    if (lastStageIndex === -1) {
        lastStageIndex = idx;
    } else if (idx > lastStageIndex) {
        lastStageIndex = idx;
        announceStageAdvance(stage);
    }
}

const CONFETTI_EMOJIS = ['🎉', '✨', '⭐', '🔥'];

function spawnConfetti() {
    for (let i = 0; i < 12; i++) {
        const span = document.createElement('span');
        span.className = 'confetti-particle';
        span.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 90;
        span.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        span.style.setProperty('--dy', Math.sin(angle) * dist - 40 + 'px');
        span.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
        span.style.animationDelay = (Math.random() * 0.15) + 's';
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1600);
    }
}

function announceStageAdvance(stage) {
    const el = document.getElementById('stage-announce');
    if (!el) return;
    el.innerHTML = `<i class="fas ${stage.icon} fa-fw" aria-hidden="true"></i> 晉級 ${stage.label}！`;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    spawnConfetti();
}

// Live background mood (desktop only — the orb layer this drives is hidden
// on mobile via CSS). moodBalance drifts from +1 (Red) to -1 (Velvet) as an
// exponential moving average of each pick's side, so the tint eases in/out
// instead of snapping.
let moodBalance = 0;

function sideBias(songName) {
    const side = songMeta[songName] && songMeta[songName].side;
    if (side === 'Red') return 1;
    if (side === 'Velvet') return -1;
    return 0;
}

function updateMoodOrbs(delta) {
    moodBalance = moodBalance * 0.85 + delta * 0.15;
    const velvetMix = Math.min(1, Math.max(0, -moodBalance));
    const orbs = document.getElementById('bg-orbs');
    if (orbs) orbs.style.setProperty('--velvet-mix', velvetMix.toFixed(3));
}

function resetMoodOrbs() {
    moodBalance = 0;
    const orbs = document.getElementById('bg-orbs');
    if (orbs) orbs.style.setProperty('--velvet-mix', 0);
}

function renderPair() {
    currentSongs = [activeSongs[currentIdx1], activeSongs[currentIdx2]];

    document.getElementById('title1').textContent = currentSongs[0].name;
    document.getElementById('cover1').src = currentSongs[0].cover;
    document.getElementById('title2').textContent = currentSongs[1].name;
    document.getElementById('cover2').src = currentSongs[1].cover;
    document.getElementById('progress-text').textContent = `${currentPairIndex + 1} / ${maxComparisons}`;
    const progressPercent = ((currentPairIndex + 1) / maxComparisons) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    updateStageUI(progressPercent / 100);

    for (let i = 0; i < 2; i++) {
        const song = currentSongs[i];
        const mode = songAudioModes[song.name] || 'youtube';
        slotMode[i] = mode;

        const btn = document.getElementById('play' + (i + 1));
        btn.innerHTML = '<i class="fas fa-play"></i>';

        if (mode === 'local') {
            audios[i].src = song.audio;
            btn.style.display = '';
        } else {
            const ytId = ytIdCache[song.name];
            btn.style.display = ytId ? '' : 'none';
            if (ytId) cueVideo(i, ytId);
        }
    }
}

function loadPair() {
    if (activeSongs.length < 2 || currentPairIndex >= maxComparisons) {
        finishRanking();
        return;
    }
    [currentIdx1, currentIdx2] = smartSelectPair();
    renderPair();
}

// result: 'song1' (left wins), 'song2' (right wins), or 'tie' (both loved, skip)
function applyComparison(result) {
    const idx1 = currentIdx1, idx2 = currentIdx2;
    const pairKey = Math.min(idx1, idx2) + '-' + Math.max(idx1, idx2);

    // Save snapshot for undo (before any mutation)
    undoState = {
        idx1, idx2,
        rating1: activeSongs[idx1].rating,
        rating2: activeSongs[idx2].rating,
        pairKey,
        prevPairCount: comparisonHistory[pairKey] || 0,
        prevPairIndex: currentPairIndex,
        prevMoodBalance: moodBalance
    };
    document.getElementById('undo-btn').style.display = '';

    comparisonHistory[pairKey] = (comparisonHistory[pairKey] || 0) + 1;

    const song1 = activeSongs[idx1];
    const song2 = activeSongs[idx2];
    const expected1 = 1 / (1 + Math.pow(10, (song2.rating - song1.rating) / 400));
    const expected2 = 1 - expected1;
    const actual1 = result === 'song1' ? 1 : result === 'song2' ? 0 : 0.5;
    const actual2 = 1 - actual1;
    const k = 64 - (currentPairIndex / maxComparisons) * 48;
    song1.rating += k * (actual1 - expected1);
    song2.rating += k * (actual2 - expected2);

    currentPairIndex++;

    if (result === 'tie') {
        updateMoodOrbs(0);
        showFeedback('都很棒，先讓它們平手繼續比！');
    } else {
        const winnerIdx = result === 'song1' ? idx1 : idx2;
        const winnerName = activeSongs[winnerIdx].name;
        updateMoodOrbs(sideBias(winnerName));
        const specialMsgs = specialFeedback[winnerName];
        if (songMode === 'all' && specialMsgs?.length && !shownSpecialFeedback.has(winnerName)) {
            showFeedback(specialMsgs[Math.floor(Math.random() * specialMsgs.length)]);
            shownSpecialFeedback.add(winnerName);
        } else if (songMode === 'all') {
            choicesSinceFeedback++;
            if (choicesSinceFeedback >= nextFeedbackAt && feedbackMessages.length > 0) {
                showFeedback(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
                choicesSinceFeedback = 0;
                nextFeedbackAt = Math.floor(Math.random() * 3) + 4;
            }
        }
    }
    stopAllVideos();
    saveProgress();
    loadPair();
}

function selectSong(index) {
    applyComparison(index === 0 ? 'song1' : 'song2');
}

function skipPair() {
    applyComparison('tie');
}

// Keyboard shortcuts: left/right/AD to pick, ZX to toggle playback, S/down to skip, W/up to undo
function handleComparisonKeydown(e) {
    const view = document.getElementById('comparison-view');
    if (!view || view.style.display === 'none') return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement?.isContentEditable) return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;

    switch (e.key) {
        case 'z':
        case 'Z':
        case 'x':
        case 'X': {
            if (e.repeat) return;
            const index = e.key.toLowerCase() === 'z' ? 0 : 1;
            const btn = document.getElementById('play' + (index + 1));
            if (!currentSongs[index] || !btn || btn.disabled || btn.style.display === 'none') return;
            e.preventDefault();
            togglePlay(index, e);
            break;
        }
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            selectSong(0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            selectSong(1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            skipPair();
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            undoLastChoice();
            break;
    }
}
document.addEventListener('keydown', handleComparisonKeydown);

function showScreen(el) {
    el.classList.remove('hidden');
    if (el.id !== 'start-screen') el.style.display = 'block';
    el.classList.remove('screen-enter');
    void el.offsetWidth;
    el.classList.add('screen-enter');
}

function goToStart() {
    stopAllVideos();
    document.body.classList.remove('comparing');
    document.getElementById('comparison-view').style.display = 'none';
    document.getElementById('ranking-view').classList.add('hidden');
    showScreen(document.getElementById('start-screen'));
    const saved = getSavedProgress();
    const area = document.getElementById('continue-area');
    const hint = document.getElementById('continue-hint');
    if (saved) {
        area.classList.remove('hidden');
        const modeText = saved.songMode === 'title' ? '主打歌' : saved.songMode === 'bside' ? '收錄曲' : '全部歌曲';
        hint.textContent = `上次進度：${saved.currentPairIndex} / ${saved.maxComparisons} 輪（${modeText}）`;
    } else {
        area.classList.add('hidden');
    }
}

function openYouTubePlaylist() {
    const ranked = JSON.parse(localStorage.getItem('rv_ranking') || '[]');
    const videoIds = ranked
        .map(song => ytIdCache[song.name])
        .filter(Boolean)
        .slice(0, 50); // YouTube watch_videos 上限

    const btn = document.getElementById('yt-playlist-btn');

    if (videoIds.length === 0) {
        btn.textContent = '沒有可用的影片連結';
        setTimeout(() => {
            btn.innerHTML = '<i class="fab fa-youtube"></i> YouTube 播放清單';
        }, 2000);
        return;
    }

    const url = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
    window.open(url, '_blank');
}

function buildAlbumMarquee(albums) {
    const track = document.getElementById('marquee-track');
    if (!track || !albums?.length) return;
    const imgs = albums.map(a =>
        `<img src="${a.cover}" alt="${a.name}" title="${a.name}" onerror="this.style.display='none'">`
    ).join('');
    track.innerHTML = imgs + imgs;
}

function showFeedback(msg) {
    const el = document.getElementById('feedback-msg');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');
}

function undoLastChoice() {
    if (!undoState) return;

    // Restore ratings
    activeSongs[undoState.idx1].rating = undoState.rating1;
    activeSongs[undoState.idx2].rating = undoState.rating2;

    // Restore comparison history
    if (undoState.prevPairCount === 0) {
        delete comparisonHistory[undoState.pairKey];
    } else {
        comparisonHistory[undoState.pairKey] = undoState.prevPairCount;
    }

    // Restore pair and index
    currentIdx1 = undoState.idx1;
    currentIdx2 = undoState.idx2;
    currentPairIndex = undoState.prevPairIndex;
    moodBalance = undoState.prevMoodBalance;
    const orbs = document.getElementById('bg-orbs');
    if (orbs) orbs.style.setProperty('--velvet-mix', Math.min(1, Math.max(0, -moodBalance)).toFixed(3));
    undoState = null;

    document.getElementById('undo-btn').style.display = 'none';
    stopAllVideos();
    renderPair();
    saveProgress();
}

function togglePlay(index, event) {
    event.stopPropagation();
    const btn = document.getElementById('play' + (index + 1));
    const mode = slotMode[index];

    if (mode === 'local') {
        const audio = audios[index];
        if (!audio) return;
        if (audio.paused) {
            pauseOther(index);
            audio.play();
            btn.innerHTML = '<i class="fas fa-pause"></i>';
            document.body.classList.add('playing');
        } else {
            audio.pause();
            btn.innerHTML = '<i class="fas fa-play"></i>';
            document.body.classList.remove('playing');
        }
    } else {
        const videoId = ytIdCache[currentSongs[index].name];
        if (!videoId) return;

        const player = ytPlayers[index];
        // Keep playback in this page, including clicks made while the API loads.
        if (!player || !ytPlayerReady[index]) {
            const shouldPlay = !ytPendingPlay[index];
            pauseOther(index);
            ytPendingVideoId[index] = videoId;
            ytPendingPlay[index] = shouldPlay;
            btn.innerHTML = shouldPlay
                ? '<i class="fas fa-spinner fa-spin"></i>'
                : '<i class="fas fa-play"></i>';
            return;
        }

        let state;
        try { state = player.getPlayerState(); } catch(e) { return; }

        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            btn.innerHTML = '<i class="fas fa-play"></i>';
            document.body.classList.remove('playing');
        } else {
            pauseOther(index);
            try { player.unMute(); player.setVolume(100); } catch(e) {}
            if (state === YT.PlayerState.CUED || state === YT.PlayerState.PAUSED) {
                player.playVideo();
            } else {
                player.loadVideoById(videoId);
            }
            btn.innerHTML = '<i class="fas fa-pause"></i>';
            document.body.classList.add('playing');
        }
    }
}

function finishRanking() {
    clearProgress();
    document.body.classList.remove('comparing');
    const ranked = activeSongs.slice().sort((a, b) => b.rating - a.rating);
    localStorage.setItem('rv_ranking', JSON.stringify(ranked));
    displayRanking(ranked);
}


const vibeLabel = {
    bright:"明亮開朗", energetic:"活力充沛", emotional:"感性抒情",
    sophisticated:"精緻成熟", cool:"帥氣冷酷", quirky:"個性獨特",
    dark:"暗黑神秘", rnb:"R&B 韻味", retro:"復古懷舊", dreamy:"夢幻飄逸",
};
const tempoLabel = { fast:"快節奏", mid:"中板", slow:"慢板抒情" };
const sideLabel  = { Red:"活潑的 Red side", Velvet:"感性的 Velvet side", Both:"Red / Velvet 皆愛" };

function generateAnalysis(ranked) {
    const topN    = Math.ceil(ranked.length / 2);
    const topSongs = ranked.slice(0, topN);

    const tempoCount  = {};
    const vibeCount   = {};
    const sideCount   = {};
    const albumCount  = {};

    topSongs.forEach(song => {
        const meta = songMeta[song.name];
        if (!meta) return;
        tempoCount[meta.tempo] = (tempoCount[meta.tempo] || 0) + 1;
        sideCount[meta.side]   = (sideCount[meta.side]   || 0) + 1;
        meta.vibe.forEach(v   => { vibeCount[v]  = (vibeCount[v]  || 0) + 1; });
        if (meta.album) albumCount[meta.album] = (albumCount[meta.album] || 0) + 1;
    });

    const top = obj => Object.entries(obj).sort((a,b) => b[1]-a[1])[0];

    const topTempo  = top(tempoCount);
    const topVibe   = top(vibeCount);
    const topSide   = top(sideCount);
    const topAlbum  = top(albumCount);

    const total = topSongs.filter(s => songMeta[s.name]).length;
    const redPct    = Math.round(((sideCount['Red']    || 0) + (sideCount['Both'] || 0) * 0.5) / total * 100);
    const velvetPct = 100 - redPct;

    const cards = [
        { icon:"🎵", label:"節奏偏好",   value: tempoLabel[topTempo[0]] },
        { icon:"✨", label:"音樂風格",   value: vibeLabel[topVibe[0]] || topVibe[0] },
        { icon:"🔴", label:"曲風派系",   value: sideLabel[topSide[0]] },
        { icon:"📊", label:"Red / Velvet", value: `Red ${redPct}%  ·  Velvet ${velvetPct}% ` },
        { icon:"💿", label:"最愛專輯",   value: topAlbum ? topAlbum[0] : "—" },
    ];

    const html = `
        <div class="analysis-box">
            <div class="analysis-title">✨ 我的音樂偏好分析</div>
            <div class="analysis-sub">根據你排名前 ${topN} 首歌曲分析</div>
            <div class="analysis-cards">
                ${cards.map(c => `
                    <div class="analysis-card">
                        <span class="analysis-icon">${c.icon}</span>
                        <span class="analysis-label">${c.label}</span>
                        <span class="analysis-value">${c.value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('analysis-container').innerHTML = html;

    setTheme(velvetPct > redPct ? 'velvet' : 'red');
}

// Apply a theme to both <body> (for styling) and <html> (so the iOS canvas
// background matches even on browsers without :has() support).
function setTheme(name) {
    const themed = name ? ['theme-' + name] : [];
    [document.body, document.documentElement].forEach(el => {
        el.classList.remove('theme-red', 'theme-velvet');
        if (themed.length) el.classList.add(themed[0]);
    });
}

function displayRanking(ranked) {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('comparison-view').style.display = 'none';
    showScreen(document.getElementById('ranking-view'));
    const list = document.getElementById('ranking-list');
    list.innerHTML = '';
    ranked.forEach((song, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1} - ${song.name}`;
        list.appendChild(li);
    });
    generateAnalysis(ranked);
}

function restart() {
    undoState = null;
    clearProgress();
    localStorage.removeItem('rv_ranking');
    songs.forEach(song => song.rating = 1200);
    currentPairIndex = 0;
    comparisonHistory = {};
    rebuildSongPool();
    setTheme(null);
    resetMoodOrbs();
    document.body.classList.add('comparing');
    stopAllVideos();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('ranking-view').classList.add('hidden');
    showScreen(document.getElementById('comparison-view'));
    loadPair();
}

async function exportImage() {
    const btn = document.getElementById('export-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';

    // Phones can't reliably download via <a download> on a data: URL (iOS
    // Safari ignores it outright, mobile Chrome is inconsistent) — open the
    // image in a new tab instead so the user can long-press it and choose
    // "Save Image". The tab must be opened synchronously inside this click
    // handler, or Safari blocks it as a popup once the async render below
    // finishes.
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const mobileWin = isMobile ? window.open('', '_blank') : null;
    if (mobileWin) {
        mobileWin.document.write('<title>產生圖片中…</title><body style="margin:0;background:#111;color:#fff;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">圖片生成中…</body>');
    }

    const ranked = (JSON.parse(localStorage.getItem('rv_ranking')) || []).slice(0, 15);
    const isVelvet = document.body.classList.contains('theme-velvet');

    // If a nickname was entered, personalise the title; otherwise keep the default.
    const nickname = (playerNickname || localStorage.getItem('rv_nickname') || '').trim();
    const titleText = nickname ? `${escapeHtml(nickname)}'s Song Ranking` : 'My Song Ranking';

    const theme = isVelvet ? {
        bg:          'linear-gradient(150deg, #1a0a2a, #3a1550)',
        titleColor:  '#c98aff',
        subtitleColor:'#e8d5f5',
        labelColor:  '#8a6aaa',
        itemBg:      'rgba(255,255,255,0.08)',
        itemColor:   '#e8d5f5',
        rankColor:   '#c98aff',
        medalColors: ['rgba(180,120,255,0.6)', 'rgba(120,180,255,0.5)', 'rgba(160,100,220,0.5)'],
        footerColor: '#8a6aaa',
    } : {
        bg:          'linear-gradient(150deg, #fff5f5, #ffc4c4)',
        titleColor:  '#FF9797',
        subtitleColor:'#333',
        labelColor:  '#aaa',
        itemBg:      'white',
        itemColor:   '#494949',
        rankColor:   '#FF9797',
        medalColors: ['#ff9595', '#60dae3', '#c7a1ff'],
        footerColor: '#ffb3b3',
    };
    const medalText = ['🏆', '🥈', '🥉'];

    const card = document.createElement('div');
    card.style.cssText = `
        position: fixed; left: -9999px; top: 0;
        width: 420px; padding: 32px;
        background: ${theme.bg};
        font-family: Arial, sans-serif; box-sizing: border-box;
    `;
    card.innerHTML = `
        <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:13px;letter-spacing:3px;color:${theme.titleColor};font-weight:bold;">RED VELVET</div>
            <div style="font-size:20px;font-weight:bold;color:${theme.subtitleColor};margin-top:4px;">${titleText}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
            ${ranked.map((song, i) => `
                <div style="
                    display:flex;align-items:center;gap:12px;
                    padding:10px 14px;border-radius:12px;
                    background:${i < 3 ? theme.medalColors[i] : theme.itemBg};
                    box-shadow:0 2px 6px rgba(0,0,0,0.12);
                ">
                    <span style="font-size:18px;min-width:28px;text-align:center;">
                        ${i < 3 ? medalText[i] : `<span style="color:${theme.rankColor};font-weight:bold;">${i + 1}</span>`}
                    </span>
                    <span style="font-size:16px;color:${theme.itemColor};">${song.name}</span>
                </div>
            `).join('')}
        </div>
        <div style="text-align:center;margin-top:20px;font-size:11px;color:${theme.footerColor};letter-spacing:1px;">
            RV Song Ranker by Pachi
        </div>
    `;

    document.body.appendChild(card);
    try {
        const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: null });
        const dataUrl = canvas.toDataURL('image/png');
        const filePrefix = nickname.replace(/[^\w一-龥-]/g, '_').slice(0, 20);
        const fileName = (filePrefix ? filePrefix + '_' : '') + 'rv_ranking.png';

        if (mobileWin && !mobileWin.closed) {
            mobileWin.document.open();
            mobileWin.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(fileName)}</title><style>body{margin:0;background:#111;display:flex;flex-direction:column;align-items:center;font-family:Arial,sans-serif;}img{width:100%;max-width:480px;display:block;}p{color:#fff;text-align:center;padding:14px 20px;margin:0;font-size:14px;line-height:1.6;}</style></head><body><img src="${dataUrl}" alt="${escapeHtml(fileName)}"><p>長按圖片選擇「儲存圖片」即可下載<br>Long-press the image and choose "Save Image"</p></body></html>`);
            mobileWin.document.close();
        } else {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        }
    } finally {
        document.body.removeChild(card);
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i> Save Results';
    }
}

window.onload = () => {
    songMode = localStorage.getItem('rv_song_mode') || 'all';
    const radio = document.querySelector(`input[name="song-mode"][value="${songMode}"]`);
    if (radio) radio.checked = true;

    // Restore previously entered nickname
    playerNickname = localStorage.getItem('rv_nickname') || '';
    const nicknameInput = document.getElementById('nickname-input');
    if (nicknameInput) nicknameInput.value = playerNickname;

    audios = [document.getElementById('audio1'), document.getElementById('audio2')];
    // Reset play button when local audio finishes
    [0, 1].forEach(i => {
        audios[i].addEventListener('ended', () => {
            document.getElementById('play' + (i + 1)).innerHTML = '<i class="fas fa-play"></i>';
            document.body.classList.remove('playing');
        });
    });
    loadSongs();
};

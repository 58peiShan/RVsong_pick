// Single source of truth for all song data.
// Loaded via a <script> tag in index.html so the app works even when opening
// index.html directly (file://), where fetch() of local files is blocked.
// Edit the data below directly:
//   - songs:    albums + song list (title / albumId / ytId / isTitleSong ...)
//   - songMeta: per-song tempo / vibe / side / album (used for the analysis)
//   - feedback: encouragement messages + special per-song feedback
window.APP_DATA = {
  songs: {
    "albums": [
        {
            "id": "WishTree",
            "name": "WishTree",
            "year": 2015,
            "cover": "covers/WishTree.jpg"
        },
        {
            "id": "Happiness",
            "name": "Happiness",
            "year": 2014,
            "cover": "covers/Happiness.png"
        },
        {
            "id": "BeNatural",
            "name": "Be Natural",
            "year": 2014,
            "cover": "covers/BeNatural.png"
        },
        {
            "id": "IceCreamCake",
            "name": "Ice Cream Cake",
            "year": 2015,
            "cover": "covers/IceCreamCake.png"
        },
        {
            "id": "TheRed",
            "name": "The Red",
            "year": 2015,
            "cover": "covers/TheRed.png"
        },
        {
            "id": "TheVelvet",
            "name": "The Velvet",
            "year": 2016,
            "cover": "covers/TheVelvet.png"
        },
        {
            "id": "RussianRoulette",
            "name": "Russian Roulette",
            "year": 2016,
            "cover": "covers/RussianRoulette.jpg"
        },
        {
            "id": "Rookie",
            "name": "Rookie",
            "year": 2017,
            "cover": "covers/Rookie.jpg"
        },
        {
            "id": "Rebirth",
            "name": "Rebirth",
            "year": 2017,
            "cover": "covers/rebirth.png"
        },
        {
            "id": "TheRedSummer",
            "name": "The Red Summer",
            "year": 2017,
            "cover": "covers/TheRedSummer.png"
        },
        {
            "id": "PerfectVelvet",
            "name": "Perfect Velvet",
            "year": 2017,
            "cover": "covers/PerfectVelvet.png"
        },
        {
            "id": "ThePerfectRedVelvet",
            "name": "The Perfect Red Velvet",
            "year": 2018,
            "cover": "covers/ThePerfectRedVelvet.png"
        },
        {
            "id": "CookieJar",
            "name": "#Cookie Jar",
            "year": 2018,
            "cover": "covers/CookieJar.png"
        },
        {
            "id": "Bloom",
            "name": "Bloom",
            "year": 2018,
            "cover": "covers/Bloom.jpeg"
        },
        {
            "id": "SummerMagic",
            "name": "Summer Magic",
            "year": 2018,
            "cover": "covers/SummerMagic.png"
        },
        {
            "id": "RBB",
            "name": "RBB",
            "year": 2018,
            "cover": "covers/RBB.png"
        },
        {
            "id": "TheReVeFestivalDay1",
            "name": "The ReVe Festival Day 1",
            "year": 2019,
            "cover": "covers/TheReVeFestivalDay1.jpg"
        },
        {
            "id": "TheReVeFestivalDay2",
            "name": "The ReVe Festival Day 2",
            "year": 2019,
            "cover": "covers/TheReVeFestivalDay2.jpg"
        },
        {
            "id": "TheReVeFestivalFinale",
            "name": "The ReVe Festival: Finale",
            "year": 2019,
            "cover": "covers/TheReVeFestivalFinale.jpg"
        },
        {
            "id": "Queendom",
            "name": "Queendom",
            "year": 2021,
            "cover": "covers/Queendom.jpg"
        },
        {
            "id": "Birthday",
            "name": "The ReVe Festival 2022 - Birthday",
            "year": 2022,
            "cover": "covers/Birthday.jpeg"
        },
        {
            "id": "FeelMyRhythm",
            "name": "The ReVe Festival 2022 - Feel My Rhythm",
            "year": 2022,
            "cover": "covers/FeelMyRhythm.jpg"
        },
        {
            "id": "ChillKill",
            "name": "Chill Kill",
            "year": 2023,
            "cover": "covers/ChillKill.jpeg"
        },
        {
            "id": "Cosmic",
            "name": "Cosmic",
            "year": 2024,
            "cover": "covers/Cosmic.jpeg"
        }
    ],
    "songs": [
        {
            "id": 2,
            "title": "어떤 별보다",
            "albumId": "",
            "audio": "",
            "ytId": "WTiUpvQr2R4",
            "isTitleSong": false,
            "isOST": true
        },
        {
            "id": 2,
            "title": "미래",
            "albumId": "",
            "audio": "",
            "ytId": "n551JUqfq9w",
            "isTitleSong": false,
            "isOST": true
        },
        {
            "id": 2,
            "title": "Wish Tree(세가지 소원 )",
            "albumId": "WishTree",
            "audio": "",
            "ytId": "MkjjfI7eiV4",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "Feel My Rhythm",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "OXWz_x6-dro",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Rainbow Halo",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "QEY1ScXs-mM",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "Beg For Me",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "3ErVPtN-oas",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "BAMBOLEO",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "pnZXbDZEaK4",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "Good, Bad, Ugly",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "GMZlRcpMWq0",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "In My Dreams",
            "albumId": "FeelMyRhythm",
            "audio": "",
            "ytId": "jpEebbF-hAo",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "Chill Kill",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "xlyrt5eAtKI",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Knock Knock (Who’s There?)",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "0yk7AWzFZUI",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Underwater",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "5cBe1LZGPs4",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Will I Ever See You Again?",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "rXxa-L9pmdM",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Nightmare",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "JUX_AZ7MPwI",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Iced Coffee",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "k76Rlq59zM0",
            "isTitleSong": false
        },
        {
            "id": 7,
            "title": "One Kiss",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "vIXE2aTNbMY",
            "isTitleSong": false
        },
        {
            "id": 8,
            "title": "Bulldozer",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "yBwvu3yhpPs",
            "isTitleSong": false
        },
        {
            "id": 9,
            "title": "Wings",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "w4IbZtBjBII",
            "isTitleSong": false
        },
        {
            "id": 10,
            "title": "Scenery",
            "albumId": "ChillKill",
            "audio": "",
            "ytId": "yVI9Q0pEYek",
            "isTitleSong": false
        },
        {
            "id": 0,
            "title": "행복(Happiness)",
            "albumId": "Happiness",
            "audio": "",
            "ytId": "K0THWR1irk0",
            "isTitleSong": true
        },
        {
            "id": 1,
            "title": "Be Natural(비너추얼)",
            "albumId": "BeNatural",
            "audio": "",
            "ytId": "QpAn9ryoB4Y",
            "isTitleSong": true
        },
        {
            "id": 1,
            "title": "Automatic",
            "albumId": "BeNatural",
            "audio": "",
            "ytId": "px2Q47O0_eE",
            "isTitleSong": true
        },
        {
            "id": 1,
            "title": "Ice Cream Cake",
            "albumId": "IceCreamCake",
            "audio": "",
            "ytId": "bJ-B2BNdEFs",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Somethin Kinda Crazy",
            "albumId": "IceCreamCake",
            "audio": "",
            "ytId": "gsoUmmaCM3w",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Stupid Cupid",
            "albumId": "IceCreamCake",
            "audio": "",
            "ytId": "hBM6kyJBjAM",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Take It Slow",
            "albumId": "IceCreamCake",
            "audio": "",
            "ytId": "XOgjMJzY104",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "사탕 Candy",
            "albumId": "IceCreamCake",
            "audio": "",
            "ytId": "kyoQ4OAN7Pc",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Rebirth",
            "albumId": "Rebirth",
            "audio": "",
            "ytId": "PymBJq0MirE",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "DUMB DUMB",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "XGdbaEDVWp0",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Huff n Puff",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "9eINuufm6TY",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Campfire",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "z8ves7pW-xA",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Red Dress",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "t3FVWX7u85U",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Oh Boy",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "3PgGuUP8_jI",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Lady's Room",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "fqVGBEf7jDY",
            "isTitleSong": false
        },
        {
            "id": 7,
            "title": "Time Slip",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "-wcUyjmgYWY",
            "isTitleSong": false
        },
        {
            "id": 8,
            "title": "Don't U Wait No More",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "gumPi1yX9q0",
            "isTitleSong": false
        },
        {
            "id": 9,
            "title": "Day 1",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "KTaa3Pbv9c0",
            "isTitleSong": false
        },
        {
            "id": 10,
            "title": "Cool World",
            "albumId": "TheRed",
            "audio": "",
            "ytId": "EqGz3TowPe4",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "7月7日 (One Of These Nights)",
            "albumId": "TheVelvet",
            "audio": "",
            "ytId": "9xWiro_tS1k",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Cool Hot Sweet Love",
            "albumId": "TheVelvet",
            "audio": "",
            "ytId": "GUqfSvBv7Og",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Light Me Up",
            "albumId": "TheVelvet",
            "audio": "",
            "ytId": "rRctWJReQFQ",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "First Time",
            "albumId": "TheVelvet",
            "audio": "",
            "ytId": "C3ABS4fZ35k",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Rose Scent Breeze",
            "albumId": "TheVelvet",
            "audio": "",
            "ytId": "oYQHPSNlo5M",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Russian Roulette(러시안 룰렛)",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "QslJYDX3o8s",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Lucky Girl",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "rf65W73Q4kA",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Bad Dracula",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "LrPfgYkvhUg",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Sunny Afternoon",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "G7ZTK07F0-I",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Fool",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "nicenIS8RPM",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Some Love",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "F9JhUiEKtz8",
            "isTitleSong": false
        },
        {
            "id": 7,
            "title": "My Dear",
            "albumId": "RussianRoulette",
            "audio": "",
            "ytId": "wnN8eho8WAg",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Rookie",
            "albumId": "Rookie",
            "audio": "",
            "ytId": "o845InvtxKk",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Little Little",
            "albumId": "Rookie",
            "audio": "",
            "ytId": "hR8JnpnMxiE",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Happily Ever After",
            "albumId": "Rookie",
            "audio": "",
            "ytId": "qD6ZprxtdVE",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Talk To Me(말을 해)",
            "albumId": "Rookie",
            "audio": "",
            "ytId": "Ds-Hb1y7MYw",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Body Talk",
            "albumId": "Rookie",
            "audio": "",
            "ytId": "Oo_NIdBUzMU",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Red Flavor(빨간 맛)",
            "albumId": "TheRedSummer",
            "audio": "",
            "ytId": "WyiIGEHQP8o",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "You Better Know",
            "albumId": "TheRedSummer",
            "audio": "",
            "ytId": "86suvlS1pGM",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Zoo",
            "albumId": "TheRedSummer",
            "audio": "",
            "ytId": "i5cHkhGoL5U",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "여름빛 Mojito",
            "albumId": "TheRedSummer",
            "audio": "",
            "ytId": "6rub7UTAwz0",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Hear The Sea",
            "albumId": "TheRedSummer",
            "audio": "",
            "ytId": "xOpEzig9LzE",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Peek-A-Boo",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "dp1KCxEvgAU",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "봐 Look",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "_ySMeIbXnVo",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "I Just",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "ZQj5O0loEqE",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Kingdom Come",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "p9nNUuPei0Y",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "My Second Date",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "j5WVvwZJIDo",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Attaboy",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "TqcvGnI2XXA",
            "isTitleSong": false
        },
        {
            "id": 7,
            "title": "Perfect 10",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "YjjZIhZMww4",
            "isTitleSong": false
        },
        {
            "id": 8,
            "title": "About Love",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "TXQ-N2IuK_Y",
            "isTitleSong": false
        },
        {
            "id": 9,
            "title": "Moonlight Melody",
            "albumId": "PerfectVelvet",
            "audio": "",
            "ytId": "i3uMwVzw7iw",
            "isTitleSong": false
        },
        {
            "id": 1,
            "title": "Bad Boy",
            "albumId": "ThePerfectRedVelvet",
            "audio": "",
            "ytId": "J_CFBjAyPWE",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "All Right",
            "albumId": "ThePerfectRedVelvet",
            "audio": "",
            "ytId": "hU411ONfzPI",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "#Cookie Jar",
            "albumId": "CookieJar",
            "audio": "",
            "ytId": "rRgTMs_bGuI",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Aitai-tai",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "KrLpZVLUZeQ",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "'Cause it's you",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "WgC22S_hxXo",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "Power Up",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "aiHSVQy9xN8",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "한 여름의 크리스마스(With You)",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "t0t402C7AZ0",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Mr.E",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "X5s2e9cX_TI",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Mosquito",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "1J0sHr0n9YM",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Hit That Drum",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "9w02c8tgLMI",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Blue Lemonade",
            "albumId": "SummerMagic",
            "audio": "",
            "ytId": "bH5rlpk70Ro",
            "isTitleSong": false
        },
        {
            "id": 2,
            "title": "RBB (Really Bad Boy)",
            "albumId": "RBB",
            "audio": "",
            "ytId": "IWJUPY-2EIM",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Butterflies",
            "albumId": "RBB",
            "audio": "",
            "ytId": "zFeUigPlYQc",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "So Good",
            "albumId": "RBB",
            "audio": "",
            "ytId": "gO851aacQmA",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "멋있게 (Sassy Me)",
            "albumId": "RBB",
            "audio": "",
            "ytId": "RYk75DQOPkY",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Taste",
            "albumId": "RBB",
            "audio": "",
            "ytId": "BvqMQPItDh0",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Zimzalabim",
            "albumId": "TheReVeFestivalDay1",
            "audio": "",
            "ytId": "7zyvJw9P4Ao",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Sunny Side Up!",
            "albumId": "TheReVeFestivalDay1",
            "audio": "",
            "ytId": "2QbenuWsG8o",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Umpah Umpah",
            "albumId": "TheReVeFestivalDay2",
            "audio": "",
            "ytId": "e0psQMmlzW0",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Ladies Night",
            "albumId": "TheReVeFestivalDay2",
            "audio": "",
            "ytId": "7zLBQLvOty0",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Wild Side",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "boI1jQyqvsc",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Marionette",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "M_nUKUoItu4",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "SAPPY",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "JUJ3Pq74H4c",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Jackpot",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "O3GLHZKAhw8",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Snap Snap",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "fn5sL5x0ZmM",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Sayonara",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "imMlgr9TbhI",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "'Cause it’s you",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "WgC22S_hxXo",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Color of Love",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "CeGWtK1YHGY",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Swimming Pool",
            "albumId": "Bloom",
            "audio": "",
            "ytId": "VrtJr75uGDc",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Psycho",
            "albumId": "TheReVeFestivalFinale",
            "audio": "",
            "ytId": "uR8Mrt1IpXg",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Bing Bing",
            "albumId": "TheReVeFestivalFinale",
            "audio": "",
            "ytId": "BQouHXkPLFw",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Birthday",
            "albumId": "Birthday",
            "audio": "",
            "ytId": "oKpz0d9WBzE",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "BYE BYE",
            "albumId": "Birthday",
            "audio": "",
            "ytId": "TPNUscDJvew",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "On A Ride",
            "albumId": "Birthday",
            "audio": "",
            "ytId": "bpi4tmDfbFw",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "ZOOM",
            "albumId": "Birthday",
            "audio": "",
            "ytId": "6WCiPEH6Cak",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Celebrate",
            "albumId": "Birthday",
            "audio": "",
            "ytId": "nvuO06HkSag",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Queendom",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "c9RzZpV460k",
            "isTitleSong": true
        },
        {
            "id": 3,
            "title": "Pose",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "LX7CHCQwBkY",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Knock On Wood",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "PHINkx2So0s",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Pushin' N Pullin'",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "dL_GbAFIknI",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Hello, Sunset（다시, 여름）",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "-xw8ePRkyDE",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Better Be",
            "albumId": "Queendom",
            "audio": "",
            "ytId": "_Nhe7PGV9fY",
            "isTitleSong": false
        },
        {
            "id": 14,
            "title": "Cosmic",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "FyG21rXCxlY",
            "isTitleSong": true
        },
        {
            "id": 2,
            "title": "Sunflower",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "Npk2MnIhnXg",
            "isTitleSong": false
        },
        {
            "id": 3,
            "title": "Last Drop",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "pCsyyQoyEDU",
            "isTitleSong": false
        },
        {
            "id": 4,
            "title": "Love Arcade",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "dzkh80VtKzQ",
            "isTitleSong": false
        },
        {
            "id": 5,
            "title": "Bubble",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "A_f7nEpxH6s",
            "isTitleSong": false
        },
        {
            "id": 6,
            "title": "Night Drive",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "Bo_dgP7bilM",
            "isTitleSong": false
        },
        {
            "id": 7,
            "title": "Sweet Dreams",
            "albumId": "Cosmic",
            "audio": "",
            "ytId": "jv-UAioFOW0",
            "isTitleSong": false
        }
    ]
},
  songMeta: {
    "행복(Happiness)":              { "tempo": "fast", "vibe": ["bright","energetic"],          "side": "Red",    "album": "Happiness" },
    "Be Natural(비너추얼)":          { "tempo": "slow", "vibe": ["sophisticated","cool"],         "side": "Velvet", "album": "Be Natural" },
    "Automatic":                    { "tempo": "slow", "vibe": ["sophisticated","rnb"],           "side": "Velvet", "album": "Be Natural" },
    "Ice Cream Cake":               { "tempo": "fast", "vibe": ["bright","quirky","energetic"],   "side": "Red",    "album": "Ice Cream Cake" },
    "DUMB DUMB":                    { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "The Red" },
    "7月7日 (One Of These Nights)":  { "tempo": "slow", "vibe": ["emotional","sophisticated"],    "side": "Velvet", "album": "The Velvet" },
    "Russian Roulette(러시안 룰렛)":  { "tempo": "fast", "vibe": ["quirky","retro","energetic"],   "side": "Red",    "album": "Russian Roulette" },
    "Rookie":                       { "tempo": "fast", "vibe": ["quirky","energetic"],            "side": "Red",    "album": "Rookie" },
    "Red Flavor(빨간 맛)":           { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "The Red Summer" },
    "Peek-A-Boo":                   { "tempo": "mid",  "vibe": ["dark","cool"],                  "side": "Velvet", "album": "Perfect Velvet" },
    "Bad Boy":                      { "tempo": "mid",  "vibe": ["dark","sophisticated"],          "side": "Velvet", "album": "The Perfect Red Velvet" },
    "#Cookie Jar":                  { "tempo": "fast", "vibe": ["bright","quirky"],               "side": "Red",    "album": "#Cookie Jar" },
    "Wild Side":                    { "tempo": "mid",  "vibe": ["dark","quirky","cool"],          "side": "Velvet", "album": "Bloom" },
    "Swimming Pool":                { "tempo": "fast",  "vibe": ["bright","energetic"],          "side": "Velvet", "album": "Bloom" },
    "Color of Love":                { "tempo": "mid",  "vibe": ["bright","dreamy"],          "side": "Red", "album": "Bloom" },
    "Snap Snap":                    { "tempo": "fast",  "vibe": ["quirky","sophisticated"],          "side": "Velvet", "album": "Bloom" },
    "Power Up":                     { "tempo": "fast", "vibe": ["energetic","quirky"],            "side": "Red",    "album": "Summer Magic" },
    "RBB (Really Bad Boy)":         { "tempo": "fast", "vibe": ["dark","rnb"],                   "side": "Velvet", "album": "RBB" },
    "Zimzalabim":                   { "tempo": "fast", "vibe": ["energetic","quirky"],            "side": "Both",   "album": "The ReVe Festival Day 1" },
    "Sunny Side Up!":               { "tempo": "mid", "vibe": ["sophisticated","rnb"],           "side": "Velvet", "album": "The ReVe Festival Day 1" },
    "Umpah Umpah":                  { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "The ReVe Festival Day 2" },
    "Psycho":                       { "tempo": "mid",  "vibe": ["dark","sophisticated"],          "side": "Velvet", "album": "The ReVe Festival: Finale" },
    "Queendom":                     { "tempo": "fast",  "vibe": ["emotional","energetic"],         "side": "Red",   "album": "Queendom" },
    "Feel My Rhythm":               { "tempo": "mid",  "vibe": ["emotional","dreamy"],            "side": "Both",   "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "Birthday":                     { "tempo": "fast", "vibe": ["energetic","quirky"],            "side": "Both",   "album": "The ReVe Festival 2022 - Birthday" },
    "Chill Kill":                   { "tempo": "mid",  "vibe": ["dark","dreamy"],                 "side": "Both",   "album": "Chill Kill" },
    "Cosmic":                       { "tempo": "mid",  "vibe": ["cool","emotional","dreamy"],     "side": "Both",   "album": "Cosmic" },
    "Somethin Kinda Crazy":         { "tempo": "mid", "vibe": ["bright","quirky"],               "side": "Red",    "album": "Ice Cream Cake" },
    "Stupid Cupid":                 { "tempo": "fast", "vibe": ["retro","bright"],                "side": "Red",    "album": "Ice Cream Cake" },
    "Take It Slow":                 { "tempo": "slow",  "vibe": ["rnb","sophisticated"],           "side": "Velvet", "album": "Ice Cream Cake" },
    "사탕 Candy":                   { "tempo": "slow", "vibe": ["emotional","dreamy"],               "side": "Red",    "album": "Ice Cream Cake" },
    "Rebirth":                      { "tempo": "mid",  "vibe": ["retro","dreamy"],            "side": "Velvet", "album": "Rebirth" },
    "Huff n Puff":                  { "tempo": "fast", "vibe": ["energetic","quirky"],            "side": "Red",    "album": "The Red" },
    "Campfire":                     { "tempo": "mid", "vibe": ["rnb","bright"],            "side": "Velvet", "album": "The Red" },
    "Red Dress":                    { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "The Red" },
    "Oh Boy":                       { "tempo": "mid", "vibe": ["bright","quirky","sophisticated"],"side": "Red",    "album": "The Red" },
    "Lady's Room":                  { "tempo": "fast",  "vibe": ["sophisticated","cool"],          "side": "Red", "album": "The Red" },
    "Time Slip":                    { "tempo": "slow", "vibe": ["dreamy","emotional"],            "side": "Velvet", "album": "The Red" },
    "Don't U Wait No More":         { "tempo": "slow", "vibe": ["rnb","sophisticated"],           "side": "Red", "album": "The Red" },
    "Day 1":                        { "tempo": "mid", "vibe": ["emotional","dreamy"],            "side": "Red", "album": "The Red" },
    "Cool World":                   { "tempo": "mid", "vibe": ["bright","cool"],            "side": "Red",    "album": "The Red" },
    "Cool Hot Sweet Love":          { "tempo": "mid",  "vibe": ["sophisticated","cool"],          "side": "Velvet", "album": "The Velvet" },
    "Light Me Up":                  { "tempo": "slow", "vibe": ["sophisticated","emotional"],     "side": "Red",    "album": "The Velvet" },
    "First Time":                   { "tempo": "slow", "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "The Velvet" },
    "Rose Scent Breeze":            { "tempo": "slow", "vibe": ["dreamy","sophisticated"],        "side": "Velvet", "album": "The Velvet" },
    "Lucky Girl":                   { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "Russian Roulette" },
    "Bad Dracula":                  { "tempo": "fast", "vibe": ["quirky","energetic"],            "side": "Red",    "album": "Russian Roulette" },
    "Sunny Afternoon":              { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "Russian Roulette" },
    "Fool":                         { "tempo": "mid",  "vibe": ["bright","dreamy"],               "side": "Red", "album": "Russian Roulette" },
    "Some Love":                    { "tempo": "slow", "vibe": ["emotional","sophisticated"],     "side": "Velvet", "album": "Russian Roulette" },
    "My Dear":                      { "tempo": "mid", "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "Russian Roulette" },
    "Little Little":                { "tempo": "slow", "vibe": ["bright","quirky"],               "side": "Red",    "album": "Rookie" },
    "Happily Ever After":           { "tempo": "fast", "vibe": ["dreamy","emotional"],            "side": "Velvet", "album": "Rookie" },
    "Talk To Me(말을 해)":           { "tempo": "mid",  "vibe": ["rnb","sophisticated"],           "side": "Velvet", "album": "Rookie" },
    "Body Talk":                    { "tempo": "mid",  "vibe": ["rnb","cool"],              "side": "Velvet",   "album": "Rookie" },
    "You Better Know":              { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Red",    "album": "The Red Summer" },
    "Zoo":                          { "tempo": "fast", "vibe": ["quirky","energetic"],            "side": "Red",    "album": "The Red Summer" },
    "여름빛 Mojito":                 { "tempo": "fast", "vibe": ["bright","energetic","retro"],    "side": "Red",    "album": "The Red Summer" },
    "Hear The Sea":                 { "tempo": "slow", "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "The Red Summer" },
    "봐 Look":                      { "tempo": "mid",  "vibe": ["cool","rnb","quirky"],          "side": "Velvet", "album": "Perfect Velvet" },
    "I Just":                       { "tempo": "mid", "vibe": ["dark","retro","rnb"],            "side": "Velvet", "album": "Perfect Velvet" },
    "Kingdom Come":                 { "tempo": "mid",  "vibe": ["dark","sophisticated"],          "side": "Velvet", "album": "Perfect Velvet" },
    "My Second Date":               { "tempo": "mid", "vibe": ["bright","quirky"],               "side": "Red",    "album": "Perfect Velvet" },
    "Attaboy":                      { "tempo": "fast",  "vibe": ["quirky","retro"],                  "side": "Red", "album": "Perfect Velvet" },
    "Perfect 10":                   { "tempo": "slow",  "vibe": ["sophisticated","rnb"],           "side": "Velvet", "album": "Perfect Velvet" },
    "About Love":                   { "tempo": "mid", "vibe": ["retro","dreamy"],            "side": "Both", "album": "Perfect Velvet" },
    "Moonlight Melody":             { "tempo": "slow", "vibe": ["dreamy","emotional"],        "side": "Velvet", "album": "Perfect Velvet" },
    "All Right":                    { "tempo": "fast",  "vibe": ["bright","energetic"],           "side": "Velvet", "album": "The Perfect Red Velvet" },
    "Aitai-tai":                    { "tempo": "fast", "vibe": ["bright","dreamy"],               "side": "Red",    "album": "#Cookie Jar" },
    "'Cause it's you":              { "tempo": "slow", "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "#Cookie Jar" },
    "한 여름의 크리스마스(With You)": { "tempo": "mid", "vibe": ["emotional","bright"],           "side": "Velvet", "album": "Summer Magic" },
    "Mr.E":                         { "tempo": "mid", "vibe": ["energetic","quirky"],            "side": "Red",   "album": "Summer Magic" },
    "Mosquito":                     { "tempo": "fast", "vibe": ["quirky","retro"],            "side": "Velvet",    "album": "Summer Magic" },
    "Hit That Drum":                { "tempo": "fast", "vibe": ["energetic","bright"],            "side": "Red",    "album": "Summer Magic" },
    "Blue Lemonade":                { "tempo": "mid",  "vibe": ["bright","retro"],                "side": "Red",    "album": "Summer Magic" },
    "Butterflies":                  { "tempo": "mid", "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "RBB" },
    "So Good":                      { "tempo": "mid", "vibe": ["rnb","sophisticated"],            "side": "Velvet",    "album": "RBB" },
    "멋있게 (Sassy Me)":             { "tempo": "fast", "vibe": ["quirky","bright"],               "side": "Red",    "album": "RBB" },
    "Taste":                        { "tempo": "mid", "vibe": ["rnb","sophisticated"],           "side": "Velvet", "album": "RBB" },
    "BYE BYE":                      { "tempo": "fast",  "vibe": ["emotional","rnb","quirky"],      "side": "Velvet", "album": "The ReVe Festival 2022 - Birthday" },
    "On A Ride":                    { "tempo": "fast", "vibe": ["bright","energetic"],            "side": "Both",    "album": "The ReVe Festival 2022 - Birthday" },
    "Ladies Night":                 { "tempo": "fast", "vibe": ["energetic","bright"],            "side": "Red",    "album": "The ReVe Festival Day 2" },
    "ZOOM":                         { "tempo": "mid", "vibe": ["cool","sophisticated"],               "side": "Velvet",    "album": "The ReVe Festival 2022 - Birthday" },
    "Celebrate":                    { "tempo": "slow", "vibe": ["emotional","rnb"],            "side": "Velvet",    "album": "The ReVe Festival 2022 - Birthday" },
    "Bing Bing":                    { "tempo": "fast", "vibe": ["energetic","quirky"],            "side": "Red",    "album": "The ReVe Festival: Finale" },
    "Knock Knock (Who's There?)":   { "tempo": "fast",  "vibe": ["quirky","dark"],                "side": "Velvet",   "album": "Chill Kill" },
    "Underwater":                   { "tempo": "slow", "vibe": ["sophisticated","emotional"],            "side": "Velvet", "album": "Chill Kill" },
    "Will I Ever See You Again?":   { "tempo": "fast",  "vibe": ["emotional","dreamy"],            "side": "Velvet", "album": "Chill Kill" },
    "Nightmare":                    { "tempo": "mid",  "vibe": ["dark","energetic"],              "side": "Both",   "album": "Chill Kill" },
    "Iced Coffee":                  { "tempo": "slow",  "vibe": ["cool","emotional"],          "side": "Velvet", "album": "Chill Kill" },
    "One Kiss":                     { "tempo": "fast", "vibe": ["rnb","sophisticated"],           "side": "Velvet", "album": "Chill Kill" },
    "Bulldozer":                    { "tempo": "fast", "vibe": ["energetic","dark"],              "side": "Red",    "album": "Chill Kill" },
    "Wings":                        { "tempo": "mid",  "vibe": ["emotional","dreamy"],            "side": "Both",   "album": "Chill Kill" },
    "Scenery":                      { "tempo": "slow", "vibe": ["retro","emotional"],             "side": "Velvet", "album": "Chill Kill" },
    "Sunflower":                    { "tempo": "mid",  "vibe": ["emotional","bright"],            "side": "Both",   "album": "Cosmic" },
    "Last Drop":                    { "tempo": "slow", "vibe": ["dark","sophisticated"],          "side": "Velvet", "album": "Cosmic" },
    "Love Arcade":                  { "tempo": "mid", "vibe": ["retro","bright"],                "side": "Red",    "album": "Cosmic" },
    "Bubble":                       { "tempo": "mid",  "vibe": ["dreamy","bright"],               "side": "Both",   "album": "Cosmic" },
    "Night Drive":                  { "tempo": "slow",  "vibe": ["emotional","dreamy"],     "side": "Velvet", "album": "Cosmic" },
    "Sweet Dreams":                 { "tempo": "slow", "vibe": ["dreamy","emotional"],            "side": "Velvet", "album": "Cosmic" },
    "Wish Tree(세가지 소원 )":       { "tempo": "slow", "vibe": [], "side": "Both", "album": "WishTree" },
    "Marionette":                   { "tempo": "mid", "vibe": [], "side": "Velvet", "album": "Bloom" },
    "SAPPY":                        { "tempo": "fast", "vibe": [], "side": "Red", "album": "Bloom" },
    "Jackpot":                      { "tempo": "fast", "vibe": ["cool"], "side": "", "album": "Bloom" },
    "Sayonara":                     { "tempo": "mid", "vibe": [], "side": "", "album": "Bloom" },
    "Rainbow Halo":                 { "tempo": "fast", "vibe": ["dreamy"], "side": "Red", "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "Beg For Me":                   { "tempo": "mid", "vibe": ["dark","sophisticated"], "side": "Velvet", "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "BAMBOLEO":                     { "tempo": "mid", "vibe": ["dreamy"], "side": "Red", "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "Good, Bad, Ugly":             { "tempo": "mid", "vibe": [], "side": "Velvet", "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "In My Dreams":                 { "tempo": "slow", "vibe": ["emotional"], "side": "Both", "album": "The ReVe Festival 2022 - Feel My Rhythm" },
    "Pose":                         { "tempo": "fast", "vibe": ["retro","quirky"], "side": "Red", "album": "Queendom" },
    "Knock On Wood":                { "tempo": "mid", "vibe": ["bright"], "side": "Velvet", "album": "Queendom" },
    "Pushin' N Pullin'":            { "tempo": "mid", "vibe": ["cool","rnb"], "side": "Velvet", "album": "Queendom" },
    "Hello, Sunset（다시, 여름）":    { "tempo": "slow", "vibe": ["retro","rnb"], "side": "Velvet", "album": "Queendom" },
    "Better Be":                    { "tempo": "fast", "vibe": [], "side": "Velvet", "album": "Queendom" }
},
  feedback: {
    "messages": [
        "真有品味！",
        "選不出來...",
        "品味一流！",
        "nice choice😍",
        "選得好！",
        "此曲不可多得(淚)",
        "這簡直是是耳朵的維他命",
        "這首確實厲害！",
        "加油加油",
        "眼光獨到！",
        "演唱會要聽這首🫴",
        "前奏就抓住我了",
        "你是真正的 Reveluv！",
        "🩷💛🩵💚💜",
        "這選擇，滿分！",
        "진짜 음악 천재 아니야",
        "果然識貨！",
        "品味，無懈可擊！",
        "선곡 센스 미쳤다",
        "完全通勤最佳選曲",
        "完全認同！",
        "太有眼光了！",
        "這首就是不一樣！",
        "Certified Reveluv！",
        "음악 천재！",
        "很難選對吧TT",
        "솔직히 이게 맞지！",
        "這排名，穩！",
        "誰懂誰懂～",
        "水啦╰(*°▽°*)╯",
        "哇，這也太特別了吧！",
        "質感！",
        "Pick 這首的人都很厲害！",
        "你的排名值得被裱起來！",
        "品味太好 (✿◡‿◡)",
        "いい曲(❤️´艸｀❤️)",
        "貝貝本人看到會哭泣！",
        "這首第一名！",
        "センスあるよね",
        "You’ve got great taste.",
        "朋友知道你都聽這麼讚的歌嗎?!",
        "選曲センス神すぎる",
        "懂...這首歌真的太棒了......",
        "繼續！你快完成了 ٩(๑›ω‹๑)۶"
    ],
    "specialFeedback": {
        "Psycho": ["只知道貝貝的傻瓜笨蛋><", "this song got me feeling like a psycho"],
        "Happiness": ["Sometimes, you gotta be bold!","boo-ya!","🦜🦜🦜🦜🦜"],
        "Red Flavor(빨간 맛)": ["夏日女王！", "這首歌就是夏天的味道！", "🍉🍇🥝🍍🍊"],
        "Rose Scent Breeze": ["被埋沒的好歌...", "玫瑰香氣撲鼻而來..."],
        "Zimzalabim": ["Zimzalabim!","康瑟琪：這首歌裡面加了什麼奇怪的東西吧","裴柱現還欠我們幾次?"],
        "Peek-A-Boo": ["誰要排隊當送披薩小哥?","Peek-peek-a-peek-a-boo"],
        "Sunny Side Up!": ["🍳","有這麼hot的荷包蛋嗎"],
        "Wild Side": ["嗷嗷嗷🐶"],
        "Swimming Pool": ["Hey hey you! So whatcha gonna do?"],
        "여름빛 Mojito": ["你是我的Mojito🍸"],
        "Mosquito":["夏天也要小心蚊子🦟","Mosquito zzzzzz"]
    }
}
};

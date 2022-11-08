const axios = require('axios')
const cheerio = require('cheerio')

const ranks = [
    "Unplaced",
    "Bronze V",
    "Bronze IV",
    "Bronze III",
    "Bronze II" ,
    "Bronze I",
    "Silver V",
    "Silver IV",
    "Silver III",
    "Silver II",
    "Silver I",
    "Gold V",
    "Gold IV",
    "Gold III",
    "Gold II",
    "Gold I",
    "Platinum V",
    "Platinum IV",
    "Platinum III",
    "Platinum II",
    "Platinum I",
    "Diamond V",
    "Diamond IV",
    "Diamond III",
    "Diamond II",
    "Diamond I",
    "Master V",
    "Master IV",
    "Master III",
    "Master II",
    "Master I",
    "Grandmaster V",
    "Grandmaster IV",
    "Grandmaster III",
    "Grandmaster II",
    "Grandmaster I"
]
function randomizeRank() {
    return ranks[Math.floor(Math.random() * ranks.length)] 
}

async function getPlayer(playerName) {
    let player = {}
    player.lastUpdated = Date.now()
    player.name = playerName
    player.custom = false

    /////////////////
    // SEARCH FOR PLAYER HERE
    /////////////////

    if (true) { // if cannot find player 

        player.custom = true
        player.tankSR = randomizeRank() || "Not Available"
        player.damageSR = randomizeRank() || "Not Available"
        player.supportSR = randomizeRank() || "Not Available"
        player.profileIcon = "https://i.pinimg.com/originals/89/78/c2/8978c239d819de41f0d73bbcbafb9a6f.png"
        player.url = `https://overwatch.blizzard.com/en-gb/search/${playerName}/`
        return player
    }
}

function updateTime() {
    return Date.now()
}

// Increase the rank 
function increaseRank(rank) {
    let rankIndex = ranks.indexOf(rank)
    if (rankIndex == ranks.length - 1) return rank // If max rank, leave at max rank
    return ranks[rankIndex + 1] // Return next rank up
}

// Decrease the rank
function decreaseRank(rank) {
    let rankIndex = ranks.indexOf(rank)
    if (rankIndex == 0) return rank // If unplaced, leave unplaced
    return ranks[rankIndex - 1] // Return next rank down
}

module.exports = {
    getPlayer,
    increaseRank,
    decreaseRank,
    updateTime
}
const axios = require('axios')
const cheerio = require('cheerio')

function randomizeRank() {
    const ranks = [
        "Unplaced",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Master",
        "Grandmaster"
    ]

    const tiers = [
        "I",
        "II",
        "III",
        "IV",
        "V",
    ]

    let rank = ranks[Math.floor(Math.random() * ranks.length)] 
    if (rank == "Unplaced") return rank
    let tier = tiers[Math.floor(Math.random() * tiers.length)]
    return `${rank} ${tier}`
}

async function getPlayer(playerName) {
    let player = {}
    player.lastUpdated = Date.now()
    player.name = playerName
    player.tankSR = randomizeRank() || "Not Available"
    player.damageSR = randomizeRank() || "Not Available"
    player.supportSR = randomizeRank() || "Not Available"
    player.profileIcon = "https://i.pinimg.com/originals/89/78/c2/8978c239d819de41f0d73bbcbafb9a6f.png"
    return player
}

module.exports = {
    getPlayer   
}
const axios = require('axios')
const cheerio = require('cheerio')

async function getPlayer(playerName) {
    let player = {}
    player.name = "PizzaLawyer#11545"
    player.tankSR = "Unplaced"
    player.damageSR = "Diamond 1"
    player.supportSR = "Master 2"
    player.profileIcon = "https://i.pinimg.com/originals/89/78/c2/8978c239d819de41f0d73bbcbafb9a6f.png"
    return player
}
module.exports = {
    getPlayer   
}
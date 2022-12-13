const fetch = require("node-fetch");
const cheerio = require("cheerio");
import axios from "@/lib/axios";

// const proxy = "https://celadon-bienenstitch-1b4465.netlify.app/";
const proxy = "https://cors-anywhere.herokuapp.com/";

const ranks = [
    "Unplaced",
    "Bronze 5",
    "Bronze 4",
    "Bronze 3",
    "Bronze 2",
    "Bronze 1",
    "Silver 5",
    "Silver 4",
    "Silver 3",
    "Silver 2",
    "Silver 1",
    "Gold 5",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold 1",
    "Platinum 5",
    "Platinum 4",
    "Platinum 3",
    "Platinum 2",
    "Platinum 1",
    "Diamond 5",
    "Diamond 4",
    "Diamond 3",
    "Diamond 2",
    "Diamond 1",
    "Master 5",
    "Master 4",
    "Master 3",
    "Master 2",
    "Master 1",
    "Grandmaster 5",
    "Grandmaster 4",
    "Grandmaster 3",
    "Grandmaster 2",
    "Grandmaster 1",
];
function randomizeRank() {
    return ranks[Math.floor(Math.random() * ranks.length)];
}

async function getPlayer(playerName) {
    let player = {};
    player.lastUpdated = Date.now();
    player.addedDate = Date.now();
    player.name = playerName;
    player.custom = false;
    player.fetching = false;

    playerName = playerName.split("#");
    const url = `${proxy}https://overwatch.blizzard.com/en-gb/career/${playerName[0]}-${playerName[1]}/`;

    try {
        const response = await axios.get(encodeURI(url));
        const $ = cheerio.load(response.data);

        let data = $(".Profile-playerSummary--roleWrapper");
        const filter = new RegExp("([^/]+$)");

        data.each((_, y) => {
            let role = y.children[0].children[0].attribs.src;
            let rank = y.children[1].attribs.src;

            let ranktext = filter.exec(rank.substring(0, rank.length - 15))[0];
            ranktext = ranktext.split('Tier-').join(" ")

            // console.log(ranktext);
            if (role.includes("tank")) {
                player.tankSR = ranktext;
            } else if (role.includes("offense")) {
                player.damageSR = ranktext;
            } else if (role.includes("support")) {
                player.supportSR = ranktext;
            }
        });

        if (!player.tankSR) player.tankSR = "Not Available";
        if (!player.damageSR) player.damageSR = "Not Available";
        if (!player.supportSR) player.supportSR = "Not Available";

        player.profileIcon = $(".Profile-player--portrait")[0].attribs["src"];
        player.url = `https://overwatch.blizzard.com/en-gb/career/${playerName[0]}-${playerName[1]}/`;
        return player;
    } catch (e) {
        console.log(e);
    }

    if (true) {
        // if cannot find player

        player.custom = true;
        player.tankSR = randomizeRank() || "Not Available";
        // player.tankIcon =
        player.damageSR = randomizeRank() || "Not Available";
        player.supportSR = randomizeRank() || "Not Available";
        player.profileIcon =
            "https://i.pinimg.com/originals/89/78/c2/8978c239d819de41f0d73bbcbafb9a6f.png";
        player.url = `https://overwatch.blizzard.com/en-gb/career/${playerName[0]}-${playerName[1]}/`;

        return player;
    }
}

async function updateTime() {
    return Date.now();
}

// Increase the rank
function increaseRank(rank) {
    let rankIndex = ranks.indexOf(rank);
    if (rankIndex == ranks.length - 1) return rank; // If max rank, leave at max rank
    return ranks[rankIndex + 1]; // Return next rank up
}

function getRank(rank) {
    return ranks.indexOf(rank);
}

// Decrease the rank
function decreaseRank(rank) {
    let rankIndex = ranks.indexOf(rank);
    if (rankIndex == 0) return rank; // If unplaced, leave unplaced
    return ranks[rankIndex - 1]; // Return next rank down
}

module.exports = {
    getPlayer,
    increaseRank,
    decreaseRank,
    getRank,
    updateTime,
};

const cheerio = require("cheerio");
const Axios = require("axios");
const fs = require("fs");

const axios = Axios.create({
    headers: {
        "X-Requested-With": "application/xml",
    },
    withCredentials: false,
});

const proxy = "https://kurama.stratonimbus.org/";
// const proxy = "https://cors-anywhere.herokuapp.com/";

async function getPlayer(playerName) {
    let player = {};
    player.lastUpdated = Date.now();
    player.addedDate = Date.now();
    player.name = playerName;
    player.custom = false;
    player.fetching = false;

    playerName = playerName.split("#");
    const url = `${proxy}https://overwatch.blizzard.com/en-gb/career/${playerName[0]}-${playerName[1]}/`;
    console.log(url);
    try {
        const response = await axios.get(encodeURI(url), {
             header: { origin: "localhost" },
        });

        const $ = cheerio.load(response.data);
        let data = $(".Profile-playerSummary--roleWrapper");
        const filter = new RegExp("([^/]+$)");

        data.each((_, y) => {
            let role = y.children[0].children[0].attribs.src;
            let rank = y.children[1].attribs.src;

            let ranktext = filter.exec(rank.substring(0, rank.length-15))[0];

            if (role.includes("tank")) {
                console.log(`TankSR: ${ranktext}`);
            } else if (role.includes("offense")) {
                console.log(`damangeSR: ${ranktext}`);
            } else if (role.includes("support")) {
                console.log(`supportSR: ${ranktext}`);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

// getPlayer("Titan#12264");
getPlayer("Exalted#11497");

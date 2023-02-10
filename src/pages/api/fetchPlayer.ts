import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
const axios = require("axios");

async function retrieveData(): Promise<any> {
  try {
    const response = await axios.get(
      "https://overwatch.blizzard.com/en-us/career/FreyaTheCat-1718/"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const imageSource = $(".Profile-player--portrait").attr("src");
    const rankings = {
      tank: "",
      offense: "",
      support: "",
    };
    const rankingNodes = $(
      ".mouseKeyboard-view.Profile-playerSummary--rankWrapper.is-active"
    ).find(".Profile-playerSummary--roleWrapper");
    rankingNodes.each((i, elem) => {
      const role = $(elem)
        .find(".Profile-playerSummary--role img")
        .attr("src")
        .match(/role\/(\w+)/)[1];
      const rank = $(elem)
        .find(".Profile-playerSummary--rank")
        .attr("src")
        .match(/rank\/(\w+-\d+)/)[1];
      rankings[role] = rank;
    });
    const jsonResponse = { imageSource, rankings };
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default async function fetchPlayer(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.status(200).json(await retrieveData());
}

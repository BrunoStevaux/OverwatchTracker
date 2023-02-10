import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
const axios = require("axios");

interface Rankings {
  [key: string]: string;
}

async function retrieveData(): Promise<Rankings> {
  try {
    const response = await axios.get(
      "https://overwatch.blizzard.com/en-gb/career/FreyaTheCat-1718/"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const rankingNodes = $(
      ".mouseKeyboard-view.Profile-playerSummary--rankWrapper.is-active"
    ).find(".Profile-playerSummary--roleWrapper");
    const rankings: Rankings = {};
    rankingNodes.each((i: any, elem: any) => {
      const role = $(elem)
        .find(".Profile-playerSummary--role img")
        .attr("src")
        .match(/role\/(.*)\-.*/)[1];
      const rank = $(elem)
        .find(".Profile-playerSummary--rank")
        .attr("src")
        .match(/rank\/(.*)\-.*/)[1];
      rankings[role] = rank;
    });
    return rankings;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default async function fetchPlayer(
  req: NextApiRequest,
  res: NextApiResponse<Rankings>
) {
  res.status(200).json(await retrieveData());
}

import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
const axios = require("axios");

interface Response {
  rankings: {
    [key: string]: string;
  };
  profileIcon: string;
  playerTitle: string;
  playerName: string;
}

interface Rankings {
  [key: string]: string;
}

async function retrieveData(name): Promise<Response> {
  const url = `https://overwatch.blizzard.com/en-gb/career/${name}/`;
  try {
    const response = await axios.get(encodeURI(url));
    // const response = await axios.get(
    //   "https://overwatch.blizzard.com/en-gb/career/FreyaTheCat-1718/"
    // );
    const html = response.data;
    const $ = cheerio.load(html);
    const profileIcon = $(".Profile-player--portrait").attr("src");
    const playerTitle = $(".Profile-player--title").text();
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
    const jsonResponse: Response = {
      rankings,
      profileIcon,
      playerTitle,
      playerName: name,
    };
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return {
      rankings: {
        tank: "unranked",
        offense: "unranked",
        support: "unranked",
      },
      profileIcon: "",
      playerTitle: "",
      playerName: name,
    };
  }
}

export default async function fetchPlayer(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  console.log(req.query.user);
  res.status(200).json(await retrieveData(req.query.user));
}

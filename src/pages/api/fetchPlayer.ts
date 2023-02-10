import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");
const axios = require("axios");

async function retrieveData(): Promise<any> {
  try {
    const response = await axios.get(
      "https://overwatch.blizzard.com/en-gb/career/FreyaTheCat-1718/"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const imageSource = $(".Profile-player--portrait").attr("src");
    const jsonResponse = { imageSource };
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default async function fetchPlayer(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(await retrieveData());
}

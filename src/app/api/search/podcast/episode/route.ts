import { NextRequest } from 'next/server'
import axios from 'axios';
import sha1 from 'sha1';
import Parser from 'rss-parser'

require("dotenv").config();

interface Episode{
  name: string,
  rss: string,
  image?: string,
  description?: string
}

async function fetchAndParseXML(rss: string) {
  const parser = new Parser();
  let jObj = parser.parseURL(rss);
  console.log(jObj)

  return jObj
}

export async function GET(
  request: NextRequest,
  { params }: any
) {
  const rss = request.nextUrl.searchParams.get("rss") ?? "";

  const xml = await fetchAndParseXML(rss)
  let episodes: any

  episodes = xml.items.map((item: any) => {
    // Map each item to a podcast object
    if (item.enclosure)
    {
    return {
      title: item.title,
      rss: item.enclosure.url ? item.enclosure.url: "",
      image: item.itunes.image
    }};

  });

    return Response.json(episodes)
}

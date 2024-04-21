import { NextRequest } from 'next/server'
import axios from 'axios';
import sha1 from 'sha1';
import Parser from 'rss-parser'
import { Episode } from '@/components/search/muiEpisode';

require("dotenv").config();

async function fetchAndParseXML(rss: string) {
  const parser = new Parser();
  let jObj = parser.parseURL(rss);

  return jObj
}

export async function GET(
  request: NextRequest,
  { params }: any
) {
  const rss = request.nextUrl.searchParams.get("rss") ?? "";

  const xml = await fetchAndParseXML(rss)
  let episodes: Episode[] = []
  let idCounter = xml.items.length
  xml.items.forEach((item: any) => {
    if (item.enclosure){
      const episode:Episode = {
        id: (--idCounter).toString(),
        title: item.title,
        audioUrl: item.enclosure.url ?? "",
        image: item.itunes.image
      }
      episodes.push(episode);
    }
  });

  return Response.json(episodes)
}

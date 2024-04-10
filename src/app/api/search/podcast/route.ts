import { NextRequest } from 'next/server'
import axios from 'axios';
import sha1 from 'sha1';

require("dotenv").config();

interface Podcast{
  id?: string,
  name: string,
  rss: string,
  image?: string,
  description?: string
}

async function searchPodcast(q: string)
{
  if(q.length < 3)
  {
    return {}
  }
  
  const apiHeaderTime = Math.floor(Date.now() / 1000).toString(); // Time in seconds
  // Hash them to get the Authorization token
  const hash = sha1(process.env.PODCASTINDEX_KEY! + process.env.PODCASTINDEX_SECRET! + apiHeaderTime);
  // Set the required headers
  const headers = {
    "User-Agent": "Chrome/94.0.4606.81",
    "X-Auth-Key": process.env.PODCASTINDEX_KEY,
    "X-Auth-Date": apiHeaderTime,
    "Authorization": hash
  };

  // Make the request to an API endpoint
  async function fetchData(q: string) {
    try {
      const response = await axios.get("https://api.podcastindex.org/api/1.0/search/byterm?q=" + q, {
        headers: headers
      });
      return await response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // insert queries to db for faster results

  // Call the fetchData function
  let res = await fetchData(q);

  if (res)
  {
    return res
  }
  else {
    return []
  }
}

const handler = async function GET(
  request: NextRequest,
  { params }: any
) {
  const search_term = request.nextUrl.searchParams.get("q") ?? "";
  let podcastArray: Podcast[] = []
  const res = await searchPodcast(search_term);
  try {
    if (Object.keys(res).length > 0)
    {
      podcastArray = res["feeds"].map((item: any) => {
        // Map each item to a podcast object
        return {
          title: item.title, // Replace 'title' with the actual property name in your JSON object
          rss: item.originalUrl, // Replace 'author' with the actual property name in your JSON object
          image: item.image
          //description: item.description
          // Add more properties as needed
        };
      });
    }
  }
  catch(error) {
    console.error('Error mapping podcast:', error);
  }

  return Response.json(podcastArray)
}

export {handler as GET, handler as POST}
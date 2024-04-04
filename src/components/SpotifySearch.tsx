"use client";
import React, { useEffect } from 'react'
import { useState } from 'react';
import Episode from './search/episode';

export default function SpotifySearch(delay = 1000){
    const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);

    /*
    useEffect(() => {
        const delayFn = setTimeout(() => handleInputChange(inputValue), delay);
        return () => clearTimeout(delayFn);
      }, [inputValue, delay]);
*/

    useEffect(() => {
        if (searchTerm.trim() !== "" && searchTerm.length > 3) {
            getPodcastSearchResults(searchTerm)
        }
        else
        {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const getPodcastSearchResults = async (q: string) => {
        try {
            setSearchTerm(q);
            const response = await fetch("/api/search/podcast?q=" + searchTerm, {
                method: "GET"
            }).then((res) => res.json())
            .then((data) => {
                setSuggestions(data);
            })
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div>
        <form className="max-w-md mx-auto">   
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" onChange={(e) => setSearchTerm(e.target.value)}
                         id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for podcasts..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#1DB954] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            <div id="suggestions" className='rounded-md pl-6 pr-4'>
            <ul className='bg-blue-200 overflow-auto max-h-64 no-scrollbar'>
            {suggestions.map((episode: any) => (
                  <Episode
                    id={episode.id}
                    episodeImageUrl={episode.image}
                    episodeTitle={episode.title}
                    selectEpisode={() => {
                      //logEvent("Searched Podcast Selected");
                      //setSelectedRssUrl(episode.feedUrl);
                      //setSelectedEpisodeImageUrl(episode.artworkUrl100);
                      //setSelectedEpisodeTitle(episode.collectionName);
                    }}
                    
                  />))}
			</ul>
            </div>
        </form>
        </div>
      )
    
}
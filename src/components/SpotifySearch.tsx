"use client";
import React, { useEffect } from 'react'
import { useState } from 'react';
import MuiPodcast from './search/muiPodcast'
import MuiEpisode from './search/muiEpisode'
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import Episode from './search/episode';
import { Typography } from '@mui/material';

export default function SpotifySearch(){
    const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
    const [selectedRssUrl, setSelectedRssUrl] = useState("");
    const [SelectedPodcastImageUrl, setSelectedPodcastImageUrl] = useState("");
    const [selectedPodcastTitle, setSelectedPodcastTitle] = useState("");
    const [selectedEpisode, setSelectedEpisode] = useState<typeof Episode[]>([]);

    const handleRssSubmit = (rssUrl: string) =>
    {
        setSelectedRssUrl(rssUrl);
    }

    const handleEpisode = (ep: typeof Episode) =>
    {
        setSelectedEpisode([ep])

    }

    return (
        <div>
        <form className="max-w-md mx-auto">   
            <Typography variant='h3'>Select a podcast</Typography>
            <MuiPodcast handleRssSubmit={handleRssSubmit}/>
            <br />
            <Typography variant='h3'>Select an episode</Typography>
            <MuiEpisode rss={selectedRssUrl} handleEpisodeSubmit={handleEpisode}/>
        </form>
        </div>

      )
    
}
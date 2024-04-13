"use client"
import React, { useState } from 'react'
import MuiPodcast from './search/muiPodcast'
import MuiEpisode from './search/muiEpisode'
import Episode from './search/episode'

const PodPopup = ({toggle}:any) => {
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
    <>

<div id="crud-modal" aria-hidden="true" className="fixed bottom-0 flex bg-black bg-opacity-50 z-50 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                </h3>
                <button type="button" onClick={toggle} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Podcast</label>
                        <MuiPodcast handleRssSubmit={handleRssSubmit}/>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode</label>
                        <MuiEpisode rss={selectedRssUrl} handleEpisodeSubmit={handleEpisode}/>
                    </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new episode
                </button>
            </form>
        </div>
    </div>
</div> 

    </>
  )
}

export default PodPopup
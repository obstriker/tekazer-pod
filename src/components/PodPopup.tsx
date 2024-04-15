'use client'
import React, { useState } from 'react'
import MuiPodcast from './search/muiPodcast'
import MuiEpisode, { Episode } from './search/muiEpisode'
import { trpc } from '@/app/_trpc/client'
import Episode from './search/muiEpisode';

const PodPopup = () => {
    const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
    const [selectedRssUrl, setSelectedRssUrl] = useState("");
    const [SelectedPodcastImageUrl, setSelectedPodcastImageUrl] = useState("");
    const [selectedPodcastTitle, setSelectedPodcastTitle] = useState("");
    const [selectedEpisode, setSelectedEpisode] = useState<Episode>({} as Episode);

    const [isOpen, setIsOpen] = useState(false);

    const {mutate: generatePodcastInsights} = trpc.generatePodcastInsights.useMutation();

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const handleRssSubmit = (rssUrl: string) =>
    {
        setSelectedRssUrl(rssUrl);
    }

    const handleEpisode = (ep: Episode) =>
    {
        setSelectedEpisode(ep)
    }

    const handleEpisodeSubmit = () => {
        if (selectedEpisode) {
            generatePodcastInsights({episode: selectedEpisode});

        } else {
            console.error("Episode is not selected or is empty");
            // or throw an error if you prefer
            // throw new Error("Episode is not selected or is empty");
        }
    }
    
  return (
    <>
    <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Choose episode
    </button>

    {isOpen && (

<div id="crud-modal" aria-hidden="true" className="fixed bottom-0 flex bg-black bg-opacity-50 z-50 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Generate episode insights
                </h3>
                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Podcast</label>
                        <MuiPodcast handleRssSubmit={handleRssSubmit}/>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode</label>
                        <MuiEpisode rss={selectedRssUrl} handleEpisode={handleEpisode}/>
                    </div>
                </div>
                <button type="submit" onClick={() => {handleEpisodeSubmit(); toggleModal()}} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" ><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Add episode
                </button>
            </div>
        </div>
    </div>
</div> )}

    </>
  )
}

export default PodPopup
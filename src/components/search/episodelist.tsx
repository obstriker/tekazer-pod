import * as React from "react"
import Title from "../general/title"


interface EpisodeListProps {
  rssUrl: string,
  handleEpisodeSubmit: (episode: Episode) => void
}

const EpisodeList = (props:EpisodeListProps) => {
  const [podcastInfo, setPodcastInfo] = React.useState({})

  React.useEffect(() => {
    fetch("https://europe-central2-wannabe-entrepreneur.cloudfunctions.net/podsqueeze", {
      method: "POST",
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        rssUrl: props.rssUrl,
        mode: "get_episodes"
      })
    })
    .then(response => response.json())
    .then(data => {
        setPodcastInfo(data['podcast'])
    })
  }, [])

  const handleEpisodeSubmit = (episode: object) => {
    props.handleEpisodeSubmit(episode, podcastInfo['title'], podcastInfo['id'], podcastInfo['image'], podcastInfo['summary'])
  }

  const getEpisodesList = () => {
    if(Object.keys(podcastInfo).length === 0){
      return(
        <Title title={"Loading Episodes"} classes={""}/>
      )
    }
    
    if(Object.keys(podcastInfo).includes('episodes') && podcastInfo['episodes'].length == 0){
      return(
        <Title title={"No Episodes Found. Please try again with a valid RSS id"} classes={""}/>
      )
    }

    return(
      podcastInfo['episodes'].map((episode:any) => {
        return (
            <li key={episode.guid} onClick={() => handleEpisodeSubmit(episode)} className="py-4 flex opacity-80 hover:opacity-100 hover:cursor-pointer">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={episode.image} alt="" />
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between text-sm">
                    <h3 className="text-gray-900 dark:text-white">{episode.title}</h3>
                    </div>
                </div>
            </li>
        )
      })
    )
  }

  return (
    <div className={"pb-6"}>
      <div className="xl:container mx-auto grid grid-cols-12 grid-flow-col pb-5">
        <div className="col-span-10 col-start-2 lg:container text-left">
        <Title title={"Select the episode you want to create content for"} classes={"leading-tight text-[18px] text-[#FAFAFA] mt-[0px] mb-10"} />
            <div className="p-4 bg-white rounded-xl border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center">
                  <h3 className="text-[18px] font-bold leading-none text-gray-900 dark:text-white">{podcastInfo['title']}</h3>
            </div>
            <div className="flow-root max-h-80 overflow-auto">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        getEpisodesList()
                    }
                  </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default EpisodeList

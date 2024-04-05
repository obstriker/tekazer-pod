import * as React from "react"


interface PodcastProps{
  id: string,
  podcastImageUrl: string,
  podcastTitle: string,
  selectPodcast: () => void
}

const Podcast = (props:PodcastProps) => {
  const {id, podcastImageUrl, podcastTitle, selectPodcast} = props;
  const [newPodcastTitle, setNewPodcastTitle] = React.useState("")

  React.useEffect(() => {
    setNewPodcastTitle(podcastTitle)
  }, [podcastTitle])


  return(
    <li key={id} className="p-4 flex opacity-80 hover:opacity-100 hover:cursor-pointer border-t hover:bg-blue-400" onClick={() => selectPodcast()}>
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={podcastImageUrl} alt="" />
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-center">
        <div className="flex justify-between text-sm">
          <div className="inline-flex">
            <div className="">
              <h3 className={`w-full text-gray-900 dark:text-white`}>
                {newPodcastTitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </li>

  )
}


export default Podcast

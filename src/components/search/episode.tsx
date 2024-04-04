import * as React from "react"


interface EpisodeProps{
  id: string,
  episodeImageUrl: string,
  episodeTitle: string,
  selectEpisode: () => void
}

const Episode = (props:EpisodeProps) => {
  const {id, episodeImageUrl, episodeTitle, selectEpisode} = props;
  const [newEpisodeTitle, setNewEpisodeTitle] = React.useState("")

  React.useEffect(() => {
    setNewEpisodeTitle(episodeTitle)
  }, [episodeTitle])


  return(
    <li key={id} className="p-4 flex opacity-80 hover:opacity-100 hover:cursor-pointer border-t hover:bg-blue-400" onClick={() => selectEpisode()}>
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={episodeImageUrl} alt="" />
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-center">
        <div className="flex justify-between text-sm">
          <div className="inline-flex">
            <div className="">
              <h3 className={`w-full text-gray-900 dark:text-white`}>
                {newEpisodeTitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </li>

  )
}


export default Episode

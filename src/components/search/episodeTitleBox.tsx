import * as React from "react"
import Title from "./title";
import { logEvent } from "../../utils/logger";
import {faCheckSquare, faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import podcastimage from "../../images/homepage/newpodacstimg.jpeg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SqueezeResultsProps {
  jobId:string
  userId:string
  podcastId:string
  episodeTitle:string
  episodeImageUrl:string
  editablePage:boolean
  isLoading?: boolean
}

const EpisodeTitleBox = (props:SqueezeResultsProps) => {
  const {
    editablePage,
    jobId,
    userId,
    podcastId,
    episodeTitle,
    episodeImageUrl,
    isLoading: externalLoading,
  } = props;

  const [isEditEpisode, setIsEditEpisode] = React.useState(false)
  const [newEpisodeTitle, setNewEpisodeTitle] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(props.isLoading ?? false);


  React.useEffect(() => {
    setNewEpisodeTitle(episodeTitle)
  }, [episodeTitle])

  React.useEffect(() => {
    if (episodeTitle && episodeImageUrl) {
      setIsLoading(false);
    }
  }, [episodeTitle, episodeImageUrl]);


  const setEpisodeTitle = () => {
    fetch("https://europe-central2-wannabe-entrepreneur.cloudfunctions.net/podsqueeze", {
      method: "POST",
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        podcastId: podcastId,
        episodeId: jobId,
        episodeNewTitle: newEpisodeTitle,
        mode: "change_episode_name"
      })
    })
    .then(response => response.json())
    .then(data => {
      logEvent('New Episode Title Stored');
      setIsEditEpisode(false)
    }).catch(error => {
      console.log(error)
    })
  }

  if (isLoading) {
    return (
      <div className="flow-root bg-white rounded-xl p-5">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-4 flex items-center">
            <div className="animate-pulse flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div className="flex-1 ml-4">
              <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
      <div className="flow-root bg-white rounded-xl p-5">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="flex hover:cursor-pointer items-center">
              <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={episodeImageUrl ? episodeImageUrl : podcastimage} alt="" />
              </div>
              <div className="ml-4 flex-1 flex">
                  <div className="flex justify-between text-sm">
                    <Title title={newEpisodeTitle} classes={`text-[24px] leading-tight lg:text-lg mt-0 items-center mb-0 lg:mb-0 ${isEditEpisode ? "hidden" : "flex"}`} />
                    <input
                      type="text"
                      className={`rounded-xl border-black border py-2 px-4 mb-2 text-[16px] sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px] ${isEditEpisode ? "block" : "hidden"}`}
                      onChange={(event) => setNewEpisodeTitle(event.target.value)}
                      value={newEpisodeTitle}
                    />
                  </div>
                  <div className={`ml-5 flex ${editablePage ? "block" : "hidden"}`}>
                    <div
                      className={"cursor-pointer"}
                      onClick={isEditEpisode ? () => setEpisodeTitle() : () => {
                        logEvent('Edit Episode Title Clicked');
                        setIsEditEpisode(true);
                      }}
                    >
                      {isEditEpisode ? (
                        <FontAwesomeIcon className={"text-[#9685a7] mt-[12px]"} icon={faCheckSquare} />
                      ) : (
                        <FontAwesomeIcon className={"text-[#9685a7] mt-[12px]"} icon={faPenToSquare} />
                      )}
                    </div>
                  </div>
                </div>
          </li>
        </ul>
      </div>
  )
}

export default EpisodeTitleBox

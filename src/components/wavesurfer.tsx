// React example
// See https://github.com/katspaugh/wavesurfer-react

import * as React from 'react'
const { useMemo, useState, useCallback, useRef } = React
import { createRoot } from 'react-dom/client'
import { useWavesurfer } from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import { BsSkipBackward, BsSkipForward } from 'react-icons/bs'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const formatTime = (seconds: number) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

// A React component that will render wavesurfer
export default function WaveSurferComponent() {
  const containerRef = useRef(null)
  const [urlIndex, setUrlIndex] = useState(0)
  const [playPause, setPlayPause] = useState(false);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    waveColor: "#34374B",
    progressColor: "#F90",
    url: "/09.mp3",
    dragToSeek: true,
    width: "35vw",
    hideScrollbar: true,
    normalize: true,
    barGap: 1,
    height: 60,
    barHeight: 20,
    barRadius: 20,
    barWidth: 5,
    plugins: useMemo(() => [Timeline.create()], []),
  })

  if(wavesurfer){
    wavesurfer.on('load', () => {
      //wavesurfer.container.innerHTML = `<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div></div>`;
    })
  }

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  };

  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setPlayPause(!playPause);
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(2);
    }
  };

  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-2);
    }
  };

  const handleSeekTo = (time: number) => {
    if (wavesurfer) {
      wavesurfer.seekTo(time);
    }
  };

  return (
    <>
    <div className=' bg-black w-full p-3 flex flex-col items-center rounded-t-md'>
      <div ref={containerRef} className="wavesurfer-container flex justify-center"/>

      {/* <p>Current time: {formatTime(currentTime)}</p> */}
      <div className="wavesurfer-controls bg-black rounded-md p-2 w-2/5">
        <div className="flex items-center justify-center space-x-4 text-white font-bold">
          <button className="rounded-full px-4 py-2 bg-blue-900 hover:bg-blue-800" onClick={handleSkipBack}>
            <BsSkipBackward />
          </button>
          <button className="rounded-full px-4 py-2 bg-blue-900 hover:bg-blue-800" onClick={handlePause}>
            {playPause ? <PauseCircleOutlineIcon /> : <PlayCircleIcon />}
          </button>
          <button className="rounded-full px-4 py-2 bg-blue-900 hover:bg-blue-800" onClick={handleSkipForward}>
            <BsSkipForward />
          </button>
        </div>
      </div>
      </div>
    </>
  )
}


/*
  <html>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react",
          "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
          "react-dom/client": "https://esm.sh/react-dom/client",
          "wavesurfer.js": "../dist/wavesurfer.esm.js",
          "wavesurfer.js/dist": "../dist",
          "@wavesurfer/react": "https://unpkg.com/@wavesurfer/react"
        }
      }
    </script>
  </html>
*/

import React from 'react'
import HoverVideoPlayer from 'react-hover-video-player'

// import media
import Video from '../../../assets/vids/couple_dancing.mp4'
import LoadingOverlay from './loadingOverlay.jsx'
import PausedOverlay from './pausedOverlay.jsx'

import './style.css'

const VideoThumbnail = () => {
  return (
    <>
      <HoverVideoPlayer
        videoSrc={Video}
        pausedOverlay={<PausedOverlay />}
        loadingOverlay={<LoadingOverlay />}
        className='video'
      >
      </HoverVideoPlayer>
    </>
  )
}

export default VideoThumbnail

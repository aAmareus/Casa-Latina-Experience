import React from 'react'
import Media from './media.jsx'

import './style.css'

const Card = () => {
  return (
    <div className='card-container'>
        <div className="video-player">
            <Media />
        </div>
        <hr />
        <div className="figure-desc">
          <span className="list-item">Level: Beginner</span>
          <span className="list-item">Difficulty: Easy</span>
          <span className="list-item">Duration: 15 min</span>
          <button className="openModal">Saber más</button>
        </div>
    </div>
  )
}

export default Card

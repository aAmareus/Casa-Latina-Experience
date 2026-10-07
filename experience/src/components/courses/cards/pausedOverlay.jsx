import { css } from '@emotion/css'
import Thumbnail from '../../../assets/img/videoThumbnail.jpg'

import './style.css'

const pausedOverlay = () => {
    return (
   <div>
    <img
      src={Thumbnail}
      alt=""
      className={css`
        /* Thumbnail image expands to cover the player */
        border-radius: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
      `}
    />
    <div
      className={css`
        /* Ensure the description text is displayed on top of the thumbnail image */
        z-index: 1;
        font-family: sans-serif;
        /* Position the text in the bottom-left corner of the overlay */
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1em;
        color: #fff;

        h3 {
          margin: 0 0 0.2em;
        }
      `}
    >
      <h3>Big Buck Bunny</h3>
    </div>
  </div>
    )
}

export default pausedOverlay

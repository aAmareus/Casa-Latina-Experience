import { css, keyframes } from '@emotion/css'

import './style.css'

const loadingOverlaySpinnerAnimation = keyframes`
    from {
    transform: rotate(0deg)
    }
    to {
    transform: rotate(360deg)
    }
`;

const LoadingOverlay = () => {
  return (
    <div
        className={css`
            width: 100%;
            height: 100%;

            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            `
          }
    >
      <div
        className={css`
            width: 4em;
            height: 4em;
            border: 6px solid #fff;
            border-radius: 50%;
            border-color: #fff #fff transparent transparent;
            animation: ${loadingOverlaySpinnerAnimation} 1s linear infinite;
            `}
      >

      </div>
    </div>
  )
}

export default LoadingOverlay

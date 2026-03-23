import React from 'react'
import { Link } from 'react-router-dom'

// import BchBanner from '../../assets/img/cards/beach_banner.png'

import './styles.css'

const Services = () => {
  return (
    <>
        <div className="services-container">
            <div className="ourservices">
                <h2 className ='title'>¡Conoce nuestros servicios!</h2>

                <div className="service-card-container">
                    <div className="card" id='beach'>
                        <h2 className='card-title'>
                            Service Name
                        </h2>
                        <Link className='callTo'>Saber más</Link>
                    </div>

                    <div className="card" id='bbq'>
                        <h2 className='card-title'>
                            Service Name
                        </h2>
                        <Link className='callTo'>Saber más</Link>
                    </div>

                    <div className="card" id='picnic'>
                        <h2 className='card-title'>
                            Service Name
                        </h2>
                        <Link className='callTo'>Saber más</Link>
                    </div>

                    <div className="card" id='dance'>
                        <h2 className='card-title'>
                            Service Name
                        </h2>
                        <Link className='callTo'>Saber más</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Services

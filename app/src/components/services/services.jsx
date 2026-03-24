import React , { useState } from 'react'
import { Link } from 'react-router-dom'

// import BchBanner from '../../assets/img/cards/beach_banner.png'

import './styles.css'

const Services = () => {

    const [activePack, setActivePack] = useState(null)

    const openPack = (packId) => {
        setActivePack(packId)
    }

    const closePack = () => {
        setActivePack(null)
    }



    return (
        <>
            <div className="services-container">
                <div className="ourservices">
                    <h2 className='title'>¡Conoce nuestros servicios!</h2>

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

                        <div className="card" id='stay'>
                            <h2 className='card-title'>
                                Service Name
                            </h2>
                            <Link className='callTo'>Saber más</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packs we may offer appears here */}
            <div className="packs-container">
                <h2 className="packs-title">Or try our new packs that we offer!</h2>

                <div className="packs">
                    <div className="pack-card">
                        <div className="packtitle">
                            Pack title
                        </div>
                        <hr className="divisor" />
                        <ul className="pack-perks-list">
                            <li className="item-perk">3 Subservicios de Hospedaje</li>
                            <li className="item-perk">2 Subservicios de PLata</li>
                            <li className="item-perk">1 Servicio BBQ para 3 personas</li>
                            <li className="item-perk">Servicio de picnic</li>
                        </ul>

                        <h3 className='perk-price'>$99.99</h3>

                        <button 
                        className='readMorePerk btn'
                        onClick={() => openPack('pack1')
                        }
                        >Ver más</button>
                    </div>

                    <div className="pack-card">
                        <div className="packtitle">
                            Pack title
                        </div>
                        <hr className="divisor" />
                        <ul className="pack-perks-list">
                            <li className="item-perk">3 Subservicios de Hospedaje</li>
                            <li className="item-perk">2 Subservicios de PLata</li>
                            <li className="item-perk">1 Servicio BBQ para 3 personas</li>
                            <li className="item-perk">Servicio de picnic</li>
                        </ul>

                        <h3 className='perk-price'>$99.99</h3>

                        <button 
                        className='readMorePerk btn'
                        onClick={() => openPack('pack2')}
                        >Ver más</button>
                    </div>

                    <div className="pack-card">
                        <div className="packtitle">
                            Pack title
                        </div>
                        <hr className="divisor" />
                        <ul className="pack-perks-list">
                            <li className="item-perk">3 Subservicios de Hospedaje</li>
                            <li className="item-perk">2 Subservicios de Playa</li>
                            <li className="item-perk">1 Servicio BBQ para 6 personas</li>
                            <li className="item-perk">Servicio de picnic</li>
                            <li className="item-perk">Experience Deluxe</li>
                        </ul>

                        <h3 className='perk-price'>$99.99</h3>

                        <button 
                        className='readMorePerk btn'
                        onClick={() => openPack('pack3')}
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </div>

            {activePack === 'pack1'&& (
                <div className='modal-container'>
                    <div className="modal-content">
                        <h2>Pack 1</h2>
                    <p>Detalles del pack 1...</p>
                    <button 
                        onClick={closePack}
                    >Cerrar
                    </button>
                    </div>
                </div>
            )}
            {activePack === 'pack2'&& (
                <div className='modal-container'>
                    <div className="modal-content">
                        <h2>Pack 2</h2>
                    <p>Detalles del pack 2...</p>
                    <button 
                        onClick={closePack}
                    >Cerrar
                    </button>
                    </div>
                </div>
            )}
            {activePack === 'pack3'&& (
                <div className='modal-container'>
                    <div className="modal-content">
                        <h2>Pack 3</h2>
                    <p>Detalles del pack 3...</p>
                    <button 
                        onClick={closePack}
                    >Cerrar
                    </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Services

import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faWifi,
    faWaterLadder,
    faSquareParking,
    faSnowflake,
    faUtensils,
    faUmbrellaBeach,
    faBellConcierge,
    faFireBurner,
    faBath
} from "@fortawesome/free-solid-svg-icons"

import "./services.css"

const amenitiesConfig = {
    wifi: {
        label: "WiFi",
        icon: faWifi
    },
    pool: {
        label: "Piscina",
        icon: faWaterLadder
    },
    parking: {
        label: "Estacionamiento",
        icon: faSquareParking
    },

    air_conditioning: {
        label: "Aire acondicionado",
        icon: faSnowflake
    },

    rest_areas: {
        label: "Áreas de descanso",
        icon: faUmbrellaBeach
    },

    personalized_attention: {
        label: "Atención personalizada",
        icon: faBellConcierge
    },

    continental_breakfast: {
        label: "Desayuno continental",
        icon: faUtensils
    },

    bbq_grill: {
        label: "Parrilla",
        icon: faFireBurner
    },
    towels: {
        label: "Toallas (Piscina y ducha)",
        icon: faBath
    }

}

const Amenities = ({ amenities = [] }) => {
  
    if(amenities.length === 0){
        return null
    }

    return (
    <div className='room-amenities'>
        <h2>Tu estadía con nosotros incluye:</h2>

        <div className="amenities-grid">
            {amenities.map((amenity) => {
                const config = amenitiesConfig[amenity]
                
                if(!config){
                    return null
                }

                return (
                    <div 
                        key={amenity}
                        className='amenity-item'
                        >
                            <FontAwesomeIcon 
                                icon={config.icon}
                                className="amenity-icon"
                            />
                            <span className='amenity-label mx-1'>{config.label}</span>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Amenities
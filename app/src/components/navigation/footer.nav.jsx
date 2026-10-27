import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons"
import Silouette from "../../assets/icons/logo_silueta.webp"
import "./navigation.css"


const Footer = () => {

  const IG_URL = import.meta.env.VITE_IG_URL
  const WSP_URL = import.meta.env.VITE_WSP_URL

  return (
    <div className='footer-container max-w-full min-h-100 grid grid-cols-3 gap-6 px-10 py-4 mt-25'>
      <div className='col col1 flex flex-wrap w-70'>
        <img 
          src={Silouette} 
          alt="Casa Latina Logo Outline"
          className="w-70"
          />

          <div className="w-full social flex justify-center gap-2">
            <a href={WSP_URL} rel="noopener noreferrer" className='wsp flex justify-center items-center rounded-xl'>
              <FontAwesomeIcon icon={faWhatsapp} style={{color: "rgba(255, 255, 255) !important",}} className='footer-icon'/>
            </a>
            <a href={IG_URL} rel="noopener noreferrer" className='ig flex justify-center items-center rounded-xl'>
              <FontAwesomeIcon icon={faInstagram} style={{color: "rgba(255, 255, 255) !important"}} className='footer-icon'/>
            </a>
          </div>
      </div>

      <div className='col col2'>
        <h3 className='font-medium text-xl'>
          Soporte
          </h3>
        <ul>
          <li>Preguntas frecuentes</li>
          <li>Términos y condiciones</li>
          <li>Centro de ayuda</li>
        </ul>
      </div>

      <div className='col col3'>
        <h3 className='font-medium text-xl'>
        Casa Latina
        </h3>
        <ul>
          <li>Quíenes somos</li>
          <li>Nuestro equipo</li>
          <li>Contáctanos</li>
        
        </ul>
      </div>


      <div className='col-start-1 col-end-4 h-10 flex items-center justify-center'>
      <h3 className='text-center'>
        Desarrollado por | Amaro González {/* Someday this will redirect to my portfolio */}
      </h3>
      </div>
    
    </div>
  )
}

export default Footer
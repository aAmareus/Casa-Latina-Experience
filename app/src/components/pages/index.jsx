import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MainHero from '../navigation/mainHero.jsx'
import Poimap from '../services/poi.map.jsx'
import Footer from "../navigation/footer.jsx"
import './index.css'

import Catalogo from "../navigation/catalogo.jsx"

import Silhouette from '../../assets/icons/logotipo.png' /* Need to work in this fucking shit */



const Index = () => {

  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cardRef.current.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
  {threshold: 0.5});

  if (cardRef.current) {
    observer.observe(cardRef.current);
  }

  return () => observer.disconnect();
  }, []);

  return (
    <div className="index-page-container w-full flex flex-col gap-25">
      <MainHero />

      <div className="showcase-catalogo w-full">
        <h2 
          className='font-semiblack text-4xl px-24 pb-15'
          style={{ fontFamily: 'var(--montserrat)'}}
        >Échale un vistazo a nuestras habitaciones.</h2>
        <Catalogo />
      </div>

      <Poimap />
      <Footer />
    </div>
  )
}

export default Index

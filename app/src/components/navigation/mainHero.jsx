import React, { useEffect, useRef } from 'react'
import HeroBanner from '../../assets/img/banner_voidless.png'
import Banner2 from '../../assets/img/banner2.jpeg'

import './navigation.css'


// const stats =[{name: 'Days open', value: '365'},
//               {name: 'Experiencias customizables', value: '+3'},
//               {name: 'Momentos inolvidables', value: '∞'}]


const MainHero = () => {

    const statsRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    entry.target.classList.add("is-visible")
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.5 }
        )
        if(statsRef.current){
            observer.observe(statsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32'>
            <img
                src={Banner2}
                alt="background"
                className='absolute inset-0 -z-10 size-full object-cover object-center md:object-center hero-img'
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl hero-title">Descubre Casa Latina Brasil Experience</h2>
                    <p className="main-txt mt-8 text-lg font-medium text-pretty sm:text-xl/8 hero-text">
                        Sua experiência privada na Região dos Lagos começa aqui. <br />
                        Hospedagem exclusiva com atendimento personalizado, traslados, experiências na praia e momentos criados sob medida para quem quer descansar de verdade.
                    </p>
                </div>
                <dl ref={statsRef} className="stats mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="item-info flex flex-col justify-around text-xl">
                        Días al año 
                        <span className="statDays text-3xl"></span>
                    </div>

                    <div className="item-info text-xl">
                        Experiencias personalizadas
                        <span className="customExp text-3xl"></span>
                    </div>

                    <div className="item-info text-xl">
                        Momentos inolvidables
                        <span className="moments text-4xl">∞</span>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default MainHero

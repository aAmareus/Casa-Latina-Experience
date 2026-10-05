import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { getRooms } from "../../../api/rooms.api.js"
import RoomCard from "../rooms/roomCard.jsx"

const Catalogo = () => {
  
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        
        const loadRooms = async () => {

        try{
            const data = await getRooms()

            setRooms(data.rooms)
        } catch(error){
            console.error(error)
            setError("Couldn't get rooms ")
        } finally {
            setLoading(false)
        }
    
    }

    loadRooms()
    }, [])
    
    if(loading){
        return <p>Cargando habitaciones...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (
    <div className="w-[75%] mx-auto">
        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            autoplay={{
                delay: 5500,
                disableOnInteraction: true,
            }}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="swiper w-full flex justify-center items-center mx-auto"
        >
            {rooms.map((room) => (
                <SwiperSlide 
                    key={room._id}
                    className="w-full flex justify-center items-center"
                >
                    <RoomCard room={room} />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default Catalogo
import React from 'react'

// Swiper react Components
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, Pagination } from 'swiper/modules'

// Swiper styles
import 'swiper/css'
import './styles.css'
import 'swiper/css/pagination'

import Slide1 from '../../assets/img/slider/bbq.png'
import Slide2 from '../../assets/img/slider/beach.jpg'
import Slide3 from '../../assets/img/slider/dancing.png'
import Slide4 from '../../assets/img/slider/picnic.png'


function Slider() {
    return(
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: false,
                }}

                modules={[Autoplay, Pagination]}

                className='myswiper'
            >
                <SwiperSlide className='slide img-container'>
                    <img 
                    src={Slide1} 
                    alt="" 
                    className='img img-slider'
                    />
                </SwiperSlide>
                <SwiperSlide className='slide img-container'>
                    <img 
                    src={Slide2} 
                    alt=""
                    className='img img-slider'
                    />
                </SwiperSlide>
                <SwiperSlide className='slide img-container'>
                    <img 
                    src={Slide3} 
                    alt="" 
                    className='img img-slider'
                    />
                </SwiperSlide>
                <SwiperSlide className='slide img-container'>
                    <img 
                    src={Slide4} 
                    alt=""
                    className='img img-slider'
                    />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Slider
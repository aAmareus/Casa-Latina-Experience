import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { imgUrl } from "../../utils/imgUrls.utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./items.css";

const API_URL = import.meta.env.VITE_API_URL;

const RoomGallery = ({ room }) => {
    
    const { id } = useParams();
  
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
    if(!room.images || room.images.length === 0) {
        return ( 
            <div className="no-room-images">
                <p>Esta habitación aún no tiene imagenes</p>
            </div>
        )
    }

    const hasMultipleImages = room.images.length > 1

    return (
    <div className="gallery-container w-full">
          <Swiper
            loop={room.images.length > 1}
            navigation={hasMultipleImages}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="room-main-swiper rounded-xl"
          >
            {room.images.map((image, index) => (
              <SwiperSlide key={image} className="room-main-swiper-slide w-full">
                <img
                  src={imgUrl(image)}
                  alt={`${room.name} - Imagen ${index + 1}`}
                  className="swiper-slide-image image mx-auto aspect-4/3 w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {hasMultipleImages && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="room-thumbs-swiper mt-2.5"
            >
              {room.images.map((image, index) => (
                <SwiperSlide key={image} className="room-thumbs-swiper-slide">
                  <img
                    src={imgUrl(image)}
                    alt={`${room.name} - miniatura ${index + 1}`}
                    className="swiper-slide-thumb-image mx-auto aspect-4/3 object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
    </div>
  )
}

export default RoomGallery
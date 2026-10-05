import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faWaterLadder,
  faMugHot,
  faWind,
  faCar,
  faBurger,
  faLayerGroup,
  faWifi,
  faHandHoldingHeart,

} from "@fortawesome/free-solid-svg-icons"

import Amenities from "../services/amenities.jsx"
import "./items.css"

const API_URL = import.meta.env.VITE_API_URL

const RoomCard = ({ room }) => {
  const navigate = useNavigate()

  const handleViewMore = () => {
    navigate(`/catalogo/rooms/${room._id}`)
  }

  return (
    <div className="room-card flex gap-4 p-4 rounded w-[90%] max-w-300 mx-auto">
      <div className="room-card-img">
        {room.images?.length > 0 ? (
          <>
            <img
              className="room-main-img" 
              src={`${API_URL}${room.images[0]}`}
              alt={room.name}
            />
            <div className="room-small-img">
              {room.images
              .slice(1, 4).map((image, index) => (
                <img 
                  key={image}
                  src={`${API_URL}${image}`}
                  alt={`${room.name} ${index + 2}`}
                  className="small-img"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="room-no-img text-red-700">
            Sin imágenes
          </div>
        )}
      </div>

      <div className='room-card-info flex flex-col justify-between p-6 items-center'>
        <div className="room-card-info-values w-full flex flex-col gap-0.5">
          <h2 className="room-title font-bold text-3xl">{room.name}</h2>
          <p className="room-desc text">{room.description}</p>
          <span className="room-cap text">Capacidad: {room.capacity} personas.</span>
          <p className="room-price text">
            Desde <span>R${room.priceLowSeason?.toLocaleString("es-CL")}</span> / noche.
          </p>

          <Amenities amenities={room.amenities} />
        </div>
        <button
          type="button"
          onClick={handleViewMore}
          className="goto-btn p-2 w-1/3 cursor-pointer"
        >
            Ver más
          </button>
      </div>
    </div>
  )
}

export default RoomCard
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Await } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

import RoomGallery from "../rooms/roomGallery.room.jsx";
import Amenities from "../services/amenities.service.jsx"
import Poi from "../services/poimap.service.jsx"
import Bookingmodal from "../reservations/bookingmodal.jsx";
import "./roomdetail.css";

import { getRoomById } from "../../../api/rooms.api.js";

const API_URL = import.meta.env.VITE_API_URL;

const RoomDetail = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const [checkingSession, setCheckingSession] = useState(false)

  const handleBooking = () => {
    if(checkingSession) return

    setCheckingSession(true)

    try {
      const response = fetch(
        `${API_URL}/api/users/profile`,
        {
          method: "GET",
          credentials: "include"
        }
      )

      if(response.ok) {
        setShowModal(true)
        return
      }

      if(response.status === 401 || response.status === 403) {
        navigate("/login",
          {
            state: {
              from: location.pathname,
              openBooking: true
            }
          }
        )

        return
      }

      throw new Error(`Error HTTP ${response.status}`)
    } catch(error) {
      console.error("Error verificando sesión: ", status)

      setError("No pudimos verificar tu sesión. Inténtalo nuevamente. ")
    } finally {
      setCheckingSession(false)
    }
  }

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const data = await getRoomById(id);

        setRoom(data.room);
      } catch (e) {
        console.error("Error loading room", e);
        setError("Can't load room");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  useEffect(() => {
    if(
      location.state?.openBooking !== true ||
      location.state?.from !== location.pathname ||
      !room
    ) {
      return
    }

    let cancelled = false

    const resumeBooking = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/users/profile`,
          {
            credentials: "include"
          }
        )

        if(!cancelled && response.ok) {
          setShowModal(true)

          navigate(location.pathname, {
            replace: true,
            state: null
          })
        }
      } catch(error) {
        console.error("Error recuperando reserva: ", error)
      }
    }

    resumeBooking()

    return () => {
      cancelled = true
    }
  }, [room, location, navigate])

  if (loading) {
    return <p>Cargando habitación...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!room) {
    return <p>Habitación no encontrada.</p>;
  }

  return (
    <>
      <div className="room-detail w-full flex flex-wrap py-15 px-50 relative">
        <div className="room-detail-header w-full">
          <h1 className="text-4xl font-bold">{room.name}</h1>
        </div>

        <div className="room-detail-gallery w-1/3 px-2">
          <RoomGallery room={room} />
        </div>

        <div className="room-detail-info w-2/3 px-2 flex flex-col gap-3">
          <h1 className="text-xl font-bold">Sobre la habitación</h1>
          <hr />

          <p>{room.description}</p>
          <p>
            Capacidad:
            <FontAwesomeIcon icon={faPerson} />
            {room.capacity} personas
          </p>

          <div className="amenities">
            <Amenities amenities={room.amenities}/>
          </div>

          <hr />

          <div className="prices flex flex-wrap gap-3 justify-center">
            <h2 className="text-xl w-full text-center">Precios por temporada</h2>

            <div className="price">
              <p>Temporada baja</p>
              <span>R$ {room.priceLowSeason?.toLocaleString("es-CL")}</span>
              <p>noche</p>
            </div>

            <div className="price">
              <p>Temporada media</p>
              <span>R$ {room.priceMidSeason?.toLocaleString("es-CL")}</span>
              <p>noche</p>
            </div>

            <div className="price">
              <p>Temporada alta</p>
              <span>R$ {room.priceHighSeason?.toLocaleString("es-CL")}</span>
              <p>noche</p>
            </div>

            <div className="price">
              <p>Temporada Carnaval</p>
              <span>R$ {room.priceCarnivalSeason?.toLocaleString("es-CL")}</span>
              <p>noche</p>
            </div>
          </div>

          <button 
            className="w-[50%] mx-auto py-2 select-btn btn rounded-2 cursor-pointer rounded-xl"
            disabled={checkingSession}
            room={room}
            onClick={handleBooking}
            >Quiero reservar!</button>
        </div>
      </div>

      <hr  className="w-[80%] mx-auto"/>
      <Poi />


      {showModal && (
        <Bookingmodal
          room={room}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RoomDetail;

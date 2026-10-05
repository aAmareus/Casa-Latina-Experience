import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

import RoomGallery from "../rooms/roomGallery.jsx";
import Amenities from "../services/amenities.jsx"
import Poi from "../services/poi.map.jsx"
import "./roomdetail.css";

import { getRoomById } from "../../../api/rooms.api";

const API_URL = import.meta.env.VITE_API_URL;

const RoomDetail = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="room-detail w-full flex flex-wrap p-15 px-50 ">
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

          <button className="w-[50%] mx-auto py-2 select-btn btn rounded-2 cursor-pointer rounded-xl">Quiero reservar!</button>
        </div>
      </div>

      <hr  className="w-[80%] mx-auto"/>
      <Poi />
    </>
  );
};

export default RoomDetail;

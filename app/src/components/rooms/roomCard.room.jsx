import { useNavigate } from "react-router-dom";

import Amenities from "../services/amenities.service.jsx";
import { imgUrl } from "../../utils/imgUrls.utils.jsx";
import "./items.css";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/catalogo/rooms/${room._id}`);
  };

  return (
    <>
      <div className="room-card flex gap-4 p-4 rounded w-[90%] mx-auto">
        <div className="room-card-img h-[90%] w-1/3">
          {room.images?.length > 0 ? (
            <>
              <img
                className="room-main-img object-cover aspect-4/3"
                src={imgUrl(room.images[0])}
                alt={room.name}
              />
              <div className="room-small-img">
                {room.images.slice(1, 4).map((image, index) => (
                  <img
                    key={image}
                    src={imgUrl(image)}
                    alt={`${room.name} ${index + 2}`}
                    className="small-img aspect-3/4 object-cover"
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="room-no-img text-red-700">Sin imágenes</div>
          )}
        </div>

        <div className="room-card-info flex flex-col justify-between p-6 items-center w-2/3">
          <div className="room-card-info-values w-full flex flex-col gap-0.5">
            <h2 className="room-title font-bold text-3xl">{room.name}</h2>
            <p className="room-desc text text-wrap">{room.description}</p>
            <br />
            <span className="room-cap text">
              Capacidad: {room.capacity} personas.
            </span>

            <Amenities amenities={room.amenities} />

            <p className="room-price text">
              Desde{" "}
              <span className="text-2xl mt-5">
                R${room.priceLowSeason?.toLocaleString("es-CL")}
              </span>{" "}
              / noche.
            </p>
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
    </>
  );
  console.log("images:", room.name, room.images);
};


export default RoomCard;

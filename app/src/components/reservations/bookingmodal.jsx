import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { quoteReserva } from "../../../api/reservas.api.js";

import "./bookingmodal.css";

const Bookingmodal = ({ room, onClose }) => {
  const [range, setRange] = useState(undefined);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!range?.from || !range?.to) {
      setQuote(null);
      return;
    }

    const loadQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuote(null);

        const checkIn = formatDate(range.from);
        const checkOut = formatDate(range.to);

        const data = await quoteReserva(room._id, checkIn, checkOut);

        setQuote(data.quote);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, [range, room._id]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date) => {
    return new Intl.DateTimeFormat("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const seasonLabels = {
    low: "Temporada baja",
    mid: "Temporada media",
    high: "temporada alta",
    carnival: "Carnaval",
  };

  const QuoteSummary = ({ quote }) => {
    return (
      <div className="quote-summary">
        <div className="quote-breakdown">
          {Object.entries(quote.breakdown).map(([season, details]) => (
            <div key={season} className="quote-row flex flex-col">
              <div>
                <span className="w-full">{seasonLabels[season] ?? season}</span>

                <p >
                  {details.nights} {details.nights === 1 ? "noche" : "noches"}
                  {"*"}
                  R${details.pricePerNight.toLocaleString("es-CL")}
                </p>
              </div>

              <span>Subtotal: R${details.subtotal.toLocaleString("es-CL")}</span>
            </div>
          ))}
        </div>

        {quote.discountpercentage > 0 && (
          <div className="quote-description">
            <div className="quote-row">
              <span>Subtotal: </span>

              <span>R${quote.subtotal.toLocaleString("es-CL")}</span>
            </div>

            <div className="quote-row quote-discount">
              <span>Descuento: ({quote.discountpercentage}%)</span>

              <span>- R${quote.discountAmount.toLocaleString("es-CL")}</span>
            </div>
          </div>
        )}

        <div className="quote-total">
          <div className="flex">
            <strong>Total</strong>

            <span>
              {quote.numberOfNights}{" "}
              {quote.numberOfNights === 1 ? "noche" : "noches"}
            </span>
          </div>

          <strong>R${quote.total.toLocaleString("es-CL")}</strong>
        </div>
      </div>
    );
  };

  return (
    <div
      className="booking-modal-overlay absolute z-50 top-35 right-50 p-5 w-250 h-142.5 flex"
      onClick={handleOverlayClick}
    >
      <div className="booking-modal relative">
        <button
          type="button"
          className="booking-modal-close cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        <div className="booking-calendar-section flex flex-wrap">
          <h2 className="w-full">Selecciona tus fechas</h2>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={{
              before: new Date(),
            }}
          />

          {range?.from && (
            <div className="booking-selected-dates px-10 gap-2.5 flex flex-col justify-center">
              <div>
                <span>Check-in: </span>

                <strong>{formatDisplayDate(range.from)}</strong>
              </div>

              <div>
                <span>Check-out: </span>

                <strong>
                  {range.to
                    ? formatDisplayDate(range.to)
                    : "Seleccione una fecha"}
                </strong>
              </div>
            </div>
          )}
        </div>

        <div className="booking-summary">
          
          <hr />

          <h2>Tu reserva</h2>   

          {!range?.from && (
            <p className="booking-help">
              Selecciona tu fecha de llegada y salida.
            </p>
          )}

          {!range?.from && !range?.to && (
            <p className="booking-help">Ahora selecciona la fecha de salida.</p>
          )}

          {loading && <p className="booking-loading">Calculando precio...</p>}

          {error && <div className="booking-error">{error}</div>}

          {quote && <QuoteSummary quote={quote} />}
        </div>
      </div>
    </div>
  );
};

export default Bookingmodal;

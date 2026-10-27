import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainHero from "../navigation/mainHero.nav.jsx";
import Navbar from "../navigation/navbar.nav.jsx";
import ContactForm from "../forms/contact.form.jsx";
import Catalogo from "../navigation/catalogo.nav.jsx";
import Contact from "../forms/contact.form.jsx";
import Poimap from "../services/poimap.service.jsx";
import Aboutus from "../navigation/aboutUs.nav.jsx";
import Footer from "../navigation/footer.nav.jsx";

import "./index.css";

const Index = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="index-page-container w-full">
      <MainHero />
      <Navbar />

      <div className=" mt-30 discover px-24 flex flex-wrap gap-6">
        <div className="section section1 w-full">
          <h2 className="font-semiblack text-3xl">
            Descubre todo lo que Casa Latina tiene para ti
          </h2>

          <p>
            En Casa Latina Brasil Experience, la experiencia continúa más allá
            de tu habitación. Hemos creado espacios para descansar, compartir,
            divertirte y disfrutar de cada momento de tus vacaciones.
          </p>

          <div className="mx-6">
            <ul className="list-disc">
              <li className="item-list benefits">Piscina con ducha exterior</li>
              <li className="item-list benefits">
                Flotadores y momentos de diversión
              </li>
              <li className="item-list benefits">Rincón de hamacas</li>
              <li className="item-list benefits">
                Rincón Chileno y de lectura, un espacio con identidad propia y
                un pequeño homenaje a nuestras raíces.
              </li>
              <li className="item-list benefits">
                Juegos de mesa para compartir momentos entretenidos.
              </li>
              <li className="item-list benefits">
                Quincho equipado, perfecto para reunirse y disfrutar.
              </li>
              <li className="item-list benefits">
                Estacionamiento privado para tu comodidad.
              </li>
            </ul>
          </div>
        </div>

        <div className="section section2 w-full">
          <h2 className=' font-semiblack text-3xl'>
            Saborea Casa Latina
          </h2>

        <p>
          Desayuno para disfrutar sin prisas, incluido en tu tarifa por cada habitación y cantidad de huéspedes:
        </p>

        <ul className="list-disc mx-6">
          <li>bandeja de café/te a la habitación.</li>
          <li>Cantinho do Café, nuestro rincón para que disfrutes ilimitadamente.</li>
          <li>Frigobar con productos a la venta, bebidas y otros productos a tu disposición, con listado de precios publicados.</li>
        </ul>
        </div>
      </div>
      <div className="showcase-catalogo w-full mt-25">
        <h2
          className="font-semiblack text-4xl px-24 pb-15"
          style={{ fontFamily: "var(--montserrat)" }}
        >
          Encuentra tu espacio ideal
        </h2>
        <Catalogo />
      </div>

      <Aboutus />
      <ContactForm />
      <Poimap />

      <Footer />
    </div>
  );
};

export default Index;

import React from 'react'
import Travel from "../../assets/img/travel.webp"

import "./navigation.css"

const AboutUs = () => {
  return (
    <div className='w-full px-50 mt-25'>
        <h2 className='font-semibold text-5xl w-full'>Sobre nosotros</h2>
        <div className="section section1">
            <p className='text-justify'>
            Somos un matrimonio chileno que decidió dar un paso gigante:  
                <span className='italic bg-green-500'>
                     &nbsp;Cruzar fronteras para convertir un sueño en realidad.
                </span>

                <br />
                Nos apasiona la naturaleza, las avanturas, la música, el arte, la gastronomía y el fuego, ese que reúne a las personas alrededor de una buena conversación y una gran experiencia.
                
                <br />
                <q className='bg-amber-300'>
                    Somos creativos, visionarios y creemos profundamente que los pequeños detalles son los que hacen inolvidables los grandes momentos.
                </q>
            </p>
        </div>

        <div className="section section2 flex flex-wrap">
            <p className='text-justify'>
                Luego de dedicarnos a la producción de eventos, la gastronimía, el baile y el servicio a las personas, decidimos fusionar todos nuestros talentos en un solo proyecto:
                
                <span>
                    &nbsp;entrar en el mundo hotelero y turístico para poder plasmar y desarrollar nuestra mejor versión y crear un espacio donde cada huésped no solo encuentre un lugar para descansar, sino también un lugar donde sentirse bienvenido, cuidado y vivir experiencias auténticas.
                </span>
            </p>

            <h2 className='font-semibold semi-title w-full mt-10'>
                Nuestras propias aventuras
            </h2>

            <p className='w-200 text-justify pr-5'>
                Recorriendo Chile, Argentina y Brasil nos permitieron descubrir distintos estilos de hospitalidad, conocer lugares maravillosos e inspirarnos en las mejores ideas para desarrollar un concepto diferente, cercano y lleno de identidad.

                <br />
                <br />

                Así nació nuestro proyecto, con la convicción de que viajar no se trata solo de conocer un destino, sino de crear recuerdos que permanezcan siempre.

                <br />

                Nuestro compromiso es ofrecer una atención personalizada, cálida y cercana, preocupándonos de cada detalle para que cada experiencia supere las expectativas. Queremos que quienes nos visiten disfruten de la esencia de Brasil con el cariño, la alegría y la hospitalidad latina que nos caracteriza.

                <br />
                <br />
                Más que recibir huéspedes, nuestro mayor propósito es recibir nuevos amigos y hacer que cada persona que pase por nuestra casa se lleve momentos inolvidables, sonrisas sinceras y el deseo de volver.

                <br />
                <br />

                <span className='semi-title bg-green-500'>¡Bienvenidos a esta gran aventura! Será un honor ser parte de sus mejores recuerdos en Brasil.</span>
            </p>
            <div>
                <img 
                    className='ourTravelImg w-100 h-100 object-cover object-center rounded-[50px]'
                    src={Travel} 
                    alt="Nuestro viaje"
                     />
            </div>
        </div>
    </div>
  )
}

export default AboutUs
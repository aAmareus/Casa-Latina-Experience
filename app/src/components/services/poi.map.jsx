import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const categoryConfig = {
    beach: {
        label: "playa",
        color: "#00b7ff"
    },
    restaurant: {
        label: "Restaurante",
        color: "#412d22"
    },
    supermarket: {
        label: "Supermercados",
        color: "#a76ece"
    },
    pharmacy: {
        label: "Farmacias y hospitales",
        color: "#ce4b5b"
    },
    tourism: {
        label: "Turismo",
        color: "#0b7625"
    },
    other: {
        label: "Otros",
        color: "#292929"
    }
}

const Poimap = () => {

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [activeCategories, setActiveCategories] = useState([])

    useEffect(() => {
        const loadMap = async() => {
            try {
                mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

                const propertyLocation = {
                    latitude: -22.823442065291548,
                    longitude: -42.20596293870038
                }

                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: "mapbox://styles/mapbox/streets-v12",
                    center: [
                        propertyLocation.longitude,
                        propertyLocation.latitude
                    ],
                    zoom: 14
                })

                // Casa Latina's Marker
                new mapboxgl.Marker({
                    color: '#ff0000'
                })
                .setLngLat([
                    propertyLocation.longitude,
                    propertyLocation.latitude
                ])
                .setPopup(
                    new mapboxgl.Popup({
                        offset: 25
                    }).setHTML(
                        `<strong>Casa Latina Experience</strong>`
                    )
                )
                .addTo(mapRef.current)

                // get POIS
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pois`)

                if(!response.ok){
                    throw new Error('Cant get points of interest')
                }

                const points = await response.json()

                console.log("POIs recibidos: ", points)

                const bounds = new mapboxgl.LngLatBounds();

                bounds.extend([
                    propertyLocation.longitude,
                    propertyLocation.latitude
                ])

                const categories = new Set()

                points.forEach((point) => {

                    const coordinates = [
                        Number(point.longitude),
                        Number(point.latitude)
                    ]

                    console.log(`Agregando ${point.name}: `, coordinates)

                    const config =
                        categoryConfig[point.category] ?? categoryConfig.other

                    categories.add(
                        categoryConfig[point.category] ? point.cateogory : "other"
                    )
                    new mapboxgl.Marker({
                        color: config.color
                    })
                    .setLngLat(coordinates)
                    .setPopup(
                        new mapboxgl.Popup({
                            offset: 25
                        }).setHTML(`
                            <strong>${point.name}</strong>
                            <p>${point.description ?? ""}</p>
                            `)
                    )
                    .addTo(mapRef.current)

                    bounds.extend(coordinates)
                })

                setActiveCategories([...categories])

                if(points.length > 0){
                    mapRef.current.fitBounds(bounds,{
                        padding: 80,
                        maxZoom: 15,
                        duration: 1000
                    })
                }

            } catch(e){
                console.error("Error loading map: ", e)
            }
        }

        loadMap()

        return () => {
            if(mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    return (
        <div className="poi-container py-12">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-6 text-3xl font-semibold">
                    ¿Que hay cerca de Casa Latina?
                </h2>
                <div ref={mapContainerRef} className="h-125 w-full overflow-hidden rounded-2xl">
                    <div className="absolute bottom-6 left-6 z-10 min-w-[180px] rounded-xl">asd</div>
                </div>
            </div>
        </div>
  )
}

export default Poimap
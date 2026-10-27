import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "./services.css"
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
                        categoryConfig[point.category] ? point.category : "other"
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
        <div className="poi-container py-12 mt-25">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-6 text-3xl font-semibold">
                    Descubre que hacer durante tu estadía
                </h2>
                <div ref={mapContainerRef} className="h-125 w-full overflow-hidden rounded-2xl">
                    <div className="legend absolute bottom-6 right-6 z-10 p-2.5 min-w-45 rounded-xl">

                        <h2 className="mb-3 font-semibold text-white">
                            Leyenda
                        </h2>

                        <div className="flex flex-col gap-2">
                            {/* Our marker */}
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-4 w-6"
                                    style={{backgroundColor: "#ff0000"}}
                                />

                                <span className="text-sm text-white">
                                    Casa Latina
                                </span>
                            </div>

                            {/* Existing Categories Points */}
                            {activeCategories.map((category) => {
                                const config =
                                    categoryConfig[category] ??
                                    categoryConfig.other

                                return (
                                    <div
                                        key={category}
                                        className="flex items-center gap-2"
                                    >
                                        <span 
                                            className="h-4 w-6"
                                            style={{
                                                background:config.color
                                            }}
                                        />

                                        <span className="text-sm text-white">
                                            {config.label}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Poimap
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "./services.css"
import "mapbox-gl/dist/mapbox-gl.css";

const categoryConfig = {
    beach: {
        label: "Playa",
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

const buildPopupContent = (name, description) => {
    const container = document.createElement("div")

    const title = document.createElement("strong")
    title.textContent = name ?? ""
    container.appendChild(title)

    if(description) {
        const text = document.createElement("p")
        text.textContent = description
        container.appendChild(text)
    }

    return container
}
const Poimap = () => {

    const mapContainerRef = useRef(null);

    const [activeCategories, setActiveCategories] = useState([])

    useEffect(() => {

        let cancelled = false

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

        const propertyLocation = {
            latitude: -22.823442065291548,
            longitude: -42.20596293870038
        }

        const map = new mapboxgl.Map({
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
            color: "#ff0000" 
        })
        .setLngLat([
            propertyLocation.longitude,
            propertyLocation.latitude
        ]).setPopup(
            new mapboxgl.Popup({ 
                offset: 25 
            }).setDOMContent(buildPopupContent("Casa Latina Experience"))
        ).addTo(map)


        const loadPoints = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pois`)

                if(!response.ok) {
                    throw new Error("Can't get points of interest")
                }

                const points = await response.json()

                if(cancelled) return

                const bounds = new mapboxgl.LngLatBounds()

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
                        }).setDOMContent(
                            buildPopupContent(point.name, point.description)
                        )
                    )
                    .addTo(map)

                    bounds.extend(coordinates)
                })

                setActiveCategories([...categories])

                if(points.length > 0) {
                    map.fitBounds(bounds, {
                        padding: 80,
                        maxZoom: 15,
                        duration: 1000
                    })
                }
            } catch(e) {
                if(!cancelled) console.error("Error loading POIs: ", e)
            }
        }

        loadPoints()

        return () => {
            cancelled = true
            map.remove()
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
                            <div className="flex items center gap-2">
                                <span 
                                    className="h-4 w-6"
                                    style={{backgroundColor: "#ff0000"}}
                                    />
                                
                                <span className="text-sm text-white">
                                    Casa Latina
                                </span>
                            </div>

                            {/*  Shows existing points */}
                            {activeCategories.map((category) => {
                                const config =
                                    categoryConfig[category] ??
                                    categoryConfig.other

                                return (
                                    <div
                                        key={category}
                                        className="flex items-center gap-2">
                                            <span 
                                                className="h-4 w-6"
                                                style={{ background: config.color }}
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
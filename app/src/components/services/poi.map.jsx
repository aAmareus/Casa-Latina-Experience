import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { maxGeneratorDuration } from "motion/react";

const Poimap = () => {

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

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

                points.forEach((point) => {

                    const coordinates = [
                        Number(point.longitude),
                        Number(point.latitude)
                    ]

                    console.log(`Agregando ${point.name}: `, coordinates)

                    new mapboxgl.Marker({
                        color: "#00b7ff"
                    })
                    .setLngLat(coordinates)
                    .setPopup(
                        new mapboxgl.Popup({
                            offset: 25
                        }).setHTML(`
                            <strong>${point.name}</strong>
                            <p>${point.description && ""}</p>
                            `)
                    )
                    .addTo(mapRef.current)

                    bounds.extend(coordinates)

                    if(points.length > 0){
                        mapRef.current.fitBounds(bounds, {
                            padding: 80,
                            maxZoom: 15,
                            duration: 1000
                        })
                    }
                })

            } catch(e){
                console.error("Error loading map: ", e)
            }
        }

        loadMap()
    }, [])

    return (
        <div className="poi-container py-12">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-6 text-3xl font-semibold">
                    ¿Que hay cerca de Casa Latina?
                </h2>
                <div ref={mapContainerRef} className="h-125 w-full overflow-hidden rounded-2xl">
                </div>
            </div>
        </div>
  )
}

export default Poimap
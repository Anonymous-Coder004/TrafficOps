import {
    MapContainer,
    TileLayer,
    useMap
} from "react-leaflet"

import {
    useEffect,
    useRef
} from "react"

function RecenterMap({
    center
}) {

    const map = useMap()

    const isFirstRender = useRef(true)

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        map.flyTo(
            center,
            map.getZoom(),
            {
                duration: 1.5
            }
        )

    }, [center, map])

    return null
}

export default function BaseMap({
    children,
    center = [12.9716, 77.5946],
    zoom = 12,
    height = "400px"
}) {

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{
                height,
                width: "100%"
            }}
        >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap
                center={center}
            />

            {children}

        </MapContainer>
    )
}
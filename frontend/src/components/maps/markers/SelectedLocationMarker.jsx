import {Marker} from "react-leaflet"

export default function SelectedLocationMarker({
    location
}) {

    if(!location){
        return null
    }

    return (
        <Marker
            position={[
                location.lat,
                location.lng
            ]}
        />
    )
}
import {Marker} from "react-leaflet"
import { selectedLocationIcon } from "../utils/icons"
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
            icon={selectedLocationIcon}
        />
    )
}
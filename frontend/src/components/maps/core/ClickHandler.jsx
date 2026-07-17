import {useMapEvents} from "react-leaflet"

export default function ClickHandler({
    onSelect
}) {

    useMapEvents({
        click(e){

            onSelect({
                lat:e.latlng.lat,
                lng:e.latlng.lng
            })

        }
    })

    return null
}
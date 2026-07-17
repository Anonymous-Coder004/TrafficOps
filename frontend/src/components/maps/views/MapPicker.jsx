import BaseMap from "../core/BaseMap"
import ClickHandler from "../core/ClickHandler"
import SelectedLocationMarker from "../markers/SelectedLocationMarker"

export default function MapPicker({
    value,
    onChange,
    center = [12.9716, 77.5946],
    zoom = 12,
    height = "100%"
}) {

    return (
        <BaseMap
            center={center}
            zoom={zoom}
            height={height}
        >

            <ClickHandler
                onSelect={onChange}
            />

            <SelectedLocationMarker
                location={value}
            />

        </BaseMap>
    )
}
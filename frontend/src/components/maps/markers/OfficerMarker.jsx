import { Marker, Popup, Tooltip } from "react-leaflet";
import { officerIcon } from "../utils/icons";

export default function OfficerMarker({ location }) {

    if (!location) return null;

    return (
        <Marker
            position={[location.lat, location.lng]}
            icon={officerIcon}
        >
            <Tooltip
                permanent
                direction="top"
                offset={[0, -25]}
            >
                Team
            </Tooltip>

            <Popup>
                Ground Team
            </Popup>
        </Marker>
    );
}
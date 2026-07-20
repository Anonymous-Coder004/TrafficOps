import { Marker, Popup, Tooltip } from "react-leaflet";
import { incidentIcon } from "../utils/icons";

export default function IncidentMarker({ incident }) {

    if (!incident) return null;

    return (
        <Marker
            position={[
                incident.latitude,
                incident.longitude,
            ]}
            icon={incidentIcon}
        >
            <Tooltip
                permanent
                direction="top"
                offset={[0, -25]}
            >
                Incident
            </Tooltip>

            <Popup>
                {incident.title}
            </Popup>
        </Marker>
    );
}
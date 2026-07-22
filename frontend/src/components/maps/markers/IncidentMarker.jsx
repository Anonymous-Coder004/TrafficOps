import {
    Marker,
    Popup,
    Tooltip,
} from "react-leaflet";

import { incidentIcon } from "../utils/icons";

export default function IncidentMarker({

    incident,

    onClick,

}) {

    if (!incident) return null;

    return (

        <Marker

            position={[
                incident.latitude,
                incident.longitude,
            ]}

            icon={incidentIcon}

            eventHandlers={{

                click: onClick,

            }}

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
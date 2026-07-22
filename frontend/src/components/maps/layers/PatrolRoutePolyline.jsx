import { Polyline } from "react-leaflet";

export default function PatrolRoutePolyline({

    routeGeometry,

    onClick,

}) {

    if (!routeGeometry || routeGeometry.length === 0) {

        return null;

    }

    return (

        <Polyline

            positions={routeGeometry}

            pathOptions={{

                color: "#2563eb",

                weight: 5,

            }}

            eventHandlers={{

                click: onClick,

            }}

        />

    );

}
import { Polyline } from "react-leaflet";

export default function PatrolRoutePolyline({ routeGeometry }) {
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
        />
    );
}
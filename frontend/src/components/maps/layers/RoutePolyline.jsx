import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";

import { getRoute } from "../../../api/maps";

export default function RoutePolyline({

    start,

    end,

    onRouteLoaded,

}) {

    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {

        if (!start || !end) {
            return;
        }

        async function loadRoute() {

            try {

                const data = await getRoute(

                    start.lat,

                    start.lng,

                    end.lat,

                    end.lng,

                );

                setCoordinates((prev) => {

                    if (
                        JSON.stringify(prev) ===
                        JSON.stringify(data.coordinates)
                    ) {
                        return prev;
                    }

                    return data.coordinates;

                });

                onRouteLoaded?.({

                    distance: data.distance,

                    duration: data.duration,

                });

            }

            catch (err) {

                console.error(

                    "Failed to load route",

                    err,

                );

            }

        }

        loadRoute();

    }, [

        start?.lat,
        start?.lng,

        end?.lat,
        end?.lng,

    ]);

    if (coordinates.length === 0) {

        return null;

    }

    return (

        <Polyline

            positions={coordinates}

            pathOptions={{

                color: "#2563eb",

                weight: 5,

            }}

        />

    );

}
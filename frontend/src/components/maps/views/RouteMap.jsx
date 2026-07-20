import { useMemo, useState } from "react";

import BaseMap from "../core/BaseMap";

import OfficerMarker from "../markers/OfficerMarker";
import IncidentMarker from "../markers/IncidentMarker";

import RoutePolyline from "../layers/RoutePolyline";

export default function RouteMap({

    team,

    incident,

    height = "550px",

}) {

    const [routeInfo, setRouteInfo] = useState(null);

    const center = incident
        ? [
            incident.latitude,
            incident.longitude,
        ]
        : [
            12.9716,
            77.5946,
        ];

    const bounds = useMemo(() => {

        if (!team || !incident) {

            return null;

        }

        return [

            [

                team.assigned_latitude,

                team.assigned_longitude,

            ],

            [

                incident.latitude,

                incident.longitude,

            ],

        ];

    }, [

        team?.assigned_latitude,
        team?.assigned_longitude,

        incident?.latitude,
        incident?.longitude,

    ]);

    const teamLocation = useMemo(() => ({

        lat: team.assigned_latitude,

        lng: team.assigned_longitude,

    }), [

        team.assigned_latitude,

        team.assigned_longitude,

    ]);

    const incidentLocation = useMemo(() => ({

        lat: incident.latitude,

        lng: incident.longitude,

    }), [

        incident.latitude,

        incident.longitude,

    ]);

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                overflow-hidden
            "
        >

            <BaseMap

                center={center}

                height={height}

                fitBounds={bounds}

            >

                <OfficerMarker

                    location={teamLocation}

                />

                <IncidentMarker

                    incident={incident}

                />

                <RoutePolyline

                    start={teamLocation}

                    end={incidentLocation}

                    onRouteLoaded={setRouteInfo}

                />

            </BaseMap>

            {

                routeInfo && (

                    <div
                        className="
                            flex
                            justify-between
                            px-5
                            py-4
                            border-t
                            bg-slate-50
                        "
                    >

                        <div>

                            <p className="text-sm text-slate-500">

                                Distance

                            </p>

                            <p className="font-semibold">

                                {routeInfo.distance.toFixed(2)} km

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                ETA

                            </p>

                            <p className="font-semibold">

                                {Math.ceil(routeInfo.duration / 60)} min

                            </p>

                        </div>

                    </div>

                )

            }

        </div>

    );

}
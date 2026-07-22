import { useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import BaseMap from "../../maps/core/BaseMap";
import IncidentMarker from "../../maps/markers/IncidentMarker";
import PatrolRoutePolyline from "../../maps/layers/PatrolRoutePolyline";

export default function DashboardMap({

    loading,

    incidents,

    patrols,

    showIncidents,

    showPatrols,

    onIncidentClick,

    onPatrolClick,

}) {

    const bounds = useMemo(() => {

        const mapBounds = [];

        if (showIncidents) {

            incidents.forEach((incident) => {

                mapBounds.push([

                    incident.latitude,

                    incident.longitude,

                ]);

            });

        }

        if (showPatrols) {

            patrols.forEach((patrol) => {

                patrol.route_geometry?.forEach((point) => {

                    mapBounds.push(point);

                });

            });

        }

        return mapBounds;

    }, [

        incidents,

        patrols,

        showIncidents,

        showPatrols,

    ]);

    if (loading) {

        return (

            <div
                className="
                    h-[650px]
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                "
            >

                <div
                    className="
                        h-10
                        w-10
                        rounded-full
                        border-4
                        border-emerald-600
                        border-t-transparent
                        animate-spin
                    "
                />

                <p className="text-gray-500">

                    Loading dashboard map...

                </p>

            </div>

        );

    }

    if (
        incidents.length === 0 &&
        patrols.length === 0
    ) {

        return (

            <div
                className="
                    h-[650px]
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    flex
                    items-center
                    justify-center
                "
            >

                <p className="text-gray-500">

                    No incidents or patrols available.

                </p>

            </div>

        );

    }

    return (

        <div
            className="
                rounded-2xl
                overflow-hidden
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            <BaseMap

                center={[12.9716, 77.5946]}

                zoom={12}

                height="650px"

                fitBounds={
                    bounds.length > 1
                        ? bounds
                        : null
                }

            >

                {showIncidents && (

                    <MarkerClusterGroup
                        chunkedLoading
                        showCoverageOnHover={false}
                        spiderfyOnMaxZoom={true}
                        zoomToBoundsOnClick={true}
                    >

                        {incidents.map((incident) => (

                            <IncidentMarker
                                key={incident.id}
                                incident={incident}
                                onClick={() =>
                                    onIncidentClick(incident.id)
                                }
                            />

                        ))}

                    </MarkerClusterGroup>

                )}

                {showPatrols &&

                    patrols.map((patrol) => (

                        <PatrolRoutePolyline

                            key={patrol.patrol_id}

                            routeGeometry={
                                patrol.route_geometry
                            }

                            onClick={() =>
                                onPatrolClick(
                                    patrol.patrol_id
                                )
                            }

                        />

                    ))

                }

            </BaseMap>

        </div>

    );

}
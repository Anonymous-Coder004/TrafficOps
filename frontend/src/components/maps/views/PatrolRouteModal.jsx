import React from "react";
import {
    X,
    Route,
    Clock3,
    MapPinned,
} from "lucide-react";

import {
    Marker,
    Popup,
} from "react-leaflet";

import L from "leaflet";

import BaseMap from "../core/BaseMap";
import PatrolRoutePolyline from "../layers/PatrolRoutePolyline";

const teamIcon = new L.DivIcon({
    html: `<div class="h-5 w-5 rounded-full bg-gray-900 border-2 border-white"></div>`,
    className: "",
    iconSize: [20, 20],
});

const PatrolRouteModal = ({
    open,
    onClose,
    patrol,
    currentCheckpointIndex,
}) => {

    if (!open || !patrol) return null;

    const teamLocation = {
        lat: patrol.start_latitude,
        lng: patrol.start_longitude,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

            <div className="flex h-[88vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Patrol Route
                        </h2>

                        <p className="mt-1 text-gray-500">
                            Closed patrol beginning and ending at your team's current location.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Map */}

                <div className="flex-1">

                    <BaseMap>

                        {/* Entire Patrol Route */}

                        <PatrolRoutePolyline
                            routeGeometry={patrol.route_geometry}
                        />

                        {/* Team Base */}

                        <Marker
                            position={[teamLocation.lat, teamLocation.lng]}
                            icon={teamIcon}
                        >
                            <Popup>
                                <b>Team Base</b>
                                <br />
                                Start & End Point
                            </Popup>
                        </Marker>

                        {/* Checkpoints */}

                        {patrol.checkpoints.map((cp, index) => {

                            let color = "red";

                            if (index < currentCheckpointIndex) {
                                color = "green";
                            } else if (index === currentCheckpointIndex) {
                                color = "blue";
                            }

                            const icon = new L.DivIcon({
                                html: `
                                <div
                                    style="
                                        width:28px;
                                        height:28px;
                                        border-radius:50%;
                                        background:${color};
                                        color:white;
                                        display:flex;
                                        align-items:center;
                                        justify-content:center;
                                        border:2px solid white;
                                        font-weight:bold;
                                    "
                                >
                                    ${index + 1}
                                </div>
                                `,
                                className: "",
                                iconSize: [28, 28],
                            });

                            return (
                                <Marker
                                    key={cp.junction_id}
                                    position={[
                                        cp.latitude,
                                        cp.longitude,
                                    ]}
                                    icon={icon}
                                >
                                    <Popup>
                                        <b>{cp.junction_name}</b>
                                        <br />
                                        Checkpoint {index + 1}
                                    </Popup>
                                </Marker>
                            );
                        })}

                    </BaseMap>

                </div>

                {/* Footer */}

                <div className="flex flex-wrap items-center justify-between gap-6 border-t bg-gray-50 px-6 py-5">

                    <div className="flex flex-wrap gap-4">

                        <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm">

                            <Route
                                size={20}
                                className="text-emerald-600"
                            />

                            <div>
                                <p className="text-xs text-gray-500">
                                    Distance
                                </p>

                                <p className="font-semibold">
                                    {patrol.total_distance.toFixed(2)} km
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm">

                            <Clock3
                                size={20}
                                className="text-blue-600"
                            />

                            <div>
                                <p className="text-xs text-gray-500">
                                    Estimated Time
                                </p>

                                <p className="font-semibold">
                                    {Math.ceil(
                                        patrol.estimated_duration / 60
                                    )} mins
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm">

                            <MapPinned
                                size={20}
                                className="text-red-500"
                            />

                            <div>
                                <p className="text-xs text-gray-500">
                                    Checkpoints
                                </p>

                                <p className="font-semibold">
                                    {patrol.total_checkpoints}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Legend */}

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-gray-900"></span>
                            Team Base
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-green-600"></span>
                            Visited
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-blue-600"></span>
                            Current
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-red-500"></span>
                            Upcoming
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PatrolRouteModal;
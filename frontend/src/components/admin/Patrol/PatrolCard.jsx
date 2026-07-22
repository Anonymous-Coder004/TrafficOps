import React from "react";

const PatrolCard = ({
    patrol,
    title = "Patrol Details",
    showRouteButton = false,
    onViewRoute,
}) => {
    if (!patrol) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Patrol #{patrol.patrol_id}
                    </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {patrol.status}
                </span>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

                <div>
                    <p className="text-sm text-gray-500">
                        Team
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        {patrol.team_name}
                    </p>
                    <p className="text-sm text-gray-500">
                        ID: {patrol.team_id}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Total Distance
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        {patrol.total_distance.toFixed(2)} km
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Estimated Duration
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        {Math.ceil(
                            patrol.estimated_duration / 60
                        )} mins
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Created At
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        {new Date(
                            patrol.created_at
                        ).toLocaleString()}
                    </p>
                </div>

            </div>

            {showRouteButton && (
                <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                    <button
                        onClick={onViewRoute}
                        className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700"
                    >
                        View Route
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatrolCard;
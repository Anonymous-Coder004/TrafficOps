import React from "react";
import { Route, Play, CheckCircle } from "lucide-react";

const PatrolSummaryCard = ({
    patrol,
    started,
    completed,
    canComplete,
    onViewRoute,
    onStartPatrol,
    onCompletePatrol,
    starting,
    completing,
}) => {
    if (!patrol) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Current Patrol
                    </h2>

                    <p className="mt-1 text-gray-500">
                        Patrol #{patrol.patrol_id}
                    </p>
                </div>

                <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold
                    ${
                        patrol.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : patrol.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >
                    {patrol.status}
                </span>

            </div>

            {/* Details */}

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

                <div>
                    <p className="text-sm text-gray-500">
                        Team
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {patrol.team_name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Total Distance
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {patrol.total_distance.toFixed(2)} km
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Estimated Duration
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {Math.ceil(
                            patrol.estimated_duration / 60
                        )} mins
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Total Checkpoints
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {patrol.total_checkpoints}
                    </p>
                </div>

            </div>

            {/* Actions */}

            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 px-6 py-5">

                <button
                    onClick={onViewRoute}
                    className="flex items-center gap-2 rounded-lg border border-emerald-600 px-5 py-2.5 font-medium text-emerald-600 transition hover:bg-emerald-50"
                >
                    <Route size={18} />

                    View Route
                </button>

                {!started && !completed && (
                    <button
                        onClick={onStartPatrol}
                        disabled={starting}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                        <Play size={18} />

                        {starting
                            ? "Starting..."
                            : "Start Patrol"}
                    </button>
                )}

                {started && canComplete && !completed && (
                    <button
                        onClick={onCompletePatrol}
                        disabled={completing}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                    >
                        <CheckCircle size={18} />

                        {completing
                            ? "Completing..."
                            : "Complete Patrol"}
                    </button>
                )}

            </div>

        </div>
    );
};

export default PatrolSummaryCard;
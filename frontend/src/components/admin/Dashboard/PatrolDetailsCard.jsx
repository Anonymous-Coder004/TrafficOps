import {
    Car,
    Route,
    Clock3,
    MapPinned,
    CheckCircle2,
    Calendar,
    User,
} from "lucide-react";

export default function PatrolDetailsCard({

    patrol,

}) {

    if (!patrol) return null;

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                overflow-hidden
            "
        >

            {/* Header */}

            <div
                className="
                    px-6
                    py-5
                    border-b
                    border-gray-200
                "
            >

                <h2
                    className="
                        text-xl
                        font-bold
                        text-slate-900
                    "
                >
                    Patrol Details
                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                >
                    Detailed information about the selected patrol.
                </p>

            </div>

            <div className="p-6 space-y-5">

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Team
                    </p>

                    <h3 className="text-lg font-semibold mt-1">
                        {patrol.team_name}
                    </h3>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <InfoRow
                        icon={Car}
                        label="Status"
                        value={patrol.status}
                    />

                    <InfoRow
                        icon={Route}
                        label="Distance"
                        value={`${patrol.total_distance.toFixed(2)} km`}
                    />

                    <InfoRow
                        icon={Clock3}
                        label="Estimated Time"
                        value={`${Math.round(
                            patrol.estimated_duration / 60
                        )} min`}
                    />

                    <InfoRow
                        icon={CheckCircle2}
                        label="Checkpoints"
                        value={patrol.total_checkpoints}
                    />

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Assigned By
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <User
                            size={18}
                            className="text-emerald-600"
                        />

                        <span className="text-gray-700">

                            Admin #{patrol.assigned_by}

                        </span>

                    </div>

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Start Location
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <MapPinned
                            size={18}
                            className="text-emerald-600"
                        />

                        <span className="text-gray-700">

                            {patrol.start_latitude.toFixed(5)},
                            {" "}
                            {patrol.start_longitude.toFixed(5)}

                        </span>

                    </div>

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        End Location
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <MapPinned
                            size={18}
                            className="text-emerald-600"
                        />

                        <span className="text-gray-700">

                            {patrol.end_latitude.toFixed(5)},
                            {" "}
                            {patrol.end_longitude.toFixed(5)}

                        </span>

                    </div>

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Created
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <Calendar
                            size={18}
                            className="text-gray-500"
                        />

                        <span className="text-gray-700">

                            {new Date(
                                patrol.created_at
                            ).toLocaleString()}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

function InfoRow({

    icon: Icon,

    label,

    value,

}) {

    return (

        <div
            className="
                rounded-xl
                bg-slate-50
                p-4
            "
        >

            <div className="flex items-center gap-2">

                <Icon
                    size={18}
                    className="text-emerald-600"
                />

                <span
                    className="
                        text-xs
                        uppercase
                        text-gray-500
                    "
                >
                    {label}
                </span>

            </div>

            <p
                className="
                    mt-2
                    font-semibold
                    text-slate-900"
                >
                {value}
            </p>

        </div>

    );

}
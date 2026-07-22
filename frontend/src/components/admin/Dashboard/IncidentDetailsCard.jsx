import {
    AlertTriangle,
    MapPin,
    Shield,
    Calendar,
    ClipboardList,
} from "lucide-react";

export default function IncidentDetailsCard({

    incident,

}) {

    if (!incident) return null;

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
                    Incident Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Detailed information about the selected incident.
                </p>

            </div>
            <div className="p-6 space-y-5">

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Title
                    </p>

                    <h3 className="text-lg font-semibold mt-1">
                        {incident.title}
                    </h3>

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        Description
                    </p>

                    <p className="text-gray-600 mt-1 leading-7">
                        {incident.description}
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <InfoRow
                        icon={AlertTriangle}
                        label="Criticality"
                        value={
                            incident.recommendation?.criticality ?? "N/A"
                        }
                    />

                    <InfoRow
                        icon={ClipboardList}
                        label="Status"
                        value={incident.status}
                    />

                    <InfoRow
                        icon={Shield}
                        label="Event Type"
                        value={incident.event_type}
                    />

                    <InfoRow
                        icon={Shield}
                        label="Event Cause"
                        value={incident.event_cause}
                    />

                    <InfoRow
                        icon={Shield}
                        label="Vehicle Type"
                        value={incident.vehicle_type ?? "N/A"}
                    />
                    <InfoRow
                        icon={MapPin}
                        label="Latitude"
                        value={incident.latitude}
                    />

                    <InfoRow
                        icon={MapPin}
                        label="Longitude"
                        value={incident.longitude}
                    />

                </div>

                <div>

                    <p className="text-xs uppercase text-gray-400">
                        AI Recommendation
                    </p>

                    <div
                        className="
                            mt-2
                            rounded-xl
                            bg-emerald-50
                            border
                            border-emerald-200
                            p-4
                            space-y-3
                        "
                    >

                        {
                            incident.recommendation ? (

                                <>
                                    <p>
                                        <strong>Confidence:</strong>{" "}
                                        {incident.recommendation.confidence.toFixed(2)}%
                                    </p>

                                    <p>
                                        <strong>Recommended Officers:</strong>{" "}
                                        {incident.recommendation.recommended_officers ?? "N/A"}
                                    </p>

                                    <p>
                                        <strong>Recommended Barricades:</strong>{" "}
                                        {incident.recommendation.recommended_barricades ?? "N/A"}
                                    </p>
                                </>

                            ) : (

                                <p className="text-gray-600">
                                    No AI recommendation available.
                                </p>

                            )
                        }

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
                                incident.created_at
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
                    text-slate-900
                "
            >
                {value}
            </p>

        </div>

    );

}
import StatusBadge from "../StatusBadge";

export default function IncidentSummary({ incident }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

            <div className="px-8 py-6 border-b">

                <h2 className="text-2xl font-bold">

                    {incident.title}

                </h2>

                <p className="mt-2 text-gray-500">

                    {incident.description}

                </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8">

                <InfoCard
                    label="Event Type"
                    value={incident.event_type}
                />

                <InfoCard
                    label="Nearest Police Station ID"
                    value={incident.police_station_id ?? "-"}
                />

                <div>

                    <p className="text-sm text-gray-500 mb-2">

                        Criticality

                    </p>

                    {
                        incident.recommendation?.criticality ? (
                            <StatusBadge
                                value={incident.recommendation.criticality}
                                type="criticality"
                            />
                        ) : (
                            <span className="text-gray-400">-</span>
                        )
                    }

                </div>

                <div>

                    <p className="text-sm text-gray-500 mb-2">

                        Status

                    </p>

                    <StatusBadge
                        value={incident.status}
                        type="status"
                    />

                </div>

            </div>

        </div>

    );

}

function InfoCard({ label, value }) {

    return (

        <div>

            <p className="text-sm text-gray-500">

                {label}

            </p>

            <p className="mt-2 font-semibold text-slate-900">

                {value || "-"}

            </p>

        </div>

    );

}
import AssignmentStatusBadge from "../assignment/AssignmentStatusBadge";

export default function AssignmentInfoCard({

    assignment,

}) {

    const {

        incident,

        officers_assigned,

        barricades_assigned,

        assigned_at,

        status,

    } = assignment;

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                p-6
            "
        >

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        {incident.title}

                    </h2>

                    <p className="capitalize text-slate-500 mt-1">

                        {incident.event_type}

                    </p>

                </div>

                <AssignmentStatusBadge

                    status={status}

                />

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div>

                    <p className="text-sm text-slate-500">

                        Officers Assigned

                    </p>

                    <p className="font-semibold text-lg">

                        {officers_assigned}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Barricades Assigned

                    </p>

                    <p className="font-semibold text-lg">

                        {barricades_assigned}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Assigned At

                    </p>

                    <p className="font-semibold">

                        {

                            new Date(

                                assigned_at

                            ).toLocaleString()

                        }

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Incident Status

                    </p>

                    <p className="font-semibold">

                        {incident.status}

                    </p>

                </div>

            </div>

            <div className="mt-8">

                <p className="text-sm text-slate-500">

                    Coordinates

                </p>

                <p className="font-mono text-sm">

                    {incident.latitude},

                    {" "}

                    {incident.longitude}

                </p>

            </div>

        </div>

    );

}
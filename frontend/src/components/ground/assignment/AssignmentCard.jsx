import {

    Calendar,

    Users,

    TrafficCone,

    ArrowRight,

    Play,

    CheckCircle,

} from "lucide-react";

import AssignmentStatusBadge from "./AssignmentStatusBadge";

export default function AssignmentCard({

    assignment,

    onView,

}) {

    const {

        id,

        officers_assigned,

        barricades_assigned,

        assigned_at,

        status,

        incident,

    } = assignment;

    const formattedDate = new Date(

        assigned_at

    ).toLocaleString();

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                hover:shadow-lg
                transition
                duration-200
                p-6
            "
        >

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        {incident.title}

                    </h2>

                    <p className="text-slate-500 mt-1 capitalize">

                        {incident.event_type}

                    </p>

                </div>

                <AssignmentStatusBadge

                    status={status}

                />

            </div>

            {/* Details */}

            <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div className="flex items-center gap-3">

                    <Users
                        size={20}
                        className="text-emerald-600"
                    />

                    <div>

                        <p className="text-sm text-slate-500">

                            Officers

                        </p>

                        <p className="font-semibold">

                            {officers_assigned}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <TrafficCone
                        size={20}
                        className="text-amber-600"
                    />

                    <div>

                        <p className="text-sm text-slate-500">

                            Barricades

                        </p>

                        <p className="font-semibold">

                            {barricades_assigned}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Calendar
                        size={20}
                        className="text-blue-600"
                    />

                    <div>

                        <p className="text-sm text-slate-500">

                            Assigned

                        </p>

                        <p className="font-semibold text-sm">

                            {formattedDate}

                        </p>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end mt-8">

                {

                    status === "ASSIGNED" && (

                        <button

                            onClick={() => onView(id)}

                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-emerald-600
                                px-5
                                py-3
                                text-white
                                hover:bg-emerald-700
                            "

                        >

                            <Play size={18} />

                            Start Assignment

                        </button>

                    )

                }

                {

                    status === "IN_PROGRESS" && (

                        <button

                            onClick={() => onView(id)}

                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-3
                                text-white
                                hover:bg-blue-700
                            "

                        >

                            <ArrowRight size={18} />

                            Continue

                        </button>

                    )

                }

                {

                    status === "COMPLETED" && (

                        <button

                            disabled

                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-slate-200
                                px-5
                                py-3
                                text-slate-600
                                cursor-not-allowed
                            "

                        >

                            <CheckCircle size={18} />

                            Completed

                        </button>

                    )

                }

            </div>

        </div>

    );

}
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList({

    assignments,

    onView,

}) {

    if (assignments.length === 0) {

        return (

            <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    py-16
                    text-center
                "
            >

                <h3
                    className="
                        text-xl
                        font-semibold
                        text-slate-700
                    "
                >

                    No Assignments Found

                </h3>

                <p
                    className="
                        mt-2
                        text-slate-500
                    "
                >

                    You don't have any assigned incidents yet.

                </p>

            </div>

        );

    }

    return (

        <div
            className="
                space-y-6
            "
        >

            {

                assignments.map((assignment) => (

                    <AssignmentCard

                        key={assignment.id}

                        assignment={assignment}

                        onView={onView}

                    />

                ))

            }

        </div>

    );

}
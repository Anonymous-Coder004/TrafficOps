export default function AssignmentStatusBadge({

    status,

}) {

    const styles = {

        ASSIGNED:

            "bg-amber-100 text-amber-700",

        IN_PROGRESS:

            "bg-blue-100 text-blue-700",

        COMPLETED:

            "bg-emerald-100 text-emerald-700",

    };

    return (

        <span

            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-sm
                font-semibold

                ${

                    styles[status] ||

                    "bg-slate-100 text-slate-600"

                }

            `}

        >

            {status.replace("_", " ")}

        </span>

    );

}
import {

    Play,

    CheckCircle,

    Loader2,

} from "lucide-react";

export default function AssignmentControls({

    status,

    loading = false,

    onStart,

    onComplete,

}) {

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

            <h3
                className="
                    text-lg
                    font-semibold
                    text-slate-900
                    mb-6
                "
            >

                Assignment Actions

            </h3>

            {
                status === "ASSIGNED" && (

                    <button

                        onClick={onStart}

                        disabled={loading}

                        className="
                            w-full
                            inline-flex
                            justify-center
                            items-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-6
                            py-3
                            text-white
                            hover:bg-emerald-700
                            disabled:opacity-60
                        "

                    >

                        {

                            loading

                            ?

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            :

                            <Play size={18} />

                        }

                        Start Assignment

                    </button>

                )
            }

            {
                status === "IN_PROGRESS" && (

                    <button

                        onClick={onComplete}

                        disabled={loading}

                        className="
                            w-full
                            inline-flex
                            justify-center
                            items-center
                            gap-2
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-3
                            text-white
                            hover:bg-blue-700
                            disabled:opacity-60
                        "

                    >

                        {

                            loading

                            ?

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            :

                            <CheckCircle size={18} />

                        }

                        Complete Assignment

                    </button>

                )
            }

            {
                status === "COMPLETED" && (

                    <button

                        disabled

                        className="
                            w-full
                            inline-flex
                            justify-center
                            items-center
                            gap-2
                            rounded-xl
                            bg-slate-200
                            px-6
                            py-3
                            text-slate-600
                            cursor-not-allowed
                        "

                    >

                        <CheckCircle size={18} />

                        Assignment Completed

                    </button>

                )
            }

        </div>

    );

}
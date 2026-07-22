import { MousePointerClick } from "lucide-react";

export default function EmptyDetailsCard() {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-8
            "
        >

            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-emerald-100
                    flex
                    items-center
                    justify-center
                    mb-6
                "
            >

                <MousePointerClick
                    size={38}
                    className="text-emerald-600"
                />

            </div>

            <h2
                className="
                    text-2xl
                    font-bold
                    text-slate-900
                "
            >
                Nothing Selected
            </h2>

            <p
                className="
                    mt-3
                    max-w-sm
                    text-gray-500
                    leading-7
                "
            >
                Select an incident marker or patrol route on
                the map to view detailed information.
            </p>

        </div>

    );

}
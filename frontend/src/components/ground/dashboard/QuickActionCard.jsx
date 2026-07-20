import { ArrowRight } from "lucide-react";

export default function QuickActionCard({

    title,

    description,

    icon: Icon,

    color = "emerald",

    onClick,

}) {

    const colors = {

        emerald: {
            bg: "bg-emerald-50",
            icon: "bg-emerald-600",
            text: "text-emerald-700",
        },

        blue: {
            bg: "bg-blue-50",
            icon: "bg-blue-600",
            text: "text-blue-700",
        },

        amber: {
            bg: "bg-amber-50",
            icon: "bg-amber-600",
            text: "text-amber-700",
        },

    };

    const theme = colors[color];

    return (

        <button

            onClick={onClick}

            className={`
                w-full
                rounded-2xl
                border
                bg-white
                shadow-sm
                hover:shadow-md
                transition
                text-left
                p-6
            `}

        >

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                    <div
                        className={`
                            h-14
                            w-14
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-white
                            ${theme.icon}
                        `}
                    >

                        <Icon size={26} />

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold">

                            {title}

                        </h3>

                        <p className="text-gray-500 mt-1">

                            {description}

                        </p>

                    </div>

                </div>

                <ArrowRight

                    size={22}

                    className={theme.text}

                />

            </div>

        </button>

    );

}
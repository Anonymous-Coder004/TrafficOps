import { ArrowRight, Clock } from "lucide-react";

export default function TaskCard({

    title,

    description,

    icon: Icon,

    color = "emerald",

    disabled = false,

    onClick,

}) {

    const colors = {

        emerald: {
            icon: "bg-emerald-600",
            text: "text-emerald-600",
        },

        blue: {
            icon: "bg-blue-600",
            text: "text-blue-600",
        },

        amber: {
            icon: "bg-amber-600",
            text: "text-amber-600",
        },

        gray: {
            icon: "bg-gray-400",
            text: "text-gray-400",
        },

    };

    const theme = disabled
        ? colors.gray
        : colors[color];

    return (

        <button

            disabled={disabled}

            onClick={onClick}

            className={`
                w-full
                rounded-2xl
                border
                bg-white
                shadow-sm
                p-6
                text-left
                transition

                ${
                    disabled
                        ? "cursor-not-allowed opacity-70"
                        : "hover:shadow-md"
                }
            `}

        >

            <div className="flex justify-between">

                <div className="flex gap-4">

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

                        <Icon size={24} />

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold">

                            {title}

                        </h3>

                        <p className="text-gray-500 mt-1">

                            {description}

                        </p>

                    </div>

                </div>

                {

                    disabled

                        ?

                        <Clock
                            size={22}
                            className="text-gray-400"
                        />

                        :

                        <ArrowRight
                            size={22}
                            className={theme.text}
                        />

                }

            </div>

        </button>

    );

}
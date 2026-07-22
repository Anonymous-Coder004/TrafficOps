import {
    AlertTriangle,
    Shield,
    Car,
    CheckCircle,
} from "lucide-react";

const stats = [
    {
        key: "totalIncidents",
        title: "Total Incidents",
        icon: AlertTriangle,
        color: "bg-red-100 text-red-600",
    },
    {
        key: "activeIncidents",
        title: "Active Incidents",
        icon: Shield,
        color: "bg-orange-100 text-orange-600",
    },
    {
        key: "totalPatrols",
        title: "Total Patrols",
        icon: Car,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        key: "completedPatrols",
        title: "Completed Patrols",
        icon: CheckCircle,
        color: "bg-blue-100 text-blue-600",
    },
];

export default function DashboardStats({

    totalIncidents,

    activeIncidents,

    totalPatrols,

    completedPatrols,

}) {

    const values = {
        totalIncidents,
        activeIncidents,
        totalPatrols,
        completedPatrols,
    };

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
            "
        >

            {stats.map((item) => {

                const Icon = item.icon;

                return (

                    <div
                        key={item.key}
                        className="
                            bg-white
                            rounded-2xl
                            border
                            border-gray-200
                            shadow-sm
                            p-6
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {item.title}
                            </p>

                            <h2
                                className="
                                    text-3xl
                                    font-bold
                                    mt-2
                                    text-slate-900
                                "
                            >
                                {values[item.key]}
                            </h2>

                        </div>

                        <div
                            className={`
                                w-14
                                h-14
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                ${item.color}
                            `}
                        >

                            <Icon size={28} />

                        </div>

                    </div>

                );

            })}

        </div>

    );

}
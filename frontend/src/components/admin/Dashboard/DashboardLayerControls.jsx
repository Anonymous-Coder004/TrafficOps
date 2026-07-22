import { AlertTriangle, Car } from "lucide-react";

export default function DashboardLayerControls({

    showIncidents,

    setShowIncidents,

    showPatrols,

    setShowPatrols,

}) {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                p-6
            "
        >

            <div className="mb-5">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-slate-900
                    "
                >
                    Map Layers
                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                >
                    Select which information should be displayed on the map.
                </p>

            </div>

            <div className="space-y-4">

                {/* Incidents */}

                <label
                    className="
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-red-100
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <AlertTriangle
                                size={20}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <p className="font-medium">
                                Incidents
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                Display all reported incidents
                            </p>

                        </div>

                    </div>

                    <input
                        type="checkbox"
                        checked={showIncidents}
                        onChange={() =>
                            setShowIncidents(
                                !showIncidents
                            )
                        }
                        className="
                            h-5
                            w-5
                            accent-emerald-600
                        "
                    />

                </label>

                {/* Patrols */}

                <label
                    className="
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-emerald-100
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Car
                                size={20}
                                className="text-emerald-600"
                            />

                        </div>

                        <div>

                            <p className="font-medium">
                                Patrol Routes
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                Display all patrol routes
                            </p>

                        </div>

                    </div>

                    <input
                        type="checkbox"
                        checked={showPatrols}
                        onChange={() =>
                            setShowPatrols(
                                !showPatrols
                            )
                        }
                        className="
                            h-5
                            w-5
                            accent-emerald-600
                        "
                    />

                </label>

            </div>

        </div>

    );

}
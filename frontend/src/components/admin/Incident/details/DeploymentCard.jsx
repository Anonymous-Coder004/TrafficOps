import { Rocket } from "lucide-react";

export default function DeploymentCard({
    incident,
    loading,
    recommendationCompleted,
    deploymentCompleted,
    onDeploy,
}) {

    const recommendation = incident?.recommendation;

    const canDeploy =
        recommendationCompleted &&
        !deploymentCompleted;

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            {/* Header */}

            <div className="flex items-center gap-3 px-6 py-5 border-b">

                <Rocket
                    size={22}
                    className="text-emerald-600"
                />

                <h2 className="text-xl font-semibold text-slate-900">

                    Deployment

                </h2>

            </div>

            {/* Body */}

            <div className="p-6 space-y-6">

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-sm text-gray-500">

                            Officers

                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">

                            {recommendation?.recommended_officers ?? "--"}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">

                            Barricades

                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">

                            {recommendation?.recommended_barricades ?? "--"}

                        </p>

                    </div>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Current Status

                    </p>

                    <p className="mt-2 font-semibold text-slate-900">

                        {incident.status.replaceAll("_", " ")}

                    </p>

                </div>

                <button

                    onClick={onDeploy}

                    disabled={!canDeploy || loading}

                    className="
                        w-full
                        rounded-xl
                        py-3
                        font-medium
                        text-white
                        transition
                        bg-emerald-600
                        hover:bg-emerald-700
                        disabled:bg-gray-300
                        disabled:text-gray-600
                        disabled:cursor-not-allowed
                    "

                >

                    {
                        deploymentCompleted
                            ? "Resources Deployed"
                            : loading
                                ? "Deploying..."
                                : "Deploy Resources"
                    }

                </button>

                {!recommendationCompleted && (

                    <p className="text-sm text-amber-600">

                        Complete resource recommendation before deployment.

                    </p>

                )}

            </div>

        </div>

    );

}
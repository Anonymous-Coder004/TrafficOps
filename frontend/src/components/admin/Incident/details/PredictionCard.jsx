import { BrainCircuit } from "lucide-react";

import StatusBadge from "../StatusBadge";

export default function PredictionCard({
    recommendation,
    loading,
    completed,
    onPredict,
}) {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            <div className="flex items-center gap-3 px-6 py-5 border-b">

                <BrainCircuit
                    size={22}
                    className="text-emerald-600"
                />

                <h2 className="text-xl font-semibold text-slate-900">

                    AI Prediction

                </h2>

            </div>

            <div className="p-6 space-y-6">

                <div>

                    <p className="text-sm text-gray-500">

                        Predicted Criticality

                    </p>

                    <div className="mt-2">

                        {recommendation?.criticality ? (

                            <StatusBadge
                                value={recommendation.criticality}
                                type="criticality"
                            />

                        ) : (

                            <span className="text-gray-400">

                                Not Predicted

                            </span>

                        )}

                    </div>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Confidence

                    </p>

                    <p className="mt-2 text-xl font-semibold">

                        {recommendation?.confidence
                            ? `${(
                                  recommendation.confidence
                              ).toFixed(1)}%`
                            : "--"}

                    </p>

                </div>

                <button

                    disabled={loading || completed}

                    onClick={onPredict}

                    className="
                        w-full
                        rounded-xl
                        bg-emerald-600
                        py-3
                        text-white
                        font-medium
                        hover:bg-emerald-700
                        disabled:bg-gray-300
                        disabled:cursor-not-allowed
                    "

                >

                    {

                        completed

                            ? "Prediction Complete"

                            : loading

                                ? "Predicting..."

                                : "Predict Incident"

                    }

                </button>

            </div>

        </div>

    );

}
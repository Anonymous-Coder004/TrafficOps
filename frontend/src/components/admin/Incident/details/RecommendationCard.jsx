import { useEffect, useState } from "react";

import { Shield } from "lucide-react";

export default function RecommendationCard({

    recommendation,
    loading,
    saving,
    onRecommend,
    predictionCompleted,
    onSave,
    completed

}) {

    const [officers, setOfficers] = useState("");

    const [barricades, setBarricades] = useState("");

    useEffect(() => {

        setOfficers(

            recommendation?.recommended_officers ?? ""

        );

        setBarricades(

            recommendation?.recommended_barricades ?? ""

        );

    }, [recommendation]);

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            <div className="flex items-center gap-3 px-6 py-5 border-b">

                <Shield

                    size={22}

                    className="text-emerald-600"

                />

                <h2 className="text-xl font-semibold">

                    Resource Recommendation

                </h2>

            </div>

            <div className="p-6 space-y-6">

                <div>

                    <label className="block text-sm text-gray-500 mb-2">

                        Recommended Officers

                    </label>

                    <input

                        type="number"

                        min={0}

                        value={officers}

                        onChange={(e) =>

                            setOfficers(e.target.value)

                        }

                        className="

                            w-full

                            rounded-xl

                            border

                            border-gray-300

                            px-4

                            py-3

                            focus:outline-none

                            focus:ring-2

                            focus:ring-emerald-500

                        "

                    />

                </div>

                <div>

                    <label className="block text-sm text-gray-500 mb-2">

                        Recommended Barricades

                    </label>

                    <input

                        type="number"

                        min={0}

                        value={barricades}

                        onChange={(e) =>

                            setBarricades(e.target.value)

                        }

                        className="

                            w-full

                            rounded-xl

                            border

                            border-gray-300

                            px-4

                            py-3

                            focus:outline-none

                            focus:ring-2

                            focus:ring-emerald-500

                        "

                    />

                </div>

                <div className="flex gap-3">

                    <button

                        onClick={onRecommend}

                        disabled={
                            !predictionCompleted ||
                            completed ||
                            loading
                        }

                        className="

                            flex-1

                            rounded-xl

                            bg-emerald-600

                            py-3

                            text-white

                            font-medium

                            hover:bg-emerald-700

                            disabled:opacity-60

                        "

                    >

                        {

                            completed

                                ? "Recommendation Ready"

                                : loading

                                    ? "Generating..."

                                    : "Recommend"

                        }

                    </button>

                    <button

                        onClick={() =>

                            onSave({

                                recommended_officers:

                                    Number(officers),

                                recommended_barricades:

                                    Number(barricades),

                            })

                        }

                        disabled={!predictionCompleted ||saving}

                        className="

                            flex-1

                            rounded-xl

                            border

                            border-emerald-600

                            text-emerald-600

                            py-3

                            font-medium

                            hover:bg-emerald-50

                        "

                    >

                        {

                            saving

                                ? "Saving..."

                                : "Save"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}
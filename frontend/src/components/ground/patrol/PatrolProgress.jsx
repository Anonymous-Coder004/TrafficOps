import React from "react";
import { Check } from "lucide-react";

const PatrolProgress = ({
    checkpoints = [],
    currentCheckpointIndex = 0,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Patrol Progress
                </h2>

                <p className="mt-1 text-gray-500">
                    Visit checkpoints sequentially to complete your patrol.
                </p>
            </div>

            {/* Timeline */}

            <div className="overflow-x-auto px-8 py-10">

                <div className="flex min-w-max items-start">

                    {checkpoints.map((checkpoint, index) => {

                        const visited =
                            index < currentCheckpointIndex;

                        const current =
                            index === currentCheckpointIndex;

                        return (

                            <React.Fragment
                                key={checkpoint.junction_id}
                            >

                                {/* Checkpoint */}

                                <div className="flex w-36 flex-col items-center">

                                    {/* Circle */}

                                    <div
                                        className={`
                                            flex h-12 w-12 items-center justify-center
                                            rounded-full
                                            text-base
                                            font-bold
                                            text-white
                                            shadow-sm
                                            transition-all

                                            ${
                                                visited
                                                    ? "bg-green-600"
                                                    : current
                                                    ? "bg-blue-600 ring-4 ring-blue-100"
                                                    : "bg-red-500"
                                            }
                                        `}
                                    >

                                        {visited ? (
                                            <Check size={22} strokeWidth={3} />
                                        ) : (
                                            index + 1
                                        )}

                                    </div>

                                    {/* Name */}

                                    <p
                                        className="
                                            mt-3
                                            max-w-[120px]
                                            text-center
                                            text-sm
                                            font-medium
                                            text-gray-800
                                            leading-5
                                            break-words
                                        "
                                    >
                                        {checkpoint.junction_name}
                                    </p>

                                </div>

                                {/* Connector */}

                                {index !== checkpoints.length - 1 && (

                                    <div className="flex flex-1 items-center pt-6">

                                        <div
                                            className={`
                                                h-1
                                                w-full
                                                rounded-full
                                                transition-all

                                                ${
                                                    index <
                                                    currentCheckpointIndex
                                                        ? "bg-green-600"
                                                        : "bg-gray-300"
                                                }
                                            `}
                                        />

                                    </div>

                                )}

                            </React.Fragment>

                        );
                    })}

                </div>

            </div>

        </div>
    );
};

export default PatrolProgress;
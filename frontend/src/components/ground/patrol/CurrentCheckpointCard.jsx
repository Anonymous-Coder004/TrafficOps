import React from "react";
import { MapPin, Flag, Navigation } from "lucide-react";

const CurrentCheckpointCard = ({
    checkpoints = [],
    currentCheckpointIndex = 0,
    onReachCheckpoint,
    started = false,
}) => {
    const currentCheckpoint =
        checkpoints[currentCheckpointIndex];

    const isCompleted =
        currentCheckpointIndex >= checkpoints.length;

    if (isCompleted) {
        return (
            <div className="rounded-2xl border border-green-200 bg-green-50 shadow-sm">

                <div className="px-6 py-8 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                        <Flag size={30} />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-green-700">
                        All Checkpoints Completed
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Great job! You have visited every checkpoint.
                        You can now complete the patrol.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <h2 className="text-2xl font-bold text-gray-900">
                    Current Checkpoint
                </h2>

                <p className="mt-1 text-gray-500">
                    Visit this checkpoint to continue your patrol.
                </p>

            </div>

            {/* Body */}

            <div className="grid gap-6 p-6 md:grid-cols-2">

                <div>

                    <p className="text-sm text-gray-500">
                        Checkpoint
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                        <MapPin
                            size={20}
                            className="text-blue-600"
                        />

                        <span className="text-lg font-semibold text-gray-900">
                            {currentCheckpoint.junction_name}
                        </span>

                    </div>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Progress
                    </p>

                    <p className="mt-2 text-lg font-semibold text-gray-900">
                        {currentCheckpointIndex + 1} / {checkpoints.length}
                    </p>

                </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end border-t border-gray-200 px-6 py-5">

                <button
                    disabled={!started}
                    onClick={onReachCheckpoint}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white transition

                        ${
                            started
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "cursor-not-allowed bg-gray-400"
                        }
                    `}
                >
                    <Navigation size={18} />

                    Mark Checkpoint Reached
                </button>

            </div>

        </div>
    );
};

export default CurrentCheckpointCard;
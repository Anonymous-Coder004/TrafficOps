import React from "react";
import { CarFront } from "lucide-react";

const NoPatrolCard = () => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Current Patrol
                </h2>

                <p className="mt-1 text-gray-500">
                    View your currently assigned patrol.
                </p>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center justify-center px-8 py-16">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <CarFront
                        size={42}
                        className="text-emerald-600"
                    />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                    No Patrol Assigned
                </h3>

                <p className="mt-3 max-w-lg text-center text-gray-500">
                    You don't have an active patrol assignment at the
                    moment. Please wait until an administrator assigns
                    a patrol.
                </p>

            </div>
        </div>
    );
};

export default NoPatrolCard;
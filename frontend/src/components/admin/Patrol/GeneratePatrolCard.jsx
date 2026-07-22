import React from "react";

const GeneratePatrolCard = ({
    teams,
    selectedTeam,
    setSelectedTeam,
    selectedRadius,
    setSelectedRadius,
    onCheckTeams,
    onGeneratePatrol,
    loadingTeams,
    generatingPatrol,
    hasCheckedTeams,
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                    Patrol Generation
                </h2>
                <p className="mt-1 text-gray-500">
                    Generate an optimized patrol for an available team.
                </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

                {/* Check Teams */}
                <div>
                    <button
                        onClick={onCheckTeams}
                        disabled={loadingTeams}
                        className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                    >
                        {loadingTeams
                            ? "Checking..."
                            : "Check Available Teams"}
                    </button>
                </div>

                {/* Available Teams */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Available Team
                    </label>

                    {!hasCheckedTeams ? (
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="font-medium text-blue-800">
                                Teams not loaded
                            </p>
                            <p className="mt-1 text-sm text-blue-700">
                                Click <strong>Check Available Teams</strong> to
                                fetch teams that are currently available for
                                patrol assignment.
                            </p>
                        </div>
                    ) : teams.length === 0 ? (
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                            <p className="font-medium text-yellow-800">
                                No available teams
                            </p>
                            <p className="mt-1 text-sm text-yellow-700">
                                All patrol teams are currently occupied. Please
                                check again later.
                            </p>
                        </div>
                    ) : (
                        <select
                            value={selectedTeam}
                            onChange={(e) =>
                                setSelectedTeam(Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                        >
                            <option value="">
                                Select a team
                            </option>

                            {teams.map((team) => (
                                <option
                                    key={team.team_id}
                                    value={team.team_id}
                                >
                                    {team.team_name} (ID: {team.team_id})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Radius */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Patrol Radius
                    </label>

                    <select
                        value={selectedRadius}
                        onChange={(e) =>
                            setSelectedRadius(Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                    >
                        <option value={3}>3 km</option>
                        <option value={5}>5 km</option>
                        <option value={7}>7 km</option>
                        <option value={10}>10 km</option>
                    </select>
                </div>

                {/* Generate */}
                <div className="flex justify-end">
                    <button
                        onClick={onGeneratePatrol}
                        disabled={
                            generatingPatrol ||
                            !selectedTeam ||
                            teams.length === 0
                        }
                        className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                    >
                        {generatingPatrol
                            ? "Generating..."
                            : "Generate Patrol"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneratePatrolCard;
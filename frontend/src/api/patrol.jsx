import API from "./axios";

// Get available teams
export const getAvailableTeams = async () => {
    const response = await API.get(
        "v1/admin/patrols/teams/available"
    );

    return response.data;
};

// Create patrol
export const createPatrol = async (
    teamId,
    radiusKm
) => {
    const response = await API.post(
        "v1/admin/patrols",
        {
            team_id: teamId,
            radius_km: radiusKm,
        }
    );

    return response.data;
};

// ======================
// GROUND OFFICER APIs
// ======================

// Get currently assigned patrol
export const getCurrentPatrol = async () => {
    const response = await API.get(
        "v1/ground-officer/patrols/current"
    );

    return response.data;
};

// Start patrol
export const startPatrol = async (patrolId) => {
    const response = await API.patch(
        `v1/ground-officer/patrols/${patrolId}/start`
    );

    return response.data;
};

// Complete patrol
export const completePatrol = async (patrolId) => {
    const response = await API.patch(
        `v1/ground-officer/patrols/${patrolId}/complete`
    );

    return response.data;
};
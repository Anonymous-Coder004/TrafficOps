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
import API from "./axios";

/* ==========================================
   Incident Management
========================================== */

export const getActiveIncidents = async () => {
    const response = await API.get(
        "/v1/admin/incidents"
    );

    return response.data;
};

export const getIncidentById = async (id) => {
    const response = await API.get(
        `/v1/admin/incidents/${id}`
    );

    return response.data;
};

/* ==========================================
   AI Prediction
========================================== */

export const predictIncident = async (id) => {
    const response = await API.post(
        `/v1/admin/incidents/${id}/predict`
    );

    return response.data;
};

/* ==========================================
   Resource Recommendation
========================================== */

export const recommendResources = async (id) => {
    const response = await API.post(
        `/v1/admin/incidents/${id}/recommend`
    );

    return response.data;
};

/* ==========================================
   Update Recommendation
========================================== */

export const updateRecommendation = async (
    id,
    payload
) => {
    const response = await API.patch(
        `/v1/admin/incidents/${id}/recommendation`,
        payload
    );

    return response.data;
};

/* ==========================================
   Deploy Resources
========================================== */

export const deployIncident = async (id) => {
    const response = await API.post(
        `/v1/admin/incidents/${id}/deploy`
    );

    return response.data;
};


/* ==========================================
   Ground Officer - Report Incident
========================================== */

export const reportIncident = async (payload) => {

    const response = await API.post(
        "/v1/ground-officers/incidents",
        payload
    );

    return response.data;

};

/* ==========================================
   Ground Officer - Assignments
========================================== */

export const getAssignments = async () => {

    const response = await API.get(
        "/v1/ground_officers/assignments"
    );

    return response.data;

};

export const startAssignment = async (assignmentId) => {

    const response = await API.patch(
        `/v1/ground_officers/assignments/${assignmentId}/start`
    );

    return response.data;

};

export const completeAssignment = async (assignmentId) => {

    const response = await API.patch(
        `/v1/ground_officers/assignments/${assignmentId}/complete`
    );

    return response.data;

};

export const getAssignmentById = async (assignmentId) => {

    const response = await API.get(

        `/v1/ground_officers/assignments/${assignmentId}`

    );

    return response.data;

};
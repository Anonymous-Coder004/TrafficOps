import API from "./axios";

export async function searchLocation(query) {
    const response = await API.get(
        "/v1/maps/search",
        {
            params: {
                q: query,
            },
        }
    );

    return response.data;
}


export async function getRoute(
    startLat,
    startLng,
    endLat,
    endLng,
) {
    const response = await API.get(
        "/v1/maps/route",
        {
            params: {
                start_lat: startLat,
                start_lng: startLng,
                end_lat: endLat,
                end_lng: endLng,
            },
        }
    );

    return response.data;
}
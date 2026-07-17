import API from "./axios";

export const searchLocation = async (query) => {

    const response = await API.get(
        "/v1/maps/search",
        {
            params:{
                q:query
            }
        }
    );

    return response.data;
};
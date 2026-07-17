import API from "./axios";

export const signup = (data) => {
    return API.post(
        "/v1/auth/signup",
        data
    );
};

export const login = (email,password) => {
    return API.post(
        "/v1/auth/login",
        {
            email,
            password
        }
    );
};

export const getMe = () => {
    return API.get(
        "/v1/auth/me"
    );
};
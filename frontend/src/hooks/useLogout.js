// hooks/useLogout.js

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function useLogout() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    return () => {

        logout();

        navigate("/login", { replace: true });

    };

}
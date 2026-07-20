import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function RoleRedirect() {

    const { user, loading } = useAuth();

    if (loading) {

        return null;

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    switch (user.role) {

        case "ADMIN":

            return (
                <Navigate
                    to="/admin/incidents"
                    replace
                />
            );

        case "GROUND_OFFICER":

            return (
                <Navigate
                    to="/ground/dashboard"
                    replace
                />
            );

        default:

            return (
                <Navigate
                    to="/login"
                    replace
                />
            );

    }

}
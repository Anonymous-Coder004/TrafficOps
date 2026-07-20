import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function ProtectedRoute({

    children,

    roles = [],

}) {

    const {

        loading,

        isAuthenticated,

        user,

    } = useAuth();

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 flex items-center justify-center">

                <div className="text-emerald-400 text-lg font-medium">

                    Loading...

                </div>

            </div>

        );

    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    if (
        roles.length > 0 &&
        !roles.includes(user.role)
    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}
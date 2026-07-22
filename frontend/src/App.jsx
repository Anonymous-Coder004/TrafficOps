import { Routes, Route, Navigate } from "react-router-dom";
import "tailwindcss";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./routes/ProtectedRoute";

import IncidentManagement from "./pages/admin/IncidentManagement";
import IncidentDetails from "./pages/admin/IncidentDetails";
import Dashboard from "./pages/ground/Dashboard";
import RoleRedirect from "./components/RoleRedirect";
import ReportIncident from "./pages/ground/ReportIncident";
import IncidentAssignments from "./pages/ground/IncidentAssignment";
import IncidentNavigation from "./pages/ground/IncidentNavigation";
import PatrolManagement from "./pages/admin/PatrolManagement";
import PatrollingDeployment from "./pages/ground/PatollingDeployment";
function App() {
    return (
        <Routes>

            {/* ===========================
                Public Routes
            =========================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* ===========================
                Protected Routes
            =========================== */}

            <Route path="/" element={<RoleRedirect />}/>

            <Route
                path="/admin/incidents"
                element={
                    <ProtectedRoute roles={["ADMIN"]}>
                        <IncidentManagement />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/incidents/:id"
                element={
                    <ProtectedRoute roles={["ADMIN"]}>
                        <IncidentDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/patrols"
                element={<ProtectedRoute roles={["ADMIN"]}>
                <PatrolManagement />
                </ProtectedRoute>}
            />

            <Route
                path="/ground/dashboard"
                element={
                    <ProtectedRoute roles={["GROUND_OFFICER"]}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ground/report-incident"
                element={
                    <ProtectedRoute
                        roles={["GROUND_OFFICER"]}
                    >
                        <ReportIncident />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ground/incident-assignments"
                element={
                    <ProtectedRoute
                        roles={["GROUND_OFFICER"]}
                    >
                        <IncidentAssignments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ground/incident-assignments/:assignmentId"
                element={
                    <ProtectedRoute
                        roles={["GROUND_OFFICER"]}
                    >
                        <IncidentNavigation />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ground/patrolling-deployment"
                element={<ProtectedRoute
                        roles={["GROUND_OFFICER"]}
                    ><PatrollingDeployment /></ProtectedRoute>}
            />
            {/* ===========================
                Fallback
            =========================== */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default App;
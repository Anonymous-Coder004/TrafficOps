import { Routes,Route,Navigate } from "react-router-dom";
import "tailwindcss";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>

            {/* Auth Routes */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* Protected Home Route */}

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default App;
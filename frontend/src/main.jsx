import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./components/maps/utils/icons";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        success: {
                            style: {
                                border: "1px solid #22c55e",
                            },
                        },
                        error: {
                            style: {
                                border: "1px solid #ef4444",
                            },
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
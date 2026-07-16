import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const navigate=useNavigate();
    const { user,logout }=useAuth();

    const handleLogout=()=>{
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            TrafficOps
                        </h1>

                        <p className="text-slate-400">
                            Traffic Operations Command Center
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Welcome, {user?.username}
                    </h2>

                    <div className="space-y-3 text-slate-300">
                        <p>
                            <span className="font-medium text-white">Email:</span>{" "}
                            {user?.email}
                        </p>

                        <p>
                            <span className="font-medium text-white">Role:</span>{" "}
                            {user?.role}
                        </p>

                        <p>
                            <span className="font-medium text-white">User ID:</span>{" "}
                            {user?.id}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
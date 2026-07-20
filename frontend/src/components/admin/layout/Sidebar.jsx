import {
    LayoutDashboard,
    Siren,
    Shield,
    LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        title: "Incident Management",
        icon: Siren,
        path: "/admin/incidents",
    },
    {
        title: "Patrolling Management",
        icon: Shield,
        path: "/admin/patrolling",
    },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = useLogout();

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">

            {/* Logo */}
            <div className="px-8 py-7 border-b border-gray-100">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-sm">

                        <span className="text-3xl">
                            🚦
                        </span>

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            TrafficOps
                        </h1>

                        <p className="text-sm text-gray-500">
                            Smart Traffic Operations
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 px-5 py-8">

                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-5">
                    Administration
                </p>

                <div className="space-y-3">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.title}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200
                                    
                                    ${
                                        isActive
                                            ? "bg-emerald-600 text-white shadow-md"
                                            : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                    }`
                                }
                            >

                                <Icon size={22} />

                                <span className="font-medium">
                                    {item.title}
                                </span>

                            </NavLink>
                        );
                    })}
                </div>

            </nav>

            {/* Footer */}

            <div className="border-t border-gray-100 p-5">

                <button
                    className="
                    w-full
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    px-5
                    py-4
                    text-red-500
                    hover:bg-red-50
                    transition"
                    onClick={handleLogout}
                >

                    <LogOut size={20} />

                    <span className="font-medium">
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}
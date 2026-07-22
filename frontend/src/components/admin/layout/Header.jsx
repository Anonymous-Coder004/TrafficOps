import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/authcontext";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-slate-900">
                    Traffic Operations
                </h1>

                <p className="text-sm text-gray-500">
                    Monitor and manage city traffic efficiently
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                

                {/* User */}

                <button
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-gray-200
                        px-3
                        py-2
                        hover:bg-emerald-50
                        transition
                    "
                >

                    <div
                        className="
                            w-11
                            h-11
                            rounded-full
                            bg-emerald-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                            text-lg
                        "
                    >
                        {user?.username
                            ? user.username[0].toUpperCase()
                            : "A"}
                    </div>

                    <div className="text-left">

                        <p className="font-semibold text-slate-900">
                            {user?.username || "Administrator"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.role || "ADMIN"}
                        </p>

                    </div>

                    <ChevronDown
                        size={18}
                        className="text-gray-500"
                    />

                </button>

            </div>

        </header>
    );
}
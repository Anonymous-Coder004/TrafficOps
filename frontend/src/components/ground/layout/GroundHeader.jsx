import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/authcontext";

export default function GroundHeader({

    title,

    subtitle,

}) {

    const { user } = useAuth();

    return (

        <header
            className="
                h-20
                bg-white
                border-b
                border-gray-200
                flex
                items-center
                justify-between
                px-8
            "
        >

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

            <div
                className="
                    flex
                    items-center
                    gap-5
                "
            >

                {/* Notification */}

                <button
                    className="
                        relative
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-gray-200
                        hover:bg-emerald-50
                        transition
                        flex
                        items-center
                        justify-center
                    "
                >

                    <Bell
                        size={20}
                        className="text-slate-700"
                    />

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            rounded-full
                            bg-emerald-500
                        "
                    />

                </button>

                {/* Profile */}

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
                            : "G"}

                    </div>

                    <div className="text-left">

                        <p
                            className="
                                font-semibold
                                text-slate-900
                            "
                        >

                            {user?.username || "Ground Officer"}

                        </p>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >

                            {user?.role || "GROUND OFFICER"}

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
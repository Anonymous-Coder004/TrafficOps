import {
    Search,
    RefreshCw,X
} from "lucide-react";

export default function IncidentToolbar({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    onRefresh,
    loading,
}) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b border-gray-100">

            {/* Search */}

            <div className="relative w-full lg:w-96">

                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        py-2.5
                        pl-10
                        pr-10
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                />

                {search && (

                    <button
                        onClick={() => setSearch("")}
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            hover:text-gray-700
                        "
                    >

                        <X size={16} />

                    </button>

                )}

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-2.5
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="REPORTED">
                        Reported
                    </option>

                    <option value="ANALYZED">
                        Analyzed
                    </option>

                    <option value="RESOURCE_ALLOCATED">
                        Resource Allocated
                    </option>

                    <option value="PROCESSING">
                        Processing
                    </option>

                    <option value="RESOLVED">
                        Resolved
                    </option>

                </select>

                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4
                        py-2.5
                        text-white
                        hover:bg-emerald-700
                        transition
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "                >
                    <RefreshCw
                        size={18}
                        className={loading ? "animate-spin" : ""}
                    />
                    {loading ? "Refreshing..." : "Refresh"}
                </button>

            </div>

        </div>
    );
}
import IncidentToolbar from "./IncidentToolbar";
import IncidentRow from "./IncidentRow";

export default function IncidentTable({
    incidents,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    onRefresh,
}) {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            {/* Header */}

            <div className="px-6 py-6 border-b border-gray-100">

                <h2 className="text-2xl font-bold text-slate-900">

                    Incident Management

                </h2>

                <p className="mt-2 text-gray-500">

                    Monitor and manage all traffic incidents.

                </p>

            </div>

            <IncidentToolbar

                search={search}

                setSearch={setSearch}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                onRefresh={onRefresh}

                loading={loading}

            />

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                ID
                            </th>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-left">
                                Event
                            </th>

                            <th className="px-6 py-4 text-left">
                                Criticality
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Created
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-16 text-gray-500"
                                >

                                    Loading incidents...

                                </td>

                            </tr>

                        ) : incidents.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-16 text-gray-500"
                                >

                                    No incidents found.

                                </td>

                            </tr>

                        ) : (

                            incidents.map((incident) => (

                                <IncidentRow
                                    key={incident.id}
                                    incident={incident}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
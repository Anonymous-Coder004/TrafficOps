import { useEffect, useMemo, useState } from "react";

import AdminLayout from "../../components/admin/layout/AdminLayout";
import IncidentTable from "../../components/admin/incident/IncidentTable";

import { getAllIncidents } from "../../api/incidents";

export default function IncidentManagement() {

    const [incidents, setIncidents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const loadIncidents = async () => {

    try {

        setLoading(true);

        const data = await getAllIncidents();

        setIncidents(data);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

};

    useEffect(() => {

        loadIncidents();

    }, []);

    const filteredIncidents = useMemo(() => {

        return incidents.filter((incident) => {

            const matchesSearch =
                incident.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "" ||
                incident.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [incidents, search, statusFilter]);

    return (

        <AdminLayout>

            <IncidentTable

                incidents={filteredIncidents}

                loading={loading}

                search={search}

                setSearch={setSearch}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                onRefresh={loadIncidents}

            />

        </AdminLayout>

    );

}
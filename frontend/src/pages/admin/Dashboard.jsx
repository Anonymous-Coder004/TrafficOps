import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/layout/AdminLayout";

import DashboardStats from "../../components/admin/Dashboard/DashboardStats";
import DashboardLayerControls from "../../components/admin/Dashboard/DashboardLayerControls";
import DashboardMap from "../../components/admin/Dashboard/DashboardMap";
import EmptyDetailsCard from "../../components/admin/Dashboard/EmptyDetailsCard";
import IncidentDetailsCard from "../../components/admin/Dashboard/IncidentDetailsCard";
import PatrolDetailsCard from "../../components/admin/Dashboard/PatrolDetailsCard";

import {
    getAllIncidents,
    getIncidentById,
} from "../../api/incidents";

import {
    getAllPatrols,
    getPatrolById,
} from "../../api/patrol";

export default function Dashboard() {

    const [incidents, setIncidents] = useState([]);

    const [patrols, setPatrols] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedIncident, setSelectedIncident] =
        useState(null);

    const [selectedPatrol, setSelectedPatrol] =
        useState(null);

    const [showIncidents, setShowIncidents] =
        useState(true);

    const [showPatrols, setShowPatrols] =
        useState(true);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [

                incidentsData,

                patrolsData,

            ] = await Promise.all([

                getAllIncidents(),

                getAllPatrols(),

            ]);

            setIncidents(incidentsData);

            setPatrols(patrolsData);

        }

        catch (error) {

            console.error(error);

                toast.error("Failed to load dashboard.");

            }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    const handleIncidentClick = async (incidentId) => {

        setSelectedPatrol(null);

        try {

            const data = await getIncidentById(incidentId);

            setSelectedIncident(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load incident details.");

        }

    };

    const handlePatrolClick = async (patrolId) => {

        setSelectedIncident(null);

        try {

            const data = await getPatrolById(patrolId);

            setSelectedPatrol(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load patrol details.");

        }

    };

    const stats = useMemo(() => ({

        totalIncidents:

            incidents.length,

        activeIncidents:

            incidents.filter(

                incident =>

                    incident.status !== "RESOLVED"

            ).length,

        totalPatrols:

            patrols.length,

        completedPatrols:

            patrols.filter(

                patrol =>

                    patrol.status === "COMPLETED"

            ).length,

    }), [incidents, patrols]);

    return (

        <AdminLayout>

            <div className="space-y-6">

                <DashboardStats

                    totalIncidents={
                        stats.totalIncidents
                    }

                    activeIncidents={
                        stats.activeIncidents
                    }

                    totalPatrols={
                        stats.totalPatrols
                    }

                    completedPatrols={
                        stats.completedPatrols
                    }

                />

                <DashboardLayerControls

                    showIncidents={
                        showIncidents
                    }

                    setShowIncidents={
                        setShowIncidents
                    }

                    showPatrols={
                        showPatrols
                    }

                    setShowPatrols={
                        setShowPatrols
                    }

                />

                <div
                    className="
                        grid
                        grid-cols-12
                        gap-6
                    "
                >

                    <div className="col-span-8">

                        <DashboardMap

                            loading={loading}

                            incidents={incidents}

                            patrols={patrols}

                            showIncidents={
                                showIncidents
                            }

                            showPatrols={
                                showPatrols
                            }

                            onIncidentClick={
                                handleIncidentClick
                            }

                            onPatrolClick={
                                handlePatrolClick
                            }

                        />

                    </div>

                    <div className="col-span-4">

                        {

                            selectedIncident ?

                                (

                                    <IncidentDetailsCard

                                        incident={
                                            selectedIncident
                                        }

                                    />

                                )

                                :

                                selectedPatrol ?

                                    (

                                        <PatrolDetailsCard

                                            patrol={
                                                selectedPatrol
                                            }

                                        />

                                    )

                                    :

                                    (

                                        <EmptyDetailsCard />

                                    )

                        }

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}
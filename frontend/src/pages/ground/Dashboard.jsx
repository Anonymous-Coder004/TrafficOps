import { useNavigate } from "react-router-dom";

import {
    FilePlus2,
    ClipboardList,
    Car,
} from "lucide-react";

import GroundLayout from "../../components/ground/layout/GroundLayout";

import DashboardSection from "../../components/ground/dashboard/DashboardSection";
import QuickActionCard from "../../components/ground/dashboard/QuickActionCard";
import TaskCard from "../../components/ground/dashboard/TaskCard";

export default function Dashboard() {

    const navigate = useNavigate();

    return (

        <GroundLayout

            title="Ground Dashboard"

            subtitle="Manage incidents and assignments."

        >

            <div className="space-y-10">

                <DashboardSection

                    title="Quick Actions"

                    subtitle="Report new incidents from the field."

                >

                    <QuickActionCard

                        title="Report Incident"

                        description="Create a new traffic incident report."

                        icon={FilePlus2}

                        onClick={() =>
                            navigate("/ground/report-incident")
                        }

                    />

                </DashboardSection>

                <DashboardSection

                    title="My Tasks"

                    subtitle="View and manage your current assignments."

                >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <TaskCard

                            title="Incident Deployment"

                            description="View your assigned incidents."

                            icon={ClipboardList}

                            onClick={() =>
                                navigate("/ground/incident-assignments")
                            }

                        />

                        <TaskCard

                            title="Patrolling Deployment"

                            description="Coming Soon"

                            icon={Car}

                            disabled

                        />

                    </div>

                </DashboardSection>

            </div>

        </GroundLayout>

    );

}
import {
    useEffect,
    useState,
} from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import GroundLayout from "../../components/ground/layout/GroundLayout";
import AssignmentInfoCard from "../../components/ground/navigation/AssignmentInfoCard";
import AssignmentControls from "../../components/ground/navigation/AssignmentControls";
import RouteMap from "../../components/maps/views/RouteMap";

import {getAssignmentById,startAssignment,completeAssignment} from "../../api/incidents";

export default function IncidentNavigation() {

    const { assignmentId } = useParams();

    const navigate = useNavigate();

    const [assignment, setAssignment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");

    async function loadAssignment() {

        try {

            setLoading(true);

            const data = await getAssignmentById(

                assignmentId

            );

            setAssignment(data);

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Unable to load assignment."

            );

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        loadAssignment();

    }, [assignmentId]);

    async function handleStart() {

        try {

            setActionLoading(true);

            await startAssignment(

                assignment.id

            );

            await loadAssignment();

        }

        catch (err) {

            alert(

                err?.response?.data?.detail ||

                "Failed to start assignment."

            );

        }

        finally {

            setActionLoading(false);

        }

    }

    async function handleComplete() {

        try {

            setActionLoading(true);

            await completeAssignment(
                assignment.id
            );

            // Redirect to Ground Officer dashboard
            navigate("/ground/dashboard", {
                replace: true,
            });

        }

        catch (err) {

            alert(

                err?.response?.data?.detail ||

                "Failed to complete assignment."

            );

        }

        finally {

            setActionLoading(false);

        }

    }

    if (loading) {

        return (

            <GroundLayout>

                <div className="text-center py-20">

                    Loading Assignment...

                </div>

            </GroundLayout>

        );

    }

    if (error) {

        return (

            <GroundLayout>

                <div
                    className="
                        bg-red-50
                        border
                        border-red-200
                        rounded-xl
                        p-4
                        text-red-600
                    "
                >

                    {error}

                </div>

            </GroundLayout>

        );

    }

    return (

        <GroundLayout>

            <div
                className="
                    max-w-7xl
                    mx-auto
                    space-y-6
                "
            >

                <button

                    onClick={() => navigate(-1)}

                    className="
                        text-blue-600
                        hover:underline
                    "

                >

                    ← Back

                </button>

                <AssignmentInfoCard

                    assignment={assignment}

                />
                <RouteMap

                    team={assignment.team}

                    incident={assignment.incident}

                />

                <AssignmentControls

                    status={assignment.status}

                    loading={actionLoading}

                    onStart={handleStart}

                    onComplete={handleComplete}

                />

            </div>

        </GroundLayout>

    );

}
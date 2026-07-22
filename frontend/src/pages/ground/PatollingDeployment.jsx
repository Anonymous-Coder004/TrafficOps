import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    getCurrentPatrol,
    startPatrol,
    completePatrol,
} from "../../api/patrol";

import GroundLayout from "../../components/ground/layout/GroundLayout";

import NoPatrolCard from "../../components/ground/patrol/NoPatrolCard";
import PatrolSummaryCard from "../../components/ground/patrol/PatrolSummaryCard";
import PatrolProgress from "../../components/ground/patrol/PatrolProgress";
import CurrentCheckpointCard from "../../components/ground/patrol/CurrentCheckpointCard";

import PatrolRouteModal from "../../components/maps/views/PatrolRouteModal";

export default function PatrollingDeployment() {

    const [loading, setLoading] = useState(true);
    const [patrol, setPatrol] = useState(null);
    const [routeOpen, setRouteOpen] = useState(false);
    const [starting, setStarting] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);
    const navigate = useNavigate();
    async function loadPatrol() {

        setLoading(true);

        try {

            const data = await getCurrentPatrol();

            setPatrol(data);

            if (data?.status === "IN_PROGRESS") {

                setCurrentCheckpointIndex(
                    data.current_checkpoint_index ?? 0
                );

            } else {

                setCurrentCheckpointIndex(0);

            }

        }

        catch (err) {

            if (
                err?.response?.status === 404 ||
                err?.response?.data?.detail ===
                    "No patrol has been assigned yet."
            ) {

                setPatrol(null);

            }

            else {

                toast.error("Failed to load patrol.");

            }

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadPatrol();

    }, []);

    async function handleStartPatrol() {

        if (!patrol) return;

        setStarting(true);

        try {

            await startPatrol(patrol.patrol_id);

            toast.success("Patrol started.");

            await loadPatrol();

        }

        catch {

            toast.error("Unable to start patrol.");

        }

        finally {

            setStarting(false);

        }

    }

    async function handleCompletePatrol() {

        if (!patrol) return;

        setCompleting(true);

        try {

            await completePatrol(patrol.patrol_id);

            toast.success("Patrol completed.");

            navigate("/ground/dashboard");

        }

        catch {

            toast.error("Unable to complete patrol.");

        }

        finally {

            setCompleting(false);

        }

    }

    function handleReachCheckpoint() {

        if (!started) {
            toast.error("Start the patrol first.");
            return;
        }

        if (
            currentCheckpointIndex <
            patrol.total_checkpoints
        ) {
            setCurrentCheckpointIndex((prev) => prev + 1);
        }

    }

    if (loading) {

        return (

            <GroundLayout
                title="Patrolling Deployment"
                subtitle="View and manage your assigned patrol."
            >

                <div className="flex justify-center py-20">

                    Loading patrol...

                </div>

            </GroundLayout>

        );

    }

    if (!patrol) {

        return (

            <GroundLayout
                title="Patrolling Deployment"
                subtitle="View and manage your assigned patrol."
            >

                <NoPatrolCard />

            </GroundLayout>

        );

    }

    const started = patrol.status === "IN_PROGRESS";

    const completed = patrol.status === "COMPLETED";

    const canComplete =
        currentCheckpointIndex >= patrol.total_checkpoints;

    return (

        <GroundLayout
            title="Patrolling Deployment"
            subtitle="View and manage your assigned patrol."
        >

            <div className="space-y-6">

                <PatrolSummaryCard

                    patrol={patrol}

                    started={started}

                    completed={completed}

                    canComplete={canComplete}

                    starting={starting}

                    completing={completing}

                    onViewRoute={() => setRouteOpen(true)}

                    onStartPatrol={handleStartPatrol}

                    onCompletePatrol={handleCompletePatrol}

                />

                <PatrolProgress
                    checkpoints={patrol.checkpoints}
                    currentCheckpointIndex={currentCheckpointIndex}
                />

                <CurrentCheckpointCard
                    checkpoints={patrol.checkpoints}
                    currentCheckpointIndex={currentCheckpointIndex}
                    started={started}
                    onReachCheckpoint={handleReachCheckpoint}
                />

                <PatrolRouteModal

                    open={routeOpen}

                    onClose={() => setRouteOpen(false)}

                    patrol={patrol}

                    currentCheckpointIndex={
                        currentCheckpointIndex
                    }

                />

            </div>

        </GroundLayout>

    );

}
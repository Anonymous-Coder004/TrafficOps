import React, { useState } from "react";
import toast from "react-hot-toast";
import GeneratePatrolCard from "../../components/admin/Patrol/GeneratePatrolCard";
import PatrolCard from "../../components/admin/Patrol/PatrolCard";
import {getAvailableTeams,createPatrol,} from "../../api/patrol";
import AdminLayout from "../../components/admin/layout/AdminLayout";
const PatrolManagement = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedRadius, setSelectedRadius] = useState(5);
    const [patrol, setPatrol] = useState(null);
    const [loadingTeams, setLoadingTeams] = useState(false);
    const [generatingPatrol, setGeneratingPatrol] = useState(false);
    const [hasCheckedTeams, setHasCheckedTeams] = useState(false);
    const handleCheckTeams = async () => {
        try {
            setLoadingTeams(true);

            const data = await getAvailableTeams();

            setTeams(data);
            setSelectedTeam("");
            setHasCheckedTeams(true);

            if (data.length === 0) {
                toast("No available teams found.", {
                    icon: "ℹ️",
                });
            } else {
                toast.success(
                    `${data.length} available team(s) found.`
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.detail ||
                "Failed to load available teams."
            );
        } finally {
            setLoadingTeams(false);
        }
    };

    const handleGeneratePatrol = async () => {
        try {
            setGeneratingPatrol(true);

            const data = await createPatrol(
                selectedTeam,
                selectedRadius
            );

            setPatrol(data);

            // Remove the assigned team from the dropdown
            setTeams((prev) =>
                prev.filter(
                    (team) => team.team_id !== Number(selectedTeam)
                )
            );

            // Reset dropdown
            setSelectedTeam("");

            toast.success("Patrol generated successfully.");
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.detail ||
                "Failed to generate patrol."
            );
        } finally {
            setGeneratingPatrol(false);
        }
    };
    return (
        <AdminLayout>
            <div className="space-y-8">

                

                <GeneratePatrolCard
                    teams={teams}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    selectedRadius={selectedRadius}
                    setSelectedRadius={setSelectedRadius}
                    loadingTeams={loadingTeams}
                    generatingPatrol={generatingPatrol}
                    onCheckTeams={handleCheckTeams}
                    onGeneratePatrol={handleGeneratePatrol}
                    hasCheckedTeams={hasCheckedTeams}
                />

                {patrol && (
                    <PatrolCard
                        patrol={patrol}
                        title="Generated Patrol"
                    />
                )}

            </div>
        </AdminLayout>
    );
};

export default PatrolManagement;
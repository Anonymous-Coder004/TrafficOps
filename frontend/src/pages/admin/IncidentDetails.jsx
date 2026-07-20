import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/layout/AdminLayout";
import IncidentSummary from "../../components/admin/incident/details/IncidentSummary";
import PredictionCard from "../../components/admin/incident/details/PredictionCard";
import RecommendationCard from "../../components/admin/incident/details/RecommendationCard";
import DeploymentCard from "../../components/admin/incident/details/DeploymentCard";

import {
    getIncidentById,
    predictIncident,
    recommendResources,
    updateRecommendation,
    deployIncident,
} from "../../api/incidents";

export default function IncidentDetails() {

    const { id } = useParams();

    const [incident, setIncident] = useState(null);

    const [loading, setLoading] = useState(true);

    const [predictLoading, setPredictLoading] = useState(false);

    const [recommendLoading, setRecommendLoading] = useState(false);

    const [saveLoading, setSaveLoading] = useState(false);

    const [deployLoading, setDeployLoading] = useState(false);

    const loadIncident = useCallback(async () => {

        try {

            setLoading(true);

            const data = await getIncidentById(id);

            setIncident(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }, [id]);

    useEffect(() => {

        loadIncident();

    }, [loadIncident]);

    async function handlePredict() {

        try {

            setPredictLoading(true);

            await predictIncident(id);

            await loadIncident();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setPredictLoading(false);

        }

    }

    async function handleRecommend() {

        try {

            setRecommendLoading(true);

            await recommendResources(id);

            await loadIncident();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setRecommendLoading(false);

        }

    }

    async function handleSaveRecommendation(payload) {

        try {

            setSaveLoading(true);

            await updateRecommendation(id, payload);

            await loadIncident();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setSaveLoading(false);

        }

    }

    async function handleDeploy() {

        try {

            setDeployLoading(true);

            await deployIncident(id);

            await loadIncident();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setDeployLoading(false);

        }

    }

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center py-20 text-gray-500">

                    Loading incident...

                </div>

            </AdminLayout>

        );

    }

    if (!incident) {

        return (

            <AdminLayout>

                <div className="text-center py-20 text-gray-500">

                    Incident not found.

                </div>

            </AdminLayout>

        );

    }

    const recommendation = incident?.recommendation;

    const predictionCompleted =
        recommendation?.criticality != null;

    const recommendationCompleted =
        predictionCompleted &&
        recommendation?.recommended_officers != null &&
        recommendation?.recommended_barricades != null;

    const deploymentCompleted =
        incident?.status === "RESOURCE_ALLOCATED";

    return (

        <AdminLayout>

            <div className="space-y-6">

                <IncidentSummary incident={incident} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <PredictionCard
                        recommendation={recommendation}
                        loading={predictLoading}
                        completed={predictionCompleted}
                        onPredict={handlePredict}
                    />

                    <RecommendationCard
                        recommendation={recommendation}
                        loading={recommendLoading}
                        saving={saveLoading}
                        predictionCompleted={predictionCompleted}
                        completed={recommendationCompleted}
                        onRecommend={handleRecommend}
                        onSave={handleSaveRecommendation}
                    />

                </div>

                <div className="pt-2">

                    <DeploymentCard
                        incident={incident}
                        loading={deployLoading}
                        recommendationCompleted={recommendationCompleted}
                        deploymentCompleted={deploymentCompleted}
                        onDeploy={handleDeploy}
                    />

                </div>

            </div>

        </AdminLayout>

    );

}
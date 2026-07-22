import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GroundLayout from "../../components/ground/layout/GroundLayout";
import IncidentForm from "../../components/ground/incident/IncidentForm";

import { reportIncident } from "../../api/incidents";

export default function ReportIncident() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData) {

        try {

            setLoading(true);

            await reportIncident(formData);

            toast.success("Incident reported successfully.");

            navigate("/ground/dashboard");

        }

        catch (error) {

            toast.error(

                error?.response?.data?.detail ||

                "Failed to report incident."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <GroundLayout>

            <div className="max-w-5xl mx-auto space-y-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        Report Incident

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Submit a new traffic incident.

                    </p>

                </div>

                <IncidentForm

                    loading={loading}

                    onSubmit={handleSubmit}

                />

            </div>

        </GroundLayout>

    );

}
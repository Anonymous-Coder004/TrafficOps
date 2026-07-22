import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GroundLayout from "../../components/ground/layout/GroundLayout";

import AssignmentList from "../../components/ground/assignment/AssignmentList";

import { getAssignments } from "../../api/incidents";

export default function IncidentAssignments() {

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    async function fetchAssignments() {

        try {

            setLoading(true);

            setError("");

            const data = await getAssignments();

            setAssignments(data);

            toast.success("Assignments loaded successfully.");

        }

        catch (err) {

            const message =
                err?.response?.data?.detail ||
                "Failed to fetch assignments.";

            setError(message);

            toast.error(message);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchAssignments();

    }, []);

    function handleView(id) {

        navigate(

            `/ground/incident-assignments/${id}`

        );

    }

    return (

        <GroundLayout>

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Heading */}

                <div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >

                        Incident Deployment

                    </h1>

                    <p
                        className="
                            mt-2
                            text-slate-500
                        "
                    >

                        View and manage your assigned incidents.

                    </p>

                </div>

                {

                    loading && (

                        <div
                            className="
                                bg-white
                                rounded-2xl
                                border
                                p-16
                                text-center
                                text-slate-500
                            "
                        >

                            Loading assignments...

                        </div>

                    )

                }

                {

                    error && (

                        <div
                            className="
                                bg-red-50
                                border
                                border-red-200
                                rounded-2xl
                                p-5
                                text-red-600
                            "
                        >

                            {error}

                        </div>

                    )

                }

                {

                    !loading &&

                    !error && (

                        <AssignmentList

                            assignments={assignments}

                            onView={handleView}

                        />

                    )

                }

            </div>

        </GroundLayout>

    );

}
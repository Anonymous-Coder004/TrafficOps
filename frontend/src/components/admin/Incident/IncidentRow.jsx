import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export default function IncidentRow({ incident }) {

    const navigate = useNavigate();

    return (

        <tr
            onClick={() => {
    console.log("clicked", incident.id);
    navigate(`/admin/incidents/${incident.id}`);
}}
            className="
                cursor-pointer
                hover:bg-emerald-50
                transition
            "
        >

            <td className="px-6 py-4 font-semibold text-slate-700">
                #{incident.id}
            </td>

            <td className="px-6 py-4">

                <div>

                    <p className="font-semibold text-slate-800">
                        {incident.title}
                    </p>

                </div>

            </td>

            <td className="px-6 py-4">
                {incident.event_type}
            </td>

            <td className="px-6 py-4">

                {
                    incident.recommendation?.criticality ? (
                        <StatusBadge
                            value={incident.recommendation.criticality}
                            type="criticality"
                        />
                    ) : (
                        <span className="text-gray-400">-</span>
                    )
                }

            </td>

            <td className="px-6 py-4">

                <StatusBadge
                    value={incident.status}
                    type="status"
                />

            </td>

            <td className="px-6 py-4 text-gray-600">

                {new Date(incident.created_at).toLocaleString()}

            </td>

        </tr>

    );

}
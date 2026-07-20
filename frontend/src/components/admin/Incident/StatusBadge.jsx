export default function StatusBadge({
    value,
    type,
}) {

    if (!value) {
        return (
            <span className="text-gray-400">
                —
            </span>
        );
    }

    const statusStyles = {
        REPORTED:
            "bg-gray-100 text-gray-700",

        ANALYZED:
            "bg-blue-100 text-blue-700",

        RESOURCE_ALLOCATED:
            "bg-purple-100 text-purple-700",

        PROCESSING:
            "bg-orange-100 text-orange-700",

        RESOLVED:
            "bg-emerald-100 text-emerald-700",
    };

    const criticalityStyles = {
        LOW:
            "bg-green-100 text-green-700",

        MEDIUM:
            "bg-yellow-100 text-yellow-700",

        HIGH:
            "bg-orange-100 text-orange-700",

        CRITICAL:
            "bg-red-100 text-red-700",
    };

    const badgeStyle =
        type === "status"
            ? statusStyles[value]
            : criticalityStyles[value];

    return (
        <span
            className={`
                inline-flex
                items-center
                justify-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                tracking-wide
                whitespace-nowrap
                ${badgeStyle}
            `}
        >
            {value.replaceAll("_", " ")}
        </span>
    );
}
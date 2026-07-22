import GroundSidebar from "./GroundSidebar";
import GroundHeader from "./GroundHeader";

export default function GroundLayout({
    title,
    subtitle,
    children,
}) {
    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">

            {/* Sidebar */}
            <GroundSidebar />

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">

                {/* Fixed Header */}
                <GroundHeader
                    title={title}
                    subtitle={subtitle}
                />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}
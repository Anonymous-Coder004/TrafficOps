import GroundSidebar from "./GroundSidebar";
import GroundHeader from "./GroundHeader";

export default function GroundLayout({

    title,

    subtitle,

    children,

}) {

    return (

        <div className="flex h-screen bg-slate-100">

            {/* Sidebar */}

            <GroundSidebar />

            {/* Main */}

            <div className="flex-1 flex flex-col overflow-hidden">

                <GroundHeader

                    title={title}

                    subtitle={subtitle}

                />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-8
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

}
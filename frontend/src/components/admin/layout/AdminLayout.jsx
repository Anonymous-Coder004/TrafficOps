import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}

                <Header />

                {/* Page Content */}

                <main className="flex-1 overflow-y-auto p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}
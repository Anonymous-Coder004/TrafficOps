import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
    return (
        <div className="h-screen flex bg-gray-100 overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Right Section */}
            <div className="flex flex-1 flex-col overflow-hidden">

                {/* Fixed Header */}
                <Header />

                {/* Only this scrolls */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}
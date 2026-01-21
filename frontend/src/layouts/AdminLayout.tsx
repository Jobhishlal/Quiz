import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const AdminLayout = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Header */}
                <TopBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {/* Page Content */}
                <div className="p-8 flex-1 overflow-y-auto">
                    <Outlet context={{ searchTerm }} />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

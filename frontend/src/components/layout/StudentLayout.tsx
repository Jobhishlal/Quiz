import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentNavbar from './StudentNavbar';

const StudentLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <StudentSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <StudentNavbar />

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;

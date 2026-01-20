import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 z-40">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </header>

                {/* Page Content */}
                <div className="p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

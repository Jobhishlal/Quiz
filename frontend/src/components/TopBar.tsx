import React from 'react';
import { Search, Sun, Bell, Command, Check, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';

interface TopBarProps {
    searchTerm?: string;
    onSearchChange?: (term: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ searchTerm = '', onSearchChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: authUser } = useSelector((state: RootState) => state.auth);

    const displayName = authUser?.email ? authUser.email.split('@')[0] : "Admin";

    const user = {
        name: displayName,
        role: "Admin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-40 sticky top-0">
            {/* Left Box - Greeting */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {user.name} <span className="text-2xl">👋🏻</span>
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Good evening..!</p>
            </div>

            {/* Right Box - Actions */}
            <div className="flex items-center gap-6">

                {/* Search Bar */}
                <div className="relative hidden md:block group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        placeholder="Search here..."
                        className="block w-80 pl-11 pr-12 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1 text-gray-400">
                            <Command className="w-4 h-4" />
                            <span className="text-sm font-medium">K</span>
                        </div>
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 border-r border-gray-200 pr-6 mr-2">
                    <button className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all relative">
                        <Sun className="w-6 h-6" />
                    </button>
                    <button className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                {/* Profile & Logout */}
                <div className="flex items-center gap-3 pl-2">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="flex items-center gap-1">
                            <p className="text-gray-900 font-bold text-base">My Profile</p>
                            <div className="bg-blue-500 rounded-full p-0.5">
                                <Check className="w-2 h-2 text-white" strokeWidth={4} />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Admin</p>
                    </div>
                </div>

                {/* Logout (Small added feature) */}
                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default TopBar;

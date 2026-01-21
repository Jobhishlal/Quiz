import React, { useState } from 'react';
import { Search, Bell, Sun, User as UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

import { useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    console.log('StudentNavbar: Current User State:', user);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        navigate(`/student/homework?search=${value}`);
    };

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}:${String(today.getMonth() + 1).padStart(2, '0')}:${today.getFullYear()}`;

    return (
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Greeting */}
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900">
                        {user?.username || user?.email?.split('@')[0] || 'Student'}
                    </h1>
                    <span className="text-2xl">👋🏻</span>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Online</span>
                    </div>
                </div>
                <span className="text-xs text-gray-500 font-medium mt-0.5">{formattedDate}</span>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-xl mx-8">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#0088cc] transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border-none rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:bg-white transition-all"
                        placeholder="Search quiz by title..."
                        value={searchValue}
                        onChange={handleSearch}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-xs font-mono border border-gray-200 rounded px-1.5 py-0.5">⌘ K</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                    <Sun className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <h3 className="text-sm font-bold text-gray-900">My Profile</h3>
                            <div className="bg-blue-500 rounded-full p-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 text-white">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Student</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default StudentNavbar;

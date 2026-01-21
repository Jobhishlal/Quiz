import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BarChart2, Link as LinkIcon, Trophy, Layers, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const StudentSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/student/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
        { icon: BookOpen, label: 'Homework', path: '/student/homework' },
        { icon: BarChart2, label: 'Previous Scores', path: '/student/scores' },
        { icon: LinkIcon, label: 'Links', path: '/student/links' },
        { icon: Trophy, label: 'Leaderboard', path: '/student/leaderboard' },
        { icon: Layers, label: 'Vocabulary Flashcards', path: '/student/flashcards' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <img src="/brain logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-black text-gray-900 tracking-tight uppercase">QEHBS ONLINE</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="mb-2 px-4 text-sm font-semibold text-gray-900">Main Pages</div>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-gray-50 text-[#0088cc] font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-50">
                <nav className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-medium">Settings</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default StudentSidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ScrollText,
    Users,
    GraduationCap,
    Wallet,
    MessageSquare,
    Video,
    Settings,
    ChevronUp
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Quiz', icon: ScrollText, path: '/admin/quiz' },
        { name: 'Staff', icon: Users, path: '/admin/staff' },
        { name: 'Student', icon: GraduationCap, path: '/admin/student' },
        { name: 'Payment', icon: Wallet, path: '/admin/payment' },
        { name: 'Message', icon: MessageSquare, path: '/admin/message' },
        { name: 'Live Sessions', icon: Video, path: '/admin/live-sessions' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-y-auto font-sans z-50 no-scrollbar">
            {/* Header / Logo */}
            <div className="p-6 flex items-center gap-3">
                <img src="/brain logo.png" alt="Logo" className="w-8 h-auto" />
                <h1 className="text-xl font-black text-black tracking-tighter uppercase">
                    QEHBS ONLINE
                </h1>
            </div>

            <div className="px-6 pb-2 border-b border-gray-100 mb-4 opacity-50"></div>

            {/* Navigation Section */}
            <div className="flex-1 px-4">
                <div className="flex items-center justify-between px-3 mb-2 text-sm font-bold text-gray-900">
                    <span>Main Pages</span>
                    <ChevronUp className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-[#E0F2FE] text-[#0088cc]'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Footer / Upgrade Card */}
            <div className="p-4 mt-auto">
                <div className="bg-gradient-to-br from-[#0e5c83] to-[#127a9e] rounded-2xl p-5 text-white text-center shadow-lg relative overflow-hidden group">
                    {/* Decorative circle */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>

                    <p className="text-xs text-white/80 mb-1">Upgrade Promo %</p>
                    <h3 className="text-lg font-bold mb-2">Upgrade to Premium</h3>
                    <p className="text-[10px] text-white/70 mb-4 leading-relaxed">
                        Unlock advanced analytics, auto-reports, and unlimited quiz creation. Take your admin control to the next level.
                    </p>

                    <button className="w-full bg-white text-[#0e5c83] font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-sm">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

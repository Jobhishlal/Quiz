import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-5/12 relative items-center justify-center p-0 overflow-hidden bg-gray-50">
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                        src="/signup_or_login_backgrounnd.png"
                        alt="Welcome"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pt-20">
                        <div className="relative w-80 h-64 mb-2">
                            {/* Top Left - Woman (Purple) */}
                            <div className="absolute top-0 left-10 w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-[#E0D4FC] z-10">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" alt="Avatar 1" className="w-full h-full object-cover" />
                            </div>

                            {/* Top Right - Man Turban (Beige) */}
                            <div className="absolute top-4 right-8 w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-[#E6D0C5] z-10">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="Avatar 2" className="w-full h-full object-cover" />
                            </div>

                            {/* Center Badge */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-40 bg-white px-2 py-1 rounded-[3rem] shadow-xl rotate-[-12deg] border border-gray-100">
                                <svg width="150" height="50" viewBox="0 0 150 50" className="overflow-visible">
                                    <path id="curve" d="M 15 40 Q 75 10 135 40" fill="transparent" />
                                    <text width="150">
                                        <textPath href="#curve" startOffset="50%" textAnchor="middle" className="font-black text-gray-900 text-xl fill-current tracking-wide">
                                            Hello Dear!
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            {/* Bottom Center - Man Glasses (Peach) */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-[#F5D8C1] z-50">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar 3" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                            Let's Get You Ready<br />for the Quiz!
                        </h1>
                        <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
                            Get ready to challenge yourself! This quiz is designed to test your knowledge, boost your confidence, and make learning fun. Take a deep breath and let's begin! 🚀
                        </p>
                    </div>
                    <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-medium z-20">
                        © 2026 QEHBS All rights reserved
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-medium z-20">
                        Help?
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-7/12 flex items-center justify-center p-4 bg-white">
                <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sm:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

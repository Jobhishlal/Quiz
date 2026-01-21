import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-5/12 relative items-center justify-center p-0 overflow-hidden bg-gray-50">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src="/Signupfinal.png"
                        alt="Welcome"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-end h-full pb-32 px-8 text-center">
                        <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                            Let's Get You Ready<br />for the Quiz!
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
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

import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon, rightElement, className = '', ...props }) => {
    return (
        <div className="relative mb-3">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
            )}
            <input
                className={`w-full bg-gray-50 border border-gray-100 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] block p-3 ${icon ? 'pl-11' : 'pl-4'} ${rightElement ? 'pr-11' : 'pr-4'} outline-none transition-all placeholder-gray-400 font-medium ${className}`}
                {...props}
            />
            {rightElement && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default AuthInput;

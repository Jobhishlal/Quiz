import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import AuthInput from '../../components/AuthInput';
import studentAuthService from '../../services/studentAuthService';
import { setCredentials } from '../../store/authSlice';

const StudentLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await studentAuthService.login(formData);
            if (response.success) {
                dispatch(setCredentials({
                    accessToken: response.accessToken,
                    user: { email: formData.email }
                }));
                toast.success(response.message || 'Login successful!');
                navigate('/student/dashboard');
            }
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.message || 'Login failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <img src="/brain logo.png" alt="QEHBS Logo" className="w-8 h-8 object-contain" />
                    <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">QEHBS ONLINE</h1>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in your account</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                    Sign in to your account and get start your quiz, meetings and exams reports
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                <AuthInput
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    icon={<User className="w-5 h-5" />}
                    // value={formData.email}
                    onChange={handleChange}

                />

                <AuthInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    icon={<Lock className="w-5 h-5" />}
                    value={formData.password}
                    onChange={handleChange}

                    rightElement={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    }
                />

                <div className="flex justify-end mb-4">
                    <Link to="/student/forgot-password" className="text-sm font-semibold text-gray-500 hover:text-[#0088cc]">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0088cc] text-white font-bold py-3.5 rounded-xl hover:bg-[#0077b3] transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed text-base shadow-lg shadow-blue-100"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/student/signup" className="text-[#0088cc] font-semibold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default StudentLogin;

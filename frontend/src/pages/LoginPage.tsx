import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { adminService } from '../services/adminService';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import toast from 'react-hot-toast';
import type { RootState } from '../store/store';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await adminService.login({ email, password });
            if (response.success && response.accessToken) {
                const decoded: any = jwtDecode(response.accessToken);
                dispatch(setCredentials({
                    accessToken: response.accessToken,
                    user: { email: decoded.email || '' }
                }));
                toast.success(response.message);
                navigate('/admin/dashboard');
            } else {
                toast.error(response.message || 'Login failed');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Invalid credentials or server error';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden font-sans">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url("/admin login backgroound.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Optional Overlay to ensure text readability if needed, though design looks clean */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex min-h-screen w-full">

                {/* Left Side - Branding & Inspiration */}
                <div className="hidden lg:flex flex-col justify-end w-1/2 p-16 pb-20 text-white">
                    <div className="mb-8 flex items-center gap-3">
                        <img
                            src="/brain logo org.png"
                            alt="Logo"
                            className="h-16 w-auto"
                        />
                        <h1 className="text-3xl font-black tracking-tighter uppercase text-white drop-shadow-md pb-2">
                            QEHBS<br />
                            <span className="text-2xl">ONLINE</span>
                        </h1>
                    </div>

                    <h1 className="text-[45px] font-bold leading-tight mb-4 drop-shadow-lg">
                        Empower minds through<br />
                        every quiz..!
                    </h1>

                    <p className="text-lg text-white/90 max-w-md drop-shadow-md">
                        Manage, create, and analyze all in one place.<br />
                        Your complete control hub for smarter quiz management.
                    </p>

                    <div className="mt-12 text-sm text-white/90 font-medium">
                        © 2025 QEHBS Limited - All right reserved.
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:pr-32 p-4">
                    <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl animate-fade-in-up">
                        <div className="text-center mb-8">
                            <h2 className="text-[27px] font-bold text-gray-900 mb-2">Welcome Back, {email.split('@')[0] || "admin"} 👋</h2>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto font-normal">
                                Secure entry point for QEHBS admins manage quizzes, users, reports, and analytics ✨
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="text" // Changed from email to text as per screenshot 'emmacollins...'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="enter your email"

                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="password"

                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0088cc] hover:bg-[#0077b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-gray-500">
                            Follow the <span className="text-[#0088cc] font-semibold cursor-pointer hover:underline">Rules</span> & <span className="text-[#0088cc] font-semibold cursor-pointer hover:underline">Privacy policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

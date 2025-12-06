'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        setError('');

        if (!email.trim()) {
            setError('Email is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        if (!password) {
            setError('Password is required');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: { email, password } }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed. Please try again.');
                toast.error(data.message || 'Login failed. Please try again.');
                setLoading(false);
                return;
            }

            setSuccess('Login successful! Redirecting...');
            await login(data.user.token, data.user);
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
            }

            toast.success('Login successful! Redirecting to collection...');

            setTimeout(() => {
                router.push('/collection');
            }, 1500);
        } catch (err) {
            setError('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.');
            console.error('Login error:', err);
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (codeResponse) => {
        setLoadingGoogle(true);
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/signin/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: codeResponse.code,
                    role: 'User'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Failed to login with Google');
                setLoadingGoogle(false);
                return;
            }

            // Use the login function from context
            await login(data.user.token, data.user);
            toast.success('Logged in successfully with Google!');

            setTimeout(() => {
                router.push('/collection');
            }, 1500);
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Failed to login with Google. Please try again.');
            setLoadingGoogle(false);
        }
    };

    const handleGoogleLoginError = (errorResponse) => {
        console.error('Google login error:', errorResponse);
        toast.error('Google login failed. Please try again.');
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess,
        onError: handleGoogleLoginError,
        flow: 'auth-code'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-orange-500 mb-2">VOGUE</h1>
                        <p className="text-gray-600">Welcome back to your fashion destination</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 text-sm font-medium">{success}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading || loadingGoogle}
                            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={() => googleLogin()}
                        disabled={loading || loadingGoogle}
                        className="w-full border-2 border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loadingGoogle ? (
                            <>
                                <Loader className="w-5 h-5 mr-2 animate-spin" />
                                Logging in with Google...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    By logging in, you agree to our{' '}
                    <Link href="#" className="text-orange-500 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-orange-500 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
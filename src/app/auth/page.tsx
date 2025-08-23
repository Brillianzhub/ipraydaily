"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Cookies from "js-cookie";
import { useLogin } from '@/services/requests/auth';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const loginMutation = useLogin();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const result = await loginMutation.mutateAsync({
                username: email,
                password,
            });

            // Basic shape guard (adjust field names if your API differs)
            if (!result?.token || !result?.user) {
                throw new Error("Invalid login response: missing token or user");
            }

            // Cookie options: secure/strict only in prod so localhost works
            const isProd = process.env.NODE_ENV === "production";
            const cookieOpts = {
                expires: 7 as const,
                secure: isProd,
                sameSite: (isProd ? "strict" : "lax") as any,
                path: "/",
            };

            // Store token and user
            Cookies.set("auth_token", result.token, cookieOpts);
            Cookies.set("user_data", JSON.stringify(result.user), cookieOpts);

            // (Optional) verify cookie actually got written (helps catch localhost issues)
            if (!Cookies.get("auth_token")) {
                throw new Error("Failed to persist auth cookie");
            }

            // Clear form fields
            setEmail("");
            setPassword("");

            // Respect ?next= redirect if present (e.g., after a 401 gate)
            const params = new URLSearchParams(window.location.search);
            const next = params.get("next") || "/dashboard";

            // Use replace to avoid leaving /auth in history
            router.replace(next);
        } catch (err: any) {
            console.error("Login failed:", err);
            // You can surface a toast or inline error here if desired
            // showToast(err?.response?.data?.message || err.message || "Login failed");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/10 text-white/10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
                    🙏
                </div>
                <div className="absolute top-3/5 right-1/6 text-white/10 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>
                    ✨
                </div>
                <div className="absolute bottom-1/3 left-1/5 text-white/10 text-3xl animate-bounce" style={{ animationDelay: '4s' }}>
                    🕊️
                </div>
            </div>

            {/* Login Container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 hover:-translate-y-2 relative z-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4">
                        <img
                            src="/ipray.jpeg"
                            alt="logo"
                            className="w-16 h-16 object-contain"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-[#0088DD] mb-2">Prayer Admin</h1>
                    <p className="text-gray-600 text-sm font-medium">
                        Dashboard Management Portal
                    </p>
                </div>


                {/* Login Form */}
                <div className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0088DD] focus:ring-4 focus:ring-[#0088DD]/10 transition-all duration-300 focus:-translate-y-1 outline-none"
                                placeholder="Enter your email"
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                                📧
                            </span>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0088DD] focus:ring-4 focus:ring-[#0088DD]/10 transition-all duration-300 focus:-translate-y-1 outline-none"
                                placeholder="Enter your password"
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                                🔒
                            </span>
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        onClick={handleSubmit}
                        className="w-full bg-[#FB9604] hover:bg-[#e8860a] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                        {loginMutation.isPending ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Signing In...
                            </div>
                        ) : (
                            'Sign In to Dashboard'
                        )}

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
                    </button>

                    {/* Error Message */}
                    {loginMutation.isError && (
                        <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                            {loginMutation.error?.message || 'Login failed. Please try again.'}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default LoginPage;
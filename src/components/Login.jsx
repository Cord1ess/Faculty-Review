import React, { useState } from 'react';
import { FiMail, FiLock, FiInfo } from 'react-icons/fi';

const Login = ({ onClose, onSwitchToSignup, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onLogin(formData.email, formData.password);
        if (!success) {
            setError('Invalid credentials. Use admin/admin for admin access.');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-[#181818] rounded-2xl flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-sm">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email Field */}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <FiMail className="w-5 h-5" />
                    </span>
                    <input
                        required
                        className="w-full h-12 pl-12 pr-4 bg-neutral-800 border border-gray-700 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 text-base"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                {/* Password Field */}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <FiLock className="w-5 h-5" />
                    </span>
                    <input
                        type="password"
                        required
                        className="w-full h-12 pl-12 pr-4 bg-neutral-800 border border-gray-700 rounded-full text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 text-base"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                {/* Error Message */}
                {error && (
                    <div className="text-center font-semibold text-sm bg-red-500/10 text-red-400 rounded-full py-2 px-4 border border-red-400/30">
                        {error}
                    </div>
                )}
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white rounded-full font-bold text-base tracking-wide hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                >
                    Login
                </button>
            </form>

            {/* Info Text */}
            <div className="flex items-center gap-2 py-2 px-3 bg-neutral-800 rounded-full">
                <FiInfo className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs text-gray-400 leading-tight text-center">
                    Your information will be anonymous. Login is only to verify your student status.
                </p>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
                <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToSignup}
                        className="text-orange-500 hover:text-orange-400 transition-colors font-semibold px-3 py-1 rounded-full bg-neutral-800"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login; 
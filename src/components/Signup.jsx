import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiInfo } from 'react-icons/fi';

const Signup = ({ onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        studentId: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signup attempt:', formData);
    };

    return (
        <div className="w-[280px] mx-auto px-4 py-4">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="text-xl font-bold font-sans bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent">
                    Create Account
                </h1>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                            <FiMail className="text-gray-500 w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            required
                            className="w-full h-12 pl-12 pr-4 bg-black/30 border border-gray-700/30 
                                   rounded-full text-gray-200 placeholder-gray-500
                                   focus:outline-none focus:border-orange-500/30
                                   text-sm"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500 text-center px-3">Only university email addresses are allowed</p>
                </div>

                {/* Student ID Field */}
                <div className="relative flex items-center">
                    <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500 w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        required
                        className="w-full h-12 pl-12 pr-4 bg-black/30 border border-gray-700/30 
                                   rounded-full text-gray-200 placeholder-gray-500
                                   focus:outline-none focus:border-orange-500/30
                                   text-sm"
                        placeholder="Student ID"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                            <FiLock className="text-gray-500 w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full h-12 pl-12 pr-4 bg-black/30 border border-gray-700/30 
                                   rounded-full text-gray-200 placeholder-gray-500
                                   focus:outline-none focus:border-orange-500/30
                                   text-sm"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500 text-center px-3">Must be at least 8 characters</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] 
                               text-white rounded-full font-medium text-sm
                               hover:shadow-lg hover:shadow-orange-500/20 
                               transition-all duration-300"
                >
                    Sign Up
                </button>
            </form>

            {/* Info Text */}
            <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-2 py-2 px-3 bg-black/30 rounded-full max-w-[240px]">
                    <FiInfo className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-xs text-gray-400 leading-tight text-center">
                        Your information will be anonymous. Login is only to verify your student status.
                    </p>
                </div>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-orange-500 hover:text-orange-400 transition-colors"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup; 
import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiInfo } from 'react-icons/fi';

const Signup = ({ onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        studentId: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        setError('');
        console.log('Signup attempt:', formData);
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-[#181818] rounded-2xl flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent mb-2">
                    Create Account
                </h1>
                <p className="text-gray-400 text-sm">Sign up to get started</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email Field */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center bg-neutral-800 border border-gray-700 rounded-full px-4 h-12 w-full">
                        <FiMail className="text-gray-500 w-5 h-5 mr-3" />
                        <input
                            type="email"
                            required
                            className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-base"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500 text-center px-3 mt-1">Only UIU email addresses are allowed</p>
                </div>
                {/* Student ID Field */}
                <div className="flex items-center bg-neutral-800 border border-gray-700 rounded-full px-4 h-12 w-full mb-1">
                    <FiUser className="text-gray-500 w-5 h-5 mr-3" />
                    <input
                        type="text"
                        required
                        className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-base"
                        placeholder="Student ID"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    />
                </div>
                {/* Password Field */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center bg-neutral-800 border border-gray-700 rounded-full px-4 h-12 w-full">
                        <FiLock className="text-gray-500 w-5 h-5 mr-3" />
                        <input
                            type="password"
                            required
                            className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-base"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500 text-center px-3 mt-1">Must be at least 8 characters</p>
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
                    Sign Up
                </button>
            </form>

            {/* Info Text */}
            <div className="flex items-center gap-2 py-2 px-3 bg-neutral-800 rounded-full">
                <FiInfo className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs text-gray-400 leading-tight text-center">
                    Your information will be anonymous. Login is only to verify your student status.
                </p>
            </div>

            {/* Login Link */}
            <div className="text-center">
                <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-orange-500 hover:text-orange-400 transition-colors font-semibold px-3 py-1 rounded-full bg-neutral-800"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup; 
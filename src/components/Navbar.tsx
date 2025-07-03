import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

interface NavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    onLogout: () => void;
    isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick, onLogout, isLoggedIn }) => {
    const navigate = useNavigate();
    const handleSearch = (query: string) => {
        // Handle search logic here
        console.log('Searching for:', query);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-gray-800 bg-[#121212]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
                {/* Logo/Title */}
                <Link to="/" className="text-2xl font-bold font-sans bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent">
                    Faculty Reviews
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl flex justify-center">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Right Side Menu Items */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="h-9 text-gray-400 hover:text-white transition-colors duration-300 text-sm px-5 rounded-full border border-transparent hover:border-gray-700/30 flex items-center"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={onLogout}
                                className="h-9 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white px-5 rounded-full text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onLoginClick}
                                className="h-9 text-gray-400 hover:text-white transition-colors duration-300 text-sm px-5 rounded-full border border-transparent hover:border-gray-700/30 flex items-center"
                            >
                                Login
                            </button>
                            <button
                                onClick={onSignupClick}
                                className="h-9 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white px-5 rounded-full text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
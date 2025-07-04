import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FiMenu, FiX } from 'react-icons/fi';
// @ts-ignore
import HiveLinkLogo from '../assets/HiveLink_logo.svg';

interface NavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    onLogout: () => void;
    isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick, onLogout, isLoggedIn }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleSearch = (query: string) => {
        // Handle search logic here
        console.log('Searching for:', query);
    };

    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/2 backdrop-blur-lg shadow-lg">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Logo/Title - HiveLink UIU */}
                    <Link to="/" className="flex items-center" onClick={() => window.location.href = '/'}>
                        <img src={HiveLinkLogo} alt="HiveLink UIU" className="h-8 md:h-9 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:brightness-0 active:invert active:transition-all active:duration-500" />
                    </Link>

                    {/* Desktop Search Bar - Absolutely Centered */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {/* Desktop Right Side Menu Items */}
                    <div className="hidden md:flex items-center justify-end gap-4">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="h-9 text-gray-700 hover:text-white transition-colors duration-300 text-sm px-5 rounded-full border border-transparent hover:border-primary-start/30 flex items-center backdrop-blur-sm bg-white/10"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="h-9 bg-gradient-to-r from-primary-start to-primary-end text-white px-5 rounded-full text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center shadow-md"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="h-9 text-gray-700 hover:text-white transition-colors duration-300 text-sm px-5 rounded-full border border-transparent hover:border-primary-start/30 flex items-center backdrop-blur-sm bg-white/10"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={onSignupClick}
                                    className="h-9 bg-gradient-to-r from-primary-start to-primary-end text-white px-5 rounded-full text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center shadow-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                    >
                        {menuOpen ? <FiX className="w-7 h-7 text-orange-500" /> : <FiMenu className="w-7 h-7 text-orange-500" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Search Bar (below navbar) */}
            <div className="md:hidden pt-20 px-4 w-full flex justify-center bg-transparent">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Mobile Menu Drawer */}
            {menuOpen && (
                <div className="fixed top-16 left-0 right-0 z-50 bg-[#181818] bg-opacity-95 shadow-lg flex flex-col items-center py-6 gap-4 md:hidden animate-fade-in">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}
                                className="w-11/12 h-12 text-lg text-gray-200 hover:text-white transition-colors duration-200 rounded-lg bg-white/10 mb-2"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); onLogout(); }}
                                className="w-11/12 h-12 text-lg bg-gradient-to-r from-primary-start to-primary-end text-white rounded-lg mb-2"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setMenuOpen(false); onLoginClick(); }}
                                className="w-11/12 h-12 text-lg text-gray-200 hover:text-white transition-colors duration-200 rounded-lg bg-white/10 mb-2"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); onSignupClick(); }}
                                className="w-11/12 h-12 text-lg bg-gradient-to-r from-primary-start to-primary-end text-white rounded-lg mb-2"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar; 
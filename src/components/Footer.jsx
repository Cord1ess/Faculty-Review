import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiMail, FiInfo, FiSun, FiMoon } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="w-full mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Disclaimer Section */}
                <div className="mb-8 space-y-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-lg font-medium text-white/90 mb-2 flex items-center gap-2 justify-center">
                            <FiInfo className="w-5 h-5 text-orange-500" />
                            Disclaimer
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            This platform aggregates publicly available information about faculty members and their courses.
                            Our review system is designed to facilitate constructive academic discourse and help students
                            make informed decisions about their education. We encourage honest, respectful, and
                            professional feedback that focuses on academic experiences and teaching effectiveness.
                        </p>
                    </div>

                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-lg font-medium text-white/90 mb-2 flex items-center gap-2 justify-center">
                            <FiInfo className="w-5 h-5 text-orange-500" />
                            Review Guidelines
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Reviews should be based on academic experiences only. Personal attacks, discriminatory
                            language, or non-academic content will not be tolerated. Our platform encourages
                            constructive feedback that helps both students and faculty members grow and improve
                            the educational experience for everyone.
                        </p>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="max-w-2xl mx-auto mb-8 border-t border-gray-800"></div>

                {/* Links Grid */}
                <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-4 gap-y-3 text-center">
                        <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Contact
                        </Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Privacy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Terms
                        </Link>
                        <Link to="/faq" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            FAQ
                        </Link>
                        <Link to="/guidelines" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Guidelines
                        </Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Cookies
                        </Link>
                        <Link to="/accessibility" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                            Accessibility
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <div className="flex items-center justify-center gap-6 mb-3">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                            <FiGithub className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:contact@facultyreview.com"
                            className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                            <FiMail className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Faculty Review. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
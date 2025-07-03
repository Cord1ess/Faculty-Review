import React from 'react';

const Hero = () => {
    return (
        <div className="w-full bg-[#121212]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-16">
                    <div className="w-full max-w-4xl text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Find the Right Faculty with{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9800]">
                                Real Reviews
                            </span>
                        </h1>
                        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Get authentic insights from students who've experienced the classes firsthand. Your
                            voice matters, your privacy is protected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 
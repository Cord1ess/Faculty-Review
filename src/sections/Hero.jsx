import React from 'react';
import reviewArt from '../assets/review_art.svg';
import privacyArt from '../assets/privacy_art.svg';
import upvoteArt from '../assets/upvote-downvote_art.svg';

const Hero = () => {
    return (
        <div className="w-full bg-[#121212]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    {/* Title as a background element, position manually as needed */}
                    <div className="w-full text-center my-4 mt-4">
                        <h2 className="inline-block text-2xl md:text-3xl font-semibold text-white select-none">
                            Discover Top-Rated Faculty
                        </h2>
                    </div>
                    {/* FacultyCarousel is a modular, animated component */}
                    <div className="w-full max-w-3xl relative pt-0">
                        <FacultyCarousel />
                    </div>
                    {/* Art row below carousel */}
                    <div className="w-full flex flex-row justify-center items-start gap-8 mt-8">
                        {/* Review Art */}
                        <div className="flex flex-col items-center w-40">
                            <img src={reviewArt} alt="Review Art" className="w-28 h-28 object-contain mb-2" />
                            <span className="text-center text-base font-semibold text-white/90 mt-2">Manage and rate your reviews</span>
                        </div>
                        {/* Privacy Art */}
                        <div className="flex flex-col items-center w-40">
                            <img src={privacyArt} alt="Privacy Art" className="w-28 h-28 object-contain mb-2" />
                            <span className="text-center text-base font-semibold text-white/90 mt-2">Your ratings are always anonymous</span>
                        </div>
                        {/* Upvote/Downvote Art */}
                        <div className="flex flex-col items-center w-40">
                            <img src={upvoteArt} alt="Upvote/Downvote Art" className="w-28 h-28 object-contain mb-2" />
                            <span className="text-center text-base font-semibold text-white/90 mt-2">Upvote and downvote reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 
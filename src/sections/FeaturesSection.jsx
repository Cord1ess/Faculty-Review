import React from 'react';
import reviewArt from '../assets/review_art.svg';
import privacyArt from '../assets/privacy_art.svg';
import upvoteArt from '../assets/upvote-downvote_art.svg';

const FeaturesSection = () => (
    <section className="w-full flex flex-col items-center my-8">
        {/* Section Title */}
        <div className="w-full text-center mb-4">
            <h2 className="inline-block text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent select-none">
                What are the Features?
            </h2>
        </div>
        {/* Features Row */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-24 w-full">
            {/* Review Art */}
            <div className="flex flex-col items-center w-full max-w-xs md:w-80">
                <img src={reviewArt} alt="Review Art" className="w-40 h-40 md:w-80 md:h-80 object-contain mb-2 transition-transform duration-300 ease-in-out hover:scale-110" />
                <span className="text-center text-xl font-semibold text-white/90 mt-1">Manage and Review Your Faculties</span>
            </div>
            {/* Privacy Art */}
            <div className="flex flex-col items-center w-full max-w-xs md:w-80">
                <img src={privacyArt} alt="Privacy Art" className="w-40 h-40 md:w-80 md:h-80 object-contain mb-2 transition-transform duration-300 ease-in-out hover:scale-110" />
                <span className="text-center text-xl font-semibold text-white/90 mt-1">Your Reviews are always Anonymous</span>
            </div>
            {/* Upvote/Downvote Art */}
            <div className="flex flex-col items-center w-full max-w-xs md:w-80">
                <img src={upvoteArt} alt="Upvote/Downvote Art" className="w-40 h-40 md:w-80 md:h-80 object-contain mb-2 transition-transform duration-300 ease-in-out hover:scale-110" />
                <span className="text-center text-xl font-semibold text-white/90 mt-1">Upvote and Downvote other Reviews</span>
            </div>
        </div>
    </section>
);

export default FeaturesSection; 
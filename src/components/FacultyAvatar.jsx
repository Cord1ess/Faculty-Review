import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiUser, FiAward } from 'react-icons/fi';

const FacultyAvatar = ({ faculty, recentComment }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(`/faculty/${faculty.id}`);
    };

    const handleReviewClick = () => {
        navigate(`/faculty/${faculty.id}?scrollTo=reviews`);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative">
                    <FiStar className="w-4 h-4 text-gray-400" />
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current absolute inset-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                </div>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FiStar key={`empty-${i}`} className="w-4 h-4 text-gray-400" />
            );
        }

        return stars;
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl backdrop-filter 
                          border border-gray-700/30 hover:border-orange-500/30 transition-all duration-300
                          hover:shadow-orange-500/10 group font-inter">
                <div className="flex p-6 gap-6 h-full">
                    {/* Left Section - Faculty Info */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                        {/* Photo */}
                        <div
                            onClick={handleProfileClick}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9800] 
                                    flex items-center justify-center text-4xl shadow-lg
                                    group-hover:scale-110 transition-transform duration-300 cursor-pointer hover:shadow-lg"
                        >
                            {faculty.emoji}
                        </div>

                        {/* Name and Designation */}
                        <div className="text-center">
                            <div
                                onClick={handleProfileClick}
                                className="text-xl font-bold font-poppins bg-gradient-to-r from-[#FF6B00] to-[#FF9800] 
                                        bg-clip-text text-transparent leading-tight cursor-pointer hover:brightness-110 transition-all duration-200"
                            >
                                {faculty.name}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">{faculty.department}</div>
                            <div className="flex items-center justify-center gap-1 mt-2">
                                <FiAward className="w-3 h-3 text-orange-500" />
                                <span className="text-xs text-gray-500">{faculty.experience} years experience</span>
                            </div>
                            <div
                                onClick={handleProfileClick}
                                className="text-xs text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 cursor-pointer hover:text-orange-400"
                            >
                                View Profile →
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Rating and Recent Comment */}
                    <div className="flex-grow flex flex-col justify-between">
                        {/* Rating Section */}
                        <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm font-medium">Overall Rating</span>
                                <span className="text-white font-bold text-lg">{faculty.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {renderStars(faculty.rating)}
                            </div>
                            <div className="text-gray-500 text-xs">
                                Based on student reviews
                            </div>
                        </div>

                        {/* Recent Comment Section */}
                        <div
                            onClick={handleReviewClick}
                            className="bg-black/30 rounded-lg p-4 border border-gray-700/30 flex-grow cursor-pointer hover:bg-black/40 hover:border-orange-500/30 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-400 text-sm font-medium">Recent Review</span>
                                {recentComment && (
                                    <div className="flex items-center gap-1">
                                        {renderStars(recentComment.rating)}
                                        <span className="text-xs text-gray-500 ml-1">{recentComment.rating}</span>
                                    </div>
                                )}
                            </div>

                            {recentComment ? (
                                <div className="space-y-2">
                                    <div className="text-xs text-gray-500 font-medium">
                                        {recentComment.course}
                                    </div>
                                    <div className="text-gray-200 text-sm leading-relaxed">
                                        "{recentComment.comment.length > 120
                                            ? recentComment.comment.substring(0, 120) + '...'
                                            : recentComment.comment}"
                                    </div>
                                    <div className="text-xs text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                        View All Reviews →
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm italic">
                                    No reviews yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyAvatar; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiUser, FiAward, FiThumbsUp, FiLock } from 'react-icons/fi';

const FacultyAvatar = ({ faculty, recentComment }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(`/faculty/${faculty.id}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
            );
        }
        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative">
                    <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current absolute inset-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                </div>
            );
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FiStar key={`empty-${i}`} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            );
        }
        return stars;
    };

    // Handler for faculty page navigation
    const goToFacultyPage = () => {
        navigate(`/faculty/${faculty.id}`);
    };

    // Handler for comment click: go to faculty page, scroll to comment, highlight
    const goToComment = () => {
        navigate(`/faculty/${faculty.id}?highlight=${recentComment?.id || ''}#comment-${recentComment?.id || ''}`);
    };

    return (
        <div className="w-full max-w-4xl aspect-[16/9] flex items-center justify-center mx-auto">
            <div className="w-full h-full bg-black/30 rounded-2xl shadow-lg border border-gray-700/30 flex flex-row items-start box-border overflow-hidden" style={{ padding: 'clamp(16px, 2vw, 32px)' }}>
                {/* Left: Profile Info */}
                <div className="flex flex-col items-start justify-start h-full pr-[clamp(12px,1.2vw,24px)] min-w-[clamp(110px,16vw,180px)] max-w-[clamp(140px,20vw,220px)] flex-shrink-0">
                    <button onClick={goToFacultyPage} className="relative flex items-center justify-center w-[clamp(56px,7vw,90px)] h-[clamp(56px,7vw,90px)] rounded-full bg-gradient-to-br from-orange-400/80 to-orange-600/80 shadow-lg mb-[clamp(8px,1vw,18px)] border-4 border-orange-400/40 hover:scale-105 transition-transform">
                        <span className="text-[clamp(28px,2.5vw,44px)]">{faculty.avatar}</span>
                        {faculty.privacy && (
                            <span className="absolute bottom-1 right-1 bg-black/60 rounded-full p-1">
                                <FiLock className="w-5 h-5 text-orange-300" />
                            </span>
                        )}
                    </button>
                    <button onClick={goToFacultyPage} className="text-[clamp(15px,1.3vw,22px)] font-bold text-orange-400 mb-[clamp(6px,0.7vw,12px)] text-left truncate w-full hover:underline">
                        {faculty.name}
                    </button>
                    <div className="flex items-center gap-[clamp(6px,0.7vw,12px)] w-full mb-[clamp(6px,0.7vw,12px)]">
                        <span className="text-[clamp(12px,1vw,16px)] text-gray-300 truncate">{faculty.department}</span>
                        <span className={`text-[clamp(10px,0.8vw,13px)] px-[clamp(6px,0.7vw,12px)] py-[clamp(2px,0.3vw,5px)] rounded-full font-semibold ${faculty.type === 'Full-time' ? 'bg-orange-500/20 text-orange-300' : 'bg-gray-500/20 text-gray-300'}`}>{faculty.type}</span>
                    </div>
                </div>
                {/* Right: Stats and Review */}
                <div className="flex flex-col justify-start h-full w-full gap-[clamp(16px,2vw,32px)] overflow-hidden min-w-0">
                    {/* Top: Stat Boxes */}
                    <div className="flex flex-row gap-[clamp(16px,2vw,32px)] w-full h-[clamp(60px,6vw,110px)] overflow-hidden">
                        {/* Overall Rating */}
                        <div className="flex-1 bg-black/40 rounded-xl p-[clamp(8px,1vw,16px)] border border-gray-700/30 flex flex-col items-center justify-center min-w-0 shadow-sm h-full">
                            <span className="text-[clamp(10px,0.9vw,14px)] text-gray-400 mb-[clamp(2px,0.3vw,5px)]">Overall Rating</span>
                            <div className="flex items-center gap-[clamp(2px,0.3vw,6px)]">
                                {renderStars(faculty.rating)}
                                <span className="text-[clamp(12px,1vw,18px)] font-bold text-white ml-[clamp(2px,0.3vw,6px)]">{faculty.rating}</span>
                            </div>
                        </div>
                        {/* Total Reviews */}
                        <div className="flex-1 bg-black/40 rounded-xl p-[clamp(8px,1vw,16px)] border border-gray-700/30 flex flex-col items-center justify-center min-w-0 shadow-sm h-full">
                            <span className="text-[clamp(10px,0.9vw,14px)] text-gray-400 mb-[clamp(2px,0.3vw,5px)]">Total Reviews</span>
                            <div className="flex items-center gap-[clamp(2px,0.3vw,6px)]">
                                <FiUser className="w-[clamp(12px,1vw,18px)] h-[clamp(12px,1vw,18px)] text-orange-400" />
                                <span className="text-[clamp(12px,1vw,18px)] font-bold text-white">{faculty.totalReviews || 0}</span>
                            </div>
                        </div>
                    </div>
                    {/* Comment Box */}
                    <div onClick={recentComment ? goToComment : undefined} className={`flex flex-row items-start gap-[clamp(14px,1.7vw,32px)] bg-black/30 rounded-xl p-[clamp(10px,1vw,18px)] min-h-[clamp(32px,4vw,56px)] w-full border border-gray-700/30 shadow-sm overflow-hidden min-w-0 cursor-pointer transition-all hover:ring-2 hover:ring-orange-400/40 ${recentComment ? 'hover:bg-black/40' : ''}`}>
                        {/* User icon and name */}
                        <div className="flex flex-col items-center min-w-[clamp(20px,1.5vw,32px)] max-w-[clamp(28px,2vw,40px)]">
                            <FiUser className="w-[clamp(12px,1vw,18px)] h-[clamp(12px,1vw,18px)] text-gray-500" />
                            <span className="text-[clamp(10px,0.8vw,13px)] text-gray-500 mt-[clamp(2px,0.3vw,6px)]">Anon</span>
                        </div>
                        {/* Comment and upvotes */}
                        <div className="flex-1 flex flex-col justify-between h-full min-w-0 overflow-hidden">
                            {recentComment ? (
                                <>
                                    <div className="text-[clamp(12px,1vw,16px)] text-white font-light leading-snug mb-[clamp(4px,0.5vw,10px)] break-words overflow-hidden min-w-0">
                                        {recentComment.comment.length > 220 ? recentComment.comment.substring(0, 220) + '...' : recentComment.comment}
                                    </div>
                                    <div className="flex items-center gap-[clamp(6px,0.7vw,14px)] justify-end mt-auto">
                                        <div className="flex items-center gap-1 text-[clamp(12px,1vw,16px)] text-orange-400">
                                            <FiThumbsUp className="w-[clamp(12px,1vw,18px)] h-[clamp(12px,1vw,18px)]" />
                                            <span>{recentComment.upvotes || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[clamp(12px,1vw,16px)] text-gray-400">
                                            <FiThumbsUp className="w-[clamp(12px,1vw,18px)] h-[clamp(12px,1vw,18px)] rotate-180" />
                                            <span>{recentComment.downvotes || 0}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-500 text-[clamp(12px,1vw,16px)] italic">No reviews yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyAvatar; 
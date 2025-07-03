import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiUser, FiStar, FiClock, FiBook, FiAward, FiExternalLink, FiEdit3, FiThumbsUp, FiThumbsDown, FiBarChart2, FiBookmark } from 'react-icons/fi';
import ReviewForm from '../components/ReviewForm';

// Mock reviewer data - in a real app this would come from a database
const getReviewerData = (reviewId) => {
    const reviewers = [
        { avatar: "👨‍🎓", tier: 1 },
        { avatar: "👩‍🎓", tier: 2 },
        { avatar: "👨‍🎓", tier: 3 },
        { avatar: "👩‍🎓", tier: 1 },
        { avatar: "👨‍🎓", tier: 2 },
        { avatar: "👩‍🎓", tier: 3 },
        { avatar: "👨‍🎓", tier: 1 },
        { avatar: "👩‍🎓", tier: 2 },
        { avatar: "👨‍🎓", tier: 3 },
        { avatar: "👩‍🎓", tier: 1 }
    ];
    return reviewers[parseInt(reviewId) % reviewers.length];
};

const getTierLabel = (tier) => {
    switch (tier) {
        case 1: return "Tier 1";
        case 2: return "Tier 2";
        case 3: return "Tier 3";
        default: return "Tier";
    }
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

const MCQ_QUESTIONS = [
    { key: 'teachingQuality', label: 'How would you rate the teaching quality?' },
    { key: 'communication', label: 'How clear was the communication?' },
    { key: 'knowledge', label: 'How would you rate their knowledge of the subject?' },
    { key: 'helpfulness', label: 'How helpful were they outside of class?' },
    { key: 'overallExperience', label: 'Overall, how would you rate your experience?' },
];

export const ReviewCard = ({ review, onDelete, showDeleteButton, onCardClick }) => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0, userVote: null });
    const [animatingButton, setAnimatingButton] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const reviewer = getReviewerData(review.id);

    const handleVote = (voteType) => {
        if (animatingButton) return;

        setAnimatingButton(voteType);

        setVotes(prev => {
            const newVotes = { ...prev };

            if (prev.userVote === voteType) {
                // Remove vote
                newVotes[voteType === 'up' ? 'upvotes' : 'downvotes']--;
                newVotes.userVote = null;
            } else {
                // Add/change vote
                if (prev.userVote) {
                    // Remove previous vote
                    newVotes[prev.userVote === 'up' ? 'upvotes' : 'downvotes']--;
                }
                newVotes[voteType === 'up' ? 'upvotes' : 'downvotes']++;
                newVotes.userVote = voteType;
            }

            return newVotes;
        });

        setTimeout(() => setAnimatingButton(null), 300);
    };

    return (
        <div
            className="rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
            onClick={onCardClick}
        >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
                        {reviewer.avatar}
                    </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium truncate">Anonymous Student</h4>
                        <span className="text-orange-500 text-xs font-medium">
                            {getTierLabel(reviewer.tier)}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 text-left">{review.course}</p>
                    <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-white text-sm ml-1">{review.rating}</span>
                    </div>
                </div>
            </div>

            {/* Review Text */}
            <div className="mb-4">
                <p className="text-gray-200 text-sm leading-relaxed text-left">{review.comment}</p>
            </div>

            {/* Detailed Ratings */}
            {review.ratings && showDetails && (
                <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 text-sm">Detailed Ratings</h4>
                    <div className="space-y-3">
                        {MCQ_QUESTIONS.map(q => (
                            <div key={q.key} className="flex items-start justify-between gap-4">
                                <span className="text-gray-400 text-sm w-2/3">{q.label}</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(review.ratings[q.key])}
                                    </div>
                                    <span className="text-white text-sm font-medium">{review.ratings[q.key]}/5</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                    {/* Upvote Button */}
                    <button
                        onClick={e => { e.stopPropagation(); handleVote('up'); }}
                        disabled={animatingButton}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${votes.userVote === 'up'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-green-400'
                            } ${animatingButton === 'up' ? 'scale-95' : 'hover:scale-105'}`}
                    >
                        <FiThumbsUp className={`w-4 h-4 transition-transform duration-200 ${votes.userVote === 'up' ? 'scale-110' : ''
                            }`} />
                        <span className="text-sm font-medium">{votes.upvotes}</span>
                    </button>

                    {/* Downvote Button */}
                    <button
                        onClick={e => { e.stopPropagation(); handleVote('down'); }}
                        disabled={animatingButton}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${votes.userVote === 'down'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-red-400'
                            } ${animatingButton === 'down' ? 'scale-95' : 'hover:scale-105'}`}
                    >
                        <FiThumbsDown className={`w-4 h-4 transition-transform duration-200 ${votes.userVote === 'down' ? 'scale-110' : ''
                            }`} />
                        <span className="text-sm font-medium">{votes.downvotes}</span>
                    </button>

                    {/* Details Button */}
                    {review.ratings && (
                        <button
                            onClick={e => { e.stopPropagation(); setShowDetails(!showDetails); }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${showDetails
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-orange-400'
                                } hover:scale-105`}
                        >
                            <FiBarChart2 className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {showDetails ? 'Hide' : 'Details'}
                            </span>
                        </button>
                    )}
                </div>
                {/* Delete Button for dashboard */}
                {showDeleteButton && (
                    <button
                        onClick={e => { e.stopPropagation(); if (onDelete) onDelete(); }}
                        className="px-3 py-1.5 bg-red-500/80 hover:bg-red-600 text-white text-xs rounded-lg font-medium transition-all ml-2"
                    >
                        Delete
                    </button>
                )}
                {/* Timestamp */}
                {review.timestamp && !showDeleteButton && (
                    <div className="text-xs text-gray-500">
                        {new Date(review.timestamp).toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};

const FacultyPage = ({ isLoggedIn, onRequireLogin }) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [faculty, setFaculty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewVotes, setReviewVotes] = useState({});
    const reviewsSectionRef = useRef(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const reviewRefs = useRef({});

    useEffect(() => {
        // For now, we'll load from our JSON files
        // Later this would be an API call
        const loadFacultyData = async () => {
            try {
                const facultyData = await import('../data/faculty.json');
                const reviewsData = await import('../data/reviews.json');

                const foundFaculty = facultyData.default.find(f => f.id === id);
                const facultyReviews = reviewsData.default.filter(r => r.facultyId === id);

                setFaculty(foundFaculty);
                setReviews(facultyReviews);
            } catch (error) {
                console.error('Error loading faculty data:', error);
            }
        };

        loadFacultyData();
    }, [id]);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedFaculty') || '[]');
        setIsBookmarked(bookmarks.some(f => f.id === faculty?.id));
    }, [faculty]);

    const handleBookmark = () => {
        if (!isLoggedIn) {
            if (onRequireLogin) {
                onRequireLogin();
            } else {
                alert('You must be logged in to bookmark faculty.');
            }
            return;
        }
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedFaculty') || '[]');
        if (isBookmarked) {
            const updated = bookmarks.filter(f => f.id !== faculty.id);
            localStorage.setItem('bookmarkedFaculty', JSON.stringify(updated));
            setIsBookmarked(false);
        } else {
            localStorage.setItem('bookmarkedFaculty', JSON.stringify([{ id: faculty.id, name: faculty.name, department: faculty.department, emoji: faculty.emoji }, ...bookmarks]));
            setIsBookmarked(true);
        }
    };

    // Handle scroll to reviews section or specific review
    useEffect(() => {
        const scrollTo = searchParams.get('scrollTo');
        if (scrollTo && faculty) {
            if (scrollTo === 'reviews' && reviewsSectionRef.current) {
                setTimeout(() => {
                    const element = reviewsSectionRef.current;
                    const elementRect = element.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.pageYOffset;
                    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

                    window.scrollTo({
                        top: middle,
                        behavior: 'smooth'
                    });

                    // Add highlight effect
                    element.classList.add('highlight-section');
                    setTimeout(() => {
                        element.classList.remove('highlight-section');
                    }, 2000);
                }, 500);
            } else if (scrollTo.startsWith('review-')) {
                const reviewId = scrollTo.replace('review-', '');
                setTimeout(() => {
                    const element = reviewRefs.current[reviewId];
                    if (element) {
                        const elementRect = element.getBoundingClientRect();
                        const absoluteElementTop = elementRect.top + window.pageYOffset;
                        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
                        window.scrollTo({
                            top: middle,
                            behavior: 'smooth'
                        });
                        element.classList.add('highlight-section');
                        setTimeout(() => {
                            element.classList.remove('highlight-section');
                        }, 2000);
                    }
                }, 500);
            }
        }
    }, [searchParams, faculty, reviews]);

    const handleSubmitReview = async (reviewData) => {
        // In a real app, this would be an API call
        // For now, we'll just add it to the local state
        const newReview = {
            ...reviewData,
            id: Date.now().toString(),
            facultyId: faculty.id,
            user: 'admin', // Mark as written by admin
        };

        setReviews(prev => [newReview, ...prev]);

        // Save to localStorage for dashboard
        const myReviews = JSON.parse(localStorage.getItem('myReviews') || '[]');
        localStorage.setItem('myReviews', JSON.stringify([newReview, ...myReviews]));

        // Update faculty rating (simple average)
        const allReviews = [...reviews, newReview];
        const newAverageRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

        setFaculty(prev => ({
            ...prev,
            rating: parseFloat(newAverageRating)
        }));
    };

    if (!faculty) {
        return (
            <div className="min-h-screen pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-64 bg-black/30 rounded-2xl backdrop-blur-xl"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-black/30 rounded w-1/4"></div>
                            <div className="h-4 bg-black/30 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-2 sm:px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9800] flex items-center justify-center text-5xl shadow-lg">
                                {faculty.emoji}
                            </div>
                            <button
                                onClick={handleBookmark}
                                className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white/10 ${isBookmarked ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-white/5 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400'}`}
                            >
                                <FiBookmark className="w-5 h-5" />
                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 w-full">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9800] 
                                            bg-clip-text text-transparent mb-2">
                                    {faculty.name}
                                </h1>
                                <p className="text-gray-300 text-lg mb-4">{faculty.department}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-white">Email:</span>
                                        <span>{faculty.name.toLowerCase().replace(/\s+/g, '.')}@uiu.ac.bd</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-white">PABX:</span>
                                        <span>{Math.floor(Math.random() * 9000) + 1000}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-white">Reviews:</span>
                                        <span>{reviews.length}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-white">Rating:</span>
                                        <div className="flex items-center gap-1">
                                            <FiStar className="w-4 h-4 text-orange-500" />
                                            <span>{faculty.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Online Presence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a
                            href={`https://linkedin.com/in/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">in</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">LinkedIn</div>
                                <div className="text-gray-400 text-sm">Professional Profile</div>
                            </div>
                        </a>

                        <a
                            href={`https://scholar.google.com/citations?user=${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">G</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">Google Scholar</div>
                                <div className="text-gray-400 text-sm">Research Papers</div>
                            </div>
                        </a>

                        <a
                            href={`https://uiu.ac.bd/faculty/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">UIU</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">UIU Page</div>
                                <div className="text-gray-400 text-sm">University Profile</div>
                            </div>
                        </a>

                        <a
                            href={`https://twitter.com/${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">𝕏</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">Twitter</div>
                                <div className="text-gray-400 text-sm">Social Media</div>
                            </div>
                        </a>

                        <a
                            href={`https://github.com/${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">GH</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">GitHub</div>
                                <div className="text-gray-400 text-sm">Code Projects</div>
                            </div>
                        </a>

                        <a
                            href={`https://researchgate.net/profile/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">RG</span>
                            </div>
                            <div>
                                <div className="text-white font-medium">ResearchGate</div>
                                <div className="text-gray-400 text-sm">Academic Network</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Reviews Section */}
                <div ref={reviewsSectionRef} className="rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Student Reviews</h2>
                        {isLoggedIn && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] rounded-lg text-white font-medium hover:from-[#FF5A00] hover:to-[#FF8A00] transition-all duration-200 flex items-center gap-2"
                            >
                                <FiEdit3 className="w-4 h-4" />
                                Write Review
                            </button>
                        )}
                    </div>
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                ref={el => { reviewRefs.current[review.id] = el; }}
                                id={`review-${review.id}`}
                            >
                                <ReviewCard review={review} />
                            </div>
                        ))}
                        {reviews.length === 0 && (
                            <div className="col-span-full text-center text-gray-400 py-8">
                                <div>No reviews yet.</div>
                                {!isLoggedIn && (
                                    <div className="text-sm mt-2">
                                        <span className="text-gray-500">Log in to be the first to review this faculty member!</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && faculty && (
                <ReviewForm
                    faculty={faculty}
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={handleSubmitReview}
                />
            )}
        </div>
    );
};

export default FacultyPage; 
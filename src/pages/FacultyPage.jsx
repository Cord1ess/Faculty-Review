import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiUser, FiStar, FiClock, FiBook, FiAward, FiExternalLink, FiEdit3, FiThumbsUp, FiThumbsDown, FiBarChart2, FiBookmark, FiFlag } from 'react-icons/fi';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import ReviewForm from '../components/ReviewForm';
import { getFacultyProfilePic } from '../utils/profilePic';
import StarRating from '../components/StarRating';
import { REVIEW_QUESTIONS } from '../data/reviewQuestions';

export const ReviewCard = ({ review, onDelete, showDeleteButton, onCardClick, compact = false, faculty }) => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0, userVote: null });
    const [animatingButton, setAnimatingButton] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Batch format: Spring/Summer/Fall Year Batch
    const batch = review.batch || 'Spring 2023 Batch';
    const course = review.course || 'Course: Placeholder 101';

    const handleVote = (voteType) => {
        if (animatingButton) return;
        setAnimatingButton(voteType);
        setVotes(prev => {
            const newVotes = { ...prev };
            if (prev.userVote === voteType) {
                newVotes[voteType === 'up' ? 'upvotes' : 'downvotes']--;
                newVotes.userVote = null;
            } else {
                if (prev.userVote) {
                    newVotes[prev.userVote === 'up' ? 'upvotes' : 'downvotes']--;
                }
                newVotes[voteType === 'up' ? 'upvotes' : 'downvotes']++;
                newVotes.userVote = voteType;
            }
            return newVotes;
        });
        setTimeout(() => setAnimatingButton(null), 300);
    };

    if (compact) {
        // Compact (dashboard) mode: horizontally stacked, minimal info
        return (
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-4 shadow hover:bg-white/10 transition-all items-stretch">
                {/* Faculty Info Left */}
                {faculty && (
                    <div className="flex flex-col items-center justify-center w-32 pr-4 border-r border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9800] flex items-center justify-center text-3xl shadow mb-2">
                            {faculty.emoji}
                        </div>
                        <div className="text-base font-bold text-white text-center truncate max-w-[96px]">{faculty.name}</div>
                        <div className="text-xs text-orange-500 text-center mt-1">{faculty.department}</div>
                    </div>
                )}
                {/* Review Content Right */}
                <div className="flex-1 flex flex-col justify-between pl-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <StarRating rating={review.rating} size={16} />
                            <span className="text-sm text-white ml-1">{review.rating}</span>
                        </div>
                        <div className="text-gray-300 text-sm mb-1">{review.comment}</div>
                        <div className="text-gray-500 text-xs mt-1">Course: <span className="text-white">{review.course}</span></div>
                    </div>
                    <div className="flex justify-end mt-2">
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="px-3 py-1 bg-red-500/80 hover:bg-red-600 text-white text-xs rounded-lg font-medium transition-all"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer flex flex-col gap-3 relative"
            onClick={onCardClick}
        >
            {/* Top Row: Left (avatar/name/batch), Right (course/rating) */}
            <div className="flex flex-row items-start justify-between gap-4 min-w-0 mb-1">
                {/* Left: Avatar, Name, Tier, Batch */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
                        <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-white text-lg font-medium truncate leading-tight">Anonymous Student</span>
                        </div>
                        <span className="text-xs text-gray-400 italic mt-0.5 text-left">{batch}</span>
                    </div>
                </div>
                {/* Right: Course (top), Rating (below) */}
                <div className="flex flex-col items-end min-w-[120px]">
                    <span className="text-white text-lg font-medium mb-1">{course}</span>
                    <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size={20} className="mr-2" />
                        <span className="h-5 border-l border-white/20 mx-2"></span>
                        <span className="text-white text-lg font-medium flex items-center">{review.rating}</span>
                    </div>
                </div>
            </div>
            {/* Review Text */}
            <div className="mb-1">
                <p className="text-gray-200 text-sm leading-relaxed text-left">{review.comment}</p>
            </div>
            {/* Upvote/Downvote Row */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    {/* Upvote Button */}
                    <button
                        onClick={e => { e.stopPropagation(); handleVote('up'); }}
                        disabled={animatingButton}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 text-sm font-medium border ${votes.userVote === 'up'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-green-400 hover:border-green-400'
                            } ${animatingButton === 'up' ? 'scale-95' : 'hover:scale-105'}`}
                    >
                        <FiThumbsUp className="w-4 h-4" />
                        {votes.upvotes}
                    </button>
                    {/* Downvote Button */}
                    <button
                        onClick={e => { e.stopPropagation(); handleVote('down'); }}
                        disabled={animatingButton}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 text-sm font-medium border ${votes.userVote === 'down'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-red-400 hover:border-red-400'
                            } ${animatingButton === 'down' ? 'scale-95' : 'hover:scale-105'}`}
                    >
                        <FiThumbsDown className="w-4 h-4" />
                        {votes.downvotes}
                    </button>
                </div>
                {/* Flag Button bottom right, same size as upvote/downvote */}
                <button
                    onClick={e => { e.stopPropagation(); /* TODO: flag logic */ }}
                    className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors ml-2"
                    title="Flag as inappropriate"
                >
                    <FiFlag className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

// Modern FacultyRating component
function FacultyRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<MdStar key={i} className="text-yellow-400 w-5 h-5" />);
        } else if (rating >= i - 0.5) {
            stars.push(<MdStarHalf key={i} className="text-yellow-400 w-5 h-5" />);
        } else {
            stars.push(<MdStarBorder key={i} className="text-gray-600 w-5 h-5" />);
        }
    }
    return (
        <div className="flex items-center gap-1">
            {stars}
            <span className="ml-2 text-lg font-bold text-gray-100">{rating.toFixed(1)}</span>
        </div>
    );
}

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
    const [sortType, setSortType] = useState('newest'); // 'newest', 'upvoted', 'downvoted'
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const sortDropdownRef = useRef(null);
    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'upvoted', label: 'Top Upvoted' },
        { value: 'downvoted', label: 'Top Downvoted' },
    ];

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
        if (searchParams.get('highlight')) {
            const highlightId = searchParams.get('highlight');
            // Wait for reviews to render
            const tryScroll = (attempts = 0) => {
                const element = document.getElementById(`comment-${highlightId}`);
                if (element) {
                    // Remove highlight from any other element
                    document.querySelectorAll('.highlight-section').forEach(el => {
                        if (el !== element) {
                            el.classList.remove('highlight-section');
                            el.classList.remove('fade-out');
                        }
                    });
                    // Always scroll into view right before highlight
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlight-section');
                    setTimeout(() => {
                        element.classList.add('fade-out');
                        setTimeout(() => {
                            element.classList.remove('highlight-section');
                            element.classList.remove('fade-out');
                        }, 1200); // match the CSS transition duration
                    }, 1200); // highlight duration before fade
                } else if (attempts < 10) {
                    setTimeout(() => tryScroll(attempts + 1), 150);
                }
            };
            tryScroll();
        }
    }, [searchParams, faculty, reviews]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setSortDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // Sort reviews based on sortType
    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortType === 'newest') {
            return (b.timestamp || 0) - (a.timestamp || 0);
        } else if (sortType === 'upvoted') {
            return (b.upvotes || 0) - (a.upvotes || 0);
        } else if (sortType === 'downvoted') {
            return (b.downvotes || 0) - (a.downvotes || 0);
        }
        return 0;
    });

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
                <div className="relative rounded-2xl bg-neutral-900 border border-gray-800 p-8 flex flex-col md:flex-row gap-8 items-start">
                    {/* Bookmark Button (top right) */}
                    <button
                        onClick={handleBookmark}
                        className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full font-medium transition-all duration-200 border border-gray-800 text-xs z-10 ${isBookmarked ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-neutral-800 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400'}`}
                    >
                        <FiBookmark className="w-4 h-4" />
                        <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>
                    {/* Left: Avatar, Name, Designation */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2 w-56 min-w-[220px]">
                        <div className="w-32 h-32 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                            <img
                                src={getFacultyProfilePic(faculty)}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-white text-center break-words whitespace-normal max-w-xs leading-tight">
                            {faculty.name}
                        </h1>
                        <div className="text-gray-400 text-sm italic font-light text-center">{faculty.designation}</div>
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block h-36 w-px bg-white/10 mx-6 self-center" />
                    {/* Right: Info and Stats */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Overall Rating</span>
                                <StarRating rating={faculty.rating || 0} size={24} />
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Reviews</span>
                                <span className="text-2xl font-bold text-white">{reviews.length}</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Email</span>
                                <span className="text-white text-sm">{faculty.name.toLowerCase().replace(/\s+/g, '.')}@uiu.ac.bd</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">PABX</span>
                                <span className="text-white text-sm">{Math.floor(Math.random() * 9000) + 1000}</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Room</span>
                                <span className="text-white text-sm">{100 + (parseInt(faculty.id) % 100)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="rounded-2xl bg-neutral-900 border border-gray-800 p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Online Presence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {/* UIU Page (always first) */}
                        <a
                            href={`https://uiu.ac.bd/faculty/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">UIU</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">UIU Website</div>
                                <div className="text-gray-400 text-xs leading-tight">University Profile</div>
                            </div>
                        </a>
                        {/* LinkedIn (second) */}
                        <a
                            href={`https://linkedin.com/in/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">in</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">LinkedIn</div>
                                <div className="text-gray-400 text-xs leading-tight">Professional Profile</div>
                            </div>
                        </a>
                        {/* Google Scholar */}
                        <a
                            href={`https://scholar.google.com/citations?user=${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">G</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">Google Scholar</div>
                                <div className="text-gray-400 text-xs leading-tight">Research Papers</div>
                            </div>
                        </a>
                        {/* Twitter */}
                        <a
                            href={`https://twitter.com/${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">𝕏</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">Twitter</div>
                                <div className="text-gray-400 text-xs leading-tight">Social Media</div>
                            </div>
                        </a>
                        {/* GitHub */}
                        <a
                            href={`https://github.com/${faculty.name.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">GH</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">GitHub</div>
                                <div className="text-gray-400 text-xs leading-tight">Code Projects</div>
                            </div>
                        </a>
                        {/* ResearchGate */}
                        <a
                            href={`https://researchgate.net/profile/${faculty.name.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">RG</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-white font-medium leading-tight">ResearchGate</div>
                                <div className="text-gray-400 text-xs leading-tight">Academic Network</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Reviews Section */}
                <div ref={reviewsSectionRef} className="rounded-2xl bg-neutral-900 border border-gray-800 p-8 transition-all duration-500">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-bold text-white">Student Reviews</h2>
                        <div className="flex gap-2 items-center mt-2 sm:mt-0">
                            {/* Custom Review Sorting Dropdown */}
                            <div className="relative" ref={sortDropdownRef}>
                                <button
                                    type="button"
                                    className={`flex items-center justify-between min-w-[170px] h-11 px-6 py-2 rounded-full text-base font-semibold border transition-all duration-200 shadow-sm focus:outline-none ${sortDropdownOpen ? 'border-white ring-2 ring-white' : 'border-gray-700'} bg-neutral-900 text-gray-200 hover:border-orange-400`}
                                    onClick={() => setSortDropdownOpen((open) => !open)}
                                    aria-haspopup="listbox"
                                    aria-expanded={sortDropdownOpen}
                                >
                                    {sortOptions.find(opt => opt.value === sortType)?.label}
                                    <span className="ml-3 text-gray-400">
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
                                    </span>
                                </button>
                                {sortDropdownOpen && (
                                    <ul
                                        tabIndex={-1}
                                        className="absolute left-0 z-20 mt-2 w-full flex flex-col gap-1 rounded-xl bg-neutral-900 border border-gray-700 shadow-lg py-1"
                                        role="listbox"
                                    >
                                        {sortOptions.map(option => (
                                            <li
                                                key={option.value}
                                                role="option"
                                                aria-selected={sortType === option.value}
                                                className={`px-4 py-1 cursor-pointer text-sm rounded-full transition-all select-none
                                                    ${sortType === option.value ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white' : 'text-gray-200 hover:bg-orange-500/20 hover:text-orange-400'}`}
                                                onClick={() => {
                                                    setSortType(option.value);
                                                    setSortDropdownOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Write Review Button (only if logged in) */}
                            {isLoggedIn && (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="px-6 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] rounded-full text-white font-bold text-base hover:from-[#FF5A00] hover:to-[#FF8A00] transition-all duration-200 flex items-center gap-2 ml-2 h-11"
                                >
                                    <FiEdit3 className="w-4 h-4" />
                                    Write Review
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="space-y-6">
                        {sortedReviews.map((review) => (
                            <div
                                key={review.id}
                                ref={el => { reviewRefs.current[review.id] = el; }}
                                id={`comment-${review.id}`}
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
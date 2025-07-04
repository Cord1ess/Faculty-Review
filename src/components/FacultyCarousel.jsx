import React, { useState, useEffect, useRef } from 'react';
import FacultyAvatar from './FacultyAvatar';
import { useNavigate } from 'react-router-dom';
import { getFacultyProfilePic } from '../utils/profilePic';

/**
 * FacultyCarousel
 * Props:
 *   facultyList: array of faculty objects (optional, defaults to all from data)
 */
const FacultyCarousel = ({ facultyList }) => {
    const [facultyData, setFacultyData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [direction, setDirection] = useState('up'); // 'up' or 'down'
    const intervalRef = useRef(null);
    const animationQueue = useRef([]);
    const animatingRef = useRef(false);
    const navigate = useNavigate();

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            const facultyModule = await import('../data/faculty.json');
            const reviewsModule = await import('../data/reviews.json');
            setFacultyData(facultyList || facultyModule.default);
            setReviewsData(reviewsModule.default);
        };
        loadData();
    }, [facultyList]);

    // Start auto-loop
    useEffect(() => {
        if (!facultyData.length) return;
        intervalRef.current = setInterval(() => {
            triggerNext();
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [facultyData, current]);

    // Animate to next card or jump to a specific card (multi-step)
    const triggerNext = (targetIndex = null) => {
        if (isAnimating || facultyData.length < 2) return;
        let nextIndex = targetIndex !== null ? targetIndex : (current + 1) % facultyData.length;
        if (nextIndex === current) return;
        // Multi-step animation if skipping more than one card
        let steps = [];
        let idx = current;
        if (targetIndex !== null) {
            const total = facultyData.length;
            const diff = (nextIndex - idx + total) % total;
            if (diff === 0) return;
            const dir = diff <= total / 2 ? 'up' : 'down';
            let count = dir === 'up' ? diff : total - diff;
            for (let i = 0; i < count; i++) {
                idx = dir === 'up' ? (idx + 1) % total : (idx - 1 + total) % total;
                steps.push({ idx, dir });
            }
        } else {
            steps.push({ idx: nextIndex, dir: 'up' });
        }
        animationQueue.current = steps;
        if (!animatingRef.current) animateQueue();
    };

    // Animate through the queue
    const animateQueue = () => {
        if (!animationQueue.current.length) return;
        animatingRef.current = true;
        const { idx, dir } = animationQueue.current.shift();
        setDirection(dir);
        setNext(idx);
        setIsAnimating(true);
        setShowNext(false);
        setTimeout(() => setShowNext(true), 20);
        setTimeout(() => {
            setCurrent(idx);
            setNext(null);
            setIsAnimating(false);
            setShowNext(false);
            if (animationQueue.current.length) {
                animateQueue(); // no delay between steps
            } else {
                animatingRef.current = false;
            }
        }, 700);
    };

    // Get most recent review for a faculty
    const getRecentComment = (facultyId) => {
        const facultyReviews = reviewsData.filter(r => r.facultyId === facultyId);
        if (!facultyReviews.length) return null;
        const recent = facultyReviews[facultyReviews.length - 1];
        return { comment: recent.comment, rating: recent.rating, course: recent.course };
    };

    // Handler for profile click
    const goToFacultyPage = (faculty) => {
        navigate(`/faculty/${faculty.id}`);
    };

    // Handler for comment click: go to faculty page, scroll to comment, highlight
    const goToComment = (faculty, review) => {
        if (review && review.id) {
            navigate(`/faculty/${faculty.id}?highlight=${review.id}#comment-${review.id}`);
        } else {
            navigate(`/faculty/${faculty.id}`);
        }
    };

    if (!facultyData.length) {
        return (
            <div className="relative w-full max-w-7xl mx-auto">
                <div className="relative w-full max-w-[750px] mx-auto px-4 py-[140px] -my-[140px]">
                    <div className="relative h-[400px] flex items-center justify-center">
                        <div className="animate-pulse bg-[#1E1E1E] rounded-xl w-full h-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Animation classes
    const base = 'absolute inset-0 w-full h-full transition-all duration-700 ease-in-out';
    // Directional animation with scale and opacity
    const currentClass = isAnimating && showNext
        ? direction === 'up'
            ? 'translate-y-[-100%] opacity-0 scale-90 z-10'
            : 'translate-y-[100%] opacity-0 scale-90 z-10'
        : 'translate-y-0 opacity-100 scale-100 z-20';
    const nextClass = isAnimating && showNext
        ? direction === 'up'
            ? 'translate-y-0 opacity-100 scale-100 z-20'
            : 'translate-y-0 opacity-100 scale-100 z-20'
        : direction === 'up'
            ? 'translate-y-full opacity-0 scale-90 z-10'
            : '-translate-y-full opacity-0 scale-90 z-10';

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            {/* Title above the carousel row, no extra margin or padding on top */}
            <div className="w-full text-center">
                <h2 className="inline-block text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent select-none">
                    Discover Top-Rated Faculty
                </h2>
            </div>
            <div className="relative w-full flex justify-center items-center overflow-x-auto overflow-hidden" style={{ minHeight: 120 }}>
                {/* Responsive card: scales with screen size, min/max width/height for mobile/desktop */}
                <div className="relative flex justify-center items-center py-4 w-full" style={{
                    width: '100%',
                    maxWidth: 'clamp(320px, 90vw, 700px)',
                    minWidth: 'clamp(240px, 60vw, 320px)',
                    height: 'clamp(180px, 40vw, 350px)'
                }}>
                    {/* Top gradient fade */}
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-4 z-30" style={{ background: 'linear-gradient(to bottom, #121212 80%, transparent)' }} />
                    {/* Bottom gradient fade */}
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 z-30" style={{ background: 'linear-gradient(to top, #121212 80%, transparent)' }} />
                    {/* Carousel cards */}
                    <div className="relative w-full h-full overflow-visible">
                        {/* Current card */}
                        <div className={`${base} ${currentClass}`} key={facultyData[current]?.id}>
                            {/* Consistent Faculty Card Layout */}
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row gap-8 items-start w-full h-full shadow-lg">
                                {/* Left: Profile Pic, Name, Designation */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-2 w-48 min-w-[180px]">
                                    <button onClick={() => goToFacultyPage(facultyData[current])} className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">
                                        <img
                                            src={getFacultyProfilePic(facultyData[current])}
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </button>
                                    <button onClick={() => goToFacultyPage(facultyData[current])} className="mt-3 text-lg font-bold text-white text-center break-words whitespace-normal max-w-xs leading-tight hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">
                                        {facultyData[current].name}
                                    </button>
                                    <div className="text-gray-400 text-xs italic font-light text-center">{facultyData[current].designation}</div>
                                </div>
                                {/* Vertical Divider */}
                                <div className="hidden md:block h-28 w-px bg-white/10 mx-6 self-center" />
                                {/* Right: Stats and Top Comment */}
                                <div className="flex-1 flex flex-col justify-center gap-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col items-center sm:items-start">
                                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Overall Rating</span>
                                            <span className="flex items-center gap-2 text-lg font-bold text-white">
                                                <span>{facultyData[current].rating?.toFixed(1) ?? 'N/A'}</span>
                                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-start">
                                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Reviews</span>
                                            <span className="text-lg font-bold text-white">{reviewsData.filter(r => r.facultyId === facultyData[current].id).length}</span>
                                        </div>
                                    </div>
                                    {/* Top Comment */}
                                    <div className="mt-2 bg-neutral-900/80 border border-white/10 rounded-xl p-4 min-h-[56px] flex flex-col justify-center cursor-pointer hover:bg-neutral-900/90 transition-all"
                                        onClick={() => {
                                            const review = reviewsData.filter(r => r.facultyId === facultyData[current].id).slice(-1)[0];
                                            goToComment(facultyData[current], review);
                                        }}
                                    >
                                        {getRecentComment(facultyData[current].id) ? (
                                            <>
                                                <div className="text-gray-200 text-sm leading-relaxed mb-2">"{getRecentComment(facultyData[current].id).comment}"</div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <span>Course: {getRecentComment(facultyData[current].id).course}</span>
                                                    <span className="h-3 w-px bg-white/10 mx-2"></span>
                                                    <span>Rating: {getRecentComment(facultyData[current].id).rating}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500 italic text-sm">No reviews yet</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Next card (only during animation) */}
                        {next !== null && (
                            <div className={`${base} ${nextClass}`} key={facultyData[next]?.id}>
                                {/* Consistent Faculty Card Layout for next card */}
                                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row gap-8 items-start w-full h-full shadow-lg">
                                    {/* Left: Profile Pic, Name, Designation */}
                                    <div className="flex-shrink-0 flex flex-col items-center gap-2 w-48 min-w-[180px]">
                                        <button onClick={() => goToFacultyPage(facultyData[next])} className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">
                                            <img
                                                src={getFacultyProfilePic(facultyData[next])}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </button>
                                        <button onClick={() => goToFacultyPage(facultyData[next])} className="mt-3 text-lg font-bold text-white text-center break-words whitespace-normal max-w-xs leading-tight hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">
                                            {facultyData[next].name}
                                        </button>
                                        <div className="text-gray-400 text-xs italic font-light text-center">{facultyData[next].designation}</div>
                                    </div>
                                    {/* Vertical Divider */}
                                    <div className="hidden md:block h-28 w-px bg-white/10 mx-6 self-center" />
                                    {/* Right: Stats and Top Comment */}
                                    <div className="flex-1 flex flex-col justify-center gap-4">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex flex-col items-center sm:items-start">
                                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Overall Rating</span>
                                                <span className="flex items-center gap-2 text-lg font-bold text-white">
                                                    <span>{facultyData[next].rating?.toFixed(1) ?? 'N/A'}</span>
                                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center sm:items-start">
                                                <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Reviews</span>
                                                <span className="text-lg font-bold text-white">{reviewsData.filter(r => r.facultyId === facultyData[next].id).length}</span>
                                            </div>
                                        </div>
                                        {/* Top Comment */}
                                        <div className="mt-2 bg-neutral-900/80 border border-white/10 rounded-xl p-4 min-h-[56px] flex flex-col justify-center cursor-pointer hover:bg-neutral-900/90 transition-all"
                                            onClick={() => {
                                                const review = reviewsData.filter(r => r.facultyId === facultyData[next].id).slice(-1)[0];
                                                goToComment(facultyData[next], review);
                                            }}
                                        >
                                            {getRecentComment(facultyData[next].id) ? (
                                                <>
                                                    <div className="text-gray-200 text-sm leading-relaxed mb-2">"{getRecentComment(facultyData[next].id).comment}"</div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <span>Course: {getRecentComment(facultyData[next].id).course}</span>
                                                        <span className="h-3 w-px bg-white/10 mx-2"></span>
                                                        <span>Rating: {getRecentComment(facultyData[next].id).rating}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-gray-500 italic text-sm">No reviews yet</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Tiny navigation dots (hidden on mobile) */}
                <div className="hidden sm:flex flex-col justify-center items-center ml-4 select-none gap-2">
                    {facultyData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => triggerNext(idx)}
                            aria-label={`Go to card ${idx + 1}`}
                            disabled={isAnimating || idx === current}
                            className="appearance-none bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
                            style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <span
                                className={`block rounded-full transition-all duration-400 ease-in-out w-1.5 h-1.5
                                    ${idx === current ? 'bg-white opacity-50 scale-110' : 'bg-white opacity-10'}
                                `}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyCarousel;
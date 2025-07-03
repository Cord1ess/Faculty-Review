import React, { useState, useEffect, useRef } from 'react';
import FacultyAvatar from './FacultyAvatar';

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
                {/* Compact landscape card, 700x350px, horizontally scrollable on mobile */}
                <div className="relative flex justify-center items-center py-4" style={{ width: 700, height: 350, minWidth: 240 }}>
                    {/* Top gradient fade */}
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-4 z-30" style={{ background: 'linear-gradient(to bottom, #121212 80%, transparent)' }} />
                    {/* Bottom gradient fade */}
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 z-30" style={{ background: 'linear-gradient(to top, #121212 80%, transparent)' }} />
                    {/* Carousel cards */}
                    <div className="relative w-full h-full overflow-visible">
                        {/* Current card */}
                        <div className={`${base} ${currentClass}`} key={facultyData[current]?.id}>
                            <FacultyAvatar faculty={facultyData[current]} recentComment={getRecentComment(facultyData[current]?.id)} />
                        </div>
                        {/* Next card (only during animation) */}
                        {next !== null && (
                            <div className={`${base} ${nextClass}`} key={facultyData[next]?.id}>
                                <FacultyAvatar faculty={facultyData[next]} recentComment={getRecentComment(facultyData[next]?.id)} />
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
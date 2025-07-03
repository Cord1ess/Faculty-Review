import React, { useState, useEffect, useRef } from 'react';
import FacultyAvatar from './FacultyAvatar';

const FacultyCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [facultyData, setFacultyData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef(null);
    const visibilityRef = useRef(true);

    // Load faculty and reviews data
    useEffect(() => {
        const loadData = async () => {
            try {
                const facultyModule = await import('../data/faculty.json');
                const reviewsModule = await import('../data/reviews.json');

                setFacultyData(facultyModule.default);
                setReviewsData(reviewsModule.default);
                setLoading(false);
            } catch (error) {
                console.error('Error loading faculty data:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            visibilityRef.current = !document.hidden;
            if (document.hidden) {
                clearInterval(intervalRef.current);
            } else {
                startCarousel();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(intervalRef.current);
        };
    }, []);

    const startCarousel = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (visibilityRef.current && !document.hidden && facultyData.length > 0) {
                handleNext();
            }
        }, 8000);
    };

    // Initialize carousel
    useEffect(() => {
        if (facultyData.length > 0) {
            startCarousel();
        }
        return () => clearInterval(intervalRef.current);
    }, [facultyData]);

    const handleNext = () => {
        if (isAnimating || facultyData.length === 0) return;

        setIsAnimating(true);
        setActiveIndex(prev => (prev + 1) % facultyData.length);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    const getRecentComment = (facultyId) => {
        const facultyReviews = reviewsData.filter(review => review.facultyId === facultyId);
        if (facultyReviews.length === 0) return null;

        // Get the most recent review (assuming reviews are ordered by timestamp or ID)
        const recentReview = facultyReviews[facultyReviews.length - 1];
        return {
            comment: recentReview.comment,
            rating: recentReview.rating,
            course: recentReview.course
        };
    };

    if (loading) {
        return (
            <div className="relative w-full max-w-7xl mx-auto mt-4">
                <div className="relative w-full max-w-[750px] mx-auto px-4 py-[140px] -my-[140px]">
                    <div className="relative h-[280px] flex items-center justify-center">
                        <div className="animate-pulse bg-[#1E1E1E] rounded-xl w-full h-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto mt-4">
            {/* Added extra padding for animation space */}
            <div className="relative w-full max-w-[750px] mx-auto px-4 py-[140px] -my-[140px]">
                <div className="relative h-[280px]">
                    {facultyData.map((faculty, index) => {
                        const prevIndex = (activeIndex - 1 + facultyData.length) % facultyData.length;
                        const recentComment = getRecentComment(faculty.id);

                        let visualState = 'inactive';
                        if (index === activeIndex) visualState = 'active';
                        else if (index === prevIndex) visualState = 'previous';

                        const getStyles = (state) => {
                            switch (state) {
                                case 'active':
                                    return 'opacity-100 transform scale-100 translate-y-0 rotate-0';
                                case 'previous':
                                    return 'opacity-0 transform scale-95 -translate-y-full -rotate-6';
                                default:
                                    return 'opacity-0 transform scale-95 translate-y-full rotate-6';
                            }
                        };

                        return (
                            <div
                                key={faculty.id}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out will-change-transform
                                    ${getStyles(visualState)}`}
                                style={{
                                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            >
                                <FacultyAvatar faculty={faculty} recentComment={recentComment} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FacultyCarousel;
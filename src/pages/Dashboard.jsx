import React, { useState, useEffect } from 'react';
import { FiUser, FiStar, FiBookmark, FiSettings, FiEdit, FiUsers, FiBookOpen } from 'react-icons/fi';
import { ReviewCard } from './FacultyPage';
import facultyData from '../data/faculty.json';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const TABS = [
    { key: 'profile', label: 'Profile', icon: <FiUser /> },
    { key: 'reviews', label: 'My Reviews', icon: <FiStar /> },
    { key: 'bookmarks', label: 'Bookmarks', icon: <FiBookmark /> },
    { key: 'settings', label: 'Settings', icon: <FiSettings /> },
];

const ADMIN_TABS = [
    { key: 'admin', label: 'Admin', icon: <FiUsers /> },
];

const Dashboard = () => {
    // For now, only admin is logged in
    const isAdmin = true;
    const [activeTab, setActiveTab] = useState('profile');
    const [myReviews, setMyReviews] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [facultyList] = useState(facultyData);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'reviews') {
            const reviews = JSON.parse(localStorage.getItem('myReviews') || '[]');
            setMyReviews(reviews.filter(r => r.user === 'admin'));
        }
        if (activeTab === 'bookmarks') {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarkedFaculty') || '[]');
            setBookmarks(bookmarks);
        }
    }, [activeTab]);

    const handleRemoveReview = (reviewId) => {
        const updatedReviews = myReviews.filter(r => r.id !== reviewId);
        setMyReviews(updatedReviews);
        localStorage.setItem('myReviews', JSON.stringify(updatedReviews));
    };

    const handleReviewCardClick = (review) => {
        navigate(`/faculty/${review.facultyId}?scrollTo=review-${review.id}`);
    };

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-2">
            <div className="w-full max-w-3xl">
                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    {[...TABS, ...(isAdmin ? ADMIN_TABS : [])].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all
                ${activeTab === tab.key
                                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white shadow'
                                    : 'bg-white/10 text-gray-200 hover:bg-orange-500/10'}
              `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Profile Overview (always on top) */}
                <div className="rounded-2xl bg-black/40 border border-white/10 shadow-xl backdrop-blur-xl p-8 mb-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9800] flex items-center justify-center text-3xl font-bold shadow-lg border-2 border-white/10">
                        <FiUser className="text-white" />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white mb-1">Admin User</div>
                        <div className="text-gray-300 text-sm">admin</div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="grid gap-8">
                    {activeTab === 'profile' && (
                        <div className="rounded-2xl bg-black/40 border border-white/10 shadow-lg backdrop-blur-xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Profile Overview</h2>
                            <p className="text-gray-300 mb-2">Welcome to your dashboard! Here you can manage your reviews, bookmarks, and account settings.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                                <div className="flex-1 bg-white/10 rounded-lg p-4 text-gray-200">Reviews written: <span className="font-bold">{myReviews.length}</span></div>
                                <div className="flex-1 bg-white/10 rounded-lg p-4 text-gray-200">Bookmarked faculty: <span className="font-bold">{bookmarks.length}</span></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="rounded-2xl bg-black/40 border border-white/10 shadow-lg backdrop-blur-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">My Reviews</h2>
                            {myReviews.length === 0 ? (
                                <>
                                    <p className="text-gray-300 mb-4">You haven't written any reviews yet.</p>
                                    <div className="bg-white/10 rounded-lg p-4 text-gray-400 text-center">Your reviews will appear here once you submit them.</div>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    {myReviews.map(review => (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                            faculty={facultyList.find(f => f.id === review.facultyId)}
                                            onDelete={() => handleRemoveReview(review.id)}
                                            compact
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'bookmarks' && (
                        <div className="rounded-2xl bg-black/40 border border-white/10 shadow-lg backdrop-blur-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Bookmarked Faculty</h2>
                            {bookmarks.length === 0 ? (
                                <>
                                    <p className="text-gray-300 mb-4">You haven't bookmarked any faculty yet.</p>
                                    <div className="bg-white/10 rounded-lg p-4 text-gray-400 text-center">Bookmarked faculty will appear here.</div>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    {bookmarks.map(faculty => (
                                        <div key={faculty.id} className="rounded-xl bg-white/5 border border-white/10 p-6 flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9800] flex items-center justify-center text-3xl shadow-lg">
                                                {faculty.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xl font-bold text-white truncate">{faculty.name}</div>
                                                <div className="text-gray-400 text-sm">{faculty.department}</div>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/faculty/${faculty.id}`)}
                                                className="ml-auto px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] rounded-lg text-white font-medium hover:from-[#FF5A00] hover:to-[#FF8A00] transition-all duration-200"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="rounded-2xl bg-black/40 border border-white/10 shadow-lg backdrop-blur-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
                            <p className="text-gray-300 mb-4">Account settings and preferences will be available here.</p>
                            <div className="bg-white/10 rounded-lg p-4 text-gray-400 text-center">Settings options coming soon.</div>
                        </div>
                    )}

                    {activeTab === 'admin' && isAdmin && (
                        <div className="rounded-2xl bg-black/40 border border-white/10 shadow-lg backdrop-blur-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="bg-white/10 rounded-lg p-4 text-gray-200 flex items-center gap-3"><FiBookOpen className="text-orange-500" /> Manage Faculty (placeholder)</div>
                                <div className="bg-white/10 rounded-lg p-4 text-gray-200 flex items-center gap-3"><FiStar className="text-orange-500" /> Moderate Reviews (placeholder)</div>
                                <div className="bg-white/10 rounded-lg p-4 text-gray-200 flex items-center gap-3"><FiUsers className="text-orange-500" /> Manage Users (placeholder)</div>
                                <div className="bg-white/10 rounded-lg p-4 text-gray-200 flex items-center gap-3"><FiSettings className="text-orange-500" /> Site Settings (placeholder)</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 
import React from 'react';
import FacultyCarousel from '../components/FacultyCarousel';

const StatCard = ({ number, label }) => (
    <div className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                  hover:border-orange-500/30 transition-all duration-300">
        <div className="text-4xl font-poppins font-bold bg-gradient-to-r from-[#FF6B00] to-[#FF9800] 
                    bg-clip-text text-transparent mb-2">
            {number}
        </div>
        <div className="text-gray-400 font-inter">{label}</div>
    </div>
);

const PlaceholderCard = ({ delay = 0 }) => (
    <div className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                  hover:border-orange-500/30 transition-all duration-300 
                  animate-fade-up font-inter"
        style={{ animationDelay: `${delay}ms` }}>
        <div className="h-40 bg-black/30 rounded-lg mb-4 animate-pulse"></div>
        <div className="space-y-2">
            <div className="h-4 bg-black/30 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-black/30 rounded w-1/2 animate-pulse"></div>
        </div>
    </div>
);

const SectionTitle = ({ title }) => (
    <h2 className="text-3xl font-poppins font-bold text-white mb-8 
                 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] bg-clip-text text-transparent">
        {title}
    </h2>
);

const Home = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 space-y-24 pt-24">
            {/* Featured Faculty Carousel */}
            <section>
                <FacultyCarousel />
            </section>

            {/* Quick Stats */}
            <section>
                <SectionTitle title="Quick Stats" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard number="500+" label="Active Students" />
                    <StatCard number="50+" label="Faculty Members" />
                    <StatCard number="1000+" label="Reviews" />
                    <StatCard number="25+" label="Departments" />
                </div>
            </section>

            {/* Top Rated Courses */}
            <section>
                <SectionTitle title="Top Rated Courses" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                        <PlaceholderCard key={`course-${i}`} delay={i * 100} />
                    ))}
                </div>
            </section>

            {/* Department Highlights */}
            <section>
                <SectionTitle title="Department Highlights" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[0, 1, 2, 3].map((i) => (
                        <PlaceholderCard key={`dept-${i}`} delay={i * 100} />
                    ))}
                </div>
            </section>

            {/* Recent Reviews */}
            <section>
                <SectionTitle title="Recent Reviews" />
                <div className="grid grid-cols-1 gap-4">
                    {[0, 1, 2].map((i) => (
                        <div key={`review-${i}`}
                            className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                          hover:border-orange-500/30 transition-all duration-300 
                          animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-black/30 animate-pulse"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-black/30 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-3 bg-black/30 rounded w-1/6 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-black/30 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-black/30 rounded w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section>
                <SectionTitle title="Upcoming Events" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                        <div key={`event-${i}`}
                            className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                          hover:border-orange-500/30 transition-all duration-300 
                          animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex gap-4 mb-4">
                                <div className="w-16 h-16 bg-black/30 rounded-lg animate-pulse 
                              flex-shrink-0 flex flex-col items-center justify-center">
                                    <div className="h-3 w-8 bg-gray-700/50 rounded mb-1"></div>
                                    <div className="h-4 w-6 bg-gray-700/50 rounded"></div>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-black/30 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-3 bg-black/30 rounded w-1/2 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="h-20 bg-black/30 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Research Publications */}
            <section>
                <SectionTitle title="Latest Research Publications" />
                <div className="grid grid-cols-1 gap-6">
                    {[0, 1, 2].map((i) => (
                        <div key={`pub-${i}`}
                            className="bg-[#1E1E1E] rounded-xl p-6 border border-gray-700/30 
                          hover:border-orange-500/30 transition-all duration-300 
                          animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 h-32 bg-black/30 rounded-lg animate-pulse flex-shrink-0"></div>
                                <div className="space-y-3 flex-1">
                                    <div className="h-5 bg-black/30 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-black/30 rounded w-1/4 animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-black/30 rounded w-full animate-pulse"></div>
                                        <div className="h-3 bg-black/30 rounded w-full animate-pulse"></div>
                                        <div className="h-3 bg-black/30 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home; 
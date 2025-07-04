import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import DefaultMan from '../assets/Default_Man.svg';
import DefaultWoman from '../assets/Default_Woman.svg';
import StarRating from './StarRating';
import { getFacultyProfilePic } from '../utils/profilePic';

// Mock data - this will be replaced with real data later
const MOCK_FACULTY = [
    { id: "1", name: "Dr. Sarah Smith", department: "Computer Science", rating: 4.8 },
    { id: "2", name: "Prof. John Davis", department: "Electrical Engineering", rating: 4.6 },
    { id: "3", name: "Dr. Emily Chen", department: "Software Engineering", rating: 4.9 },
    { id: "4", name: "Prof. Michael Brown", department: "Computer Science", rating: 4.7 },
    { id: "5", name: "Dr. Lisa Wilson", department: "Data Science", rating: 4.5 },
    { id: "6", name: "Prof. David Lee", department: "Artificial Intelligence", rating: 4.8 }
];

// Department filter options
const DEPARTMENT_FILTERS = [
    { id: 'cse', name: 'CSE', fullName: 'Department of CSE' },
    { id: 'eee', name: 'EEE', fullName: 'Department of EEE' },
    { id: 'civil', name: 'Civil', fullName: 'Department of Civil Engineering' },
    { id: 'business', name: 'Business', fullName: 'Business Administration' },
    { id: 'economics', name: 'Economics', fullName: 'Department of Economics' },
    { id: 'ins', name: 'INS', fullName: 'Institute of Natural Sciences' },
    { id: 'english', name: 'English', fullName: 'Department of English' },
    { id: 'eds', name: 'EDS', fullName: 'Department of Environment & Development Studies' },
    { id: 'msj', name: 'MSJ', fullName: 'Department of Media Studies & Journalism' },
    { id: 'pharmacy', name: 'Pharmacy', fullName: 'Department of Pharmacy' },
    { id: 'bge', name: 'BGE', fullName: 'Department of Biotechnology and Genetic Engineering' }
];

interface Faculty {
    id: string;
    name: string;
    department: string;
    rating: number;
}

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Search for faculty members..."
}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<Faculty[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isClickInsideMenu = menuRef.current && menuRef.current.contains(target);
            const isClickInsideInput = inputRef.current && inputRef.current.contains(target);

            // If click is outside both menu and input, close everything
            if (!isClickInsideMenu && !isClickInsideInput) {
                setIsFocused(false);
                setShowFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter suggestions based on query
    useEffect(() => {
        const loadSuggestions = async () => {
            if (query.trim()) {
                try {
                    const facultyData = await import('../data/faculty.json');
                    const filtered = facultyData.default.filter((faculty: Faculty) =>
                        faculty.name.toLowerCase().includes(query.toLowerCase()) ||
                        faculty.department.toLowerCase().includes(query.toLowerCase())
                    );
                    setSuggestions(filtered);
                } catch (error) {
                    console.error('Error loading faculty data:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        loadSuggestions();
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleInputClick = () => {
        // Toggle the menu when clicking the searchbar
        if (!showFilters) {
            setShowFilters(true);
        }
        setIsFocused(true);
    };

    const handleFilterClick = (departmentId: string) => {
        if (selectedDepartment === departmentId) {
            setSelectedDepartment(null);
            if (!query.trim()) {
                setSuggestions([]);
            } else {
                filterSuggestions(query, null);
            }
        } else {
            setSelectedDepartment(departmentId);
            filterSuggestions(query, departmentId);
        }
    };

    // Helper to filter suggestions by query and department
    const filterSuggestions = (searchQuery: string, department: string | null) => {
        import('../data/faculty.json').then((facultyData) => {
            let filtered = facultyData.default;
            if (department) {
                filtered = filtered.filter((faculty: Faculty) =>
                    faculty.department.toLowerCase().includes(department.toLowerCase())
                );
            }
            if (searchQuery.trim()) {
                filtered = filtered.filter((faculty: Faculty) =>
                    faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            setSuggestions(filtered);
        }).catch(() => setSuggestions([]));
    };

    // Update suggestions when query or selectedDepartment changes
    useEffect(() => {
        // Only filter if there is a query or a department selected
        if (query.trim() || selectedDepartment) {
            filterSuggestions(query, selectedDepartment);
        } else {
            setSuggestions([]);
        }
    }, [query, selectedDepartment]);

    const handleSuggestionClick = (facultyId: string) => {
        navigate(`/faculty/${facultyId}`);
        setIsFocused(false);
        setShowFilters(false);
    };

    return (
        <div className="relative w-[400px]">
            <form
                onSubmit={handleSearch}
                className={`
        relative group
        ${isFocused ? 'border-orange-500/30' : ''}
      `}
            >
                <div className="relative flex items-center">
                    <FiSearch
                        className={`
            absolute left-3.5 w-4 h-4 pointer-events-none
            transition-colors duration-300
            ${isFocused ? 'text-orange-500' : 'text-gray-500'}
          `}
                    />
                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onClick={handleInputClick}
                        placeholder={placeholder}
                        className={`
            w-full h-9 pl-10 pr-4
            bg-black/30 
            border border-gray-700/30
            hover:border-gray-600/30
            focus:border-orange-500/30
            rounded-full
            text-gray-200 
            placeholder-gray-500 
            text-sm
            transition-all duration-300
            focus-visible:outline-none
          `}
                    />
                    {/* Simple Clear Button */}
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors text-xs bg-transparent border-none p-0 cursor-pointer focus:outline-none focus:ring-0"
                            tabIndex={0}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </form>

            {/* Unified Floating Window: Department Filter + Search Results */}
            {showFilters && (
                <div
                    ref={menuRef}
                    className="absolute w-full mt-1 bg-neutral-950/100 shadow-lg border border-white/5 rounded-xl z-50 overflow-hidden"
                >
                    {/* Department Filters Row */}
                    <div className="px-4 pt-4 pb-3">
                        <div className="text-xs text-gray-300 font-medium mb-3">Filter by Department</div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {DEPARTMENT_FILTERS.map((dept) => (
                                <button
                                    key={dept.id}
                                    onClick={() => handleFilterClick(dept.name)}
                                    className={`px-3 py-1 text-xs transition-all duration-200 text-center truncate rounded-full focus:outline-none focus:ring-0
                                        ${selectedDepartment === dept.name
                                            ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF9800] text-white border-none'
                                            : 'bg-transparent text-gray-300 border-gray-700/30 hover:bg-orange-500/10 hover:text-orange-400 border'}
                                    `}
                                >
                                    {dept.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200/10" />
                    {/* Search Results Section */}
                    <div className="max-h-64 overflow-y-auto px-2 py-2">
                        {suggestions.length > 0 ? (
                            suggestions.map((faculty, idx) => (
                                <button
                                    key={faculty.id}
                                    onClick={() => handleSuggestionClick(faculty.id)}
                                    className={`w-full flex items-center justify-between py-2 px-4 mb-2 last:mb-0 rounded-xl border border-gray-700/30 transition-all duration-200 hover:border-orange-400 focus:outline-none group gap-4 bg-transparent`}
                                >
                                    <div className="flex items-center gap-4 w-full justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                                                <img src={getFacultyProfilePic(faculty)} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm text-gray-100 font-semibold">{faculty.name}</div>
                                                {faculty.designation && <div className="text-xs text-orange-400 font-medium">{faculty.designation}</div>}
                                            </div>
                                        </div>
                                        <StarRating rating={faculty.rating} size={20} />
                                    </div>
                                </button>
                            ))
                        ) : (
                            (!query.trim() && !selectedDepartment) ? (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                    Type to show faculty
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                    No faculty found
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar; 
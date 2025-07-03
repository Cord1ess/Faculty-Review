import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiStar } from 'react-icons/fi';

// Mock data - this will be replaced with real data later
const MOCK_FACULTY = [
    { id: 1, name: "Dr. Sarah Smith", department: "Computer Science", rating: 4.8 },
    { id: 2, name: "Prof. John Davis", department: "Electrical Engineering", rating: 4.6 },
    { id: 3, name: "Dr. Emily Chen", department: "Software Engineering", rating: 4.9 },
    { id: 4, name: "Prof. Michael Brown", department: "Computer Science", rating: 4.7 },
    { id: 5, name: "Dr. Lisa Wilson", department: "Data Science", rating: 4.5 },
    { id: 6, name: "Prof. David Lee", department: "Artificial Intelligence", rating: 4.8 }
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
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsFocused(false);
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
        onSearch(query);
    };

    const handleSuggestionClick = (facultyId: string) => {
        navigate(`/faculty/${facultyId}`);
        setQuery('');
        setIsFocused(false);
    };

    const displayedSuggestions = showAllSuggestions ? suggestions : suggestions.slice(0, 3);
    const hasMoreSuggestions = suggestions.length > 3 && !showAllSuggestions;

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
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isFocused && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute w-full mt-2 py-2 bg-[#1E1E1E] rounded-xl border border-gray-700/30 
                     shadow-lg backdrop-blur-xl z-50 overflow-hidden"
                >
                    {displayedSuggestions.map((faculty) => (
                        <button
                            key={faculty.id}
                            onClick={() => handleSuggestionClick(faculty.id)}
                            className="w-full px-4 py-2 flex items-center justify-between hover:bg-black/30 
                         transition-colors duration-200 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                                    <FiUser className="w-4 h-4 text-orange-500" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm text-gray-200 font-medium">{faculty.name}</div>
                                    <div className="text-xs text-gray-500">{faculty.department}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <FiStar className="w-3 h-3" />
                                <span className="text-xs">{faculty.rating}</span>
                            </div>
                        </button>
                    ))}

                    {hasMoreSuggestions && (
                        <button
                            onClick={() => setShowAllSuggestions(true)}
                            className="w-full mt-1 px-4 py-2 text-sm text-orange-500 hover:bg-black/30 
                         transition-colors duration-200 font-medium"
                        >
                            See all {suggestions.length} results
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 
import React from 'react';
import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';

const StarRating = ({ rating, size = 20, className = '' }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<MdStar key={i} className={`text-yellow-400`} style={{ width: size, height: size }} />);
        } else if (rating >= i - 0.5) {
            stars.push(<MdStarHalf key={i} className={`text-yellow-400`} style={{ width: size, height: size }} />);
        } else {
            stars.push(<MdStarBorder key={i} className={`text-gray-600`} style={{ width: size, height: size }} />);
        }
    }
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {stars}
            <span className="ml-2 text-lg font-bold text-gray-100">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarRating; 
import React, { useState } from 'react';
import { FiX, FiStar, FiSend } from 'react-icons/fi';

const ReviewForm = ({ faculty, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        teachingQuality: '',
        communication: '',
        knowledge: '',
        helpfulness: '',
        overallExperience: '',
        comment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const questions = [
        {
            id: 'teachingQuality',
            question: 'How would you rate the teaching quality?',
            options: [
                { value: '5', label: 'Excellent' },
                { value: '4', label: 'Very Good' },
                { value: '3', label: 'Good' },
                { value: '2', label: 'Fair' },
                { value: '1', label: 'Poor' }
            ]
        },
        {
            id: 'communication',
            question: 'How clear was the communication?',
            options: [
                { value: '5', label: 'Very Clear' },
                { value: '4', label: 'Clear' },
                { value: '3', label: 'Somewhat Clear' },
                { value: '2', label: 'Unclear' },
                { value: '1', label: 'Very Unclear' }
            ]
        },
        {
            id: 'knowledge',
            question: 'How would you rate their knowledge of the subject?',
            options: [
                { value: '5', label: 'Expert Level' },
                { value: '4', label: 'Very Knowledgeable' },
                { value: '3', label: 'Knowledgeable' },
                { value: '2', label: 'Somewhat Knowledgeable' },
                { value: '1', label: 'Limited Knowledge' }
            ]
        },
        {
            id: 'helpfulness',
            question: 'How helpful were they outside of class?',
            options: [
                { value: '5', label: 'Extremely Helpful' },
                { value: '4', label: 'Very Helpful' },
                { value: '3', label: 'Helpful' },
                { value: '2', label: 'Somewhat Helpful' },
                { value: '1', label: 'Not Helpful' }
            ]
        },
        {
            id: 'overallExperience',
            question: 'Overall, how would you rate your experience?',
            options: [
                { value: '5', label: 'Outstanding' },
                { value: '4', label: 'Very Good' },
                { value: '3', label: 'Good' },
                { value: '2', label: 'Fair' },
                { value: '1', label: 'Poor' }
            ]
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calculateAverageRating = () => {
        const ratings = [
            formData.teachingQuality,
            formData.communication,
            formData.knowledge,
            formData.helpfulness,
            formData.overallExperience
        ].filter(rating => rating !== '').map(Number);

        return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    };

    const isFormValid = () => {
        return questions.every(q => formData[q.id] !== '') && formData.comment.trim() !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        setIsSubmitting(true);

        const reviewData = {
            id: Date.now().toString(),
            facultyId: faculty.id,
            rating: parseFloat(calculateAverageRating()),
            course: 'General Review', // You could add a course field later
            comment: formData.comment,
            ratings: {
                teachingQuality: parseInt(formData.teachingQuality),
                communication: parseInt(formData.communication),
                knowledge: parseInt(formData.knowledge),
                helpfulness: parseInt(formData.helpfulness),
                overallExperience: parseInt(formData.overallExperience)
            },
            timestamp: new Date().toISOString()
        };

        try {
            await onSubmit(reviewData);
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#1E1E1E] rounded-2xl border border-gray-700/30 shadow-xl backdrop-blur-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/30">
                    <div>
                        <h2 className="text-xl font-bold text-white">Write a Review</h2>
                        <p className="text-gray-400 text-sm mt-1">Review for {faculty.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black/30 rounded-lg transition-colors"
                    >
                        <FiX className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Questions */}
                    {questions.map((q) => (
                        <div key={q.id} className="space-y-3">
                            <label className="block text-white font-medium">
                                {q.question}
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {q.options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleInputChange(q.id, option.value)}
                                        className={`
                                            p-3 rounded-lg border transition-all duration-200 text-sm
                                            ${formData[q.id] === option.value
                                                ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                                                : 'border-gray-700/30 bg-black/30 text-gray-300 hover:border-gray-600/30'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-1 justify-center">
                                            <FiStar className="w-3 h-3" />
                                            <span>{option.value}</span>
                                        </div>
                                        <div className="text-xs mt-1">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Comment Box */}
                    <div className="space-y-3">
                        <label className="block text-white font-medium">
                            Additional Comments
                        </label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => handleInputChange('comment', e.target.value)}
                            placeholder="Share your experience with this faculty member..."
                            className="w-full h-32 p-4 bg-black/30 border border-gray-700/30 rounded-lg text-gray-200 placeholder-gray-500 resize-none focus:border-orange-500/30 focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    {/* Average Rating Display */}
                    <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Average Rating:</span>
                            <div className="flex items-center gap-2">
                                <FiStar className="w-5 h-5 text-orange-500" />
                                <span className="text-white font-bold text-lg">
                                    {calculateAverageRating()}
                                </span>
                                <span className="text-gray-400">/ 5</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-black/30 border border-gray-700/30 rounded-lg text-gray-300 hover:bg-black/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF9800] rounded-lg text-white font-medium hover:from-[#FF5A00] hover:to-[#FF8A00] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <FiSend className="w-4 h-4" />
                                    Submit Review
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm; 
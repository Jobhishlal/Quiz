import React, { useState } from 'react';
import Modal from './Modal';
import type { QuizQuestion } from '../types/quiz';
import toast from 'react-hot-toast';

interface AddQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (question: QuizQuestion) => void;
    quizTitle?: string;
    initialData?: QuizQuestion | null;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ isOpen, onClose, onSave, quizTitle = 'Quiz', initialData }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [explanation, setExplanation] = useState('');

    React.useEffect(() => {
        if (isOpen && initialData) {
            setQuestionText(initialData.questionText);
            setOptions(initialData.options);
            setCorrectAnswer(initialData.correctAnswer);
            // setExplanation(initialData.explanation || ''); // Future proofing
        } else if (isOpen) {
            // Reset for new question
            setQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setExplanation('');
        }
    }, [isOpen, initialData]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSave = () => {
        // Basic check to ensure we don't save completely empty junk, 
        // but removing the heavy logic as requested.
        if (!questionText.trim() || !correctAnswer) {
            toast.error('Please fill required fields');
            return;
        }

        const validOptions = options.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
            toast.error('At least 2 options are required');
            return;
        }

        if (options.some(opt => opt.trim() === '')) {
            toast.error('Please fill all option fields');
            return;
        }

        // Validate duplicate options (Case Insensitive)
        const uniqueOptions = new Set(options.map(opt => opt.trim().toLowerCase()));
        if (uniqueOptions.size !== options.length) {
            toast.error('Duplicate options are not allowed');
            return;
        }

        onSave({
            questionText,
            options,
            correctAnswer
        });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${quizTitle} - ${initialData ? 'Edit' : 'Create New'} Questions`} size="xl">
            <div className="space-y-6">
                {/* Question Text */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Question Text</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="question"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc]"
                    />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {options.map((opt, idx) => (
                        <div key={idx}>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Option {String(idx + 1).padStart(2, '0')}</label>
                            <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc]"
                            />
                        </div>
                    ))}
                </div>

                {/* Answer and Explanation */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Answer</label>
                        <select
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] bg-white"
                        >
                            <option value="">Select Correct Answer</option>
                            {options.map((opt, index) => opt && <option key={index} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Explanation</label>
                        <input
                            type="text"
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                            placeholder="Write something..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc]"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-4">
                    <button className="px-6 py-2.5 border border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-50">
                        Add Option
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#0088cc] text-white font-bold rounded-xl hover:bg-[#0077b3]"
                    >
                        {initialData ? 'Update Question' : 'Add Question'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddQuestionModal;

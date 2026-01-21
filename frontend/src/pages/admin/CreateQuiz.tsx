import React, { useState } from 'react';
import type { QuizData, QuizQuestion } from '../../types/quiz';
import quizService from '../../services/quizService';
import { Upload, Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';

interface CreateQuizProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ isOpen, onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('20 min');
    const [group] = useState('Yr4');
    const [image, setImage] = useState('');

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);

    // Helper state
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleAddQuestion = () => {
        if (!currentQuestion || options.some(opt => !opt) || !correctAnswer) {
            alert('Please fill all question fields');
            return;
        }

        const newQuestion: QuizQuestion = {
            questionText: currentQuestion,
            options: [...options],
            correctAnswer
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async () => {
        const quizData: QuizData = {
            title,
            description,
            duration,
            group,
            image: image || 'default.png',
            questions
        };

        try {
            await quizService.createQuiz(quizData);
            alert('Quiz created successfully!');
            onSuccess(); // Refresh list
            onClose(); // Close modal
            resetForm();
        } catch (error) {
            console.error(error);
            alert('Failed to create quiz');
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setQuestions([]);
        // ... reset others if needed
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Quizzes" size="2xl">
            {/* Top Form Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Alice in Wonderland"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc]"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Quiz Time Duration</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] bg-white"
                    >
                        <option>15 min</option>
                        <option>20 min</option>
                        <option>25 min</option>
                        <option>30 min</option>
                        <option>45 min</option>
                        <option>60 min</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Image</label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
                        <span className="text-gray-900 font-medium flex-1 truncate">{image || 'IMG.362'}</span>
                        <div className="relative cursor-pointer text-[#0088cc] font-bold text-sm hover:underline">
                            Choose file
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setImage(e.target.files?.[0]?.name || '')} />
                        </div>
                        <Upload className="w-5 h-5 text-[#0088cc]" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Comments</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write here....."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc]"
                    />
                </div>
            </div>

            {/* Add Question Button */}
            <div className="mb-8">
                <button
                    className="bg-[#0088cc] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0077b3]"
                >
                    Add Question <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Questions List */}
            <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Questions and Answers</h3>

                {questions.length === 0 ? (
                    <p className="text-gray-400 italic">No questions added yet.</p>
                ) : (
                    <div className="space-y-6">
                        {questions.map((q, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-gray-900 flex gap-2">
                                        <span className="text-gray-400">{String(idx + 1).padStart(2, '0')}.</span>
                                        {q.questionText}
                                    </h4>
                                    <div className="flex gap-3 text-gray-400">
                                        <button className="hover:text-[#0088cc]"><Pencil className="w-4 h-4" /></button>
                                        <button className="hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 pl-8">
                                    {q.options.map((opt, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="font-bold text-gray-400">{String.fromCharCode(65 + i)})</span>
                                            {opt}
                                            {opt === q.correctAnswer && <span className="text-green-500">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area for New Question - simplified for duplicate logic */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-dashed border-gray-300">
                <h4 className="font-bold text-gray-700 mb-4 text-sm uppercase">New Question Details</h4>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Type question here..."
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 bg-white"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {options.map((opt, idx) => (
                            <input
                                key={idx}
                                type="text"
                                placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 bg-white"
                            />
                        ))}
                    </div>
                    <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-900 bg-white"
                    >
                        <option value="">Select Correct Answer</option>
                        {options.map((opt, index) => opt && <option key={index} value={opt}>{opt}</option>)}
                    </select>
                    <button onClick={handleAddQuestion} className="w-full bg-green-500 text-white rounded-lg py-2 font-bold hover:bg-green-600">
                        Confirm Add Question
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4">
                <button onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">
                    Save as Draft
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#0088cc] text-white font-bold rounded-xl hover:bg-[#0077b3]"
                >
                    Publish Quizzes
                </button>
            </div>
        </Modal>
    );
};

export default CreateQuiz;

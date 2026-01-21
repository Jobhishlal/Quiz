import React, { useEffect, useState } from 'react';
import type { QuizData, QuizQuestion } from '../../types/quiz';
import quizService from '../../services/quizService';
import { Upload, Plus, Pencil, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AddQuestionModal from '../../components/AddQuestionModal';
import ConfirmationToast from '../../components/ConfirmationToast';
import toast from 'react-hot-toast';

const CreateQuiz: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('20 min');
    const [group] = useState('Yr4');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('active');

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchQuiz = async () => {
                try {
                    const data = await quizService.getQuizById(id);
                    if (data) {
                        setTitle(data.title);
                        setDescription(data.description);
                        setDuration(data.duration);
                        // If the backend returns image, set it. Otherwise keep default or empty.
                        setImage(data.image || '');
                        setQuestions(data.questions || []);
                        setStatus(data.status || 'active');
                    }
                } catch (error) {
                    console.error('Failed to fetch quiz', error);
                    toast.error('Failed to load quiz details');
                    navigate('/admin/quiz');
                }
            };
            fetchQuiz();
        }
    }, [isEditMode, id, navigate]);

    const handleSaveQuestion = (question: QuizQuestion) => {
        if (editingQuestionIndex !== null) {
            const newQuestions = [...questions];
            newQuestions[editingQuestionIndex] = question;
            setQuestions(newQuestions);
            setEditingQuestionIndex(null);
        } else {
            setQuestions([...questions, question]);
        }
    };

    const handleEditQuestion = (index: number) => {
        setEditingQuestionIndex(index);
        setIsAddQuestionOpen(true);
    };

    const confirmDeleteQuestion = async (indexToDelete: number) => {
        const questionToDelete = questions[indexToDelete];

        if (isEditMode && id && questionToDelete._id) {
            try {
                await quizService.deleteQuestion(id, questionToDelete._id);
                setQuestions(questions.filter((_, index) => index !== indexToDelete));
                toast.success('Question deleted from database');
            } catch (error) {
                console.error('Failed to delete question', error);
                toast.error('Failed to delete question');
            }
        } else {
            setQuestions(questions.filter((_, index) => index !== indexToDelete));
            toast.success('Question removed');
        }
    };

    const handleDeleteQuestion = (indexToDelete: number) => {
        toast.custom((t) => (
            <ConfirmationToast
                t={t}
                message="Are you sure you want to delete this question?"
                onConfirm={() => confirmDeleteQuestion(indexToDelete)}
                confirmText="Delete"
            />
        ));
    };

    const handleSubmit = async (status: string) => {
        const quizData: QuizData = {
            title,
            description, // Optional now
            duration,
            group,
            image: image || 'default.png',
            questions,
            status // 'active' or 'inactive'
        };

        try {
            if (isEditMode && id) {
                await quizService.updateQuiz(id, quizData);
                toast.success(status === 'active' ? 'Quiz published successfully!' : 'Quiz saved as draft!');
            } else {
                await quizService.createQuiz(quizData);
                toast.success(status === 'active' ? 'Quiz created successfully!' : 'Quiz saved as draft!');
            }
            navigate('/admin/quiz');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.message || (isEditMode ? 'Failed to update quiz' : 'Failed to create quiz');
            toast.error(errorMessage);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{isEditMode ? 'Edit Quiz' : 'Create New Quizzes'}</h2>
                <button
                    onClick={() => navigate('/admin/quiz')}
                    className="bg-[#0088cc] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#0077b3]"
                >
                    Manage Quizzes
                </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">

                {/* Top Form Section */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
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
                            <span className="text-gray-900 font-medium flex-1 truncate">{image || 'File'}</span>
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

                <div className="mb-8">
                    <button
                        onClick={() => {
                            setEditingQuestionIndex(null);
                            setIsAddQuestionOpen(true);
                        }}
                        className="bg-[#0088cc] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0077b3]"
                    >
                        Add Question <Plus className="w-4 h-4" />
                    </button>
                    <h3 className="text-xl font-bold text-gray-900 mt-6">Questions and Answers</h3>
                </div>

                {/* Questions List */}
                <div className="mb-12">
                    {questions.length === 0 ? (
                        <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-400 italic">No questions added yet.</p>
                        </div>
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
                                            <button
                                                onClick={() => handleEditQuestion(idx)}
                                                className="hover:text-[#0088cc]"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteQuestion(idx)} className="hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-4 border-t border-gray-100 pt-8">
                    <button onClick={() => handleSubmit('inactive')} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">
                        Save as Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('active')}
                        className="px-6 py-2.5 bg-[#0088cc] text-white font-bold rounded-xl hover:bg-[#0077b3]"
                    >
                        {isEditMode && status === 'active' ? 'Update Quiz' : 'Publish Quizzes'}
                    </button>
                </div>
            </div>

            <AddQuestionModal
                isOpen={isAddQuestionOpen}
                onClose={() => {
                    setIsAddQuestionOpen(false);
                    setEditingQuestionIndex(null);
                }}
                onSave={handleSaveQuestion}
                quizTitle={title || 'New Quiz'}
                initialData={editingQuestionIndex !== null ? questions[editingQuestionIndex] : null}
            />
        </div>
    );
};

export default CreateQuiz;

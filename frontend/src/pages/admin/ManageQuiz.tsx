import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizData } from '../../types/quiz';
import quizService from '../../services/quizService';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageQuiz: React.FC = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<QuizData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        try {
            const data = await quizService.getQuizzes();
            setQuizzes(data);
        } catch (error) {
            console.error('Failed to fetch quizzes', error);
            toast.error('Failed to fetch quizzes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const toggleDropdown = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/admin/edit-quiz/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await quizService.deleteQuiz(id);
                toast.success('Quiz deleted successfully');
                fetchQuizzes();
            } catch (error) {
                console.error('Failed to delete quiz', error);
                toast.error('Failed to delete quiz');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Manage Quiz</h2>
                <button
                    onClick={() => navigate('/admin/create-quiz')}
                    className="bg-[#0088cc] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0077b3] transition-colors"
                >
                    Create New Quizzes
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Active Quizzes</h3>

                <div className="w-full overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-4 font-semibold text-gray-600 w-16">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="py-4 px-4 font-semibold text-gray-900 text-sm">S.No</th>
                                <th className="py-4 px-4 font-semibold text-gray-900 text-sm">Quiz Title</th>
                                <th className="py-4 px-4 font-semibold text-gray-900 text-sm">Group</th>
                                <th className="py-4 px-4 font-semibold text-gray-900 text-sm">Quiz Time Duration</th>
                                <th className="py-4 px-4 font-semibold text-gray-900 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
                            ) : quizzes.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No quizzes found.</td></tr>
                            ) : (
                                quizzes.map((quiz, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="py-4 px-4 text-gray-900 font-medium text-sm">
                                            {quiz.title}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">
                                            {quiz.group}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">
                                            {quiz.duration}
                                        </td>
                                        <td className="py-4 px-4 text-right relative">
                                            <button
                                                onClick={(e) => toggleDropdown(quiz._id!, e)}
                                                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>

                                            {activeDropdown === quiz._id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1">
                                                    <button
                                                        onClick={() => handleEdit(quiz._id!)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Edit className="w-4 h-4" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(quiz._id!)}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && quizzes.length > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                            Previous
                        </button>
                        <span className="text-sm text-gray-500">
                            <span className="font-bold text-gray-900">{String(quizzes.length).padStart(2, '0')}</span>/04
                        </span>
                        <button className="px-4 py-2 bg-[#0088cc] text-white rounded-lg text-sm font-medium hover:bg-[#0077b3]">
                            Next Page
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageQuiz;

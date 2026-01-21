import React, { useEffect, useState } from 'react';
import studentQuizService from '../../services/studentQuizService';
import type { Quiz } from '../../types/quiz';
import toast from 'react-hot-toast';

import { useSearchParams, useNavigate } from 'react-router-dom';

const StudentHomework = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [completedQuizIds, setCompletedQuizIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    console.log('StudentHomework rendered, navigate:', navigate);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        fetchQuizzes();
    }, [searchQuery]);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const [quizzesResponse, resultsResponse] = await Promise.all([
                studentQuizService.getAllQuizzes(1, 100, searchQuery),
                studentQuizService.getStudentResults()
            ]);

            setQuizzes(quizzesResponse.quizzes);

            const attemptedIds = new Set(resultsResponse.map((r: any) => r.quizId));
            setCompletedQuizIds(attemptedIds);

        } catch (error: any) {
            console.error(error);
            toast.error('Failed to load homework.');
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString?: string) => {
        const date = dateString ? new Date(dateString) : new Date();
        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading homework...</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Homework</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {quizzes.map((quiz, index) => {
                    // Cyclic colors for cards to match the vibrant UI example
                    const colors = [
                        'bg-[#1a88a0]', // Teal/Blue from example
                        'bg-[#f69e1e]', // Orange/Yellow from example
                    ];
                    const cardColor = colors[index % colors.length];

                    return (
                        <div key={quiz._id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                            {/* Card Image / Icon Area */}
                            {/* Card Image / Icon Area */}
                            <div className={`w-40 h-40 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center text-white text-center rounded-tl-[30px] rounded-br-[30px] overflow-hidden ${quiz.image ? 'bg-gray-100' : `${cardColor} p-4`}`}>
                                {/* If there is an image URL, show it. Otherwise show a placeholder icon/text */}
                                {quiz.image ? (
                                    <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="mb-2 opacity-80">
                                            <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight line-clamp-2">{quiz.title}</h3>
                                    </>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="flex-1 py-1 pr-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1">{quiz.title}</h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-gray-900">Number of Questions:</span>
                                        <span className="text-gray-600 font-medium">{quiz.questions ? quiz.questions.length : 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-gray-900">Duration:</span>
                                        <span className="text-gray-600 font-medium">{quiz.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-gray-900">Date:</span>
                                        <span className="text-gray-600 font-medium">{formatDate()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    {completedQuizIds.has(quiz._id || '') ? (
                                        <button
                                            onClick={() => navigate(`/student/homework/${quiz._id}`)}
                                            className="bg-green-100 text-green-700 px-6 py-2 rounded-xl text-sm font-bold shadow-sm border border-green-200 hover:bg-green-200 transition-colors"
                                        >
                                            Attempt Again
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/student/homework/${quiz._id}`)}
                                            className="bg-[#0088cc] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-[#0077b3] transition-colors"
                                        >
                                            Attend Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {quizzes.length === 0 && (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500">No homework assigned yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentHomework;

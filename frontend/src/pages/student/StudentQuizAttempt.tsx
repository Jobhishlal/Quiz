import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentQuizService from '../../services/studentQuizService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { Quiz } from '../../types/quiz';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const StudentQuizAttempt = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (id) {
            fetchQuiz(id);
        }
    }, [id]);

    useEffect(() => {
        let interval: any;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    const newValue = prev - 1;
                    if (id) localStorage.setItem(`quiz_timer_${id}`, newValue.toString());
                    return newValue;
                });
            }, 1000);
        } else if (timeLeft === 0 && timerActive) {
            setTimerActive(false);
            handleSubmit(); // Auto-submit when time runs out
            toast.error("Time's up! Quiz submitted.");
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft, id]);

    const fetchQuiz = async (quizId: string) => {
        try {
            const data = await studentQuizService.getQuizById(quizId);
            setQuiz(data);

            // Parse duration "30 min" -> seconds
            const durationMatch = data.duration.match(/(\d+)/);
            const minutes = durationMatch ? parseInt(durationMatch[0]) : 0;
            const totalSeconds = minutes * 60;

            // Check for saved time
            const savedTime = localStorage.getItem(`quiz_timer_${quizId}`);
            if (savedTime) {
                const parsedTime = parseInt(savedTime);
                if (parsedTime > 0) {
                    setTimeLeft(parsedTime);
                } else {
                    setTimeLeft(0); // Should trigger auto-submit effect
                }
            } else {
                setTimeLeft(totalSeconds);
            }

            setTimerActive(true);
        } catch (error) {
            console.error("Failed to fetch quiz:", error);
            toast.error("Failed to load quiz.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));
    };

    const handleNext = () => {
        if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const [showResultModal, setShowResultModal] = useState(false);
    const [resultData, setResultData] = useState<{ score: number; total: number; percentage: number } | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);

    // ... (existing effects)

    const handleSubmit = async () => {
        try {
            const submissionParams = {
                quizId: id || '',
                answers
            };

            const response = await studentQuizService.submitQuiz(submissionParams.quizId, submissionParams.answers);

            // Clear saved timer on successful submission
            if (id) localStorage.removeItem(`quiz_timer_${id}`);

            if (response.success && response.result) {
                const { score, totalQuestions } = response.result;
                const percentage = Math.round((score / totalQuestions) * 100);
                setResultData({ score, total: totalQuestions, percentage });
                setShowResultModal(true);
                toast.success("Quiz submitted successfully!");
            }
        } catch (error: any) {
            console.error("Submission error object:", error);
            if (error.response) {
                console.error("Server Error Response:", error.response.data);
                console.error("Server Status:", error.response.status);
            }
            toast.error(error.message || "Failed to submit quiz.");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading quiz...</div>;
    if (!quiz) return <div className="p-8 text-center text-red-500">Quiz not found.</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div className="max-w-5xl mx-auto p-6 relative">
            {/* Result Modal Overlay */}
            {showResultModal && resultData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up text-center relative">
                        <h2 className="text-[#0088cc] text-2xl font-bold mb-2">Score Summary</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Dear Student, Thank you for your Participate check you Score
                        </p>

                        <div className="flex justify-center mb-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="Student"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            Dear, {user?.username || user?.email?.split('@')[0] || 'Student'}
                        </h3>
                        <p className="text-gray-900 font-bold text-lg mb-6">Great work!</p>

                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="text-lg font-bold text-gray-800">
                                Your Score: {resultData.score}/{resultData.total} ⭐
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                                Percentage ({resultData.percentage}%)
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center mb-8">
                            <button
                                onClick={() => navigate('/student/homework')}
                                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                View Result
                            </button>
                            <button
                                onClick={() => navigate('/student/leaderboard')}
                                className="px-6 py-2.5 bg-[#0088cc] text-white font-bold rounded-xl hover:bg-[#0077b3] transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Leaderboard
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-gray-400">
                            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-pink-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-green-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16.93 16.93A10 10 0 0 1 12 20a10 10 0 0 1-10-10 10 10 0 0 1 6.93-7.07" /><path d="M2.08 10.74A10 10 0 0 0 12 2a10 10 0 0 0 10 10 10 10 0 0 0-6.93 7.07" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-[#0088cc] font-mono font-medium text-lg bg-blue-50 px-4 py-1.5 rounded-full">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="mb-2 text-gray-500 text-sm">
                    Please answer these questions.
                </div>

                {/* Progress Bar (Stepper) */}
                <div className="flex items-center justify-between mb-12 relative">
                    {/* Line Background */}
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200"></div>
                    {/* Active Line Fill - simplified per question */}
                    <div
                        className="absolute left-0 top-1/2 h-1 bg-[#0088cc] transition-all duration-300"
                        style={{ width: `${quiz.questions.length > 1 ? (currentQuestionIndex / (quiz.questions.length - 1)) * 100 : 0}%` }}
                    ></div>

                    {quiz.questions.map((_, index) => {
                        const isCompleted = index < currentQuestionIndex;
                        const isActive = index === currentQuestionIndex;

                        return (
                            <div
                                key={index}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 z-10
                                    ${isActive
                                        ? 'bg-white border-[#0088cc] text-[#0088cc] scale-125'
                                        : isCompleted
                                            ? 'bg-[#0088cc] border-[#0088cc] text-white'
                                            : 'bg-white border-gray-300 text-gray-400'
                                    }`}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : (isActive ? <div className="w-2 h-2 bg-[#0088cc] rounded-full"></div> : null)}
                            </div>
                        );
                    })}
                    <div className="ml-4 text-[#0088cc] font-medium text-lg">
                        {String(currentQuestionIndex + 1).padStart(2, '0')}/{String(quiz.questions.length).padStart(2, '0')}
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8">
                        {currentQuestionIndex + 1}. {currentQuestion.questionText}
                    </h2>

                    <div className="space-y-4 max-w-3xl mb-8">
                        {currentQuestion.options.map((option, idx) => {
                            const optionLetter = String.fromCharCode(65 + idx); // A, B, C...
                            const isSelected = answers[currentQuestionIndex] === option;

                            // Clicking these does nothing now, interaction moved to OMR box?
                            // User said: "student can tick this answers" -> in the box.
                            // But usually both work. I'll make the list purely display for now or keep it interactive.
                            // User "under the option show this box and student can tick this answers" implies tick happens IN box.
                            // I will keep list interactive as well for better UX, but focus visuals on box.
                            return (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                                        ${isSelected
                                            ? 'bg-blue-50 border-transparent'
                                            : 'border-transparent'
                                        }`}
                                >
                                    <span className="text-[#0088cc] text-lg font-medium w-8">
                                        {optionLetter}
                                    </span>
                                    <span className="text-gray-900 text-lg">
                                        {option}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* OMR Style Answer Box */}
                    <div className="border border-[#0088cc] w-32 ml-1">
                        {/* Box Header containing Question Number */}
                        <div className="bg-[#0088cc] text-white font-bold text-center py-1">
                            {currentQuestionIndex + 1}
                        </div>
                        {/* Box Body containing Options */}
                        <div className="bg-white p-2 flex flex-col gap-1">
                            {currentQuestion.options.map((option, idx) => {
                                const optionLetter = String.fromCharCode(65 + idx);
                                const isSelected = answers[currentQuestionIndex] === option;

                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between cursor-pointer group"
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        <span className="text-xs font-bold text-gray-800 w-4">{optionLetter}</span>
                                        <div className="w-12 h-4 border border-[#0088cc] flex items-center justify-center relative bg-white">
                                            {isSelected && <Check className="w-4 h-4 text-green-600 stroke-[3]" />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                    <div className="w-32"> {/* Spacer/Placeholder for prev question preview if needed */}
                        <div className="border border-gray-200 rounded p-2 w-20 h-24 hidden"> {/* Mini preview placeholder */}
                            <div className="text-xs font-bold text-center bg-[#0088cc] text-white py-1">{currentQuestionIndex + 1}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestionIndex === 0}
                            className={`px-8 py-2.5 rounded-xl font-bold border transition-colors
                                ${currentQuestionIndex === 0
                                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Back
                        </button>

                        {isLastQuestion ? (
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-2.5 rounded-xl font-bold bg-[#0088cc] text-white shadow-lg shadow-blue-500/30 hover:bg-[#0077b3] transition-colors"
                            >
                                Finish
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-2.5 rounded-xl font-bold bg-[#0088cc] text-white shadow-lg shadow-blue-500/30 hover:bg-[#0077b3] transition-colors"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentQuizAttempt;

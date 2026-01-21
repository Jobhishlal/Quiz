import apiClient from './apiClient';
import type { IQuizService, QuizData } from '../types/quiz';

const quizService: IQuizService = {
    createQuiz: async (data: QuizData): Promise<void> => {
        await apiClient.post('/admin/quiz', data);
    },
    getQuizzes: async (): Promise<QuizData[]> => {
        const response = await apiClient.get<{ success: boolean; quizzes: QuizData[] }>('/admin/quiz');
        return response.data.quizzes;
    },
    getQuizById: async (id: string): Promise<QuizData> => {
        const response = await apiClient.get<{ success: boolean; quiz: QuizData }>(`/admin/quiz/${id}`);
        return response.data.quiz;
    },
    updateQuiz: async (id: string, data: QuizData): Promise<void> => {
        await apiClient.put(`/admin/quiz/${id}`, data);
    },
    deleteQuiz: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/quiz/${id}`);
    },
    deleteQuestion: async (quizId: string, questionId: string): Promise<void> => {
        await apiClient.delete(`/admin/quiz/${quizId}/question/${questionId}`);
    }
};

export default quizService;

import apiClient from './apiClient';
import type { IQuizService, QuizData } from '../types/quiz';

const quizService: IQuizService = {
    createQuiz: async (data: QuizData | FormData): Promise<void> => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        await apiClient.post('/admin/quiz', data, config);
    },
    getQuizzes: async (search?: string, filter?: string, page: number = 1, limit: number = 4): Promise<{ quizzes: QuizData[], total: number }> => {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (filter) queryParams.append('filter', filter);
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        const response = await apiClient.get<{ success: boolean; quizzes: QuizData[]; total: number }>(`/admin/quiz${queryString}`);
        return { quizzes: response.data.quizzes, total: response.data.total };
    },
    getQuizById: async (id: string): Promise<QuizData> => {
        const response = await apiClient.get<{ success: boolean; quiz: QuizData }>(`/admin/quiz/${id}`);
        return response.data.quiz;
    },
    updateQuiz: async (id: string, data: QuizData | FormData): Promise<void> => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        await apiClient.put(`/admin/quiz/${id}`, data, config);
    },
    deleteQuiz: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/quiz/${id}`);
    },
    deleteQuestion: async (quizId: string, questionId: string): Promise<void> => {
        await apiClient.delete(`/admin/quiz/${quizId}/question/${questionId}`);
    }
};

export default quizService;

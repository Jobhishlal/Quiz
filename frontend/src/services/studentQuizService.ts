import apiClient from './apiClient';
import type { Quiz } from '../types/quiz';

interface GetQuizzesResponse {
    success: boolean;
    message: string;
    quizzes: Quiz[];
    total: number;
    page: number;
    limit: number;
}

const studentQuizService = {

    getAllQuizzes: async (page = 1, limit = 10, search = ''): Promise<GetQuizzesResponse> => {
        try {
            const response = await apiClient.get(`/admin/quiz?page=${page}&limit=${limit}&search=${search}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    getQuizById: async (id: string): Promise<Quiz> => {
        try {
            const response = await apiClient.get(`/admin/quiz/${id}`);
            return response.data.quiz;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    submitQuiz: async (quizId: string, answers: Record<number, string>) => {
        try {
            const response = await apiClient.post('/student/quiz/submit', { quizId, answers });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    getStudentResults: async () => {
        try {
            const response = await apiClient.get('/student/quiz/results');
            return response.data.results;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
};

export default studentQuizService;

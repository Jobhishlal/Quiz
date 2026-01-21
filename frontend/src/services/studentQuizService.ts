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
            const response = await apiClient.get(`/quiz/${id}`);
            return response.data.quiz;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
};

export default studentQuizService;

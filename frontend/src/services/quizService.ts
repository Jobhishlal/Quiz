import apiClient from './apiClient';
import type { IQuizService, QuizData } from '../types/quiz';

const quizService: IQuizService = {
    createQuiz: async (data: QuizData): Promise<void> => {
        await apiClient.post('/admin/quiz', data);
    },
    getQuizzes: async (): Promise<QuizData[]> => {
        const response = await apiClient.get<{ success: boolean; quizzes: QuizData[] }>('/admin/quiz');
        return response.data.quizzes;
    }
};

export default quizService;

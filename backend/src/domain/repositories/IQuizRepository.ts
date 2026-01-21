import { Quiz } from '../entities/Quiz';

export interface IQuizRepository {
    create(quiz: Quiz): Promise<Quiz>;
    getAll(search?: string, filter?: string, page?: number, limit?: number): Promise<{ quizzes: Quiz[], total: number }>;
    findById(id: string): Promise<Quiz | null>;
    update(id: string, quiz: Partial<Quiz>): Promise<Quiz | null>;
    delete(id: string): Promise<boolean>;
    deleteQuestion(quizId: string, questionId: string): Promise<boolean>;
}

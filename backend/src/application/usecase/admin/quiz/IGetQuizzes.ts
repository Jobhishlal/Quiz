import { Quiz } from '../../../../domain/entities/Quiz';

export interface IGetQuizzes {
    execute(search?: string, filter?: string, page?: number, limit?: number): Promise<{ quizzes: Quiz[], total: number }>;
}

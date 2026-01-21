import { IGetQuizzes } from './IGetQuizzes';
import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { Quiz } from '../../../../domain/entities/Quiz';

export class GetQuizzes implements IGetQuizzes {
    constructor(private quizRepo: IQuizRepository) { }

    async execute(search?: string, filter?: string, page: number = 1, limit: number = 10): Promise<{ quizzes: Quiz[], total: number }> {
        return await this.quizRepo.getAll(search, filter, page, limit);
    }
}

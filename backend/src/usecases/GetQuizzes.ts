import { IGetQuizzes } from './IGetQuizzes';
import { IQuizRepository } from '../domain/repositories/IQuizRepository';
import { Quiz } from '../domain/entities/Quiz';

export class GetQuizzes implements IGetQuizzes {
    constructor(private quizRepo: IQuizRepository) { }

    async execute(): Promise<Quiz[]> {
        return await this.quizRepo.findAll();
    }
}

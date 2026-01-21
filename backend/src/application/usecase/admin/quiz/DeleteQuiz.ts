import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { IDeleteQuiz } from './IDeleteQuiz';

export class DeleteQuiz implements IDeleteQuiz {
    constructor(private quizRepository: IQuizRepository) { }

    async execute(id: string): Promise<boolean> {
        return await this.quizRepository.delete(id);
    }
}

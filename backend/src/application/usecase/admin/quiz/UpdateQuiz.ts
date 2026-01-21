import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { Quiz } from '../../../../domain/entities/Quiz';
import { IUpdateQuiz } from './IUpdateQuiz';

export class UpdateQuiz implements IUpdateQuiz {
    constructor(private quizRepository: IQuizRepository) { }

    async execute(id: string, quiz: Partial<Quiz>): Promise<Quiz | null> {
        return await this.quizRepository.update(id, quiz);
    }
}

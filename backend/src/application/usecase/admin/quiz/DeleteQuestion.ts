import { IDeleteQuestion } from './IDeleteQuestion';
import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';

export class DeleteQuestion implements IDeleteQuestion {
    constructor(private quizRepo: IQuizRepository) { }

    async execute(quizId: string, questionId: string): Promise<boolean> {
        return await this.quizRepo.deleteQuestion(quizId, questionId);
    }
}

import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { Quiz } from '../../../../domain/entities/Quiz';
import { IGetQuizById } from './IGetQuizById';

export class GetQuizById implements IGetQuizById {
    constructor(private quizRepository: IQuizRepository) { }

    async execute(id: string): Promise<Quiz | null> {
        return await this.quizRepository.findById(id);
    }
}

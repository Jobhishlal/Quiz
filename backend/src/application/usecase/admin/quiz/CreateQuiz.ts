import { ICreateQuiz } from './ICreateQuiz';
import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { Quiz } from '../../../../domain/entities/Quiz';

export class CreateQuiz implements ICreateQuiz {
    constructor(private quizRepo: IQuizRepository) { }

    async execute(quizData: any): Promise<Quiz> {
        const quiz = new Quiz(
            quizData.title,
            quizData.description,
            quizData.questions,
            quizData.duration,
            quizData.group,
            quizData.image
        );
        quiz.validate();
        return await this.quizRepo.create(quiz);
    }
}

import { Quiz } from '../../../../domain/entities/Quiz';

export interface ICreateQuiz {
    execute(quizData: any): Promise<Quiz>;
}

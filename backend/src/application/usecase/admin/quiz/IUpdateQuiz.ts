import { Quiz } from '../../../../domain/entities/Quiz';

export interface IUpdateQuiz {
    execute(id: string, quiz: Partial<Quiz>): Promise<Quiz | null>;
}

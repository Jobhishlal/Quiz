import { Quiz } from '../domain/entities/Quiz';

export interface IGetQuizzes {
    execute(): Promise<Quiz[]>;
}

import { Quiz } from '../entities/Quiz';

export interface IQuizRepository {
    create(quiz: Quiz): Promise<Quiz>;
    findAll(): Promise<Quiz[]>;
}

import { Quiz } from '../entities/Quiz';

export interface IQuizRepository {
    create(quiz: Quiz): Promise<Quiz>;
    findAll(): Promise<Quiz[]>;
    findById(id: string): Promise<Quiz | null>;
    update(id: string, quiz: Partial<Quiz>): Promise<Quiz | null>;
    delete(id: string): Promise<boolean>;
}

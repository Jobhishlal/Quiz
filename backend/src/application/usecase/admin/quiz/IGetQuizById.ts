import { Quiz } from '../../../../domain/entities/Quiz';

export interface IGetQuizById {
    execute(id: string): Promise<Quiz | null>;
}

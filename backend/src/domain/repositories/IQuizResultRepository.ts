import { QuizResult } from '../entities/QuizResult';

export interface IQuizResultRepository {
    save(result: QuizResult): Promise<QuizResult>;
    findByStudentId(studentId: string): Promise<QuizResult[]>;
}

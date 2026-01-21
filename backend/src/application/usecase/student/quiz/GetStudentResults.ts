import { IQuizResultRepository } from '../../../../domain/repositories/IQuizResultRepository';
import { QuizResult } from '../../../../domain/entities/QuizResult';

export class GetStudentResults {
    constructor(private quizResultRepo: IQuizResultRepository) { }

    async execute(studentId: string): Promise<QuizResult[]> {
        return this.quizResultRepo.findByStudentId(studentId);
    }
}

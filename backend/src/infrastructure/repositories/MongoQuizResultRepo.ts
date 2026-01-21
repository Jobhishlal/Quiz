import { IQuizResultRepository } from '../../domain/repositories/IQuizResultRepository';
import { QuizResult } from '../../domain/entities/QuizResult';
import { QuizResultModel } from '../schemas/QuizResultSchema';

export class MongoQuizResultRepo implements IQuizResultRepository {
    async save(result: QuizResult): Promise<QuizResult> {
        const newResult = new QuizResultModel({
            studentId: result.studentId,
            quizId: result.quizId,
            score: result.score,
            totalQuestions: result.totalQuestions,
            answers: result.answers,
            attemptedAt: result.attemptedAt
        });
        const saved = await newResult.save();
        return new QuizResult(
            saved.studentId,
            saved.quizId,
            saved.score,
            saved.totalQuestions,
            saved.answers,
            saved.attemptedAt,
            saved._id.toString()
        );
    }

    async findByStudentId(studentId: string): Promise<QuizResult[]> {
        const results = await QuizResultModel.find({ studentId }).exec();
        return results.map(saved => new QuizResult(
            saved.studentId,
            saved.quizId,
            saved.score,
            saved.totalQuestions,
            saved.answers,
            saved.attemptedAt,
            saved._id.toString()
        ));
    }
}

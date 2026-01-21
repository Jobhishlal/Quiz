import { IQuizRepository } from '../../domain/repositories/IQuizRepository';
import { Quiz } from '../../domain/entities/Quiz';
import { QuizModel } from '../schemas/QuizSchema';

export class MongoQuizRepo implements IQuizRepository {
    async create(quiz: Quiz): Promise<Quiz> {
        const newQuiz = new QuizModel({
            title: quiz.title,
            description: quiz.description,
            questions: quiz.questions,
            duration: quiz.duration,
            group: quiz.group,
            image: quiz.image
        });
        const savedQuiz = await newQuiz.save();
        return this.mapToEntity(savedQuiz);
    }

    async findAll(): Promise<Quiz[]> {
        const docs = await QuizModel.find().lean();
        return docs.map(doc => this.mapToEntity(doc));
    }

    async findById(id: string): Promise<Quiz | null> {
        const doc = await QuizModel.findById(id).lean();
        if (!doc) return null;
        return this.mapToEntity(doc);
    }

    async update(id: string, quiz: Partial<Quiz>): Promise<Quiz | null> {
        const doc = await QuizModel.findByIdAndUpdate(id, quiz, { new: true }).lean();
        if (!doc) return null;
        return this.mapToEntity(doc);
    }

    async delete(id: string): Promise<boolean> {
        const result = await QuizModel.findByIdAndDelete(id);
        return !!result;
    }

    async deleteQuestion(quizId: string, questionId: string): Promise<boolean> {
        const result = await QuizModel.updateOne(
            { _id: quizId },
            { $pull: { questions: { _id: questionId } } }
        );
        return result.modifiedCount > 0;
    }

    private mapToEntity(doc: any): Quiz {
        const questions = doc.questions.map((q: any) => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            _id: q._id ? q._id.toString() : undefined
        }));

        return new Quiz(
            doc.title,
            doc.description,
            questions,
            doc.duration,
            doc.group,
            doc.image,
            doc._id.toString()
        );
    }
}

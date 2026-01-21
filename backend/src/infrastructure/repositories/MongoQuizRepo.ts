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
            image: quiz.image,
            status: quiz.status
        });
        const savedQuiz = await newQuiz.save();
        return this.mapToEntity(savedQuiz);
    }

    async getAll(search?: string, filter?: string, page: number = 1, limit: number = 10): Promise<{ quizzes: Quiz[], total: number }> {
        const query: any = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (filter === 'active') {
            query.$or = [{ status: 'active' }, { status: { $exists: false } }];
        } else if (filter && filter !== 'all') {
            query.status = filter.toLowerCase();
        }

        const skip = (page - 1) * limit;

        const [docs, total] = await Promise.all([
            QuizModel.find(query).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
            QuizModel.countDocuments(query)
        ]);

        return {
            quizzes: docs.map(doc => this.mapToEntity(doc)),
            total
        };
    }

    async findById(id: string): Promise<Quiz | null> {
        const doc = await QuizModel.findById(id).lean();
        if (!doc) return null;
        return this.mapToEntity(doc);
    }

    async update(id: string, quiz: Partial<Quiz>): Promise<Quiz | null> {
        const updateData: any = {
            title: quiz.title,
            description: quiz.description,
            questions: quiz.questions,
            duration: quiz.duration,
            group: quiz.group,
            image: quiz.image,
            status: quiz.status
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const doc = await QuizModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
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
            doc.status || 'active',
            doc._id.toString()
        );
    }
}

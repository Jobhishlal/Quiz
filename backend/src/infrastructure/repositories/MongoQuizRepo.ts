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

    private mapToEntity(doc: any): Quiz {
        return new Quiz(
            doc.title,
            doc.description,
            doc.questions,
            doc.duration,
            doc.group,
            doc.image,
            doc._id.toString()
        );
    }
}

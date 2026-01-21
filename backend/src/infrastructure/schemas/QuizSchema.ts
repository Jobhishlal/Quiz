import mongoose, { Schema, Document } from 'mongoose';
import { QuizQuestion } from '../../domain/entities/Quiz';

export interface IQuizDocument extends Document {
    title: string;
    description: string;
    questions: QuizQuestion[];
    duration: string;
    group: string;
    image?: string;
}

const QuizSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    duration: { type: String, required: true },
    group: { type: String, required: true },
    image: { type: String, required: false },
    status: { type: String, default: 'active' },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true }
        }
    ]
});

export const QuizModel = mongoose.model<IQuizDocument>('Quiz', QuizSchema);

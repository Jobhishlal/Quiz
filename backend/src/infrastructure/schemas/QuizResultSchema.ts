import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizResultDocument extends Document {
    studentId: string;
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: {
        questionId: string;
        selectedOption: string;
        isCorrect: boolean;
    }[];
    attemptedAt: Date;
}

const QuizResultSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: [{
        questionId: { type: String, required: true },
        selectedOption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    attemptedAt: { type: Date, default: Date.now }
});

export const QuizResultModel = mongoose.model<IQuizResultDocument>('QuizResult', QuizResultSchema);

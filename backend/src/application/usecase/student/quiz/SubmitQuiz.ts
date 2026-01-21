import { IQuizRepository } from '../../../../domain/repositories/IQuizRepository';
import { IQuizResultRepository } from '../../../../domain/repositories/IQuizResultRepository';
import { QuizResult } from '../../../../domain/entities/QuizResult';

interface SubmitQuizInput {
    studentId: string;
    quizId: string;
    answers: Record<number, string>; // map of questionIndex -> answer
}

export class SubmitQuiz {
    constructor(
        private quizRepo: IQuizRepository,
        private quizResultRepo: IQuizResultRepository
    ) { }

    async execute(input: SubmitQuizInput): Promise<QuizResult> {
        console.log('SubmitQuiz: Executing with input:', JSON.stringify(input));

        const quiz = await this.quizRepo.findById(input.quizId);
        if (!quiz) {
            console.error('SubmitQuiz: Quiz not found for ID:', input.quizId);
            throw new Error('Quiz not found');
        }

        console.log('SubmitQuiz: Quiz found:', quiz.title, 'Questions:', quiz.questions.length);

        let score = 0;
        const totalQuestions = quiz.questions.length;
        const resultAnswers = [];

        try {
            // Compare answers
            // Note: Input answers key is the index. DB Questons are array.
            for (let i = 0; i < totalQuestions; i++) {
                const question = quiz.questions[i];
                if (!question) {
                    console.error(`SubmitQuiz: Question at index ${i} is undefined`);
                    continue;
                }

                const studentAnswer = input.answers[i] || ''; // Handle skipped
                const isCorrect = studentAnswer === question.correctAnswer;

                console.log(`SubmitQuiz: Q${i + 1} - Student: ${studentAnswer}, Correct: ${question.correctAnswer}, Match: ${isCorrect}`);

                if (isCorrect) {
                    score++;
                }

                resultAnswers.push({
                    questionId: question._id?.toString() || i.toString(),
                    selectedOption: studentAnswer,
                    isCorrect
                });
            }

            console.log('SubmitQuiz: Calculation complete. Score:', score);

            const result = new QuizResult(
                input.studentId,
                input.quizId,
                score,
                totalQuestions,
                resultAnswers
            );

            console.log('SubmitQuiz: Saving result...');
            return await this.quizResultRepo.save(result);
        } catch (error) {
            console.error('SubmitQuiz: Error during calculation or save:', error);
            throw error;
        }
    }
}

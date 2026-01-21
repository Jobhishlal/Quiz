export interface StudentAnswer {
    questionId: string;
    selectedOption: string;
    isCorrect: boolean;
}

export class QuizResult {
    constructor(
        public studentId: string,
        public quizId: string,
        public score: number,
        public totalQuestions: number,
        public answers: StudentAnswer[],
        public attemptedAt: Date = new Date(),
        public _id?: string
    ) { }
}

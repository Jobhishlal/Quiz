export interface QuizQuestion {
    questionText: string;
    options: string[];
    correctAnswer: string;
    _id?: string;
}

export interface QuizData {
    _id?: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    duration: string;
    group: string;
    image?: string;
    status?: string;
}

export type Quiz = QuizData;

export interface IQuizService {
    createQuiz(data: QuizData): Promise<void>;
    getQuizzes: (search?: string, filter?: string, page?: number, limit?: number) => Promise<{ quizzes: QuizData[], total: number }>;
    getQuizById(id: string): Promise<QuizData>;
    updateQuiz(id: string, data: QuizData): Promise<void>;
    deleteQuiz(id: string): Promise<void>;
    deleteQuestion(quizId: string, questionId: string): Promise<void>;
}

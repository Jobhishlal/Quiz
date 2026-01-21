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
}

export interface IQuizService {
    createQuiz(data: QuizData): Promise<void>;
    getQuizzes(): Promise<QuizData[]>;
    getQuizById(id: string): Promise<QuizData>;
    updateQuiz(id: string, data: QuizData): Promise<void>;
    deleteQuiz(id: string): Promise<void>;
    deleteQuestion(quizId: string, questionId: string): Promise<void>;
}

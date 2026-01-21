export interface QuizQuestion {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export class Quiz {
    constructor(
        public title: string,
        public description: string,
        public questions: QuizQuestion[],
        public duration: string,
        public group: string, // e.g., "Yr4"
        public image?: string,
        public _id?: string
    ) { }
}

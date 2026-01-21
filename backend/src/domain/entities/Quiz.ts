import { QuizValidationMessage } from '../enums/QuizValidation';

export interface QuizQuestion {
    questionText: string;
    options: string[];
    correctAnswer: string;
    _id?: string;
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

    validate(): void {
        if (!this.title) {
            throw new Error(QuizValidationMessage.TITLE_REQUIRED);
        }
        if (!this.duration) {
            throw new Error(QuizValidationMessage.DURATION_REQUIRED);
        }
        if (!this.group) {
            throw new Error(QuizValidationMessage.GROUP_REQUIRED);
        }
        if (!this.questions || this.questions.length === 0) {
            throw new Error(QuizValidationMessage.AT_LEAST_ONE_QUESTION);
        }

        this.questions.forEach((q, index) => {
            if (!q.questionText) {
                throw new Error(`Question ${index + 1}: ${QuizValidationMessage.QUESTION_TEXT_REQUIRED}`);
            }

            const validOptions = q.options.filter(opt => opt && opt.trim() !== '');
            if (validOptions.length < 2) {
                throw new Error(`Question ${index + 1}: ${QuizValidationMessage.MIN_OPTIONS_REQUIRED}`);
            }

            const uniqueOptions = new Set(validOptions);
            if (uniqueOptions.size !== validOptions.length) {
                throw new Error(`Question ${index + 1}: ${QuizValidationMessage.DUPLICATE_OPTIONS}`);
            }

            if (!q.correctAnswer) {
                throw new Error(`Question ${index + 1}: ${QuizValidationMessage.CORRECT_ANSWER_REQUIRED}`);
            }

            if (!validOptions.includes(q.correctAnswer)) {
                throw new Error(`Question ${index + 1}: ${QuizValidationMessage.CORRECT_ANSWER_MUST_MATCH}`);
            }
        });
    }
}

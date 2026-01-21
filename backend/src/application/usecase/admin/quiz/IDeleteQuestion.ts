export interface IDeleteQuestion {
    execute(quizId: string, questionId: string): Promise<boolean>;
}

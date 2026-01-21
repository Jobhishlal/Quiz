export interface IDeleteQuiz {
    execute(id: string): Promise<boolean>;
}

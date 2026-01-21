import { NextFunction, Request, Response } from 'express';
import { ICreateQuiz } from '../../usecases/ICreateQuiz';

import { IGetQuizzes } from '../../usecases/IGetQuizzes';

export class QuizController {
    constructor(
        private createQuizUseCase: ICreateQuiz,
        private getQuizzesUseCase: IGetQuizzes
    ) { }

    async createQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const quizData = req.body;
            
            const quiz = await this.createQuizUseCase.execute(quizData);
            res.status(201).json({ success: true, quiz });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    async getQuizzes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const quizzes = await this.getQuizzesUseCase.execute();
            res.status(200).json({ success: true, quizzes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

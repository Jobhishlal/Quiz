import { NextFunction, Request, Response } from 'express';
import { ICreateQuiz } from '../../application/usecase/admin/quiz/ICreateQuiz';
import { IGetQuizzes } from '../../application/usecase/admin/quiz/IGetQuizzes';
import { IGetQuizById } from '../../application/usecase/admin/quiz/IGetQuizById';
import { IUpdateQuiz } from '../../application/usecase/admin/quiz/IUpdateQuiz';
import { IDeleteQuiz } from '../../application/usecase/admin/quiz/IDeleteQuiz';
import { HTTP_STATUS } from '../../shared/enums/HttpStatus';
import { MESSAGES } from '../../domain/constants/messages';

export class QuizController {
    constructor(
        private createQuizUseCase: ICreateQuiz,
        private getQuizzesUseCase: IGetQuizzes,
        private getQuizByIdUseCase: IGetQuizById,
        private updateQuizUseCase: IUpdateQuiz,
        private deleteQuizUseCase: IDeleteQuiz
    ) { }

    async createQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const quizData = req.body;
            const quiz = await this.createQuizUseCase.execute(quizData);
            res.status(HTTP_STATUS.CREATED).json({ success: true, message: MESSAGES.QUIZ_CREATED, quiz });
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
        }
    }

    async getQuizzes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const quizzes = await this.getQuizzesUseCase.execute();
            res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.QUIZ_FETCHED_SUCCESS, quizzes });
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
        }
    }

    async getQuizById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.QUIZ_ID_REQUIRED });
                return;
            }
            const quiz = await this.getQuizByIdUseCase.execute(id);
            if (!quiz) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.QUIZ_NOT_FOUND });
                return;
            }
            res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.QUIZ_FETCHED_SUCCESS, quiz });
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
        }
    }

    async updateQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const quizData = req.body;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.QUIZ_ID_REQUIRED });
                return;
            }
            const updatedQuiz = await this.updateQuizUseCase.execute(id, quizData);
            if (!updatedQuiz) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.QUIZ_NOT_FOUND });
                return;
            }
            res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.QUIZ_UPDATED, quiz: updatedQuiz });
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
        }
    }

    async deleteQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.QUIZ_ID_REQUIRED });
                return;
            }
            const success = await this.deleteQuizUseCase.execute(id);
            if (!success) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.QUIZ_NOT_FOUND });
                return;
            }
            res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.QUIZ_DELETED });
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
        }
    }
}

import { Request, Response, NextFunction } from 'express';
import { SubmitQuiz } from '../../application/usecase/student/quiz/SubmitQuiz';
import { GetStudentResults } from '../../application/usecase/student/quiz/GetStudentResults';
import { HTTP_STATUS } from '../../shared/enums/HttpStatus';

export class QuizResultController {
    constructor(
        private submitQuizUseCase: SubmitQuiz,
        private getStudentResultsUseCase: GetStudentResults
    ) { }

    async submit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = (req as any).user;
            console.log('QuizResultController: Full User Object:', JSON.stringify(user, null, 2));

            // Robust ID extraction
            const studentId = user.userId || user.id || user._id;

            if (!studentId) {
                console.error('QuizResultController: FAILED to extract studentId from token payload.');
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid token payload: missing student ID' });
                return;
            }

            console.log('QuizResultController: Extracted studentId:', studentId);
            const { quizId, answers } = req.body;

            if (!quizId || !answers) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Quiz ID and answers are required' });
                return;
            }

            const result = await this.submitQuizUseCase.execute({
                studentId,
                quizId,
                answers // Expected to be { 0: "A", 1: "B" }
            });

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: 'Quiz submitted successfully',
                result
            });
        } catch (error: any) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || 'Internal Server Error' });
        }
    }

    async getResults(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = (req as any).user;
            const studentId = user.userId || user.id || user._id;

            if (!studentId) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid token payload' });
                return;
            }

            const results = await this.getStudentResultsUseCase.execute(studentId);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                results
            });
        } catch (error: any) {
            console.error(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || 'Internal Server Error' });
        }
    }
}

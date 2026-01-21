import { NextFunction, Request, Response } from 'express';
import { ISignupStudent } from '../../application/usecase/student/auth/ISignupStudent';
import { ILoginStudent } from '../../application/usecase/student/auth/ILoginStudent';
import { HTTP_STATUS } from '../../shared/enums/HttpStatus';
import { AUTH_MESSAGES } from '../../domain/constants/auth/AuthMessages';

export class StudentAuthController {
    constructor(
        private signupStudentUseCase: ISignupStudent,
        private loginStudentUseCase: ILoginStudent // Inject Login Use Case
    ) { }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studentData = req.body;
            const tokens = await this.signupStudentUseCase.execute(studentData);

            // Set refresh token in cookie
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: AUTH_MESSAGES.SIGNUP_SUCCESS,
                accessToken: tokens.accessToken
            });
        } catch (error: any) {
            console.error(error);
            const message = error.message;
            if (message === AUTH_MESSAGES.STUDENT_EXISTS) {
                res.status(HTTP_STATUS.CONFLICT).json({ success: false, message });
            } else if (
                message === AUTH_MESSAGES.ALL_FIELDS_REQUIRED ||
                message === AUTH_MESSAGES.INVALID_EMAIL_FORMAT ||
                message === AUTH_MESSAGES.WEAK_PASSWORD
            ) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message });
            } else {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: message || AUTH_MESSAGES.SIGNUP_FAILED });
            }
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loginData = req.body;
            const tokens = await this.loginStudentUseCase.execute(loginData);

            // Set refresh token in cookie
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: AUTH_MESSAGES.LOGIN_SUCCESS,
                accessToken: tokens.accessToken,
                username: tokens.username // Include username
            });
        } catch (error: any) {
            console.error(error);
            const message = error.message;

            if (message === AUTH_MESSAGES.USER_NOT_FOUND) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message });
            } else if (message === AUTH_MESSAGES.INVALID_PASSWORD || message === AUTH_MESSAGES.INVALID_CREDENTIALS) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message });
            } else if (message === AUTH_MESSAGES.EMAIL_PASSWORD_REQUIRED) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: AUTH_MESSAGES.LOGIN_FAILED });
            }
        }
    }
}

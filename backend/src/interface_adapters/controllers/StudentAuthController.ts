import { NextFunction, Request, Response } from 'express';
import { ISignupStudent } from '../../application/usecase/student/auth/ISignupStudent';
import { ILoginStudent } from '../../application/usecase/student/auth/ILoginStudent';
import { HTTP_STATUS } from '../../shared/enums/HttpStatus';

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
                message: 'Student registered successfully',
                accessToken: tokens.accessToken
            });
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Student with this email already exists') {
                res.status(HTTP_STATUS.CONFLICT).json({ success: false, message: error.message });
            } else {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message || 'Signup failed' });
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
                message: 'Login successful',
                accessToken: tokens.accessToken
            });
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Invalid email or password') {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid email or password' });
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Login failed' });
            }
        }
    }
}

import bcrypt from 'bcryptjs';
import { ILoginStudent } from './ILoginStudent';
import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';
import { JwtService } from '../../../../infrastructure/services/JwtService';
import { LoginDto } from '../../../../domain/dtos/auth/LoginDto';
import { AuthResponse } from '../../../../domain/types/auth/AuthResponse';
import { AuthValidator } from '../../../validators/AuthValidator';
import { AUTH_MESSAGES } from '../../../../domain/constants/auth/AuthMessages';

export class LoginStudent implements ILoginStudent {
    constructor(
        private studentRepo: IStudentRepository
    ) { }

    async execute(data: LoginDto): Promise<AuthResponse> {
        const { email, password } = data;

        AuthValidator.validateLoginInput(data);

        const student = await this.studentRepo.findByEmail(email);
        if (!student) {
            throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
        }

        if (!student.password) {
            throw new Error(AUTH_MESSAGES.INVALID_ACCOUNT_STATE);
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            throw new Error(AUTH_MESSAGES.INVALID_PASSWORD);
        }

        const payload = {
            userId: student._id!,
            email: student.email,
            role: 'student'
        };

        const accessToken = JwtService.generateAccessToken(payload);
        const refreshToken = JwtService.generateRefreshToken(payload);

        return {
            success: true,
            accessToken,
            refreshToken,
            username: student.username
        };
    }
}

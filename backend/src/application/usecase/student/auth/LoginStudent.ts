import bcrypt from 'bcryptjs';
import { ILoginStudent } from './ILoginStudent';
import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';
import { JwtService } from '../../../../infrastructure/services/JwtService';
import { LoginDto } from '../../../../domain/dtos/auth/LoginDto';
import { AuthResponse } from '../../../../domain/types/auth/AuthResponse';

export class LoginStudent implements ILoginStudent {
    constructor(
        private studentRepo: IStudentRepository
    ) { }

    async execute(data: LoginDto): Promise<AuthResponse> {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const student = await this.studentRepo.findByEmail(email);
        if (!student) {
            throw new Error('User does not exist please signup');
        }

        if (!student.password) {
            throw new Error('Invalid account state');
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password'); // Or keep generic if strict security not required, but user asked for specific errors
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
            refreshToken
        };
    }
}

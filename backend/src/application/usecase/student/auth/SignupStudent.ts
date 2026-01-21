import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';
import { ISignupStudent } from './ISignupStudent';
import { Student } from '../../../../domain/entities/Student';
import { JwtService } from '../../../../infrastructure/services/JwtService';
import bcrypt from 'bcryptjs';
import { AuthValidator } from '../../../validators/AuthValidator';
import { AUTH_MESSAGES } from '../../../../domain/constants/auth/AuthMessages';

export class SignupStudent implements ISignupStudent {
    constructor(private studentRepo: IStudentRepository) { }

    async execute(studentData: any): Promise<{ accessToken: string; refreshToken: string }> {
        const { username, email, dob, password } = studentData;


        AuthValidator.validateSignupInput(studentData);

        // 1. Check if user exists
        const existingStudent = await this.studentRepo.findByEmail(email);
        if (existingStudent) {
            throw new Error(AUTH_MESSAGES.STUDENT_EXISTS);
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create Student Entity
        const newStudent = new Student(
            username,
            email,
            new Date(dob),
            hashedPassword
        );

        // 4. Save to Repo
        const savedStudent = await this.studentRepo.create(newStudent);

        // 5. Generate Tokens
        const payload = {
            id: savedStudent._id,
            email: savedStudent.email,
            role: 'student'
        };

        const accessToken = JwtService.generateAccessToken(payload);
        const refreshToken = JwtService.generateRefreshToken(payload);

        return { accessToken, refreshToken };
    }
}

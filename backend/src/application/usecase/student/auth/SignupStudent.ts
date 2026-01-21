import { IStudentRepository } from '../../../../domain/repositories/IStudentRepository';
import { ISignupStudent } from './ISignupStudent';
import { Student } from '../../../../domain/entities/Student';
import { JwtService } from '../../../../infrastructure/services/JwtService';
import bcrypt from 'bcryptjs';

export class SignupStudent implements ISignupStudent {
    constructor(private studentRepo: IStudentRepository) { }

    async execute(studentData: any): Promise<{ accessToken: string; refreshToken: string }> {
        const { username, email, dob, password } = studentData;

        // 0. Basic Validation
        if (!username || !email || !dob || !password) {
            throw new Error('All fields are required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // 1. Check if user exists
        const existingStudent = await this.studentRepo.findByEmail(email);
        if (existingStudent) {
            throw new Error('Student with this email already exists');
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

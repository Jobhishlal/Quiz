import { Student } from '../entities/Student';

export interface IStudentRepository {
    create(student: Student): Promise<Student>;
    findByEmail(email: string): Promise<Student | null>;
    // Add other methods as needed later, e.g., findById
}

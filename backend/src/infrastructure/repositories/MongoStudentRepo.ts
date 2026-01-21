import { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { Student } from '../../domain/entities/Student';
import { StudentModel } from '../schemas/StudentSchema';

export class MongoStudentRepo implements IStudentRepository {

    async create(student: Student): Promise<Student> {
        const newStudent = new StudentModel({
            username: student.username,
            email: student.email,
            dob: student.dob,
            password: student.password
        });
        const saved = await newStudent.save();
        return this.mapToEntity(saved);
    }

    async findByEmail(email: string): Promise<Student | null> {
        const doc = await StudentModel.findOne({ email });
        if (!doc) return null;
        return this.mapToEntity(doc);
    }

    private mapToEntity(doc: any): Student {
        return new Student(
            doc.username,
            doc.email,
            doc.dob,
            doc.password,
            doc._id.toString()
        );
    }
}

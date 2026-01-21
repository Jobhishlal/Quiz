import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentDocument extends Document {
    username: string;
    email: string;
    dob: Date;
    password?: string;
    isBlocked: boolean; 
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    password: { type: String, required: false }, 
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const StudentModel = mongoose.model<IStudentDocument>('Student', StudentSchema);

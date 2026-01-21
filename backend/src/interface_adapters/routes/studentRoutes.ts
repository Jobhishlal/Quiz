import { Router } from 'express';
import { StudentAuthController } from '../controllers/StudentAuthController';
import { SignupStudent } from '../../application/usecase/student/auth/SignupStudent';
import { LoginStudent } from '../../application/usecase/student/auth/LoginStudent';
import { MongoStudentRepo } from '../../infrastructure/repositories/MongoStudentRepo';

const studentRoutes = Router();

const studentRepo = new MongoStudentRepo();

const signupStudentUseCase = new SignupStudent(studentRepo);
const loginStudentUseCase = new LoginStudent(studentRepo);

const studentAuthController = new StudentAuthController(signupStudentUseCase, loginStudentUseCase);

studentRoutes.post('/signup', (req, res, next) => studentAuthController.signup(req, res, next));
studentRoutes.post('/login', (req, res, next) => studentAuthController.login(req, res, next));

export default studentRoutes;

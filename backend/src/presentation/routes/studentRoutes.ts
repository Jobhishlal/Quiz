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

// Quiz Result Dependencies
import { QuizResultController } from '../controllers/QuizResultController';
import { SubmitQuiz } from '../../application/usecase/student/quiz/SubmitQuiz';
import { MongoQuizResultRepo } from '../../infrastructure/repositories/MongoQuizResultRepo';
import { MongoQuizRepo } from '../../infrastructure/repositories/MongoQuizRepo';
import { protect } from '../../shared/middleware/AuthMiddleware';

import { GetStudentResults } from '../../application/usecase/student/quiz/GetStudentResults';

const quizRepo = new MongoQuizRepo();
const quizResultRepo = new MongoQuizResultRepo();
const submitQuizUseCase = new SubmitQuiz(quizRepo, quizResultRepo);
const getStudentResultsUseCase = new GetStudentResults(quizResultRepo);
const quizResultController = new QuizResultController(submitQuizUseCase, getStudentResultsUseCase);

studentRoutes.post('/signup', (req, res, next) => studentAuthController.signup(req, res, next));
studentRoutes.post('/login', (req, res, next) => studentAuthController.login(req, res, next));

// Protected Routes
studentRoutes.post('/quiz/submit', protect, (req, res, next) => quizResultController.submit(req, res, next));
studentRoutes.get('/quiz/results', protect, (req, res, next) => quizResultController.getResults(req, res, next));

export default studentRoutes;

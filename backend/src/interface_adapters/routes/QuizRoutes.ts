import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';
import { CreateQuiz } from '../../usecases/CreateQuiz';
import { GetQuizzes } from '../../usecases/GetQuizzes';
import { MongoQuizRepo } from '../../infrastructure/repositories/MongoQuizRepo';

const router = Router();

const quizRepo = new MongoQuizRepo();
const createQuizUseCase = new CreateQuiz(quizRepo);
const getQuizzesUseCase = new GetQuizzes(quizRepo);
const quizController = new QuizController(createQuizUseCase, getQuizzesUseCase);

router.post('/quiz', (req, res, next) => quizController.createQuiz(req, res, next));
router.get('/quiz', (req, res, next) => quizController.getQuizzes(req, res, next));

export default router;

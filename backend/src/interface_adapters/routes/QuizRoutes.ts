import { Router } from 'express';
import { QuizController } from '../controllers/QuizController';
import { CreateQuiz } from '../../application/usecase/admin/quiz/CreateQuiz';
import { GetQuizzes } from '../../application/usecase/admin/quiz/GetQuizzes';
import { GetQuizById } from '../../application/usecase/admin/quiz/GetQuizById';
import { UpdateQuiz } from '../../application/usecase/admin/quiz/UpdateQuiz';
import { DeleteQuiz } from '../../application/usecase/admin/quiz/DeleteQuiz';
import { MongoQuizRepo } from '../../infrastructure/repositories/MongoQuizRepo';

const router = Router();

const quizRepo = new MongoQuizRepo();
const createQuizUseCase = new CreateQuiz(quizRepo);
const getQuizzesUseCase = new GetQuizzes(quizRepo);
const getQuizByIdUseCase = new GetQuizById(quizRepo);
const updateQuizUseCase = new UpdateQuiz(quizRepo);
const deleteQuizUseCase = new DeleteQuiz(quizRepo);

const quizController = new QuizController(
    createQuizUseCase,
    getQuizzesUseCase,
    getQuizByIdUseCase,
    updateQuizUseCase,
    deleteQuizUseCase
);

router.post('/quiz', (req, res, next) => quizController.createQuiz(req, res, next));
router.get('/quiz', (req, res, next) => quizController.getQuizzes(req, res, next));
router.get('/quiz/:id', (req, res, next) => quizController.getQuizById(req, res, next));
router.put('/quiz/:id', (req, res, next) => quizController.updateQuiz(req, res, next));
router.delete('/quiz/:id', (req, res, next) => quizController.deleteQuiz(req, res, next));

export default router;

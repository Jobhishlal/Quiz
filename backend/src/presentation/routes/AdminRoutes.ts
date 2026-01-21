import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { LoginAdmin } from '../../application/usecase/admin/login/LoginAdmin';
import { EnvAdminRepository } from '../../infrastructure/repositories/EnvAdminRepository';

const router = Router();

// Dependency Injection Composition
const adminRepository = new EnvAdminRepository();
const loginAdmin = new LoginAdmin(adminRepository);
const adminController = new AdminController(loginAdmin);

// Routes
router.post('/login', (req, res, next) => adminController.login(req, res, next));

export default router;

import { Router } from 'express';
import { register, login, logout, createElection } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/logout', logout);
router.post('/createElection', createElection);

export default router;

import express, { RequestHandler } from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// Register route
router.post('/register', register as RequestHandler);

// Login route
router.post('/login', login as RequestHandler);

export default router; 
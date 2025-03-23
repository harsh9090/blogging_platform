import express from 'express';
import { getAllPosts, createPost, likePost } from '../controllers/postController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);

// Protected routes
router.post('/', auth, createPost as express.RequestHandler);
router.post('/:id/like', auth, likePost as express.RequestHandler);

export default router; 
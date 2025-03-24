import express from 'express';
import { getAllPosts, createPost, likePost, getComments, createComment, deleteComment } from '../controllers/postController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);

// Protected routes
router.post('/', auth, createPost as express.RequestHandler);
router.post('/:id/like', auth, likePost as express.RequestHandler);

// // Comment routes
router.get('/:id/comments', getComments);
router.post('/:id/comments', auth, createComment as express.RequestHandler);
router.delete('/comments/:id', auth, deleteComment as express.RequestHandler);

export default router; 
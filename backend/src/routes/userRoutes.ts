import express from 'express';
import { auth } from '../middleware/auth';
import { updateProfile, getUserPosts } from '../controllers/userController';

const router = express.Router();

// Get user's posts
router.get('/posts/:userId', getUserPosts);

// Update user profile
router.put('/:userId', auth, updateProfile as express.RequestHandler);

export default router; 
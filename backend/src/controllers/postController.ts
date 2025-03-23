import { Request, Response } from 'express';
import Post from '../models/Post';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'author',
        model: 'User',
        select: '-password',
        options: { lean: true }
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, content, imageUrl } = req.body;
    const post = new Post({
      title,
      content,
      imageUrl,
      author: req.user._id,
      likes: 0,
      likedBy: [],
    });
    await post.save();
    await post.populate({
      path: 'author',
      model: 'User',
      select: 'name avatar',
      options: { lean: true }
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const likePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = new mongoose.Types.ObjectId(req.userId.toString());
    const hasLiked = post.likedBy.some(id => id.equals(userId));

    if (hasLiked) {
      // Unlike the post
      post.likedBy = post.likedBy.filter(id => !id.equals(userId));
      post.likes -= 1;
    } else {
      // Like the post
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();
    await post.populate({
      path: 'author',
      model: 'User',
      select: 'name avatar',
      options: { lean: true }
    });
    res.json(post);
  } catch (error) {
    console.error('Error updating post likes:', error);
    res.status(500).json({ message: 'Error updating post likes' });
  }
}; 
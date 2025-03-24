import { Request, Response } from 'express';
import Post from '../models/Post';
import mongoose from 'mongoose';
import { IUser } from '../models/User';
import Comment from '../models/Comment';

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
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, content, imageUrl, category } = req.body;
    const post = new Post({
      title,
      content,
      imageUrl,
      author: req.userId,
      likes: 0,
      likedBy: [],
      category,
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

// Create a new comment
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.params;
    const { content } = req.body;

    // Check if post exists
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content,
      author: req.userId,
      post: id,
    });

    await comment.save();
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar');
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

// Delete a comment
export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.params;
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author of the comment
    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// Get comments for a post
export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ post: id })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
}; 
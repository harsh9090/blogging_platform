import { Request, Response } from 'express';
import { User } from '../models/User';
import Post from '../models/Post';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, bio } = req.body;

    // Check if user is updating their own profile
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, bio },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Error fetching user posts' });
  }
}; 
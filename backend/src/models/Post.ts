import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  imageUrl?: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  comments: Array<{
    user: IUser['_id'];
    content: string;
    createdAt: Date;
  }>;
  category: string;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    tags: [{
      type: String,
      trim: true
    }],
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Programming',
        'Web Development',
        'Mobile Development',
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science',
        'DevOps',
        'Cloud Computing',
        'Cybersecurity',
        'Blockchain',
        'UI/UX Design',
        'Product Management',
        'Business',
        'Career',
        'Personal Development',
        'Lifestyle',
        'Travel',
        'Food',
        'Other'
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Update the updatedAt timestamp before saving
postSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IPost>('Post', postSchema); 
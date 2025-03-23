'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import BlogPost from '@/components/BlogPost';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  likedBy: string[];
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string, userId: string) => {
    if (!user) {
      // You might want to show a login prompt here
      return;
    }
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        body: JSON.stringify({ userId: userId }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to like post');
      }

      const updatedPost = await response.json();
      
      // Update the posts state to reflect the new like count
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: updatedPost.likes, likedBy: updatedPost.likedBy }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontWeight: 700,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Latest Blog Posts
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
        {posts.map((post) => (
         
          <BlogPost
            key={post._id}
            title={post.title}
            content={post.content}
            author={post.author}
            createdAt={post.createdAt}
            likes={post.likes}
            id={post._id}
            onLike={() => handleLike(post._id, post.author._id)}
            isLiked={user ? post.likedBy?.includes(user._id) : false}
            
          />
        ))}
      </Box>
    </Container>
  );
} 
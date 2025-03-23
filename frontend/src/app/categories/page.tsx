'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
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
  category: string;
  likedBy: string[];
}

const categories = [
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
];

export default function CategoriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
      
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: updatedPost.likes, likedBy: updatedPost.likedBy }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  const getCategoryCount = (category: string) => {
    return posts.filter(post => post.category === category).length;
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
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 4,
        }}
      >
        Categories
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 4,
          height: 'calc(100vh - 200px)', // Adjust this value based on your header height
          overflow: 'hidden'
        }}
      >
        {/* Filter Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3,
            width: '20%',
            height: '100%',
            overflow: 'auto',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cbd5e1',
              borderRadius: '3px',
              '&:hover': {
                background: '#94a3b8',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#1e293b',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.9rem',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                  borderRadius: '2px',
                }}
              />
              Browse Categories
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Paper
              elevation={0}
              onClick={() => setSelectedCategory(null)}
              sx={{
                p: 1.5,
                cursor: 'pointer',
                background: selectedCategory === null 
                  ? 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)'
                  : '#f8fafc',
                color: selectedCategory === null ? 'white' : '#1e293b',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedCategory === null ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  background: selectedCategory === null
                    ? 'linear-gradient(135deg, #45B7AF 0%, #3CA39C 100%)'
                    : '#f1f5f9',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  All Posts
                </Typography>
                <Typography variant="caption" sx={{ opacity: selectedCategory === null ? 0.9 : 0.7, fontSize: '0.75rem' }}>
                  {posts.length}
                </Typography>
              </Box>
            </Paper>

            {categories.map((category) => (
              <Paper
                key={category}
                elevation={0}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  background: selectedCategory === category
                    ? 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)'
                    : '#f8fafc',
                  color: selectedCategory === category ? 'white' : '#1e293b',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedCategory === category ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    background: selectedCategory === category
                      ? 'linear-gradient(135deg, #45B7AF 0%, #3CA39C 100%)'
                      : '#f1f5f9',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {category}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: selectedCategory === category ? 0.9 : 0.7, fontSize: '0.75rem' }}>
                    {getCategoryCount(category)}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>

        {/* Posts Section */}
        <Box 
          sx={{ 
            width: '80%',
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cbd5e1',
              borderRadius: '3px',
              '&:hover': {
                background: '#94a3b8',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filteredPosts.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '16px',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No posts found in this category
                </Typography>
              </Paper>
            ) : (
              filteredPosts.map((post) => (
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
                  category={post.category}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 
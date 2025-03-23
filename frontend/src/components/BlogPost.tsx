import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Box,
  IconButton,
  Chip,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostProps {
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
  id: string;
  onLike: (postId: string) => void;
  isLiked?: boolean;
  category: string;
}

export default function BlogPost({
  title,
  content,
  author,
  createdAt,
  likes,
  id,
  onLike,
  isLiked: initialIsLiked,
  category,
}: BlogPostProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLiking, setIsLiking] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  // Calculate reading time
  useEffect(() => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    setReadingTime(Math.ceil(wordCount / wordsPerMinute));
  }, [content]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await onLike(id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      sx={{ 
        mb: 4,
        transition: 'all 0.3s ease-in-out',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(78, 205, 196, 0.3)',
        },
      }}
    >
      <CardHeader
        sx={{
          background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          pb: 2,
        }}
        avatar={
          <Avatar 
            src={author.avatar} 
            alt={author.username}
            sx={{ 
              width: 48, 
              height: 48,
              border: '3px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              bgcolor: author.avatar ? 'transparent' : 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
              color: author.avatar ? 'inherit' : '#fff',
              fontWeight: 600,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            {!author.avatar && getInitials(author.username)}
          </Avatar>
        }
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography 
                variant="subtitle1" 
                fontWeight="600"
                sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {author.username}
              </Typography>
              <Chip 
                label={formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                size="small"
                sx={{ 
                  background: 'rgba(78, 205, 196, 0.1)',
                  color: '#4ECDC4',
                  fontWeight: 500,
                  '& .MuiChip-label': {
                    fontSize: '0.75rem',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title="Reading time">
                <Chip
                  icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                  label={`${readingTime} min read`}
                  size="small"
                  sx={{ 
                    background: 'rgba(78, 205, 196, 0.1)',
                    color: '#4ECDC4',
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      fontSize: '0.75rem',
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Category">
                <Chip
                  icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                  label={category}
                  size="small"
                  sx={{ 
                    background: 'rgba(78, 205, 196, 0.1)',
                    color: '#4ECDC4',
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      fontSize: '0.75rem',
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 3,
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        
        <Box 
          sx={{ 
            mb: 3,
            lineHeight: 1.8,
            '& p': { mb: 2.5 },
            '& h1, & h2, & h3, & h4, & h5, & h6': { 
              mb: 2.5,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            },
            '& ul, & ol': { 
              pl: 3,
              mb: 2.5,
            },
            '& li': { mb: 1.5 },
            '& a': { 
              color: '#4ECDC4',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': { 
                color: '#45B7AF',
                textDecoration: 'underline',
              },
            },
            '& img': { 
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '12px',
              mb: 2.5,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
            '& blockquote': {
              borderLeft: '4px solid #4ECDC4',
              pl: 3,
              py: 2,
              my: 2.5,
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
              borderRadius: '0 12px 12px 0',
              fontStyle: 'italic',
            },
            '& code': {
              background: 'rgba(0,0,0,0.05)',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.9em',
            },
            '& pre': {
              background: 'rgba(0,0,0,0.05)',
              p: 2.5,
              borderRadius: '12px',
              overflow: 'auto',
              mb: 2.5,
              border: '1px solid rgba(0,0,0,0.05)',
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            mt: 3,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <IconButton 
            onClick={handleLike}
            disabled={isLiking}
            sx={{ 
              color: isLiked ? '#FF6B6B' : 'text.secondary',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: '#FF6B6B',
                transform: 'scale(1.1)',
              },
            }}
          >
            {isLiking ? (
              <CircularProgress size={24} />
            ) : isLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {likes} {likes === 1 ? 'like' : 'likes'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 
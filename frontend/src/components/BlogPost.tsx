import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Box,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
}

export default function BlogPost({
  title,
  content,
  author,
  createdAt,
  likes,
  id,
  onLike,
  isLiked: initialIsLiked = false,
}: BlogPostProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLiking, setIsLiking] = useState(false);

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
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            src={author.avatar} 
            alt={author.username}
            sx={{ 
              width: 40, 
              height: 40,
              border: '2px solid #fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              bgcolor: author.avatar ? 'transparent' : '#4ECDC4',
              color: author.avatar ? 'inherit' : '#fff',
              fontWeight: 600,
            }}
          >
            {!author.avatar && getInitials(author.username)}
          </Avatar>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {author.username}
            </Typography>
            <Chip 
              label={formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0,0,0,0.05)',
                '& .MuiChip-label': {
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                },
              }}
            />
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: '#1e293b',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Box 
          sx={{ 
            mb: 2,
            lineHeight: 1.7,
            '& p': { mb: 2 },
            '& h1, & h2, & h3, & h4, & h5, & h6': { 
              mb: 2,
              fontWeight: 600,
              color: '#1e293b',
            },
            '& ul, & ol': { 
              pl: 3,
              mb: 2,
            },
            '& li': { mb: 1 },
            '& a': { 
              color: '#4ECDC4',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            '& img': { 
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 1,
              mb: 2,
            },
            '& blockquote': {
              borderLeft: '4px solid #4ECDC4',
              pl: 2,
              py: 1,
              my: 2,
              backgroundColor: 'rgba(78, 205, 196, 0.1)',
              fontStyle: 'italic',
            },
            '& code': {
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '0.2em 0.4em',
              borderRadius: 0.25,
              fontFamily: 'monospace',
            },
            '& pre': {
              backgroundColor: 'rgba(0,0,0,0.05)',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              mb: 2,
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={handleLike}
            disabled={isLiking}
            sx={{ 
              color: isLiked ? '#FF6B6B' : 'text.secondary',
              '&:hover': {
                color: '#FF6B6B',
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
          <Typography variant="body2" color="text.secondary">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 
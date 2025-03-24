import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

interface CommentProps {
  postId: string;
  comments: {
    _id: string;
    content: string;
    author: {
      _id: string;
      username: string;
      avatar?: string;
    };
    createdAt: string;
  }[];
  onCommentAdded: () => void;
}

export default function Comment({ postId, comments, onCommentAdded }: CommentProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      setNewComment('');
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      onCommentAdded();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, commentId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleDeleteClick = () => {
    if (selectedCommentId) {
      handleDelete(selectedCommentId);
      handleMenuClose();
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
    <Box sx={{ mt: 3 }}>
      {user && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !newComment.trim()}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #45B7AF 0%, #3CA39C 100%)',
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Post Comment'}
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        {comments.map((comment) => (
          <Box key={comment._id}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar
                src={comment.author.avatar}
                alt={comment.author.username}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: comment.author.avatar ? 'transparent' : 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                }}
              >
                {!comment.author.avatar && getInitials(comment.author.username)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {comment.author.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </Typography>
                  {user && user._id === comment.author._id && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, comment._id)}
                      sx={{ ml: 'auto' }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {comment.content}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteClick} sx={{ color: '#ef4444' }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
} 
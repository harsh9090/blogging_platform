'use client';

import { Card, CardContent, CardActions, Typography, IconButton, Stack, Avatar, Divider, Tooltip, Link as MuiLink } from '@mui/material';
import { Favorite, FavoriteBorder, Comment, BookmarkBorder, Share } from '@mui/icons-material';
import Link from 'next/link';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
  isAuthenticated: boolean;
}

export default function PostCard({ post, isAuthenticated }: PostCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card 
      sx={{ 
        mb: 3,
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {getInitials(post.author)}
          </Avatar>
          <Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {post.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>

        <MuiLink
          component={Link}
          href={`/posts/${post._id}`}
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            {post.title}
          </Typography>
        </MuiLink>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {post.content}
        </Typography>

        <Divider sx={{ my: 2 }} />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        {isAuthenticated ? (
          <>
            <Tooltip title="Like">
              <IconButton size="small">
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
            <Tooltip title="Comment">
              <IconButton size="small">
                <Comment />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton size="small">
                <BookmarkBorder />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton size="small">
                <Share />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <MuiLink
            component={Link}
            href="/login"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            Login to interact
          </MuiLink>
        )}
      </CardActions>
    </Card>
  );
} 
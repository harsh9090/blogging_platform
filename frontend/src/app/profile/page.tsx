'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tab,
  Tabs,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import BlogPost from '@/components/BlogPost';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { user, updateUser, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
      setEditForm({
        username: user.username,
        email: user.email,
        bio: user.bio || '',
      });
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/posts/${user?._id}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    setIsEditing(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      updateUser(data);
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (authLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Please log in to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(78, 205, 196, 0.2)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={user.avatar}
                alt={user.username}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  bgcolor: user.avatar ? 'transparent' : 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                }}
              >
                {!user.avatar && user.username.slice(0, 2).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {user.username}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {user.bio || 'No bio yet'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setOpenEditDialog(true)}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    borderColor: '#4ECDC4',
                    color: '#4ECDC4',
                    '&:hover': {
                      borderColor: '#45B7AF',
                      backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Tabs */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Posts" />
              <Tab label="Comments" />
            </Tabs>
          </Box>
        </Grid>

        {/* Tab Panels */}
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : posts.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No posts yet
              </Typography>
            ) : (
              posts.map((post) => (
                <BlogPost
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  createdAt={post.createdAt}
                  likes={post.likes}
                  category={post.category}
                  onLike={() => {}}
                />
              ))
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography align="center" color="text.secondary">
              Comments feature coming soon
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography align="center" color="text.secondary">
              Settings feature coming soon
            </Typography>
          </TabPanel>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              value={editForm.username}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              fullWidth
              disabled
            />
            <TextField
              label="Bio"
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button
            onClick={handleEditProfile}
            variant="contained"
            disabled={isEditing}
            sx={{
              background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #45B7AF 0%, #3CA39C 100%)',
              },
            }}
          >
            {isEditing ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 
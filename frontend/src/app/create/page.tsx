'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatQuote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

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

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-blue-500 hover:text-blue-700',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to create a post');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: editor?.getHTML() || '',
          category,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create post');
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImage = useCallback(() => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
        }}
      >
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
          Create New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#4ECDC4',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#4ECDC4',
                  },
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="category"
                onChange={(e) => setCategory(e.target.value)}
                required
                sx={{
                  borderRadius: '12px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4ECDC4',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4ECDC4',
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ 
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              '&:hover': {
                borderColor: '#4ECDC4',
              },
            }}>
              <Box sx={{ 
                p: 1, 
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                bgcolor: 'rgba(0, 0, 0, 0.02)',
              }}>
                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('bold') ? 'bold' : ''}
                  onChange={() => editor.chain().focus().toggleBold().run()}
                >
                  <ToggleButton value="bold" aria-label="bold">
                    <FormatBold />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('italic') ? 'italic' : ''}
                  onChange={() => editor.chain().focus().toggleItalic().run()}
                >
                  <ToggleButton value="italic" aria-label="italic">
                    <FormatItalic />
                  </ToggleButton>
                </ToggleButtonGroup>

                <Divider orientation="vertical" flexItem />

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('bulletList') ? 'bullet' : ''}
                  onChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <ToggleButton value="bullet" aria-label="bullet list">
                    <FormatListBulleted />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('orderedList') ? 'number' : ''}
                  onChange={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ToggleButton value="number" aria-label="numbered list">
                    <FormatListNumbered />
                  </ToggleButton>
                </ToggleButtonGroup>

                <Divider orientation="vertical" flexItem />

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive({ textAlign: 'left' }) ? 'left' : ''}
                  onChange={() => editor.chain().focus().setTextAlign('left').run()}
                >
                  <ToggleButton value="left" aria-label="left align">
                    <FormatAlignLeft />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive({ textAlign: 'center' }) ? 'center' : ''}
                  onChange={() => editor.chain().focus().setTextAlign('center').run()}
                >
                  <ToggleButton value="center" aria-label="center align">
                    <FormatAlignCenter />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive({ textAlign: 'right' }) ? 'right' : ''}
                  onChange={() => editor.chain().focus().setTextAlign('right').run()}
                >
                  <ToggleButton value="right" aria-label="right align">
                    <FormatAlignRight />
                  </ToggleButton>
                </ToggleButtonGroup>

                <Divider orientation="vertical" flexItem />

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('blockquote') ? 'quote' : ''}
                  onChange={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  <ToggleButton value="quote" aria-label="quote">
                    <FormatQuote />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup 
                  size="small" 
                  value={editor.isActive('codeBlock') ? 'code' : ''}
                  onChange={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <ToggleButton value="code" aria-label="code">
                    <Code />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small" value="">
                  <ToggleButton value="" onClick={addLink} aria-label="link">
                    <LinkIcon />
                  </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small" value="">
                  <ToggleButton value="" onClick={addImage} aria-label="image">
                    <ImageIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ p: 2, minHeight: '300px' }}>
                <EditorContent editor={editor} />
              </Box>
            </Box>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45B7AF 0%, #3CA29B 100%)',
                },
                '&:disabled': {
                  background: 'rgba(78, 205, 196, 0.5)',
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Post'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
} 
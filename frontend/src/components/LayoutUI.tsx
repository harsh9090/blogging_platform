'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
];

export default function LayoutUI({ children }: { children: React.ReactNode }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(69, 183, 209, 0.1) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Floating Elements */}
      <Box
        sx={{
          position: 'fixed',
          top: '10%',
          left: '10%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,107,107,0.2) 0%, rgba(255,107,107,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          animation: 'float 15s ease-in-out infinite',
          zIndex: 0,
          opacity: 0.7,
          willChange: 'transform',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '10%',
          right: '10%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(78,205,196,0.2) 0%, rgba(78,205,196,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          animation: 'float 20s ease-in-out infinite reverse',
          zIndex: 0,
          opacity: 0.7,
          willChange: 'transform',
        }}
      />

      {/* Content Container */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <AppBar 
          position="sticky" 
          color="default"
          elevation={0}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ px: 0 }}>
              {/* Desktop Logo */}
              <Typography
                variant="h6"
                noWrap
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#1e293b',
                  textDecoration: 'none',
                }}
              >
                BLOG
              </Typography>

              {/* Mobile Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ color: '#1e293b' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiPaper-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <MenuItem component={Link} href="/" sx={{ color: 'text.primary' }}>
                    Home
                  </MenuItem>
                  <MenuItem component={Link} href="/create-post" sx={{ color: 'text.primary' }}>
                    Create Post
                  </MenuItem>
                  <MenuItem component={Link} href="/profile" sx={{ color: 'text.primary' }}>
                    Profile
                  </MenuItem>
                </Menu>
              </Box>

              {/* Mobile Logo */}
              <Typography
                variant="h5"
                noWrap
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#1e293b',
                  textDecoration: 'none',
                }}
              >
                BLOG
              </Typography>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                {pages.map((page) => (
                  <Link key={page.title} href={page.path} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: '#1e293b',
                        display: 'block',
                        '&:hover': {
                          color: '#64748b',
                        },
                      }}
                    >
                      {page.title}
                    </Button>
                  </Link>
                ))}
              </Box>

              {/* User Menu */}
              <Box sx={{ flexGrow: 0, ml: 2 }}>
                {user ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ 
                        mt: '45px',
                        '& .MuiPaper-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                        },
                      }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem component={Link} href="/" sx={{ color: 'text.primary' }}>
                        Home
                      </MenuItem>
                      <MenuItem component={Link} href="/create-post" sx={{ color: 'text.primary' }}>
                        Create Post
                      </MenuItem>
                      <MenuItem component={Link} href="/profile" sx={{ color: 'text.primary' }}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center" sx={{ color: '#1e293b' }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: '#1e293b',
                          borderColor: '#1e293b',
                          '&:hover': {
                            borderColor: '#64748b',
                            color: '#64748b',
                          },
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FF5252 30%, #45B7D1 90%)',
                          },
                        }}
                      >
                        Register
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 
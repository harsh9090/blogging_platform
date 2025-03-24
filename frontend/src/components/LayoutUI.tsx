'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Create as CreateIcon,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export default function LayoutUI({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Left side - Logo and Navigation */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  BlogHub
                </Typography>
              </Link>

              {!isMobile && (
                <Stack direction="row" spacing={1}>
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button
                      color="inherit"
                      sx={{
                        color: isActive('/') ? '#4ECDC4' : '#1e293b',
                        '&:hover': {
                          color: '#4ECDC4',
                        },
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                  
                  <Link href="/categories" style={{ textDecoration: 'none' }}>
                    <Button
                      color="inherit"
                      sx={{
                        color: isActive('/categories') ? '#4ECDC4' : '#1e293b',
                        '&:hover': {
                          color: '#4ECDC4',
                        },
                      }}
                    >
                      Categories
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>

            {/* Right side - Search, Create Post, Notifications, and User Menu */}
            <Stack direction="row" spacing={1} alignItems="center">
              {/* <IconButton sx={{ color: '#1e293b' }}>
                <SearchIcon />
              </IconButton> */}

              {user ? (
                <>
                  <Link href="/create" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      startIcon={<CreateIcon />}
                      sx={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #45B7AF 0%, #3CA29B 100%)',
                        },
                      }}
                    >
                      Create Post
                    </Button>
                  </Link>

                  <IconButton sx={{ color: '#1e293b' }}>
                    <NotificationsIcon />
                  </IconButton>

                  <IconButton
                    onClick={handleMenu}
                    sx={{ color: '#1e293b' }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#4ECDC4',
                        fontSize: '0.875rem',
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Link href="/login" style={{ textDecoration: 'none' }}>
                    <Button
                      color="inherit"
                      sx={{
                        color: isActive('/login') ? '#4ECDC4' : '#1e293b',
                        '&:hover': {
                          color: '#4ECDC4',
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
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #45B7AF 0%, #3CA29B 100%)',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Stack>
              )}

              {isMobile && (
                <IconButton
                  edge="end"
                  onClick={handleMenu}
                  sx={{ color: '#1e293b' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: '12px',
                  minWidth: 200,
                },
              }}
            >
              {user ? [
                
                <MenuItem 
                  key="profile"
                  component={Link} 
                  href="/profile" 
                  onClick={handleClose}
                  sx={{
                    color: isActive('/profile') ? '#4ECDC4' : '#1e293b',
                    '&:hover': {
                      color: '#4ECDC4',
                    },
                  }}
                >
                  Profile
                </MenuItem>,
                
                <MenuItem 
                  key="logout"
                  onClick={handleLogout}
                  sx={{
                    color: '#1e293b',
                    '&:hover': {
                      color: '#4ECDC4',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              ] : [
                <MenuItem 
                  key="login"
                  component={Link} 
                  href="/login" 
                  onClick={handleClose}
                  sx={{
                    color: isActive('/login') ? '#4ECDC4' : '#1e293b',
                    '&:hover': {
                      color: '#4ECDC4',
                    },
                  }}
                >
                  Login
                </MenuItem>,
                <MenuItem 
                  key="register"
                  component={Link} 
                  href="/register" 
                  onClick={handleClose}
                  sx={{
                    color: isActive('/register') ? '#4ECDC4' : '#1e293b',
                    '&:hover': {
                      color: '#4ECDC4',
                    },
                  }}
                >
                  Sign Up
                </MenuItem>
              ]}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
} 
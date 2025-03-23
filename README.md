# Blog Website

A modern blogging platform built with Next.js and Node.js, featuring a beautiful UI and rich text editing capabilities.

## Project Structure

- `frontend/`: Next.js frontend application with TypeScript
- `backend/`: Node.js backend application with Express and MongoDB

## Features

### Implemented
- Modern and responsive UI with Material-UI components
- User authentication (Register/Login)
- Blog post creation with rich text editor (TipTap)
- Like functionality for posts
- Author information display
- Responsive layout with mobile menu
- Beautiful gradient backgrounds and animations

### Coming Soon
- Comments system
- Image upload support
- User profiles
- Post categories and tags

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Material-UI
- TipTap (Rich Text Editor)
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- TypeScript

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (protected)
- `POST /api/posts/:id/like` - Like/unlike a post (protected)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

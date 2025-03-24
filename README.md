# Blog Website

A modern, full-stack blog website built with Next.js, TypeScript, and Node.js.

## Features

### User Authentication

- User registration with email and password
- Secure login system with JWT authentication
- Protected routes for authenticated users
- Persistent authentication state

### Blog Posts

- Create, read, update, and delete blog posts
- Rich text editor for post content
- Category-based organization
- Like/unlike functionality
- Responsive design for all screen sizes

### Comments System

- Add comments to blog posts
- View all comments on a post
- Delete your own comments
- Real-time comment count updates
- Author information display in comments

### User Profiles

- View user profiles with posts and comments
- Edit profile information (username, bio)
- Avatar support with fallback initials
- Tabbed interface for posts and comments
- Responsive profile layout

### UI/UX

- Modern, clean design with Material-UI
- Smooth transitions and animations
- Loading states and error handling
- Responsive layout for all devices
- Dark mode support

## Problem Solving

### What Makes This Platform Different?

*Unlike traditional blogging platforms, this solution addresses several key challenges:*

1. ***Advanced Content Formatting***

   - *Rich text editor with custom formatting options*
   - *Code blocks with syntax highlighting and live preview*
   - *Interactive diagrams and flowcharts*
   - *Mathematical equations with LaTeX support*
   - *Custom HTML/CSS injection for unique layouts*
   - *Embedded interactive components*
   - *Table of contents with auto-scroll*
   - *Custom font and style options*
2. ***Community-Driven Learning***

   - *Peer review system for technical content*
   - *Community-driven content improvement*
   - *Expert verification badges*
   - *Knowledge sharing rewards*
   - *Collaborative content creation*
   - *Community challenges and achievements*
   - *Skill-based content recommendations*
   - *Mentorship matching system*
3. ***Content Organization***

   - *Hierarchical content structure*
   - *Custom taxonomies and tags*
   - *Content versioning and history*
   - *Related content suggestions*
   - *Content branching for different audiences*
   - *Multi-language support*
   - *Content templates and snippets*
   - *Bulk content management*
4. ***Interactive Features***

   - *Live code execution environment*
   - *Interactive quizzes and assessments*
   - *Progress tracking system*
   - *Achievement badges*
   - *Community voting and feedback*
   - *Content difficulty ratings*
   - *Learning path customization*
   - *Interactive tutorials*

### Real-World Applications

*This platform is particularly well-suited for:*

- *Technical documentation with interactive code examples*
- *Educational content with built-in assessments*
- *Developer tutorials with live coding environments*
- *Research papers with mathematical equations*
- *Product documentation with interactive demos*
- *Community-driven learning platforms*
- *Professional knowledge bases*
- *Interactive coding bootcamps*

### Unique Value Proposition

1. ***For Content Creators***

   - *Advanced formatting options for unique content*
   - *Community engagement tools*
   - *Content analytics and insights*
   - *Monetization flexibility*
   - *Collaborative writing features*
2. ***For Readers***

   - *Interactive learning experience*
   - *Community-driven content quality*
   - *Personalized learning paths*
   - *Progress tracking*
   - *Knowledge assessment tools*
3. ***For Communities***

   - *Expert verification system*
   - *Content quality standards*
   - *Community challenges*
   - *Collaborative spaces*
   - *Knowledge sharing rewards*

## Tech Stack

### Frontend

- Next.js 14 with App Router
- TypeScript
- Material-UI (MUI)
- React Context for state management
- Axios for API calls

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Express middleware for request handling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-website.git
cd blog-website
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
   Create `.env` files in both frontend and backend directories:

Frontend `.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Backend `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
blog-website/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── types/
│   └── public/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    └── dist/
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Posts

- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create new post
- PUT `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post
- GET `/api/posts/:id/comments` - Get post comments
- POST `/api/posts/:id/comments` - Add comment to post
- DELETE `/api/posts/comments/:id` - Delete comment

### Users

- GET `/api/users/:id` - Get user profile
- PUT `/api/users/:id` - Update user profile
- GET `/api/users/posts/:id` - Get user's posts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

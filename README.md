# Personal Blog Platform

## Overview

This is a personal blog platform where users can sign up, log in, and post articles. Users can view all posts and filter them by author. The project is built with a Node.js/Express backend and a Next.js 14/TypeScript frontend.

## Features

### Backend (Node.js/Express)

#### API Endpoints:

**POST /signup** - Register a new user with email and password.

**POST /login** - Authenticate a user and return a session token.

**POST /post** - Allows authenticated users to post a new article.

**GET /posts** - Retrieve all posts.

**GET /posts?author=userId** - Retrieve posts by a specific author.

**DELETE /post/:id** - Delete post.

**GET /post/:id** - Retrieve post by id.

#### Data Models:

**User**: id, email, passwordHash

**Post**: id, title, content, authorId, createdAt

#### Authentication:

JWT-based authentication.

Secure password storage using hashing.

### Frontend (Next.js 14/TypeScript)

#### Pages:

**/** - Homepage that lists all blog posts.

**/login** - Login page.

**/signup** - Sign-up page.

**/dashboard** - Private route for posting and viewing user’s own articles.

**/[id]** - View Blog

#### Features:

Server-side rendering for the homepage and individual blog page.

Static generation for blog posts where applicable.

Client-side routing and protected routes.

Responsive UI using SHADCNUI.

AI Companion to help in writing blog.


## Prerequisites

Ensure you have the following installed:

Node.js (v16+ recommended)

npm

MongoDB (or use a cloud database like MongoDB Atlas)

## Run Locally

Clone the project

```bash
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ACCESS_TOKEN_SECRET=your_access_token
   ACCESS_TOKEN_EXPIRY=your_access_token_expiry
   CORS_ORIGIN=cors_origin
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd app
   ```
2. Install dependencies:
   ```sh
   npm install --force
   ```
3. Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_BACKEND=http://localhost:5000
   NEXT_PUBLIC_GEMINI_API_KEY=your-api-key
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```



## Project Structure
```
blog-platform/
│── backend/            # Node.js + Express backend
│   ├── .env           # Environment variables
│   ├── src/         # Mongoose models (User, Post)
│        ├── models/         # Mongoose models (User, Post)
│        ├── routes/         # API routes
│        ├── controllers/    # Request handlers
│        ├── middleware/     # Authentication middleware
│        ├── app.js       # Entry point
│
│── frontend/           # Next.js 14 + TypeScript frontend
│   ├── components/     # Reusable UI components
│   ├── app/          # Next.js app(Home, Login, Signup, Dashboard)
│   ├── styles/         # CSS Modules or styled-components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Helper functions
│   └── .env.local      # Environment variables
│
│── README.md           # Project documentation
│── package.json        # Project dependencies
│── .gitignore          # Files to ignore in version control
```


## Tech Stack

**Client:** Next - App router, Redux, TailwindCSS, ShadCN UI, Quill, Zod

**Server:** Node, Express
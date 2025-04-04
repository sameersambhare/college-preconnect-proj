# College PreConnect

A comprehensive platform designed to facilitate seamless connections among newly enrolled engineering students, enabling them to collaborate, share resources, and build lasting academic relationships.

## Overview

College PreConnect addresses the critical transition period for new engineering students by providing a robust digital ecosystem that supports academic integration and social networking. The platform leverages advanced technologies to create an environment where students can:

- Find compatible roommates based on academic and personal preferences
- Engage in specialized community spaces for collaborative learning
- Exchange academic resources and materials
- Build meaningful connections with peers in their field of study

## Features

### User Management
- Secure authentication and authorization through Clerk
- Comprehensive user profiles with academic details and preferences
- Onboarding process for new users

### Connection System
- Smart matching algorithm for roommate compatibility
- Connection request management system
- Friend/connection tracking and management

### Community Engagement
- Specialized community spaces organized by academic interests
- Resource sharing capabilities
- Collaborative project workspaces

### Communication
- Real-time messaging between connected users
- Notification system for connection updates
- Chat history management

### User Experience
- Responsive design optimized for all devices
- Intuitive navigation and user flow
- Modern, accessible interface

## Technical Architecture

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4 with custom design system
- **Components**: Custom UI components built on Radix UI primitives
- **State Management**: React Context API

### Backend
- **API**: Next.js API routes (serverless architecture)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk authentication service
- **Real-time Communication**: Pusher

### Development Tools
- **Form Handling**: React Hook Form with Zod validation
- **TypeScript**: Full type safety throughout the application
- **Docker**: Containerization for consistent development and deployment

## Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- MongoDB database (Atlas cluster recommended)
- Clerk account for authentication services
- Pusher account for real-time features (optional)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/college-preconnect.git
   cd college-preconnect
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # MongoDB Configuration
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   
   # Clerk Authentication
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile
   
   # Optional: Pusher Configuration (for real-time features)
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Deployment

### Vercel Deployment
The recommended deployment method is using the Vercel Platform:

1. Push your code to a GitHub repository
2. Import the project in the Vercel dashboard
3. Configure environment variables
4. Deploy

### Docker Deployment
For containerized deployment:

1. Build the Docker image
   ```bash
   docker build -t college-preconnect .
   ```

2. Run the container
   ```bash
   docker run -p 3000:3000 --env-file .env.local college-preconnect
   ```

## Architecture Decisions

- **Next.js**: Chosen for its server-side rendering capabilities, API routes, and optimized performance
- **MongoDB**: Selected for flexible schema design and scalability
- **Clerk**: Implemented for robust authentication and user management
- **TypeScript**: Utilized for type safety and improved developer experience

## Contributing

We welcome contributions to enhance College PreConnect. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request with detailed description

## License

This project is licensed. See the LICENSE file for details.

## Contact

For inquiries or support, please contact:

Project Maintainer - sameersambhare@gmail.com

Project Repository: [https://github.com/yourusername/college-preconnect](https://github.com/sameersambhare/college-preconnect-proj)

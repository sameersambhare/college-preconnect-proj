# College PreConnect

A platform designed to help newly enrolled engineering students connect, collaborate, and thrive in their academic journey.

## 🌟 Overview

College PreConnect is a web platform that enables engineering students to build a supportive community from day one. The platform facilitates:

- **Roommate Matching**: Find compatible roommates based on shared interests and preferences
- **Community Spaces**: Collaborate on projects and academic challenges with like-minded peers
- **Resource Sharing**: Exchange notes, study materials, and academic resources

## 🚀 Features

- User authentication and profile management
- Roommate matching based on preferences
- Community spaces for collaboration
- Resource sharing functionality
- Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Authentication**: Clerk
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Radix UI primitives

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- MongoDB database (local or Atlas)

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/college-preconnect-final.git
   cd college-preconnect-final
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🚀 Deployment

The easiest way to deploy your College PreConnect app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/college-preconnect-final](https://github.com/yourusername/college-preconnect-final)

# 🎓 Student Placement Management Portal

A modern, full-stack web application designed to streamline campus placement processes for students and placement coordinators. Built with React, TypeScript, Node.js, and MongoDB Atlas.

[![TypeScript](https://img.shields.io/badge/TypeScript-90.6%25-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-7.0%25-f7df1e?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-1.9%25-1572b6?logo=css3)](https://www.w3.org/Style/CSS/)
[![HTML](https://img.shields.io/badge/HTML-0.5%25-e34f26?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)

## 🌐 Live Demo

- **Frontend**: [https://placement-portal-sand.vercel.app](https://placement-portal-sand.vercel.app)
- **Backend API**: [https://placement-portal-ares.onrender.com](https://placement-portal-ares.onrender.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Students
- 🔐 **Secure Authentication** - JWT-based login with email verification
- 📊 **Interactive Dashboard** - Real-time statistics and placement overview
- 💼 **Job Listings** - Browse and search available placement opportunities
- 📝 **Application Tracking** - Monitor application status (Applied → Interview → Accepted/Rejected)
- 🏢 **Company Directory** - Explore partner companies and their openings
- 👤 **Profile Management** - Update personal information, skills, and resume
- 📧 **Email Notifications** - Automated updates on application status

### Technical Features
- ⚡ **Real-time Updates** - Dynamic data fetching with MongoDB Atlas
- 🎨 **Modern UI/UX** - Built with shadcn/ui and Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🔒 **Secure** - Password hashing, JWT tokens, protected routes
- 🌐 **Cloud-Hosted** - Deployed on Vercel (Frontend) and Render (Backend)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building interactive interfaces |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **Vite** | Fast build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Beautifully designed component library |
| **Lucide React** | Modern icon library |
| **TanStack Query** | Data fetching and caching |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web application framework |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Token authentication |
| **bcryptjs** | Password hashing |
| **Resend** | Email service for verification |

### Development Tools
- **ESLint** - Code linting
- **Vite** - Fast development server
- **TypeScript** - Type checking
- **Git** - Version control

---

## 📁 Project Structure

```
placement-portal/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── JobCard.tsx
│   │   └── ...
│   ├── contexts/                 # React context providers
│   │   └── AuthContext.tsx       # Authentication context
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Dashboard
│   │   ├── Login.tsx             # Login/Signup
│   │   ├── Jobs.tsx              # Job listings
│   │   ├── Applications.tsx      # Application tracker
│   │   ├── Companies.tsx         # Company directory
│   │   └── VerifyEmail.tsx       # Email verification
│   ├── types/                    # TypeScript type definitions
│   │   └── assets.d.ts
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
│
├── server/                       # Backend source code
│   ├── config/                   # Configuration files
│   │   └── db.js                 # MongoDB connection
│   ├── routes/                   # API routes
│   │   └── auth.js               # Authentication routes
│   ├── models/                   # Database models
│   └── index.js                  # Express server entry point
│
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/placement-portal.git
   cd placement-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your credentials (see [Environment Variables](#-environment-variables))

4. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Whitelist your IP (`0.0.0.0/0` for development)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/placement_portal?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080

# API URL (for frontend - create .env.local)
VITE_API_URL=http://localhost:5000/api
```

### For Frontend (create `.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Running the Application

### Development Mode

You have **3 options** to run the application:

#### Option 1: Run Both Frontend + Backend Together
```bash
npm run dev:all
```

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend will run on: `http://localhost:8080`

**Terminal 2 - Backend:**
```bash
npm run server
```
Backend will run on: `http://localhost:5000`

#### Option 3: Frontend Only
```bash
npm run dev
```

### Production Build

```bash
# Build frontend for production
npm run build

# Preview production build
npm run preview
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new student |
| POST | `/api/auth/login` | Student login |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/resend-verification` | Resend verification code |
| GET | `/api/auth/verify` | Verify JWT token |

### Student
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/student/profile` | Get student profile | ✅ |
| PUT | `/api/student/profile` | Update student profile | ✅ |

### Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jobs` | Get all active jobs | ✅ |
| GET | `/api/jobs/:id` | Get specific job | ✅ |
| POST | `/api/jobs` | Create new job (admin) | ✅ |

### Applications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/applications` | Submit job application | ✅ |
| GET | `/api/applications` | Get student applications | ✅ |
| GET | `/api/applications/:id` | Get application details | ✅ |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

---

## 💾 Database Schema

### Student Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  rollNumber: String (unique),
  department: String,
  cgpa: Number,
  skills: [String],
  phone: String,
  isVerified: Boolean,
  verificationCode: String,
  createdAt: Date
}
```

### Job Collection
```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  location: String,
  salary: String,
  deadline: Date,
  requirements: String,
  description: String,
  eligibleDepartments: [String],
  minCGPA: Number,
  isActive: Boolean,
  createdAt: Date
}
```

### Application Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  jobId: ObjectId (ref: Job),
  status: Enum ['applied', 'shortlisted', 'interview', 'accepted', 'rejected'],
  appliedDate: Date,
  coverLetter: String
}
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
6. Deploy! ✅

### Backend (Render)

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
4. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   RESEND_API_KEY=your_resend_key
   ```
5. Deploy! ✅

### Database (MongoDB Atlas)

1. Already cloud-hosted ✅
2. Make sure to whitelist Render's IP: `0.0.0.0/0`
3. Connection string added to Render environment variables

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Job Listings
![Jobs](screenshots/jobs.png)

### Application Tracker
![Applications](screenshots/applications.png)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server (Vite) |
| `npm run server` | Start backend server (Node.js) |
| `npm run dev:all` | Run both frontend and backend concurrently |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## 🔒 Security

- Passwords are hashed using **bcryptjs** (10 salt rounds)
- JWT tokens expire after **24 hours**
- All API routes are protected with authentication middleware
- Environment variables keep sensitive data secure
- CORS configured to allow only trusted origins
- MongoDB connection uses secure SSL/TLS

---

## 🐛 Known Issues

- Email verification might go to spam folder (using free tier)
- Render free tier may have cold starts (15-30 second delay after inactivity)

---

## 🚧 Future Enhancements

- [ ] Admin dashboard for placement coordinators
- [ ] Resume upload and parsing
- [ ] Interview scheduling system
- [ ] Real-time notifications with WebSockets
- [ ] Analytics and placement statistics
- [ ] Multi-factor authentication (MFA)
- [ ] Mobile app with React Native
- [ ] AI-powered job recommendations

---

## 📞 Support

For support, email: albinusliting@gmail.com

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for icons
- [Vercel](https://vercel.com/) for hosting
- [Render](https://render.com/) for backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database

---

<div align="center">

**Built with ❤️ for college campus placement management**

[⬆ Back to Top](#-student-placement-management-portal)

</div>
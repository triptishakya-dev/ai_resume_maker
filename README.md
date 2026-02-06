# 🚀 AI Resume Maker

An intelligent resume analysis and optimization platform powered by Google's Generative AI. Upload your resume, get instant AI-powered feedback, and track your job applications with comprehensive scoring across multiple dimensions.

---

## 📋 About the Project

**AI Resume Maker** is a modern web application designed to help job seekers optimize their resumes for specific job applications. By leveraging advanced AI technology, the platform analyzes resumes against job descriptions and provides detailed feedback on ATS compatibility, content quality, tone, structure, and skills alignment.

The application features a beautiful, responsive dashboard where users can track all their resume submissions, view AI-generated scores, and access actionable improvement tips to increase their chances of landing interviews.

---

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Comprehensive Scoring**: Get detailed scores across 5 key dimensions:
  - **ATS Compatibility**: Ensure your resume passes Applicant Tracking Systems
  - **Content Quality**: Evaluate the relevance and impact of your content
  - **Tone & Style**: Assess professional language and presentation
  - **Structure**: Analyze organization and formatting
  - **Skills Alignment**: Match your skills with job requirements

### 📊 Interactive Dashboard
- **Visual Score Cards**: Beautiful, color-coded score visualizations
- **Resume Tracking**: Monitor all your job applications in one place
- **Detailed Feedback**: Access specific improvement tips for each section
- **Resume Preview**: View uploaded resumes with inline previews

### 🔐 Secure Authentication
- User authentication powered by Clerk
- Secure session management
- Protected API routes

### 💾 Data Persistence
- PostgreSQL database with Prisma ORM
- Store resume details and AI analysis results
- Track submission history and timestamps

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Smooth animations and transitions
- Glassmorphism and modern design patterns
- Intuitive user interface with Radix UI components

---

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Additional icon set

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database

### AI & Authentication
- **[@google/genai](https://ai.google.dev/)** - Google Generative AI SDK
- **[@clerk/nextjs](https://clerk.com/)** - Authentication and user management
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - JWT token handling

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for Next.js
- **[PostCSS](https://postcss.org/)** - CSS transformation

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │ Upload Page  │  │  Auth Pages  │      │
│  │   (page.js)  │  │              │  │  (sign-in/up)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Middleware Layer                        │
│                    (Authentication)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       API Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /resumeDetails│ │  /resume/[id]│  │   /sign-in   │      │
│  │   (POST)     │  │    (GET)     │  │   /sign-up   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Google Generative AI   │  │   Database (PostgreSQL)  │
│   - Resume Analysis      │  │   - User Data            │
│   - Scoring Engine       │  │   - Resume Details       │
│   - Feedback Generation  │  │   - Analysis Results     │
└──────────────────────────┘  └──────────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │   Prisma ORM         │
                              │   - Schema Management│
                              │   - Query Builder    │
                              └──────────────────────┘
```

### Database Schema

```prisma
User
├── id (UUID)
├── name
├── email (unique)
├── password (hashed)
├── resumes (ResumeDetails[])
├── createdAt
└── updatedAt

ResumeDetails
├── id (UUID)
├── companyName
├── jobTitle
├── jobDescription
├── resumeUrl
├── userId (FK → User)
├── analysisResult (JSON)
├── createdAt
└── updatedAt
```

---

## 🔄 How It Works

### 1. **User Authentication**
   - Users sign up or sign in using Clerk authentication
   - Secure session management with JWT tokens
   - Protected routes ensure data privacy

### 2. **Resume Upload**
   - Navigate to the upload page
   - Enter job details (company name, job title, job description)
   - Upload your resume (PDF format)
   - Submit for AI analysis

### 3. **AI Analysis Process**
   ```
   Resume Upload → PDF Processing → AI Analysis → Score Generation → Database Storage
   ```
   - Resume is uploaded and stored securely
   - Google Generative AI analyzes the resume against the job description
   - AI generates comprehensive scores across 5 dimensions
   - Provides specific, actionable improvement tips
   - Results are stored in PostgreSQL database

### 4. **View Results**
   - Access the dashboard to see all your submissions
   - View overall scores with color-coded indicators
   - Click on any resume card to see detailed analysis
   - Get section-by-section feedback with improvement tips
   - Download or view your original resume

### 5. **Track Applications**
   - Monitor all your job applications in one place
   - Compare scores across different submissions
   - Identify patterns and areas for improvement
   - Track submission dates and status

---

## 📁 Project Structure

```
ai_resume_maker/
├── prisma/
│   └── schema.prisma              # Database schema definition
├── public/
│   └── uploads/                   # Uploaded resume files
├── src/
│   ├── app/
│   │   ├── (auth)/               # Authentication routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── api/                  # API route handlers
│   │   │   ├── cookies/
│   │   │   ├── log-out/
│   │   │   ├── resume/[id]/     # Get specific resume
│   │   │   ├── resumeDetails/   # Upload & analyze resume
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── resume/[id]/         # Resume detail page
│   │   ├── upload-resume/       # Resume upload page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.js            # Root layout
│   │   └── page.js              # Dashboard (home page)
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   └── shared/              # Shared components
│   ├── constants/               # Application constants
│   ├── generated/
│   │   └── prisma/              # Generated Prisma client
│   ├── lib/                     # Utility functions
│   └── middleware.jsx           # Authentication middleware
├── .env                         # Environment variables
├── .gitignore
├── components.json              # Shadcn UI config
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
└── tailwind.config.js
```

### Key Directories Explained

- **`/prisma`**: Database schema and migrations
- **`/src/app`**: Next.js App Router pages and API routes
- **`/src/components`**: Reusable React components
- **`/src/lib`**: Utility functions and helpers
- **`/public/uploads`**: User-uploaded resume files
- **`/src/generated/prisma`**: Auto-generated Prisma client

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Google Generative AI API key
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_resume_maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_resume_maker"
   GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
   CLERK_SECRET_KEY="your-clerk-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📝 License

This project is private and proprietary.

---

## 🤝 Contributing

This is a personal project. If you have suggestions or find bugs, please open an issue.

---

## 📧 Contact

For questions or support, please reach out to the project maintainer.

---

**Built with ❤️ using Next.js and Google Generative AI**

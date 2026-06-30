# TextToLearn

**TextToLearn** is an AI-powered personalised learning platform that generates complete learning roadmaps for any topic. Instead of spending hours searching through tutorials, blogs, and videos, users receive a structured course containing modules, chapters, explanations, code examples, practice questions, and curated YouTube resources, all generated in seconds using AI.

### Live Demo

**https://text-to-learn-ynxx.onrender.com/**

---

# Features

### AI Course Generation

Generate complete learning roadmaps tailored to any topic with customisable difficulty levels and estimated learning duration.

### Structured Learning

Courses are automatically divided into well-organised modules and chapters, making complex subjects easier to learn.

### Code Examples

Programming courses include formatted code snippets for better understanding and practical learning.

### Practice Questions

Each chapter contains carefully selected practice problems to reinforce concepts and improve problem-solving skills.

### YouTube Recommendations

Relevant YouTube tutorials are automatically recommended alongside every chapter for additional learning.

### Progress Tracking

Track chapter completion, monitor overall course progress, and continue learning exactly where you left off.

### User Dashboard

Manage ongoing courses, completed courses, and view your personal learning progress from a clean dashboard.

### Secure Authentication

Create an account, log in securely, and access your personalised learning workspace from anywhere.

---

# Project Structure

```text
TextToLearn/
├── config/
│   ├── ai.js
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   ├── profileController.js
│   └── youtubeController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Course.js
│   ├── TrustedChannel.js
│   ├── User.js
│   └── UserVideoFeedback.js
│
├── public/
│   ├── css/
│   │   ├── auth.css
│   │   └── dashboard.css
│   └── js/
│       ├── message.js
│       ├── sidebar.js
│       └── youtubePlayer.js
│
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── profileRoutes.js
│   └── youtubeRoutes.js
│
├── services/
│   ├── aiService.js
│   ├── promptService.js
│   └── youtubeService.js
│
├── utils/
│   └── generateToken.js
│
├── views/
│   ├── partials/
│   │   ├── message.ejs
│   │   └── sidebar.ejs
│   ├── chapter.ejs
│   ├── completedCourses.ejs
│   ├── course.ejs
│   ├── generateCourse.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── ongoingCourses.ejs
│   ├── profile.ejs
│   └── signup.ejs
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Setup Instructions

## Requirements

Node.js (v18+)

MongoDB Atlas

Grok API Key

YouTube Data API v3 Key

Clone the repository

```bash
git clone https://github.com/CodaPakoda/Text-to-learn.git
```

Navigate to the project directory

```bash
cd TextToLearn
```

Install dependencies

```bash
npm install
```

Create a `.env` file in the project root

```env
PORT=3000

MONGO_URI=your_mongodb_atlas_connection_string

SESSION_SECRET=your_session_secret

GROK_API_KEY=your_grok_api_key

YOUTUBE_API_KEY=your_youtube_api_key
```

Run the application

```bash
npm start
```

or

```bash
npm run dev
```

For the deployed application, visit:

**https://text-to-learn-ynxx.onrender.com/**

---

# Tech Stack

### Frontend

HTML5

CSS3

JavaScript

EJS

Lucide Icons

### Backend

Node.js

Express.js

### Database

MongoDB Atlas

Mongoose

### APIs

Grok API

YouTube Data API v3

### Deployment

Render

---

# Future Improvements

AI-generated quizzes

Flashcards and revision mode

PDF course export

Dark mode

Learning streaks

Certificates

Course sharing

Notes and bookmarking

Multi-language support

AI doubt-solving assistant

Mobile application

---

## Author

**Aryan Varshney**

**Bhavya Rastogi**

Computer Science Engineering Student

Delhi Technological University

---

⭐ If you found this project interesting, consider giving it a star on GitHub!

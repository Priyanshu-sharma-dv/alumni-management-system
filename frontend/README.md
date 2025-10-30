# Alumni Management System - Frontend

A modern, responsive React application for managing alumni relationships, networking, and engagement.

## 🚀 Features

- **User Authentication**: Secure login and registration for Alumni, Students, and Admin
- **Alumni Directory**: Browse and search through alumni network
- **Dashboard**: Personalized dashboards for each user role
- **Real-time API Integration**: Connected to Node.js backend
- **Responsive Design**: Built with Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 4000

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:4028`

## 🔧 Configuration

The frontend is configured to connect to the backend through a Vite proxy:

- **Backend URL**: `http://localhost:4000`
- **Frontend Port**: `4028`
- **API Prefix**: `/api`

You can customize the backend URL by creating a `.env` file:

```env
VITE_API_URL=http://localhost:4000
```

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── homepage/       # Landing page
│   ├── login-portal/   # Authentication
│   ├── alumni-directory/  # Alumni browsing
│   └── *-dashboard/    # Role-specific dashboards
├── Component/          # Reusable components
├── utils/              # Utilities (API, helpers)
└── style/              # Global styles

```

## 🌐 API Integration

All API calls are centralized in `src/utils/api.js`:

- **Auth API**: Login, registration, profile
- **Alumni API**: Fetch alumni data

Example usage:
```javascript
import { authAPI, alumniAPI } from '@/utils/api';

// Login
const data = await authAPI.login(email, password);

// Get alumni
const alumni = await alumniAPI.getAll();
```

## 🔄 Connecting to Backend

The frontend automatically proxies `/api/*` requests to the backend server.

Ensure your backend is running:
```bash
cd ../backend
npm start
```

## 📝 Available Routes

- `/` - Homepage
- `/login-portal` - Login/Registration
- `/alumni-dashboard` - Alumni dashboard
- `/student-dashboard` - Student dashboard
- `/admin-dashboard` - Admin dashboard
- `/alumni-directory` - Browse alumni

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` directory.

## 🧪 Development

The app uses:
- **React 19** with hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for fast development
- **Lucide React** for icons
- **Recharts** for data visualization

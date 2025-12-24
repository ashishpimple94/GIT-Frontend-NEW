# GIT Grievance System - Frontend

React application for GIT Grievance Portal.

## 🚀 Deployment on Vercel

### Environment Variables

Add this environment variable in Vercel:

```
REACT_APP_API_URL=https://git-grievance-system-backend.onrender.com
```

### Steps to Deploy

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `REACT_APP_API_URL=https://git-grievance-system-backend.onrender.com`
4. Deploy

## 📦 Installation

```bash
npm install
```

## 🏃 Run Locally

```bash
# Development (uses proxy to localhost:5001)
npm start

# Production build
npm run build
```

## 🔧 Configuration

### Development
- Uses proxy from `package.json` (localhost:5001)
- No environment variable needed

### Production (Vercel)
- Set `REACT_APP_API_URL` environment variable
- Points to: `https://git-grievance-system-backend.onrender.com`

## 📡 API Configuration

The app automatically uses:
- **Development**: Proxy to `http://localhost:5001`
- **Production**: `REACT_APP_API_URL` or default to Render URL

## ✅ Features

- User Authentication (Login, Register, Forgot Password)
- Dashboard with Statistics
- Grievance Management
- Admin Panel
- Profile Management
- Responsive Design


# 🚀 Deployment Guide - Suraksha Setu

## 📋 Overview
This guide will help you deploy both frontend and backend of Suraksha Setu application automatically.

## 🏗️ Architecture
- **Frontend**: React app hosted on Vercel
- **Backend**: Node.js/Express API hosted on Vercel (Serverless Functions)
- **Database**: In-memory storage (upgrade to MongoDB/PostgreSQL for production)

## 🔧 Setup Instructions

### 1. Backend Deployment (Vercel)

#### Files Created:
- `backend/package.json` - Backend dependencies
- `backend/index.js` - Express server
- `backend/vercel.json` - Vercel configuration

#### Steps:
1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/suraksha-setu.git
   git push -u origin main
   ```

2. **Deploy Backend to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `backend` folder as root directory
   - Vercel will automatically detect it's a Node.js project
   - Click "Deploy"

3. **Get Backend URL**:
   - After deployment, Vercel will give you a URL like: `https://your-backend-xyz.vercel.app`
   - Copy this URL for frontend configuration

### 2. Frontend Deployment (Vercel)

#### Files Updated:
- `client/vercel.json` - Frontend Vercel config
- `client/.env.example` - Environment variables template
- `client/src/config/api.js` - Centralized API configuration

#### Steps:
1. **Set Environment Variables**:
   - In Vercel project settings, add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy Frontend**:
   - Create new Vercel project
   - Import same GitHub repository
   - Select `client` folder as root directory
   - Vercel will detect it's a React app
   - Add environment variables in project settings
   - Click "Deploy"

### 3. Firebase Configuration

#### Steps:
1. **Update Firebase Config**:
   - Go to Firebase Console
   - Your Project > Project Settings > General
   - Copy Firebase configuration
   - Update `client/src/firebase.js` with your config

2. **Add Firebase Environment Variables** (Optional but recommended):
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

## 🔄 Automatic Deployment Setup

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml` for automatic deployments:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Backend to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID_BACKEND }}
          vercel-args: '--prod'
          working-directory: ./backend

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: deploy-backend
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Frontend to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID_FRONTEND }}
          vercel-args: '--prod'
          working-directory: ./client
```

## 🌐 Access Your Application

After deployment:
- **Frontend URL**: `https://your-frontend-xyz.vercel.app`
- **Backend API**: `https://your-backend-xyz.vercel.app`
- **API Health Check**: `https://your-backend-xyz.vercel.app/health`

## 📱 Testing

1. **Frontend**: Visit your frontend URL
2. **Backend**: Test API endpoints:
   - `GET /health` - Health check
   - `GET /reports` - Get all reports
   - `GET /complaints` - Get all complaints
   - `POST /report` - Submit report
   - `POST /complaint` - Submit complaint

## 🔧 Production Improvements

### For Production Use:
1. **Database**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Authentication**: Add JWT tokens for API security
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Monitoring**: Add error tracking (Sentry)
5. **Analytics**: Add user analytics

### Database Integration Example:
```javascript
// Replace in-memory storage with MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const ReportSchema = new mongoose.Schema({
  type: String,
  description: String,
  timestamp: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);
```

## 🚨 Troubleshooting

### Common Issues:
1. **CORS Errors**: Backend cors configuration
2. **Environment Variables**: Check Vercel project settings
3. **Build Failures**: Check package.json dependencies
4. **API Connection**: Verify backend URL is correct

### Debugging:
- Check Vercel deployment logs
- Test API endpoints directly
- Verify environment variables
- Check browser console for errors

## 📞 Support

For deployment issues:
1. Check Vercel documentation
2. Review deployment logs
3. Test locally first
4. Check environment variables

---

**🎉 Your Suraksha Setu application is now ready for production!**

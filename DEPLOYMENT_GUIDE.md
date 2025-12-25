# E-commerce App Deployment Guide

This guide will help you deploy your full-stack e-commerce application to make it accessible to recruiters.

## 🚀 Deployment Overview

- **Backend**: Railway (Node.js/Express + MongoDB Atlas)
- **Frontend**: Vercel (React + Vite)
- **Database**: MongoDB Atlas (Cloud)

## 📋 Prerequisites

1. GitHub account
2. Railway account (https://railway.app)
3. Vercel account (https://vercel.com)
4. MongoDB Atlas account (https://cloud.mongodb.com)
s
## 🗄️ Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster (choose the free tier)
4. Create a database user with read/write permissions
5. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
6. Whitelist all IP addresses (0.0.0.0/0) for now

## 🔧 Step 2: Deploy Backend to Railway

1. Go to [Railway](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Choose the `Backend` folder as the root directory
5. Add these environment variables in Railway dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   JWT_SECRET=your_secure_jwt_secret_here
   PORT=3000
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
6. Railway will automatically deploy your backend
7. Note down your backend URL (e.g., `https://your-app.railway.app`)

## 🌐 Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "New Project" → "Import Git Repository"
3. Select your repository
4. Set the root directory to `frontend`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
6. Click "Deploy"
7. Note down your frontend URL (e.g., `https://your-app.vercel.app`)

## 🔄 Step 4: Update CORS Configuration

1. Go back to Railway dashboard
2. Update the `CORS_ORIGIN` environment variable to your Vercel frontend URL
3. Redeploy the backend

## 🧪 Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test user registration/login
3. Test product browsing
4. Test cart functionality
5. Test order placement

## 📝 Step 6: Update Your Resume/Portfolio

Add these URLs to your resume and portfolio:
- **Live Demo**: [Your Vercel URL]
- **GitHub Repository**: [Your GitHub repo URL]
- **Backend API**: [Your Railway URL]

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `CORS_ORIGIN` in Railway matches your Vercel URL exactly
2. **Database Connection**: Verify your MongoDB Atlas connection string
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Errors**: Check the deployment logs in Railway/Vercel dashboards

### Useful Commands:

```bash
# Test backend locally
cd Backend
npm install
npm run dev

# Test frontend locally
cd frontend
npm install
npm run dev
```

## 🎯 Production Checklist

- [ ] MongoDB Atlas cluster created and accessible
- [ ] Backend deployed to Railway with correct environment variables
- [ ] Frontend deployed to Vercel with correct API URL
- [ ] CORS configured properly
- [ ] All features tested on live deployment
- [ ] URLs added to resume/portfolio

## 📞 Support

If you encounter issues:
1. Check the deployment logs in Railway/Vercel dashboards
2. Verify all environment variables are set correctly
3. Test the API endpoints directly using tools like Postman
4. Check MongoDB Atlas connection and database permissions

---

**Your deployed app will be accessible to recruiters at your Vercel URL!** 🎉





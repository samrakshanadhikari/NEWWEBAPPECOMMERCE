# 🚀 Deployment Guide for IBM Application

This guide will help you deploy your e-commerce application to showcase it for IBM internship application.

## 📋 Prerequisites

- GitHub account
- Vercel account (free) - for frontend
- Railway account (free tier) - for backend
- MongoDB Atlas account (already have)

---

## 🐳 Option 1: Docker Deployment (Recommended for IBM)

### Local Development with Docker

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

3. **Stop containers:**
   ```bash
   docker-compose down
   ```

### Docker Commands

```bash
# Build backend image
cd Backend
docker build -t ecommerce-backend .

# Build frontend image
cd frontend
docker build -t ecommerce-frontend .

# Run backend container
docker run -p 3000:3000 --env-file .env ecommerce-backend

# Run frontend container
docker run -p 5173:80 ecommerce-frontend
```

---

## ☁️ Option 2: Cloud Deployment (Vercel + Railway)

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

3. **Or connect via GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `frontend` as root directory
   - Add environment variables:
     - `VITE_API_URL` = Your backend URL
     - `VITE_STRIPE_PUBLISHABLE_KEY` = Your Stripe key

4. **Update CORS in backend:**
   - Add Vercel URL to `CORS_ORIGIN` in backend `.env`

### Backend Deployment (Railway)

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   cd Backend
   railway init
   ```

4. **Add environment variables in Railway dashboard:**
   - `PORT` = 3000
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRETE` = Your JWT secret
   - `CORS_ORIGIN` = Your Vercel frontend URL
   - `STRIPE_SECRET_KEY` = Your Stripe secret key

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get your backend URL:**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Update frontend `VITE_API_URL` with this URL

---

## 🔄 CI/CD with GitHub Actions

The CI/CD pipeline is already configured in `.github/workflows/ci-cd.yml`.

### What it does:

1. **On every push:**
   - Runs backend tests
   - Runs frontend tests
   - Builds Docker images
   - Validates code quality

2. **View results:**
   - Go to your GitHub repo
   - Click "Actions" tab
   - See test results and build status

### Manual trigger:
```bash
git push origin main
```

---

## 🧪 Testing

### Run Backend Tests:
```bash
cd Backend
npm test
```

### Run Frontend Tests:
```bash
cd frontend
npm test
```

### Run with Coverage:
```bash
# Backend
cd Backend
npm test -- --coverage

# Frontend
cd frontend
npm test -- --coverage
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRETE=your_jwt_secret
CORS_ORIGIN=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app/
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## ✅ Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] MongoDB Atlas whitelisted Railway IP
- [ ] Stripe keys updated (use production keys if needed)
- [ ] Test all features:
  - [ ] User registration/login
  - [ ] Product browsing
  - [ ] Add to cart
  - [ ] Checkout
  - [ ] Payment processing
  - [ ] Admin dashboard

---

## 🎯 For IBM Application

### What to Highlight:

1. **Docker Containerization:**
   - "Containerized full-stack application using Docker"
   - "Implemented multi-stage Docker builds for optimization"

2. **CI/CD Pipeline:**
   - "Set up automated CI/CD pipeline with GitHub Actions"
   - "Automated testing and deployment validation"

3. **Cloud Deployment:**
   - "Deployed application to cloud platforms (Vercel + Railway)"
   - "Configured production environment with environment variables"

4. **Testing:**
   - "Implemented unit and integration tests"
   - "Achieved X% test coverage"

5. **DevOps Practices:**
   - "Followed DevOps best practices with containerization and CI/CD"
   - "Automated build and deployment processes"

---

## 🆘 Troubleshooting

### Docker Issues:
- Make sure Docker Desktop is running
- Check if ports 3000 and 5173 are available
- Verify `.env` files are configured

### Deployment Issues:
- Check environment variables in cloud platforms
- Verify CORS settings
- Check MongoDB Atlas network access
- Review Railway/Vercel logs

### Testing Issues:
- Make sure all dependencies are installed
- Check test configuration files
- Verify Node.js version (should be 20+)

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Good luck with your IBM application! 🚀**

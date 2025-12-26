# 🚀 Deployment Instructions - Free Hosting

## Overview

Deploy your e-commerce app for FREE using:
- **Frontend:** Vercel (Free tier)
- **Backend:** Railway (Free tier available) or Render
- **Database:** MongoDB Atlas (Free tier)

---

## 📋 Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [ ] Environment variables ready
- [ ] MongoDB Atlas cluster running
- [ ] Stripe account set up (test mode is fine)

---

## 1️⃣ Deploy Backend to Railway (Recommended)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `NEWWEBAPPECOMMERCE` repository

### Step 2: Configure Backend
1. Set **Root Directory** to `Backend`
2. Railway will auto-detect Node.js

### Step 3: Add Environment Variables
In Railway dashboard → Variables tab, add:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRETE=your_jwt_secret_key_here
CORS_ORIGIN=https://your-frontend-url.vercel.app
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Important:** 
- Use your actual MongoDB Atlas connection string
- Generate a strong JWT_SECRETE (random string)
- Get Stripe keys from [dashboard.stripe.com](https://dashboard.stripe.com/test/apikeys)
- Set CORS_ORIGIN after deploying frontend (update this later)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the generated URL (e.g., `https://your-app.railway.app`)

### Step 5: Test Backend
Visit: `https://your-app.railway.app/api/product/getAll`
Should return JSON with products.

---

## 2️⃣ Deploy Frontend to Vercel (Recommended)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your `NEWWEBAPPECOMMERCE` repository

### Step 2: Configure Frontend
1. Set **Root Directory** to `frontend`
2. Framework Preset: **Vite**
3. Build Command: `npm run build` (auto-detected)
4. Output Directory: `dist` (auto-detected)

### Step 3: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables, add:

```env
VITE_API_URL=https://your-backend-url.railway.app/
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Important:**
- Use your Railway backend URL (from Step 1)
- Get Stripe Publishable Key from [dashboard.stripe.com](https://dashboard.stripe.com/test/apikeys)
- Make sure to include trailing `/` in API URL

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment (usually 1-2 minutes)
3. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 5: Update Backend CORS
1. Go back to Railway
2. Update `CORS_ORIGIN` variable to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
3. Redeploy backend (Railway auto-redeploys on env var changes)

---

## 3️⃣ Update MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Network Access"
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development)
   - Or add specific IPs: `0.0.0.0/0`
5. Save changes

---

## 4️⃣ Test Everything

### Test Frontend
1. Visit your Vercel URL
2. Try registering a new user
3. Browse products
4. Add items to cart
5. Try checkout (use Stripe test card: `4242 4242 4242 4242`)

### Test Backend
- API should be accessible at: `https://your-backend.railway.app/api/product/getAll`
- Should return JSON response

---

## 🔄 Alternative: Render (Backend)

If Railway doesn't work, use Render:

### Render Backend Setup
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** ecommerce-backend
   - **Root Directory:** Backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables (same as Railway)
7. Click "Create Web Service"

---

## 📝 Environment Variables Summary

### Backend (Railway/Render)
```env
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
JWT_SECRETE=your_secure_random_string
CORS_ORIGIN=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.railway.app/
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🎯 After Deployment

1. **Update README.md** with live URLs
2. **Test all features:**
   - User registration/login
   - Product browsing
   - Add to cart
   - Checkout and payment
   - Admin dashboard (if applicable)

3. **Share with recruiters:**
   - GitHub repository link
   - Live application URL
   - Brief description of features

---

## 🐛 Troubleshooting

### Backend Issues
- **500 Error:** Check environment variables in Railway
- **Database connection failed:** Check MongoDB Atlas network access
- **CORS errors:** Update CORS_ORIGIN in backend env vars

### Frontend Issues
- **API not working:** Check VITE_API_URL is correct
- **Build fails:** Check for syntax errors in console
- **Stripe not working:** Verify Stripe keys are correct

### General
- Check deployment logs in Railway/Vercel dashboard
- Verify all environment variables are set
- Make sure database is accessible from hosting platform

---

## ✅ Success!

Once deployed, you'll have:
- ✅ Live frontend at Vercel
- ✅ Live backend API at Railway
- ✅ Connected to MongoDB Atlas
- ✅ Stripe payments working
- ✅ Ready to share with recruiters!

---

**Need help?** Check the deployment logs in your hosting platform's dashboard!


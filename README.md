# 🛒 ShopSmart - Full-Stack E-Commerce Platform

> A modern, production-ready e-commerce application built with React, Node.js, Express, and MongoDB. Features complete user authentication, product management, shopping cart, order processing, payment integration, and an admin dashboard.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF.svg)](https://stripe.com/)

## 🚀 Live Demo

- **Frontend:** [Deploy to Vercel] - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Backend API:** [Deploy to Railway] - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🐳 Docker Support

This application is fully containerized with Docker:

```bash
# Run with Docker Compose
docker-compose up --build

# Or build individually
cd Backend && docker build -t ecommerce-backend .
cd frontend && docker build -t ecommerce-frontend .
```

## ☁️ AWS Deployment (Free Tier - Recommended for IBM)

Deploy to AWS using Docker containers:

```bash
# Quick start (15 minutes)
# See AWS_QUICK_START.md

# Or detailed guide
# See AWS_DEPLOYMENT_GUIDE.md
```

**AWS Services Used:**
- **EC2/Elastic Beanstalk** - Backend (Docker containers)
- **S3** - Frontend static hosting
- **Free Tier**: $0/month for 12 months!

See [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) for complete instructions.

## 📋 Features

### 🔐 User Features
- ✅ **User Authentication & Authorization** - Secure JWT-based login/register system
- ✅ **Product Browsing** - Browse products by category with image galleries
- ✅ **Shopping Cart** - Add, update, and remove items with real-time quantity management
- ✅ **Order Management** - Place orders and track order history
- ✅ **Payment Integration** - Secure payment processing with Stripe (Credit/Debit cards, Apple Pay, Google Pay)
- ✅ **Product Reviews** - Rate and review products
- ✅ **User Profile** - Manage personal information and preferences
- ✅ **Wishlist** - Save favorite products for later

### 👨‍💼 Admin Features
- ✅ **Admin Dashboard** - Comprehensive analytics and overview
- ✅ **Product Management** - Full CRUD operations for products with image uploads
- ✅ **Category Management** - Organize products by categories
- ✅ **Order Management** - View, update, and manage customer orders
- ✅ **User Management** - Monitor and manage user accounts
- ✅ **Image Upload** - Upload and manage product/category images

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - Efficient state management
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Toastify** - Beautiful notifications
- **Stripe Elements** - Secure payment form components

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database (via Mongoose ODM)
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing for security
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Stripe** - Payment processing integration

### Database & Cloud Services
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **AWS (EC2/S3)** - Cloud deployment (free tier for 12 months) ⭐ Recommended
- **Vercel** - Frontend hosting alternative (free tier)
- **Railway** - Backend hosting alternative (free tier)

### DevOps & Testing
- **Docker** - Containerization for easy deployment
- **GitHub Actions** - CI/CD pipeline for automated testing and deployment
- **Jest** - Backend unit and integration testing
- **Vitest** - Frontend unit testing with React Testing Library

## 🏗️ Architecture

This application follows a **RESTful API architecture** with clear separation of concerns:

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │  HTTP   │   Express    │  Query  │   MongoDB   │
│  Frontend   │ ──────> │    API       │ ──────> │   Atlas     │
│             │ <────── │              │ <────── │             │
└─────────────┘  JSON   └──────────────┘  Data   └─────────────┘
```

### Key Architecture Decisions
- **RESTful API** - Standard HTTP methods (GET, POST, PATCH, DELETE)
- **JWT Authentication** - Stateless authentication with token expiration
- **Role-Based Access Control** - Admin and User roles with middleware protection
- **Error Handling** - Centralized error handling middleware
- **File Upload** - Multer for handling multipart/form-data
- **State Management** - Redux Toolkit for predictable state updates

## 📁 Project Structure

```
ecomwebapp/
├── Backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, file upload, error handling
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── services/         # Utility services
│   ├── storage/          # Uploaded files
│   └── server.js         # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── adminDashboard/  # Admin-specific components
│   │   ├── globals/         # Shared components (Navbar, Footer)
│   │   ├── http/            # API client configuration
│   │   ├── pages/           # Page components
│   │   ├── routes/          # Route protection
│   │   ├── store/           # Redux store and slices
│   │   └── App.jsx          # Main app component
│   └── public/              # Static assets
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Stripe account (for payments - test mode is free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samrakshanadhikari/NEWWEBAPPECOMMERCE.git
   cd NEWWEBAPPECOMMERCE
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRETE=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000/
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🧪 Testing

### Run Tests

**Backend:**
```bash
cd Backend
npm test              # Run tests
npm test -- --coverage # Run with coverage
```

**Frontend:**
```bash
cd frontend
npm test              # Run tests
npm test -- --coverage # Run with coverage
```

### Docker Testing

```bash
docker-compose up --build
```

## 🔄 CI/CD

This project includes GitHub Actions CI/CD pipeline that:
- Runs automated tests on push/PR
- Validates code quality
- Builds Docker images
- Checks for deployment readiness

See `.github/workflows/ci-cd.yml` for configuration.

## 🔑 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (protected)
- `PATCH /api/update/:id` - Update user profile (protected)

### Products
- `GET /api/product/getAll` - Get all products
- `GET /api/product/:id` - Get single product
- `POST /api/product/create` - Create product (admin only)
- `PATCH /api/product/update/:id` - Update product (admin only)
- `DELETE /api/product/delete/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PATCH /api/cart` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)

### Orders
- `POST /api/order` - Create order (protected)
- `GET /api/order` - Get user's orders (protected)
- `GET /api/order/:id` - Get order details (protected)

### Payments (Stripe)
- `POST /api/stripe/create-payment-intent` - Create payment intent (protected)
- `POST /api/stripe/confirm-payment` - Confirm payment (protected)

See [REST_API_EXPLANATION.md](./REST_API_EXPLANATION.md) for complete API documentation.

## 🔒 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Tokens** - Secure, stateless authentication
- ✅ **Token Expiration** - Automatic token expiry (1 hour)
- ✅ **Role-Based Access Control** - Admin/User role separation
- ✅ **CORS Protection** - Configured for allowed origins
- ✅ **Input Validation** - Request validation middleware
- ✅ **Error Handling** - Centralized error handling
- ✅ **Environment Variables** - Sensitive data protection

## 📸 Screenshots

_Add screenshots of your application here_

## 🧪 Testing

To test the application:

1. **Create test user accounts:**
   - Regular user: Register via `/register`
   - Admin: Use admin creation script or MongoDB

2. **Test payment:**
   - Use Stripe test cards: `4242 4242 4242 4242`
   - Any future expiry date, any CVC

3. **Admin features:**
   - Login as admin
   - Access dashboard at `/dashboard`
   - Add/edit products, manage orders

## 🚢 Deployment

### Frontend (Vercel - Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Railway - Recommended)
1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Samrakshan Adhikari**
- GitHub: [@samrakshanadhikari](https://github.com/samrakshanadhikari)
- Project Link: [https://github.com/samrakshanadhikari/NEWWEBAPPECOMMERCE](https://github.com/samrakshanadhikari/NEWWEBAPPECOMMERCE)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Stripe for payment processing
- All open-source contributors

---

⭐ **If you find this project helpful, please give it a star!**

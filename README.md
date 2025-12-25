# 🛒 E-Commerce Web Application

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart, order processing, and an admin dashboard.

## 🚀 Live Demo

- **Frontend:** [Deploy and add your Vercel URL here]
- **Backend API:** [Deploy and add your Railway URL here]

## 📋 Features

### User Features
- ✅ User registration and authentication (JWT)
- ✅ Browse products by category
- ✅ Product search and filtering
- ✅ Shopping cart management
- ✅ Order placement and tracking
- ✅ Product reviews and ratings
- ✅ User profile management
- ✅ Wishlist functionality

### Admin Features
- ✅ Admin dashboard with analytics
- ✅ Product management (CRUD operations)
- ✅ Category management
- ✅ Order management
- ✅ User management
- ✅ Image upload for products and categories

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Navigation/routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose ODM)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting

## 🏗️ Architecture

This application follows a **RESTful API architecture** with:
- **Frontend (React)** - Client-side application
- **Backend (Express)** - REST API server
- **Database (MongoDB)** - Data persistence

### API Structure
- RESTful endpoints
- JWT-based authentication
- Role-based access control (Admin/User)
- Error handling middleware
- File upload support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `Backend` directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRETE=your_secret_jwt_key_here
CORS_ORIGIN=http://localhost:5173
```

4. Seed the database (optional):
```bash
node createUsers.js
node seedProducts.js
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRETE=your_jwt_secret_key
CORS_ORIGIN=your_frontend_url
FRONTEND_URL=your_frontend_url
```

### Frontend (.env)
```env
VITE_API_URL=your_backend_api_url
```

## 📚 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile

### Products
- `GET /api/product/getAll` - Get all products
- `GET /api/product/singleProduct/:id` - Get single product
- `GET /api/product/category/:category` - Get products by category
- `POST /api/product/create` - Create product (Admin only)
- `PATCH /api/product/update/:id` - Update product (Admin only)
- `DELETE /api/product/delete/:id` - Delete product (Admin only)

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (Admin only)
- `PATCH /api/category/:id` - Update category (Admin only)
- `DELETE /api/category/:id` - Delete category (Admin only)

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items
- `PATCH /api/cart` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `POST /api/order` - Create order
- `GET /api/order` - Get all orders (Admin only)
- `GET /api/order/myOrders` - Get user's orders
- `GET /api/order/:id` - Get single order

### Reviews
- `POST /api/ratingReview` - Add product review
- `GET /api/ratingReview/:productId` - Get product reviews

## 🧪 Testing

### Test Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `adminpassword123`

**User Account:**
- Email: `user@example.com`
- Password: `userpassword123`

## 📂 Project Structure

```
ecomwebapp/
├── Backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, file upload, error handling
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── services/        # Utility services
│   ├── storage/         # Uploaded images
│   ├── server.js        # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── adminDashboard/  # Admin panel
│   │   ├── store/           # Redux state management
│   │   ├── routes/          # Route protection
│   │   ├── http/            # API configuration
│   │   └── App.jsx          # Main app component
│   └── package.json
│
└── README.md
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with Bcrypt
- Role-based access control (Admin/User)
- CORS protection
- Input validation
- Error handling middleware

## 🚀 Deployment

See [DEPLOYMENT_STEP_BY_STEP.md](./DEPLOYMENT_STEP_BY_STEP.md) for detailed deployment instructions.

### Quick Deployment Steps:

1. **Deploy Backend to Railway**
   - Connect GitHub repository
   - Set root directory to `Backend`
   - Add environment variables
   - Deploy

2. **Deploy Frontend to Vercel**
   - Connect GitHub repository
   - Set root directory to `frontend`
   - Add `VITE_API_URL` environment variable
   - Deploy

3. **Update CORS**
   - Update `CORS_ORIGIN` in Railway to match Vercel URL

## 📝 Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB Atlas for free database hosting
- Vercel and Railway for free deployment tiers

---

**Note:** Remember to update the live demo URLs after deployment!

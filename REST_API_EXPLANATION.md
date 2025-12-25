# 🔌 REST API Explanation - What You're Using

## 🎯 Quick Answers

### 1. Are you using AWS?
**NO!** You're **NOT using AWS**. You're using:
- **MongoDB Atlas** - MongoDB's own cloud database service (separate from AWS)
- That's it for cloud services currently

### 2. Are you using REST APIs?
**YES!** Your entire backend is a **REST API**. This is what makes your app work!

---

## 📚 What is a REST API? 

### Simple Explanation

**REST API** = A way for different parts of your app to talk to each other

Think of it like a **restaurant menu**:
- The **menu** (API endpoints) tells you what you can order
- You **order** (send HTTP request) what you want
- The **kitchen** (backend server) prepares it
- You **receive** (get HTTP response) what you ordered

### Technical Definition

**REST API** (Representational State Transfer API):
- Uses **HTTP methods**  (GET, POST, PUT, DELETE, PATCH)
- Returns data in **JSON format**
- **Stateless** (each request is independent)
- **Standard way** for frontend and backend to communicate

---

## 🔍 Your REST API Endpoints

Here are ALL the REST API endpoints your app uses:

### 1. User Routes (`/api/user`)

```
POST   /api/user/register          → Create new user account
POST   /api/user/login             → User login (returns JWT token)
GET    /api/user/profile           → Get current user's profile
GET    /api/user/getAll            → Get all users (admin only)
GET    /api/user/singleUser/:id    → Get single user by ID
PATCH  /api/user/updateUser/:id    → Update user info
DELETE /api/user/delete/:id        → Delete user (admin only)
```

### 2. Product Routes (`/api/product`)

```
GET    /api/product/getAll                  → Get all products
GET    /api/product/singleProduct/:id       → Get single product
GET    /api/product/category/:category      → Get products by category
POST   /api/product/create                  → Create new product (admin only)
PATCH  /api/product/update/:id              → Update product (admin only)
DELETE /api/product/delete/:id              → Delete product (admin only)
```

### 3. Category Routes (`/api/category`)

```
GET    /api/category              → Get all categories
GET    /api/category/:id          → Get single category
POST   /api/category              → Create category (admin only)
PATCH  /api/category/:id          → Update category (admin only)
DELETE /api/category/:id          → Delete category (admin only)
```

### 4. Cart Routes (`/api/cart`)

``` 
POST   /api/cart                  → Add item to cart
GET    /api/cart                  → Get all cart items
PATCH  /api/cart                  → Update cart item quantity
DELETE /api/cart/:productId       → Remove item from cart
```

### 5. Order Routes (`/api/order`)

```     aa      
POST   /api/order                 → Create new order
GET    /api/order                 → Get all orders (admin only)
GET    /api/order/myOrders        → Get user's orders
GET    /api/order/:id             → Get single order details
PATCH  /api/order/:id             → Update order status
DELETE /api/order/:id             → Cancel order
```

### 6. Wishlist Routes (`/api/wishlist`)

```
POST   /api/wishlist              → Add to wishlist
GET    /api/wishlist              → Get wishlist items
DELETE /api/wishlist/:id          → Remove from wishlist
```

### 7. Rating/Review Routes (`/api/ratingReview`)

```
POST   /api/ratingReview          → Add product review/rating
GET    /api/ratingReview/:productId → Get reviews for product
```

---

## 🔑 HTTP Methods Explained

Your REST API uses these HTTP methods:

### GET - Read Data
- **Purpose:** Get/retrieve information
- **Example:** `GET /api/product/getAll` → Returns all products
- **Data:** Sent in URL, no body needed

### POST - Create Data
- **Purpose:** Create new resource
- **Example:** `POST /api/product/create` → Creates new product
- **Data:** Sent in request body (JSON)

### PATCH - Update Data
- **Purpose:** Partially update existing resource
- **Example:** `PATCH /api/product/update/:id` → Updates product
- **Data:** Sent in request body (JSON)

### DELETE - Remove Data
- **Purpose:** Delete a resource
- **Example:** `DELETE /api/product/delete/:id` → Deletes product
- **Data:** Usually just the ID in URL

---

## 💻 How Your Frontend Uses REST API

### Example: Fetching Products

**Frontend Code (React):**
```javascript
// From frontend/src/store/productSlice.js
const response = await API.get("/api/product/getAll");
```

**What happens:**
1. Frontend makes HTTP GET request
2. URL: `http://localhost:3000/api/product/getAll`
3. Backend receives request
4. Backend queries MongoDB
5. Backend sends JSON response:
```json
{
  "message": "Product fetch successfully",
  "data": [
    {
      "_id": "68d0acdfb12d50be2ddcbd48",
      "productName": "Laptop",
      "productPrice": 999.99,
      ...
    }
  ]
}
```
6. Frontend receives data and displays it

### Example: Creating a Product (Admin)

**Frontend Code:**
```javascript
const response = await APIAuthenticated.post("/api/product/create", productData);
```

**What happens:**
1. Frontend sends HTTP POST request
2. URL: `http://localhost:3000/api/product/create`
3. Request body: `{ productName: "Laptop", price: 999.99, ... }`
4. Backend checks authentication (JWT token)
5. Backend checks if user is admin
6. Backend saves to MongoDB
7. Backend sends success response
8. Frontend shows "Product created!" message

---

## 🌐 API Base URL

### Development (Current):
```
http://localhost:3000/api
```

### Production (If Deployed):
```
https://yourapp.railway.app/api
```

All your endpoints start with `/api`:
- `/api/user/register`
- `/api/product/getAll`
- `/api/cart`
- etc.

---

## 📡 Your API Configuration

### Frontend API Setup

**File:** `frontend/src/http/index.js`

```javascript
// Base URL configuration
const API = axios.create({
    baseURL: 'http://localhost:3000/',  // Backend server
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authenticated API (includes JWT token)
const APIAuthenticated = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically adds JWT token to requests
APIAuthenticated.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});
```

**Two types of API clients:**
1. **API** - For public endpoints (no login required)
   - Getting products, categories (anyone can view)
   
2. **APIAuthenticated** - For protected endpoints (login required)
   - Adding to cart, creating orders, admin functions
   - Automatically adds JWT token from localStorage

---

## 🔐 Authentication in REST API

Your REST API uses **JWT (JSON Web Token)** authentication:

### How it works:
1. User logs in → `POST /api/user/login`
2. Backend validates credentials
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Frontend sends token in `Authorization` header for protected routes
6. Backend verifies token before processing request

### Protected vs Public Endpoints

**Public (no token needed):**
- `GET /api/product/getAll` - Anyone can view products
- `GET /api/category` - Anyone can view categories
- `POST /api/user/register` - Anyone can register

**Protected (token required):**
- `POST /api/product/create` - Only admins can create products
- `GET /api/cart` - Only logged-in users can view cart
- `POST /api/order` - Only logged-in users can create orders

---

## 📋 REST API Best Practices (What You're Following)

✅ **RESTful URLs:**
- `/api/product/getAll` - Clear, descriptive
- `/api/product/:id` - Uses ID parameter
- `/api/product/category/:category` - Hierarchical structure

✅ **HTTP Methods:**
- GET for reading
- POST for creating
- PATCH for updating
- DELETE for deleting

✅ **JSON Responses:**
- All responses in JSON format
- Consistent structure: `{ message: "...", data: {...} }`

✅ **Status Codes:**
- 200 - Success
- 400 - Bad Request (validation errors)
- 401 - Unauthorized (not logged in)
- 403 - Forbidden (no permission)
- 404 - Not Found
- 500 - Server Error

✅ **Error Handling:**
- Global error handler wrapper
- Consistent error response format

---

## 🎯 Real-World Example: Adding to Cart

### Step-by-Step REST API Call:

```
1. User clicks "Add to Cart" button
   ↓
2. Frontend makes API call:
   POST http://localhost:3000/api/cart
   Headers: { Authorization: "jwt_token_here" }
   Body: { productId: "123", quantity: 2 }
   ↓
3. Backend receives request
   - Verifies JWT token
   - Validates request data
   - Finds or creates cart item
   - Updates MongoDB
   ↓
4. Backend sends response:
   Status: 200 OK
   Body: {
     "message": "Product is add on the cart",
     "data": { ...cart item... }
   }
   ↓
5. Frontend receives response
   - Updates Redux state
   - Shows success message
   - Updates cart icon count
```

---

## 🔍 How to Test Your REST API

### Using Browser (GET requests only):
- Visit: `http://localhost:3000/api/product/getAll`
- You'll see JSON response

### Using cURL (Command Line):
```bash
# Get all products
curl http://localhost:3000/api/product/getAll

# Login
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpassword123"}'
```

### Using Postman (Recommended):
1. Download Postman
2. Create request
3. Set method (GET, POST, etc.)
4. Enter URL: `http://localhost:3000/api/product/getAll`
5. For POST, add body (JSON)
6. Click Send

---

## 🆚 REST API vs GraphQL vs SOAP

### REST API (What You're Using) ✅
- **Pros:** Simple, standard, easy to understand
- **Cons:** Sometimes multiple requests needed
- **Best for:** CRUD operations, standard web apps
- **Your app:** Perfect fit! ✅

### GraphQL
- **Pros:** Flexible queries, single endpoint
- **Cons:** More complex, less standard
- **Used by:** Facebook, GitHub

### SOAP
- **Pros:** Very structured
- **Cons:** Complex, old-fashioned
- **Used by:** Enterprise systems

**Your choice of REST API is perfect for an e-commerce app!**

---

## ✅ Summary

### Are you using REST APIs?
**YES!** Your entire backend is a REST API with ~20+ endpoints

### What does it do?
- Allows frontend (React) to communicate with backend (Express)
- Uses standard HTTP methods (GET, POST, PATCH, DELETE)
- Returns JSON data
- Handles authentication with JWT tokens

### Is this good?
**YES!** REST APIs are the standard way to build web applications. You're following best practices! ✅

### Is it AWS?
**NO!** You're using:
- **MongoDB Atlas** (MongoDB's cloud service, not AWS)
- **Express.js** (Node.js framework)
- **React** (Frontend library)

No AWS required! Your app works perfectly without it.

---

## 🎓 Key Takeaways

1. ✅ **You ARE using REST APIs** - This is what makes your app work!
2. ✅ **You're NOT using AWS** - MongoDB Atlas is separate
3. ✅ **REST API = Frontend ↔ Backend communication**
4. ✅ **Your implementation is correct and follows best practices**
5. ✅ **No need to learn AWS** - Your current stack works great!

Your app is a well-structured REST API-based e-commerce application! 🎉



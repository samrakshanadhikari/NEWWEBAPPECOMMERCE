# 🔍 Database Not Working - Troubleshooting Guide

## 🐛 Common Database Issues

### **Issue 1: MongoDB Atlas Cluster is Paused**

**Symptoms:**
- "Connection timeout"
- "ECONNREFUSED"
- "Cannot connect to MongoDB"

**Fix:**
1. Go to https://cloud.mongodb.com
2. Login to your account
3. Check if your cluster shows "Paused" or "Sleeping"
4. Click **"Resume"** or **"Resume Cluster"**
5. Wait 1-2 minutes for cluster to start
6. Restart your backend server

---

### **Issue 2: Connection String is Wrong**

**Symptoms:**
- "Authentication failed"
- "Invalid connection string"
- Connection errors

**Fix:**
1. Go to MongoDB Atlas → Connect → Connect your application
2. Copy the **newest** connection string
3. Update `Backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/Ecommerce?retryWrites=true&w=majority
   ```
4. Make sure:
   - Password has no `<` or `>` brackets
   - Database name is correct (usually `Ecommerce`)
   - No extra spaces

---

### **Issue 3: IP Address Not Whitelisted**

**Symptoms:**
- "IP not whitelisted"
- "Connection refused from IP"

**Fix:**
1. Go to MongoDB Atlas → Network Access
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - OR add your current IP address
4. Save changes
5. Wait 1-2 minutes
6. Restart backend

---

### **Issue 4: Wrong Password**

**Symptoms:**
- "bad auth: authentication failed"
- "Invalid credentials"

**Fix:**
1. Go to MongoDB Atlas → Database Access
2. Click on your user
3. Click **"Edit"** → **"Edit Password"**
4. Reset password
5. Update `Backend/.env` with new password
6. Restart backend

---

### **Issue 5: Backend Server Not Running**

**Symptoms:**
- No connection messages
- API not responding

**Fix:**
1. Check if backend is running:
   ```bash
   cd Backend
   npm run dev
   ```
2. Should see:
   ```
   Server is running on the port 3000
   Connected to the mongodb server
   ```

---

## 🔍 How to Check Database Status

### **Step 1: Check Backend Terminal**

Look for these messages:

**✅ Good:**
```
Connected to the mongodb server
Server is running on the port 3000
```

**❌ Bad:**
```
MongoError: connection timeout
Error: Cannot connect to MongoDB
```

### **Step 2: Test API**

```bash
curl http://localhost:3000/api/product/getAll
```

**✅ Good:** Returns products JSON
**❌ Bad:** Returns error or timeout

### **Step 3: Check MongoDB Atlas Dashboard**

1. Go to https://cloud.mongodb.com
2. Check cluster status:
   - Should be **"Running"** (green)
   - Not **"Paused"** or **"Sleeping"**

---

## ✅ Quick Fix Checklist

- [ ] MongoDB Atlas cluster is **Running** (not paused)
- [ ] IP address is whitelisted (allow from anywhere for dev)
- [ ] Connection string in `Backend/.env` is correct
- [ ] Password in connection string has no `<` or `>`
- [ ] Database name is correct (`Ecommerce`)
- [ ] Backend server is running
- [ ] See "Connected to the mongodb server" message

---

## 🔧 Quick Fix Steps

1. **Resume MongoDB Cluster:**
   - Go to MongoDB Atlas
   - Click "Resume" if paused

2. **Check Connection String:**
   - MongoDB Atlas → Connect → Connect your application
   - Copy new connection string
   - Update `Backend/.env`

3. **Whitelist IP:**
   - MongoDB Atlas → Network Access
   - Add IP or "Allow from anywhere"

4. **Restart Backend:**
   ```bash
   cd Backend
   npm run dev
   ```

5. **Check for "Connected to the mongodb server" message**

---

## 🎯 What to Check Right Now

**Check your backend terminal** (where `npm run dev` is running):

**If you see:**
- ✅ "Connected to the mongodb server" → Database is working!
- ❌ Any error messages → Database has issues

**Share the error message** and I can help fix it!

---

## 📝 Common Error Messages

### **"Connection timeout"**
→ Cluster is paused or IP not whitelisted

### **"Authentication failed"**
→ Wrong password or username

### **"ECONNREFUSED"**
→ Cluster is paused

### **"IP not whitelisted"**
→ Add IP to Network Access

---

**Check your backend terminal first - that will tell you exactly what's wrong!** 🔍


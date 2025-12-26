# 🔍 How to Check Backend Errors - Step-by-Step Guide

## 📋 Quick Answer

**The backend terminal is the window/terminal where you ran:**
```bash
cd Backend
npm run dev
```

**Errors will appear in that same terminal window!**

---

## 🎯 Step-by-Step Instructions

### **Step 1: Find Your Backend Terminal**

Look for the terminal window where you see:
```
> backend@1.0.0 dev
> nodemon server.js

[nodemon] starting `node server.js`
Server is running on the port 3000
Connected to the mongodb server
```

**This is your backend terminal!** This is where errors will appear.

---

### **Step 2: Look for Error Messages**

When an error occurs, you'll see messages like:

#### **Example 1: Stripe Error**
```
Stripe Payment Intent creation error: Invalid API Key provided
Error details: {
  message: 'Invalid API Key provided',
  type: 'StripeInvalidRequestError',
  code: 'api_key_invalid'
}
```

#### **Example 2: Database Error**
```
MongoError: connection timeout
Error details: { message: '...', ... }
```

#### **Example 3: Validation Error**
```
ValidationError: Order validation failed
Error details: { ... }
```

---

### **Step 3: What to Look For**

**Error messages usually start with:**
- ❌ `Error:`
- ❌ `Stripe Payment Intent creation error:`
- ❌ `Payment confirmation error:`
- ❌ `Order creation error:`
- ❌ `MongoError:`
- ❌ `ValidationError:`

**They're usually in RED text** (depending on your terminal colors)

---

## 📺 Visual Guide

### **Normal Backend Terminal (No Errors):**
```
> backend@1.0.0 dev
> nodemon server.js

[nodemon] starting `node server.js`
[dotenv] injecting env from .env
Server is running on the port 3000
Connected to the mongodb server
```

### **Backend Terminal WITH Error:**
```
> backend@1.0.0 dev
> nodemon server.js

[nodemon] starting `node server.js`
[dotenv] injecting env from .env
Server is running on the port 3000
Connected to the mongodb server

Stripe Payment Intent creation error: Invalid API Key provided
Error details: {
  message: 'Invalid API Key provided',
  type: 'StripeInvalidRequestError'
}
```

**The error appears AFTER the server starts!**

---

## 🔍 Where Errors Appear

### **Errors appear in the same terminal window where:**
- You ran `npm run dev`
- You see "Server is running on the port 3000"
- You see "Connected to the mongodb server"

**Errors will show up BELOW these messages when they happen!**

---

## 💡 Pro Tips

### **1. Keep Terminal Visible**
- Don't minimize the backend terminal
- Keep it open and visible
- Scroll up to see older errors

### **2. Look for Latest Errors**
- Errors appear at the **bottom** of the terminal
- Scroll down to see most recent errors
- Most recent error = last thing that happened

### **3. Error Format**
Errors usually look like:
```
Error name: Error message
Error details: { ... }
```

**Read the "Error message" part - that's what went wrong!**

---

## 🧪 How to Test/Trigger an Error

### **To see errors, try:**

1. **Make a payment** (if you're testing Stripe)
   - Error will appear when payment is attempted

2. **Add to cart** (if testing cart)
   - Error will appear when cart operation happens

3. **Create product** (if testing admin)
   - Error will appear when product is created

**Errors only appear when the operation is attempted!**

---

## 📝 Common Error Locations

### **If Backend Won't Start:**
Errors appear immediately when you run `npm run dev`

Example:
```
> npm run dev
Error: Cannot find module 'stripe'
```

### **If Backend Runs But API Fails:**
Errors appear when API is called (when you use the website)

Example:
```
Server is running on the port 3000
Connected to the mongodb server

[Error appears here when API is called]
```

---

## 🎯 Quick Checklist

- [ ] Backend terminal is open
- [ ] Can see "Server is running on the port 3000"
- [ ] Scrolled down to see latest messages
- [ ] Looking for RED text or "Error:" messages
- [ ] Error appears AFTER you try the action (payment, etc.)

---

## 📞 What to Share

When asking for help, share:

1. **The full error message** from terminal
2. **What you were doing** when error appeared (making payment, etc.)
3. **Any error details** (the object shown after "Error details:")

Example:
```
Error: Invalid API Key provided
Error details: {
  message: 'Invalid API Key provided',
  type: 'StripeInvalidRequestError',
  code: 'api_key_invalid'
}
```

---

## ✅ Summary

1. **Find the terminal** where you ran `npm run dev` in Backend folder
2. **Look at that terminal** - errors appear there
3. **Scroll down** - errors appear at bottom
4. **Look for "Error:"** - that's the error message
5. **Copy the error** - share it to get help!

**The backend terminal is your best friend for debugging!** 🔍

---

**Can't find the terminal? Just open a new one and run `cd Backend && npm run dev` to see the output!**


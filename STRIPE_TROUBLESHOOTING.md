# 🔧 Stripe Payment Not Working - Troubleshooting Guide

## 🐛 Problem: Nothing Happens When Clicking Credit/Debit Card

### **Common Causes:**

1. **Stripe key not in frontend `.env` file**
2. **Frontend server not restarted** after adding keys
3. **Shipping info not filled** (required before payment form shows)
4. **Browser console errors** (check for JavaScript errors)

---

## ✅ Step-by-Step Fix

### **Step 1: Check Frontend `.env` File**

Open `/frontend/.env` and make sure you have:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Important:**
- ✅ Must start with `pk_test_` (test mode) or `pk_live_` (live mode)
- ✅ No spaces before/after the key
- ✅ No quotes around the key
- ✅ Must be on its own line

### **Step 2: Restart Frontend Server**

**After adding/updating `.env` file, you MUST restart:**

```bash
# Stop frontend (Ctrl+C in terminal)
# Then restart:
cd frontend
npm run dev
```

**Vite (your frontend build tool) only reads `.env` files on startup!**

### **Step 3: Fill Shipping Info First**

The payment form requires:
- ✅ Phone Number
- ✅ Shipping Address

**Fill these BEFORE selecting Credit/Debit Card option!**

### **Step 4: Check Browser Console**

1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Look for errors (red text)
4. Common errors:
   - `Stripe is not defined` → Key missing
   - `Invalid API key` → Wrong key format
   - Network errors → Backend not running

---

## 🔍 How to Verify It's Working

### **1. Check if Key is Loaded**

Open browser console and type:
```javascript
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

**Should show:** `pk_test_...` (your key)
**If shows:** `undefined` → Key not loaded (restart server!)

### **2. Check Network Tab**

1. Open DevTools → Network tab
2. Select Credit/Debit Card
3. Should see request to: `/api/stripe/create-payment-intent`
4. If you see error → Check backend logs

---

## 🎯 What Should Happen

### **When You Click Credit/Debit Card:**

1. ✅ Payment form appears (card input field)
2. ✅ Shows "Initializing payment..." if shipping info missing
3. ✅ Card input field appears after shipping info filled
4. ✅ "Pay $X.XX" button appears

### **If Nothing Happens:**

- ❌ Key not in `.env` → Add it
- ❌ Server not restarted → Restart frontend
- ❌ Shipping info missing → Fill it first
- ❌ JavaScript error → Check console

---

## 📝 Quick Checklist

- [ ] Added `VITE_STRIPE_PUBLISHABLE_KEY` to `frontend/.env`
- [ ] Key starts with `pk_test_` or `pk_live_`
- [ ] No spaces/quotes around key
- [ ] Restarted frontend server after adding key
- [ ] Filled phone number and shipping address
- [ ] Checked browser console for errors
- [ ] Backend is running (port 3000)

---

## 🚨 Common Errors & Fixes

### **Error: "Stripe is not configured"**

**Fix:**
1. Add key to `frontend/.env`
2. Restart frontend server

### **Error: "Invalid API key"**

**Fix:**
1. Check key format (must start with `pk_test_`)
2. No extra spaces
3. Copy entire key from Stripe dashboard

### **Error: "Failed to initialize payment"**

**Fix:**
1. Check backend is running
2. Check `STRIPE_SECRET_KEY` in `Backend/.env`
3. Check browser console for details

### **Nothing Shows Up**

**Fix:**
1. Fill shipping address and phone number FIRST
2. Then select Credit/Debit Card
3. Payment form should appear

---

## 🔄 Still Not Working?

1. **Check Backend Logs:**
   ```bash
   # Look at backend terminal
   # Should see: "Server is running on the port 3000"
   ```

2. **Check Frontend Logs:**
   ```bash
   # Look at frontend terminal
   # Should see: "Local: http://localhost:5173"
   ```

3. **Test Backend API:**
   ```bash
   curl http://localhost:3000/api/product/getAll
   ```

4. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## ✅ Expected Behavior

**Correct Flow:**
1. User fills shipping info
2. User selects "Credit/Debit Card"
3. Payment form appears with card input
4. User enters card details
5. User clicks "Pay $X.XX"
6. Payment processes
7. Success message appears

**If this doesn't happen, follow the steps above!**

---

**Need more help? Check the browser console for specific error messages!**


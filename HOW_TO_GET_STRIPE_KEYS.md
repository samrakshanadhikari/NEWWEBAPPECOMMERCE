# 🔑 How to Get Stripe API Keys - Step-by-Step Guide

## 📋 Quick Overview

1. Sign up for Stripe (free)
2. Go to Developers → API keys
3. Copy your keys
4. Add them to your `.env` files
5. Done! ✅

---

## 🚀 Step-by-Step Instructions

### **Step 1: Go to Stripe Website**

1. Open your browser
2. Go to: **https://stripe.com**
3. Click the **"Start now"** or **"Sign in"** button (top right)

---

### **Step 2: Create Account (or Sign In)**

#### **If you DON'T have an account:**

1. Click **"Start now"**
2. Enter your email address
3. Create a password
4. Click **"Create account"**
5. Verify your email (check inbox)
6. Complete basic info:
   - Business name (can use your name or "Portfolio Project")
   - Country (select your country)
   - Click **"Continue"**

#### **If you ALREADY have an account:**

1. Click **"Sign in"**
2. Enter email and password
3. Click **"Sign in"**

---

### **Step 3: Navigate to API Keys**

Once you're logged in:

1. Look at the **left sidebar**
2. Find **"Developers"** (usually near the bottom)
3. Click on **"Developers"**
4. Click on **"API keys"** (under Developers)

**OR**

1. Click your **profile icon** (top right)
2. Look for **"Developers"** in the dropdown
3. Click **"API keys"**

---

### **Step 4: Find Your Keys**

You'll see a page with two sections:

#### **1. Publishable key** (for Frontend)
- Starts with: `pk_test_...` (test mode) or `pk_live_...` (live mode)
- This is what you need for your **frontend** `.env` file
- Click **"Reveal test key"** or **"Reveal live key"** to see it
- Copy this key

#### **2. Secret key** (for Backend)
- Starts with: `sk_test_...` (test mode) or `sk_live_...` (live mode)
- This is what you need for your **backend** `.env` file
- Click **"Reveal test key"** or **"Reveal live key"** to see it
- Copy this key

**⚠️ Important:** Use **TEST MODE** keys for your portfolio project!

---

### **Step 5: Add Keys to Your Project**

#### **Backend `.env` File**

1. Open: `/Backend/.env`
2. Add this line:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```
3. Replace `sk_test_your_secret_key_here` with your actual secret key
4. Save the file

**Example:**
```env
STRIPE_SECRET_KEY=sk_test_51AbC123XyZ789...
```

#### **Frontend `.env` File**

1. Open: `/frontend/.env`
2. Add this line:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```
3. Replace `pk_test_your_publishable_key_here` with your actual publishable key
4. Save the file

**Example:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51AbC123XyZ789...
```

---

### **Step 6: Restart Your Servers**

After adding the keys, you MUST restart both servers:

#### **Stop Current Servers:**
- Press `Ctrl + C` in both terminal windows

#### **Start Backend:**
```bash
cd Backend
npm run dev
```

#### **Start Frontend:**
```bash
cd frontend
npm run dev
```

---

### **Step 7: Test It!**

1. Go to your app: `http://localhost:5173`
2. Add items to cart
3. Go to checkout
4. Select **"Credit/Debit Card"** payment method
5. Enter test card: `4242 4242 4242 4242`
6. Expiry: Any future date (e.g., `12/25`)
7. CVC: Any 3 digits (e.g., `123`)
8. ZIP: Any 5 digits (e.g., `12345`)
9. Click **"Pay"**
10. Should see success! ✅

---

## 🎯 Visual Guide (What You'll See)

### **Stripe Dashboard Layout:**

```
┌─────────────────────────────────────┐
│  Stripe Dashboard                   │
│                                     │
│  [Home] [Payments] [Customers] ... │
│                                     │
│  Left Sidebar:                      │
│  ├─ Home                            │
│  ├─ Payments                         │
│  ├─ Customers                       │
│  ├─ Products                        │
│  ├─ ...                             │
│  └─ Developers  ← CLICK HERE        │
│     ├─ API keys  ← THEN HERE        │
│     ├─ Webhooks                     │
│     └─ ...                          │
└─────────────────────────────────────┘
```

### **API Keys Page:**

```
┌─────────────────────────────────────┐
│  API keys                           │
│                                     │
│  Test mode keys                     │
│  ┌─────────────────────────────┐    │
│  │ Publishable key            │    │
│  │ pk_test_51AbC123...        │    │
│  │ [Reveal test key]          │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Secret key                  │    │
│  │ sk_test_51AbC123...        │    │
│  │ [Reveal test key]          │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## ⚠️ Important Notes

### **Test Mode vs Live Mode**

**Test Mode (Use This!):**
- ✅ Completely free
- ✅ Keys start with `pk_test_` and `sk_test_`
- ✅ Perfect for portfolio
- ✅ No real money involved
- ✅ Use test cards (like `4242 4242 4242 4242`)

**Live Mode (Don't Use Yet):**
- ⚠️ Keys start with `pk_live_` and `sk_live_`
- ⚠️ Processes real payments
- ⚠️ Charges transaction fees
- ⚠️ Only use when ready for production

**For your portfolio, ALWAYS use TEST MODE!**

---

## 🔒 Security Tips

1. **Never commit `.env` files**
   - ✅ Already in `.gitignore` (good!)
   - ✅ Never share keys publicly
   - ✅ Don't post keys on GitHub

2. **Keep keys secret**
   - ✅ Secret key (`sk_test_...`) is like a password
   - ✅ Only use in backend
   - ✅ Never expose in frontend code

3. **Test keys are safe**
   - ✅ Test keys can't process real payments
   - ✅ Safe to use in development
   - ✅ Can regenerate if needed

---

## 🐛 Troubleshooting

### **"Invalid API Key" Error**

**Check:**
1. ✅ Copied the entire key (no spaces before/after)
2. ✅ Using test keys (`pk_test_` and `sk_test_`)
3. ✅ Added to correct `.env` files
4. ✅ Restarted servers after adding keys
5. ✅ No typos in the keys

### **"Stripe is not defined" Error**

**Check:**
1. ✅ Added `VITE_STRIPE_PUBLISHABLE_KEY` to frontend `.env`
2. ✅ Key starts with `pk_test_`
3. ✅ Restarted frontend server
4. ✅ No spaces in `.env` file

### **Can't Find API Keys**

**Try:**
1. Make sure you're in **Test mode** (toggle at top of dashboard)
2. Look for **"Developers"** in left sidebar
3. Click **"API keys"** under Developers
4. If still can't find, click your profile → **"Developers"**

---

## ✅ Checklist

- [ ] Created Stripe account
- [ ] Logged into Stripe dashboard
- [ ] Found "Developers" → "API keys"
- [ ] Copied Publishable key (`pk_test_...`)
- [ ] Copied Secret key (`sk_test_...`)
- [ ] Added `STRIPE_SECRET_KEY` to `Backend/.env`
- [ ] Added `VITE_STRIPE_PUBLISHABLE_KEY` to `frontend/.env`
- [ ] Restarted both servers
- [ ] Tested payment with test card
- [ ] Payment worked! 🎉

---

## 📞 Need Help?

If you get stuck:

1. **Check Stripe Dashboard:**
   - Make sure you're in **Test mode**
   - Look for toggle at top: "Test mode" / "Live mode"

2. **Check Your `.env` Files:**
   - Backend: `/Backend/.env`
   - Frontend: `/frontend/.env`
   - Make sure keys are on separate lines
   - No quotes around keys
   - No spaces before/after

3. **Check Server Logs:**
   - Backend terminal should show no errors
   - Frontend terminal should show no errors

4. **Stripe Support:**
   - Stripe has great docs: https://stripe.com/docs
   - They have a support chat in dashboard

---

## 🎉 You're Done!

Once you have your keys added and servers restarted, your payment system is ready!

**Test it with:**
- Card: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`
- ZIP: `12345`

**Good luck! 🚀**


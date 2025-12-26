# 🔧 Fixing "Internal Server Error" with Stripe

## 🔍 How to Find the Actual Error

### **Step 1: Check Backend Terminal/Logs**

Look at your backend terminal (where `npm run dev` is running) and you should see error details like:

```
Stripe Payment Intent creation error: [error message]
Error details: { message: '...', type: '...', code: '...' }
```

### **Step 2: Common Issues & Fixes**

#### **Issue 1: Invalid Stripe Secret Key**

**Error:** `Invalid API Key provided`

**Fix:**
1. Go to Stripe Dashboard → Developers → API keys
2. Make sure you're using the **Secret key** (starts with `sk_test_...`)
3. Copy the entire key (no spaces)
4. Update `Backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_full_key_here
   ```
5. Restart backend server

#### **Issue 2: Wrong Key Type**

**Error:** `Invalid API Key provided: pk_test_...` (you're using publishable key)

**Fix:**
- Use **Secret key** (`sk_test_...`) for backend
- **Publishable key** (`pk_test_...`) is only for frontend

#### **Issue 3: Database Validation Error**

**Error:** `ValidationError` or database-related errors

**Fix:**
- Check that MongoDB is connected
- Check that product IDs in cart are valid
- Ensure user is authenticated

#### **Issue 4: Stripe API Network Error**

**Error:** Network/timeout errors

**Fix:**
- Check internet connection
- Stripe API might be temporarily unavailable
- Try again in a few minutes

---

## ✅ Quick Checklist

- [ ] Backend `.env` has `STRIPE_SECRET_KEY=sk_test_...`
- [ ] Key starts with `sk_test_` (not `pk_test_`)
- [ ] No spaces before/after the key
- [ ] Backend server restarted after adding key
- [ ] MongoDB is connected
- [ ] User is logged in (authenticated)
- [ ] Cart has items

---

## 🧪 Test Stripe Key

You can test if your Stripe key is valid:

```bash
# In backend directory
node -e "require('dotenv').config(); const Stripe = require('stripe'); const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); stripe.paymentIntents.list({limit: 1}).then(() => console.log('✅ Key is valid')).catch(e => console.log('❌ Key error:', e.message));"
```

---

## 🔍 Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to select Credit/Debit Card
4. Look for request to `/api/stripe/create-payment-intent`
5. Click on it → **Response** tab
6. See the actual error message

---

## 📝 What I Fixed

I've added:
- ✅ Better error logging (check backend terminal)
- ✅ Stripe initialization check
- ✅ More detailed error messages

**Now check your backend terminal for the specific error!**

---

## 🚨 Next Steps

1. **Check backend terminal** - Look for error details
2. **Check browser console** - Network tab → Response
3. **Verify Stripe key** - Make sure it's the secret key (`sk_test_...`)
4. **Restart backend** if you just added the key

**The actual error message will tell us exactly what's wrong!**


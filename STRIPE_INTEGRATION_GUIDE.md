# 💳 Stripe Payment Integration Guide

## 🎯 Overview

This guide will help you replace Khalti (Nepal-specific) with **Stripe**, which supports:
- ✅ Credit/Debit Cards (Visa, Mastercard, Amex, etc.)
- ✅ Apple Pay
- ✅ Google Pay
- ✅ ACH Direct Debit (Bank transfers)
- ✅ And 40+ payment methods

---

## 📋 Step 1: Get Stripe Account & API Keys

### 1.1 Create Stripe Account
1. Go to https://stripe.com
2. Sign up for free account
3. Complete business verification (can use test mode first)

### 1.2 Get API Keys
1. Go to **Developers → API keys**
2. You'll see:
   - **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret key** (starts with `sk_test_...` or `sk_live_...`)

### 1.3 Add to Environment Variables

**Backend `.env`:**
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Frontend `.env`:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

---

## 📦 Step 2: Install Packages

### Backend
```bash
cd Backend
npm install stripe
```

### Frontend
```bash
cd frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

## 🔧 Step 3: Implementation

### Backend Changes:
1. ✅ Update `paymentModel.js` - Add Stripe payment methods
2. ✅ Update `orderModel.js` - Add Stripe payment methods
3. ✅ Create `stripeController.js` - Handle Stripe payments
4. ✅ Update `orderController.js` - Integrate Stripe
5. ✅ Add Stripe routes

### Frontend Changes:
1. ✅ Update `Checkout.jsx` - Add Stripe Elements
2. ✅ Create payment form with Stripe
3. ✅ Handle payment success

---

## 🧪 Testing

### Test Cards (Stripe Test Mode):
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

### Test Details:
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

---

## 🚀 Benefits for Your Portfolio

✅ **Industry Standard** - Stripe is used by millions of businesses
✅ **International** - Works globally, not just Nepal
✅ **Modern** - Shows you know current payment technologies
✅ **Professional** - Recruiters recognize Stripe integration
✅ **Multiple Methods** - Credit cards, Apple Pay, Google Pay, ACH

---

## 📚 Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe React:** https://stripe.com/docs/stripe-js/react
- **Test Cards:** https://stripe.com/docs/testing

---

## ⚠️ Important Notes

1. **Test Mode First** - Use test keys until ready for production
2. **Never Commit Keys** - Keep API keys in `.env` files
3. **Webhooks** - Set up webhooks for production (handles payment confirmations)
4. **Security** - Stripe handles PCI compliance automatically
5. **Fees** - Stripe charges 2.9% + $0.30 per transaction (standard)

---

## 🎓 For Recruiters

**What This Shows:**
- ✅ Integration with third-party APIs
- ✅ Payment processing knowledge
- ✅ Security awareness (PCI compliance)
- ✅ Modern payment methods (Apple Pay, etc.)
- ✅ International thinking (not just local solutions)

**This is a MAJOR upgrade for your portfolio!** 🚀


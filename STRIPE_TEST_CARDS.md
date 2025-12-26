# 💳 Stripe Test Cards - Complete List

## ✅ Success Cards (These Will Work)

### **1. Visa (Most Common)**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### **2. Visa (Debit)**
```
Card Number: 4000 0566 5566 5556
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### **3. Mastercard**
```
Card Number: 5555 5555 5555 4444
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### **4. American Express**
```
Card Number: 3782 822463 10005
Expiry: Any future date (e.g., 12/25)
CVC: Any 4 digits (e.g., 1234)
ZIP: Any 5 digits (e.g., 12345)
```

---

## ⚠️ Special Test Cards

### **3D Secure (Requires Authentication)**
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

What happens:
- Payment will require authentication
- Stripe will show a modal to authenticate
- Click "Complete authentication"
- Payment succeeds after authentication
```

### **Decline (Card Declined)**
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

What happens:
- Payment will be declined
- Error message: "Your card was declined"
- Useful for testing error handling
```

### **Insufficient Funds**
```
Card Number: 4000 0000 0000 9995
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

What happens:
- Error: "Your card has insufficient funds"
```

---

## 🎯 Recommended Test Card

**For quick testing, use this one:**

```
Card Number: 4242 4242 4242 4242
Expiry: 12/25 (or any future date)
CVC: 123
ZIP: 12345

✅ This always works
✅ No authentication required
✅ Instant success
```

---

## 📝 Important Notes

### **Expiry Date:**
- Must be a **future date**
- Format: `MM/YY` (e.g., `12/25` = December 2025)
- Can use any future month/year

### **CVC (Security Code):**
- Visa/Mastercard: **3 digits** (e.g., `123`)
- American Express: **4 digits** (e.g., `1234`)

### **ZIP Code:**
- Can be any **5 digits** (e.g., `12345`)
- Not actually validated in test mode

---

## 🔄 Testing Different Scenarios

### **Test Successful Payment:**
```
Card: 4242 4242 4242 4242
Result: ✅ Payment succeeds immediately
```

### **Test 3D Secure (Authentication Required):**
```
Card: 4000 0025 0000 3155
Result: ⚠️ Requires authentication, then succeeds
```

### **Test Card Declined:**
```
Card: 4000 0000 0000 0002
Result: ❌ Payment declined with error
```

---

## 🎓 For Your Portfolio

When showing your app to recruiters:

1. **Use the success card:** `4242 4242 4242 4242`
   - Shows payment working
   - Professional demo

2. **Explain:** "This is Stripe's test mode - using test cards for demonstration"

3. **Mention:** "In production, these would be real card numbers processed securely through Stripe"

---

## 📚 More Test Cards

For complete list, visit: https://stripe.com/docs/testing

---

## ✅ Quick Reference

| Card Type | Number | Result |
|-----------|--------|--------|
| Visa | 4242 4242 4242 4242 | ✅ Success |
| Mastercard | 5555 5555 5555 4444 | ✅ Success |
| Amex | 3782 822463 10005 | ✅ Success |
| 3D Secure | 4000 0025 0000 3155 | ⚠️ Requires Auth |
| Declined | 4000 0000 0000 0002 | ❌ Declined |

---

**Just use: `4242 4242 4242 4242` for testing!** 🎉


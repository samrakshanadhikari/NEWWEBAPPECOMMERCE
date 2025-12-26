# 🌳 Step-by-Step: Organize Your Changes into Feature Branches

## 📊 Current Situation

You have:
- ✅ Some feature branches already (good!)
- ⚠️ Uncommitted changes on `main` branch
- 📝 New files that need to be organized

## 🎯 Goal

Organize everything into clean feature branches:
1. `feature/docker-setup`
2. `feature/ci-cd-pipeline`
3. `feature/testing-setup`
4. `feature/aws-deployment`
5. `feature/documentation`
6. `feature/currency-update` (Rs. to USD change)

---

## 📋 Step-by-Step Instructions

### **Step 1: Check Current Status**

```bash
git status
git branch -a
```

### **Step 2: Stash Current Changes (Save them temporarily)**

```bash
# Save all current changes
git stash save "WIP: All new features - Docker, CI/CD, AWS, Testing, Currency update"
```

### **Step 3: Make Sure Main is Clean**

```bash
# Switch to main
git checkout main

# Pull latest (if working with remote)
git pull origin main

# Verify main is clean
git status
```

### **Step 4: Create Feature Branch 1 - Docker Setup**

```bash
# Create and switch to branch
git checkout -b feature/docker-setup

# Add Docker-related files
git add Backend/Dockerfile frontend/Dockerfile docker-compose.yml .dockerignore frontend/nginx.conf

# Commit
git commit -m "feat(docker): Add Docker containerization

- Add Backend Dockerfile with Node.js 20 Alpine
- Add frontend Dockerfile with multi-stage build
- Add docker-compose.yml for full stack deployment
- Add .dockerignore for optimized builds
- Add nginx configuration for production frontend"

# Push to remote
git push -u origin feature/docker-setup
```

### **Step 5: Create Feature Branch 2 - CI/CD Pipeline**

```bash
# Go back to main
git checkout main

# Create CI/CD branch
git checkout -b feature/ci-cd-pipeline

# Add CI/CD files
git add .github/workflows/ci-cd.yml

# Commit
git commit -m "feat(ci-cd): Add GitHub Actions CI/CD pipeline

- Add automated testing workflow
- Add Docker build validation
- Add code quality checks
- Configure to run on push and pull requests"

# Push to remote
git push -u origin feature/ci-cd-pipeline
```

### **Step 6: Create Feature Branch 3 - Testing Infrastructure**

```bash
# Go back to main
git checkout main

# Create testing branch
git checkout -b feature/testing-setup

# Add testing files
git add Backend/jest.config.js frontend/vitest.config.js frontend/src/test/ Backend/__tests__/

# Add updated package.json files
git add Backend/package.json frontend/package.json

# Commit
git commit -m "feat(testing): Add testing infrastructure

- Add Jest configuration for backend
- Add Vitest configuration for frontend
- Add React Testing Library setup
- Add sample test files
- Update package.json with test scripts and dependencies"

# Push to remote
git push -u origin feature/testing-setup
```

### **Step 7: Create Feature Branch 4 - AWS Deployment**

```bash
# Go back to main
git checkout main

# Create AWS branch
git checkout -b feature/aws-deployment

# Add AWS files
git add AWS_DEPLOYMENT_GUIDE.md AWS_QUICK_START.md .ebextensions/ Backend/Dockerrun.aws.json

# Commit
git commit -m "feat(aws): Add AWS deployment configuration

- Add comprehensive AWS deployment guide
- Add quick start guide for fast deployment
- Add Elastic Beanstalk configuration
- Add AWS Docker configuration files
- Document AWS free tier deployment process"

# Push to remote
git push -u origin feature/aws-deployment
```

### **Step 8: Create Feature Branch 5 - Documentation**

```bash
# Go back to main
git checkout main

# Create documentation branch
git checkout -b feature/documentation

# Add documentation files
git add DEPLOYMENT_GUIDE.md IBM_CHECKLIST.md IBM_INTERNSHIP_IMPROVEMENTS.md
git add COST_BREAKDOWN.md YOUR_ACTION_PLAN.md GIT_WORKFLOW_GUIDE.md

# Update README
git add README.md

# Commit
git commit -m "docs: Add comprehensive project documentation

- Add deployment guide for various platforms
- Add IBM internship requirements checklist
- Add improvement plan and cost breakdown
- Add action plan for next steps
- Add Git workflow guide
- Update README with new features"

# Push to remote
git push -u origin feature/documentation
```

### **Step 9: Create Feature Branch 6 - Currency Update**

```bash
# Go back to main
git checkout main

# Create currency branch
git checkout -b feature/currency-update

# Add currency-related changes
git add frontend/src/pages/products/SingleProduct.jsx
git add frontend/src/pages/cart/Cart.jsx
git add frontend/src/pages/products/FetchProduct.jsx
git add frontend/src/pages/orders/OrderDetails.jsx
git add frontend/src/pages/orders/MyOrder.jsx
git add frontend/src/adminDashboard/products/list/ListProduct.jsx
git add frontend/src/adminDashboard/order/OrderList.jsx

# Commit
git commit -m "feat(ui): Update currency display from Rs. to USD

- Change currency symbol from Rs. to $ across all components
- Update product price displays
- Update cart and order total displays
- Update admin dashboard displays
- Standardize to USD currency format"

# Push to remote
git push -u origin feature/currency-update
```

### **Step 10: Create Feature Branch 7 - Category/Auth Fixes**

```bash
# Go back to main
git checkout main

# Create fixes branch
git checkout -b feature/category-auth-fixes

# Add fix files
git add frontend/src/adminDashboard/category/AddCategory.jsx
git add frontend/src/store/categorySlice.js
git add frontend/src/pages/auth/login/Login.jsx
git add frontend/src/store/authSlice.js

# Commit
git commit -m "fix: Resolve category creation and auth token issues

- Fix dispatch unwrap error in AddCategory component
- Update categorySlice to return success/error objects
- Fix login dispatch unwrap error
- Update authSlice to return userData on success
- Improve error handling in Redux thunks"

# Push to remote
git push -u origin feature/category-auth-fixes
```

---

## 🔄 Alternative: If Files Are Already Committed to Main

If you've already committed some changes to main and want to move them:

### **Option A: Create Branches from Current Main (Keep Commits)**

```bash
# For each feature, create branch from current main
git checkout -b feature/docker-setup
# Files already there - just push
git push -u origin feature/docker-setup
```

### **Option B: Reset Main and Reorganize**

```bash
# WARNING: Only if you haven't pushed to remote yet!
# Find the commit before your changes
git log --oneline

# Reset main to that commit (keep changes)
git reset --soft <commit-hash>

# Now follow steps above to create feature branches
```

---

## ✅ After Creating All Branches

### **1. Create Pull Requests on GitHub**

For each feature branch:
1. Go to GitHub
2. Click "Compare & pull request"
3. Add description
4. Request review (optional)
5. Merge when ready

### **2. Merge Order (Recommended)**

Merge in this order:
1. `feature/docker-setup` → main
2. `feature/ci-cd-pipeline` → main
3. `feature/testing-setup` → main
4. `feature/aws-deployment` → main
5. `feature/documentation` → main
6. `feature/currency-update` → main
7. `feature/category-auth-fixes` → main

### **3. After Each Merge**

```bash
# Update main
git checkout main
git pull origin main

# Delete merged branch
git branch -d feature/branch-name
git push origin --delete feature/branch-name
```

---

## 🎯 Quick Reference: All Commands in One Place

```bash
# 1. Stash current changes
git stash save "WIP: All new features"

# 2. Go to main
git checkout main
git pull origin main

# 3. Create each feature branch (repeat for each)
git checkout -b feature/branch-name
git add <files>
git commit -m "type: description"
git push -u origin feature/branch-name

# 4. After merging on GitHub
git checkout main
git pull origin main
git branch -d feature/branch-name
```

---

## 📝 Commit Message Template

```bash
feat(scope): Brief description

Detailed explanation of what and why

- Bullet point 1
- Bullet point 2
- Bullet point 3
```

---

## ✅ Verification Checklist

After creating all branches, verify:

- [ ] All feature branches created
- [ ] Each branch has related files only
- [ ] Commit messages are clear and descriptive
- [ ] All branches pushed to remote
- [ ] Main branch is clean
- [ ] No uncommitted changes

---

**Follow these steps to get professional, clean Git history! 🌳**


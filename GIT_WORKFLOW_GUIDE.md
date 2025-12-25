# 🌿 Git Version Control Guide - Best Practices

## ✅ Good News: Git is Already Set Up!

Your repository is already initialized and connected to GitHub (`origin/main`). Now let's implement **professional Git workflows** with branches and proper commits!

---

## 📚 Git Workflow Strategy

### Branch Strategy (Recommended)

```
main (production-ready code)
  ├── develop (integration branch)
  │   ├── feature/add-payment-integration
  │   ├── feature/fix-image-uploads
  │   ├── bugfix/cors-errors
  │   └── hotfix/security-patch
```

### Branch Types:

1. **`main`** - Production code (always stable, deployable)
2. **`develop`** - Development integration branch
3. **`feature/*`** - New features (e.g., `feature/add-search`)
4. **`bugfix/*`** - Bug fixes (e.g., `bugfix/fix-cart-calculation`)
5. **`hotfix/*`** - Urgent production fixes
6. **`refactor/*`** - Code refactoring

---

## 🎯 Step-by-Step: Setting Up Proper Git Workflow

### Step 1: Create .gitignore (Already Done!)

I've created a root `.gitignore` that excludes:
- `.env` files (sensitive data)
- `node_modules/` (dependencies)
- `dist/` (build outputs)
- Storage files (uploaded images)
- IDE files

### Step 2: Create Develop Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop to GitHub
git push -u origin develop
```

### Step 3: Commit Current Changes

Before creating feature branches, let's commit your current work:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "docs: Add comprehensive documentation and fix deployment issues

- Add architecture explanation docs
- Add REST API documentation
- Add deployment guides
- Fix hardcoded URLs in routes
- Add seedProducts script
- Update .gitignore for proper exclusions"

# Push to develop
git push origin develop
```

---

## 🌿 Working with Feature Branches

### Example: Adding a New Feature

**Scenario:** You want to add a search functionality

```bash
# 1. Make sure you're on develop and it's up to date
git checkout develop
git pull origin develop

# 2. Create a new feature branch
git checkout -b feature/add-product-search

# 3. Work on your feature
# ... make changes to files ...

# 4. Stage and commit your changes
git add .
git commit -m "feat: Add product search functionality

- Add search input component
- Implement search API endpoint
- Add search results page
- Style search UI with Tailwind"

# 5. Push feature branch
git push -u origin feature/add-product-search

# 6. Create Pull Request on GitHub (merge to develop)
# 7. After PR is merged, delete local branch
git checkout develop
git pull origin develop
git branch -d feature/add-product-search
```

---

## 📝 Commit Message Best Practices

### Format:

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types:

- **`feat:`** - New feature
- **`fix:`** - Bug fix
- **`docs:`** - Documentation changes
- **`style:`** - Code style changes (formatting, etc.)
- **`refactor:`** - Code refactoring
- **`test:`** - Adding tests
- **`chore:`** - Maintenance tasks
- **`perf:`** - Performance improvements

### Good Examples:

```bash
# Feature
git commit -m "feat: Add user wishlist functionality

- Create wishlist model and routes
- Add wishlist UI components
- Implement add/remove from wishlist
- Add wishlist page"

# Bug Fix
git commit -m "fix: Resolve cart total calculation error

- Fix price calculation when items are removed
- Add proper error handling for empty cart
- Update cart reducer logic"

# Documentation
git commit -m "docs: Add API endpoint documentation

- Document all REST API endpoints
- Add request/response examples
- Include authentication requirements"

# Refactoring
git commit -m "refactor: Improve error handling in controllers

- Add consistent error response format
- Implement global error handler
- Update all controllers to use error handler"
```

### Bad Examples (Avoid These):

```bash
# Too vague
git commit -m "fix stuff"

# No type
git commit -m "Added search"

# Too long subject
git commit -m "feat: Add a really comprehensive product search functionality that allows users to search by name, category, price range, and rating with advanced filters and sorting options"
```

---

## 🔄 Common Git Workflows

### Daily Workflow:

```bash
# Morning: Start fresh
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/my-new-feature

# Work on feature...
# Make changes, test, etc.

# Commit frequently (small, logical commits)
git add .
git commit -m "feat: Add user profile edit form"

# Continue working...
git add .
git commit -m "feat: Add profile image upload"

# End of day: Push to remote
git push -u origin feature/my-new-feature
```

### Merging Feature to Develop:

```bash
# On GitHub: Create Pull Request
# Or locally:
git checkout develop
git pull origin develop
git merge feature/my-new-feature
git push origin develop
```

### Hotfix (Urgent Production Fix):

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-bug

# Fix the issue
# ... make changes ...

git add .
git commit -m "hotfix: Fix payment processing error

- Resolve null pointer in payment controller
- Add validation for payment amount"

# Merge to both main and develop
git checkout main
git merge hotfix/fix-payment-bug
git push origin main

git checkout develop
git merge hotfix/fix-payment-bug
git push origin develop
```

---

## 🎯 Branch Naming Conventions

### Format: `<type>/<description>`

**Examples:**
- `feature/add-product-reviews`
- `bugfix/fix-cart-calculation`
- `hotfix/security-patch`
- `refactor/improve-api-structure`
- `docs/update-readme`
- `test/add-unit-tests`

**Rules:**
- Use lowercase
- Use hyphens, not underscores
- Be descriptive but concise
- Start with type prefix

---

## 📊 Git Commands Cheat Sheet

### Basic Commands:

```bash
# Check status
git status

# View branches
git branch -a

# Switch branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch

# Stage files
git add .
git add specific-file.js

# Commit
git commit -m "message"

# Push
git push origin branch-name

# Pull latest changes
git pull origin branch-name

# View commit history
git log --oneline --graph

# View changes
git diff

# Undo changes (before staging)
git restore file.js

# Undo staged changes
git restore --staged file.js

# View remote repositories
git remote -v
```

### Advanced Commands:

```bash
# Stash changes (save for later)
git stash
git stash pop

# Rebase (clean history)
git rebase develop

# Cherry-pick (apply specific commit)
git cherry-pick commit-hash

# View file history
git log --follow -- file.js

# Create tag (for releases)
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 🔐 Security: What NOT to Commit

### ❌ NEVER Commit:

1. **`.env` files** - Contains secrets (passwords, API keys)
2. **`node_modules/`** - Dependencies (too large, can reinstall)
3. **Database files** - Use migrations instead
4. **API keys/tokens** - Use environment variables
5. **Personal credentials** - Never!
6. **Large files** - Use Git LFS or external storage

### ✅ Always Commit:

1. **Source code** - All `.js`, `.jsx`, `.ts`, etc.
2. **Configuration files** - `package.json`, `vite.config.js`
3. **Documentation** - `README.md`, docs
4. **Tests** - Test files
5. **Git configs** - `.gitignore`, `.gitattributes`

---

## 🚀 Git Workflow for This Project

### Recommended Structure:

```
main (production)
  └── develop (staging)
      ├── feature/fix-hardcoded-urls
      ├── feature/add-image-cloud-storage
      ├── feature/improve-error-handling
      └── bugfix/fix-cart-updates
```

### Current Status:

You have uncommitted changes. Here's what to do:

```bash
# 1. Create develop branch (if not exists)
git checkout -b develop
git push -u origin develop

# 2. Commit current changes
git add .
git commit -m "docs: Add comprehensive documentation and deployment guides

- Add architecture explanation
- Add REST API documentation  
- Add cloud services explanation
- Add deployment step-by-step guide
- Add pre-deployment checklist
- Fix error handling in routes
- Add seedProducts script"

# 3. Push to develop
git push origin develop

# 4. For new features, create feature branches from develop
git checkout develop
git checkout -b feature/your-feature-name
```

---

## 📋 Git Workflow Checklist

### Before Starting Work:

- [ ] Pull latest changes: `git pull origin develop`
- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Verify you're on correct branch: `git branch`

### While Working:

- [ ] Commit frequently (small, logical commits)
- [ ] Write clear commit messages
- [ ] Test before committing
- [ ] Don't commit broken code

### Before Pushing:

- [ ] Review your changes: `git status`, `git diff`
- [ ] Ensure tests pass
- [ ] Write descriptive commit message
- [ ] Push to remote: `git push origin branch-name`

### Before Merging:

- [ ] Code review (self or peer)
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Create Pull Request on GitHub
- [ ] Get approval (if team project)
- [ ] Merge to develop/main

---

## 🎓 Best Practices Summary

1. **✅ Use branches** - Never commit directly to `main`
2. **✅ Small commits** - Commit logical, small changes
3. **✅ Clear messages** - Descriptive commit messages
4. **✅ Pull before push** - Always sync with remote
5. **✅ Review before merge** - Check your changes
6. **✅ Keep main stable** - Only merge tested code
7. **✅ Use .gitignore** - Exclude sensitive files
8. **✅ Regular commits** - Don't wait days to commit

---

## 🔧 Setting Up Git Hooks (Optional)

### Pre-commit Hook (Lint before commit):

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Run linter before commit
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Commit aborted."
  exit 1
fi
```

### Commit-msg Hook (Enforce commit message format):

```bash
#!/bin/sh
# Check commit message format
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|perf):"; then
  echo "Commit message must start with type (feat, fix, docs, etc.)"
  exit 1
fi
```

---

## 🎯 Quick Start Commands

### Initialize Proper Workflow:

```bash
# 1. Create develop branch
git checkout -b develop
git push -u origin develop

# 2. Commit current changes
git add .
git commit -m "docs: Add comprehensive documentation"
git push origin develop

# 3. Create feature branch for next work
git checkout -b feature/your-feature-name
```

### Daily Workflow:

```bash
# Start
git checkout develop && git pull

# Work
git checkout -b feature/new-feature
# ... make changes ...
git add . && git commit -m "feat: description"
git push origin feature/new-feature

# Merge (via GitHub PR or locally)
git checkout develop
git merge feature/new-feature
git push origin develop
```

---

## ✅ You're Ready!

With this workflow, you'll have:
- ✅ Clean, organized code history
- ✅ Easy collaboration
- ✅ Safe experimentation (branches)
- ✅ Professional development practices
- ✅ Easy rollback if needed
- ✅ Clear feature tracking

**Your Git workflow is now professional-grade!** 🎉



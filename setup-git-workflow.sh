#!/bin/bash

# Git Workflow Setup Script
# This script sets up a professional Git workflow with branches

echo "🌿 Setting up Git Workflow..."

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository. Run 'git init' first."
    exit 1
fi

# Create develop branch
echo "📦 Creating develop branch..."
git checkout -b develop 2>/dev/null || git checkout develop

# Show current status
echo ""
echo "✅ Current branches:"
git branch -a

echo ""
echo "📋 Current status:"
git status --short

echo ""
echo "🎯 Next steps:"
echo "1. Review your changes: git status"
echo "2. Stage changes: git add ."
echo "3. Commit: git commit -m 'docs: Add documentation and improvements'"
echo "4. Push: git push -u origin develop"
echo ""
echo "💡 For new features, create branches:"
echo "   git checkout develop"
echo "   git checkout -b feature/your-feature-name"



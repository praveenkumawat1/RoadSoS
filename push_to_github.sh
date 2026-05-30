#!/bin/bash
# Helper script to initialize git and push the workspace to GitHub.
# USAGE: Edit the REPO_URL variable or pass it as first argument: ./push_to_github.sh <git-repo-url>

set -e
REPO_URL="$1"
if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 <git-repo-url>"
  echo "Example: $0 https://github.com/username/RoadSoS.git"
  exit 1
fi

# Create README if missing
if [ ! -f README.md ]; then
  echo "# RoadSoS" > README.md
  git add README.md || true
fi

# Initialize git if needed
if [ ! -d .git ]; then
  git init
fi

# Add all files, respecting .gitignore
git add .

git commit -m "initial commit" || echo "No changes to commit"

git branch -M main || true

git remote remove origin 2>/dev/null || true

git remote add origin "$REPO_URL"

# Push to remote (may prompt for credentials or require PAT/SSH)
git push -u origin main

echo "Pushed workspace to $REPO_URL"

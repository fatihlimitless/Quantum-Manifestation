# GitHub Deployment Guide for Quantum Manifestation AI

Follow these steps to get your app on GitHub and live on the internet!

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer

## Step 1: Check if Git is Installed

Open PowerShell and run:
```powershell
git --version
```

If you see a version number, you're good! If not, download Git from [git-scm.com](https://git-scm.com/download/win)

## Step 2: Initialize Git Repository

Open PowerShell in your project folder and run these commands:

```powershell
# Navigate to your project
cd C:\Users\Limitless\.gemini\antigravity\scratch\quantum-manifestation-ai

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Quantum Manifestation AI"
```

## Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon in the top right
3. Select **New repository**
4. Name it: `quantum-manifestation-ai`
5. Keep it **Public** (so GitHub Pages works for free)
6. **DON'T** initialize with README (we already have one)
7. Click **Create repository**

## Step 4: Connect Local to GitHub

GitHub will show you commands. Run these in PowerShell:

```powershell
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quantum-manifestation-ai.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You may be asked to log in to GitHub. Follow the prompts.

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 1-2 minutes

Your site will be live at:
```
https://YOUR_USERNAME.github.io/quantum-manifestation-ai
```

## Step 6: Update README with Live URL

After deployment, update the README.md file:

1. Open `README.md`
2. Replace `yourusername` with your actual GitHub username in the Live Demo link
3. Commit and push:

```powershell
git add README.md
git commit -m "Update live demo URL"
git push
```

## 🎉 You're Done!

Your Quantum Manifestation AI is now live on the internet!

## Making Updates Later

Whenever you make changes:

```powershell
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update within 1-2 minutes.

## Troubleshooting

**Problem:** Git not found
- **Solution:** Install Git from [git-scm.com](https://git-scm.com/download/win)

**Problem:** Authentication failed
- **Solution:** Use a Personal Access Token instead of password
  1. Go to GitHub Settings → Developer settings → Personal access tokens
  2. Generate new token with `repo` permissions
  3. Use token as password when prompted

**Problem:** Site not loading
- **Solution:** Wait 2-3 minutes after enabling GitHub Pages, then clear browser cache

## Alternative: Quick Upload Method

If you prefer not to use Git commands:

1. Create repository on GitHub
2. Click **uploading an existing file**
3. Drag and drop: `index.html`, `styles.css`, `app.js`, `README.md`
4. Commit changes
5. Enable GitHub Pages in Settings

---

Need help? Let me know! 🚀

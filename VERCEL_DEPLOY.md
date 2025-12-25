# Vercel Deployment Guide

## ✅ Good News: Environment Variable is OPTIONAL!

The app **automatically uses the Render API URL** in production even without setting environment variables.

## 🚀 Quick Deploy (No Environment Variable Needed)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy - **That's it!** ✅

The app will automatically use: `https://git-grievance-system-backend.onrender.com`

---

## 🔧 Optional: Set Environment Variable

If you want to customize the API URL, add this in Vercel:

**Variable Name:** `REACT_APP_API_URL`  
**Value:** `https://git-grievance-system-backend.onrender.com`

### Steps in Vercel:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add new variable:
   - **Name:** `REACT_APP_API_URL` (exactly like this, no spaces)
   - **Value:** `https://git-grievance-system-backend.onrender.com`
4. Save and redeploy

---

## ⚠️ If You Get "Invalid Characters" Error

Make sure:
- Variable name is exactly: `REACT_APP_API_URL`
- No spaces before or after
- No special characters except underscores
- Starts with letters (REACT_APP_)

---

## 📝 Current Configuration

- **Development:** Uses proxy (localhost:5001)
- **Production:** Automatically uses Render URL
- **With Env Var:** Uses your custom URL

---

## ✅ You're All Set!

The app works without any environment variables. Just deploy! 🚀



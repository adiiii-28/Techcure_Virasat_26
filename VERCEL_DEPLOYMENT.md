# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

### ✅ MongoDB Atlas Setup
1. **Create MongoDB Atlas Account**: [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create Free Cluster** (M0 Sandbox)
3. **Create Database User**
4. **Get Connection String**
5. **Whitelist IP Address** (0.0.0.0/0)

### ✅ Environment Variables Required

#### 🔐 Backend Environment Variables (Vercel):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techcure_virasat
NODE_ENV=production
```

#### 🔐 Frontend Environment Variables (Vercel):
```
REACT_APP_API_URL=https://techcure-virasat-26.vercel.app
```

## 🚀 Deployment Steps

### 📱 Step 1: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**
2. **Import Project** from GitHub
3. **Root Directory**: `backend`
4. **Framework Preset**: `Other`
5. **Build Command**: `npm start`
6. **Environment Variables**: Add MongoDB URI
7. **Deploy**

### 📱 Step 2: Deploy Frontend to Vercel

1. **Import Project** from GitHub
2. **Root Directory**: `client`
3. **Framework Preset**: `Create React App`
4. **Build Command**: `npm run build`
5. **Environment Variables**: Add API URL
6. **Deploy**

## 🔧 Configuration Files

### 📄 vercel.json (Root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

## 🧪 Testing Deployment

### ✅ Check Backend Health
```
https://techcure-virasat-26.vercel.app/health
```

### ✅ Check Data Endpoint
```
https://techcure-virasat-26.vercel.app/data
```

### ✅ Test Frontend
```
https://your-frontend-url.vercel.app
```

## 🐛 Troubleshooting

### ❌ MongoDB Connection Failed
- Check MONGODB_URI format
- Verify MongoDB Atlas user/password
- Check IP whitelist

### ❌ CORS Error
- Check CORS configuration
- Verify API URLs

### ❌ Build Failed
- Check Node.js version (24.x)
- Check package.json dependencies

## 📊 Features After Deployment

✅ **Persistent MongoDB Database**  
✅ **Serverless Functions**  
✅ **Automatic Scaling**  
✅ **Global CDN**  
✅ **HTTPS Security**  
✅ **Environment Variables**  

## 🎯 Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Environment variables set
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] API endpoints working
- [ ] Form submissions saving to MongoDB

---

**🚀 Your app is now production-ready with MongoDB!**

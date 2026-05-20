# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Domain name (optional)
- SSL certificate (for production)

## Step 1: Environment Setup

```bash
# Clone repository
git clone <repo-url>
cd priority-aqua

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

Edit `.env` with your production values:
```env
DATABASE_URL="postgresql://user:pass@host:5432/priority_aqua"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
MPESA_CONSUMER_KEY="your-mpesa-key"
MPESA_CONSUMER_SECRET="your-mpesa-secret"
MPESA_PASS_KEY="your-pass-key"
GOOGLE_MAPS_API_KEY="your-maps-key"
```

## Step 2: Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed demo data
npx prisma db seed
```

## Step 3: Build

```bash
# Production build
npm run build

# Start server
npm start
```

## Step 4: Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Configure environment variables in Vercel dashboard.

## Step 5: Database Hosting (Railway/Supabase)

1. Create PostgreSQL database on Railway or Supabase
2. Update DATABASE_URL in environment variables
3. Run migrations

## Step 6: M-Pesa Configuration

1. Register on Safaricom Developer Portal
2. Create app and get credentials
3. Configure callback URL: `https://your-domain.com/api/payments?action=callback`
4. Set environment variables

## Step 7: Firebase Setup

1. Create Firebase project
2. Enable Cloud Messaging for push notifications
3. Download service account key
4. Configure in environment variables

## Monitoring

- Use Vercel Analytics for performance
- Set up Sentry for error tracking
- Configure UptimeRobot for monitoring

## SSL/HTTPS

Vercel provides SSL automatically. For custom servers:
```bash
# Using Let's Encrypt
certbot --nginx -d your-domain.com
```

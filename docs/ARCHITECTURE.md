# System Architecture

## Overview
Priority Aqua is a full-stack water delivery platform with three main user interfaces:
1. **Customer App** - Web and mobile-responsive ordering
2. **Driver App** - Delivery management for drivers
3. **Admin Dashboard** - Business operations and analytics

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **State**: Zustand (client), React Query (server)
- **Maps**: Google Maps API (simulated)
- **Charts**: CSS-based (production: Recharts)

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + NextAuth.js
- **Payments**: M-Pesa Daraja API
- **Notifications**: Firebase Cloud Messaging

### Infrastructure
- **Hosting**: Vercel (frontend) + Railway/Supabase (DB)
- **CDN**: Vercel Edge Network
- **Images**: Cloudinary
- **Monitoring**: Vercel Analytics

## Data Flow

### Order Flow
```
Customer → Browse Products → Add to Cart → Checkout → M-Pesa Payment
    ↓                                              ↓
Order Created ←── Admin Dashboard ←── Driver Assigned ←── Payment Confirmed
    ↓
Real-time Tracking → Delivery → Proof of Delivery → Review
```

### Payment Flow (M-Pesa)
```
Customer initiates payment
    ↓
STK Push sent to customer's phone
    ↓
Customer enters M-Pesa PIN
    ↓
M-Pesa processes transaction
    ↓
Callback received at /api/payments?action=callback
    ↓
Payment status updated in database
    ↓
Order confirmed, notification sent
```

## Security Architecture

### Authentication
- JWT tokens with 7-day expiry
- Refresh token rotation
- Phone number verification (OTP)
- Google OAuth integration

### Authorization
- Role-based access control (RBAC)
- Middleware protection for routes
- API route guards

### Data Protection
- Password hashing (bcrypt, 10 rounds)
- SQL injection prevention (Prisma ORM)
- XSS protection (Next.js built-in)
- CSRF tokens for forms

## Scalability

### Database
- Connection pooling (PgBouncer)
- Indexed queries for performance
- Read replicas for analytics

### Caching
- React Query for server state
- Next.js ISR for static pages
- Redis for session storage (future)

### CDN
- Static assets on Vercel Edge
- Image optimization (Next.js Image)
- API response caching

## Monitoring & Logging

### Metrics
- Order volume and revenue
- Delivery times
- Driver performance
- Customer satisfaction

### Alerts
- Low stock notifications
- Failed payment alerts
- Driver offline warnings
- System error notifications

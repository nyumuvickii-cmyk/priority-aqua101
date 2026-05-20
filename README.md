# 🌊 PRIORITY AQUA - Premium Water Delivery Platform

A production-ready, full-stack water delivery application built for the Kenyan market. Built with Next.js 14, Prisma, PostgreSQL, and Tailwind CSS.

## 📸 Screenshots

### Customer App
- **Splash Screen** - Animated onboarding with brand identity
- **Home** - Product browsing, categories, featured items, quick actions
- **Products** - Advanced filtering, search, favorites, cart management
- **Cart** - Address selection, delivery type, promo codes
- **Checkout** - M-Pesa STK Push, Airtel Money, Cards, COD
- **Tracking** - Live map simulation, driver info, status timeline, QR verification
- **Orders** - Order history with status filtering and reorder
- **Profile** - Settings, dark mode, language (English/Swahili), loyalty points
- **Subscriptions** - Weekly/bi-weekly/monthly plans with savings
- **Referrals** - Share codes, earn KSh 100 per referral

### Driver App
- **Dashboard** - Online/offline toggle, earnings stats, delivery queue
- **Delivery Management** - Accept/reject, status updates, proof of delivery
- **Earnings** - Daily/weekly/monthly breakdown

### Admin Dashboard
- **Analytics** - Revenue charts, category distribution, KPI cards
- **Orders** - Live monitoring, status management
- **Products** - Inventory management with stock alerts
- **Drivers** - Performance tracking, zone assignment
- **Customers** - User management
- **Promotions** - Promo codes and discount campaigns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- M-Pesa Daraja API credentials (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/priorityaqua/platform.git
cd priority-aqua

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Set up the database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/priority_aqua?schema=public"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# M-Pesa Daraja API
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""
MPESA_PASS_KEY=""
MPESA_BUSINESS_SHORT_CODE="174379"
MPESA_ENVIRONMENT="sandbox"

# Google Maps
GOOGLE_MAPS_API_KEY=""

# Firebase
FIREBASE_API_KEY=""
FIREBASE_PROJECT_ID=""
```

## 🏗️ Architecture

### Database Schema (Prisma)
- **User** - Authentication, roles (CUSTOMER/DRIVER/ADMIN)
- **Address** - Delivery locations with GPS coordinates
- **Product** - Catalog with categories, pricing, inventory
- **Order** - Full order lifecycle with tracking
- **Payment** - M-Pesa, Airtel Money, Card, COD records
- **DriverProfile** - Driver details, earnings, vehicle info
- **Subscription** - Recurring delivery plans
- **LoyaltyPoint** - Points system for rewards
- **Referral** - Referral tracking and rewards
- **DeliveryZone** - Geographic pricing rules
- **PromoCode** - Discount codes and campaigns
- **ChatMessage** - AI chatbot conversation history

### API Endpoints
- `POST /api/auth` - Registration, login, phone verification
- `GET /api/products` - Product listing with filters
- `GET|POST|PATCH /api/orders` - Order CRUD
- `POST /api/payments` - M-Pesa STK Push, query, callback

### Folder Structure
```
priority-aqua/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (customer)/        # Customer app pages
│   ├── (driver)/          # Driver app pages
│   ├── (admin)/           # Admin dashboard pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Splash/onboarding
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── shared/            # Shared providers
│   ├── chatbot/           # AI chatbot
│   ├── customer/          # Customer-specific
│   ├── driver/            # Driver-specific
│   └── admin/             # Admin-specific
├── lib/
│   ├── utils.ts           # Utility functions
│   └── db/prisma.ts       # Prisma client
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Demo data
├── public/                # Static assets
└── docs/                  # Documentation
```

## 💳 Payment Integration

### M-Pesa STK Push
1. Customer enters phone number at checkout
2. System sends STK push to customer's phone
3. Customer enters M-Pesa PIN
4. Callback updates payment status
5. Order is confirmed automatically

### Supported Methods
- ✅ M-Pesa (STK Push)
- ✅ Airtel Money
- ✅ Credit/Debit Cards
- ✅ Cash on Delivery

## 🗺️ Delivery System

### Delivery Types
- **Instant** - Within 2 hours (premium)
- **Standard** - Same day (2-5 hours)
- **Scheduled** - Choose date and time slot
- **Emergency** - Priority 2-hour delivery

### Zones
- Nairobi CBD, Westlands, Karen, Eastlands
- Kiambu Road, Thika Road, Mombasa Road
- Custom zone-based pricing

## 🤖 AI Chatbot (AquaBot)

Built-in customer support chatbot with:
- Quick reply suggestions
- Natural language understanding
- Context-aware responses
- Order tracking assistance
- Pricing and delivery info

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Aqua Blue)
- Secondary: `#0ea5e9` (Ocean Blue)
- Accent: Gradient from aqua to ocean
- Dark mode: Full dark theme support

### Components
- Glassmorphism cards
- Smooth animations (Framer Motion)
- Responsive grid layouts
- Mobile-first design
- Bottom navigation (mobile)

## 📱 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Admin: > 1280px (sidebar)

## 🔒 Security
- JWT authentication
- Password hashing (bcrypt)
- SSL encryption for payments
- Input validation (Zod)
- SQL injection protection (Prisma)

## 🌍 Localization
- English (default)
- Swahili (partial)
- Extensible i18n system

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Business Model

### Revenue Streams
1. **Product Sales** - Bottled water, refills, bulk tanker
2. **Delivery Fees** - Zone-based pricing
3. **Subscriptions** - Recurring weekly/monthly plans
4. **Dispenser Rentals** - Monthly rental fees
5. **Emergency Delivery** - Premium pricing

### Pricing (Kenyan Market)
| Product | Price | Deposit |
|---------|-------|---------|
| 20L Bottled Water | KSh 350 | KSh 500 |
| 10L Bottled Water | KSh 200 | KSh 300 |
| Water Refill (20L) | KSh 150 | - |
| Bulk Tanker (5000L) | KSh 8,000 | - |
| Dispenser Rental | KSh 1,500/mo | KSh 3,000 |

## 📝 License
MIT License - Priority Aqua Team

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support
- Email: support@priorityaqua.co.ke
- Phone: +254 700 000 000
- Chat: In-app AquaBot

---
Built with ❤️ in Nairobi, Kenya 🇰🇪

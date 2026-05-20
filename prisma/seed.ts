import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.$transaction([
    prisma.chatMessage.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.banner.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.loyaltyPoint.deleteMany(),
    prisma.referral.deleteMany(),
    prisma.review.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.orderTracking.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.subscription.deleteMany(),
    prisma.inventory.deleteMany(),
    prisma.fuelLog.deleteMany(),
    prisma.driverEarning.deleteMany(),
    prisma.driverProfile.deleteMany(),
    prisma.adminProfile.deleteMany(),
    prisma.address.deleteMany(),
    prisma.product.deleteMany(),
    prisma.promoCode.deleteMany(),
    prisma.deliveryZone.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@priorityaqua.co.ke',
      phone: '+254712345678',
      password: adminPassword,
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
      phoneVerified: new Date(),
      adminProfile: {
        create: {
          department: 'Operations',
          permissions: ['all'],
        },
      },
    },
  });

  // Create driver users
  const driverPassword = await bcrypt.hash('driver123', 10);
  const drivers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'driver1@priorityaqua.co.ke',
        phone: '+254723456789',
        password: driverPassword,
        name: 'John Kamau',
        role: 'DRIVER',
        status: 'ACTIVE',
        phoneVerified: new Date(),
        driverProfile: {
          create: {
            licenseNumber: 'DL-123456',
            licenseExpiry: new Date('2026-12-31'),
            vehicleType: 'Pickup Truck',
            vehiclePlate: 'KBY 123A',
            vehicleCapacity: 200,
            zone: ['Nairobi CBD', 'Westlands', 'Karen'],
            rating: 4.8,
            totalDeliveries: 342,
            earnings: 125000,
            isOnline: true,
            isAvailable: true,
            currentLat: -1.2921,
            currentLng: 36.8219,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'driver2@priorityaqua.co.ke',
        phone: '+254734567890',
        password: driverPassword,
        name: 'Mary Wanjiku',
        role: 'DRIVER',
        status: 'ACTIVE',
        phoneVerified: new Date(),
        driverProfile: {
          create: {
            licenseNumber: 'DL-789012',
            licenseExpiry: new Date('2026-10-15'),
            vehicleType: 'Van',
            vehiclePlate: 'KCY 456B',
            vehicleCapacity: 150,
            zone: ['Eastleigh', 'Buruburu', 'Umoja'],
            rating: 4.9,
            totalDeliveries: 521,
            earnings: 189000,
            isOnline: true,
            isAvailable: true,
            currentLat: -1.2654,
            currentLng: 36.8512,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'driver3@priorityaqua.co.ke',
        phone: '+254745678901',
        password: driverPassword,
        name: 'Peter Ochieng',
        role: 'DRIVER',
        status: 'ACTIVE',
        phoneVerified: new Date(),
        driverProfile: {
          create: {
            licenseNumber: 'DL-345678',
            licenseExpiry: new Date('2027-03-20'),
            vehicleType: 'Truck',
            vehiclePlate: 'KDY 789C',
            vehicleCapacity: 500,
            zone: ['Industrial Area', 'Mombasa Road', 'Syokimau'],
            rating: 4.6,
            totalDeliveries: 198,
            earnings: 87000,
            isOnline: false,
            isAvailable: true,
            currentLat: -1.3234,
            currentLng: 36.8790,
          },
        },
      },
    }),
  ]);

  // Create customer users
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'customer1@gmail.com',
        phone: '+254711111111',
        password: customerPassword,
        name: 'James Mwangi',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        emailVerified: new Date(),
        phoneVerified: new Date(),
        addresses: {
          create: [
            {
              label: 'Home',
              street: 'Moi Avenue, Ngara Estate',
              building: 'Sunrise Apartments',
              floor: '3rd Floor',
              city: 'Nairobi',
              county: 'Nairobi',
              landmark: 'Near Ngara Market',
              latitude: -1.2768,
              longitude: 36.8219,
              isDefault: true,
              deliveryZone: 'Nairobi CBD',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer2@gmail.com',
        phone: '+254722222222',
        password: customerPassword,
        name: 'Grace Akinyi',
        role: 'CUSTOMER',
        status: 'ACTIVE',
        emailVerified: new Date(),
        phoneVerified: new Date(),
        addresses: {
          create: [
            {
              label: 'Office',
              street: 'Waiyaki Way, Westlands',
              building: 'Delta Towers',
              floor: '5th Floor',
              city: 'Nairobi',
              county: 'Nairobi',
              landmark: 'Opposite Sarit Centre',
              latitude: -1.2648,
              longitude: 36.8028,
              isDefault: true,
              deliveryZone: 'Westlands',
            },
          ],
        },
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: '20L Bottled Water',
        description: 'Premium purified drinking water in 20-liter reusable bottles. Perfect for households and small offices.',
        category: 'BOTTLED_WATER',
        image: '/images/products/20l-bottle.jpg',
        price: 350,
        deposit: 500,
        stock: 500,
        minOrder: 1,
        maxOrder: 20,
        unit: 'bottle',
        capacity: '20L',
        isAvailable: true,
        isFeatured: true,
        tags: ['household', 'office', 'popular'],
      },
    }),
    prisma.product.create({
      data: {
        name: '10L Bottled Water',
        description: 'Compact 10-liter bottle ideal for small families and apartments.',
        category: 'BOTTLED_WATER',
        image: '/images/products/10l-bottle.jpg',
        price: 200,
        deposit: 300,
        stock: 300,
        minOrder: 1,
        maxOrder: 30,
        unit: 'bottle',
        capacity: '10L',
        isAvailable: true,
        isFeatured: false,
        tags: ['household', 'compact'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Water Refill (20L)',
        description: 'Bring your own bottle and get it refilled with purified water.',
        category: 'WATER_REFILL',
        image: '/images/products/refill.jpg',
        price: 150,
        stock: 1000,
        minOrder: 1,
        maxOrder: 50,
        unit: 'refill',
        capacity: '20L',
        isAvailable: true,
        isFeatured: true,
        tags: ['eco-friendly', 'cheap', 'refill'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bulk Tanker (5000L)',
        description: 'Large volume water delivery for construction sites, events, and industrial use.',
        category: 'BULK_TANKER',
        image: '/images/products/tanker.jpg',
        price: 8000,
        stock: 10,
        minOrder: 1,
        maxOrder: 5,
        unit: 'tanker',
        capacity: '5000L',
        isAvailable: true,
        isFeatured: true,
        tags: ['bulk', 'construction', 'events'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bulk Tanker (10000L)',
        description: 'Extra-large volume delivery for swimming pools, large events, and farms.',
        category: 'BULK_TANKER',
        image: '/images/products/tanker-large.jpg',
        price: 15000,
        stock: 5,
        minOrder: 1,
        maxOrder: 3,
        unit: 'tanker',
        capacity: '10000L',
        isAvailable: true,
        isFeatured: false,
        tags: ['bulk', 'farm', 'pool'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Water Dispenser Rental',
        description: 'Hot & cold water dispenser rental. Includes free maintenance.',
        category: 'DISPENSER_RENTAL',
        image: '/images/products/dispenser.jpg',
        price: 1500,
        deposit: 3000,
        stock: 50,
        minOrder: 1,
        maxOrder: 10,
        unit: 'unit',
        isAvailable: true,
        isFeatured: true,
        tags: ['rental', 'office', 'home'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cup Dispenser Stand',
        description: 'Sturdy metal stand with cup dispenser for your water bottles.',
        category: 'ACCESSORIES',
        image: '/images/products/stand.jpg',
        price: 2500,
        stock: 30,
        minOrder: 1,
        maxOrder: 5,
        unit: 'unit',
        isAvailable: true,
        isFeatured: false,
        tags: ['accessories', 'stand'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Emergency Same-Day Delivery',
        description: 'Priority delivery within 2 hours. Available for 20L bottles and refills.',
        category: 'BOTTLED_WATER',
        image: '/images/products/emergency.jpg',
        price: 500,
        stock: 100,
        minOrder: 1,
        maxOrder: 10,
        unit: 'bottle',
        capacity: '20L',
        isAvailable: true,
        isFeatured: false,
        tags: ['emergency', 'fast', 'priority'],
      },
    }),
  ]);

  // Create delivery zones
  const zones = await Promise.all([
    prisma.deliveryZone.create({
      data: {
        name: 'Nairobi CBD',
        county: 'Nairobi',
        areas: ['CBD', 'Ngara', 'Eastleigh', 'Pangani'],
        baseFee: 50,
        perKmFee: 15,
        minOrder: 0,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Westlands',
        county: 'Nairobi',
        areas: ['Westlands', 'Parklands', 'Riverside', 'Spring Valley'],
        baseFee: 80,
        perKmFee: 20,
        minOrder: 200,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Karen & Langata',
        county: 'Nairobi',
        areas: ['Karen', 'Langata', 'Nairobi West', 'South C'],
        baseFee: 100,
        perKmFee: 25,
        minOrder: 300,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Eastlands',
        county: 'Nairobi',
        areas: ['Buruburu', 'Umoja', 'Kayole', 'Embakasi'],
        baseFee: 70,
        perKmFee: 18,
        minOrder: 150,
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Kiambu Road',
        county: 'Kiambu',
        areas: ['Ridgeways', 'Runda', 'Kiambu Town', 'Thika Road'],
        baseFee: 120,
        perKmFee: 30,
        minOrder: 400,
      },
    }),
  ]);

  // Create promo codes
  const promos = await Promise.all([
    prisma.promoCode.create({
      data: {
        code: 'WELCOME50',
        type: 'PERCENTAGE',
        value: 50,
        minOrder: 0,
        maxDiscount: 500,
        usageLimit: 1000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-12-31'),
        applicableTo: ['BOTTLED_WATER', 'WATER_REFILL'],
      },
    }),
    prisma.promoCode.create({
      data: {
        code: 'FREEDEL',
        type: 'FREE_DELIVERY',
        value: 0,
        minOrder: 500,
        usageLimit: 500,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-12-31'),
      },
    }),
    prisma.promoCode.create({
      data: {
        code: 'BULK200',
        type: 'FIXED_AMOUNT',
        value: 200,
        minOrder: 1000,
        maxDiscount: 200,
        usageLimit: 300,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-12-31'),
        applicableTo: ['BULK_TANKER'],
      },
    }),
  ]);

  // Create banners
  const banners = await Promise.all([
    prisma.banner.create({
      data: {
        title: 'Stay Hydrated, Stay Healthy',
        subtitle: 'Premium water delivered to your doorstep in 2 hours',
        image: '/images/banners/banner1.jpg',
        link: '/products',
        position: 'home_top',
        isActive: true,
      },
    }),
    prisma.banner.create({
      data: {
        title: 'Bulk Delivery for Events',
        subtitle: 'Construction sites, weddings, and corporate events',
        image: '/images/banners/banner2.jpg',
        link: '/products?category=BULK_TANKER',
        position: 'home_middle',
        isActive: true,
      },
    }),
  ]);

  // Create announcements
  const announcements = await Promise.all([
    prisma.announcement.create({
      data: {
        title: 'New: Emergency Same-Day Delivery',
        content: 'Running low on water? Order now and get delivery within 2 hours in select areas.',
        type: 'success',
        isActive: true,
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Refer a Friend, Earn KSh 100',
        content: 'Share your referral code and earn loyalty points for every successful referral.',
        type: 'info',
        isActive: true,
      },
    }),
  ]);

  // Create sample orders
  const sampleOrders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'PA-001-2024',
        userId: customers[0].id,
        addressId: (await prisma.address.findFirst({ where: { userId: customers[0].id } }))!.id,
        driverId: drivers[0].driverProfile!.id,
        status: 'DELIVERED',
        paymentStatus: 'COMPLETED',
        paymentMethod: 'MPESA',
        deliveryType: 'STANDARD',
        subtotal: 700,
        deliveryFee: 50,
        discount: 0,
        depositTotal: 1000,
        total: 1750,
        deliveredAt: new Date('2024-05-15'),
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 2,
              price: 350,
              deposit: 500,
              total: 1700,
            },
          ],
        },
        payment: {
          create: {
            method: 'MPESA',
            amount: 1750,
            transactionId: 'SIB89KJ2L3',
            status: 'COMPLETED',
            mpesaReceipt: 'SIB89KJ2L3',
            paidAt: new Date('2024-05-15'),
          },
        },
        tracking: {
          create: [
            { status: 'PENDING', createdAt: new Date('2024-05-15T08:00:00') },
            { status: 'CONFIRMED', createdAt: new Date('2024-05-15T08:15:00') },
            { status: 'ASSIGNED', createdAt: new Date('2024-05-15T08:30:00') },
            { status: 'ON_THE_WAY', createdAt: new Date('2024-05-15T09:00:00') },
            { status: 'DELIVERED', createdAt: new Date('2024-05-15T10:30:00') },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'PA-002-2024',
        userId: customers[1].id,
        addressId: (await prisma.address.findFirst({ where: { userId: customers[1].id } }))!.id,
        status: 'ON_THE_WAY',
        paymentStatus: 'COMPLETED',
        paymentMethod: 'MPESA',
        deliveryType: 'STANDARD',
        subtotal: 150,
        deliveryFee: 80,
        discount: 0,
        total: 230,
        items: {
          create: [
            {
              productId: products[2].id,
              quantity: 1,
              price: 150,
              deposit: 0,
              total: 150,
            },
          ],
        },
        payment: {
          create: {
            method: 'MPESA',
            amount: 230,
            transactionId: 'SIB90KJ2L4',
            status: 'COMPLETED',
            mpesaReceipt: 'SIB90KJ2L4',
            paidAt: new Date(),
          },
        },
        tracking: {
          create: [
            { status: 'PENDING', createdAt: new Date(Date.now() - 3600000) },
            { status: 'CONFIRMED', createdAt: new Date(Date.now() - 3000000) },
            { status: 'ASSIGNED', createdAt: new Date(Date.now() - 2400000) },
            { status: 'ON_THE_WAY', latitude: -1.2800, longitude: 36.8300, createdAt: new Date(Date.now() - 1800000) },
          ],
        },
      },
    }),
  ]);

  // Create loyalty points
  await prisma.loyaltyPoint.create({
    data: {
      userId: customers[0].id,
      points: 350,
      type: 'EARNED',
      description: 'Points from order PA-001-2024',
      orderId: sampleOrders[0].id,
    },
  });

  // Create subscriptions
  await prisma.subscription.create({
    data: {
      userId: customers[0].id,
      productId: products[0].id,
      plan: 'STANDARD',
      frequency: 'weekly',
      quantity: 2,
      price: 700,
      nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'ACTIVE',
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      userId: customers[0].id,
      productId: products[0].id,
      orderId: sampleOrders[0].id,
      rating: 5,
      comment: 'Excellent service! Water was delivered on time and the quality is top-notch. Will definitely order again.',
    },
  });

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: customers[0].id,
        type: 'ORDER_UPDATE',
        title: 'Order Delivered',
        message: 'Your order PA-001-2024 has been delivered successfully.',
        isRead: true,
      },
      {
        userId: customers[0].id,
        type: 'PAYMENT_SUCCESS',
        title: 'Payment Received',
        message: 'KSh 1,750 received via M-Pesa. Transaction ID: SIB89KJ2L3',
        isRead: true,
      },
      {
        userId: customers[1].id,
        type: 'DELIVERY_ASSIGNED',
        title: 'Driver Assigned',
        message: 'John Kamau is on the way with your order PA-002-2024.',
        isRead: false,
      },
    ],
  });

  // Create chat messages
  await prisma.chatMessage.createMany({
    data: [
      {
        userId: customers[0].id,
        role: 'USER',
        message: 'Hi, what are your delivery hours?',
        intent: 'delivery_hours',
      },
      {
        userId: customers[0].id,
        role: 'ASSISTANT',
        message: 'Hello! We deliver from 7:00 AM to 8:00 PM, Monday through Saturday. Emergency same-day delivery is available until 6:00 PM. Sunday deliveries are available for subscription customers only.',
      },
      {
        userId: customers[0].id,
        role: 'USER',
        message: 'How much is the deposit for a 20L bottle?',
        intent: 'pricing',
      },
      {
        userId: customers[0].id,
        role: 'ASSISTANT',
        message: 'The deposit for a 20L bottle is KSh 500. This is fully refundable when you return the bottle in good condition. If you already have a bottle, you can opt for our refill service at only KSh 150 per 20L.',
      },
    ],
  });

  console.log('✅ Seed completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - ${1} Admin`);
  console.log(`   - ${drivers.length} Drivers`);
  console.log(`   - ${customers.length} Customers`);
  console.log(`   - ${products.length} Products`);
  console.log(`   - ${zones.length} Delivery Zones`);
  console.log(`   - ${promos.length} Promo Codes`);
  console.log(`   - ${sampleOrders.length} Sample Orders`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

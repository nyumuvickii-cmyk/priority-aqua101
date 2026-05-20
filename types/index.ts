export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatar: string | null;
  role: 'CUSTOMER' | 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';
  status: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  image: string | null;
  price: number;
  deposit: number | null;
  stock: number;
  minOrder: number;
  maxOrder: number | null;
  unit: string;
  capacity: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  building: string | null;
  floor: string | null;
  city: string;
  county: string;
  landmark: string | null;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  deliveryType: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  depositTotal: number;
  total: number;
  createdAt: string;
  deliveredAt: string | null;
  items: OrderItem[];
  address: Address;
  driver?: DriverProfile;
  tracking: OrderTracking[];
  review?: Review;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  deposit: number;
  total: number;
  product: Product;
}

export interface OrderTracking {
  id: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  vehiclePlate: string;
  rating: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentLat: number | null;
  currentLng: number | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  images: string[];
  createdAt: string;
  user: {
    name: string | null;
    avatar: string | null;
  };
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: string;
  value: number;
  minOrder: number | null;
  maxDiscount: number | null;
}

export interface DeliveryZone {
  id: string;
  name: string;
  county: string;
  areas: string[];
  baseFee: number;
  perKmFee: number;
}

export interface Subscription {
  id: string;
  plan: string;
  frequency: string;
  quantity: number;
  price: number;
  nextDelivery: string;
  status: string;
  product: Product;
}

export interface LoyaltyPoint {
  id: string;
  points: number;
  type: string;
  description: string | null;
  createdAt: string;
}

export interface Referral {
  id: string;
  code: string;
  status: string;
  rewardAmount: number;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalDrivers: number;
  pendingOrders: number;
  todayOrders: number;
  revenueGrowth: number;
  orderGrowth: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface ChatMessage {
  role: 'USER' | 'ASSISTANT';
  message: string;
}

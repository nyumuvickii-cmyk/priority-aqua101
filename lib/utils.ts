import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatPhone(phone: string): string {
  if (phone.startsWith('+254')) {
    return phone.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  }
  if (phone.startsWith('0')) {
    return phone.replace(/(0)(\d{3})(\d{3})(\d{3})/, '0$2 $3 $4');
  }
  return phone;
}

export function generateOrderNumber(): string {
  const prefix = 'PA';
  const date = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${date}-${random}`;
}

export function generateReferralCode(): string {
  return 'PA' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
  ASSIGNED: 'bg-purple-100 text-purple-800 border-purple-200',
  PICKED_UP: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  ON_THE_WAY: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  NEARBY: 'bg-teal-100 text-teal-800 border-teal-200',
  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  ASSIGNED: 'Driver Assigned',
  PICKED_UP: 'Picked Up',
  ON_THE_WAY: 'On The Way',
  NEARBY: 'Nearby',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

export const paymentMethodLabels: Record<string, string> = {
  MPESA: 'M-Pesa',
  AIRTEL_MONEY: 'Airtel Money',
  CARD: 'Credit/Debit Card',
  CASH_ON_DELIVERY: 'Cash on Delivery',
  WALLET: 'Wallet',
};

export const swahiliTranslations: Record<string, string> = {
  'Home': 'Nyumbani',
  'Products': 'Bidhaa',
  'Cart': 'Kikapu',
  'Orders': 'Maagizo',
  'Profile': 'Wasifu',
  'Delivery': 'Uwasilishaji',
  'Payment': 'Malipo',
  'Settings': 'Mipangilio',
  'Logout': 'Toka',
  'Login': 'Ingia',
  'Register': 'Jisajili',
  'Search': 'Tafuta',
  'Add to Cart': 'Ongeza Kikapuni',
  'Checkout': 'Lipa',
  'Total': 'Jumla',
  'Subtotal': 'Jumla Ndogo',
  'Delivery Fee': 'Ada ya Uwasilishaji',
  'Discount': 'Punguzo',
  'Apply': 'Tekeleza',
  'Cancel': 'Ghairi',
  'Confirm': 'Thibitisha',
  'Save': 'Hifadhi',
  'Edit': 'Hariri',
  'Delete': 'Futa',
  'View': 'Tazama',
  'Track': 'Fuatilia',
  'Rate': 'Kadiria',
  'Review': 'Tathmini',
  'Pending': 'Inasubiri',
  'Delivered': 'Imewasilishwa',
  'On The Way': 'Njiani',
  'Emergency': 'Dharura',
  'Standard': 'Kawaida',
  'Instant': 'Mara Moja',
  'Water': 'Maji',
  'Bottle': 'Chupa',
  'Refill': 'Jaza Tena',
  'Tanker': 'Tanki',
  'Dispenser': 'Kigawanyaji',
  'Address': 'Anwani',
  'Phone': 'Simu',
  'Email': 'Barua Pepe',
  'Name': 'Jina',
  'Password': 'Nenosiri',
  'Confirm Password': 'Thibitisha Nenosiri',
  'Forgot Password': 'Umesahau Nenosiri',
  'Reset Password': 'Weka Upya Nenosiri',
  'Welcome': 'Karibu',
  'Thank You': 'Asante',
  'Order': 'Agizo',
  'Order Number': 'Nambari ya Agizo',
  'Order Date': 'Tarehe ya Agizo',
  'Delivery Date': 'Tarehe ya Uwasilishaji',
  'Status': 'Hali',
  'Quantity': 'Kiasi',
  'Price': 'Bei',
  'Amount': 'Kiasi',
  'Continue': 'Endelea',
  'Back': 'Rudi',
  'Next': 'Ifuatayo',
  'Done': 'Kamilika',
  'Loading': 'Inapakia',
  'Error': 'Kosa',
  'Success': 'Mafanikio',
  'Warning': 'Onyo',
  'Info': 'Taarifa',
  'Close': 'Funga',
  'Open': 'Fungua',
  'New': 'Mpya',
  'Popular': 'Maarufu',
  'Featured': 'Zilizopewa Kipaumbele',
  'Recommended': 'Zilizopendekezwa',
  'Subscription': 'Usajili',
  'Weekly': 'Kila Wiki',
  'Monthly': 'Kila Mwezi',
  'Referral': 'Rufaa',
  'Loyalty Points': 'Pointi za Uaminifu',
  'Earnings': 'Mapato',
  'Analytics': 'Takwimu',
  'Dashboard': 'Dashibodi',
  'Reports': 'Ripoti',
  'Customers': 'Wateja',
  'Drivers': 'Wasilishaji',
  'Inventory': 'Hesabu ya Bidhaa',
  'Sales': 'Mauzo',
  'Revenue': 'Mapato',
  'Expenses': 'Matumizi',
  'Profit': 'Faida',
  'Growth': 'Ukuaji',
  'Today': 'Leo',
  'Yesterday': 'Jana',
  'This Week': 'Wiki Hii',
  'This Month': 'Mwezi Huu',
  'This Year': 'Mwaka Huu',
};

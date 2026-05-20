"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  MapPin,
  Search,
  Bell,
  ShoppingCart,
  Truck,
  Clock,
  Star,
  ChevronRight,
  Flame,
  Zap,
  Calendar,
  Gift,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
} from "lucide-react";
import { useTheme } from "next-themes";

const categories = [
  { id: "bottled", name: "Bottled Water", icon: "💧", color: "from-blue-400 to-blue-600" },
  { id: "refill", name: "Refills", icon: "🔄", color: "from-cyan-400 to-cyan-600" },
  { id: "bulk", name: "Bulk Tanker", icon: "🚛", color: "from-indigo-400 to-indigo-600" },
  { id: "dispenser", name: "Dispensers", icon: "🏠", color: "from-teal-400 to-teal-600" },
  { id: "emergency", name: "Emergency", icon: "⚡", color: "from-red-400 to-red-600" },
  { id: "subscription", name: "Subscribe", icon: "📅", color: "from-purple-400 to-purple-600" },
];

const featuredProducts = [
  {
    id: "1",
    name: "20L Bottled Water",
    price: 350,
    deposit: 500,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    tag: "Best Seller",
    tagColor: "bg-orange-500",
  },
  {
    id: "2",
    name: "Water Refill (20L)",
    price: 150,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    tag: "Eco-Friendly",
    tagColor: "bg-green-500",
  },
  {
    id: "3",
    name: "Bulk Tanker (5000L)",
    price: 8000,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 89,
    tag: "Construction",
    tagColor: "bg-blue-500",
  },
  {
    id: "4",
    name: "Dispenser Rental",
    price: 1500,
    deposit: 3000,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    tag: "Monthly",
    tagColor: "bg-purple-500",
  },
];

const banners = [
  {
    id: "1",
    title: "Stay Hydrated, Stay Healthy",
    subtitle: "Premium water delivered in 2 hours",
    gradient: "from-aqua-500 to-ocean-600",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Bulk Delivery for Events",
    subtitle: "Construction sites, weddings & more",
    gradient: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
  },
];

const quickActions = [
  { icon: <Zap className="w-5 h-5" />, label: "Emergency", href: "/products?emergency=true", color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
  { icon: <Calendar className="w-5 h-5" />, label: "Schedule", href: "/products?schedule=true", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { icon: <Gift className="w-5 h-5" />, label: "Refer & Earn", href: "/referrals", color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
  { icon: <Star className="w-5 h-5" />, label: "Loyalty", href: "/profile?tab=loyalty", color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [cartCount] = useState(3);
  const [notificationCount] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">PRIORITY AQUA</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search water, dispensers, tankers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-aqua-500 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-aqua-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/profile" className="hidden sm:block">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-100 to-ocean-100 dark:from-aqua-900/30 dark:to-ocean-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-aqua-600" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">PRIORITY AQUA</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { icon: <Droplets className="w-5 h-5" />, label: "Home", href: "/home" },
                  { icon: <Search className="w-5 h-5" />, label: "Products", href: "/products" },
                  { icon: <ShoppingCart className="w-5 h-5" />, label: "Cart", href: "/cart" },
                  { icon: <Truck className="w-5 h-5" />, label: "Orders", href: "/orders" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Addresses", href: "/addresses" },
                  { icon: <Calendar className="w-5 h-5" />, label: "Subscriptions", href: "/subscriptions" },
                  { icon: <Gift className="w-5 h-5" />, label: "Referrals", href: "/referrals" },
                  { icon: <User className="w-5 h-5" />, label: "Profile", href: "/profile" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Location Bar */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 text-aqua-500" />
          <span>Delivering to:</span>
          <span className="font-semibold text-gray-900 dark:text-white">Ngara Estate, Nairobi</span>
          <button className="text-aqua-600 hover:text-aqua-700 font-medium ml-2">Change</button>
        </div>

        {/* Hero Banner Carousel */}
        <div className="relative rounded-3xl overflow-hidden h-64 md:h-80">
          <motion.div
            animate={{ x: `-${currentBanner * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-full"
          >
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-full h-full relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  >
                    {banner.title}
                  </motion.h2>
                  <p className="text-white/80 text-lg mb-6">{banner.subtitle}</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-white text-aqua-600 px-6 py-3 rounded-xl font-semibold w-fit hover:bg-white/90 transition-colors"
                  >
                    Order Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentBanner ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`p-3 rounded-xl ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <Link href="/products" className="text-aqua-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-center">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold">Featured Products</h2>
            </div>
            <Link href="/products" className="text-aqua-600 text-sm font-medium flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/products/${product.id}`} className="group block">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 ${product.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {product.tag}
                      </span>
                      <button className="absolute bottom-3 right-3 w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-aqua-500 hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-aqua-600">KSh {product.price}</span>
                        {product.deposit && (
                          <span className="text-xs text-gray-500">+ KSh {product.deposit} deposit</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-aqua-50 to-ocean-50 dark:from-aqua-900/10 dark:to-ocean-900/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-center mb-8">Why Choose Priority Aqua?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-8 h-8 text-aqua-500" />, title: "2-Hour Delivery", desc: "Emergency same-day service" },
              { icon: <Shield className="w-8 h-8 text-ocean-500" />, title: "Certified Pure", desc: "ISO 22000 certified water" },
              { icon: <Truck className="w-8 h-8 text-aqua-600" />, title: "Free Delivery", desc: "On orders above KSh 500" },
              { icon: <Star className="w-8 h-8 text-ocean-600" />, title: "4.9 Rating", desc: "From 10,000+ customers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Never Run Out of Water</h2>
              <p className="text-white/80">Subscribe and save up to 20%. Weekly, bi-weekly, or monthly deliveries.</p>
            </div>
            <Link
              href="/subscriptions"
              className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Start Subscription
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 lg:hidden z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: <Droplets className="w-5 h-5" />, label: "Home", href: "/home", active: true },
            { icon: <Search className="w-5 h-5" />, label: "Browse", href: "/products", active: false },
            { icon: <ShoppingCart className="w-5 h-5" />, label: "Cart", href: "/cart", active: false },
            { icon: <Truck className="w-5 h-5" />, label: "Orders", href: "/orders", active: false },
            { icon: <User className="w-5 h-5" />, label: "Profile", href: "/profile", active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl ${
                item.active
                  ? "text-aqua-600"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer padding for mobile nav */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingCart, Users, Truck, Package,
  DollarSign, TrendingUp, TrendingDown, Star, Clock,
  MapPin, Bell, Search, Filter, ChevronDown, MoreVertical,
  Download, Calendar, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, Activity, Zap, AlertTriangle,
 Check
} from "lucide-react";

// Recharts would be used here in production - simulating with CSS charts
const salesData = [
  { day: "Mon", revenue: 45000, orders: 32 },
  { day: "Tue", revenue: 52000, orders: 41 },
  { day: "Wed", revenue: 48000, orders: 35 },
  { day: "Thu", revenue: 61000, orders: 48 },
  { day: "Fri", revenue: 58000, orders: 44 },
  { day: "Sat", revenue: 72000, orders: 56 },
  { day: "Sun", revenue: 35000, orders: 28 },
];

const categoryData = [
  { name: "Bottled Water", value: 45, color: "bg-aqua-500" },
  { name: "Refills", value: 25, color: "bg-cyan-500" },
  { name: "Bulk Tanker", value: 20, color: "bg-indigo-500" },
  { name: "Dispensers", value: 10, color: "bg-purple-500" },
];

const recentOrders = [
  { id: "PA-24-7891", customer: "James Mwangi", items: "3 items", total: 6400, status: "On The Way", time: "10:30 AM" },
  { id: "PA-24-7892", customer: "Grace Akinyi", items: "1 item", total: 230, status: "Pending", time: "10:45 AM" },
  { id: "PA-24-7890", customer: "Peter Omondi", items: "1 item", total: 8000, status: "Delivered", time: "9:15 AM" },
  { id: "PA-24-7889", customer: "Mary Wanjiku", items: "2 items", total: 700, status: "Delivered", time: "Yesterday" },
  { id: "PA-24-7888", customer: "John Kamau", items: "5 items", total: 1750, status: "Delivered", time: "Yesterday" },
];

const topDrivers = [
  { name: "John Kamau", deliveries: 342, rating: 4.8, earnings: 125000, status: "online" },
  { name: "Mary Wanjiku", deliveries: 521, rating: 4.9, earnings: 189000, status: "online" },
  { name: "Peter Ochieng", deliveries: 198, rating: 4.6, earnings: 87000, status: "offline" },
];

const statusColors: Record<string, string> = {
  "On The Way": "bg-aqua-100 text-aqua-700",
  "Pending": "bg-yellow-100 text-yellow-700",
  "Delivered": "bg-green-100 text-green-700",
  "Cancelled": "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("week");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "KSh 364,000",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-aqua-500 to-ocean-500",
    },
    {
      title: "Total Orders",
      value: "284",
      change: "+8.2%",
      trend: "up",
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Active Customers",
      value: "1,247",
      change: "+15.3%",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Drivers",
      value: "24",
      change: "-2.1%",
      trend: "down",
      icon: <Truck className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 hidden lg:flex flex-col`}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">PRIORITY AQUA</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", href: "/admin/dashboard", active: true },
            { icon: <ShoppingCart className="w-5 h-5" />, label: "Orders", href: "/admin/orders", active: false },
            { icon: <Package className="w-5 h-5" />, label: "Products", href: "/admin/products", active: false },
            { icon: <Users className="w-5 h-5" />, label: "Customers", href: "/admin/customers", active: false },
            { icon: <Truck className="w-5 h-5" />, label: "Drivers", href: "/admin/drivers", active: false },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", href: "/admin/analytics", active: false },
            { icon: <Zap className="w-5 h-5" />, label: "Promotions", href: "/admin/promotions", active: false },
            { icon: <Activity className="w-5 h-5" />, label: "Settings", href: "/admin/settings", active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-aqua-50 dark:bg-aqua-900/20 text-aqua-600"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm w-64"
                />
              </div>
              <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm">
                <Calendar className="w-4 h-4" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent font-medium"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center`}>
                    {card.icon}
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    card.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {card.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold">Revenue Overview</h3>
                  <p className="text-sm text-gray-500">Daily revenue for this week</p>
                </div>
                <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Simulated Bar Chart */}
              <div className="flex items-end justify-between h-48 gap-2">
                {salesData.map((day, i) => {
                  const maxRevenue = Math.max(...salesData.map(d => d.revenue));
                  const height = (day.revenue / maxRevenue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-aqua-500 to-ocean-400"
                        />
                        <div className="absolute -top-6 text-xs font-medium text-gray-600 dark:text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
                          KSh {(day.revenue / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold mb-2">Sales by Category</h3>
              <p className="text-sm text-gray-500 mb-6">Product category distribution</p>

              {/* Simulated Pie Chart */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {categoryData.reduce((acc, cat, i) => {
                    const prevTotal = acc.prev;
                    const dashArray = `${cat.value} ${100 - cat.value}`;
                    const dashOffset = -prevTotal;
                    acc.prev += cat.value;
                    acc.elements.push(
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className={cat.color.replace("bg-", "stroke-")}
                      />
                    );
                    return acc;
                  }, { prev: 0, elements: [] as React.ReactNode[] }).elements}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">284</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <span className="text-sm font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders & Top Drivers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Recent Orders</h3>
                <Link href="/admin/orders" className="text-sm text-aqua-600 hover:text-aqua-700">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-100 to-ocean-100 dark:from-aqua-900/30 dark:to-ocean-900/30 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-aqua-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.customer} • {order.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">KSh {order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Drivers */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Top Drivers</h3>
                <Link href="/admin/drivers" className="text-sm text-aqua-600 hover:text-aqua-700">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {topDrivers.map((driver, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center text-white font-bold">
                          {driver.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                          driver.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{driver.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Truck className="w-3 h-3" /> {driver.deliveries}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {driver.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">KSh {driver.earnings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">earned</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">System Alerts</h3>
            <div className="space-y-3">
              {[
                { type: "warning", message: "Low stock alert: 20L Bottled Water (45 units remaining)", time: "5 min ago" },
                { type: "info", message: "Driver Peter Ochieng has been offline for 3 hours", time: "1 hour ago" },
                { type: "success", message: "Weekly revenue target achieved: KSh 364,000 / KSh 350,000", time: "2 hours ago" },
              ].map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    alert.type === "warning" ? "bg-yellow-50 dark:bg-yellow-900/20" :
                    alert.type === "info" ? "bg-blue-50 dark:bg-blue-900/20" :
                    "bg-green-50 dark:bg-green-900/20"
                  }`}
                >
                  {alert.type === "warning" ? <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" /> :
                   alert.type === "info" ? <Bell className="w-5 h-5 text-blue-600 mt-0.5" /> :
                   <Check className="w-5 h-5 text-green-600 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

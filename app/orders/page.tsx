"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Search, Filter, Package, Truck, Check, Clock,
  X, ChevronRight, Star, RotateCcw, MapPin
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  items: { name: string; qty: number }[];
  total: number;
  date: string;
  address: string;
  isRated: boolean;
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "PA-24-7891",
    status: "ON_THE_WAY",
    items: [{ name: "20L Bottled Water", qty: 2 }, { name: "Water Refill", qty: 1 }],
    total: 6400,
    date: "Today, 10:30 AM",
    address: "Ngara Estate, Nairobi",
    isRated: false,
  },
  {
    id: "2",
    orderNumber: "PA-24-7856",
    status: "DELIVERED",
    items: [{ name: "20L Bottled Water", qty: 1 }],
    total: 850,
    date: "Yesterday, 2:15 PM",
    address: "Westlands, Nairobi",
    isRated: true,
  },
  {
    id: "3",
    orderNumber: "PA-24-7823",
    status: "DELIVERED",
    items: [{ name: "Bulk Tanker (5000L)", qty: 1 }],
    total: 8000,
    date: "May 17, 2026",
    address: "Industrial Area, Nairobi",
    isRated: false,
  },
  {
    id: "4",
    orderNumber: "PA-24-7790",
    status: "CANCELLED",
    items: [{ name: "10L Bottled Water", qty: 3 }],
    total: 600,
    date: "May 15, 2026",
    address: "Karen, Nairobi",
    isRated: false,
  },
  {
    id: "5",
    orderNumber: "PA-24-7756",
    status: "DELIVERED",
    items: [{ name: "Dispenser Rental", qty: 1 }, { name: "20L Bottled Water", qty: 4 }],
    total: 2900,
    date: "May 12, 2026",
    address: "Eastleigh, Nairobi",
    isRated: true,
  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  PENDING: { color: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4" />, label: "Pending" },
  CONFIRMED: { color: "bg-blue-100 text-blue-700", icon: <Check className="w-4 h-4" />, label: "Confirmed" },
  ON_THE_WAY: { color: "bg-aqua-100 text-aqua-700", icon: <Truck className="w-4 h-4" />, label: "On The Way" },
  DELIVERED: { color: "bg-green-100 text-green-700", icon: <Package className="w-4 h-4" />, label: "Delivered" },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: <X className="w-4 h-4" />, label: "Cancelled" },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/home" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">My Orders</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-0 shadow-sm focus:ring-2 focus:ring-aqua-500 text-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Orders", count: orders.length },
            { id: "ON_THE_WAY", label: "Active", count: orders.filter(o => o.status === "ON_THE_WAY").length },
            { id: "DELIVERED", label: "Delivered", count: orders.filter(o => o.status === "DELIVERED").length },
            { id: "CANCELLED", label: "Cancelled", count: orders.filter(o => o.status === "CANCELLED").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                filter === tab.id
                  ? "bg-aqua-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order, i) => {
              const status = statusConfig[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{order.orderNumber}</span>
                          <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.color}`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                      </div>
                      <span className="font-bold text-aqua-600">KSh {order.total.toLocaleString()}</span>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">
                            {item.qty}x
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                      <MapPin className="w-3 h-3" /> {order.address}
                    </div>

                    <div className="flex gap-2">
                      {order.status === "ON_THE_WAY" && (
                        <Link
                          href={`/tracking/${order.id}`}
                          className="flex-1 py-2.5 rounded-xl bg-aqua-500 text-white text-sm font-medium text-center hover:bg-aqua-600 transition-colors"
                        >
                          Track Order
                        </Link>
                      )}
                      {order.status === "DELIVERED" && !order.isRated && (
                        <Link
                          href={`/orders/${order.id}/review`}
                          className="flex-1 py-2.5 rounded-xl bg-yellow-100 text-yellow-700 text-sm font-medium text-center hover:bg-yellow-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <Star className="w-4 h-4" /> Rate Order
                        </Link>
                      )}
                      {order.status === "DELIVERED" && (
                        <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                          <RotateCcw className="w-4 h-4" /> Reorder
                        </button>
                      )}
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">No orders found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

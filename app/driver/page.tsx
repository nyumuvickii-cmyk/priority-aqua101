"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Truck, MapPin, Clock, DollarSign, Package, Check,
  Navigation, Phone, MessageSquare, Camera, ChevronRight,
  TrendingUp, Fuel, Star, LogOut, Menu, X
} from "lucide-react";

interface Delivery {
  id: string;
  orderNumber: string;
  customer: string;
  phone: string;
  address: string;
  items: string[];
  total: number;
  status: "pending" | "accepted" | "picked_up" | "on_the_way" | "delivered";
  distance: string;
  eta: string;
  coordinates: { lat: number; lng: number };
}

const deliveries: Delivery[] = [
  {
    id: "1",
    orderNumber: "PA-24-7891",
    customer: "James Mwangi",
    phone: "+254711111111",
    address: "Moi Avenue, Ngara Estate, Sunrise Apartments, 3rd Floor",
    items: ["20L Bottled Water x2", "Water Refill x1", "Dispenser Rental x1"],
    total: 6400,
    status: "on_the_way",
    distance: "2.3 km",
    eta: "12 min",
    coordinates: { lat: -1.2768, lng: 36.8219 },
  },
  {
    id: "2",
    orderNumber: "PA-24-7892",
    customer: "Grace Akinyi",
    phone: "+254722222222",
    address: "Waiyaki Way, Westlands, Delta Towers, 5th Floor",
    items: ["Water Refill (20L) x1"],
    total: 230,
    status: "pending",
    distance: "5.1 km",
    eta: "25 min",
    coordinates: { lat: -1.2648, lng: 36.8028 },
  },
  {
    id: "3",
    orderNumber: "PA-24-7885",
    customer: "Peter Omondi",
    phone: "+254733333333",
    address: "Mombasa Road, Syokimau, Green Park Estate",
    items: ["Bulk Tanker (5000L) x1"],
    total: 8000,
    status: "picked_up",
    distance: "12.5 km",
    eta: "45 min",
    coordinates: { lat: -1.3234, lng: 36.8790 },
  },
];

const statusConfig = {
  pending: { label: "New Request", color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50" },
  accepted: { label: "Accepted", color: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  picked_up: { label: "Picked Up", color: "bg-purple-500", text: "text-purple-600", bg: "bg-purple-50" },
  on_the_way: { label: "On The Way", color: "bg-aqua-500", text: "text-aqua-600", bg: "bg-aqua-50" },
  delivered: { label: "Delivered", color: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
};

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(deliveries[0]);
  const [showMenu, setShowMenu] = useState(false);
  const [earnings] = useState({
    today: 3500,
    week: 18500,
    month: 72000,
    deliveries: 12,
    rating: 4.8,
  });

  const updateStatus = (deliveryId: string, newStatus: Delivery["status"]) => {
    // Update delivery status logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900 text-white">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMenu(true)} className="p-2">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-bold">Driver Dashboard</h1>
                <p className="text-xs text-gray-400">John Kamau • KBY 123A</p>
              </div>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isOnline
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500">Today's Earnings</span>
            </div>
            <p className="text-xl font-bold">KSh {earnings.today.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-aqua-500" />
              <span className="text-xs text-gray-500">Deliveries</span>
            </div>
            <p className="text-xl font-bold">{earnings.deliveries}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-500">This Week</span>
            </div>
            <p className="text-xl font-bold">KSh {earnings.week.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500">Rating</span>
            </div>
            <p className="text-xl font-bold">{earnings.rating}</p>
          </div>
        </div>
      </div>

      {/* Active Delivery */}
      {activeDelivery && (
        <div className="max-w-lg mx-auto px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-aqua-500 to-ocean-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Active Delivery</p>
                  <p className="font-bold">{activeDelivery.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">ETA</p>
                  <p className="font-bold">{activeDelivery.eta}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center text-white font-bold text-sm">
                  {activeDelivery.customer.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{activeDelivery.customer}</p>
                  <p className="text-xs text-gray-500">{activeDelivery.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-aqua-100 text-aqua-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <p className="text-sm">{activeDelivery.address}</p>
              </div>

              <div className="space-y-2 mb-4">
                {activeDelivery.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Total: <span className="font-bold text-gray-900 dark:text-white">KSh {activeDelivery.total.toLocaleString()}</span></span>
                <span className="text-sm text-gray-500">{activeDelivery.distance} away</span>
              </div>

              {/* Status Actions */}
              <div className="flex gap-2">
                {activeDelivery.status === "pending" && (
                  <>
                    <button className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 font-medium text-sm">
                      Decline
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-aqua-500 text-white font-medium text-sm">
                      Accept
                    </button>
                  </>
                )}
                {activeDelivery.status === "accepted" && (
                  <button className="w-full py-3 rounded-xl bg-aqua-500 text-white font-medium text-sm">
                    Mark as Picked Up
                  </button>
                )}
                {activeDelivery.status === "picked_up" && (
                  <button className="w-full py-3 rounded-xl bg-aqua-500 text-white font-medium text-sm">
                    Start Delivery
                  </button>
                )}
                {activeDelivery.status === "on_the_way" && (
                  <>
                    <button className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 font-medium text-sm">
                      <Navigation className="w-4 h-4 inline mr-1" /> Navigate
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium text-sm">
                      <Camera className="w-4 h-4 inline mr-1" /> Deliver
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Queue */}
      <div className="max-w-lg mx-auto px-4 pb-6">
        <h2 className="font-bold mb-3">Delivery Queue</h2>
        <div className="space-y-3">
          {deliveries.filter(d => d.id !== activeDelivery?.id).map((delivery) => {
            const status = statusConfig[delivery.status];
            return (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{delivery.orderNumber}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{delivery.customer}</p>
                  </div>
                  <span className="text-sm font-bold">KSh {delivery.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {delivery.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {delivery.eta}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMenu(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-gray-900 text-white p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="font-bold">Driver</span>
              </div>
              <button onClick={() => setShowMenu(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-2">
              {[
                { icon: <Truck className="w-5 h-5" />, label: "Dashboard", href: "/driver/dashboard" },
                { icon: <Package className="w-5 h-5" />, label: "Deliveries", href: "/driver/deliveries" },
                { icon: <DollarSign className="w-5 h-5" />, label: "Earnings", href: "/driver/earnings" },
                { icon: <Fuel className="w-5 h-5" />, label: "Fuel Log", href: "/driver/fuel" },
                { icon: <Star className="w-5 h-5" />, label: "Ratings", href: "/driver/ratings" },
                { icon: <MapPin className="w-5 h-5" />, label: "Profile", href: "/driver/profile" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 transition-colors mt-8 w-full">
              <LogOut className="w-5 h-5" /> Log Out
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Phone, MessageSquare, Clock, Check,
  Package, Truck, Home, Star, Share2, Download, QrCode
} from "lucide-react";

const trackingSteps = [
  { status: "PENDING", label: "Order Placed", time: "10:30 AM", icon: <Package className="w-5 h-5" />, completed: true },
  { status: "CONFIRMED", label: "Confirmed", time: "10:35 AM", icon: <Check className="w-5 h-5" />, completed: true },
  { status: "ASSIGNED", label: "Driver Assigned", time: "10:45 AM", icon: <Truck className="w-5 h-5" />, completed: true },
  { status: "PICKED_UP", label: "Picked Up", time: "11:00 AM", icon: <Package className="w-5 h-5" />, completed: true },
  { status: "ON_THE_WAY", label: "On The Way", time: "11:15 AM", icon: <Truck className="w-5 h-5" />, completed: true, active: true },
  { status: "NEARBY", label: "Nearby", time: "--", icon: <MapPin className="w-5 h-5" />, completed: false },
  { status: "DELIVERED", label: "Delivered", time: "--", icon: <Home className="w-5 h-5" />, completed: false },
];

export default function TrackingPage() {
  const [driverLocation, setDriverLocation] = useState({ lat: -1.2800, lng: 36.8300 });
  const [eta, setEta] = useState(12);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + 0.0002,
        lng: prev.lng + 0.0001,
      }));
      setEta(prev => Math.max(0, prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/orders" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold">Track Order</h1>
              <p className="text-xs text-gray-500">PA-24-7891</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Map Simulation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Roads */}
                <line x1="0" y1="150" x2="400" y2="150" stroke="#999" strokeWidth="8" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="#999" strokeWidth="8" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#bbb" strokeWidth="4" />
                <line x1="100" y1="0" x2="100" y2="300" stroke="#bbb" strokeWidth="4" />
                <line x1="300" y1="0" x2="300" y2="300" stroke="#bbb" strokeWidth="4" />
                {/* Buildings */}
                <rect x="50" y="50" width="30" height="30" fill="#ddd" rx="4" />
                <rect x="250" y="80" width="40" height="25" fill="#ddd" rx="4" />
                <rect x="120" y="180" width="35" height="40" fill="#ddd" rx="4" />
                <rect x="320" y="200" width="25" height="30" fill="#ddd" rx="4" />
              </svg>
            </div>

            {/* Delivery Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-aqua-500/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-aqua-500 flex items-center justify-center">
                    <Home className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded-lg">
                  Your Location
                </div>
              </motion.div>
            </div>

            {/* Driver Location */}
            <motion.div
              className="absolute"
              animate={{
                left: `${30 + (driverLocation.lng - 36.82) * 5000}%`,
                top: `${40 + (driverLocation.lat - (-1.28)) * 5000}%`,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-orange-500 shadow-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">
                  Driver
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-orange-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
            </motion.div>

            {/* ETA Badge */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-aqua-500" />
                <span className="font-bold text-sm">{eta} min</span>
                <span className="text-xs text-gray-500">ETA</span>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center text-white font-bold">
              JK
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">John Kamau</p>
              <p className="text-xs text-gray-500">Toyota Hilux • KBY 123A</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs">4.8 (342 deliveries)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-aqua-100 dark:bg-aqua-900/30 text-aqua-600 flex items-center justify-center hover:bg-aqua-200 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <div className="space-y-0">
            {trackingSteps.map((step, i) => (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? step.active
                        ? "bg-aqua-500 text-white ring-4 ring-aqua-500/20"
                        : "bg-green-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                  }`}>
                    {step.completed ? <Check className="w-5 h-5" /> : step.icon}
                  </div>
                  {i < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-8 ${
                      step.completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                  )}
                </div>
                <div className="pb-8">
                  <p className={`font-medium text-sm ${step.active ? "text-aqua-600" : ""}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500">{step.time}</p>
                  {step.active && (
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-xs text-aqua-500 mt-1 font-medium"
                    >
                      In Progress...
                    </motion.p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Order Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Number</span>
              <span className="font-medium">PA-24-7891</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Order Date</span>
              <span className="font-medium">May 19, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium">M-Pesa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-aqua-600">KSh 6,400</span>
            </div>
          </div>

          {/* QR Code Verification */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-800" />
              </div>
              <div>
                <p className="font-medium text-sm">QR Code Verification</p>
                <p className="text-xs text-gray-500">Show this to your driver for quick verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium text-sm hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium text-sm hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" /> Invoice
          </button>
        </div>
      </main>
    </div>
  );
}

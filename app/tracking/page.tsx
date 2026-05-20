"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Phone, MessageSquare, Clock, Check,
  Package, Truck, Home, Star, Share2, Download, QrCode
} from "lucide-react";

const statusMeta = {
  PENDING: { label: "Order Placed", icon: <Package className="w-5 h-5" /> },
  CONFIRMED: { label: "Confirmed", icon: <Check className="w-5 h-5" /> },
  ASSIGNED: { label: "Driver Assigned", icon: <Truck className="w-5 h-5" /> },
  PICKED_UP: { label: "Picked Up", icon: <Package className="w-5 h-5" /> },
  ON_THE_WAY: { label: "On The Way", icon: <Truck className="w-5 h-5" /> },
  NEARBY: { label: "Nearby", icon: <MapPin className="w-5 h-5" /> },
  DELIVERED: { label: "Delivered", icon: <Home className="w-5 h-5" /> },
};

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) return;
    setLoading(true);
    fetch(`/api/orders?orderNumber=${orderNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.orders && data.orders.length > 0) {
          setOrder(data.orders[0]);
        } else {
          setError("Order not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch order");
        setLoading(false);
      });
  }, [orderNumber]);

  // Compute tracking steps from order.tracking
  const trackingSteps = useMemo(() => {
    if (!order) return [];
    const steps = [
      "PENDING",
      "CONFIRMED",
      "ASSIGNED",
      "PICKED_UP",
      "ON_THE_WAY",
      "NEARBY",
      "DELIVERED",
    ];
    let lastCompletedIdx = -1;
    const statusTimes = {};
    order.tracking?.forEach(t => {
      statusTimes[t.status] = t.createdAt;
      const idx = steps.indexOf(t.status);
      if (idx > lastCompletedIdx) lastCompletedIdx = idx;
    });
    return steps.map((status, i) => ({
      status,
      label: statusMeta[status].label,
      time: statusTimes[status] ? new Date(statusTimes[status]).toLocaleTimeString() : "--",
      icon: statusMeta[status].icon,
      completed: i <= lastCompletedIdx,
      active: i === lastCompletedIdx,
    }));
  }, [order]);

  // Driver location from latest tracking with lat/lng, fallback to driver profile
  const driverLocation = useMemo(() => {
    if (!order) return { lat: -1.28, lng: 36.83 };
    const latest = [...(order.tracking || [])].reverse().find(t => t.latitude && t.longitude);
    if (latest) return { lat: latest.latitude, lng: latest.longitude };
    if (order.driver && order.driver.currentLat && order.driver.currentLng) {
      return { lat: order.driver.currentLat, lng: order.driver.currentLng };
    }
    return { lat: -1.28, lng: 36.83 };
  }, [order]);

  // ETA simulation (replace with real ETA if available)
  const [eta, setEta] = useState(12);
  useEffect(() => {
    if (!order) return;
    setEta(12); // reset ETA on order change
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [order]);

  if (!orderNumber) {
    return <div className="p-8 text-center">No order number provided.</div>;
  }
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

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
              <p className="text-xs text-gray-500">{order.orderNumber}</p>
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
              {order.driver?.name ? order.driver.name.split(" ").map(n => n[0]).join("") : "--"}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{order.driver?.name || "No driver assigned"}</p>
              <p className="text-xs text-gray-500">{order.driver?.vehicleType || ""} {order.driver?.vehiclePlate ? `• ${order.driver.vehiclePlate}` : ""}</p>
              {order.driver && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs">{order.driver.rating?.toFixed(1) || "-"} ({order.driver.totalDeliveries || 0} deliveries)</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {order.driver?.phone && (
                <a href={`tel:${order.driver.phone}`} className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              )}
              {order.driver?.phone && (
                <a href={`sms:${order.driver.phone}`} className="w-10 h-10 rounded-xl bg-aqua-100 dark:bg-aqua-900/30 text-aqua-600 flex items-center justify-center hover:bg-aqua-200 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
              )}
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
              <span className="font-medium">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Order Date</span>
              <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-aqua-600">KSh {order.total.toLocaleString()}</span>
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

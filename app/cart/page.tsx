"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Trash2, Plus, Minus, MapPin, ChevronRight,
  Truck, Clock, Shield, Gift, Droplets
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  deposit: number;
  quantity: number;
  image: string;
  unit: string;
}

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "20L Bottled Water",
    price: 350,
    deposit: 500,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop",
    unit: "bottle",
  },
  {
    id: "2",
    name: "Water Refill (20L)",
    price: 150,
    deposit: 0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    unit: "refill",
  },
  {
    id: "8",
    name: "Water Dispenser Rental",
    price: 1500,
    deposit: 3000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&h=200&fit=crop",
    unit: "unit",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: string } | null>(null);
  const [deliveryType, setDeliveryType] = useState<"standard" | "emergency" | "scheduled">("standard");
  const [selectedAddress, setSelectedAddress] = useState("1");

  const addresses = [
    { id: "1", label: "Home", street: "Moi Avenue, Ngara Estate", city: "Nairobi", isDefault: true },
    { id: "2", label: "Office", street: "Waiyaki Way, Westlands", city: "Nairobi", isDefault: false },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "WELCOME50") {
      setAppliedPromo({ code: "WELCOME50", discount: 0.5, type: "percentage" });
    } else if (promoCode.toUpperCase() === "FREEDEL") {
      setAppliedPromo({ code: "FREEDEL", discount: 0, type: "free_delivery" });
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const depositTotal = cart.reduce((sum, item) => sum + item.deposit * item.quantity, 0);
  const deliveryFee = appliedPromo?.type === "free_delivery" ? 0 : deliveryType === "emergency" ? 200 : 50;
  const discount = appliedPromo?.type === "percentage" ? subtotal * appliedPromo.discount : 0;
  const total = subtotal + depositTotal + deliveryFee - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
        <Droplets className="w-20 h-20 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center">Add some refreshing water to get started</p>
        <Link
          href="/products"
          className="bg-aqua-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-aqua-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/products" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Shopping Cart ({cart.length})</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex gap-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.unit}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-aqua-100 dark:bg-aqua-900/30 text-aqua-600 flex items-center justify-center hover:bg-aqua-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-aqua-600">KSh {(item.price * item.quantity).toLocaleString()}</p>
                      {item.deposit > 0 && (
                        <p className="text-xs text-gray-500">+ KSh {(item.deposit * item.quantity).toLocaleString()} deposit</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-aqua-500" /> Delivery Address
                </h3>
                <Link href="/addresses" className="text-sm text-aqua-600 hover:text-aqua-700">
                  Change
                </Link>
              </div>
              <div className="space-y-2">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                      selectedAddress === addr.id
                        ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                        : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAddress === addr.id ? "border-aqua-500" : "border-gray-300"
                    }`}>
                      {selectedAddress === addr.id && <div className="w-2.5 h-2.5 rounded-full bg-aqua-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{addr.label} {addr.isDefault && <span className="text-xs text-aqua-600">(Default)</span>}</p>
                      <p className="text-xs text-gray-500">{addr.street}, {addr.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Type */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-aqua-500" /> Delivery Type
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "Standard", desc: "Same day", price: "KSh 50", icon: <Truck className="w-4 h-4" /> },
                  { id: "emergency", label: "Emergency", desc: "2 hours", price: "KSh 200", icon: <Clock className="w-4 h-4" /> },
                  { id: "scheduled", label: "Scheduled", desc: "Pick date", price: "KSh 50", icon: <Clock className="w-4 h-4" /> },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setDeliveryType(type.id as any)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      deliveryType === type.id
                        ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                        : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                    }`}
                  >
                    <div className={`mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      deliveryType === type.id ? "bg-aqua-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}>
                      {type.icon}
                    </div>
                    <p className="text-xs font-semibold">{type.label}</p>
                    <p className="text-[10px] text-gray-500">{type.desc}</p>
                    <p className="text-xs font-bold text-aqua-600 mt-1">{type.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>

              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2.5 rounded-xl bg-aqua-500 text-white font-medium text-sm hover:bg-aqua-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm text-green-700 dark:text-green-400 flex items-center gap-1">
                      <Gift className="w-4 h-4" /> {appliedPromo.code} applied
                    </span>
                    <button onClick={() => { setAppliedPromo(null); setPromoCode(""); }} className="text-xs text-red-500">
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bottle Deposit</span>
                  <span>KSh {depositTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className={appliedPromo?.type === "free_delivery" ? "line-through text-gray-400" : ""}>
                    KSh {deliveryFee.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-KSh {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-aqua-600">KSh {total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including KSh {depositTotal.toLocaleString()} refundable deposit</p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-bold text-center block shadow-lg shadow-aqua-500/25 hover:shadow-xl transition-all"
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Free Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

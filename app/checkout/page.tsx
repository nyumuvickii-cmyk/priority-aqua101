"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, CreditCard, Smartphone, Banknote, Wallet,
  Check, Shield, Lock, ChevronRight, MapPin, Truck, Clock
} from "lucide-react";

type PaymentMethod = "mpesa" | "airtel" | "card" | "cod";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("254712345678");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const orderSummary = {
    items: [
      { name: "20L Bottled Water", qty: 2, price: 350 },
      { name: "Water Refill (20L)", qty: 1, price: 150 },
      { name: "Dispenser Rental", qty: 1, price: 1500 },
    ],
    subtotal: 2350,
    deposit: 4000,
    deliveryFee: 50,
    discount: 0,
    total: 6400,
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus("processing");

    // Simulate M-Pesa STK Push
    await new Promise(resolve => setTimeout(resolve, 3000));

    setPaymentStatus("success");
    setIsProcessing(false);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-6">Your order has been placed successfully</p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="font-semibold">PA-24-7891</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="font-semibold">M-Pesa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Paid</span>
              <span className="font-bold text-aqua-600">KSh 6,400</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/tracking/PA-24-7891"
              className="block w-full py-3.5 rounded-2xl bg-aqua-500 text-white font-semibold hover:bg-aqua-600 transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/home"
              className="block w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/cart" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-aqua-600 font-medium">Cart</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-aqua-600 font-medium">Checkout</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Confirmation</span>
        </div>

        {/* Delivery Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-aqua-500" /> Delivery Details
            </h3>
            <Link href="/cart" className="text-sm text-aqua-600">Edit</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <MapPin className="w-5 h-5 text-aqua-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Home - Ngara Estate</p>
                <p className="text-xs text-gray-500">Moi Avenue, Sunrise Apartments, 3rd Floor, Nairobi</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <Truck className="w-5 h-5 text-aqua-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Standard Delivery</p>
                <p className="text-xs text-gray-500">Today, 2:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-3">
            {orderSummary.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-lg">💧</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-semibold text-sm">KSh {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>KSh {orderSummary.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bottle Deposit</span>
              <span>KSh {orderSummary.deposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span>KSh {orderSummary.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 dark:border-gray-700">
              <span>Total</span>
              <span className="text-aqua-600">KSh {orderSummary.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-aqua-500" /> Payment Method
          </h3>

          <div className="space-y-3">
            {/* M-Pesa */}
            <button
              onClick={() => setPaymentMethod("mpesa")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "mpesa"
                  ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                  : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === "mpesa" ? "bg-green-500" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">M-Pesa</p>
                <p className="text-xs text-gray-500">Pay via M-Pesa STK Push</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "mpesa" ? "border-aqua-500" : "border-gray-300"
              }`}>
                {paymentMethod === "mpesa" && <div className="w-2.5 h-2.5 rounded-full bg-aqua-500" />}
              </div>
            </button>

            {/* Airtel Money */}
            <button
              onClick={() => setPaymentMethod("airtel")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "airtel"
                  ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                  : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === "airtel" ? "bg-red-500" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Airtel Money</p>
                <p className="text-xs text-gray-500">Pay via Airtel Money</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "airtel" ? "border-aqua-500" : "border-gray-300"
              }`}>
                {paymentMethod === "airtel" && <div className="w-2.5 h-2.5 rounded-full bg-aqua-500" />}
              </div>
            </button>

            {/* Card */}
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "card"
                  ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                  : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === "card" ? "bg-blue-600" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Credit/Debit Card</p>
                <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "card" ? "border-aqua-500" : "border-gray-300"
              }`}>
                {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-aqua-500" />}
              </div>
            </button>

            {/* Cash on Delivery */}
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "cod"
                  ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20"
                  : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === "cod" ? "bg-yellow-500" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when you receive your order</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "cod" ? "border-aqua-500" : "border-gray-300"
              }`}>
                {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-aqua-500" />}
              </div>
            </button>
          </div>

          {/* Phone Number Input for M-Pesa/Airtel */}
          {(paymentMethod === "mpesa" || paymentMethod === "airtel") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4"
            >
              <label className="text-sm font-medium mb-2 block">
                {paymentMethod === "mpesa" ? "M-Pesa" : "Airtel Money"} Phone Number
              </label>
              <div className="flex gap-2">
                <span className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                  +254
                </span>
                <input
                  type="tel"
                  value={phoneNumber.replace("254", "")}
                  onChange={(e) => setPhoneNumber("254" + e.target.value.replace(/\D/g, ""))}
                  placeholder="712345678"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                You will receive an STK push on your phone to complete payment
              </p>
            </motion.div>
          )}

          {/* Card Form */}
          {paymentMethod === "card" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 space-y-3"
            >
              <div>
                <label className="text-sm font-medium mb-2 block">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pay Button */}
        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-bold text-lg shadow-lg shadow-aqua-500/25 hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Processing...
              </>
            ) : paymentMethod === "mpesa" ? (
              <>
                <Smartphone className="w-5 h-5" />
                Pay KSh {orderSummary.total.toLocaleString()} with M-Pesa
              </>
            ) : paymentMethod === "airtel" ? (
              <>
                <Smartphone className="w-5 h-5" />
                Pay KSh {orderSummary.total.toLocaleString()} with Airtel Money
              </>
            ) : paymentMethod === "card" ? (
              <>
                <CreditCard className="w-5 h-5" />
                Pay KSh {orderSummary.total.toLocaleString()}
              </>
            ) : (
              <>
                <Banknote className="w-5 h-5" />
                Place Order - Pay KSh {orderSummary.total.toLocaleString()} on Delivery
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Droplets, Calendar, Check, X, ChevronRight,
  Clock, RotateCcw, Pause, Play, Star
} from "lucide-react";

interface Subscription {
  id: string;
  product: string;
  plan: string;
  frequency: string;
  quantity: number;
  price: number;
  nextDelivery: string;
  status: "active" | "paused" | "cancelled";
  savings: number;
}

const subscriptions: Subscription[] = [
  {
    id: "1",
    product: "20L Bottled Water",
    plan: "Standard",
    frequency: "Weekly",
    quantity: 2,
    price: 700,
    nextDelivery: "May 26, 2026",
    status: "active",
    savings: 140,
  },
];

const plans = [
  {
    name: "Basic",
    price: 500,
    frequency: "Weekly",
    quantity: 1,
    features: ["1 x 20L bottle weekly", "Free delivery", "Standard support"],
    savings: 0,
    color: "from-gray-400 to-gray-500",
  },
  {
    name: "Standard",
    price: 1300,
    frequency: "Weekly",
    quantity: 2,
    features: ["2 x 20L bottles weekly", "Free delivery", "Priority support", "10% discount"],
    savings: 140,
    color: "from-aqua-400 to-aqua-600",
    popular: true,
  },
  {
    name: "Premium",
    price: 2500,
    frequency: "Bi-weekly",
    quantity: 5,
    features: ["5 x 20L bottles bi-weekly", "Free delivery", "24/7 support", "15% discount", "Emergency delivery"],
    savings: 450,
    color: "from-ocean-400 to-ocean-600",
  },
  {
    name: "Enterprise",
    price: 5000,
    frequency: "Monthly",
    quantity: 15,
    features: ["15 x 20L bottles monthly", "Free delivery", "Dedicated manager", "20% discount", "Bulk tanker option"],
    savings: 1500,
    color: "from-purple-400 to-purple-600",
  },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "plans">("active");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/home" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Subscriptions</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "active"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            My Subscriptions
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "plans"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Browse Plans
          </button>
        </div>

        {activeTab === "active" ? (
          <div className="space-y-4">
            {subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-aqua-100 dark:bg-aqua-900/30 flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-aqua-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{sub.product}</h3>
                        <p className="text-xs text-gray-500">{sub.plan} Plan • {sub.frequency}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-lg font-bold">{sub.quantity}</p>
                      <p className="text-xs text-gray-500">Bottles</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-lg font-bold">KSh {sub.price}</p>
                      <p className="text-xs text-gray-500">{sub.frequency}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <p className="text-lg font-bold text-green-600">KSh {sub.savings}</p>
                      <p className="text-xs text-green-600">Saved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-aqua-50 dark:bg-aqua-900/20 rounded-xl mb-4">
                    <Calendar className="w-4 h-4 text-aqua-600" />
                    <span className="text-sm">Next delivery: <span className="font-semibold">{sub.nextDelivery}</span></span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Pause className="w-4 h-4" /> Pause
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Modify
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500">No active subscriptions</h3>
                <p className="text-sm text-gray-400 mt-1">Browse plans to get started</p>
                <button
                  onClick={() => setActiveTab("plans")}
                  className="mt-4 px-6 py-3 rounded-xl bg-aqua-500 text-white font-medium"
                >
                  View Plans
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-center">Choose a plan that fits your needs and save up to 20%</p>

            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                  selectedPlan === plan.name ? "ring-2 ring-aqua-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-aqua-500 to-ocean-500 text-white text-xs font-semibold px-4 py-1.5 text-center">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.frequency} delivery</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">KSh {plan.price}</p>
                      <p className="text-xs text-gray-500">per {plan.frequency.toLowerCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.savings > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 mb-4">
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                        Save KSh {plan.savings} compared to one-time orders
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      selectedPlan === plan.name
                        ? "bg-aqua-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                  </button>
                </div>
              </motion.div>
            ))}

            {selectedPlan && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-bold shadow-lg"
              >
                Subscribe to {selectedPlan} Plan
              </motion.button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

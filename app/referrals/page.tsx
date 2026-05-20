"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Gift, Share2, Copy, Check, Users, Star,
  TrendingUp, MessageCircle, WhatsApp, Facebook, Twitter
} from "lucide-react";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "PA-JAMES50";
  const referralLink = `https://priorityaqua.co.ke/ref/${referralCode}`;

  const stats = {
    totalReferrals: 12,
    successful: 8,
    pending: 4,
    totalEarnings: 800,
    availableBalance: 600,
  };

  const referrals = [
    { name: "Grace Wanjiku", date: "May 15, 2026", status: "successful", reward: 100 },
    { name: "Peter Ochieng", date: "May 12, 2026", status: "successful", reward: 100 },
    { name: "Mary Akinyi", date: "May 10, 2026", status: "pending", reward: 0 },
    { name: "John Kamau", date: "May 8, 2026", status: "successful", reward: 100 },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { icon: <MessageCircle className="w-5 h-5" />, label: "SMS", color: "bg-green-500" },
    { icon: <WhatsApp className="w-5 h-5" />, label: "WhatsApp", color: "bg-green-600" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", color: "bg-blue-600" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "bg-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Refer & Earn</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-aqua-500 to-ocean-600 rounded-2xl p-6 text-white text-center">
          <Gift className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Refer Friends, Earn KSh 100</h2>
          <p className="text-aqua-100 text-sm">For every friend who places their first order, you both earn KSh 100 in loyalty points</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Referrals", value: stats.totalReferrals, icon: <Users className="w-4 h-4" /> },
            { label: "Successful", value: stats.successful, icon: <Check className="w-4 h-4" /> },
            { label: "Pending", value: stats.pending, icon: <TrendingUp className="w-4 h-4" /> },
            { label: "Total Earned", value: `KSh ${stats.totalEarnings}`, icon: <Star className="w-4 h-4" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center"
            >
              <div className="text-aqua-500 mx-auto w-fit mb-2">{stat.icon}</div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Your Referral Code</h3>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 font-mono text-lg font-bold text-center tracking-wider">
              {referralCode}
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-aqua-500 text-white hover:bg-aqua-600"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">Share via:</p>
          <div className="flex gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.label}
                className={`flex-1 py-3 rounded-xl ${option.color} text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
              >
                {option.icon}
                <span className="text-sm font-medium hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">How It Works</h3>
          <div className="space-y-4">
            {[
              { step: 1, title: "Share Your Code", desc: "Send your unique referral code to friends and family" },
              { step: 2, title: "They Sign Up", desc: "Your friend creates an account using your code" },
              { step: 3, title: "They Order", desc: "They place their first order of KSh 500 or more" },
              { step: 4, title: "You Both Earn", desc: "You both receive KSh 100 in loyalty points" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-aqua-100 dark:bg-aqua-900/30 text-aqua-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Referral History</h3>
          <div className="space-y-3">
            {referrals.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center text-white font-bold text-sm">
                    {ref.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{ref.name}</p>
                    <p className="text-xs text-gray-500">{ref.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ref.status === "successful"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {ref.status}
                  </span>
                  {ref.reward > 0 && (
                    <p className="text-xs text-green-600 font-medium mt-1">+KSh {ref.reward}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, User, MapPin, CreditCard, Bell, Shield, HelpCircle,
  ChevronRight, LogOut, Moon, Sun, Globe, Gift, Star, Droplets,
  Edit, Camera, Check
} from "lucide-react";
import { useTheme } from "next-themes";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [showEditName, setShowEditName] = useState(false);
  const [name, setName] = useState("James Mwangi");

  const menuItems = [
    { icon: <MapPin className="w-5 h-5" />, label: "My Addresses", href: "/addresses", badge: "2" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Payment Methods", href: "/profile/payments", badge: null },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications", href: "/profile/notifications", badge: "3" },
    { icon: <Gift className="w-5 h-5" />, label: "Referrals", href: "/referrals", badge: null },
    { icon: <Star className="w-5 h-5" />, label: "Loyalty Points", href: "/profile/loyalty", badge: "350 pts" },
    { icon: <Shield className="w-5 h-5" />, label: "Privacy & Security", href: "/profile/security", badge: null },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help & Support", href: "/profile/support", badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/home" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-aqua-500 to-ocean-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                JM
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-aqua-600 flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              {showEditName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/60 text-sm"
                    autoFocus
                  />
                  <button onClick={() => setShowEditName(false)} className="p-1">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{name}</h2>
                  <button onClick={() => setShowEditName(true)} className="p-1 opacity-60 hover:opacity-100">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-aqua-100 text-sm">+254 711 111 111</p>
              <p className="text-aqua-100 text-sm">james.mwangi@gmail.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-aqua-100">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">350</p>
              <p className="text-xs text-aqua-100">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">KSh 0</p>
              <p className="text-xs text-aqua-100">Wallet</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/subscriptions" className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Subscription</p>
              <p className="text-xs text-gray-500">Weekly delivery active</p>
            </div>
          </Link>
          <Link href="/referrals" className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Referrals</p>
              <p className="text-xs text-gray-500">3 friends joined</p>
            </div>
          </Link>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-sm">Settings</h3>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="w-5 h-5 text-gray-500" /> : <Sun className="w-5 h-5 text-gray-500" />}
              <span className="text-sm">Dark Mode</span>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-12 h-6 rounded-full transition-colors ${theme === "dark" ? "bg-aqua-500" : "bg-gray-300"}`}
            >
              <motion.div
                animate={{ x: theme === "dark" ? 24 : 2 }}
                className="w-5 h-5 rounded-full bg-white shadow-sm mt-0.5"
              />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm bg-transparent font-medium text-aqua-600"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Push Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-aqua-500" : "bg-gray-300"}`}
            >
              <motion.div
                animate={{ x: notifications ? 24 : 2 }}
                className="w-5 h-5 rounded-full bg-white shadow-sm mt-0.5"
              />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {menuItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-xs bg-aqua-100 dark:bg-aqua-900/30 text-aqua-600 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full py-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" /> Log Out
        </button>

        <p className="text-center text-xs text-gray-400">Priority Aqua v1.0.0</p>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets, Eye, EyeOff, Mail, Phone, Lock, ArrowRight,
  Chrome, AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    // Redirect would happen here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aqua-50 via-white to-ocean-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-aqua-500/25">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your Priority Aqua account</p>
        </div>

        {/* Method Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
          <button
            onClick={() => setMethod("phone")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              method === "phone"
                ? "bg-white dark:bg-gray-700 shadow-sm text-aqua-600"
                : "text-gray-500"
            }`}
          >
            Phone Number
          </button>
          <button
            onClick={() => setMethod("email")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              method === "email"
                ? "bg-white dark:bg-gray-700 shadow-sm text-aqua-600"
                : "text-gray-500"
            }`}
          >
            Email
          </button>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm mb-4"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {method === "phone" ? (
            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <div className="flex gap-2">
                <span className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium flex items-center">
                  +254
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="712345678"
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-aqua-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-aqua-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-aqua-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-gray-300 text-aqua-500 focus:ring-aqua-500" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-aqua-600 hover:text-aqua-700">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-bold shadow-lg shadow-aqua-500/25 hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Social Login */}
        <button className="w-full py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 font-medium flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Chrome className="w-5 h-5" />
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-aqua-600 font-semibold hover:text-aqua-700">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

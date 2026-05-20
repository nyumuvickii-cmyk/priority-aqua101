"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Droplets, Phone, Lock, Eye, EyeOff, ArrowRight, Truck } from "lucide-react";

export default function DriverLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect to driver dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-aqua-500/25">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Driver Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to access your deliveries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-gray-300">Phone Number</label>
            <div className="flex gap-2">
              <span className="px-4 py-3 rounded-xl bg-gray-800 text-sm font-medium text-gray-300 flex items-center">
                +254
              </span>
              <input
                type="tel"
                placeholder="712345678"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-aqua-500 text-white text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-aqua-500 text-white text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
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

        <p className="text-center mt-6 text-sm text-gray-500">
          Not a driver yet?{" "}
          <Link href="/driver-register" className="text-aqua-400 font-semibold hover:text-aqua-300">
            Apply to join
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

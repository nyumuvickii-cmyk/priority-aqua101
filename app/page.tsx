"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ChevronRight, MapPin, CreditCard, Truck, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SplashPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      icon: <Droplets className="w-16 h-16 text-aqua-500" />,
      title: "Pure Water, Delivered",
      subtitle: "Premium purified drinking water delivered to your doorstep in Nairobi & beyond",
    },
    {
      icon: <MapPin className="w-16 h-16 text-ocean-500" />,
      title: "Real-Time Tracking",
      subtitle: "Track your delivery live on the map from our depot to your door",
    },
    {
      icon: <CreditCard className="w-16 h-16 text-aqua-600" />,
      title: "Easy M-Pesa Payment",
      subtitle: "Pay securely with M-Pesa, Airtel Money, or cash on delivery",
    },
    {
      icon: <Clock className="w-16 h-16 text-ocean-600" />,
      title: "Emergency Delivery",
      subtitle: "Same-day delivery in 2 hours for urgent water needs",
    },
  ];

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showSplash, slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-aqua-50 via-white to-ocean-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-aqua-600 to-ocean-700"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border-4 border-white/30">
                <Droplets className="w-16 h-16 text-white" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Star className="w-5 h-5 text-aqua-600 fill-aqua-600" />
              </motion.div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-4xl font-bold text-white tracking-tight"
            >
              PRIORITY AQUA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-2 text-aqua-100 text-lg"
            >
              Kenya's Premium Water Delivery
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/60"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500 to-ocean-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  PRIORITY AQUA
                </span>
              </div>
              <Link
                href="/home"
                className="text-sm text-aqua-600 dark:text-aqua-400 font-medium hover:text-aqua-700"
              >
                Skip
              </Link>
            </header>

            {/* Slides */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center max-w-md"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-aqua-100 to-ocean-100 dark:from-aqua-900/30 dark:to-ocean-900/30 flex items-center justify-center mb-8">
                    {slides[currentSlide].icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {slides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators */}
              <div className="flex gap-2 mt-8">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide
                        ? "w-8 bg-aqua-500"
                        : "w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="px-6 pb-8 pt-4 space-y-3">
              <Link
                href="/register"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-semibold text-center block shadow-lg shadow-aqua-500/25 hover:shadow-xl hover:shadow-aqua-500/30 transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="w-full py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-center block hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                I Already Have an Account
              </Link>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" /> 4.9 Rating
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

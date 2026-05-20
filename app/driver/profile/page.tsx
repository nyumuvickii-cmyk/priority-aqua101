"use client";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
export default function DriverProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-gray-900 text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/driver/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-lg font-bold">My Profile</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-500">Driver Profile</h2>
          <p className="text-gray-400 mt-2">Manage your profile, vehicle, and documents</p>
        </div>
      </main>
    </div>
  );
}
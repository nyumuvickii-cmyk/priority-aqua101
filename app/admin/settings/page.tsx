"use client";
import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>
      <main className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-500">System Settings</h2>
          <p className="text-gray-400 mt-2">Configure delivery zones, pricing, and system preferences</p>
        </div>
      </main>
    </div>
  );
}
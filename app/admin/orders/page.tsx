"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold">Orders Management</h1>
        </div>
      </header>
      <main className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-500">Orders Management</h2>
          <p className="text-gray-400 mt-2">Full orders CRUD with filters, status updates, and export</p>
        </div>
      </main>
    </div>
  );
}
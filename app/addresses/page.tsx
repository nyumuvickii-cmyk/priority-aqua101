"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Plus, Home, Briefcase, Building, X,
  Check, Navigation, Trash2, Edit3
} from "lucide-react";

interface Address {
  id: string;
  label: string;
  street: string;
  building: string;
  floor: string;
  city: string;
  county: string;
  landmark: string;
  isDefault: boolean;
  type: "home" | "office" | "other";
}

const initialAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    street: "Moi Avenue, Ngara Estate",
    building: "Sunrise Apartments",
    floor: "3rd Floor",
    city: "Nairobi",
    county: "Nairobi",
    landmark: "Near Ngara Market",
    isDefault: true,
    type: "home",
  },
  {
    id: "2",
    label: "Office",
    street: "Waiyaki Way, Westlands",
    building: "Delta Towers",
    floor: "5th Floor",
    city: "Nairobi",
    county: "Nairobi",
    landmark: "Opposite Sarit Centre",
    isDefault: false,
    type: "office",
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    label: "",
    street: "",
    building: "",
    floor: "",
    city: "Nairobi",
    county: "Nairobi",
    landmark: "",
    type: "home",
  });

  const handleSave = () => {
    if (editingId) {
      setAddresses(prev => prev.map(addr => addr.id === editingId ? { ...addr, ...formData } as Address : addr));
      setEditingId(null);
    } else {
      const newAddress: Address = {
        ...formData as Address,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    setShowAddForm(false);
    setFormData({ label: "", street: "", building: "", floor: "", city: "Nairobi", county: "Nairobi", landmark: "", type: "home" });
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const typeIcons = {
    home: <Home className="w-5 h-5" />,
    office: <Briefcase className="w-5 h-5" />,
    other: <Building className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/profile" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-lg font-bold">My Addresses</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="p-2 rounded-xl bg-aqua-500 text-white hover:bg-aqua-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border-2 transition-all ${
                address.isDefault ? "border-aqua-500" : "border-transparent"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    address.isDefault ? "bg-aqua-100 text-aqua-600" : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                  }`}>
                    {typeIcons[address.type]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{address.label}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-aqua-100 text-aqua-600 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{address.street}</p>
                    <p className="text-xs text-gray-500">{address.building}, {address.floor}</p>
                    <p className="text-xs text-gray-500 mt-1">{address.city}, {address.county}</p>
                    {address.landmark && (
                      <p className="text-xs text-gray-400 mt-1">Landmark: {address.landmark}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingId(address.id);
                      setFormData(address);
                      setShowAddForm(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="mt-3 text-xs text-aqua-600 font-medium hover:text-aqua-700"
                >
                  Set as Default
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{editingId ? "Edit Address" : "Add New Address"}</h2>
                  <button onClick={() => setShowAddForm(false)} className="p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Address Type</label>
                    <div className="flex gap-2">
                      {(["home", "office", "other"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData(prev => ({ ...prev, type }))}
                          className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                            formData.type === type
                              ? "border-aqua-500 bg-aqua-50 dark:bg-aqua-900/20 text-aqua-600"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Label</label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="e.g. Home, Office"
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Street Address</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                      placeholder="Street name, Estate"
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Building</label>
                      <input
                        type="text"
                        value={formData.building}
                        onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                        placeholder="Building name"
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Floor/Unit</label>
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                        placeholder="3rd Floor"
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">County</label>
                      <input
                        type="text"
                        value={formData.county}
                        onChange={(e) => setFormData(prev => ({ ...prev, county: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Landmark (Optional)</label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                      placeholder="Near..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-aqua-600 to-ocean-600 text-white font-bold mt-4"
                  >
                    {editingId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

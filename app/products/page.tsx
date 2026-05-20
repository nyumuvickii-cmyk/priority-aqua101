"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Filter, X, ChevronDown, ShoppingCart, Star, Droplets,
  ArrowLeft, SlidersHorizontal, Heart, Plus, Minus
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  deposit: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
  capacity: string;
  tags: string[];
  isAvailable: boolean;
}

const allProducts: Product[] = [
  {
    id: "1",
    name: "20L Bottled Water",
    description: "Premium purified drinking water in 20-liter reusable bottles. Perfect for households and small offices.",
    category: "bottled",
    price: 350,
    deposit: 500,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    stock: 500,
    unit: "bottle",
    capacity: "20L",
    tags: ["household", "office", "popular"],
    isAvailable: true,
  },
  {
    id: "2",
    name: "10L Bottled Water",
    description: "Compact 10-liter bottle ideal for small families and apartments.",
    category: "bottled",
    price: 200,
    deposit: 300,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    stock: 300,
    unit: "bottle",
    capacity: "10L",
    tags: ["household", "compact"],
    isAvailable: true,
  },
  {
    id: "3",
    name: "5L Bottled Water (Pack of 4)",
    description: "Convenient 5-liter bottles, pack of 4. Great for events and camping.",
    category: "bottled",
    price: 600,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 89,
    stock: 200,
    unit: "pack",
    capacity: "5L x 4",
    tags: ["events", "camping"],
    isAvailable: true,
  },
  {
    id: "4",
    name: "Water Refill (20L)",
    description: "Bring your own bottle and get it refilled with purified water. Eco-friendly option.",
    category: "refill",
    price: 150,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    stock: 1000,
    unit: "refill",
    capacity: "20L",
    tags: ["eco-friendly", "cheap", "refill"],
    isAvailable: true,
  },
  {
    id: "5",
    name: "Water Refill (10L)",
    description: "Refill your 10-liter bottle with purified water.",
    category: "refill",
    price: 100,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    stock: 800,
    unit: "refill",
    capacity: "10L",
    tags: ["eco-friendly", "compact"],
    isAvailable: true,
  },
  {
    id: "6",
    name: "Bulk Tanker (5000L)",
    description: "Large volume water delivery for construction sites, events, and industrial use.",
    category: "bulk",
    price: 8000,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 89,
    stock: 10,
    unit: "tanker",
    capacity: "5000L",
    tags: ["bulk", "construction", "events"],
    isAvailable: true,
  },
  {
    id: "7",
    name: "Bulk Tanker (10000L)",
    description: "Extra-large volume delivery for swimming pools, large events, and farms.",
    category: "bulk",
    price: 15000,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 45,
    stock: 5,
    unit: "tanker",
    capacity: "10000L",
    tags: ["bulk", "farm", "pool"],
    isAvailable: true,
  },
  {
    id: "8",
    name: "Water Dispenser Rental",
    description: "Hot & cold water dispenser rental. Includes free maintenance and filter replacement.",
    category: "dispenser",
    price: 1500,
    deposit: 3000,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    stock: 50,
    unit: "unit",
    capacity: "N/A",
    tags: ["rental", "office", "home"],
    isAvailable: true,
  },
  {
    id: "9",
    name: "Cup Dispenser Stand",
    description: "Sturdy metal stand with cup dispenser for your water bottles.",
    category: "accessories",
    price: 2500,
    deposit: 0,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 67,
    stock: 30,
    unit: "unit",
    capacity: "N/A",
    tags: ["accessories", "stand"],
    isAvailable: true,
  },
  {
    id: "10",
    name: "Emergency Same-Day (20L)",
    description: "Priority delivery within 2 hours. Available for 20L bottles in select areas.",
    category: "emergency",
    price: 500,
    deposit: 500,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 312,
    stock: 100,
    unit: "bottle",
    capacity: "20L",
    tags: ["emergency", "fast", "priority"],
    isAvailable: true,
  },
];

const categories = [
  { id: "all", name: "All Products", count: allProducts.length },
  { id: "bottled", name: "Bottled Water", count: allProducts.filter(p => p.category === "bottled").length },
  { id: "refill", name: "Refills", count: allProducts.filter(p => p.category === "refill").length },
  { id: "bulk", name: "Bulk Tanker", count: allProducts.filter(p => p.category === "bulk").length },
  { id: "dispenser", name: "Dispensers", count: allProducts.filter(p => p.category === "dispenser").length },
  { id: "emergency", name: "Emergency", count: allProducts.filter(p => p.category === "emergency").length },
  { id: "accessories", name: "Accessories", count: allProducts.filter(p => p.category === "accessories").length },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews; // popular
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = allProducts.find(p => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/home" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-aqua-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl ${showFilters ? "bg-aqua-100 text-aqua-600" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-aqua-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-aqua-500 text-white shadow-lg shadow-aqua-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat.name}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === cat.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-700"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={() => {
                      setPriceRange([0, 20000]);
                      setSortBy("popular");
                    }}
                    className="text-sm text-aqua-600 hover:text-aqua-700"
                  >
                    Reset All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: KSh {priceRange[0]} - KSh {priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-aqua-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-gray-900 dark:text-white"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price ↓</option>
              <option value="price-high">Price ↑</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                      />
                    </button>

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 text-xs font-semibold px-2 py-1 rounded-lg capitalize">
                      {product.category}
                    </span>

                    {/* Quick Add */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {cart[product.id] ? (
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-1">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">{cart[product.id]}</span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="w-8 h-8 rounded-lg bg-aqua-500 text-white flex items-center justify-center hover:bg-aqua-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-10 h-10 rounded-xl bg-aqua-500 text-white flex items-center justify-center shadow-lg hover:bg-aqua-600 hover:scale-110 transition-all"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-aqua-600">KSh {product.price}</span>
                      {product.deposit > 0 && (
                        <span className="text-xs text-gray-500">+ KSh {product.deposit} dep</span>
                      )}
                    </div>

                    {product.stock < 50 && (
                      <p className="text-xs text-orange-500 mt-1">Only {product.stock} left</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">No products found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      {/* Floating Cart Summary */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50"
        >
          <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aqua-500 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                  <p className="text-sm text-gray-300">KSh {cartTotal.toLocaleString()}</p>
                </div>
              </div>
              <Link
                href="/cart"
                className="bg-aqua-500 hover:bg-aqua-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

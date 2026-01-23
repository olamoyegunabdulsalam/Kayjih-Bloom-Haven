// src/pages/Products.jsx
import { motion } from "framer-motion";
import { FiFilter, FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomPackageCard from "../components/CustomPackageCard";
import { useState } from "react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "Money Bouquet", label: "Money Bouquets" },
    { id: "Money Tower", label: "Money Towers" },
    { id: "Decoration", label: "Decorations" },
  ];

  // Filter products based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-white pt-24 px-4 pb-20 to-rose-50/30 sm:px-6">
          <div className="max-w-7xl mx-auto ">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-4">
                Our Collection
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                Money Bouquet <span className="text-rose-600">Price List</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from our curated collection of money bouquets, towers,
                and decoration packages. All prices include materials,
                workmanship, and delivery.
              </p>
            </motion.div>

            {/* Filters & Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Products Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <FiFilter className="text-rose-500" />
                <span className="font-medium">
                  {filteredProducts.length} products found
                </span>
              </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
                <CustomPackageCard index={filteredProducts.length} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center">
                  <FiSearch className="text-3xl text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                💡 Important Note
              </h4>
              <p className="text-gray-600">
                You can provide new notes to reduce cost. Money towers can be
                customized with different number of layers. Workmanship prices
                may vary based on decoration complexity.
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default Products;

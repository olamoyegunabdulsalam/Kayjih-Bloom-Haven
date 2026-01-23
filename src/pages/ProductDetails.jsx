// src/pages/ProductDetails.jsx
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiGift,
  FiCheckCircle,
  FiPackage,
  FiDollarSign,
  FiCreditCard,
  FiTool,
  FiHome,
} from "react-icons/fi";
import { products } from "../data/products";
import ProductOptions from "../components/ProductOptions";
import WhatsAppOrderButton from "../components/WhatsAppOrderButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    eventType: "birthday",
    deliveryDate: "",
    customMessage: "",
    selectedWorkmanship: null, 
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedWorkmanship, setSelectedWorkmanship] = useState(null);

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setSelectedProduct(product);
      // Auto-select first note option for money products
      if (product.pricing && product.pricing[0]) {
        setSelectedNote(product.pricing[0]);
      }

    } else {
      navigate("/products");
    }
  }, [id, navigate]);

  if (!selectedProduct) {
    return null;
  }

  const handleOptionsChange = (options) => {
    setOrderDetails(options);
  };

  const handleNoteSelect = (noteOption) => {
    setSelectedNote(noteOption);
  };

  const handleWorkmanshipSelect = (workmanship) => {
    setSelectedWorkmanship(workmanship);
    setOrderDetails((prev) => ({
      ...prev,
      selectedWorkmanship: workmanship,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Calculate total price for decoration package with workmanship
  const getDecorationTotalPrice = () => {
    if (
      selectedProduct.category !== "Decoration" ||
      !selectedNote ||
      !selectedWorkmanship
    ) {
      return selectedNote?.total || "Select options";
    }

    // Extract numeric price from selected note option
    const basePriceMatch = selectedNote.total.match(/₦([\d,]+)/);
    if (!basePriceMatch) return selectedNote.total;

    // Extract numeric price from workmanship
    const workmanshipPriceMatch = selectedWorkmanship.price.match(/₦([\d,]+)/);
    if (!workmanshipPriceMatch) return selectedNote.total;

    // Convert to numbers
    const basePrice = parseInt(basePriceMatch[1].replace(/,/g, ""));
    const workmanshipPrice = parseInt(
      workmanshipPriceMatch[1].replace(/,/g, ""),
    );

    // Calculate total
    const total = basePrice + workmanshipPrice;
    return `₦${total.toLocaleString()}`;
  };

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-24 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-8"
            >
              <FiArrowLeft />
              Back to Products
            </motion.button>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Product Info */}
              <div>
                {/* Product Header */}
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-3">
                    {selectedProduct.category}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-3">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Material Costs */}
                {selectedProduct.materials && (
                  <motion.div variants={containerVariants} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-rose-100">
                        <FiPackage className="text-rose-500" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Materials Breakdown
                      </h3>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="space-y-3">
                        {Object.entries(selectedProduct.materials).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                            >
                              <span className="text-sm text-gray-700 capitalize">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace("balloon", "Balloon")
                                  .trim()}
                                :
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Pricing Options */}
                {selectedProduct.pricing && (
                  <motion.div variants={containerVariants} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-100">
                        <FiCreditCard className="text-green-500" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {selectedProduct.category === "Decoration"
                          ? "Package Options"
                          : "Note Value Options"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {selectedProduct.pricing.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleNoteSelect(option)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedNote === option
                              ? "border-rose-500 bg-rose-50"
                              : "border-gray-200 hover:border-rose-300 bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-800">
                              {option.noteValue || option.option}
                            </span>
                            <span className="text-lg font-bold text-rose-600">
                              {option.total}
                            </span>
                          </div>

                          {/* Show calculation for money products */}
                          {option.calculation && (
                            <div className="text-sm text-gray-600 mb-2">
                              {option.calculation}
                            </div>
                          )}

                          {/* Show materials cost */}
                          {option.materials && (
                            <div className="text-sm text-gray-600">
                              Materials: {option.materials}
                            </div>
                          )}

                          {/* Show collection cost for towers */}
                          {option.collection && (
                            <div className="text-sm text-gray-600">
                              Bank Collection: {option.collection}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Workmanship Selection for Decoration Package */}
                {selectedProduct.workmanship &&
                  selectedProduct.workmanship.length > 0 && (
                    <motion.div variants={containerVariants} className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-100">
                          <FiTool className="text-purple-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Select Workmanship Type
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {selectedProduct.workmanship.map((work, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleWorkmanshipSelect(work)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedWorkmanship === work
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300 bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-gray-800">
                                {work.type}
                              </span>
                              <span className="text-lg font-bold text-purple-600">
                                {work.price}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {work.type.includes("Tana")
                                ? "Higher price due to high ceiling complexity"
                                : work.type.includes("Normal")
                                  ? "Standard bed with ceiling decoration"
                                  : "Basic bunk bed decoration"}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 mt-3 p-3 bg-gray-50 rounded-lg">
                        💡 Workmanship depends on the style you want. Price can
                        be reduced if you prefer simpler decoration.
                      </p>
                    </motion.div>
                  )}

                
                {/* Features */}
                {selectedProduct.features && (
                  <motion.div variants={containerVariants} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <FiCheckCircle className="text-blue-500" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Package Includes
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                        >
                          <FiCheckCircle className="text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Note */}
                {selectedProduct.note && (
                  <motion.div variants={containerVariants} className="mb-8">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">Note:</span>{" "}
                        {selectedProduct.note}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Order Form */}
              <div>
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                        {selectedProduct.category === "Decoration" ? (
                          <FiHome className="text-rose-500 text-xl" />
                        ) : (
                          <FiGift className="text-rose-500 text-xl" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          Customize Your Order
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Select your preferred options and personalize your
                          order
                        </p>
                      </div>
                    </div>

                    {/* Selected Options Display */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                      <h4 className="font-bold text-gray-800 mb-3">
                        Selected Options:
                      </h4>

                      {/* Package/Note Selection */}
                      {selectedNote && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {selectedNote.noteValue || selectedNote.option}:
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {selectedNote.total}
                            </span>
                          </div>
                          {selectedNote.calculation && (
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedNote.calculation}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Workmanship Selection */}
                      {selectedWorkmanship && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {selectedWorkmanship.type}:
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {selectedWorkmanship.price}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Workmanship charge for bed decoration
                          </div>
                        </div>
                      )}

                      {/* Total Price */}
                      <div className="pt-3 border-t border-rose-100">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800">
                            Total Price:
                          </span>
                          <span className="text-xl font-bold text-rose-600">
                            {getDecorationTotalPrice()}
                          </span>
                        </div>
                        {selectedProduct.category === "Decoration" && (
                          <div className="text-xs text-gray-500 mt-1">
                            Includes materials, workmanship, and cake delivery
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Customization Options */}
                    <ProductOptions onOptionsChange={handleOptionsChange} />

                    {/* WhatsApp Order Button */}
                    <div className="mt-8">
                      <WhatsAppOrderButton
                        product={{
                          ...selectedProduct,
                          selectedOption: selectedNote,
                          selectedWorkmanship: selectedWorkmanship,
                          totalPrice: getDecorationTotalPrice(),
                        }}
                        orderDetails={orderDetails}
                      />
                    </div>

                    {/* Note */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        💡{" "}
                        {selectedProduct.category === "Decoration"
                          ? "Workmanship price can be adjusted for simpler decoration. Cake delivery included."
                          : "You can provide new notes to reduce cost."}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default ProductDetails;

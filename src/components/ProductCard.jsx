// src/components/ProductCard.jsx
import { motion } from "framer-motion";
import {
  FiGift,
  FiPackage,
  FiDollarSign,
  FiChevronRight,
  FiTool,
  FiHome,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  // Get price range for display
  const getPriceRange = () => {
    if (
      product.category === "Money Bouquet" ||
      product.category === "Money Tower"
    ) {
      const prices = product.pricing.map((p) => p.total);
      const minPrice = Math.min(
        ...prices.map((p) => parseInt(p.replace(/[^0-9]/g, ""))),
      );
      const maxPrice = Math.max(
        ...prices.map((p) => parseInt(p.replace(/[^0-9]/g, ""))),
      );

      if (minPrice === maxPrice) {
        return `₦${minPrice.toLocaleString()}`;
      }
      return `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
    }

    if (product.category === "Decoration") {
      const minPrice = parseInt(
        product.pricing[0].total.replace(/[^0-9]/g, ""),
      );
      const maxPrice = parseInt(
        product.pricing[1].total.replace(/[^0-9]/g, ""),
      );
      return `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
    }

    return "Custom Pricing";
  };

  // Get icon based on category
  const getCategoryIcon = () => {
    switch (product.category) {
      case "Money Bouquet":
        return <FiGift className="text-rose-500" />;
      case "Money Tower":
        return <FiPackage className="text-rose-500" />;
      case "Decoration":
        return <FiHome className="text-rose-500" />;
      default:
        return <FiGift className="text-rose-500" />;
    }
  };


  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                {getCategoryIcon()}
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-rose-50 text-rose-700">
                {product.type}
              </span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
              {product.pieces ? `${product.pieces} pieces` : "Complete Setup"}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1">
          {/* Price Range */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-600">
                {getPriceRange()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {product.category === "Money Bouquet" &&
                "₦200, ₦500, or ₦1,000 notes"}
              {product.category === "Money Tower" &&
                "₦200, ₦500, or ₦1,000 notes"}
              {product.category === "Decoration" && "Complete decoration setup"}
            </p>
          </div>

          {/* Pricing Options */}
          {product.pricing && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                PRICING OPTIONS:
              </h4>
              <div className="space-y-1">
                {product.pricing.slice(0, 2).map((option, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-600 truncate max-w-[60%]">
                      {option.noteValue || option.option}
                    </span>
                    <span className="font-medium text-gray-800">
                      {option.total}
                    </span>
                  </div>
                ))}
                {product.pricing.length > 2 && (
                  <div className="text-xs text-rose-600 font-medium">
                    +{product.pricing.length - 2} more options
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WORKMANSHIP - For Decoration Package */}
          {product.workmanship &&
            Array.isArray(product.workmanship) &&
            product.category === "Decoration" && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <FiTool className="text-xs" />
                  WORKMANSHIP OPTIONS:
                </h4>
                <div className="space-y-1">
                  {product.workmanship.slice(0, 2).map((work, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-600 truncate max-w-[60%]">
                        {work.type}
                      </span>
                      <span className="font-medium text-gray-800">
                        {work.price}
                      </span>
                    </div>
                  ))}
                  {product.workmanship.length > 2 && (
                    <div className="text-xs text-rose-600 font-medium">
                      +{product.workmanship.length - 2} more options
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Features */}
          {product.features && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                INCLUDES:
              </h4>
              <ul className="space-y-1">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-xs text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-300 mr-2 flex-shrink-0"></span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Order Button */}
        <div className="p-5 pt-0 mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Details
            <FiChevronRight />
          </motion.button>
        </div>

        {/* Hover Effect Ring */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-300 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

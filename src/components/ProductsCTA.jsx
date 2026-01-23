// src/components/ProductsCTA.jsx
import { motion } from "framer-motion";
import { FiGift, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductsCTA = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl shadow-lg">
              <FiGift />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4"
          >
            Order Our <span className="text-rose-600">Money Bouquet</span>{" "}
            Packages
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Choose from our curated price list or customize your own bouquet.
            Perfect for birthdays, weddings, anniversaries, and all
            celebrations.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">3 Sizes</div>
              <div className="text-gray-500 text-sm">50, 100, 200 pieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">
                3 Note Types
              </div>
              <div className="text-gray-500 text-sm">₦200, ₦500, ₦1000</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">
                Customizable
              </div>
              <div className="text-gray-500 text-sm">Any combination</div>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => navigate("/products")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              View All Products
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Note */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 mt-6"
          >
            All prices include materials, workmanship, and delivery
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsCTA;

// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="text-gray-400 text-sm mb-3">
          © {currentYear} KAYJIH BLOOM HAVEN. All rights reserved.
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiHeart className="text-rose-500" />
            </motion.span>
            for beautiful moments
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

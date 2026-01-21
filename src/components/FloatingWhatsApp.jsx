import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/2347069975865"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-3xl transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 border-2 border-green-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.a>
  );
};

export default FloatingWhatsApp;

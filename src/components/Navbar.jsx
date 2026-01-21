// components/Navbar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";


const Navbar = () => {

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <FaGift className="text-3xl text-rose-500" />
          <span className="lg:text-2xl text-lx font-serif font-bold text-rose-800">
            KAYJIH<span className="text-amber-500"> BLOOM HAVEN</span>
          </span>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

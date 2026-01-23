// components/Navbar.jsx - Fixed with close button
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Gallery", path: "/#gallery" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/#contact" },
  ];

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

  const handleNavClick = (path) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaGift className="text-3xl text-rose-500" />
              <span className="lg:text-2xl text-lx font-serif font-bold text-rose-800">
                KAYJIH<span className="text-amber-500"> BLOOM HAVEN</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.path.startsWith("#") ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ),
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel with Close Button */}
            <motion.div
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 md:hidden shadow-2xl"
            >
              {/* Close Button at the top */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="pt-24 px-6 h-full overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="border-b border-gray-100 pb-4"
                    >
                      {item.path.startsWith("#") ? (
                        <button
                          onClick={() => handleNavClick(item.path)}
                          className="text-2xl font-semibold text-gray-800 hover:text-rose-600 w-full text-left"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-2xl font-semibold text-gray-800 hover:text-rose-600 block"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsContactModalOpen(true);
                    }}
                    className="mt-8 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-lg"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        serviceName="Event Decoration"
      />
    </>
  );
};

export default Navbar;
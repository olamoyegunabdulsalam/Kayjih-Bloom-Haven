import {useState} from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";
import { FiStar, FiHeart, FiGift, FiChevronDown } from "react-icons/fi";
import { GiFlowerPot, GiRose } from "react-icons/gi";
import ContactModal from "./ContactModal";

const Hero = () => {
  // Floating decorative icons
  const floatingIcons = [
    { icon: <FiStar />, top: "20%", left: "5%", delay: 0 },
    { icon: <FiHeart />, top: "15%", right: "10%", delay: 0.2 },
    { icon: <GiFlowerPot />, bottom: "30%", left: "8%", delay: 0.4 },
    { icon: <FiGift />, bottom: "25%", right: "12%", delay: 0.6 },
    { icon: <GiRose />, top: "60%", left: "15%", delay: 0.8 },
  ];

    
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

    const [open, setOpen] = useState(false);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50 to-pink-50/50" />

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          className="text-3xl text-rose-300/50"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex justify-center"
          >
            <span className="flex px-4 py-2 text-amber-700 rounded-full text-sm font-semibold">
              <HiSparkles className="text-md text-gold-800" />
              Premium Event Styling
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold mb-6"
          >
            <span className="block text-gray-800"> </span>
            <span className="block bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Turning Special Moments Into
            </span>
            <span className="block bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              Beautiful Memories
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            From breathtaking event décor to creative money bouquets, we design
            luxury experiences that leave lasting impressions and wow your
            guests.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Consultation
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 border-2 border-rose-300 text-rose-700 text-lg font-semibold rounded-full hover:bg-rose-50 transition-all duration-300"
              href="#gallery"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={floatAnimation}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <FiChevronDown className="text-3xl text-rose-400" />
      </motion.div>
      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        serviceName="Event Decoration"
      />
    </section>
  );
};

export default Hero;

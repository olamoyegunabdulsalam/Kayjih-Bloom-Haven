// components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

const Gallery = () => {
 const [isOpen, setIsOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      category: "event",
      title: "Wedding Mandap Decoration",
      image: "/img/decoration.jpeg",
      description:
        "A beautifully crafted floral mandap designed to create an elegant and unforgettable wedding atmosphere.",
    },
    {
      id: 2,
      category: "bouquet",
      title: "Money Bouquet Design",
      image: "/img/bouquet.jpeg",
      description:
        "A creative money bouquet styled with precision, blending luxury gifting with artistic presentation.",
    },
    {
      id: 3,
      category: "packages",
      title: "Birthday Balloon Decor",
      image: "/img/wrapped-gift.jpeg",
      description:
        "A vibrant balloon decoration setup that transforms birthdays into colorful and joyful celebrations.",
    },
    {
      id: 4,
      category: "event",
      title: "Corporate Event Setup",
      image: "/img/decoration-1.jpeg",
      description:
        "A clean and professional event decoration tailored to elevate corporate gatherings and brand presence.",
    },
    {
      id: 5,
      category: "bouquet",
      title: "Graduation Bouquet",
      image: "/img/bouquet-1.jpeg",
      description:
        "A thoughtfully designed graduation bouquet that celebrates success, milestones, and new beginnings.",
    },
    {
      id: 6,
      category: "packages",
      title: "Kids Birthday Theme",
      image: "/img/wrapped-gift-1.jpeg",
      description:
        "A fun and playful themed decoration featuring bright colors and characters kids absolutely love.",
    },
    {
      id: 7,
      category: "event",
      title: "Anniversary Decoration",
      image: "/img/decoration-2.jpeg",
      description:
        "A romantic decoration setup created to celebrate love, memories, and special anniversary moments.",
    },
    {
      id: 8,
      category: "bouquet",
      title: "Wedding Money Bouquet",
      image: "/img/bouquet-2.jpeg",
      description:
        "An elegant wedding money bouquet designed as a stylish and meaningful bridal gift.",
    },
    {
      id: 9,
      category: "event",
      title: "Wedding Money Bouquet Display",
      image: "/img/decoration-3.jpeg",
      description:
        "A stunning decorative display that blends wedding elegance with creative money bouquet styling.",
    },
    {
      id: 10,
      category: "packages",
      title: "Wedding Gift Package",
      image: "/img/wrapped-gift-2.jpeg",
      description:
        "A premium wedding gift package thoughtfully wrapped to leave a lasting impression.",
    },
    {
      id: 11,
      category: "bouquet",
      title: "Luxury Wedding Money Bouquet",
      image: "/img/bouquet-3.jpeg",
      description:
        "A luxurious money bouquet crafted for weddings, symbolizing love, prosperity, and celebration.",
    },
    {
      id: 12,
      category: "bouquet",
      title: "Classic Wedding Money Bouquet",
      image: "/img/bouquet-4.jpeg",
      description:
        "A classic money bouquet design featuring a neat arrangement and timeless bridal elegance.",
    },
    {
      id: 13,
      category: "bouquet",
      title: "Premium Wedding Money Bouquet",
      image: "/img/bouquet-5.jpeg",
      description:
        "A premium handcrafted money bouquet created to make wedding gifting truly memorable.",
    },
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "event", label: "Event Decoration" },
    { id: "bouquet", label: "Money Bouquets" },
    { id: "packages", label: "Gift Packages" },
  ];

  const filteredItems = galleryItems.filter((item) =>
    filter === "all" ? true : item.category === filter,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

const handleNext = () => {
  setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
};

const handlePrev = () => {
  setCurrentIndex(
    (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
  );
};


useEffect(() => {
  if (!isOpen) return;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isOpen]);


  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white rounded-full text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Featured <span className="text-rose-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of stunning event decorations and
            creative money bouquet designs
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                filter === filterItem.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterItem.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index);
                  setIsOpen(true);
                }}
              >
                {/* Image Container - REMOVED BACKGROUND COLOR */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-transparent">
                  {/* Image Display - No background color */}
                  <div className="aspect-square flex items-center justify-center overflow-hidden bg-transparent">
                    <div className="w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/400x400/e2e8f0/64748b?text=Image+Coming+Soon";
                        }}
                      />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-rose-200">{item.description}</p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiZoomIn className="text-gray-800" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Modal */}
      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl hover:text-rose-400 transition"
            >
              <FiX />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 text-white text-4xl hover:text-rose-400 transition"
            >
              <FiChevronLeft />
            </button>

            {/* Image */}
            <motion.img
              key={filteredItems[currentIndex].id}
              src={filteredItems[currentIndex].image}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 text-white text-4xl hover:text-rose-400 transition"
            >
              <FiChevronRight />
            </button>

            {/* Dots Indicator */}
            <div
              className="absolute bottom-6 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

// components/Reviews.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiStar,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="reviews"
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-rose-50/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white rounded-full text-sm font-semibold mb-4">
            Client Love
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            What Our <span className="text-rose-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from happy clients who trusted us with their
            special moments
          </p>
        </motion.div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Left Column: CTA Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="h-full bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400 rounded-2xl p-8 text-white shadow-xl">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <FiMessageSquare size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Loved working with us?
                  </h3>
                  <p className="text-rose-100 mb-8">
                    Your review helps other clients trust our work and make
                    confident decisions.
                  </p>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Leave a Review
                    <FiMessageSquare />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Reviews */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500 ml-2">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 mb-6 line-clamp-4">
                        "{review.review}"
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {review.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {review.event_type}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Arrows (for mobile) */}
                {reviews.length > 2 && (
                  <div className="flex justify-center gap-4 mt-8 md:hidden">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full bg-white border border-gray-200 hover:border-rose-300 text-gray-700 hover:text-rose-600 transition-colors"
                      aria-label="Previous review"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-white border border-gray-200 hover:border-rose-300 text-gray-700 hover:text-rose-600 transition-colors"
                      aria-label="Next review"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          // No reviews yet
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center">
              <FiMessageSquare className="text-3xl text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Be the first to review!
            </h3>
            <p className="text-gray-600 mb-6">
              Share your experience and help others discover our work
            </p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              Leave Your Review
            </motion.button>
          </motion.div>
        )}

      </div>

      {/* Review Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Reviews;

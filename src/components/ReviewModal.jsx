// components/ReviewModal.jsx
import { motion } from "framer-motion";
import {
  FiX,
  FiStar,
  FiUser,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    eventType: "",
    rating: 0,
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const eventTypes = [
    "Wedding",
    "Birthday",
    "Anniversary",
    "Corporate Event",
    "Baby Shower",
    "Engagement",
    "Other Celebration",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          name: formData.name,
          event_type: formData.eventType,
          rating: formData.rating,
          review: formData.review,
          approved: false, // Reviews need admin approval
        },
      ]);

      if (error) throw error;

      toast.success(
        "Thank you for your review! It will be published after approval.",
      );
      setFormData({ name: "", eventType: "", rating: 0, review: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Card */}
          <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">
                    Share Your Experience
                  </h2>
                  <p className="text-rose-100 text-sm mt-1">
                    Help others discover our work
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <FiX size={16} />
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div className="relative">
                <div className="absolute left-3 top-3 text-rose-400">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Event Type */}
              <div className="relative">
                <div className="absolute left-3 top-3 text-rose-400">
                  <FiCalendar size={18} />
                </div>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all appearance-none"
                >
                  <option value="" className="text-gray-400">
                    Select Event Type
                  </option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1"
                    >
                      <FiStar
                        size={32}
                        className={`transition-all duration-200 ${
                          star <= (hoverRating || formData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.rating === 0
                    ? "Select a rating"
                    : `${formData.rating} star${formData.rating > 1 ? "s" : ""}`}
                </p>
              </div>

              {/* Review Text */}
              <div className="relative">
                <div className="absolute left-3 top-3 text-rose-400">
                  <FiMessageCircle size={18} />
                </div>
                <textarea
                  name="review"
                  required
                  rows="4"
                  placeholder="Tell us about your experience..."
                  value={formData.review}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || formData.rating === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </motion.button>

              {/* Note */}
              <p className="text-xs text-gray-500 text-center">
                Your review will be published after approval. We appreciate your
                feedback!
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ReviewModal;

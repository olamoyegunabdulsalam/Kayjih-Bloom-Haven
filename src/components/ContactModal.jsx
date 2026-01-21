import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactModal = ({ isOpen, onClose, serviceName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(
      import.meta.env.VITE_FORMSPREE_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          date: formData.date,
          message: formData.message,
          service: serviceName || "General Inquiry",
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      toast.success("Message sent successfully! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        date: "",
        message: "",
      });
      onClose();
    } else {
      toast.error(result.error || "Failed to send message");
    }
  } catch (error) {
    toast.error("Network error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
    { value: "corporate", label: "Corporate Event" },
    { value: "baby-shower", label: "Baby Shower" },
    { value: "engagement", label: "Engagement" },
    { value: "other", label: "Other Celebration" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect - FIXED */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed" }}
          />

          {/* Modal Container - Smaller size */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal Card - Reduced size */}
              <div
                className="relative bg-gradient-to-br from-white to-rose-50/30 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "85vh" }}
              >
                {/* Decorative Header - Compact */}
                <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 p-4">
                  <div className="relative flex justify-between items-start">
                    <div className="pr-8">
                      <h2 className="text-lg font-serif font-bold text-white">
                        Get Your Quote for {serviceName || "Your Event"}
                      </h2>

                      <p className="text-rose-100 text-sm mt-1">
                        We'll get back to you within 2 hours
                      </p>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      onClick={onClose}
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm flex-shrink-0"
                      aria-label="Close modal"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Form Content - Compact */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      Tell us about your event
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We'll create a personalized quote
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      name="service"
                      value={serviceName || "General Inquiry"}
                    />
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">
                          <FiUser size={16} />
                        </div>
                        <input
                          name="name"
                          required
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-400 text-sm"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">
                          <FiMail size={16} />
                        </div>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone & Event Type Row */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">
                          <FiPhone size={16} />
                        </div>
                        <input
                          name="phone"
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-400 text-sm"
                        />
                      </div>

                      <div className="relative">
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 text-gray-700 appearance-none text-sm"
                        >
                          <option value="" className="text-gray-400">
                            Event Type
                          </option>
                          {eventTypes.map((type) => (
                            <option
                              key={type.value}
                              value={type.value}
                              className="text-gray-700"
                            >
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">
                          <FiCalendar size={16} />
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                    </div>

                    {/* Event Date */}
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 text-gray-700 text-sm"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">
                        <FiCalendar size={16} />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-rose-400">
                        <FiMessageCircle size={16} />
                      </div>
                      <textarea
                        name="message"
                        required
                        rows="3"
                        placeholder="Event details, theme, budget..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-300 resize-none placeholder-gray-400 text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 mb-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

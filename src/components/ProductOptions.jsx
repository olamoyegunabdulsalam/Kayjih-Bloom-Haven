// src/components/ProductOptions.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const ProductOptions = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    quantity: 1,
    eventType: "birthday",
    deliveryDate: "",
    customMessage: "",
    // Removed wrappingStyle
  });

  const eventTypes = [
    { value: "birthday", label: "Birthday" },
    { value: "wedding", label: "Wedding" },
    { value: "anniversary", label: "Anniversary" },
    { value: "graduation", label: "Graduation" },
    { value: "corporate", label: "Corporate Event" },
    { value: "baby-shower", label: "Baby Shower" },
    { value: "other", label: "Other Celebration" },
  ];

  const handleChange = (field, value) => {
    const newOptions = { ...options, [field]: value };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              handleChange("quantity", Math.max(1, options.quantity - 1))
            }
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            -
          </button>
          <span className="text-lg font-bold text-gray-800 min-w-[40px] text-center">
            {options.quantity}
          </span>
          <button
            onClick={() => handleChange("quantity", options.quantity + 1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Event Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Type
        </label>
        <select
          value={options.eventType}
          onChange={(e) => handleChange("eventType", e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
        >
          {eventTypes.map((event) => (
            <option key={event.value} value={event.value}>
              {event.label}
            </option>
          ))}
        </select>
      </div>

      {/* Delivery Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Delivery Date
        </label>
        <input
          type="date"
          value={options.deliveryDate}
          onChange={(e) => handleChange("deliveryDate", e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Custom Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Message (Optional)
        </label>
        <textarea
          value={options.customMessage}
          onChange={(e) => handleChange("customMessage", e.target.value)}
          placeholder="Add a personalized message for the recipient..."
          rows="3"
          className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
        />
      </div>
    </motion.div>
  );
};

export default ProductOptions;

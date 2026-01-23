// src/components/CustomPackageCard.jsx
import { motion } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiCheck,
  FiPackage,
  FiGift,
  FiScissors,
  FiCreditCard,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const CustomPackageCard = ({ index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  // Material prices from your PDF
  const materialPrices = {
    wrapper: 800,
    foamHalf: 2000,
    foamFull: 4000,
    sticksPer50: 500,
    sticksPer100: 1000,
    cellotape: 1000,
    flower: 500,
    birthdayCard: 1500,
    bow: 1000,
    clip: 1000,
    ribbon: 200,
    collection: {
      50: 3500,
      100: 4500,
      200: 6500,
    },
    workmanship: {
      50: 8000,
      100: 12000,
      200: 13000,
    },
  };

  const [customPackage, setCustomPackage] = useState({
    pieces: 50,
    noteValue: 200,
    wrapperCount: 5,
    foamType: "half",
    includeFlower: true,
    includeBirthdayCard: true,
    includeBow: true,
    includeClip: true,
    includeRibbon: true,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate total
  useEffect(() => {
    const calculateTotal = () => {
      const pieces = customPackage.pieces;

      // Calculate money value
      const moneyValue = pieces * customPackage.noteValue;

      // Calculate material costs
      const wrapperCost = customPackage.wrapperCount * materialPrices.wrapper;
      const foamCost =
        customPackage.foamType === "half"
          ? materialPrices.foamHalf
          : materialPrices.foamFull;
      const sticksCost =
        pieces <= 50 ? materialPrices.sticksPer50 : materialPrices.sticksPer100;
      const flowerCost = customPackage.includeFlower
        ? materialPrices.flower
        : 0;
      const birthdayCardCost = customPackage.includeBirthdayCard
        ? materialPrices.birthdayCard
        : 0;
      const bowCost = customPackage.includeBow ? materialPrices.bow : 0;
      const clipCost = customPackage.includeClip ? materialPrices.clip : 0;
      const ribbonCost = customPackage.includeRibbon
        ? materialPrices.ribbon
        : 0;

      // Determine collection cost based on pieces
      let collectionCost;
      if (pieces <= 50) collectionCost = materialPrices.collection[50];
      else if (pieces <= 100) collectionCost = materialPrices.collection[100];
      else collectionCost = materialPrices.collection[200];

      // Determine workmanship based on pieces
      let workmanshipCost;
      if (pieces <= 50) workmanshipCost = materialPrices.workmanship[50];
      else if (pieces <= 100) workmanshipCost = materialPrices.workmanship[100];
      else workmanshipCost = materialPrices.workmanship[200];

      // Calculate total materials cost
      const materialsCost =
        wrapperCost +
        foamCost +
        sticksCost +
        materialPrices.cellotape +
        flowerCost +
        birthdayCardCost +
        bowCost +
        clipCost +
        ribbonCost +
        collectionCost;

      // Calculate total
      const total = moneyValue + materialsCost + workmanshipCost;

      setTotalPrice(total);
    };

    calculateTotal();
  }, [customPackage]);

  const handleChange = (field, value) => {
    setCustomPackage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getPriceDescription = () => {
    if (customPackage.pieces <= 50) return "₦200, ₦500, or ₦1,000 notes";
    if (customPackage.pieces <= 100) return "₦200, ₦500, or ₦1,000 notes";
    return "Money tower size available";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                <FiPackage className="text-rose-500" />
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-rose-50 text-rose-700">
                Build Your Own
              </span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
              Customizable
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            CUSTOM MONEY BOUQUET
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            Create your own custom money bouquet with our interactive calculator
          </p>
        </div>

        {/* Card Body - Compact View when not expanded */}
        {!isExpanded ? (
          <div className="p-5">
            {/* Price Preview */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-rose-600">
                  {formatCurrency(totalPrice)}
                </span>
                <span className="text-sm text-gray-500">
                  for {customPackage.pieces} pieces
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getPriceDescription()}
              </p>
            </div>

            {/* Quick Preview */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                CURRENT SELECTION:
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Pieces:</span>
                  <span className="font-medium">{customPackage.pieces}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Note Value:</span>
                  <span className="font-medium">
                    ₦{customPackage.noteValue}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Expand Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Customize Now
              <FiChevronRight />
            </motion.button>
          </div>
        ) : (
          /* Expanded Custom Builder View */
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">
                Customize Your Bouquet
              </h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Collapse
              </button>
            </div>

            {/* Compact Custom Builder */}
            <div className="space-y-4">
              {/* Number of Pieces - Compact */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Money Pieces:{" "}
                  <span className="font-bold">{customPackage.pieces}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={customPackage.pieces}
                  onChange={(e) =>
                    handleChange("pieces", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>200</span>
                </div>
              </div>

              {/* Note Value - Compact */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Note Value
                </label>
                <div className="flex gap-2">
                  {[200, 500, 1000].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleChange("noteValue", value)}
                      className={`flex-1 py-2 rounded-lg border text-xs ${
                        customPackage.noteValue === value
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      ₦{value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wrapper Count - Compact */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Wrappers:{" "}
                  <span className="font-bold">
                    {customPackage.wrapperCount}
                  </span>{" "}
                  × ₦800
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleChange(
                        "wrapperCount",
                        Math.max(1, customPackage.wrapperCount - 1),
                      )
                    }
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-medium">
                    {customPackage.wrapperCount}{" "}
                    {customPackage.wrapperCount === 1 ? "wrapper" : "wrappers"}
                  </span>
                  <button
                    onClick={() =>
                      handleChange(
                        "wrapperCount",
                        customPackage.wrapperCount + 1,
                      )
                    }
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Foam Type - Compact */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Foam Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChange("foamType", "half")}
                    className={`flex-1 py-2 rounded-lg border text-xs ${
                      customPackage.foamType === "half"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    Half (₦2,000)
                  </button>
                  <button
                    onClick={() => handleChange("foamType", "full")}
                    className={`flex-1 py-2 rounded-lg border text-xs ${
                      customPackage.foamType === "full"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    Full (₦4,000)
                  </button>
                </div>
              </div>

              {/* Quick Items Toggle */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Include Items
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "flower",
                      label: "Flower",
                      price: 500,
                      checked: customPackage.includeFlower,
                    },
                    {
                      id: "birthdayCard",
                      label: "Birthday Card",
                      price: 1500,
                      checked: customPackage.includeBirthdayCard,
                    },
                    {
                      id: "bow",
                      label: "Bow",
                      price: 1000,
                      checked: customPackage.includeBow,
                    },
                    {
                      id: "clip",
                      label: "Clip",
                      price: 1000,
                      checked: customPackage.includeClip,
                    },
                    {
                      id: "ribbon",
                      label: "Ribbon",
                      price: 200,
                      checked: customPackage.includeRibbon,
                    },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all text-xs ${
                        item.checked
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) =>
                          handleChange(
                            `include${item.id.charAt(0).toUpperCase() + item.id.slice(1)}`,
                            e.target.checked,
                          )
                        }
                        className="hidden"
                      />
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          item.checked
                            ? "bg-rose-500 border-rose-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {item.checked && (
                          <FiCheck className="text-white text-xs" />
                        )}
                      </div>
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-500 ml-auto">
                        ₦{item.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Summary - Compact */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-3 border border-rose-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Total Price:
                  </span>
                  <span className="text-xl font-bold text-rose-600">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {customPackage.pieces} pieces × ₦{customPackage.noteValue}{" "}
                  notes
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Done
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Generate WhatsApp message for custom package
                    const message = `Hello Kayjih Bloom Haven 👋\n\nI would like to create a CUSTOM MONEY BOUQUET:\n\nCustom Details:\n• Pieces: ${customPackage.pieces}\n• Note Value: ₦${customPackage.noteValue}\n• Wrappers: ${customPackage.wrapperCount}\n• Foam: ${customPackage.foamType}\n• Includes: ${[
                      customPackage.includeFlower && "Flower",
                      customPackage.includeBirthdayCard && "Birthday Card",
                      customPackage.includeBow && "Bow",
                      customPackage.includeClip && "Clip",
                      customPackage.includeRibbon && "Ribbon",
                    ]
                      .filter(Boolean)
                      .join(
                        ", ",
                      )}\n\nTotal Price: ${formatCurrency(totalPrice)}\n\nPlease confirm availability. Thank you!`;

                    const phoneNumber = "+2347069975865";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiCreditCard className="text-sm" />
                  Order Now
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Hover Effect Ring */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-300 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default CustomPackageCard;

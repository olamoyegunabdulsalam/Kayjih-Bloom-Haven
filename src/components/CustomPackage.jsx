// src/components/CustomPackage.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiMinus,
  FiCheck,
  FiPackage,
  FiGift,
  FiScissors,
  FiCreditCard,
} from "react-icons/fi";
import WhatsAppOrderButton from "./WhatsAppOrderButton";

const CustomPackage = () => {
  // Material prices from your PDF
  const materialPrices = {
    wrapper: 800, // per wrapper
    foamHalf: 2000, // half foam
    foamFull: 4000, // full foam
    sticksPer50: 500, // 50 sticks
    sticksPer100: 1000, // 100 sticks
    cellotape: 1000, // per roll
    flower: 500, // each
    birthdayCard: 1500, // each
    bow: 1000, // each
    clip: 1000, // each
    ribbon: 200, // per meter
    collection: {
      50: 3500, // 50 pieces
      100: 4500, // 100 pieces
      200: 6500, // 200 pieces
    },
    workmanship: {
      50: 8000, // 50 pieces
      100: 12000, // 100 pieces
      200: 13000, // 200 pieces (tower)
    },
  };

  const [customPackage, setCustomPackage] = useState({
    pieces: 50,
    noteValue: 200,
    wrapperCount: 5,
    foamType: "half", // "half" or "full"
    includeFlower: true,
    includeBirthdayCard: true,
    includeBow: true,
    includeClip: true,
    includeRibbon: true,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [breakdown, setBreakdown] = useState({});
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate total whenever customPackage changes
  useEffect(() => {
    calculateTotal();
  }, [customPackage]);

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
    const flowerCost = customPackage.includeFlower ? materialPrices.flower : 0;
    const birthdayCardCost = customPackage.includeBirthdayCard
      ? materialPrices.birthdayCard
      : 0;
    const bowCost = customPackage.includeBow ? materialPrices.bow : 0;
    const clipCost = customPackage.includeClip ? materialPrices.clip : 0;
    const ribbonCost = customPackage.includeRibbon ? materialPrices.ribbon : 0;

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

    // Calculate total materials cost (excluding money)
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

    // Update breakdown
    setBreakdown({
      moneyValue,
      wrapperCost,
      foamCost,
      sticksCost,
      cellotape: materialPrices.cellotape,
      flowerCost,
      birthdayCardCost,
      bowCost,
      clipCost,
      ribbonCost,
      collectionCost,
      workmanshipCost,
      materialsCost,
      total,
    });

    setTotalPrice(total);
  };

  const handleChange = (field, value) => {
    setCustomPackage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getProductName = () => {
    return `Custom Money Bouquet (${customPackage.pieces} pieces, ₦${customPackage.noteValue} notes)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
          <FiPackage className="text-rose-500 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Build Custom Package
          </h3>
          <p className="text-gray-500 text-sm">
            Choose exactly what you want - price updates in real-time
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Number of Pieces */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Money Pieces
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                handleChange("pieces", Math.max(10, customPackage.pieces - 10))
              }
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <FiMinus />
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={customPackage.pieces}
                onChange={(e) =>
                  handleChange("pieces", parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span className="text-center font-medium">
                  {customPackage.pieces} pieces
                  {customPackage.pieces <= 50 && " (50-piece bouquet)"}
                  {customPackage.pieces > 50 &&
                    customPackage.pieces <= 100 &&
                    " (100-piece bouquet)"}
                  {customPackage.pieces > 100 && " (Money tower size)"}
                </span>
                <span>200</span>
              </div>
            </div>
            <button
              onClick={() =>
                handleChange("pieces", Math.min(200, customPackage.pieces + 10))
              }
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Note Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Value
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[200, 500, 1000].map((value) => (
              <button
                key={value}
                onClick={() => handleChange("noteValue", value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  customPackage.noteValue === value
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-gray-200 hover:border-rose-300"
                }`}
              >
                <div className="font-medium">₦{value}</div>
                <div className="text-xs text-gray-500">notes</div>
              </button>
            ))}
          </div>
        </div>

        {/* Wrapper Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Wrappers (₦800 each)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                handleChange(
                  "wrapperCount",
                  Math.max(1, customPackage.wrapperCount - 1),
                )
              }
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              -
            </button>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-800 min-w-[40px] text-center block">
                {customPackage.wrapperCount}
              </span>
              <span className="text-xs text-gray-500">
                {customPackage.pieces <= 50
                  ? "Standard: 5 wrappers"
                  : "Standard: 9 wrappers"}
              </span>
            </div>
            <button
              onClick={() =>
                handleChange("wrapperCount", customPackage.wrapperCount + 1)
              }
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              +
            </button>
            <div className="ml-4">
              <span className="text-gray-600 text-sm">
                = {formatCurrency(customPackage.wrapperCount * 800)}
              </span>
            </div>
          </div>
        </div>

        {/* Foam Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foam Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleChange("foamType", "half")}
              className={`p-4 rounded-xl border-2 transition-all ${
                customPackage.foamType === "half"
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">Half Foam</div>
                  <div className="text-sm text-gray-500">₦2,000</div>
                </div>
                {customPackage.pieces <= 50 && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    Recommended
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => handleChange("foamType", "full")}
              className={`p-4 rounded-xl border-2 transition-all ${
                customPackage.foamType === "full"
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">Full Foam</div>
                  <div className="text-sm text-gray-500">₦4,000</div>
                </div>
                {customPackage.pieces > 50 && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    Recommended
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Additional Items */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Items (All included in standard packages)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: "flower",
                label: "Flower",
                price: 500,
                icon: <FiGift />,
                checked: customPackage.includeFlower,
              },
              {
                id: "birthdayCard",
                label: "Birthday Card",
                price: 1500,
                icon: <FiCreditCard />,
                checked: customPackage.includeBirthdayCard,
              },
              {
                id: "bow",
                label: "Bow",
                price: 1000,
                icon: <FiGift />,
                checked: customPackage.includeBow,
              },
              {
                id: "clip",
                label: "Clip",
                price: 1000,
                icon: <FiScissors />,
                checked: customPackage.includeClip,
              },
              {
                id: "ribbon",
                label: "Ribbon",
                price: 200,
                icon: <FiScissors />,
                checked: customPackage.includeRibbon,
              },
            ].map((item) => (
              <label
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    item.checked
                      ? "bg-rose-500 border-rose-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {item.checked && <FiCheck className="text-white text-xs" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{item.label}</div>
                  <div className="text-sm text-gray-500">
                    ₦{item.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-rose-500">{item.icon}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800">Price Summary</h4>
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-sm text-rose-600 hover:text-rose-700 font-medium"
            >
              {showBreakdown ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {showBreakdown ? (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Money Value:</span>
                <span className="font-medium">
                  {formatCurrency(breakdown.moneyValue || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Wrappers ({customPackage.wrapperCount} × ₦800):
                </span>
                <span className="font-medium">
                  {formatCurrency(breakdown.wrapperCost || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Foam ({customPackage.foamType}):
                </span>
                <span className="font-medium">
                  {formatCurrency(breakdown.foamCost || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sticks:</span>
                <span className="font-medium">
                  {formatCurrency(breakdown.sticksCost || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cellotape:</span>
                <span className="font-medium">
                  {formatCurrency(breakdown.cellotape || 0)}
                </span>
              </div>
              {customPackage.includeFlower && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Flower:</span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.flowerCost || 0)}
                  </span>
                </div>
              )}
              {customPackage.includeBirthdayCard && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Birthday Card:</span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.birthdayCardCost || 0)}
                  </span>
                </div>
              )}
              {customPackage.includeBow && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bow:</span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.bowCost || 0)}
                  </span>
                </div>
              )}
              {customPackage.includeClip && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Clip:</span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.clipCost || 0)}
                  </span>
                </div>
              )}
              {customPackage.includeRibbon && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ribbon:</span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.ribbonCost || 0)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Bank Collection + Transport:
                </span>
                <span className="font-medium">
                  {formatCurrency(breakdown.collectionCost || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Workmanship:</span>
                <span className="font-medium">
                  {formatCurrency(breakdown.workmanshipCost || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-700">
                  Total Materials & Services:
                </span>
                <span className="font-medium">
                  {formatCurrency(
                    breakdown.materialsCost + breakdown.workmanshipCost || 0,
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Money Value:</span>
                <span className="font-medium">
                  {formatCurrency(breakdown.moneyValue || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Materials & Services:</span>
                <span className="font-medium">
                  {formatCurrency(
                    (breakdown.materialsCost || 0) +
                      (breakdown.workmanshipCost || 0),
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-rose-200">
            <span className="text-lg font-bold text-gray-800">
              Total Price:
            </span>
            <span className="text-2xl font-bold text-rose-600">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>

        {/* WhatsApp Order Button for Custom Package */}
        <div className="mt-6">
          <WhatsAppOrderButton
            product={{
              name: getProductName(),
              price: formatCurrency(totalPrice),
              description: `Custom package with ${customPackage.pieces} pieces of ₦${customPackage.noteValue} notes`,
              isCustom: true,
              customDetails: customPackage,
              breakdown: breakdown,
            }}
            orderDetails={{
              quantity: 1,
              customMessage: `Custom Package Details:\n• Pieces: ${customPackage.pieces}\n• Note Value: ₦${customPackage.noteValue}\n• Wrappers: ${customPackage.wrapperCount}\n• Foam: ${customPackage.foamType}\n• Includes: ${[
                customPackage.includeFlower && "Flower",
                customPackage.includeBirthdayCard && "Birthday Card",
                customPackage.includeBow && "Bow",
                customPackage.includeClip && "Clip",
                customPackage.includeRibbon && "Ribbon",
              ]
                .filter(Boolean)
                .join(", ")}\n• Total Price: ${formatCurrency(totalPrice)}`,
            }}
          />
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            💡 <span className="font-semibold">Important:</span> All prices
            include cellotape (₦1,000), sticks, and bank collection + transport.
            You can provide new notes to reduce the money value cost.
            Workmanship and collection prices adjust automatically based on
            number of pieces.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomPackage;

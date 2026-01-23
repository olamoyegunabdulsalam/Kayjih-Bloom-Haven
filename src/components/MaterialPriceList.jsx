// src/components/MaterialPriceList.jsx
import { motion } from "framer-motion";
import { FiPackage, FiScissors, FiGift, FiStar } from "react-icons/fi";

const MaterialPriceList = () => {
  const materials = [
    { name: "Wrapper", price: "₦800", unit: "each", icon: <FiGift /> },
    {
      name: "Foam (Half)",
      price: "₦2,000",
      unit: "per bouquet",
      icon: <FiPackage />,
    },
    {
      name: "Foam (Full)",
      price: "₦4,000",
      unit: "per bouquet",
      icon: <FiPackage />,
    },
    {
      name: "Sticks (50 pieces)",
      price: "₦500",
      unit: "per set",
      icon: <FiScissors />,
    },
    {
      name: "Sticks (100 pieces)",
      price: "₦1,000",
      unit: "per set",
      icon: <FiScissors />,
    },
    {
      name: "Cellotape",
      price: "₦1,000",
      unit: "per roll",
      icon: <FiScissors />,
    },
    { name: "Flower", price: "₦500", unit: "each", icon: <FiStar /> },
    { name: "Birthday Card", price: "₦1,500", unit: "each", icon: <FiGift /> },
    { name: "Bow", price: "₦1,000", unit: "each", icon: <FiGift /> },
    { name: "Clip", price: "₦1,000", unit: "each", icon: <FiScissors /> },
    { name: "Ribbon", price: "₦200", unit: "per meter", icon: <FiScissors /> },
  ];

  const services = [
    { name: "Bank Collection + Transport (50pcs)", price: "₦3,500" },
    { name: "Bank Collection + Transport (100pcs)", price: "₦4,500" },
    { name: "Bank Collection + Transport (200pcs)", price: "₦6,500" },
    { name: "Workmanship (50 pieces)", price: "₦8,000" },
    { name: "Workmanship (100 pieces)", price: "₦12,000" },
    { name: "Workmanship (Tower)", price: "₦13,000" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
          <FiPackage className="text-rose-500 text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Material & Service Price List
          </h3>
          <p className="text-gray-500 text-sm">
            Individual item pricing for custom orders
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Materials */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Materials (Per Item)
          </h4>
          <div className="space-y-3">
            {materials.map((material, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-rose-500">{material.icon}</div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {material.name}
                    </div>
                    <div className="text-xs text-gray-500">{material.unit}</div>
                  </div>
                </div>
                <div className="font-bold text-rose-600">{material.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Services</h4>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="font-medium text-gray-800">{service.name}</div>
                <div className="font-bold text-rose-600">{service.price}</div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h5 className="font-bold text-amber-800 mb-2">
              💡 Important Notes:
            </h5>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• You can provide new notes to reduce cost</li>
              <li>• Workmanship depends on decoration complexity</li>
              <li>• Delivery charges may apply based on location</li>
              <li>• Custom designs may have additional charges</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MaterialPriceList;

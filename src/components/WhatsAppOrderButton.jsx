// src/components/WhatsAppOrderButton.jsx - Updated
import { motion } from "framer-motion";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { useState } from "react";

const WhatsAppOrderButton = ({ product, orderDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Update the WhatsAppOrderButton.jsx generateWhatsAppMessage function:
  const generateWhatsAppMessage = () => {
    const selectedOption = product.selectedOption;
    const selectedWorkmanship = product.selectedWorkmanship;

    let message = `Hello Kayjih Bloom Haven`;

    if (product.isCustom) {
      // Custom package message
      message += `I would like to create a CUSTOM MONEY BOUQUET:\n\n`;
      message += `Custom Details:\n`;
      message += `• Pieces: ${product.customDetails.pieces}\n`;
      message += `• Note Value: ₦${product.customDetails.noteValue}\n`;
      message += `• Wrappers: ${product.customDetails.wrapperCount}\n`;
      message += `• Foam: ${product.customDetails.foamType}\n`;
      message += `• Includes: ${[
        product.customDetails.includeFlower && "Flower",
        product.customDetails.includeBirthdayCard && "Birthday Card",
        product.customDetails.includeBow && "Bow",
        product.customDetails.includeClip && "Clip",
        product.customDetails.includeRibbon && "Ribbon",
      ]
        .filter(Boolean)
        .join(", ")}\n\n`;
      message += `Total Price: ${product.price}\n`;
    } else {
      // Regular product message
      message += `I would like to order the following:\n\n`;
      message += `Product: ${product.name}\n`;

      // Add selected package/note option
      if (selectedOption) {
        if (selectedOption.noteValue) {
          message += `Note Value: ${selectedOption.noteValue}\n`;
          if (selectedOption.calculation) {
            message += `Calculation: ${selectedOption.calculation}\n`;
          }
        } else if (selectedOption.option) {
          message += `Package: ${selectedOption.option}\n`;
        }
        message += `Package Price: ${selectedOption.total}\n`;
      }

      // Add workmanship for decoration package
      if (selectedWorkmanship) {
        message += `Workmanship Type: ${selectedWorkmanship.type}\n`;
        message += `Workmanship Price: ${selectedWorkmanship.price}\n`;
      }

      // Add total price
      if (product.totalPrice) {
        message += `Total Price: ${product.totalPrice}\n`;
      }
    }

    // Add customization options
    if (orderDetails.quantity && orderDetails.quantity > 1) {
      message += `Quantity: ${orderDetails.quantity}\n`;
    }
    if (orderDetails.eventType) {
      message += `Event Type: ${orderDetails.eventType}\n`;
    }
    if (orderDetails.deliveryDate) {
      message += `Delivery Date: ${orderDetails.deliveryDate}\n`;
    }
    if (orderDetails.customMessage) {
      message += `Additional Notes: ${orderDetails.customMessage}\n`;
    }

    message += `\nPlease confirm availability and provide payment details. Thank you!`;

    return encodeURIComponent(message);
    };
    
  const handleWhatsAppOrder = () => {
    const phoneNumber = "+2347069975865"; 
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWhatsAppOrder}
      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
    >
      {isHovered ? (
        <FiSend className="text-lg" />
      ) : (
        <FiMessageCircle className="text-lg" />
      )}
      Order on WhatsApp
    </motion.button>
  );
};;

export default WhatsAppOrderButton;

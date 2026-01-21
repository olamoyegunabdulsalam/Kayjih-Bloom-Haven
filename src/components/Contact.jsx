import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiSend } from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const contactInfo = [
    {
      icon: <FiPhone />,
      title: "Call Us",
      info: "+234 (706) 997 5865",
      link: "tel:+2347069975865",
    },
    {
      icon: <FaSnapchatGhost />,
      title: "Snapchat",
      info: "aissshaaa-1",
      link: "https://www.snapchat.com/add/aissshaaa-1",
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      info: "kayjihhh",
      link: "https://www.instagram.com/kayjihhh",
    },
    {
      icon: <FaTiktok />,
      title: "TikTok",
      info: "KAYJIH BLOOM HAVEN",
      link: "https://www.tiktok.com/@KAYJIH BLOOM HAVEN",
    },
  ];

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-b from-rose-50 to-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white rounded-full text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Let's Create <span className="text-rose-600">Magic Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your event? Contact us for a free consultation
            and quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 group-hover:text-rose-600 transition-colors">
                      {info.info}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div variants={itemVariants} className="mt-10">
              <motion.a
                href="https://wa.me/2347069975865"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FaWhatsapp className="text-2xl" />
                <div>
                  <div className="font-semibold text-lg">Chat on WhatsApp</div>
                  <div className="text-sm opacity-90">
                    Quick response guaranteed
                  </div>
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="ml-4"
                >
                  <FiSend />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

            <img
              src="/img/money-tower.jpeg"
              alt="Money Tower"
              className="w-full h-full max-h-[520px] object-cover rounded-3xl"
            />
        </div>
      </div>
    </section>
  );
};

export default Contact;

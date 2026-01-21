// components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiSparkles, HiShieldCheck } from "react-icons/hi";
import {  FiHeart, } from "react-icons/fi";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

const features = [
  {
    icon: <HiSparkles />,
    title: "Luxury Craftsmanship",
    description:
      "Every decoration and money bouquet is thoughtfully designed with elegance, detail, and a refined finish.",
  },
  {
    icon: <HiShieldCheck />,
    title: "Trusted & Professional",
    description:
      "Reliable service you can count on delivered with care, precision, and respect for your special moments.",
  },
  {
    icon: <FiHeart />,
    title: "Personalized Experience",
    description:
      "Your vision comes first. Each design is tailored to match your style, theme, and celebration.",
  },
];

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-4">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Creating <span className="text-rose-600">Magical Moments</span>
            With Purpose
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Image & Stats */}
          <motion.div variants={itemVariants} className="relative">
            {/* Image Placeholder - Replace with actual image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/img/kayjih.jpeg"
                alt="Kayjih picture"
                className="w-full h-full max-h-[520px] object-cover rounded-3xl"
              />

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-100 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-100 rounded-full" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="text-2xl font-bold text-rose-700 flex">
                {" "}
                <HiShieldCheck /> Trusted
              </div>
              <div className="text-gray-600">By Happy Clients</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8"
            >
              We are a luxury event decoration and money bouquet brand dedicated
              to creating visually stunning and emotionally meaningful
              celebrations. Every detail is carefully curated to reflect
              elegance, creativity, and exclusivity.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-10"
            >
              Our creative process blends refined aesthetics with flawless
              execution, ensuring each event feels personal, distinctive, and
              truly memorable. From intimate moments to grand celebrations, we
              deliver excellence without compromise.
            </motion.p>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

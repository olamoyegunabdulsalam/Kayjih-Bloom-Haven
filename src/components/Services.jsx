// components/Services.jsx
import {useState} from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import { 
  FiPackage, 
  FiDollarSign, 
  FiCalendar, 
  FiHeart,
  FiStar,
  FiCheck
} from 'react-icons/fi';
import { GiPartyPopper, GiBigDiamondRing } from "react-icons/gi";

const Services = () => {
    const [openService, setOpenService] = useState(null);
  const services = [
    {
      icon: <GiPartyPopper />,
      title: "Event Decoration",
      description:
        "Complete event styling including venue decoration, theme design, and floral arrangements for all occasions.",
      features: [
        "Theme Design",
        "Venue Setup",
        "Floral Arrangements",
        "Lighting",
      ],
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <FiDollarSign />,
      title: "Money Bouquets",
      description:
        "Creative and elegant money bouquets for birthdays, weddings, graduations, and special celebrations.",
      features: [
        "Custom Designs",
        "Elegant Packaging",
        "Various Sizes",
        "Fast Delivery",
      ],
      color: "from-gold-500 to-amber-400",
    },
    {
      icon: <FiCalendar />,
      title: "Birthday Styling",
      description:
        "Transform birthday celebrations with stunning decorations, balloon arrangements, and personalized themes.",
      features: [
        "Balloon Decor",
        "Backdrop Design",
        "Table Setup",
        "Photo Booth",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="services"
      className="py-20 px-6 bg-gradient-to-b from-white to-rose-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Premium <span className="text-rose-600">Decoration Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive event styling solutions to make your special
            moments truly memorable
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${service.color} h-2`} />

                <div className="p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      color: service.color
                        .split(" ")[1]
                        .replace("to-", "#")
                        .replace("-500", ""),
                    }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FiCheck className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => setOpenService(service.title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Book This Service
                  </motion.button>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiStar className="text-2xl text-yellow-400" />
                </div>
              </div>

              {/* Floating Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <ContactModal
        isOpen={!!openService}
        onClose={() => setOpenService(null)}
        serviceName={openService}
      />
    </section>
  );
};

export default Services;
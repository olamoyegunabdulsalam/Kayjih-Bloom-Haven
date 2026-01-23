// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import ScrollToTop from "../components/ScrollToTop";
import ProductsCTA from "../components/ProductsCTA";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-rose-50">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <ProductsCTA />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
};

export default Home;

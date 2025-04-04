import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Temp from "./../Temp";
import Section from "./../Section";
import MapComponents from "../Frontend";
import { motion } from "framer-motion"; 
import "leaflet/dist/leaflet.css"; 

function Hero() {
  return (
    <div className="relative flex flex-col items-center mx-auto max-w-7xl px-6 gap-8 text-center ">

      {/* Main Heading with Background Image and Scroll Animation */}
      <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="font-extrabold text-[50px] sm:text-[60px] md:text-[70px] text-white leading-tight mt-16 py-12 px-6 relative z-10"
        >
          <span className="text-[#d23131]">
            Discover Your Next Adventure <br />
          </span>
          <span className = "text-black text-6xl"> With AI: Personalized Itineraries At Your Fingertips </span>
        </motion.h2>

        <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-800 text-lg sm:text-xl max-w-2xl leading-relaxed"
      >
        Welcome to <span className="font-semibold text-blue-600">TripMate</span>,
        your ultimate travel companion! Plan your trips effortlessly with AI-powered suggestions,
        real-time recommendations, and personalized itineraries. 📍
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Link to="/create-trip">
          <Button className="px-6 py-3 text-lg font-semibold hover:opacity-90 rounded-xl shadow-lg">
            Get Started
          </Button>
        </Link>
      </motion.div>

      {/* Interactive Map with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-10 shadow-lg rounded-xl overflow-hidden border"
      >
        <MapComponents />
      </motion.div>

      {/* Features Heading with Scroll Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: .9 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold my-12 text-gray-900"
      >
        Everything You Need for Planning Your Trip ✈️
      </motion.h2>

      {/* Sections with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <Temp />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ once: true }}
      >
        <Section />
      </motion.div>
    </div>
  );
}

export default Hero;
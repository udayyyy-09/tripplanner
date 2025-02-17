import React from "react";
import { motion } from "framer-motion";
import shimla from "../../assets/shimla.jpg"; // Using Shimla image for Goa as well
import goa from "../../assets/goa.jpg";
function DestinationCard({ title, description, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-24 p-8 
               hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 font-semibold">
          {description}
        </p>
      </div>
      <div className="md:w-1/2">
        <img
          src={image}
          alt={title}
          className="rounded-2xl shadow-md w-full h-auto"
        />
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  return (
    <div className="space-y-16 p-30">
      {" "}
      {/* Increased spacing */}
      <DestinationCard
        title="Shimla"
        description="Shimla is a hill station in Himachal Pradesh, India, known for its natural beauty, colonial architecture, and pleasant weather.Known for: 
Being the summer capital of British India
Having colonial architecture, including houses, market places, and lakes
Having a pedestrian-friendly Mall Road"
        image={shimla}
      />
      <DestinationCard
        title="Goa"
        description="Goa is known for its beautiful beaches, vibrant nightlife, and Portuguese heritage.Popular tourist destinations: Baga beach, Anjuna Flea Market, Arpora Saturday Night Market, and Mapusa Friday Market. "
        image={goa} // Using Shimla image for Goa as well
      />
    </div>
  );
}

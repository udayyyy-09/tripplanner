import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapComponents } from "./Frontend";

function MapWithZoomIndicator() {
  const [isMapInteracted, setIsMapInteracted] = useState(false);

  // Function to handle map interaction
  const handleMapInteraction = () => {
    setIsMapInteracted(true);
  };

  return (
    <div className="relative w-full mt-10 shadow-lg rounded-xl overflow-hidden border">
      {/* Map Component */}
      <MapComponents onInteraction={handleMapInteraction} />

      {/* Zoom Indicator */}
      {!isMapInteracted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <span className="text-sm text-gray-700">Zoom In/Out</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🔍
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default MapWithZoomIndicator;
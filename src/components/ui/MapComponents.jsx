import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const MapComponents = () => {
  const [isMapInteracted, setIsMapInteracted] = useState(false);

  // Function to handle map interaction
  const handleMapInteraction = () => {
    console.log("Map interacted!"); // Debugging
    setIsMapInteracted(true);
  };

  return (
    <div className="relative h-[800px] w-full rounded-lg overflow-hidden shadow-lg">
      {/* Map Container */}
      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={10}
        className="h-full w-full"
        whenCreated={(map) => {
          console.log("Map instance created:", map); // Debugging
          // Add event listener for zoom interaction
          map.on("zoomstart", handleMapInteraction);
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[31.1048, 77.1734]}>
          <Popup>Shimla, Himachal Pradesh, India</Popup>
        </Marker>
      </MapContainer>

      {/* Zoom Indicator */}
      {!isMapInteracted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
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
};

export default MapComponents;
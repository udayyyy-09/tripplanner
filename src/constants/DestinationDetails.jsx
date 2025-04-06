// src/pages/DestinationDetail.jsx
import React from "react";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

// Sample data - should match what's in your Hero component
const destinations = {
  tokyo: {
    title: "Tokyo Dreams",
    video: "/tokyo.mp4",
    places: [
      {
        name: "Tokyo Dreams",
        description: "From neon-lit streets to serene temples, Tokyo offers a dynamic mix of modern and cultural experiences..",
        image: "/tokyo.jpg"
      },
      {
        name: "Shibuya",
        description: "Tokyo mesmerizes visitors with its orderly chaos, towering skyline, and unique urban culture..",
        image: "/tokyo1.jpeg"
      },
      {
        name: "Shinjuku",
        description: "A city that never sleeps, Tokyo thrills with its energy, cuisine, and cutting-edge lifestyle..",
        image: "/tokyo2.jpeg"
      },
      // ... more Tokyo places
    ]
  },
  dubai: {
    title: "Dubai Wonders",
    video: "/dubai.mp4",
    places: [
      {
        name: "Museum Of The Future",
        description: "Blending tradition and modernity, Dubai offers gold souks, desert safaris, and world-class shopping.",
        image: "/Dubai.webp"
      },
      {
        name: "Burj Khalifa",
        description: "Dubai is a dazzling city of skyscrapers, luxury, and futuristic innovation in the heart of the desert.",
        image: "/dubai1.jpeg"
      },
      {
        name: "Burj Al Arab",
        description: "Dubai is a playground of adventure, from desert dunes to indoor ski slopes and theme parks.",
        image: "/dubai2.jpeg"
      },
      // ... more Dubai places
    ]
  },
  shimla: {
    title: "Shimla Serenity",
    video: "/shimla.mp4",
    places: [
        {
            name: "Mall Road",
            description: "A favorite honeymoon and holiday destination, Shimla captivates with its natural beauty and vibrant streets.",
            image: "/Shimla.jpeg"
          },
            {
            name: "Jakhoo Temple",
            description: "Shimla offers a serene escape with cool weather, pine forests, and snow-covered hills.",
            image: "/shimla1.jpeg"
          },
          {
            name: "Green Valley",
            description: "Surrounded by majestic peaks, Shimla is a peaceful retreat rich in history and culture.",
            image: "/shimla2.jpeg"
          }
      // ... Shimla places
    ]
  },
  rome: {
    title: "Roman Odyssey",
    video: "/roman.mp4",
    places: [
      {
        name: "Amphitheatrum Flavium",
        description: "Experience the might of the Roman Empire through stunning recreations and cultural wonders.",
        image: "/rome.jpg"
      },
      {
        name: "Gladiator Arenas",
        description: "Walk through towering columns, gladiator arenas, and majestic palaces in Roman Odyssey City.",
        image: "/roman1.jpeg"
      },
      {
        name: "Gladiator Arenas(Inside)",
        description: "Roman Odyssey City is an immersive destination that brings ancient Rome’s grandeur to life.",
        image: "/roman2.jpeg"
      },
      
      // ... more Rome places
    ]
  }
};

const DestinationDetail = () => {
  const { id } = useParams();
  
  // Get the specific destination data based on the ID
  const destination = destinations[id] || destinations.tokyo; // Fallback to Tokyo if not found

  return (
    <div className="min-h-screen">
      {/* Video Header */}
      <div className="relative h-screen max-h-[70vh] overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        >
          <source src={destination.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] // Custom easing for smooth bounce
    }
  }}
  transition={{ duration: 1.2 }}
  className={`
    text-5xl md:text-7xl lg:text-8xl 
    font-bold text-white text-center
    tracking-tight
    drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]
    text-stroke-2 text-stroke-black/50
    px-4 pb-2
    bg-gradient-to-b from-white/90 to-white/70
    bg-clip-text text-transparent
    mix-blend-overlay
  `}
>
  {destination.title}
</motion.h1>        </div>
      </div>

      {/* Places to Visit Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Must-Visit Places in {destination.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destination.places.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Itinerary Section */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Suggested 3-Day Itinerary</h3>
          <div className="space-y-4">
            {destination.places.map((place, day) => (
              <div key={day} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="bg-[#f56551] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {day + 1}
                </div>
                <div>
                  <h4 className="font-bold">Day {day + 1}: {place.name}</h4>
                  <p className="text-gray-600">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
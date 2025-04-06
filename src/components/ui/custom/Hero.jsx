import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';
import "leaflet/dist/leaflet.css";
import MapComponents from "../Frontend";
import Footer from './../../../view-trip/[tripId]/components/Footer';
import Temp from './../Temp';
function Hero() {
  const navigate = useNavigate();

  const featuredDestinations = [
    {
      id: "tokyo",
      title: "Tokyo Dreams",
      description: "3-day immersive journey through Tokyo's neon-lit streets, ancient temples, and culinary wonders",
      image: "/tokyo.jpg"
    },
    {
      id: "dubai",
      title: "Dubai Wonders",
      description: "Luxurious 3-day adventure exploring futuristic skyscrapers, golden deserts, and vibrant markets",
      image: "/Dubai.webp"
    },
    {
      id: "shimla",
      title: "Shimla Serenity",
      description: "3-day Himalayan retreat through colonial charm, mountain vistas, and peaceful nature walks",
      image: "/Shimla.jpg"
    },
    {
      id: "rome",
      title: "Roman Odyssey",
      description: "3-day historical exploration of ancient ruins, Renaissance art, and authentic Italian flavors",
      image: "/rome.jpg"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tripItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const handleDestinationClick = (destinationId) => {
    navigate(`/destination/${destinationId}`);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col items-center px-4 sm:px-8 lg:px-56 gap-9"
    >
      <motion.div 
        variants={container}
        className="flex flex-col items-center gap-9 w-full max-w-4xl"
      >
        <motion.h2 
          variants={item}
          className="font-extrabold text-4xl sm:text-5xl text-zinc-700 text-center mt-16"
        >
          <span className="text-[#f56551]">
            Craft Your Perfect Journey With AI
          </span>
          <br />
          Where Dreams Meet Itineraries
        </motion.h2>
        
        <motion.p 
          variants={item}
          className='text-wrap text-gray-950 text-lg sm:text-xl text-center'
        >
          TripMate transforms your travel dreams into reality with AI-powered planning,
          personalized recommendations, and seamless experiences tailored just for you.
        </motion.p>
        
        <motion.div variants={item}>
          <Link to={'/create-trip'}>
            <Button className="px-8 py-4 text-lg bg-[#f56551] hover:bg-[#e05541] transition-colors">
              Design Your Adventure
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Featured Destinations Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 w-full max-w-6xl"
      >
        <motion.h3 
          whileInView={{ x: [-50, 0], opacity: [0, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          <span className="text-[#f56551]">Inspiration</span> For Your Next Escape
        </motion.h3>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer"
        >
          {featuredDestinations.map((destination, index) => (
            <motion.div 
              key={destination.id} 
              variants={tripItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-lg group relative"
              onClick={() => handleDestinationClick(destination.id)}
            >
              <div className="overflow-hidden relative h-64 sm:h-72">
                <img 
                  src={destination.image} 
                  alt={destination.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/placeholder-destination.jpg';
                    e.target.classList.add('bg-gray-200');
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 text-gray-800" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="font-bold text-2xl text-white mb-2">{destination.title}</div>
                  <p className="text-gray-200 text-base">
                    {destination.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: .9 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold my-12 text-gray-900"
      >
        Everything You Need for Planning Your Trip ✈️
      </motion.h2>


      
      <motion.div
        
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 sm:p-10 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f56551]/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#f56551]/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl font-medium text-gray-800 mb-6">
            "TripMate planned our honeymoon perfectly, suggesting hidden gems we'd never find on our own. The AI created a balanced itinerary with just the right mix of adventure and relaxation."
          </blockquote>
          <div className="flex items-center">
            <img 
              src="/user.jpeg" 
              alt="Happy Couple" 
              className="w-12 h-12 rounded-full border-2 border-[#f56551]"
            />
            <div className="ml-4">
              <div className="font-bold text-gray-900">Sarah & Michael</div>
              <div className="text-gray-500">Honeymoon in Dubai, June 2025</div>
            </div>
          </div>
        </div>
        
      </motion.div>

            {/* map */}
     <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-10 shadow-lg rounded-xl overflow-hidden border"
      >
        <MapComponents />


       

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
        className = "mt-3"
      >
        <Temp />
      </motion.div>

        <div className = "mb-5">
          <Footer/>
          
        </div>
           
    </motion.div>

    
    

  );
}

export default Hero;
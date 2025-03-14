import React from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
// import Destinations from './../Destinations';
import Temp from './../Temp';
import Section from './../Section';
import MapComponents from './../MapComponents';
// import { FaCalendarAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9 ">
      <h2 className="font-extrabold text-[50px] text-zinc-700 text-centre mt-16 ">
        <span className="text-[#ff1e1ee3]">
        Discover Your Next Adventure With AI:
        </span>
        Personalised Iteneraries At Your Finger Tips
      </h2>
      <p className = 'text-wrap text-gray-950 text-[20px] '>
        "Welcome to TripMate, your ultimate travel companion! Discover seamless
        trip planning powered by AI, personalized itineraries, and real-time
        recommendations.📍
      </p>
      <Link to ={'/create-trip'}>
          <Button>Get's Started</Button>
      </Link>

        <br />
        {/* <img src="map.png" alt="map page" /> */}
        <br />
        <MapComponents />
        <br />
        <h2 className = "text-4xl lg:text-5xl font-bold mb-12 ">Everything you need for planning your trip✈️</h2>
      {/* that blue section which have try now button */}
        <Temp/>           

        {/* section of ss of save trip */}
        <Section/>

    </div>
  );
}
export default Hero;


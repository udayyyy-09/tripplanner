import React from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-zinc-700 text-centre mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure With AI:
        </span>
        Personalised Iteneraries At Your Finger Tips
      </h2>
      <p className = 'text-wrap text-gray-950 text-[20px]'>
        "Welcome to TripMate, your ultimate travel companion! Discover seamless
        trip planning powered by AI, personalized itineraries, and real-time
        recommendations.
      </p>
      <Link to ={'/create-trip'}>
          <Button>Get's Started</Button>
      </Link>

    </div>
  );
}
export default Hero;


import React from "react";
import { Link } from 'react-router-dom';
import CreateTrip from './../../create-trip/index';
function Temp() {
  return (
    <div className="bg-black text-white text-center py-10 rounded-lg mx-4 md:mx-12 lg:mx-24 pb-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold px-4">
        Skip the manual trip planning and start your effortless journey with{" "}
        <span className="text-white">Trip Planner AI</span> today, at no cost.
      </h2>
        <Link to = {'create-trip'}>
            <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
            Try Now
        </button>
        </Link>
    </div>
  );
}

export default Temp;

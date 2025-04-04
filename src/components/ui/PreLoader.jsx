import React from 'react';
import spinner from './pre-loader.svg'; // Ensure the correct path

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0F172A] z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Image */}
        <img 
          src={spinner} 
          alt="Loading..." 
          className="w-24 h-24 animate-pulse" 
        />
        
        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-300 animate-pulse">
          Loading Your Adventure...
        </p>
      </div>
    </div>
  );
};

export default Preloader;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetHotelImageFromUnsplash } from './../../../service/Globalapi'; // Adjust path to your Unsplash service file

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  // Fetch images when component loads or trip data changes
  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      const hotels = trip?.tripData?.hotels || [];
      
      await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const imageUrl = await GetHotelImageFromUnsplash(
              `${hotel.name} ${hotel.address.split(',')[0]}` // Add city for better results
            );
            newImages[hotel.name] = imageUrl;
          } catch (error) {
            console.error(`Error loading image for ${hotel.name}:`, error);
            newImages[hotel.name] = null;
          }
        })
      );
      
      setHotelImages(newImages);
    };

    fetchImages();
  }, [trip]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-5">Hotel Recommendation</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
        {trip?.tripData?.hotels?.map((hotel, index) => {
          const imageUrl = hotelImages[hotel.name] || '/hotel-placeholder.jpg';
          
          return (
            <Link 
              key={`${hotel.name}-${index}`}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${hotel.name} ${hotel.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black no-underline hover:no-underline"
            >
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                {/* Image Container with Fallback */}
                <div className="relative pb-[75%] rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={imageUrl}
                    alt={`${hotel.name} exterior`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/hotel-placeholder.jpg';
                    }}
                    loading="lazy"
                  />
                </div>
                
                {/* Hotel Info */}
                <div className="mt-3 space-y-1">
                  <h2 className="font-medium line-clamp-1">{hotel.name}</h2>
                  <p className="text-xs text-gray-500 line-clamp-1">📍{hotel.address}</p>
                  <div className="flex justify-between text-sm">
                    <span>💰{hotel.price} per night</span>
                    <span>⭐{hotel.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
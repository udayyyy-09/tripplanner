import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-5">Hotel Recommendation</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => {
          return ( 
            <Link 
              to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName + hotel?.hotelAddress} 
              target="_blank"
              className="text-black no-underline"
            >
              <div key={index} className="hover:scale-110 transition-all cursor-pointer">
                <img src="/landing.png" alt="hotel images" className="rounded-xl" />
                <div className="my-5">
                  <h2 className="font-medium">{hotel?.hotelName}</h2>
                  <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
                  <h2 className="text-sm">💰{hotel.price} per night</h2>
                  <h2 className="text-sm">⭐{hotel.rating} stars</h2>
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

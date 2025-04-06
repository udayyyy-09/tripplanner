import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetDestinationPhoto } from './../../../service/Globalapi';

// Cache to store already fetched images
const imageCache = {};

function PlaceCardItem({ place }) {
  const [imageUrl, setImageUrl] = useState('/landing.png');
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchPlaceImage = async () => {
      try {
        setIsLoading(true);
        
        // Check cache first
        const cacheKey = `${place.placeName}-${place.placeDetails}`;
        if (imageCache[cacheKey]) {
          setImageUrl(imageCache[cacheKey]);
          setIsLoading(false);
          return;
        }

        // Get enhanced photo with multiple fallbacks
        const photoUrl = await GetDestinationPhoto(
          place.placeName,
          place.placeDetails
        );
        
        // Update cache and state
        const finalUrl = photoUrl || '/landing.png';
        imageCache[cacheKey] = finalUrl;
        setImageUrl(finalUrl);
        
      } catch (error) {
        console.error('Error loading place image:', error);
        setImageUrl('/landing.png');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceImage();

    // Retry mechanism if no good image found
    const timer = setTimeout(() => {
      if (imageUrl === '/landing.png' && retryCount < 2) {
        setRetryCount(c => c + 1);
      }
    }, 2000 * (retryCount + 1));

    return () => clearTimeout(timer);
  }, [place, retryCount]);

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black no-underline hover:no-underline hover:text-black"
      style={{ textDecoration: "none", backgroundColor: "transparent" }}
    >
      <div className="p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer rounded-xl bg-white shadow-sm hover:shadow-md">
        <div className="relative w-[150px] h-[130px] flex-shrink-0 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
          ) : (
            <img 
              src={imageUrl}
              alt={`${place.placeName} tourist attraction`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/landing.png';
                if (retryCount < 2) setRetryCount(c => c + 1);
              }}
              loading="lazy"
            />
          )}
        </div>
        
        <div className="flex-grow">
          <h2 className="font-bold text-lg line-clamp-1">{place.placeName}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">{place.placeDetails}</p>
          <h2 className="mt-2 font-medium flex items-center gap-1">
            <span>🕰️</span> {place.timeTravel}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
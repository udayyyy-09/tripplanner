import React, { useState, useEffect } from 'react';

function PlacesToEat({ places, currentCity ,restro}) {
  const [restaurantImages, setRestaurantImages] = useState({});
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      
      // Use Promise.all for parallel fetching
      await Promise.all(places.map(async (place) => {
        try {
          // Use the actual place name in the query
          const query = `${restro} restaurant ${currentCity}`;
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=3`
          );
          
          const data = await response.json();
          if (data.results?.length > 0) {
            // Randomly select one of the first 3 results for variety
            const randomIndex = Math.floor(Math.random() * Math.min(3, data.results.length));
            images[place.name] = data.results[randomIndex].urls.regular;
          }
        } catch (error) {
          console.error('Error fetching image for', place.name, error);
          // Fallback to placeholder if available
          images[place.name] = place.imageUrl || 'https://via.placeholder.com/400x300?text=Restaurant';
        }
      }));
      
      setRestaurantImages(images);
    };

    if (places?.length > 0) {
      fetchImages();
    }
  }, [places, currentCity]);

  if (!places || places.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <span className="text-amber-600">🍽️</span>
        Recommended Places to Eat in {currentCity}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${currentCity}`)}`;
          const imageUrl = restaurantImages[place.name] || 
                          place.imageUrl || 
                          'https://via.placeholder.com/400x300?text=Restaurant';

          return (
            <div 
              key={`${place.name}-${index}`} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.open(mapsUrl, '_blank')}
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative group">
                <img 
                  src={imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Restaurant';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <h4 className="font-bold text-white text-lg">{place.name}</h4>
                  <p className="text-amber-300 text-sm">{place.cuisine}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{place.name}</h4>
                    <p className="text-sm font-medium"><span className = "font-semibold text-gray-600">Must eat: </span> {place.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                    <span className="text-amber-800 font-medium">{place.rating}</span>
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Price:</span>
                    <span className="text-sm text-gray-800">{place.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Best Time:</span>
                    <span className="text-sm text-gray-800">{place.suggestedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToEat;
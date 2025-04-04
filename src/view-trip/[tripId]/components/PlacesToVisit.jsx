import React from 'react';

function PlacesToVisit({ trip }) {
  console.log("Itinerary: ", trip?.tripData?.itinerary);

  return (
    <div>
      <h2 className="font-bold text-lg">Places to visit</h2>
      <div>
        {trip?.tripData?.itinerary
          ? Object.entries(trip.tripData.itinerary)
              .sort(([dayA], [dayB]) => {
                const numA = parseInt(dayA.replace("day", ""), 10);
                const numB = parseInt(dayB.replace("day", ""), 10);
                return numA - numB;
              })
              .map(([day, details], index) => (
                <div key={index}>
                  <h2 className="font-bold text-lg">{day.toUpperCase()}</h2>
                  
                  {details.activities?.map((place, index) => (  // ✅ Corrected
                    <div key={index}> 
                      <h2>{place.placeName}</h2>  {/* ✅ Now correctly accessing placeName */}
                    </div>
                  ))}
                </div>
              ))
          : <p>No itinerary available</p>}
      </div>
    </div>
  );
}

export default PlacesToVisit;

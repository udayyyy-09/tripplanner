import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  console.log("Itinerary: ", trip?.tripData?.itinerary);

  return (
    <div>
      <h2 className="font-bold text-lg mt-10">Places to visit</h2>
      <div>
        {trip?.tripData?.itinerary
          ? Object.entries(trip.tripData.itinerary)
              .sort(([dayA], [dayB]) => {
                const numA = parseInt(dayA.replace("day", ""), 10);
                const numB = parseInt(dayB.replace("day", ""), 10);
                return numA - numB;
              })
              .map(([day, details], index) => (
                <div key={index} className="p-4 m-2 rounded-lg shadow">
                  <h2 className="font-bold text-lg">{day.toUpperCase()}</h2>

                  {/* ✅ Best Time to Visit at the day level */}
                  {details.bestTimeToVisit && (
                    <p className="text-red-700 mt-2">
                      <strong>Best Time to Visit:</strong> <span className = "font-medium text-black">{details.bestTimeToVisit}</span>
                    </p>
                  )}
                <div className = "grid md:grid-cols-2">
                  {details.activities?.map((place, idx) => (
                    <div key={idx} className="p-2 m-2 rounded-lg shadow">
                      {/* <h2 className="font-medium text-sm">{place.placeName}</h2> */}
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
                  </div>
                </div>
              ))
          : <p>No itinerary available</p>}
      </div>
    </div>
  );
}

export default PlacesToVisit;

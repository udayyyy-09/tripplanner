import React, { useState } from 'react';
import PlaceCardItem from './PlaceCardItem';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaStar, FaRegStar } from 'react-icons/fa';
import PlacesToEat from './PlacesToEat';
import Weather from './Weather'; // Import the Weather component

function PlacesToVisit({ trip }) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      <h2 className="font-bold text-lg mt-10">Trip Itinerary</h2>
      <div>
        {trip?.tripData?.dailyItinerary?.length > 0 ? (
          trip.tripData.dailyItinerary.map((dayDetails, index) => (
            <div key={index} className="p-4 m-2 rounded-lg shadow mb-8">
              <h2 className="font-bold text-lg">DAY {dayDetails.dayNumber}</h2>

              {/* Places to Visit */}
              <div className="mt-4">
                {dayDetails?.placesToVisit?.timeSlot && (
                  <p className="text-red-700 mt-2">
                    <strong>Best Time to Visit:</strong>{" "}
                    <span className="font-medium text-black">
                      {dayDetails.timeSlot}
                    </span>
                  </p>
                )}
                
                <div className="grid md:grid-cols-2">
                  {dayDetails.placesToVisit?.map((place, idx) => (
                    <div key={idx} className="p-2 m-2 rounded-lg ">
                      <div className="flex justify-between items-start">
                        <PlaceCardItem place={place} />
                        {place.timeSlot && (
                          <div className="ml-2 bg-blue-50 px-2 py-1 rounded mt-5">
                            <p className="text-xs text-blue-700 font-medium">
                              {place.timeSlot}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Places to Eat */}
              <PlacesToEat 
                places={dayDetails.placesToEat} 
                currentCity={trip.userSelection?.destination}
                restro = {dayDetails?.placesToEat?.name}
              />

              {/* Weather for this specific day */}
              {dayDetails.weather && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3">Weather</h3>
                  <Weather weather={dayDetails.weather} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No dailyItinerary available</p>
        )}
      </div>

      {/* Rating Prompt Button and Dialog (keep existing code) */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => setShowRatingDialog(true)}
          className="px-4 py-2 bg-blue-900 text-white hover:bg-blue-600"
        >
          Rate Your Experience
        </button>
      </div>

      <AlertDialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        {/* ... existing dialog code ... */}
      </AlertDialog>
    </div>
  );
}

export default PlacesToVisit;
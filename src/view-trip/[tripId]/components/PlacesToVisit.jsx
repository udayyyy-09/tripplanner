import React, { useState, useEffect } from 'react';
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

function PlacesToVisit({ trip }) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

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

                  {details.bestTimeToVisit && (
                    <p className="text-red-700 mt-2">
                      <strong>Best Time to Visit:</strong> <span className="font-medium text-black">{details.bestTimeToVisit}</span>
                    </p>
                  )}
                  <div className="grid md:grid-cols-2">
                    {details.activities?.map((place, idx) => (
                      <div key={idx} className="p-2 m-2 rounded-lg shadow">
                        <PlaceCardItem place={place} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
          : <p>No itinerary available</p>}
      </div>

      {/* Rating Prompt Button */}
      <div className="mt-8 text-center ">
        <button 
          onClick={() => setShowRatingDialog(true)}
          className="px-4 py-2 bg-blue-900 text-white hover:bg-blue-600 "
        >
          Rate Your Experience
        </button>
      </div>

      {/* Rating Dialog - Maintains your original styling */}
      <AlertDialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rate Your Experience</AlertDialogTitle>
            <AlertDialogDescription>
              How would you rate this trip plan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex justify-center my-4 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="text-xl focus:outline-none"
              >
                {star <= (hoverRating || rating) ? (
                  <FaStar className="text-white" />
                ) : (
                  <FaRegStar className="text-white" />
                )}
              </button>
            ))}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setShowRatingDialog(false)}
              className="px-4 py-2"
            >
              Maybe Later
            </AlertDialogCancel>
            <button
              onClick={() => {
                console.log('Rating submitted:', rating);
                setShowRatingDialog(false);
              }}
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                rating === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={rating === 0}
            >
              Submit Rating
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PlacesToVisit;
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
import Weather from './Weather';
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from '@emailjs/browser';
// import {generatePDF} from './Information'
import CreateTrip from './../../../create-trip/index';
function PlacesToVisit({ trip }) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Generate PDF function
  

  // Function to send email with PDF attachment
  const sendEmailWithPDF = async () => {
    setIsSubmitting(true);
  
    try {
     
      // Initialize EmailJS
      emailjs.init("FxGvv6_Fbv7hooWkE"); // Replace with your actual EmailJS user ID
      
      const generateStarString = (rating) => {
        const fullStars = '⭐'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return fullStars + emptyStars;
      };

      // Create template parameters
      const templateParams = {
        to_email: trip.userEmail,
        user_name: trip.userEmail || "Traveler",
        destination: trip?.userSelection?.destination || "Your Destination",
        duration: trip?.userSelection?.days || "planned",
        user_rating: rating,
        trip_date: new Date().toLocaleDateString(),
        email: trip.userEmail,
        star_string: generateStarString(rating), // ⭐⭐⭐⭐☆,
        feedback_url: 'https://triplanner-one.vercel.app'
      };


      
      
      
      // Send email with EmailJS
      await emailjs.send(
        "service_vmxvnzi", // Replace with your EmailJS service ID
        "template_7rgxmoh", // Replace with your EmailJS template ID
        templateParams
      );
      
      toast({
        title: "Thanks for your feedback! 🎉",
        description: "Your rating has been submitted successfully. Check your email for your trip details!",
      });
    } catch (error) {
      console.error("Error sending email with PDF:", error);
      toast({
        title: "Thanks for your feedback",
        description: "Your rating was submitted but we couldn't send the email. You can download your trip PDF manually.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setShowRatingDialog(false);
    }
  };

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

      {/* Rating Prompt Button */}
      <div className="mt-8 text-center ">
        <button 
          onClick={() => setShowRatingDialog(true)}
          className="px-4 py-2 bg-blue-900 text-white hover:bg-blue-600 rounded"
        >
          Rate Your Experience
        </button>
      </div>

      {/* Rating Dialog */}
      <AlertDialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rate Your Experience</AlertDialogTitle>
            <AlertDialogDescription>
              How would you rate this trip plan? We'll email you a PDF copy of your itinerary as a thank you!
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex justify-center my-4 gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= (hoverRating || rating) ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-300" />
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
              onClick={sendEmailWithPDF}
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                rating === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit & Get PDF'}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PlacesToVisit;
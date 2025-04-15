import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig"; 
import Information from './components/Information';
import Weather from './components/Weather'; // Import the Weather component
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Initialize as null instead of false

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, 'AiTrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  if (!trip) return <div className="p-10 md:px-20 lg:px-44 xl:px-56">Loading trip data...</div>;

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      <Information trip={trip} />
      
      {/* Hotel Recommendation */}
      <Hotels trip={trip} />
      
      {/* Weather Forecast - Added before Places to Visit */}
     
      
      {/* Places to visit */}
      <PlacesToVisit trip={trip} />
      
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Viewtrip;
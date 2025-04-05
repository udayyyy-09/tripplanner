import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig"; 
import Information from './components/Information';
// import { Toaster } from './../../components/ui/toaster';

import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';
function Viewtrip() {
  const { tripId } = useParams();
  const [trip,setTrip] = useState(false);
  useEffect(()=>{
    tripId&&GetTripData();
  },[tripId])
  const GetTripData = async () => {
      const docRef = doc(db,'AiTrips',tripId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
         console.log("Document: ",docSnap.data());
         setTrip(docSnap.data());
      }else{
        console.log("No such document!");
        // toast('No trip found')
      }
  }
  console.log("TripId: ", tripId);
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Inforrmation section */}
        <Information trip = {trip} />
      {/* Hotel Recommendation */}
        <Hotels trip = {trip}/>
        {/*Places to visit  */}
        <PlacesToVisit trip = {trip}/>
        {/* footer */}
        <Footer/>
    </div>
  );
}

export default Viewtrip
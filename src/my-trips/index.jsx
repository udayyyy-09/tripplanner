import { useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import {collection,getDocs,query,where} from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(()=>{
    GetUserTrips();
  },[])

  /**
   * Used to Get All User
   * @returns
   */
  const GetUserTrips= async ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("User Status : ", user);
    if(!user){
      navigate('/');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    console.log("User Personal Trip",doc.id, " => ", doc.data());
    setUserTrips((prevVal)=> [...prevVal,doc.data()]);
});

  }
  return (
    <div className = "sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 text-center">
        <h2 className = "font-bold text-3xl">My Trips</h2>
        <div className = "grid grid-cols-2 md:grid-cols-3 mt-10 gap-8 ">
          {userTrips.map((trip, index) => (
            <UserTripCardItem trip = {trip} />
          ))}
        </div>
    </div>
  )
}

export default MyTrips

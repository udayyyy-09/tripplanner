import React from 'react'
import { IoIosSend } from "react-icons/io";
// import { FaMapPin } from "react-icons/fa";
import { Button } from '@/components/ui/button';
function Information({trip}) {
  return (
    
      <div >
        <img src="/bgimage.jpg" alt="tempPhoto" className="h-[340px] w-full object-cover rounded-xl 
                   transition-transform duration-300 hover:scale-105 hover:brightness-55"  />
         <div className = "flex justify-between item-cnter mt-6">
            <div className = "my-5 flex flex-col gap-4">
               <h2 className = "font-bold text-2xl flex items-center gap-4 text-gray-800">  {trip?.userSelection?.destination}</h2>
               <div className = "flex gap-8 mt-2  ">
                  <h2 className = "p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">🗓️{trip?.userSelection?.days} Days</h2>
                  <h2 className = "p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">💸Budget: {trip?.userSelection?.budget} </h2>
                  <h2 className = "p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">🙋‍♂️Travel Companion: {trip?.userSelection?.traveler} </h2>
               </div>
            
            </div> 
               <Button> <IoIosSend /></Button>
            
         </div>                   
        
      </div>
   )
}

export default Information

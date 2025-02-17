import React, { useState,useEffect } from 'react';
import { Input } from "@/components/ui/input";
import BudgetSelection from "@/constants/BudgetSelection";
import TravelCompanion from "@/constants/TravelCompanion";
import Autocomplete from "@/constants/Autocomplete";
import { Button } from '@/components/ui/button';
function CreateTrip() {
  const [value, setValue] = useState(0);
  const [formData,SetformData] = useState([]);
  const handleInputChange = (name,value)=>{
    SetformData({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])

  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 text-center">
      <h2 className="font-bold text-3xl text-center">Tell Us Your Travel Preference🌴🏜️</h2>
      <p className="mt-3 text-gray-700 text-xl text-center">
        Just provide some information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      
      <div className="mt-20 flex flex-col gap-9">
        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-6 font-medium text-center">What is your destination of choice?🏖️</h2>
          <Autocomplete/>
        </div>

        {/* Number of Days Input */}
        <div>
          <h2 className="text-xl my-6 font-medium text-center">How many days is your trip?🍾</h2>
          <Input 
            type = "number"
            placeholder="Ex. 3" 
            className="w-[600px] mx-auto block "
            style = {{borderWidth:"2px"}}
            onChange = {(e)=>handleInputChange('days',e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <BudgetSelection formData = {formData} handleInputChange = {handleInputChange}/>
        {/* Travel Companion */}
        <TravelCompanion/>
        <div
        className = "my-4 flex justify-end">
          <Button>Generate Trip </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;




////                      ADD MUSTVISIT PLACE BUTTON
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import BudgetSelection from "@/constants/BudgetSelection";
import TravelCompanion from "@/constants/TravelCompanion";
import Autocomplete from "@/constants/Autocomplete";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { AIPrompt } from './../constants/option';
import { chatSession } from './../service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  // const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { toast } = useToast();
  const [openDialog,setOpenDialog] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Check days validation when that specific field changes
    if (name === "days") {
      if (value > 5 || value <= 0) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }
  };
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //Logic Of one tap google gmail id
  const login = useGoogleLogin({
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip = async () => {
    // console.log("Form data when generating trip:", formData);
    const user = localStorage.getItem('user');
    if(!user ){
      setOpenDialog(true);
      return ;
    }
    // Check missing fields more carefully - validate each field exists and has a valid value
    const missingFields = [];
    
    if (!formData.destination) {
      missingFields.push("destination");
    }
    
    if (!formData.days || formData.days <= 0 || formData.days > 5) {
      if (!formData.days) {
        missingFields.push("days");
      } else {
        // Days exist but are invalid
        setShowAlert(true);
        return;
      }
    }
    
    if (!formData.traveler) {
      missingFields.push("Travel");
    }
    if (!formData.budget) {
      missingFields.push("budget");
    }
    
    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: `Please fill in the following required fields: ${missingFields.join(" , ")}.`,
      });
      return;
    }
    // if(!user ){
    //   setOpenDialog(true);
    //   return ;
    // }
    // If we get here, all validation passed
    console.log("Generating trip with data:", formData);
    toast({
      title: "Trip generation initiated📍",
      description: "Your personalized trip plan is being created!",
    });
    const FINAL_PROMPT = AIPrompt.replace('{location}',formData?.destination)
    .replace('{totalDays}',formData?.days)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.days);
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 text-center">
      <h2 className="font-bold text-3xl text-center">
        Tell Us Your Travel Preference🌴🏜️
      </h2>
      <p className="mt-3 text-gray-700 text-xl text-center">
        Just provide some information, and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-6 font-medium text-center">
            What is your destination of choice?🏖️
          </h2>
          <Autocomplete handleInputChange={handleInputChange} />
        </div>

        {/* Alert Dialog - No Trigger needed */}
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Invalid Trip Duration</AlertDialogTitle>
              <AlertDialogDescription>
                Please enter a trip duration between 1 and 5 days.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>OK</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Number of Days Input */}
        <div>
          <h2 className="text-xl my-6 font-medium text-center">
            How many days is your trip?🍾
          </h2>
          <Input
            type="number"
            placeholder="Ex. 3"
            className="w-[600px] mx-auto block"
            style={{ borderWidth: "2px" }}
            onChange={(e) => handleInputChange("days", parseInt(e.target.value) || "")}
          />
        </div>

        {/* Budget Selection */}
        <BudgetSelection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        {/* Travel */}
        <TravelCompanion handleInputChange={handleInputChange} />
        <div className="my-4 flex justify-end">
          <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
        
        <Dialog open = {openDialog}>
          
          <DialogContent>
            <DialogHeader>
              <Button className = "absolute right-4 top-2 rounded-sm" onClick = {() => setOpenDialog(false)}>
                  x
              </Button>
              <DialogDescription>
                  <img src="/logo.svg" alt="logo" className = "size-12 mt-0" />
                  
                  <h2 className = "font-bold text-xl text-black flex mt-4">Sign In with Google <FcGoogle className = " p-1 size-9  "/>
                  </h2>
                  <p className = "text-sm text-black">Sign In with Google Authentication</p>
                  <Button className = "w-full items-center mt-5" onClick = {login}>
                    Sign In with Google
                  </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
       
 
      </div>
    </div>
  );
}

export default CreateTrip;
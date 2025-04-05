import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion
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
import { useToast } from "@/hooks/use-toast";
import { AIPrompt } from "./../constants/option";
import { chatSession } from "./../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

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

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Google Login Error:", error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
  
    if (!user) {
      setOpenDialog(true);
      return;
    }
    const missingFields = [];
  if (!formData.destination) {
    missingFields.push("destination");
  }

  if (!formData.days || formData.days <= 0 || formData.days > 5) {
    if (!formData.days) {
      missingFields.push("days");
    } else {
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
      description: `Please fill in the following required fields: ${missingFields.join(", ")}.`,
    });
    return;
  }
    // ✅ Show the loading spinner
    setLoading(true);
  
    try {
      console.log("Generating trip with data:", formData);
  
      // 🔥 Construct the FINAL PROMPT
      const FINAL_PROMPT = AIPrompt.replace("{location}", formData?.destination)
        .replace("{totalDays}", formData?.days)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);
  
      console.log("Final Prompt:", FINAL_PROMPT);
  
      // 🛠️ Call the AI chat session and wait for the response
      const result = await chatSession.sendMessage(FINAL_PROMPT);
  
      const tripData = result?.response?.text?.();
  
      if (tripData) {
        console.log("Trip Generated:", tripData);
  
        // Save the generated trip to Firebase
        await SaveAiTrip(tripData);
  
        toast({
          title: "Trip successfully generated 🎉",
          description: "Your personalized trip plan is ready!",
        });
      } else {
        toast({
          title: "Failed to generate trip",
          description: "No response received. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast({
        title: "Failed to generate trip",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  const SaveAiTrip = async (tripData) => {
    if (!tripData) {
      console.error("No trip data to save");
      return;
    }
    
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("No authenticated user found");
      }
      
      // Generate a unique ID for the trip (don't use the entire user object)
      const docId = Date.now().toString(); // Simple timestamp-based ID
      
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        userId: user?.sub, // Use Google's user ID
        id: docId,
      });
      
      console.log("Trip saved to Firebase!");
      
      // Navigate to the view trip page with the document ID
      navigate(`/view-trip/${docId}`);
      
    } catch (error) {
      console.error("Detailed Firebase Error:", {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };
  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
  
      const data = await response.json();
      console.log("FULL User Profile Data:", {
        email: data.email,
        name: data.name,
        sub: data.sub, // Google's unique user ID
        tokenInfo: tokenInfo
      });
  
      localStorage.setItem("user", JSON.stringify(data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (err) {
      console.error("Detailed Error fetching user profile:", {
        error: err,
        tokenInfo: tokenInfo
      });
    }
  };

  return (
    
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 text-center">
      {/* Motion Effect for Heading */}
      <motion.h2
        className="font-bold text-3xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Tell Us Your Travel Preference
      </motion.h2>

      <p className="mt-3 text-gray-700 text-xl text-center">
        Just provide some information, and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-6 font-medium text-center">
            What is your destination of choice?
          </h2>
          <Autocomplete handleInputChange={handleInputChange} />
        </div>

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

        <div>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800"
            whileHover={{ scale: 1.02 }}
          >
            How many days is your trip?{" "}
            {/* <motion.span
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              🍾
            </motion.span> */}
          </motion.h2>

          <Input
            type="number"
            placeholder="Ex. 3"
            className="w-[600px] mx-auto block"
            style={{ borderWidth: "2px" }}
            onChange={(e) =>
              handleInputChange("days", parseInt(e.target.value) || "")
            }
          />
        </div>

        <BudgetSelection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <TravelCompanion handleInputChange={handleInputChange} />

        <div className="my-4 flex justify-end">
          <Button onClick={onGenerateTrip} disabled={loading}>
            {" "}
            {loading ? (
              <AiOutlineLoading className="w-7 h-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <Button
                className="absolute right-4 top-2 rounded-sm"
                onClick={() => setOpenDialog(false)}
              >
                x
              </Button>
              <DialogDescription>
                <img src="/logo.svg" alt="logo" className="size-12 mt-0" />
                <h2 className="flex items-center justify-center font-bold text-xl text-gray-800">
                  Sign In with Google
                  <FcGoogle className="size-7 ml-2" />
                </h2>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Secure sign-in using your Google account
                </p>
                <Button
                  className="w-full flex items-center justify-center gap-2 mt-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
                  onClick={login}
                >
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

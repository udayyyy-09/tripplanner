import React, { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
// import { Link } from 'react-BrowserRouter';
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
// import { axios } from 'axios';
function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("USER DETAILS: ", user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Google Login Error:", error),
  });

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

    } catch (err) {
      console.error("Detailed Error fetching user profile:", {
        error: err,
        tokenInfo: tokenInfo
      });
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">

      <Link to="/">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-16 h-auto object-contain"
        />
      </Link>
      

      <div>
        {user ? (
          <div className="items-center flex gap-3 bg-white">

            <Link to = {'/create-trip'}>
            <Button variant="outline" className="rounded-full text-black ">
              Create Trip
            </Button>
            </Link>

            <Link to = {'/my-trips'}>
            <Button variant="outline" className="rounded-full text-black ">
              My Trips
            </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="pictu"
                  className="rounded-full h-[25px] w-[25px]" 
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick = {()=>{
                  localStorage.clear();
                  googleLogout();
                  window.location.reload();
                }} className = "cursor-pointer">Logout</h2>
              </PopoverContent>
            </Popover>  
          </div>
        ) : (
          <Button onClick = {()=>setOpenDialog(true)}>Sign In</Button>
          
        )}
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
  );
}
export default Header;

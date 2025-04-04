import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateTrip from './create-trip/index';
import Hero from './components/ui/custom/Hero';
import "leaflet/dist/leaflet.css";
import './App.css';  // Import CSS for styling
import Viewtrip from './view-trip/[tripId]/index';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);  // Preloader duration (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        // Preloader Section
        <div id="preloader" className="fixed inset-0 flex justify-center items-center bg-black z-50">
          <img src="pre-loader.svg" alt="Loading..." className="w-50 h-50 animate-spin" />
        </div>
      ) : (
        <>
          <nav>
            <Link to={'/'}></Link>
          </nav>

          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path = "/view-trip/:tripId" element = {<Viewtrip/>}/>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

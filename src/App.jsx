
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateTrip from './create-trip/index';
import Hero from './components/ui/custom/Hero';
import "leaflet/dist/leaflet.css";
function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation Links */}
      <nav>
        <Link to = {'/'}></Link>
      </nav>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path = "/create-trip" element = {<CreateTrip/>}/>  
      </Routes>

    </div>
  );
}

export default App;

// import { Button } from "@/components/ui/button"
// import './index.css';
// import './App.css';
// import {Routes,Route} from 
// export default function Home() {
//   return (
//     <>
//         ro
//     </>
//   )
// }
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateTrip from './create-trip/index';
import Hero from './components/ui/custom/Hero';

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
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>

    </div>
  );
}

export default App;

import { FaFilePdf } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { GetDestinationPhoto } from './../../../service/Globalapi';
import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

function Information({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/bgimage.jpg");

  useEffect(() => {
    if (trip?.userSelection?.destination) {
      fetchPlacePhoto(trip.userSelection.destination);
    }
  }, [trip]);

  const fetchPlacePhoto = async (destination) => {
    try {
      const photo = await GetDestinationPhoto(destination);
      if (photo) setPhotoUrl(photo);
    } catch (error) {
      console.error("Error fetching destination photo:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set initial position
    let yPos = 20;
  
    // 1. TRIP HEADER
    doc.setFontSize(20);
    doc.text(`Trip to ${trip?.userSelection?.destination || 'Your Destination'}`, 15, yPos);
    yPos += 10;
  
    // 2. TRIP DETAILS TABLE
    autoTable(doc, {
      startY: yPos,
      head: [['Detail', 'Information']],
      body: [
        ['Destination', trip?.userSelection?.destination || 'Not specified'],
        ['Duration', `${trip?.userSelection?.days || 'N/A'} Days`],
        ['Budget', trip?.userSelection?.budget || 'Not specified'],
        ['Travelers', trip?.userSelection?.traveler || 'Not specified'],
      ],
      styles: { cellPadding: 5, fontSize: 12 },
      headStyles: { fillColor: [61, 121, 52], textColor: [255, 255, 255] }
    });
    yPos = doc.lastAutoTable.finalY + 15;
  
    // 3. DAILY ITINERARY
    doc.setFontSize(16);
    doc.text('Daily Itinerary', 15, yPos);
    yPos += 10;
  
    // Get itinerary data - now handling object structure with day1, day2, etc.
    const itinerary = trip?.tripData?.itinerary || {};
    
    // Convert object to array of days
    const days = Object.keys(itinerary)
      .filter(key => key.startsWith('day'))
      .map(key => ({
        dayNumber: parseInt(key.replace('day', '')),
        ...itinerary[key]
      }))
      .sort((a, b) => a.dayNumber - b.dayNumber);
  
    if (days.length === 0) {
      doc.setFontSize(12);
      doc.text('No itinerary data available', 20, yPos);
    } else {
      days.forEach((day, dayIndex) => {
        // Check if we need a new page
        if (dayIndex > 0 && yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
  
        // Day Header
        doc.setFontSize(14);
  const dayLabel = `Day ${day.dayNumber}`;
  const dayTitle = day.dayTitle ? `: ${day.dayTitle}` : '';
  doc.text(`${dayLabel}${dayTitle}`, 15, yPos);
  yPos += 8;
  
        // Get activities - ensure it's always an array
        const activities = Array.isArray(day.activities) ? day.activities : [];
  
        if (activities.length === 0) {
          doc.setFontSize(12);
          doc.text('No activities planned', 20, yPos);
          yPos += 10;
        } else {
          // Create table data
          const activitiesData = activities.map((item) => {
            return [
              item.timeTravel || 'Anytime',
              item.placeName || item.name || 'Activity',
              item.rating || 'Rating'
            ];
          });
  
          autoTable(doc, {
            startY: yPos,
            head: [['Time', 'Activity', 'Rating']],
            body: activitiesData,
            styles: { cellPadding: 4, fontSize: 10 },
            headStyles: { fillColor: [61, 121, 52], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] }
          });
          yPos = doc.lastAutoTable.finalY + 10;
        }
        
        // Add space between days
        yPos += 5;
      });
    }
  
    doc.save(`Trip_to_${trip?.userSelection?.destination || 'MyTrip'}.pdf`);
  };

  return (
    <div>
      <img 
        src={photoUrl} 
        alt="Destination" 
        className="h-[340px] w-full object-cover rounded-xl 
          transition-transform duration-300 hover:scale-105 hover:brightness-55"  
      />
      
      <div className="flex justify-between items-center mt-6">
        <div className="my-5 flex flex-col gap-4">
          <h2 className="font-bold text-2xl flex items-center gap-4 text-gray-800">
            {trip?.userSelection?.destination}
          </h2>
          <div className="flex gap-8 mt-2">
            <h2 className="p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">
              🗓️ {trip?.userSelection?.days} Days
            </h2>
            <h2 className="p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">
              💸 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-2 font-bold bg-gray-200 rounded-full text-gray-500 hover:scale-110 transition-all cursor-pointer">
              🙋‍♂️ Travel Companion: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        
        <Button onClick={generatePDF} className="gap-2">
          <FaFilePdf className="text-red-500" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}

export default Information;
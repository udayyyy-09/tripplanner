import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY // Your Unsplash API Key

// Destination Image
export const GetDestinationPhoto = async (destination) => {
  const url = `https://api.unsplash.com/search/photos?query=${destination}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`;

  try {
    const response = await axios.get(url);
    return response.data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Unsplash API Error (Destination):", error?.response?.data || error.message);
    return null;
  }
};

// 🔥 Hotel Image
export const GetHotelImageFromUnsplash = async (hotelName, hotelAddress = '') => {
  // Extract city from address (helps get more relevant images)
  const city = hotelAddress.split(',')[0]?.trim() || '';
  
  // Build search query - prioritize exterior shots and include location
  const query = `${hotelName} ${city} hotel exterior|facade|building`.toLowerCase();
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=5`;

  try {
    const response = await axios.get(url);
    
    // Find the most relevant image (prioritizing those matching the hotel name)
    const results = response.data.results || [];
    
    // First try to find exact name match
    const exactMatch = results.find(img => 
      img.description?.toLowerCase().includes(hotelName.toLowerCase()) ||
      img.alt_description?.toLowerCase().includes(hotelName.toLowerCase())
    );
    
    // Fallback to first result with people (shows the hotel in use)
    const peopleImage = results.find(img => 
      img.description?.toLowerCase().includes('people') ||
      img.alt_description?.toLowerCase().includes('people')
    );
    
    // Final fallback to first result
    return exactMatch?.urls?.regular || 
           peopleImage?.urls?.regular || 
           results[0]?.urls?.regular || 
           null;
    
  } catch (error) {
    console.error("Unsplash API Error (Hotel):", error?.response?.data || error.message);
    return null;
  }
};

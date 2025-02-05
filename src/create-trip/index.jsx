import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [value, setValue] = useState(null);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 text-center">
      <h2 className="font-bold text-3xl text-center">Tell Us Your Travel Preference</h2>
      <p className="mt-3 text-gray-700 text-xl text-center">
        Just provide some information, and our trip planner will generate a customized itinerary based on your preferences
      </p>
      
      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium text-center">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value,
              onChange: setValue,
              placeholder: 'Search for a destination',
              styles: {
                control: (provided) => ({
                  ...provided,
                  maxWidth: '600px',
                  margin: '0 auto'
                })
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
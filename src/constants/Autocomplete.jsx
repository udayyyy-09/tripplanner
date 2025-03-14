import React, { useState } from "react";

const MapboxAutocomplete = ({handleInputChange}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYXV0aG9yODkwIiwiYSI6ImNtNnh4MWJicTB2ZHkybHF5Z3cweWZ0bzIifQ.YHM191l4N3itemZCxNWuyg";

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelectPlace = (place) => {
    setQuery(place.place_name);
    setSuggestions([]);
    handleInputChange("destination", place.place_name); // Update destination in formData
  };


  return (
    <div>
      <input
        className="w-[600px] mx-auto block"
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        // onChange = {()=>handleInputChange('location',v)}
        placeholder="Search a destination"
        style={{ width: "300px", padding: "8px", fontSize: "16px",background:"white",margion:"0 auto",borderRadius: "calc(var(--radius) - 2px)",borderWidth:"2px",width:"600px"}}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {suggestions.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              setQuery(place.place_name);
              setSuggestions([]);
              handleSelectPlace(place)
            }}
            style={{
              cursor: "pointer",
              padding: "5px",
              background: "white",
              margin: "3px 0",
            }}
          >
            {place.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapboxAutocomplete;

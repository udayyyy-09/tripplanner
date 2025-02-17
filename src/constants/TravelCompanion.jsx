import React, { useState } from "react";

const travelOptions = [
  { label: "✈️ Just Me", value: "solo", description: "A solo traveler in exploration" },
  { label: "🥂 A Couple", value: "couple", description: "Two travelers in tandem" },
  { label: "🏡 Family", value: "family", description: "A group of fun-loving adventurers" },
  { label: "⛵ Friends", value: "friends", description: "A bunch of thrill-seekers" },
];

function TravelCompanion({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null); // Default: Solo traveler

  const handleSelection = (value) => {
    setSelectedOption(value);
    if (onSelect) onSelect(value); // Pass the value to the parent if needed
  };

  return (
    <div className="text-center mt-0">
      <h2 className="text-xl my-7 font-medium">Who do you plan on traveling with on your next adventure?👨‍👨‍👧</h2>
      <div className="flex justify-center gap-7 flex-wrap">
        {travelOptions.map((option) => (
          <button
            key={option.value}
            className={`px-20 py-6 rounded-lg border transition-all ${
              selectedOption === option.value
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-300"
            }`}
            onClick={() => handleSelection(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-600">{travelOptions.find((opt) => opt.value === selectedOption)?.description}</p>
    </div>
  );
}

export default TravelCompanion;

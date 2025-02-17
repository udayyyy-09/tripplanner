import React, { useState, useEffect } from "react";

const budgetOptions = [
  { label: "💵 Cheap", value: "cheap", description: "Stay conscious of costs" },
  { label: "💰 Moderate", value: "moderate", description: "Keep cost on the average side" },
  { label: "💸 Luxury", value: "luxury", description: "Don’t worry about cost" },
];

function BudgetSelection({ formData, handleInputChange }) {
  const [selectedBudget, setSelectedBudget] = useState(formData.budget || "");

  useEffect(() => {
    setSelectedBudget(formData.budget || ""); // Sync state if formData updates
  }, [formData.budget]);

  const handleBudgetChange = (value) => {
    setSelectedBudget(value);
    handleInputChange("budget", value); // Update parent state
  };

  return (
    <div className="text-center mt-6">
      <h2 className="text-xl my-4 font-medium">Select Your Budget Preference 💰</h2>
      <div className="flex justify-center gap-20">
        {budgetOptions.map((option) => (
          <button
            key={option.value}
            className={`px-8 py-4 rounded-lg border transition-all ${
              selectedBudget === option.value
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-300"
            }`}
            onClick={() => handleBudgetChange(option.value)} // Fixed event handling
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-7 text-gray-600">
        {budgetOptions.find((opt) => opt.value === selectedBudget)?.description}
      </p>
    </div>
  );
}

export default BudgetSelection;

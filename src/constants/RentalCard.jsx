import React from "react";

const rentals = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    price: "$45/day",
    image: "/car1.jpg",
    link: "https://www.hertz.com",
  },
  {
    id: 2,
    name: "Jeep Wrangler",
    type: "SUV",
    price: "$75/day",
    image: "/car2.jpg",
    link: "https://www.enterprise.com",
  },
];

function RentalCard({ rental }) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center">
      <img src={rental.image} alt={rental.name} className="w-40 h-24 rounded-lg" />
      <h3 className="font-semibold text-lg mt-2">{rental.name}</h3>
      <p className="text-gray-500">{rental.type}</p>
      <p className="font-semibold">{rental.price}</p>
      <a
        href={rental.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Book Now
      </a>
    </div>
  );
}

function RecommendedRentals() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🚗 Recommended Rentals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedRentals;

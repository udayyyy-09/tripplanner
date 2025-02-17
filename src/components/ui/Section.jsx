import React from "react";
function Section() {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24 rounded-t-3xl mb-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Everything in one space
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Whether it's your own personalized trip or a bookmarked plan, you'll
            find everything organized on a single page for your convenience.
          </p>
        </div>

        {/* Right Side - Trip Cards */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800">Trips</h3>
          <div className="flex space-x-3 mt-4">
            <button className="px-3 py-2 text-sm font-serif bg-gray-200 rounded-lg">
              My Trips
            </button>
            <button className="px-3 py-2 text-sm font-serif bg-gray-200 rounded-lg">
              Collections
            </button>
          </div>
          {/* Placeholder for trip images (Replace with actual screenshots) */}
          <div className="flex justify-center mt-6 ">
            <img src="ss.png" alt="ss" className = "w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;

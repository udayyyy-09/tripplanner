// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import MapComponents from './MapComponents';
const TripPlanner = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side: Trip Details */}
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg overflow-auto">
        {/* Trip Header */}
        <div className="flex items-center space-x-3 border-b pb-3">
          <FaMapMarkerAlt className="text-red-500 text-xl" />
          <h2 className="text-2xl font-bold">3 Days Trip in Shimla, India 🇮🇳</h2>
        </div>

        {/* Trip Info */}
        <p className="text-gray-600 mt-4">
          Explore the scenic beauty of Shimla, enjoy shopping at Mall Road, and experience the toy train ride.
        </p>

        {/* Itinerary Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            Itinerary
          </h3>

          {/* Day 1 */}
          <div className="mt-3 p-8 border rounded-lg shadow-md bg-gray-50 hover:bg-blue-200">
            <h4 className="font-bold text-lg">
                Day 1: Mall Road📍</h4>
            <p className="text-gray-700 text-sm">Explore Mall Road for local shopping and food.</p>
          </div>

          {/* Day 2 */}
          <div className="mt-3 p-8 border rounded-lg shadow-md bg-gray-50 hover:bg-blue-200">
            <h4 className="font-bold text-lg p-1">Day 2: Kufri🧸</h4>
            <p className="text-gray-700 text-sm">Enjoy adventure activities and breathtaking views at Kufri.</p>
          </div>

          <div className="mt-3 p-8 border rounded-lg shadow-md bg-gray-50 hover:bg-blue-200">
            <h4 className="font-bold text-lg">Day 3: Christ Church⛪</h4>
            <p className="text-gray-700 text-sm">This is the heart of Shimla, a wide, pedestrian-friendly promenade offering stunning views of the Shivalik Range and a hub for cultural activities. </p>
          </div>

        </div>
      </div>

      {/* Right Side: Map */}
      <div className="w-2/3 p-8">
        <MapComponents/>
      </div>
    </div>
  );
};

export default TripPlanner;

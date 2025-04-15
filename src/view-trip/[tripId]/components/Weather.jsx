import React from 'react';
import { motion } from 'framer-motion';

function Weather({ weather }) {
  if (!weather) return null;

  // Enhanced weather icon mapping with animations
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    const icons = {
      sunny: { icon: '☀️', color: 'text-yellow-400' },
      rain: { icon: '🌧️', color: 'text-blue-300' },
      cloud: { icon: '☁️', color: 'text-gray-400' },
      partly: { icon: '⛅', color: 'text-blue-200' },
      thunder: { icon: '⛈️', color: 'text-purple-500' },
      storm: { icon: '⛈️', color: 'text-purple-500' },
      snow: { icon: '❄️', color: 'text-blue-100' },
      fog: { icon: '🌫️', color: 'text-gray-300' },
      mist: { icon: '🌫️', color: 'text-gray-300' },
      default: { icon: '🌤️', color: 'text-blue-300' }
    };

    const match = Object.entries(icons).find(([key]) => conditionLower.includes(key));
    return match ? match[1] : icons.default;
  };

  const weatherData = getWeatherIcon(weather.condition);

  // Temperature color coding with more granularity
  const getTempColor = (temp) => {
    if (temp >= 35) return 'text-red-700';
    if (temp >= 30) return 'text-red-600';
    if (temp >= 25) return 'text-orange-600';
    if (temp >= 20) return 'text-orange-500';
    if (temp >= 15) return 'text-yellow-600';
    if (temp >= 10) return 'text-yellow-500';
    if (temp >= 5) return 'text-blue-500';
    return 'text-blue-700';
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="weather-card mb-6 p-6 hover:scale-110 bg-gradient-to-br from-blue-200 to-cyan-50/90 rounded-2xl border border-blue-200/50 shadow-lg backdrop-blur-sm overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100/30"></div>
      <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-cyan-100/30"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Weather icon and condition */}
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ 
                rotate: weatherData.icon === '☀️' ? [0, 10, -10, 0] : 0,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: weatherData.icon === '☀️' ? 5 : 10,
                ease: "easeInOut" 
              }}
              className={`text-5xl ${weatherData.color}`}
            >
              {weatherData.icon}
            </motion.span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Weather Forecast</h3>
              <p className="text-blue-600 font-medium text-lg capitalize">
                {weather.condition}
              </p>
            </div>
          </div>

          {/* Temperature display */}
          <div className="grid grid-cols-2 gap-4 min-w-[180px]">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="temp-high bg-white/90 p-3 rounded-xl text-center shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-1">High</p>
              <p className={`text-2xl font-bold ${getTempColor(weather.highTemp)}`}>
                {weather.highTemp}°C
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="temp-low bg-white/90 p-3 rounded-xl text-center shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-1">Low</p>
              <p className={`text-2xl font-bold ${getTempColor(weather.lowTemp)}`}>
                {weather.lowTemp}°C
              </p>
            </motion.div>
          </div>
        </div>

        {/* Additional weather details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-white/80 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">Feels Like</p>
            <p className="font-medium">{weather.feelsLike || weather.highTemp}°C</p>
          </div>
          <div className="bg-white/80 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="font-medium">{weather.humidity || '--'}%</p>
          </div>
          <div className="bg-white/80 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">Wind</p>
            <p className="font-medium">{weather.windSpeed || '--'} km/h</p>
          </div>
          <div className="bg-white/80 p-2 rounded-lg text-center">
            <p className="text-xs text-gray-500">UV Index</p>
            <p className="font-medium">{weather.uvIndex || '--'}</p>
          </div>
        </div>

        {weather.recommendation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-blue-100/60 rounded-xl border border-blue-200/50"
          >
            <div className="flex items-start gap-2">
              <span className="text-blue-600 text-lg">💡</span>
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Travel Tip:</span> {weather.recommendation}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .weather-card {
          box-shadow: 0 10px 30px -10px rgba(0, 100, 200, 0.1);
        }
        .temp-high, .temp-low {
          min-width: 90px;
        }
      `}</style>
    </motion.div>
  );
}

export default Weather;
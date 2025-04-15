export const AIPrompt =  `Generate a comprehensive travel plan for {location} covering {totalDays} days for {traveler} with a {budget} budget. Provide all data in strict JSON format with the following structure:

{
  "hotels": [{
    "name": "string",
    "address": "string",
    "price": "string",
    "imageUrl": "string",
    "location": {"latitude": number, "longitude": number},
    "rating": number,
    "description": "string"
  }],
  "dailyItinerary": [{
    "dayNumber": number,
    "weather": {
      "condition": "Sunny/Rainy/Cloudy/etc",
      "highTemp": number,
      "lowTemp": number,
      "recommendation": "string"
    },
    "placesToVisit": [{
      "placeName": "string",
      "details": "string",
      "imageUrl": "string",
      "coordinates": {"latitude": number, "longitude": number},
      "ticketPrice": "string",
      "timeSlot": "string",
      "bestTimeToVisit": "string"
    }],
    "placesToEat": [{
      "name": "string",
      "cuisine": "string",
      "priceRange": "string",
      "imageUrl": "string",
      "location": {"latitude": number, "longitude": number},
      "rating": number,
      "suggestedTime": "string",
      "specialty": "string"
    }]
  }]
}

Important Requirements:
1. MUST include daily weather forecasts for each day
2. MUST include at least 2 restaurant recommendations per day
3. All image URLs must be actual working URLs
4. Geo coordinates must be precise for all locations
5. Time slots should account for local opening hours and traffic
6. Budget considerations should be reflected in all recommendations
7. Include practical travel tips based on weather conditions
8. Restaurant suggestions should match nearby attractions' locations`;

// // Usage example:
// const FINAL_PROMPT = AIPrompt
//   .replace('{location}', 'Los Angeles')
//   .replace('{totalDays}', '5')
//   .replace('{traveler}', 'family with children')
//   .replace('{budget}', 'medium');
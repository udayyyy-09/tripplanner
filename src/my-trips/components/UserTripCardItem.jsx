import React, { useEffect, useState } from 'react';
import { GetDestinationPhoto } from './../../service/Globalapi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function UserTripCardItem({ trip }) {
    const [imageUrl, setImageUrl] = useState('/landing.png');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchDestinationImage = async () => {
            try {
                if (trip?.userSelection?.destination) {
                    const photo = await GetDestinationPhoto(trip.userSelection.destination);
                    if (photo) {
                        setImageUrl(photo);
                    }
                }
            } catch (error) {
                console.error("Error fetching destination image:", error);
            }
        };

        fetchDestinationImage();
    }, [trip]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.12)",
            transition: { duration: 0.3 }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div 
            className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={'/view-trip/' + trip?.id} className="block relative group">
                <motion.div className="relative h-52 overflow-hidden" variants={imageVariants}>
                    <img
                        src={imageUrl}
                        alt={trip?.userSelection?.destination || 'Trip destination'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = '/landing.png';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>
                    
                    {trip?.status && (
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                            trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                            trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {trip.status}
                        </div>
                    )}
                    
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <motion.div 
                            className="px-4 py-2 bg-white rounded-full shadow-md flex items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <span className="text-sm font-medium text-gray-800">
                                View Trip Details
                            </span>
                            <svg className="w-4 h-4 ml-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>
            </Link>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {trip?.userSelection?.destination || 'Untitled Trip'}
                    </h2>
                    {trip?.rating && (
                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                            <span className="text-amber-500 mr-1">★</span>
                            <span className="text-sm font-medium">{trip.rating}</span>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center bg-blue-50/80 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        <span className="mr-1.5">🗓️</span>
                        {trip?.userSelection?.days || 'N/A'} days
                    </span>
                    <span className="flex items-center bg-green-50/80 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        <span className="mr-1.5">💰</span>
                        {trip?.userSelection?.budget ? `$${trip.userSelection.budget}` : 'Flexible'}
                    </span>
                    {trip?.travelers && (
                        <span className="flex items-center bg-purple-50/80 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                            <span className="mr-1.5">👥</span>
                            {trip.travelers}
                        </span>
                    )}
                </div>

                {/* Dates section */}
                {(trip?.startDate || trip?.endDate) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'TBD'} 
                            &nbsp;–&nbsp;
                            {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'TBD'}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default UserTripCardItem;

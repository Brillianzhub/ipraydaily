"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Share2 } from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';
import { useRouter } from 'next/navigation';

const GuidedPrayers = () => {
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()

    // Color schemes for prayer cards (cycling through colors)
    const colorSchemes = [
        { borderColor: "border-l-[#0284C7]", bgColor: "bg-white" },
        { borderColor: "border-l-orange-500", bgColor: "bg-white" },
        { borderColor: "border-l-green-500", bgColor: "bg-white" },
        { borderColor: "border-l-purple-500", bgColor: "bg-white" },
        { borderColor: "border-l-red-500", bgColor: "bg-white" },
        { borderColor: "border-l-blue-500", bgColor: "bg-white" },
        { borderColor: "border-l-pink-500", bgColor: "bg-white" },
        { borderColor: "border-l-indigo-500", bgColor: "bg-white" }
    ];

    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                setLoading(true);
                // Replace with your actual API base URL
                const response = await api.get('/prayers/featured/');

                // Add color schemes to each prayer
                const prayersWithColors = response.data.map((prayer, index) => ({
                    ...prayer,
                    ...colorSchemes[index % colorSchemes.length]
                }));

                setPrayers(prayersWithColors);
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch prayers';
                setError(errorMessage);
                console.error('Error fetching prayers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayers();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm tracking-wider text-gray-500 mb-4">Prayers</p>
                        <h1 className="text-4xl font-bold text-[#1E293B] mb-6">
                            Discover Guided Prayers
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our collection of prayers for every situation and season of life.
                        </p>
                    </div>

                    {/* Loading skeleton */}
                    <div className="mb-8 sm:mb-10 lg:mb-12">
                        <div className="lg:hidden overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 sm:gap-6 pb-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-lg p-4 sm:p-6 border-l-4 border-l-gray-300 shadow-sm flex-shrink-0 animate-pulse"
                                        style={{ width: '300px', minWidth: '300px' }}
                                    >
                                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-6"></div>
                                        <div className="h-20 bg-gray-200 rounded mb-6"></div>
                                        <div className="h-16 bg-gray-200 rounded mb-6"></div>
                                        <div className="flex justify-between items-center">
                                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="overflow-x-auto scrollbar-hide">
                                <div className="flex gap-6 pb-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-lg p-8 border-l-4 border-l-gray-300 shadow-sm flex-shrink-0 animate-pulse"
                                            style={{ width: '400px', minWidth: '400px' }}
                                        >
                                            <div className="h-8 bg-gray-200 rounded mb-6"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-6"></div>
                                            <div className="h-24 bg-gray-200 rounded mb-6"></div>
                                            <div className="h-20 bg-gray-200 rounded mb-6"></div>
                                            <div className="flex justify-between items-center">
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="bg-gray-300 text-transparent font-semibold py-3 px-8 rounded-lg text-lg animate-pulse inline-block">
                            Explore All Prayers
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm tracking-wider text-gray-500 mb-4">Prayers</p>
                        <h1 className="text-4xl font-bold text-[#1E293B] mb-6">
                            Discover Guided Prayers
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our collection of prayers for every situation and season of life.
                        </p>
                    </div>

                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <h3 className="text-red-800 font-semibold mb-2">Unable to Load Prayers</h3>
                            <p className="text-red-600 text-sm mb-4">
                                We're having trouble loading the prayers. Please try again later.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-wider text-gray-500 mb-4">Prayers</p>
                    <h1 className="text-4xl font-bold text-[#1E293B] mb-6">
                        Discover Guided Prayers
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our collection of prayers for every situation and season of life.
                    </p>
                </div>

                {/* Scrollable Prayer Cards Container */}
                <div className="mb-8 sm:mb-10 lg:mb-12">
                    {/* Desktop: Single row of scrollable cards */}
                    <div className="hidden lg:block space-y-6">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-6" >
                                {prayers.map((prayer, index) => (
                                    <div
                                        key={prayer.id || index}
                                        className={`${prayer.bgColor} rounded-lg p-8 ${prayer.borderColor} border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0`}
                                        style={{ width: '400px', minWidth: '400px' }}
                                    >
                                        <PrayerCard prayer={prayer} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile & Tablet: Single row of scrollable cards */}
                    <div className="lg:hidden overflow-x-auto scrollbar-hide">
                        <div className="flex gap-4 sm:gap-6 pb-4" style={{ width: 'max-content' }}>
                            {prayers.map((prayer, index) => (
                                <div
                                    key={prayer.id || index}
                                    className={`${prayer.bgColor} rounded-lg p-4 sm:p-6 ${prayer.borderColor} border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex-shrink-0`}
                                    style={{ width: '300px', minWidth: '300px' }}
                                >
                                    <PrayerCard prayer={prayer} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="text-center">
                    <button onClick={() => router.push("/prayers")} className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Explore All Prayers
                    </button>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

// Prayer Card Component for cleaner code
const PrayerCard = ({ prayer }) => (
    <>
        {/* Prayer Header */}
        <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {prayer.prayer_category}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
                {prayer.subtitle}
            </p>
        </div>

        {/* Bible Verse */}
        <div className="mb-4 sm:mb-6">
            <p className="text-gray-700 italic text-base sm:text-lg leading-relaxed">
                {prayer.scripture_text.length > 150
                    ? prayer.scripture_text.slice(0, 150) + "..."
                    : prayer.scripture_text}
            </p>
        </div>

        {/* Prayer Text */}
        <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {prayer.prayer.length > 150
                    ? prayer.prayer.slice(0, 150) + "..."
                    : prayer.prayer}
            </p>
        </div>

        {/* Footer with Reference and Share */}
        <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
                {prayer.prayer_scripture}
            </p>
            {/* <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                <Share2 size={18} className="sm:w-5 sm:h-5" />
            </button> */}
        </div>
    </>
);

export default GuidedPrayers;
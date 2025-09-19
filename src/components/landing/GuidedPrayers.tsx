"use client"
import React from 'react';
import { Share2 } from 'lucide-react';

const GuidedPrayers = () => {
    const prayers = [
        {
            title: "Prayer for Strength",
            subtitle: "Daily Strength",
            verse: "I can do all things through Christ who strengthens me.",
            prayer: "Heavenly Father, when my strength fails and my spirit grows weary, remind me that Your power is made perfect in weakness. Fill me with Your supernatural strength today, that I might face every challenge with confidence, knowing that You are my source of endless power and courage.",
            reference: "Philippians 4:13",
            borderColor: "border-l-[#0284C7]",
            bgColor: "bg-white"
        },
        {
            title: "Prayer for Guidance",
            subtitle: "Wisdom & Direction",
            verse: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
            prayer: "Lord, as I face decisions both big and small, I ask for Your divine guidance. Illuminate the path You have prepared for me. Give me wisdom beyond my own understanding and the courage to follow where You lead.",
            reference: "Proverbs 3:5-6",
            borderColor: "border-l-orange-500",
            bgColor: "bg-white"
        },
        {
            title: "Prayer for Peace",
            subtitle: "Inner Peace",
            verse: "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
            prayer: "Prince of Peace, in the midst of life's storms and uncertainties, I come to You seeking the peace that only You can provide. Calm my anxious heart and quiet my worried mind. Let Your perfect peace fill every corner of my being.",
            reference: "Philippians 4:7",
            borderColor: "border-l-green-500",
            bgColor: "bg-white"
        },
        {
            title: "Prayer for Healing",
            subtitle: "Physical & Emotional Healing",
            verse: "He heals the brokenhearted and binds up their wounds.",
            prayer: "Great Physician, You are the God who heals. Whether the pain is in my body, mind, or spirit, I trust in Your power to restore and renew. Bring healing where there is hurt and wholeness where there is brokenness.",
            reference: "Psalm 147:3",
            borderColor: "border-l-purple-500",
            bgColor: "bg-white"
        },
        {
            title: "Prayer for Gratitude",
            subtitle: "Thanksgiving",
            verse: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
            prayer: "Gracious God, help me to cultivate a heart of gratitude. Open my eyes to see Your blessings in both the ordinary and extraordinary moments of life. Let thanksgiving be the overflow of a heart that recognizes Your goodness.",
            reference: "1 Thessalonians 5:18",
            borderColor: "border-l-red-500",
            bgColor: "bg-white"
        }
    ];

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
                    {/* Desktop: Two rows of scrollable cards */}
                    <div className="hidden lg:block space-y-6">

                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                                {prayers.map((prayer, index) => (
                                    <div
                                        key={index}
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
                                    key={index}
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
                    <button className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
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
                {prayer.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
                {prayer.subtitle}
            </p>
        </div>

        {/* Bible Verse */}
        <div className="mb-4 sm:mb-6">
            <p className="text-gray-700 italic text-base sm:text-lg leading-relaxed">
                &apos;{prayer.verse}&apos;
            </p>
        </div>

        {/* Prayer Text */}
        <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {prayer.prayer}
            </p>
        </div>

        {/* Footer with Reference and Share */}
        <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
                {prayer.reference}
            </p>
            <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                <Share2 size={18} className="sm:w-5 sm:h-5" />
            </button>
        </div>
    </>
);

export default GuidedPrayers;
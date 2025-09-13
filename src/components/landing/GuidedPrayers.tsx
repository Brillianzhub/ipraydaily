import React from 'react';
import { Share2 } from 'lucide-react';
import Link from 'next/link';

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
            reference: "Philippians 4:13",
            borderColor: "border-l-orange-500",
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

                {/* Prayer Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {prayers.map((prayer, index) => (
                        <div
                            key={index}
                            className={`${prayer.bgColor} rounded-lg p-8 ${prayer.borderColor} border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
                        >
                            {/* Prayer Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {prayer.title}
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    {prayer.subtitle}
                                </p>
                            </div>

                            {/* Bible Verse */}
                            <div className="mb-6">
                                <p className="text-gray-700 italic text-lg leading-relaxed">
                                &apos;{prayer.verse}&apos;
                                </p>
                            </div>

                            {/* Prayer Text */}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed">
                                    {prayer.prayer}
                                </p>
                            </div>

                            {/* Footer with Reference and Share */}
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600 font-medium">
                                    {prayer.reference}
                                </p>
                                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Button */}
                <div className="text-center">
                    <Link href="/prayers" className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Explore All Prayers
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GuidedPrayers;
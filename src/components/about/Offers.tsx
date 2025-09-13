import React from 'react';

export default function OfferSection() {
    const features = [
        {
            title: "Daily Prayers & Devotionals",
            description: "To guide you step by step."
        },
        {
            title: "Bible Study Tools",
            description: "To help you reflect and grow in the Word."
        },
        {
            title: "Hymns & Sermons",
            description: "To uplift your spirit and strengthen your faith."
        },
        {
            title: "Reminders & Reflections",
            description: "To help you stay consistent in your journey."
        }
    ];

    return (
        <section className="bg-white py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
                    What We Offer
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <img src="/offer.png" className='object-cover w-full h-full' />

                    {/* Right side - Features List */}
                    <div className="relative">
                        {features.map((feature, index) => (
                            <div key={index} className="relative flex items-start space-x-6 pb-12 last:pb-0">
                                {/* Connecting line - only show for items except the last one */}
                                {index < features.length - 1 && (
                                    <div className="absolute top-6 w-0.5 h-16 bg-gray-300"></div>
                                )}

                                {/* Orange dot */}
                                <div className="relative z-10 flex-shrink-0 w-4 h-4 bg-orange-500 rounded-full mt-1"></div>

                                {/* Feature content */}
                                <div className="flex-1 -mt-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
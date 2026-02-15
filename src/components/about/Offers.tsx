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
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-20">
                    What We Offer
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <img src="/aboutnew.png" className='object-cover w-full h-full' />

                    <div className="relative">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative flex items-start gap-6 pb-12 last:pb-0"
                            >
                                {/* Dot + line column */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    {/* Orange dot */}
                                    <span
                                        aria-hidden="true"
                                        className="w-4 h-4 rounded-full bg-orange-500"
                                    />

                                    {/* Connector (hidden for last item) */}
                                    {index < features.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="mt-2 w-0.5 bg-gray-300"
                                            style={{ height: "3.5rem" }} 
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
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
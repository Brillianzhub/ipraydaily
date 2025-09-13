import React from 'react';

const PrayerHeroSection = () => {
    return (
        <div className="w-full min-h-[400px] relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3FA9E0] via-[#0384C6] to-[#014060]"></div>
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[400px] px-6 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
                        Guided Prayers & Scripture
                    </h1>

                    <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
                        Discover prayers for every situation and season of life, with complete Bible study tools to deepen your understanding.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default PrayerHeroSection;
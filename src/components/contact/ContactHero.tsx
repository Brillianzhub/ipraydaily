import React from 'react';

const ContactHeroSection = () => {
    return (
        <div className="w-full min-h-[300px] sm:min-h-[400px] relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3FA9E0] via-[#0384C6] to-[#014060]"></div>
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-6 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
                        IPray Daily Contact
                    </h1>

                    <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
                        Insights, inspiration, and practical guidance for your spiritual journey.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default ContactHeroSection;
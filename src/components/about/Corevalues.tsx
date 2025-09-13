import React from 'react';
import { Monitor, Users, Target, Heart } from 'lucide-react';

const CoreValuesSection = () => {
    const values = [
        {
            icon: Monitor,
            title: "Faith",
            description: "Christ at the center of everything we do."
        },
        {
            icon: Users,
            title: "Community",
            description: "Building connections through shared devotion."
        },
        {
            icon: Target,
            title: "Excellence",
            description: "Creating tools that are simple, reliable, and meaningful."
        },
        {
            icon: Heart,
            title: "Impact",
            description: "Empowering lives with the transforming truth of God's Word."
        }
    ];

    return (
        <section className="bg-gradient-to-br from-[#014060] via-[#0384C6] to-[#3FA9E0] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-32">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Our Core Values
                    </h2>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {values.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white relative bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                            >
                                {/* Icon Container */}
                                <div className="flex absolute top-[-2rem] right-0 left-0 justify-center mb-6">
                                    <div className="bg-gray-100 rounded-2xl p-4 group-hover:bg-blue-50 transition-colors duration-300">
                                        <IconComponent
                                            size={32}
                                            className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoreValuesSection;
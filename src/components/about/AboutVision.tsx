import React from 'react';

export default function VisionSection() {
    return (
        <section className="bg-[#E9ECEF] py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Overlapping Images */}
                    <div className="relative">
                        {/* Top image - Hands praying over Bible */}
                        <div className="relative z-10 w-4/5 aspect-[4/3] rounded-3xl overflow-hidden">
                            <img
                                src="/vision.png"
                                alt="Hands praying over an open Bible"
                                className="w-full h-full object-cover"

                            />
                        </div>
                    </div>
                    {/* Right side - Text content */}
                    <div className="space-y-12">
                        {/* Our Vision */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                                Our Vision
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our vision is to see a global community of believers equipped,
                                encouraged, and empowered through technology to walk closely with
                                God, one day at a time.
                            </p>
                        </div>

                        {/* Our Mission */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our mission is simple: to make prayer and the Word of God accessible to
                                every believer, every day. Through guided prayers, devotionals, hymns,
                                and Bible study tools, we aim to inspire lives that are rooted in faith and
                                lived with purpose.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
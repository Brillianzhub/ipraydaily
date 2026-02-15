import React from 'react';

export default function OurStorySection() {
    return (
        <section className="bg-gray-50 py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    {/* Left side - Text content */}
                    <div className="space-y-6">
                        <div>

                            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                Our Story
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            iPray Daily was born out of a personal burden—to help Christians overcome the struggles of inconsistency in prayer and Bible study.
                            In a world full of distractions, we wanted to create a simple, practical tool that keeps believers connected to God’s presence, no matter where they are.
                        </p>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative">
                        <div className=" rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/ourstory.png"
                                alt="Hands joined in prayer"
                                className="w-full h-full object-cover"

                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
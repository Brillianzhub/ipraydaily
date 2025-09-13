import React from 'react';

export default function AboutUsSection() {
    return (
        <section className="bg-gray-50 py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold tracking-wider text-gray-600 mb-2">
                                About Us
                            </p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Who We Are
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            iPray Daily is a Christian prayer and devotional app created by<br></br>
                            Brillianzhub. We exist to help believers grow a consistent prayer life,
                            deepen their knowledge of God's Word, and strengthen their daily walk
                            with Christ.
                        </p>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative">
                        <div className=" rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/about.png"
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
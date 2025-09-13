import React from 'react';

const PrayerTransform = () => {
    return (
        <section className="bg-gradient-to-br from-[#0272AC] to-[#1698DB] py-20 mb-52 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    Transform Your Prayer Life
                </h1>

                {/* Subheading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-8">
                    Starting Today
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of believers who have discovered the power of consistent,
                    scripture-based prayer. Your spiritual breakthrough is just one download away.
                </p>

                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get it on Google Play"
                        className="shrink-0"
                    >
                        <img
                            src="/playstore.svg"
                            alt="Get it on Google Play"
                            className="h-12 w-auto transition-transform hover:scale-105 drop-shadow-sm"
                            loading="lazy"
                        />
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download on the App Store"
                        className="shrink-0"
                    >
                        <img
                            src="/appstore.svg"
                            alt="Download on the App Store"
                            className="h-12 w-auto transition-transform hover:scale-105 drop-shadow-sm"
                            loading="lazy"
                        />
                    </a>
                </div>

                {/* Optional: Additional call-to-action */}
                <div className="mt-8">
                    <p className="text-sm text-white/80">
                        Free download • Available on iOS and Android
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrayerTransform;
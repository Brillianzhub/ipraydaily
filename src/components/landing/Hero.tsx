import React from 'react';

const HeroSection = () => {
    return (
        <section
            className="flex items-center py-16 sm:py-0 bg-gradient-to-r from-[#f4fbff] via-[#E0F2FE66] to-[#DBEAFE] px-6 relative overflow-hidden"
        >

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-normal">
                            <span className="text-orange-500 font-bold ">IPRAY</span>{' '}
                            <span className="text-gray-800 font-bold ">DAILY YOUR</span>
                            <br />
                            <span className="text-gray-800 font-bold ">COMPANION</span>
                            <br />
                            <span className="text-orange-500 font-normal italic">WORSHIP TOOLKIT</span>
                        </h1>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                        Transform your spiritual journey with guided daily prayers, scripture-based confessions, and powerful tools for prayer, meditation, and Bible study. Join thousands growing closer to God every day.
                    </p>

                    <div className="flex flex-row justify-center sm:justify-start items-center gap-2 sm:gap-4">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.brillianzhub.ipray"
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
                            href="https://apps.apple.com/app/ipray-daily/id6746961354"
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
                </div>

                {/* Right Content - Phone Mockups */}
                <div className="relative justify-center hidden sm:flex items-center">
                    <img src="/heroimage.png" alt="hero" className='object-cover sm:w-[800px] sm:h-[700px]' />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
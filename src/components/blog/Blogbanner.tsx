"use client"
import React, { useState } from 'react';

const Blogbanner = () => {

    return (
        <div className="w-full py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-[#1D6FAB] via-[#0384C6] to-[#FFA500] rounded-none p-6 sm:p-8 lg:p-12 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                        {/* Left side - Text */}
                        <div className="flex-1 max-w-lg text-center lg:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-4">
                                Download ipray Daily
                            </h2>
                        </div>

                        {/* Right side - Email form */}
                        <div className="flex-1 max-w-md w-full">
                            <div className="flex flex-row justify-center items-center gap-3 sm:gap-4">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogbanner;
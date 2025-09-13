"use client"
import React, { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <div className="w-full py-8 sm:py-12 lg:py-16 px-4 absolute left-0 right-0 top-[-8rem] sm:top-[-10rem] lg:top-[-12rem]">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-200 via-green-200 to-yellow-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                        {/* Left side - Text */}
                        <div className="flex-1 max-w-lg text-center lg:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mb-4">
                                Join our newsletter to keep up to date with us!
                            </h2>
                        </div>

                        {/* Right side - Email form */}
                        <div className="flex-1 max-w-md w-full">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl sm:rounded-2xl p-2 border border-white/20 gap-2 sm:gap-0">
                                <div className="flex items-center flex-1 px-3 sm:px-4">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-600 outline-none text-base sm:text-lg py-2 sm:py-3 min-w-0"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                                    />
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    className="bg-[#0284C7] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </div>

                            {isSubscribed && (
                                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg sm:rounded-xl">
                                    <p className="text-green-800 font-medium flex items-center text-sm sm:text-base">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Successfully subscribed! Welcome aboard!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
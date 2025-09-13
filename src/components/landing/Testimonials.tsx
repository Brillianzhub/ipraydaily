"use client"
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const testimonials = [
        {
            id: 1,
            quote: "This app has completely transformed my prayer life. The guided prayers and daily devotionals have helped me maintain consistency in my spiritual walk even during the busiest seasons.",
            name: "Sarah J.",
            location: "Texas, USA"
        },
        {
            id: 2,
            quote: "IPray Daily has completely transformed my prayer life. The daily confessions are so powerful and biblically grounded. I wake up excited to see what prayer God has for me each day!",
            name: "Grace Adebayo",
            location: "Lagos, Nigeria"
        },
        {
            id: 3,
            quote: "The depth of biblical content in this app is incredible. Each prayer is carefully crafted and rooted in Scripture, helping me grow closer to God every day.",
            name: "Michael R.",
            location: "California, USA"
        },
        {
            id: 4,
            quote: "The depth of biblical content in this app is incredible. Each prayer is carefully crafted and rooted in Scripture, helping me grow closer to God every day.",
            name: "Sarah K.",
            location: "California, USA"
        }
    ];

    // Calculate total number of slides (pairs of testimonials)
    const totalSlides = Math.ceil(testimonials.length / 2);

    // Auto-slide effect (right to left)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % totalSlides);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [totalSlides]);

    const handleDotClick = (index) => {
        setActiveSlide(index);
    };

    return (
        <div className="min-h-screen bg-white pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Testimonials</p>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Lives transformed through prayer
                    </h1>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Hear from believers around the world who are experiencing God&apos;s power through IPray
                        Daily&apos;s guided prayers and Bible study tools.
                    </p>
                </div>

                {/* Testimonials Container */}
                <div className="relative overflow-hidden">
                    {/* Testimonial Slider */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                        {/* Create slides with pairs of testimonials */}
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                            <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* First testimonial in pair */}
                                    {testimonials[slideIndex * 2] && (
                                        <div className="relative bg-gray-50 rounded-2xl p-8">
                                            {/* Quote Icon */}
                                            <div className="absolute top-6 left-6 text-6xl text-blue-200 font-serif leading-none">
                                            &apos;
                                            </div>

                                            {/* Stars */}
                                            <div className="flex justify-center mb-6 mt-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                                                ))}
                                            </div>

                                            {/* Testimonial Text */}
                                            <p className="text-gray-800 text-lg leading-relaxed mb-8 relative z-10">
                                                {testimonials[slideIndex * 2].quote}
                                            </p>

                                            {/* Author */}
                                            <div>
                                                <p className="text-gray-800 font-semibold text-lg">
                                                    {testimonials[slideIndex * 2].name}
                                                </p>
                                                <p className="text-gray-500">
                                                    {testimonials[slideIndex * 2].location}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Second testimonial in pair */}
                                    {testimonials[slideIndex * 2 + 1] && (
                                        <div className="relative bg-gray-50 rounded-2xl p-8">
                                            {/* Quote Icon */}
                                            <div className="absolute top-6 left-6 text-6xl text-blue-200 font-serif leading-none">
                                            &apos;
                                            </div>

                                            {/* Stars */}
                                            <div className="flex justify-center mb-6 mt-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                                                ))}
                                            </div>

                                            {/* Testimonial Text */}
                                            <p className="text-gray-800 text-lg leading-relaxed mb-8 relative z-10">
                                                {testimonials[slideIndex * 2 + 1].quote}
                                            </p>

                                            {/* Author */}
                                            <div>
                                                <p className="text-gray-800 font-semibold text-lg">
                                                    {testimonials[slideIndex * 2 + 1].name}
                                                </p>
                                                <p className="text-gray-500">
                                                    {testimonials[slideIndex * 2 + 1].location}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center space-x-3 mt-12">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-110 ${activeSlide === index
                                    ? 'bg-[#0284C7] shadow-lg'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
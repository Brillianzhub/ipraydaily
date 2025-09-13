"use client"
import React, { useState } from 'react';
import { User, Calendar, Download, Smartphone } from 'lucide-react';

const MorningPrayerBlogPost = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23ff7f50;stop-opacity:1" /><stop offset="50%" style="stop-color:%23ffa07a;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ddd;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23sky)"/></svg>')`
                }}
            >
                <div className="text-center text-white">
                    <div className="inline-block bg-black bg-opacity-50 px-4 py-1 rounded-full text-sm mb-4">
                        PRAYER GUIDES
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        The Power of Morning Prayer
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>Michael Roberts</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>August 10, 2025</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Quote */}
                <div className="text-center italic text-gray-600 mb-8 text-lg">
                    "In the morning, Lord, You hear my voice; in the morning I lay my requests before You and wait expectantly." — Psalm 5:3
                </div>

                {/* Introduction */}
                <div className="mb-8 text-gray-700 leading-relaxed">
                    Mornings set the tone for the entire day. When you start your morning with intentional prayer, you invite peace, clarity, and God's guidance into every decision and interaction. Morning prayer isn't just a routine—it's a spiritual reset that aligns your heart with God's will before the world's distractions begin.
                </div>

                {/* Why Morning Prayer Matters */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Morning Prayer Matters</h2>
                    <p className="text-gray-700 mb-4">The early hours are often the quietest moments of our day. Beginning with prayer allows us to:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Center our thoughts on God rather than stress or tasks.</li>
                        <li>Build consistency in our spiritual growth.</li>
                        <li>Gain strength to face challenges with faith and confidence.</li>
                    </ul>
                </section>

                {/* App Download Section */}
                <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-yellow-500 rounded-xl p-6 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Download IPray Daily</h3>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
                                <Download size={16} />
                                <span>App Store</span>
                            </div>
                            <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
                                <Smartphone size={16} />
                                <span>Google Play</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits of Starting with Prayer */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Starting with Prayer</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li><strong>Peace of mind:</strong> A calm spirit to face the day.</li>
                        <li><strong>Clarity:</strong> Direction for important decisions.</li>
                        <li><strong>Strength:</strong> Courage to handle unexpected challenges.</li>
                        <li><strong>Gratitude:</strong> A thankful heart that shifts focus from problems to blessings.</li>
                    </ul>
                </section>

                {/* How to Build a Morning Prayer Habit */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Build a Morning Prayer Habit</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li><strong>Set a consistent time:</strong> Right after waking or before breakfast.</li>
                        <li><strong>Keep it simple:</strong> Start with a short prayer and Scripture meditation.</li>
                        <li><strong>Use reminders:</strong> App notifications, sticky notes, or a journal.</li>
                        <li><strong>Stay flexible:</strong> Even 5 minutes with God is powerful if done sincerely.</li>
                    </ul>
                </section>

                {/* Sample Morning Prayer */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sample Morning Prayer</h2>
                    <div className="border-l-4 border-orange-400 pl-6 py-4 bg-orange-50 text-gray-700 italic">
                        "Heavenly Father, thank You for the gift of a new day. Guide my thoughts, my words, and my actions. Give me wisdom to make the right choices, strength to overcome challenges, and peace to carry through the day. May everything I do bring glory to You. In Jesus' name, Amen."
                    </div>
                </section>

                {/* Final Reflection */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Final Reflection</h2>
                    <p className="text-gray-700">
                        Morning prayer is more than a ritual—it's a way to walk in step with God daily. As you make it a habit, you'll notice more peace, clarity, and spiritual growth in your life.
                    </p>
                </section>

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">0 comments</h3>

                    <div className="mt-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Leave a Comment</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Your email address will not be published. Required fields are marked *
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name*"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email Address*"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="Website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500 resize-vertical"
                            ></textarea>

                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MorningPrayerBlogPost;
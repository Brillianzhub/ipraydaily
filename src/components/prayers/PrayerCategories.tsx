"use client"
import React, { useState } from 'react';
import { Search, Filter, Share2 } from 'lucide-react';

const PrayerCategoriesSection = () => {
    const [activeCategory, setActiveCategory] = useState('All Prayers');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'All Prayers',
        'Daily Strength',
        'Wisdom & Directions',
        'Healing & Comfort',
        'Family & Relationships',
        'Spiritual Growth'
    ];

    const prayers = [
        {
            id: 1,
            title: 'Prayer for Strength',
            category: 'Daily Strength',
            verse: 'Philippians 4:13',
            quote: '"I can do all things through Christ who strengthens me."',
            prayer: 'Heavenly Father, when my strength fails and my spirit grows weary, remind me that Your power is made perfect in weakness. Fill me with Your supernatural strength today, that I might face every challenge with confidence, knowing that You are my source of endless power and courage.',
            borderColor: 'border-l-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            id: 2,
            title: 'Prayer for Guidance',
            category: 'Wisdom & Directions',
            verse: 'Proverbs 3:5-6',
            quote: '"Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."',
            prayer: 'Lord, as I face decisions both big and small, I ask for Your divine guidance. Illuminate the path You have prepared for me. Give me wisdom beyond my own understanding and the courage to follow where You lead.',
            borderColor: 'border-l-orange-500',
            bgColor: 'bg-orange-50'
        },
        {
            id: 3,
            title: 'Prayer for Healing',
            category: 'Healing & Comfort',
            verse: 'Psalm 147:3',
            quote: '"He heals the brokenhearted and binds up their wounds."',
            prayer: 'Compassionate God, I come before You seeking Your healing touch. Whether my pain is physical, emotional, or spiritual, I trust in Your power to restore and renew. Just as You walked among us healing the sick and comforting the afflicted, I ask for Your healing presence in my life today.',
            borderColor: 'border-l-yellow-500',
            bgColor: 'bg-yellow-50'
        },
        {
            id: 4,
            title: 'Prayer for Family Unity',
            category: 'Family & Relationships',
            verse: 'Psalm 133:1',
            quote: '"How good and pleasant it is when God\'s people live together in unity!"',
            prayer: 'Heavenly Father, I lift up my family to You today. Where there is division, bring reconciliation. Where there is misunderstanding, bring clarity. Bind us together with cords of love that cannot be broken, and help us to bear with one another in patience and grace.',
            borderColor: 'border-l-blue-500',
            bgColor: 'bg-blue-50'
        }
    ];

    const filteredPrayers = activeCategory === 'All Prayers'
        ? prayers
        : prayers.filter(prayer => prayer.category === activeCategory);

    const searchedPrayers = filteredPrayers.filter(prayer =>
        prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prayer.prayer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full bg-gray-50 pt-16 pb-52 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Prayer Categories</h2>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeCategory === category
                                    ? 'bg-[#0284C7] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search Prayers....."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
                            <Filter className="w-5 h-5" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Prayer Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {searchedPrayers.map((prayer) => (
                        <div key={prayer.id} className={`${prayer.bgColor} rounded-xl p-8 border-l-4 ${prayer.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}>
                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{prayer.title}</h3>
                                <span className="inline-block px-3 py-1 bg-white/60 text-gray-700 rounded-full text-sm font-medium">
                                    {prayer.category}
                                </span>
                            </div>

                            {/* Scripture Quote */}
                            <div className="mb-6">
                                <p className="text-gray-700 italic text-lg leading-relaxed mb-2">
                                    {prayer.quote}
                                </p>
                            </div>

                            {/* Prayer Text */}
                            <div className="mb-6">
                                <p className="text-gray-800 leading-relaxed">
                                    {prayer.prayer}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#02355B] font-semibold">{prayer.verse}</span>
                                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results message */}
                {searchedPrayers.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No prayers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrayerCategoriesSection;
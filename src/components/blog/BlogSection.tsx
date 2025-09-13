"use client"
import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

export default function PrayerBlogSection() {
    const [activeCategory, setActiveCategory] = useState('All Post');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        'All Post',
        'Prayer Guides',
        'Devotional',
        'Scripture Study',
        'Testimonies',
        'App Updates'
    ];

    const articles = [
        {
            id: 1,
            category: 'PRAYER GUIDES',
            title: 'The Power of Morning Prayer',
            description: 'Starting your day with intentional prayer can transform your perspective and prepare your heart for whatever lies ahead.',
            author: 'Michael Roberts',
            date: 'August 10, 2025',
            image: '/blog.png',
            categoryColor: 'bg-blue-100'
        },
        {
            id: 2,
            category: 'SCRIPTURE STUDY',
            title: 'Understanding the Psalms: A Guide to Ancient..',
            description: 'The book of Psalms contains some of the most beautiful and honest prayers in scripture. Learn how to apply these ancient words to your..',
            author: 'Dr. Rebecca Chen',
            date: 'August 5, 2025',
            image: '/blog.png',
            categoryColor: 'bg-orange-100'
        },
        {
            id: 3,
            category: 'DEVOTIONALS',
            title: 'Finding Peace in Chaos: A 7-Day Devotional',
            description: 'When life feels overwhelming, scripture offers a foundation of peace. This week-long devotional will help you anchor your heart in God\'s',
            author: 'Sarah Johnson',
            date: 'July 28, 2025',
            image: '/blog.png',
            categoryColor: 'bg-yellow-100'
        },
        {
            id: 4,
            category: 'TESTIMONIES',
            title: 'My Journey Through Grief: How Prayer Sustained',
            description: 'After losing my spouse, I found comfort and strength through consistent prayer. This is my story of how God\'s presence carried me',
            author: 'James Wilson',
            date: 'July 20, 2025',
            image: '/blog.png',
            categoryColor: 'bg-green-100'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-sm mb-12 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2">
                        <img
                            src="/blog.png"
                            alt="Woman praying in contemplative pose"
                            className="w-full h-64 lg:h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 space-y-6">
                        {/* Featured Badge */}
                        <div className="inline-block">
                            <span className="bg-yellow-400 text-black font-semibold px-3 py-1 text-xs uppercase tracking-wide rounded">
                                FEATURED
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            5 Ways to Deepen Your Prayer Life
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                            Discover practical strategies to transform your prayer life from
                            routine to relationship. Learn how to create sacred space, practice
                            presence, and embrace the power of contemplative prayer.
                        </p>

                        {/* Author and Date */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-600 font-medium text-xs">SJ</span>
                                </div>
                                <span className="font-medium text-gray-700">Sarah Johnson</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>August 15, 2025</span>
                            </div>
                        </div>

                        {/* Read Article Button */}
                        <button className="w-full bg-[#0284C7] text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                            Read Article
                        </button>
                    </div>
                </div>
            </div>

            {/* Prayer Categories Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Prayer Categories</h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${activeCategory === category
                                ? 'bg-[#0284C7] text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Prayers....."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        {/* Article Image */}
                        <div className="relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-80 object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="p-6 space-y-4">
                            {/* Category Badge */}
                            <div className="inline-block">
                                <span className={`${article.categoryColor} text-gray-700 font-medium px-3 py-1 text-xs uppercase tracking-wide rounded`}>
                                    {article.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                                {article.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {article.description}
                            </p>

                            {/* Author and Date */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 font-medium text-xs">
                                            {article.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <span className="font-medium text-gray-700">{article.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-gray-400" />
                                    <span>{article.date}</span>
                                </div>
                            </div>

                            {/* Read Article Button */}
                            <button className="w-full bg-[#0284C7] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 text-sm">
                                Read Article
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
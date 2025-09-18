"use client"
import React, { useState } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useFetchBlogs } from '@/services/requests/blogs';

export default function PrayerBlogSection() {
    const [activeCategory, setActiveCategory] = useState('All Post');
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useFetchBlogs();
    const items = data?.results ?? [];
    const total = data?.count ?? 0;
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        'All Post',
        'Prayer Guides',
        'Devotional',
        'Scripture Study',
        'Testimonies',
        'App Updates',
        'Sermon'
    ];

    // Get featured article (first featured blog or first blog)
    const featuredArticle = items?.find(blog => blog.featured) || items?.[0];

    // Filter articles based on active category and search term
    const filteredArticles = items?.filter(article => {
        const matchesCategory = activeCategory === 'All Post' ||
            article.category.toLowerCase().includes(activeCategory.toLowerCase().replace(' guides', '').replace(' study', '')) ||
            activeCategory.toLowerCase().includes(article.category.toLowerCase());

        const matchesSearch = searchTerm === '' ||
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    }) || [];

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Function to get category color
    const getCategoryColor = (category) => {
        const colors = {
            'prayer guides': 'bg-blue-100',
            'prayer': 'bg-blue-100',
            'scripture study': 'bg-orange-100',
            'scripture': 'bg-orange-100',
            'devotional': 'bg-yellow-100',
            'testimonies': 'bg-green-100',
            'testimony': 'bg-green-100',
            'app updates': 'bg-purple-100',
            'updates': 'bg-purple-100',
            'sermon': 'bg-red-100'
        };
        return colors[category.toLowerCase()] || 'bg-gray-100';
    };

    // Function to get author initials
    const getAuthorInitials = (authorString) => {
        // Extract name from "Name (email)" format
        const nameMatch = authorString.match(/^([^(]+)/);
        const name = nameMatch ? nameMatch[1].trim() : authorString;
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Function to get author name
    const getAuthorName = (authorString) => {
        const nameMatch = authorString.match(/^([^(]+)/);
        return nameMatch ? nameMatch[1].trim() : authorString;
    };

    // Function to handle load more
    const handleLoadMore = () => {
        setCurrentPage(prev => prev + 1);
    };

    // Function to reset pagination when category or search changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    if (isLoading && currentPage === 1) {
        return (
            <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-gray-600">Loading blogs...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Featured Article */}
            {featuredArticle && (
                <div className="bg-white rounded-xl shadow-sm mb-12 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="lg:w-1/2">
                            <img
                                src={featuredArticle.image || '/story.png'}
                                alt={featuredArticle.title}
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
                                {featuredArticle.title}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {featuredArticle.description.length > 200
                                    ? `${featuredArticle.description.substring(0, 200)}...`
                                    : featuredArticle.description
                                }
                            </p>

                            {/* Author, Date, and Read Time */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 ">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 font-medium text-xs">
                                            {getAuthorInitials(featuredArticle.author)}
                                        </span>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        {getAuthorName(featuredArticle.author)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{formatDate(featuredArticle.publish)}</span>
                                </div>
                                {featuredArticle.read_time && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{featuredArticle.read_time} min read</span>
                                    </div>
                                )}
                            </div>

                            {/* Read Article Button */}
                            <div className='mt-6'>
                            <Link href={`/blog/${featuredArticle.slug}`}>
                                <button className="w-full bg-[#0284C7] text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                                    Read Article
                                </button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Prayer Categories Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog Categories</h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
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
                        placeholder="Search Blogs....."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                            {/* Article Image */}
                            <div className="relative">
                                <img
                                    src={article.image || '/blog.png'}
                                    alt={article.title}
                                    className="w-full h-80 object-cover"
                                />
                                {/* Featured badge for featured articles in the grid */}
                                {article.featured && (
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-yellow-400 text-black font-semibold px-2 py-1 text-xs uppercase tracking-wide rounded">
                                            FEATURED
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Article Content */}
                            <div className="p-6 space-y-4">
                                {/* Category Badge */}
                                <div className="inline-block">
                                    <span className={`${getCategoryColor(article.category)} text-gray-700 font-medium px-3 py-1 text-xs uppercase tracking-wide rounded`}>
                                        {article.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                                    {article.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {article.description.length > 120
                                        ? `${article.description.substring(0, 120)}...`
                                        : article.description
                                    }
                                </p>

                                {/* Author, Date, and Read Time */}
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 font-medium text-xs">
                                                {getAuthorInitials(article.author)}
                                            </span>
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            {getAuthorName(article.author)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-gray-400" />
                                        <span>{formatDate(article.publish)}</span>
                                    </div>
                                    {article.read_time && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <span>{article.read_time}m</span>
                                        </div>
                                    )}
                                </div>
                                <div className='mt-16'>
                                    <Link href={`/blog/${article.slug}`}>
                                        <button className="w-full bg-[#0284C7] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 text-sm">
                                            Read Article
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchTerm ? `No blogs found for "${searchTerm}"` : 'No blogs found in this category'}
                        </p>
                        {(searchTerm || activeCategory !== 'All Post') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveCategory('All Post');
                                    setCurrentPage(1);
                                }}
                                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear filters and show all blogs
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Load More Button with Loading State */}
            {data?.next && (
                <div className="text-center mt-12">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="bg-[#0284C7] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'Load More Articles'}
                    </button>
                </div>
            )}

            {/* Pagination Info */}
            {total > 0 && (
                <div className="text-center mt-8 text-gray-500 text-sm">
                    Showing {filteredArticles.length} of {total} articles
                </div>
            )}
        </div>
    );
}
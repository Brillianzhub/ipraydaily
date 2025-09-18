"use client"
import React, { useState, useMemo } from 'react';
import { Search, Filter, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFetchPrayers } from '@/services/requests/prayers';
import { SharePrayerDialog } from './SharePrayerDialog';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
        if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push('ellipsis');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1);
            pages.push('ellipsis');
            for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('ellipsis');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
            pages.push('ellipsis');
            pages.push(totalPages);
        }
    } else {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    }

    // Mobile-specific logic - show fewer pages on small screens
    const getMobilePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const mobilePages = [];
        if (currentPage === 1) {
            mobilePages.push(1, 2, 3);
        } else if (currentPage === totalPages) {
            mobilePages.push(totalPages - 2, totalPages - 1, totalPages);
        } else {
            mobilePages.push(currentPage - 1, currentPage, currentPage + 1);
        }

        return mobilePages.filter(page => page >= 1 && page <= totalPages);
    };

    const mobilePages = getMobilePages();

    return (
        <>
            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center justify-center space-x-2 mt-8">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </button>

                {pages.map((page, index) => (
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm font-medium text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === page
                                ? 'bg-[#0284C7] text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Mobile Pagination */}
            <div className="flex sm:hidden items-center justify-between mt-6 px-4">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] justify-center"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Prev
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {mobilePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                ? 'bg-[#0284C7] text-white'
                                : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] justify-center"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Mobile Page Info */}
            <div className="flex sm:hidden justify-center mt-3">
                <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            {/* Mobile Jump to Page (for large page counts) */}
            {totalPages > 10 && (
                <div className="flex sm:hidden justify-center mt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Go to:</span>
                        <select
                            value={currentPage}
                            onChange={(e) => onPageChange(parseInt(e.target.value))}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent"
                        >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <option key={page} value={page}>
                                    Page {page}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </>
    );
};

const PrayerCategoriesSection = () => {
    const [activeCategory, setActiveCategory] = useState('All Prayers');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [selectedPrayer, setSelectedPrayer] = useState(null);
    const itemsPerPage = 6;
    const { data, isLoading, isError, refetch} = useFetchPrayers();

    // Category mapping for better display names
    const categoryDisplayNames = {
        'advancement': 'Advancement',
        'healing': 'Healing & Comfort',
        'dominion': 'Dominion & Authority',
        'deliverance': 'Deliverance & Freedom',
        'provision': 'Provision & Blessing',
        'peace': 'Peace & Rest',
        'faith': 'Faith & Trust',
        'wisdom': 'Wisdom & Direction',
        'protection': 'Protection & Safety',
        'favor': 'Divine Favor',
        'strength': 'Strength & Power',
        'joy': 'Joy & Celebration',
        'guidance': 'Guidance & Direction',
        'courage': 'Courage & Boldness',
        'spiritual growth': 'Spiritual Growth',
        'anointing': 'Anointing & Ministry',
        'victory': 'Victory & Triumph',
        'righteousness': 'Righteousness & Holiness',
        'restoration': 'Restoration & Renewal',
        'purpose': 'Purpose & Destiny',
        'promotion': 'Promotion & Elevation',
        'blessing': 'Blessing & Abundance',
        'breakthrough': 'Breakthrough & Liberation',
        'emotional healing': 'Emotional Healing',
        'fulfillment': 'Fulfillment & Completion',
        'salvation': 'Salvation & Redemption',
        'soul winning': 'Soul Winning',
        'transformation': 'Transformation & Change',
        'churches': 'Church & Ministry',
        'nations': 'Nations & Revival',
        'revival': 'Revival & Awakening',
        'love': 'Love & Relationships',
        'gratitude': 'Gratitude & Thanksgiving',
        'family': 'Family & Relationships',
        'thanksgiving': 'Thanksgiving & Praise',
        'marriage': 'Marriage & Unity',
        'trials': 'Trials & Challenges',
        'speed': 'Divine Speed',
        'increase': 'Increase & Growth',
        'power': 'Power & Authority',
        'glory': 'Glory & Honor',
        'prophecy fulfilment': 'Prophecy & Fulfillment',
        'spiritual warfare': 'Spiritual Warfare',
        'surrender': 'Surrender & Commitment',
        'concecretion': 'Consecration & Dedication',
        'uncategorized': 'General Prayers'
    };

    // Color scheme for different categories
    const categoryColors = {
        'advancement': { border: 'border-l-blue-500', bg: 'bg-blue-50' },
        'healing': { border: 'border-l-green-500', bg: 'bg-green-50' },
        'dominion': { border: 'border-l-purple-500', bg: 'bg-purple-50' },
        'deliverance': { border: 'border-l-red-500', bg: 'bg-red-50' },
        'provision': { border: 'border-l-yellow-500', bg: 'bg-yellow-50' },
        'peace': { border: 'border-l-cyan-500', bg: 'bg-cyan-50' },
        'faith': { border: 'border-l-indigo-500', bg: 'bg-indigo-50' },
        'wisdom': { border: 'border-l-orange-500', bg: 'bg-orange-50' },
        'protection': { border: 'border-l-emerald-500', bg: 'bg-emerald-50' },
        'favor': { border: 'border-l-pink-500', bg: 'bg-pink-50' },
        'strength': { border: 'border-l-teal-500', bg: 'bg-teal-50' },
        'joy': { border: 'border-l-amber-500', bg: 'bg-amber-50' },
        'victory': { border: 'border-l-violet-500', bg: 'bg-violet-50' },
        'blessing': { border: 'border-l-lime-500', bg: 'bg-lime-50' },
        'breakthrough': { border: 'border-l-rose-500', bg: 'bg-rose-50' },
        'purpose': { border: 'border-l-sky-500', bg: 'bg-sky-50' },
        'default': { border: 'border-l-gray-500', bg: 'bg-gray-50' }
    };

    // Get unique categories from the data
    const categories = useMemo(() => {
        if (!data || !Array.isArray(data)) return ['All Prayers'];

        const uniqueCategories = [...new Set(
            data
                .filter(prayer => prayer.publish)
                .map(prayer => prayer.prayer_category)
        )];

        return ['All Prayers', ...uniqueCategories.map(cat => categoryDisplayNames[cat] || cat)];
    }, [data]);

    // Filter prayers based on active category and search query with pagination
    const { filteredPrayers, paginatedPrayers, totalPages } = useMemo(() => {
        if (!data || !Array.isArray(data)) return { filteredPrayers: [], paginatedPrayers: [], totalPages: 0 };

        let prayers = data.filter(prayer => prayer.publish && prayer.prayer !== "[To be updated]");

        // Filter by category
        if (activeCategory !== 'All Prayers') {
            const originalCategory = Object.keys(categoryDisplayNames).find(
                key => categoryDisplayNames[key] === activeCategory
            ) || activeCategory.toLowerCase();

            prayers = prayers.filter(prayer =>
                prayer.prayer_category === originalCategory
            );
        }

        // Filter by search query
        if (searchQuery.trim()) {
            prayers = prayers.filter(prayer =>
                prayer.prayer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prayer.prayer_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prayer.prayer_scripture.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const totalPages = Math.ceil(prayers.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedPrayers = prayers.slice(startIndex, startIndex + itemsPerPage);

        return { filteredPrayers: prayers, paginatedPrayers, totalPages };
    }, [data, activeCategory, searchQuery, currentPage, itemsPerPage]);

    // Reset to first page when category or search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    // Get color scheme for a category
    const getCategoryColors = (category) => {
        return categoryColors[category] || categoryColors.default;
    };

    // Generate title from prayer text
    const generateTitle = (prayer, category) => {
        const words = prayer.split(' ').slice(0, 4).join(' ');
        return `Prayer for ${categoryDisplayNames[category] || category}`;
    };

    // Handle share button click
    const handleShareClick = (prayer) => {
        setSelectedPrayer(prayer);
        setShareDialogOpen(true);
        console.log("hello")
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full bg-gray-50 pt-16 pb-52 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0284C7] mx-auto"></div>
                        <p className="text-gray-500 text-lg mt-4">Loading prayers...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="w-full bg-gray-50 pt-16 pb-52 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16">
                        <p className="text-red-500 text-lg">Error loading prayers. Please try again.</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-6 py-2 bg-[#0284C7] text-white rounded-lg hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50 pt-16 pb-52 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8">Prayer Categories</h2>

                    {/* Category Tabs - Scrollable */}
                    <div className="mb-8">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-2 min-w-max pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeCategory === category
                                            ? 'bg-[#0284C7] text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                        <button className="hidden sm:flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
                            <Filter className="w-5 h-5" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Prayer Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {paginatedPrayers.map((prayer) => {
                        const colors = getCategoryColors(prayer.prayer_category);
                        const title = generateTitle(prayer.prayer, prayer.prayer_category);
                        const categoryDisplay = categoryDisplayNames[prayer.prayer_category] || prayer.prayer_category;

                        return (
                            <div
                                key={prayer.id}
                                className={`${colors.bg} rounded-xl p-8 border-l-4 ${colors.border} shadow-sm hover:shadow-md transition-shadow duration-200`}
                            >
                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
                                    <span className="inline-block px-3 py-1 bg-white/60 text-gray-700 rounded-full text-sm font-medium">
                                        {categoryDisplay}
                                    </span>
                                    {prayer.featured && (
                                        <span className="ml-2 inline-block px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Prayer Text */}
                                <div className="mb-6">
                                    <p className="text-gray-800 leading-relaxed">
                                        {prayer.prayer}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[#02355B] font-semibold">{prayer.prayer_scripture}</span>
                                    <button
                                        onClick={() => handleShareClick(prayer)}
                                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {filteredPrayers.length === 0 && !isLoading && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No prayers found matching your search.</p>
                    </div>
                )}

                {/* Results count */}
                {filteredPrayers.length > 0 && (
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredPrayers.length)} of {filteredPrayers.length} prayer{filteredPrayers.length !== 1 ? 's' : ''}
                            {activeCategory !== 'All Prayers' && ` in ${activeCategory}`}
                        </p>
                    </div>
                )}
            </div>
            <SharePrayerDialog
                prayer={selectedPrayer}
                isOpen={shareDialogOpen}
                onClose={setShareDialogOpen}
            />
        </div>
    );
};
export default PrayerCategoriesSection
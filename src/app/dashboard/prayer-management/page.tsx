"use client"
import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Search,
    Filter,
    Eye,
    Edit2,
    Trash2,
    Star,
    FileText,
    Calendar,
    User,
    Check,
    X,
    AlertTriangle,
    BookOpen,
    Globe,
    Archive,
    MoreHorizontal,
    RefreshCw,
    Plus,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFetchPrayers } from '@/services/requests/prayers';
import { api } from '@/services/requests/axiosInstance';
import { useRouter } from 'next/navigation';

const PrayerManagementPage = () => {
    const { data: prayers, isLoading, isError, refetch } = useFetchPrayers();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedFeatured, setSelectedFeatured] = useState('');
    const [selectedPrayer, setSelectedPrayer] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const router = useRouter()

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Mock categories since we don't have the API
    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const response = await api.get('/prayers/categories/');
            setCategories(response.data);
            setCategoriesLoading(false)
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback categories
            setCategories([
                { id: 1, name: 'Morning Prayer' },
                { id: 2, name: 'Evening Prayer' },
                { id: 3, name: 'Intercessory Prayer' },
                { id: 4, name: 'Thanksgiving Prayer' },
                { id: 5, name: 'Healing Prayer' },
                { id: 6, name: 'Protection Prayer' },
                { id: 7, name: 'Guidance Prayer' },
                { id: 8, name: 'Praise & Worship' },
            ]);
        } finally {
            setCategoriesLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories()
    }, []);

    // Filter prayers based on search and filters
    const filteredPrayers = prayers?.filter(prayer => {
        const matchesSearch = prayer.prayer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prayer.prayer_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prayer.prayer_scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prayer.scripture_text.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !selectedCategory || prayer.prayer_category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesStatus = !selectedStatus ||
            (selectedStatus === 'published' && prayer.publish) ||
            (selectedStatus === 'draft' && !prayer.publish);
        const matchesFeatured = !selectedFeatured ||
            (selectedFeatured === 'featured' && prayer.featured) ||
            (selectedFeatured === 'not-featured' && !prayer.featured);

        return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    });

    // Pagination calculations
    const totalPages = Math.ceil((filteredPrayers?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPrayers = filteredPrayers?.slice(startIndex, endIndex) || [];

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedStatus, selectedFeatured]);

    const handleTogglePublish = async (prayer) => {
        setActionLoading(prayer.id);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`${prayer.publish ? 'Unpublished' : 'Published'} prayer:`, prayer.id);
        setActionLoading(null);
        refetch();
    };

    const handleToggleFeatured = async (prayer) => {
        setActionLoading(prayer.id);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`${prayer.featured ? 'Unfeatured' : 'Featured'} prayer:`, prayer.id);
        setActionLoading(null);
        refetch();
    };

    const handleDeletePrayer = async () => {
        setActionLoading(selectedPrayer.id);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Deleted prayer:', selectedPrayer.id);
        setShowDeleteModal(false);
        setSelectedPrayer(null);
        setActionLoading(null);
        refetch();
    };

    const handleViewPrayer = (prayer) => {
        setSelectedPrayer(prayer);
        setShowPreviewModal(true);
    };

    const handleDeleteClick = (prayer) => {
        setSelectedPrayer(prayer);
        setShowDeleteModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-[#0088DD] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading prayers...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Prayers</h2>
                    <p className="text-gray-600 mb-6">
                        Unable to load prayers. Please try again.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="px-6 py-2 bg-[#0088DD] text-white rounded-lg hover:bg-[#0077CC] flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center mb-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            Prayer Management
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {filteredPrayers?.length || 0} prayers
                            </span>
                        </h1>
                        <p className="text-gray-600">Manage and organize prayers for the iPray Daily community</p>
                    </div>
                    <button
                        onClick={() => router.push("/dashboard/prayer-management/create")}
                        className="px-4 py-2 bg-[#0088DD] text-white rounded-lg hover:bg-[#0077CC] flex items-center gap-2 transition-colors"
                    >
                        <Plus size={16} />
                        Create Prayer
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search prayers, categories, or scriptures..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                        >
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>

                        {/* Featured Filter */}
                        <select
                            value={selectedFeatured}
                            onChange={(e) => setSelectedFeatured(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                        >
                            <option value="">All</option>
                            <option value="featured">Featured</option>
                            <option value="not-featured">Not Featured</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Prayers List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {filteredPrayers?.length === 0 ? (
                    <div className="p-12 text-center">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No prayers found</h3>
                        <p className="text-gray-600">
                            {searchTerm || selectedCategory || selectedStatus || selectedFeatured
                                ? "Try adjusting your search or filter criteria"
                                : "Create your first prayer to get started"
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Prayer</th>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Category</th>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Featured</th>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Last Updated</th>
                                        <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPrayers.map((prayer) => (
                                        <tr key={prayer.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                                {prayer.prayer.substring(0, 60)}...
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {prayer.prayer_scripture} - {prayer.scripture_text.substring(0, 50)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#0088DD] bg-opacity-10 text-[#0088DD]">
                                                    {prayer.prayer_category.charAt(0).toUpperCase() + prayer.prayer_category.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${prayer.publish
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {prayer.publish ? (
                                                            <>
                                                                <Globe size={12} className="mr-1" />
                                                                Published
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FileText size={12} className="mr-1" />
                                                                Draft
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    {prayer.featured ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            <Star size={12} className="mr-1" fill="currentColor" />
                                                            Featured
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                            <Star size={12} className="mr-1" />
                                                            Regular
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    <span className="text-sm text-gray-900">
                                                        {formatDate(prayer.last_updated)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button
                                                            disabled={actionLoading === prayer.id}
                                                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                                                            title="More actions"
                                                        >
                                                            {actionLoading === prayer.id ? (
                                                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <MoreHorizontal size={16} />
                                                            )}
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem onClick={() => handleViewPrayer(prayer)}>
                                                            <Eye size={14} className="mr-2" />
                                                            View Prayer
                                                        </DropdownMenuItem>
                                                        {/* <DropdownMenuItem onClick={() => handleTogglePublish(prayer)}>
                                                            {prayer.publish ? (
                                                                <>
                                                                    <Archive size={14} className="mr-2" />
                                                                    Unpublish
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Globe size={14} className="mr-2" />
                                                                    Publish
                                                                </>
                                                            )}
                                                        </DropdownMenuItem> */}
                                                        <DropdownMenuItem onClick={() => handleToggleFeatured(prayer)}>
                                                            {prayer.featured ? (
                                                                <>
                                                                    <Star size={14} className="mr-2" />
                                                                    Remove Featured
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Star size={14} className="mr-2" />
                                                                    Add Featured
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {/* <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(prayer)}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 size={14} className="mr-2" />
                                                            Delete Prayer
                                                        </DropdownMenuItem> */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-700">
                                            Showing {startIndex + 1} to {Math.min(endIndex, filteredPrayers.length)} of {filteredPrayers.length} prayers
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => handlePageChange(page)}
                                                            className={`px-3 py-1 text-sm rounded ${page === currentPage
                                                                ? 'bg-[#0088DD] text-white'
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                } else if (
                                                    page === currentPage - 2 ||
                                                    page === currentPage + 2
                                                ) {
                                                    return (
                                                        <span key={page} className="px-2 text-gray-400">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Preview Modal */}
            {showPreviewModal && selectedPrayer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-gray-900">Prayer Preview</h3>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#0088DD] bg-opacity-10 text-[#0088DD]">
                                        {selectedPrayer.prayer_category}
                                    </span>
                                    {selectedPrayer.featured && (
                                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowPreviewModal(false)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Prayer Content</h4>
                                <div className="prose max-w-none">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {selectedPrayer.prayer}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Scripture</h4>
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-blue-900 italic leading-relaxed">
                                        {selectedPrayer.prayer_scripture}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <span className="text-sm text-gray-600">Status:</span>
                                    <p className={`font-medium ${selectedPrayer.publish ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {selectedPrayer.publish ? 'Published' : 'Draft'}
                                    </p>
                                </div>
                                {/* <div>
                                    <span className="text-sm text-gray-600">Author:</span>
                                    <p className="font-medium text-gray-900">
                                        {selectedPrayer.author.first_name} {selectedPrayer.author.last_name}
                                    </p>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedPrayer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Prayer</h3>
                                <p className="text-gray-600">This action cannot be undone</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-2">
                                Are you sure you want to delete this prayer?
                            </p>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-800 font-medium">
                                    {selectedPrayer.prayer_category}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                    {selectedPrayer.prayer.substring(0, 100)}...
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletePrayer}
                                disabled={actionLoading === selectedPrayer?.id}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading === selectedPrayer?.id ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        Delete Prayer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrayerManagementPage;
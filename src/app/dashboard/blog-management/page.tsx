"use client"
import React, { useState, useEffect } from 'react';
import {
    Search,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    Plus,
    Filter,
    Calendar,
    User,
    Clock,
    Star,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    X,
    Check,
    AlertTriangle
} from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';

const BlogManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const postsPerPage = 10;

    // Mock data - replace with actual API call
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Replace with actual API call: const response = await api.get('/blogs/fetch/');
            const response = await api.get("/blogs/fetch")
            console.log("res-->", response.data.results)
            if (response.data) {
                setPosts(response.data.results)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const handleToggleStatus = async (slug, currentStatus) => {
        setActionLoading(slug);
        try {
           await api.post(`/blogs/toggle/${slug}/`);
            // setTimeout(() => {
            //     setPosts(posts.map(post =>
            //         post.slug === slug
            //             ? { ...post, status: currentStatus === 'published' ? 'draft' : 'published' }
            //             : post
            //     ));
            //     setActionLoading(null);
            // }, 1000);
            setActionLoading(null);
        } catch (error) {
            console.error('Error toggling post status:', error);
            setActionLoading(null);
        }
    };

    const handleDeletePost = async () => {
        if (!postToDelete) return;

        setActionLoading(postToDelete.slug);
        try {
            // Replace with actual API call: await api.delete(`/blogs/delete/${postToDelete.slug}/`);
            setTimeout(() => {
                setPosts(posts.filter(post => post.slug !== postToDelete.slug));
                setShowDeleteModal(false);
                setPostToDelete(null);
                setActionLoading(null);
            }, 1000);
        } catch (error) {
            console.error('Error deleting post:', error);
            setActionLoading(null);
        }
    };

    const handleToggleFeatured = async (slug) => {
        setActionLoading(slug);
        try {
            // This would be part of the update API call
            setTimeout(() => {
                setPosts(posts.map(post =>
                    post.slug === slug
                        ? { ...post, featured: !post.featured }
                        : post
                ));
                setActionLoading(null);
            }, 1000);
        } catch (error) {
            console.error('Error updating post:', error);
            setActionLoading(null);
        }
    };

    // Filter posts based on search and filters
    const filteredPosts = posts?.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const categories = [...new Set(posts.map(post => post.category))];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
                        <p className="text-gray-600">Manage your iPray Daily blog posts</p>
                    </div>
                    <button
                        className="bg-[#0088DD] hover:bg-[#0077CC] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        onClick={() => {/* Navigate to create post */ }}
                    >
                        <Plus size={20} />
                        New Post
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                            </div>
                            <div className="h-12 w-12 bg-[#0088DD] bg-opacity-10 rounded-lg flex items-center justify-center">
                                <Edit3 className="h-6 w-6 text-[#0088DD]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Published</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {posts.filter(p => p.status === 'published').length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Eye className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Drafts</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {posts.filter(p => p.status === 'draft').length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <EyeOff className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Featured</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {posts.filter(p => p.featured).length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Star className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search posts by title, author, or description..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0088DD] mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading posts...</p>
                    </div>
                ) : currentPosts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <Edit3 size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg mb-2">No posts found</p>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Post Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author & Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dates
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded overflow-hidden">
                                                    {post.image ? (
                                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-[#0088DD] bg-opacity-10 flex items-center justify-center">
                                                            <Edit3 className="w-4 h-4 text-[#0088DD]" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-medium text-gray-900 truncate">
                                                            {post.title}
                                                        </h3>
                                                        {post.featured && (
                                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                        {post.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {post.read_time} min read
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <User size={12} className="text-gray-400" />
                                                    <span className="text-gray-600 truncate max-w-32">
                                                        {post.author.split(' (')[0]}
                                                    </span>
                                                </div>
                                                <span className="inline-block bg-[#0088DD] bg-opacity-10 text-[#0088DD] text-xs px-2 py-1 rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(post.slug, post.status)}
                                                    disabled={actionLoading === post.slug}
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${post.status === 'published'
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                        } ${actionLoading === post.slug ? 'opacity-50' : ''}`}
                                                >
                                                    {actionLoading === post.slug ? (
                                                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                                                    ) : post.status === 'published' ? (
                                                        <Eye size={12} />
                                                    ) : (
                                                        <EyeOff size={12} />
                                                    )}
                                                    {post.status === 'published' ? 'Published' : 'Draft'}
                                                </button>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <Calendar size={12} />
                                                    <span>Created: {formatDate(post.created)}</span>
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Updated: {formatDate(post.last_updated)}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleFeatured(post.slug)}
                                                    disabled={actionLoading === post.slug}
                                                    className={`p-2 rounded-lg transition-colors ${post.featured
                                                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                                                        } ${actionLoading === post.slug ? 'opacity-50' : ''}`}
                                                    title={post.featured ? 'Remove from featured' : 'Add to featured'}
                                                >
                                                    <Star size={16} className={post.featured ? 'fill-current' : ''} />
                                                </button>

                                                <button
                                                    onClick={() => {/* Navigate to edit */ }}
                                                    className="p-2 bg-[#0088DD] bg-opacity-10 text-[#0088DD] rounded-lg hover:bg-[#0088DD] hover:bg-opacity-20 transition-colors"
                                                    title="Edit post"
                                                >
                                                    <Edit3 size={16} />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setPostToDelete(post);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    title="Delete post"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="px-6 py-4 border-t bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {startIndex + 1} to {Math.min(startIndex + postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 rounded-lg text-sm ${currentPage === page
                                                ? 'bg-[#0088DD] text-white'
                                                : 'text-gray-500 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Post</h3>
                                <p className="text-gray-600">This action cannot be undone</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                Are you sure you want to delete "{postToDelete?.title}"?
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setPostToDelete(null);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletePost}
                                disabled={actionLoading}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Trash2 size={16} />
                                )}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
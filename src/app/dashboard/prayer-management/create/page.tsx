"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
    ArrowLeft,
    Save,
    Eye,
    AlertTriangle,
    Check,
    BookOpen,
    Star,
    FileText,
    User,
    Shield,
    Lock
} from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';
import { useRouter } from 'next/navigation';

const PrayerCreatePage = () => {
    const [formData, setFormData] = useState({
        prayer_category: '',
        prayer: '',
        prayer_scripture: '',
        featured: false,
        publish: false // Always false by default as specified
    });

    const [errors, setErrors] = useState<any>({});
    const [createLoading, setCreateLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const router = useRouter()

    // Check user authentication and superuser status from cookies
    useEffect(() => {
        const checkUserAccess = async () => {
            try {
                setLoadingAuth(true);

                // Get user data from cookies
                const authToken = Cookies.get('auth_token');
                const userDataStr = Cookies.get('user_data');

                if (!authToken || !userDataStr) {
                    console.error('No authentication data found in cookies');
                    setAccessDenied(true);
                    return;
                }

                // Parse user data from cookies
                const userData = JSON.parse(userDataStr);
                setUser(userData);

                // Check if user is superuser
                if (!userData.is_superuser) {
                    console.log('User is not a superuser:', userData);
                    setAccessDenied(true);
                    return;
                }

                // Fetch prayer categories if user has access
                await fetchCategories();

            } catch (error) {
                console.error('Error checking user access:', error);
                setAccessDenied(true);
            } finally {
                setLoadingAuth(false);
            }
        };

        checkUserAccess();
    }, []);

    console.log(user)

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


    console.log("categories--->", categories)

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.prayer_category) {
            newErrors.prayer_category = 'Prayer category is required';
        }

        if (!formData.prayer.trim()) {
            newErrors.prayer = 'Prayer content is required';
        } else if (formData.prayer.length < 5) {
            newErrors.prayer = 'Prayer content must be at least 5 characters';
        }

        if (!formData.prayer_scripture.trim()) {
            newErrors.prayer_scripture = 'Prayer scripture is required';
        } else if (formData.prayer_scripture.length < 2) {
            newErrors.prayer_scripture = 'Scripture must be at least 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createPrayer = async (prayerData: any) => {
        const response = await api.post('/prayers/create/', prayerData);
        return response.data;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setCreateLoading(true);

        try {
            await createPrayer({
                prayer_category: formData.prayer_category,
                prayer: formData.prayer,
                prayer_scripture: formData.prayer_scripture,
                featured: formData.featured,
                publish: false, // Always false as specified
            });

            setShowSuccessModal(true);

        } catch (error) {
            console.error('Error creating prayer:', error);

            if (error.response?.data) {
                const apiErrors = {};
                Object.keys(error.response.data).forEach(key => {
                    if (Array.isArray(error.response.data[key])) {
                        apiErrors[key] = error.response.data[key][0];
                    } else {
                        apiErrors[key] = error.response.data[key];
                    }
                });
                setErrors(apiErrors);
            } else {
                setErrors({ general: 'Failed to create prayer. Please try again.' });
            }
        } finally {
            setCreateLoading(false);
        }
    };

    // Loading state while checking authentication
    if (loadingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-[#0088DD] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking access permissions...</p>
                </div>
            </div>
        );
    }

    // Access denied for non-superusers
    if (accessDenied) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">
                        This page is restricted to superusers only. You don't have permission to create prayers.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 bg-[#0088DD] text-white rounded-lg hover:bg-[#0077CC] flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            Create New Prayer
                            <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full flex items-center gap-1">
                                <Shield size={14} />
                                Superuser Only
                            </div>
                        </h1>
                        <p className="text-gray-600">Create and manage prayers for the iPray Daily community</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                        <Eye size={16} />
                        {previewMode ? 'Edit Mode' : 'Preview'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Error */}
                    {errors.general && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
                            <AlertTriangle size={20} />
                            {errors.general}
                        </div>
                    )}

                    {/* Prayer Category */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prayer Category *
                        </label>
                        {categoriesLoading ? (
                            <div className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-[#0088DD] border-t-transparent rounded-full animate-spin mr-2" />
                                Loading categories...
                            </div>
                        ) : (
                            <select
                                name="prayer_category"
                                value={formData.prayer_category}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent ${errors.prayer_category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select a prayer category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        )}
                        {errors.prayer_category && <p className="mt-1 text-sm text-red-600">{errors.prayer_category}</p>}
                    </div>

                    {/* Prayer Content */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prayer Content *
                        </label>
                        {previewMode ? (
                            <div className="min-h-[300px] p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="prose max-w-none">
                                    <div className="text-lg font-medium text-gray-900 mb-3">
                                        {categories.find(cat => String(cat.id) === formData.prayer_category)?.name || 'Prayer Preview'}
                                    </div>
                                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                        {formData.prayer || 'Enter your prayer content...'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                name="prayer"
                                value={formData.prayer}
                                onChange={handleInputChange}
                                rows={10}
                                placeholder="Write your prayer content here..."
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent resize-none ${errors.prayer ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                        )}
                        {errors.prayer && <p className="mt-1 text-sm text-red-600">{errors.prayer}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.prayer.length}/5 characters minimum
                        </p>
                    </div>

                    {/* Prayer Scripture */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prayer Scripture *
                        </label>
                        {previewMode ? (
                            <div className="min-h-[120px] p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="prose max-w-none">
                                    <div className="text-sm font-medium text-[#0088DD] mb-2">Scripture</div>
                                    <div className="whitespace-pre-wrap text-gray-800 italic">
                                        {formData.prayer_scripture || 'Enter supporting scripture...'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <input
                                name="prayer_scripture"
                                value={formData.prayer_scripture}
                                onChange={handleInputChange}
                                placeholder="Jeremiah 29:11"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent resize-none ${errors.prayer_scripture ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                        )}
                        {errors.prayer_scripture && <p className="mt-1 text-sm text-red-600">{errors.prayer_scripture}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.prayer_scripture.length}/10 characters minimum
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <button
                            onClick={handleSubmit}
                            disabled={createLoading}
                            className="w-full px-6 py-3 bg-[#0088DD] hover:bg-[#0077CC] text-white rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {createLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Creating Prayer...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Create Prayer (Draft)
                                </>
                            )}
                        </button>
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            Prayer will be saved as draft and require manual publishing
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* User Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <User size={20} />
                            Current User
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Name:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {user?.first_name} {user?.last_name}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Role:</span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    <Shield size={12} />
                                    Superuser
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Prayer Settings */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Prayer Settings
                        </h3>

                        {/* Featured Toggle */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#0088DD] border-gray-300 rounded focus:ring-[#0088DD]"
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Star size={14} />
                                    Mark as featured prayer
                                </label>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Featured prayers appear prominently in the app
                            </p>
                        </div>

                        {/* Publish Status Info */}
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle size={16} className="text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">Draft Mode</span>
                            </div>
                            <p className="text-xs text-yellow-700">
                                All prayers are created as drafts and require manual publishing for safety.
                            </p>
                        </div>
                    </div>

                    {/* Prayer Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Prayer Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Category:</span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#0088DD] bg-opacity-10 text-[#0088DD]">
                                    {categories.find(cat => String(cat.id) === formData.prayer_category)?.name || 'Not selected'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Featured:</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${formData.featured
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {formData.featured ? 'Yes' : 'No'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Status:</span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Draft
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Prayer Created Successfully!</h3>
                                <p className="text-gray-600">Your prayer has been saved as a draft</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                The prayer has been created successfully and saved as a draft. It will need to be manually published to appear in the app.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    // Reset form
                                    setFormData({
                                        prayer_category: '',
                                        prayer: '',
                                        prayer_scripture: '',
                                        featured: false,
                                        publish: false
                                    });
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Create Another
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/prayer-management")}
                                className="flex-1 px-4 py-2 bg-[#0088DD] text-white rounded-lg hover:bg-[#0077CC]"
                            >
                                View Prayers
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrayerCreatePage;
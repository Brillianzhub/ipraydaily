"use client"
import React, { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft,
    Save,
    Eye,
    Image,
    X,
    Upload,
    AlertTriangle,
    Check,
    Clock,
    User,
    Tag,
    FileText,
    Calendar
} from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';
import { useRouter } from 'next/navigation';

const BlogCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
        category: '',
        featured: false,
        read_time: '',
        status: 'draft',
        image: null
    });

    const [errors, setErrors] = useState<any>({});
    const [draftLoading, setDraftLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); // Store the uploaded image URL
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [imageUploading, setImageUploading] = useState(false); // Track image upload state
    const router = useRouter()
    const fileInputRef = useRef(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);
                const response = await api.get('/blogs/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([
                    { id: 1, name: 'Sermon' },
                    { id: 2, name: 'Devotional' },
                    { id: 3, name: 'Prayer Guide' },
                    { id: 4, name: 'Spiritual Growth' },
                    { id: 5, name: 'Bible Study' },
                    { id: 6, name: 'Christian Living' },
                    { id: 7, name: 'Testimonies' },
                    { id: 8, name: 'Faith Stories' },
                ]);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

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

    // Upload image to server and get URL
    const uploadImage = async (file: File) => {
        const imageFormData = new FormData();
        imageFormData.append('image', file);

        try {
            setImageUploading(true);
            const response = await api.post('/blogs/upload-image/', imageFormData);
            return response.data.image_url || response.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        } finally {
            setImageUploading(false);
        }
    };

    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        console.log("file", file)
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result);
            reader.readAsDataURL(file);

            try {
                // Upload image and get URL
                const uploadedImageUrl = await uploadImage(file);
                setImageUrl(uploadedImageUrl);
                setFormData(prev => ({ ...prev, image: uploadedImageUrl }));

                // Clear error
                setErrors(prev => ({ ...prev, image: '' }));
            } catch (error) {
                setErrors(prev => ({ ...prev, image: 'Failed to upload image. Please try again.' }));
                setImagePreview(null);
            }
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        setImageUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.read_time || parseInt(formData.read_time) < 1) {
            newErrors.read_time = 'Read time must be at least 1 minute';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        if (!validateForm()) {
            return;
        }

        const setLoadingState = status === 'draft' ? setDraftLoading : setPublishLoading;
        setLoadingState(true);

        try {
            // Find the selected category name
            const selectedCategory = categories.find(cat => cat.id.toString() === formData.category);
            const categoryName = selectedCategory ? selectedCategory.name : '';

            const submitData = {
                title: formData.title,
                description: formData.description,
                body: formData.body,
                category: categoryName, // Send category name instead of ID
                featured: formData.featured,
                read_time: formData.read_time,
                status: status,
                image: imageUrl || null // Send image URL instead of file
            };

            const response = await api.post('/blogs/create/', submitData);
            setShowSuccessModal(true);

        } catch (error) {
            console.error('Error creating post:', error);

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
                setErrors({ general: 'Failed to create post. Please try again.' });
            }
        } finally {
            setLoadingState(false);
        }
    };

    // const handleSaveAsDraft = async (e: any) => {
    //     e.preventDefault();
    //     setDraftLoading(true)
    //     const response = await api.post(`/blogs/toggle/${slug}/`);
    //     if (response.data) {
    //         setDraftLoading(false)
    //         router.push("/dashboard/blog-management")
    //     }
    // };

    const handleSaveAndPublish = async (e: any) => {
        e.preventDefault();
        await handleSubmit('published');
    };

    // Get category name for display
    const getCategoryName = (categoryId: string) => {
        const category = categories.find(cat => cat.id.toString() === categoryId);
        return category ? category.name : 'Not selected';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
                        <p className="text-gray-600">Write and publish your iPray Daily blog post</p>
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

                    {/* Title */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter your blog post title..."
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Write a brief description of your post..."
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.description.length}/20 characters minimum
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        {previewMode ? (
                            <div className="min-h-[400px] p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="prose max-w-none">
                                    <h3 className="text-xl font-bold mb-3">{formData.title || 'Preview Title'}</h3>
                                    <p className="text-gray-600 mb-4">{formData.description}</p>
                                    <div className="whitespace-pre-wrap">{formData.body || 'Start writing your content...'}</div>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleInputChange}
                                rows={10}
                                placeholder="Write your blog post content here..."
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent resize-none ${errors.body ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                        )}
                        {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body}</p>}
                    </div>

                    {/* Action Buttons - Moved below the form */}
                    <div className="">
                        <div className="flex justify-end gap-3">
                            {/* <button
                                onClick={handleSaveAsDraft}
                                disabled={draftLoading || publishLoading || imageUploading}
                                className="px-6 py-2 border border-[#0088DD] text-[#0088DD] rounded-lg hover:bg-[#0088DD] hover:bg-opacity-10 flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {draftLoading ? (
                                    <div className="w-4 h-4 border-2 border-[#0088DD] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Save size={16} />
                                )}
                                Save as Draft
                            </button> */}

                            <button
                                onClick={handleSaveAndPublish}
                                disabled={draftLoading || publishLoading || imageUploading}
                                className="px-6 py-2 bg-[#0088DD] hover:bg-[#0077CC] text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {publishLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Eye size={16} />
                                )}
                                Publish
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Post Settings */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Post Settings
                        </h3>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            {categoriesLoading ? (
                                <div className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-[#0088DD] border-t-transparent rounded-full animate-spin mr-2" />
                                    Loading categories...
                                </div>
                            ) : (
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent ${errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                                    ))}
                                </select>
                            )}
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        {/* Read Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Read Time (minutes) *
                            </label>
                            <input
                                type="number"
                                name="read_time"
                                value={formData.read_time}
                                onChange={handleInputChange}
                                min="1"
                                placeholder="5"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0088DD] focus:border-transparent ${errors.read_time ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                            {errors.read_time && <p className="mt-1 text-sm text-red-600">{errors.read_time}</p>}
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-[#0088DD] border-gray-300 rounded focus:ring-[#0088DD]"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                Mark as featured post
                            </label>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <Image size={20} />
                            Featured Image
                        </h3>

                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    disabled={imageUploading}
                                >
                                    <X size={16} />
                                </button>
                                {imageUploading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                        <div className="flex items-center gap-2 text-white">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Uploading...
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                onClick={() => !imageUploading && fileInputRef.current?.click()}
                                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0088DD] hover:bg-[#0088DD] hover:bg-opacity-5 cursor-pointer transition-colors ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {imageUploading ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 border-2 border-[#0088DD] border-t-transparent rounded-full animate-spin mb-3" />
                                        <p className="text-sm text-gray-600">Uploading image...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                        <p className="text-sm text-gray-600 mb-1">Click to upload an image</p>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                    </>
                                )}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={imageUploading}
                        />
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                    </div>

                    {/* Post Status */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Post Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Read Time:</span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {formData.read_time || 0} minutes
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
                                <span className="text-sm font-medium text-gray-700">Category:</span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#0088DD] bg-opacity-10 text-[#0088DD]">
                                    {getCategoryName(formData.category)}
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
                                <h3 className="text-lg font-semibold text-gray-900">Post Created Successfully!</h3>
                                <p className="text-gray-600">Your blog post has been created</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                "{formData.title}" has been created successfully.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    // Reset form or navigate
                                    setFormData({
                                        title: '',
                                        description: '',
                                        body: '',
                                        category: '',
                                        featured: false,
                                        status: 'draft',
                                        read_time: '',
                                        image: null
                                    });
                                    setImagePreview(null);
                                    setImageUrl('');
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Create Another
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/blog-management")}
                                className="flex-1 px-4 py-2 bg-[#0088DD] text-white rounded-lg hover:bg-[#0077CC]"
                            >
                                View Posts
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCreate;
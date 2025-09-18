"use client"
import React, { useState } from 'react';
import { User, Calendar, Download, Smartphone, Clock } from 'lucide-react';
import { useFetchBlogBySlug } from '@/services/requests/blogs';
import { useParams } from 'next/navigation';

const DynamicBlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    console.log("slug--->", slug)

    const { data: blog, isLoading } = useFetchBlogBySlug(slug);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blog post...</p>
                </div>
            </div>
        );
    }

    // Show error state if blog not found
    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Blog post not found</h1>
                    <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Function to format body text with proper line breaks and structure
    const formatBodyContent = (body) => {
        if (!body) return '';

        // Split by double line breaks to create paragraphs
        const paragraphs = body.split('\r\n\r\n').filter(p => p.trim());

        return paragraphs.map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim();

            // Check if it's a heading (all caps or starts with number)
            if (trimmedParagraph === trimmedParagraph.toUpperCase() && trimmedParagraph.length < 100) {
                return (
                    <h2 key={index} className="text-2xl font-bold text-gray-800 mb-4 mt-8">
                        {trimmedParagraph}
                    </h2>
                );
            }

            // Check if it's a numbered section
            if (/^\d+\./.test(trimmedParagraph)) {
                const [title, ...content] = trimmedParagraph.split('\r\n');
                return (
                    <div key={index} className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                        {content.length > 0 && (
                            <div className="text-gray-700 leading-relaxed">
                                {content.join('\n').split('\r\n').map((line, lineIndex) => (
                                    line.trim() && <p key={lineIndex} className="mb-2">{line}</p>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            // Regular paragraph with line breaks preserved
            const lines = trimmedParagraph.split('\r\n').filter(line => line.trim());
            return (
                <div key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2">{line}</p>
                    ))}
                </div>
            );
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: blog.image
                        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${blog.image}')`
                        : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23ff7f50;stop-opacity:1" /><stop offset="50%" style="stop-color:%23ffa07a;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ddd;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="400" fill="url(%23sky)"/></svg>')`
                }}
            >
                <div className="text-center text-white px-4">
                    {blog.category && (
                        <div className="inline-block bg-black bg-opacity-50 px-4 py-1 rounded-full text-sm mb-4">
                            {blog.category.toUpperCase()}
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                        {blog.author && (
                            <div className="flex items-center gap-1">
                                <User size={16} />
                                <span>{blog.author}</span>
                            </div>
                        )}
                        {blog.publish && (
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{formatDate(blog.publish)}</span>
                            </div>
                        )}
                        {blog.read_time && (
                            <div className="flex items-center gap-1">
                                <Clock size={16} />
                                <span>{blog.read_time} min read</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8 mb-52">
                {/* Description/Excerpt */}
                {blog.description && (
                    <div className="text-center italic text-gray-600 mb-8 text-lg border-l-4 border-orange-400 pl-6 py-4 bg-orange-50">
                        {blog.description}
                    </div>
                )}

                {/* Featured Badge */}
                {blog.featured && (
                    <div className="flex justify-center mb-8">
                        <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Featured Article
                        </span>
                    </div>
                )}

                {/* Status Badge */}
                {blog.status && (
                    <div className="flex justify-center mb-8">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${blog.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                        </span>
                    </div>
                )}

                {/* Main Content Body */}
                {blog.body && (
                    <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                        {formatBodyContent(blog.body)}
                    </div>
                )}

                {/* Article Info Footer */}
                <div className="border-t border-gray-200 pt-6 mt-8">
                    <div className="text-sm text-gray-500 space-y-2">
                        {blog.created && (
                            <p>
                                <strong>Created:</strong> {formatDate(blog.created)}
                            </p>
                        )}
                        {blog.last_updated && blog.last_updated !== blog.created && (
                            <p>
                                <strong>Last Updated:</strong> {formatDate(blog.last_updated)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicBlogPost;
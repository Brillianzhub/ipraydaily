"use client"
import React, { useState } from 'react';
import { User, Calendar, Download, Smartphone, Clock, Share2 } from 'lucide-react';
import { useFetchBlogBySlug } from '@/services/requests/blogs';
import { useParams } from 'next/navigation';
import Blogbanner from '@/components/blog/Blogbanner';
import { toast } from 'sonner';

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
            <div className="max-w-6xl mx-auto px-4 py-8 mb-52">
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

                <Blogbanner />

                {/* Main Content Body */}
                {blog.body && (
                    <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                        {formatBodyContent(blog.body)}
                    </div>
                )}

                {/* Author Section */}
                {blog.author && (
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {blog.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Written by</h3>
                                <p className="text-lg text-gray-700">{blog.author}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Share2 size={20} />
                            <span className="font-semibold">Share this article:</span>
                        </div>
                        <div className="flex gap-3">
                            {/* Facebook Share Button */}
                            <button
                                onClick={() => {
                                    const url = encodeURIComponent(window.location.href);
                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                aria-label="Share on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="hidden sm:inline">Facebook</span>
                            </button>

                            {/* Twitter Share Button */}
                            <button
                                onClick={() => {
                                    const url = encodeURIComponent(window.location.href);
                                    const text = encodeURIComponent(blog.title || 'Check out this article');
                                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                <span className="hidden sm:inline">Twitter</span>
                            </button>

                            {/* Instagram Share Button - Opens Instagram app or web */}
                            <button
                                onClick={() => {
                                    // Instagram doesn't have a direct share URL, so we'll copy link and notify user
                                    navigator.clipboard.writeText(window.location.href).then(() => {
                                        toast('Link copied! You can now share it on Instagram.');
                                    });
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
                                aria-label="Share on Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span className="hidden sm:inline">Instagram</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Article Info Footer */}
                <div className="border-t border-gray-200 pt-6 mt-6">
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
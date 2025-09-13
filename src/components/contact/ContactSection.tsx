"use client"
import React, { useState } from 'react';
import { Mail, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will get back to you soon.');
    };

    return (
        <div className="bg-gray-50 py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We'd love to hear from you. Reach out through any of the options below:
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-[#0284C7]" />
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Email:</p>
                                    <a
                                        href="mailto:contact@ipraydaily.com"
                                        className="text-[#0284C7] transition-colors"
                                    >
                                        contact@ipraydaily.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-[#0284C7]" />
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Website:</p>
                                    <a
                                        href="https://ipraydaily.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0284C7] transition-colors"
                                    >
                                        ipraydaily.net
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Online Inquiry Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Online Inquiry
                            </h2>
                            <p className="text-gray-600">
                                Please fill out the form below.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all placeholder-gray-500"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all placeholder-gray-500"
                                />
                            </div>

                            {/* Subject Field */}
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all placeholder-gray-500"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all placeholder-gray-500 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#0284C7] text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
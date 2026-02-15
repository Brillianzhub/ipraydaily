"use client"
import React, { useState, useEffect } from 'react';
import {
    Mail,
    Send,
    Users,
    MessageSquare,
    AlertTriangle,
    Check,
    ArrowLeft,
    Shield,
    Clock,
    FileText,
    Eye,
    History,
    Bell
} from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';

const EmailNotificationPage = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<any>({});
    const [sendingEmail, setSendingEmail] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.subject.trim()) {
            newErrors.subject = 'Email subject is required';
        } else if (formData.subject.length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Email message is required';
        } else if (formData.message.length < 20) {
            newErrors.message = 'Message must be at least 20 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmailNotification = async () => {
        if (!validateForm()) {
            return;
        }

        setSendingEmail(true);

        try {
            const response = await api.post('/notifications/email-notifications/send/', {
                subject: formData.subject,
                message: formData.message
            });

            setShowSuccessModal(true);

            // Reset form after successful send
            setFormData({
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Error sending email notification:', error);

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
                setErrors({ general: 'Failed to send email notification. Please try again.' });
            }
        } finally {
            setSendingEmail(false);
        }
    };

    const loadTemplate = (template) => {
        setFormData({
            subject: template.subject,
            message: template.message
        });
    };

    const templates = [
        {
            name: "Daily Prayer Update",
            subject: "Daily Prayer Update",
            message: "Beloved in Christ, here is today's encouragement:\n\n'Cast all your anxiety on Him because He cares for you.' (1 Peter 5:7)\n\nStay blessed!"
        },
        {
            name: "Weekly Reflection",
            subject: "Weekly Prayer Reflection",
            message: "Dear Prayer Warriors,\n\nAs we close this week, let us reflect on God's faithfulness:\n\n'Great is Thy faithfulness, O God my Father; There is no shadow of turning with Thee.' (Lamentations 3:23)\n\nBlessings and peace!"
        },
        {
            name: "Special Announcement",
            subject: "Important Update from iPray Daily",
            message: "Dear iPray Daily Community,\n\nWe have an important update to share with you.\n\n[Add your message here]\n\nGod bless you!"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <Bell className="text-[#0077CC]" size={32} />
                            Email Notifications
                            <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full flex items-center gap-1">
                                <Shield size={14} />
                                Admin Only
                            </div>
                        </h1>
                        <p className="text-gray-600">Send email notifications to all iPray Daily users</p>
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

                    {/* Email Subject */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Subject *
                        </label>
                        {previewMode ? (
                            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="text-lg font-semibold text-gray-900">
                                    {formData.subject || 'Enter email subject...'}
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="e.g., Daily Prayer Update"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077CC] focus:border-transparent ${errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                        )}
                        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.subject.length}/5 characters minimum
                        </p>
                    </div>

                    {/* Email Message */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Message *
                        </label>
                        {previewMode ? (
                            <div className="min-h-[300px] p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                        {formData.message || 'Enter your email message...'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={12}
                                placeholder="Write your email message here..."
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077CC] focus:border-transparent resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                            />
                        )}
                        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.message.length}/20 characters minimum
                        </p>
                    </div>

                    {/* Send Button */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <button
                            onClick={sendEmailNotification}
                            disabled={sendingEmail}
                            className="w-full px-6 py-3 bg-[#0077CC] hover:bg-[#0066BB] text-white rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sendingEmail ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending Email...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Send Email to All Users
                                </>
                            )}
                        </button>
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            This will send the email to all registered users
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Email Templates */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Quick Templates
                        </h3>
                        <div className="space-y-2">
                            {templates.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => loadTemplate(template)}
                                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-[#0077CC] hover:bg-[#0077CC] hover:bg-opacity-5 transition-colors"
                                >
                                    <div className="font-medium text-sm text-gray-900">
                                        {template.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 truncate">
                                        {template.subject}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-yellow-800 mb-1">Important Notice</h4>
                                <p className="text-sm text-yellow-700">
                                    This will send an email to all registered users. Please review your message carefully before sending.
                                </p>
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
                                <h3 className="text-lg font-semibold text-gray-900">Email Sent Successfully!</h3>
                                <p className="text-gray-600">Your notification has been delivered</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                Your email notification has been successfully sent to all registered users.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Send Another
                            </button>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="flex-1 px-4 py-2 bg-[#0077CC] text-white rounded-lg hover:bg-[#0066BB]"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailNotificationPage;
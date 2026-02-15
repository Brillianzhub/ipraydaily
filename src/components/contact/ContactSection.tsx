"use client"
import React, { useState, useEffect } from 'react';
import { Mail, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useSubmitContact } from '@/services/requests/contact';

declare global {
    interface Window {
        grecaptcha: {
            render: (container: string | HTMLElement, options: any) => number;
            reset: (widgetId?: number) => void;
            getResponse: (widgetId?: number) => string;
            execute: (widgetId?: number) => void;
        };
        handleRecaptchaChange: (token: string) => void;
        recaptchaCallback: (token: string) => void;
    }
}


export default function ContactSection() {
    const { mutateAsync: submitContact, isPending, isSuccess, error } = useSubmitContact();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [validationErrors, setValidationErrors] = useState<any>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    // Load reCAPTCHA script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup script on unmount
            const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    // Validation function
    const validateForm = () => {
        const errors: any = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }

        // if (!recaptchaToken) {
        //     errors.recaptcha = 'Please complete the reCAPTCHA verification';
        // }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);

        // Clear recaptcha validation error
        if (validationErrors.recaptcha && token) {
            setValidationErrors(prev => ({
                ...prev,
                recaptcha: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            // Include recaptcha token in submission
            await submitContact({
                ...formData,
                // recaptchaToken
            });
            setIsSubmitted(true);

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setRecaptchaToken('');
                setIsSubmitted(false);

                // Reset reCAPTCHA
                if (window.grecaptcha) {
                    window.grecaptcha.reset();
                }
            }, 3000);

        } catch (err) {
            console.error('Contact submission error:', err);

            // Reset reCAPTCHA on error
            if (window.grecaptcha) {
                window.grecaptcha.reset();
            }
            setRecaptchaToken('');
        }
    };

    // Success message component
    const SuccessMessage = () => (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
                Message Sent Successfully!
            </h3>
            <p className="text-green-600">
                Thank you for your inquiry. We will get back to you within 24 hours.
            </p>
        </div>
    );

    // Error message component
    const ErrorMessage = () => (
        error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-700">
                        {error?.message || 'Something went wrong. Please try again.'}
                    </p>
                </div>
            </div>
        )
    );

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
                            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-[#0284C7]" />
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Email:</p>
                                    <a
                                        href="mailto:contact@ipraydaily.com"
                                        className="text-[#0284C7] hover:text-[#0369A1] transition-colors"
                                    >
                                        contact@ipraydaily.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-[#0284C7]" />
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Website:</p>
                                    <a
                                        href="https://ipraydaily.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0284C7] hover:text-[#0369A1] transition-colors"
                                    >
                                        ipraydaily.net
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Response Time
                            </h3>
                            <p className="text-gray-600">
                                We typically respond to all inquiries within 24 hours during business days.
                                For urgent matters, please email us directly.
                            </p>
                        </div>
                    </div>

                    {/* Online Inquiry Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Online Inquiry
                            </h2>
                            <p className="text-gray-600">
                                Please fill out the form below and we'll get back to you soon.
                            </p>
                        </div>

                        {isSuccess && isSubmitted ? (
                            <SuccessMessage />
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <ErrorMessage />

                                {/* Name Field */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name *"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${validationErrors.name
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-[#0284C7]'
                                            }`}
                                    />
                                    {validationErrors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {validationErrors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${validationErrors.email
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-[#0284C7]'
                                            }`}
                                    />
                                    {validationErrors.email && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {validationErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject *"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 ${validationErrors.subject
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-[#0284C7]'
                                            }`}
                                    />
                                    {validationErrors.subject && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {validationErrors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Your Message *"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 resize-none ${validationErrors.message
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-[#0284C7]'
                                            }`}
                                    />
                                    {validationErrors.message && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {validationErrors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Character Counter */}
                                <div className="text-right">
                                    <span className="text-sm text-gray-500">
                                        {formData.message.length}/500 characters
                                    </span>
                                </div>

                                {/* reCAPTCHA Field */}
                                {/* <div>
                                    <div
                                        className="g-recaptcha"
                                        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                                        data-callback="handleRecaptchaChange"
                                    ></div>
                                    {validationErrors.recaptcha && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {validationErrors.recaptcha}
                                        </p>
                                    )}
                                </div> */}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`w-full font-semibold py-4 rounded-lg transition-all duration-200 text-lg flex items-center justify-center gap-2 ${isPending
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#0284C7] hover:bg-[#0369A1] active:bg-[#0C4A6E]'
                                        } text-white`}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center">
                                    * Required fields
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Global reCAPTCHA callback function */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    window.handleRecaptchaChange = function(token) {
                        // This will be handled by the component's callback
                        if (window.recaptchaCallback) {
                            window.recaptchaCallback(token);
                        }
                    };
                `
            }} />
        </div>
    );
}
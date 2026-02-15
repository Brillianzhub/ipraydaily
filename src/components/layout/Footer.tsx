import React from 'react';
import NewsletterSection from './Newsletter';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <div className="bg-[#02355B] px-4 sm:px-0 text-white relative">
                <NewsletterSection />
                <div className="max-w-7xl mx-auto pt-20 pb-16">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Brand Section */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <img src="/footerbrand.png" alt="logo" className='w-36' />
                            </div>
                            <p className="text-gray-300 leading-relaxed max-w-sm">
                                Your faithful companion for daily prayer, Bible study, and spiritual growth. Join thousands of believers experiencing God&apos;s transforming power through consistent prayer.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold">Quick Links</h3>
                            <nav className="space-y-4">
                                <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                                <Link href="/prayers" className="block text-gray-300 hover:text-white transition-colors">
                                    Prayers
                                </Link>
                                <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                                    Blog
                                </Link>
                                <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                                    Contact
                                </Link>
                                <Link href="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                                {/* <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                                    Support
                                </a> */}
                            </nav>
                        </div>

                        {/* Connect With Us */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold">Connect With Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-300">contact@ipraydaily.net</span>
                                </div>
                                {/* <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-300">+1 (555) 123-456</span>
                                </div> */}
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-300">Follow us on our socials:</p>
                                <div className="flex space-x-4">
                                    {/* Facebook */}
                                    <a
                                        href="https://facebook.com/ipray_daily"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="w-10 h-10 bg-[#E1E6E833] rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.716-1.796 1.767v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                                        </svg>
                                    </a>

                                    {/* X (Twitter) */}
                                    <a
                                        href="https://x.com/ipray_daily"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="X"
                                        className="w-10 h-10 bg-[#E1E6E833] rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M18.244 2.25h3.308l-7.227 8.257 8.498 11.243H18.2l-6.217-8.238-7.1 8.238H1.571l7.74-8.98L1 2.25h6.009l5.6 7.569 5.635-7.569z" />
                                        </svg>
                                    </a>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700">
                    <div className="max-w-7x px-14 py-6">
                        <p className="text-gray-400 text-left">
                            © 2025 IPray Daily. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
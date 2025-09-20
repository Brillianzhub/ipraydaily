"use client"
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-[#f4fbff] via-[#E0F2FE66] to-[#DBEAFE] shadow-sm border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex cursor-pointer items-center space-x-3">
                    <img src="/ipraylogo.png" alt="logo" className='w-36' />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center">
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 mr-4">
                        <Link href="/about" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
                            About Us
                        </Link>
                        <Link href="/prayers" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
                            Prayers
                        </Link>
                        <Link href="/blog" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
                            Blogs
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
                            Contact
                        </Link>
                    </div>
                    <button className="bg-[#0284C7] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                        Download App
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-600 hover:text-gray-800 p-2"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            // Close icon
                            <X color='white' className='text-white z-50' />
                        ) : (
                            // Hamburger icon
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden absolute top-0 left-0 right-0 bg-[#02355B] text-white shadow-lg border-b border-gray-200 z-50">
                    <div className="px-6 py-4 text-white space-y-4">
                        <Link
                            href="/about"
                            className="block text-white hover:text-gray-800 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/prayers"
                            className="block text-white hover:text-gray-800 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Prayers
                        </Link>
                        <Link
                            href="/blog"
                            className="block text-white hover:text-gray-800 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-white hover:text-gray-800 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                        <div className="pt-4 border-t border-gray-200">
                            <button className="w-full bg-[#0284C7] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                                Download App
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-[#f4fbff] via-[#E0F2FE66] to-[#DBEAFE] shadow-sm border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex cursor-pointer items-center space-x-3">
                    <img src="/ipraylogo.png" alt="logo" className='w-36' />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
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

                {/* Download App Button */}
                <div className="flex items-center">
                    <button className="bg-[#0284C7] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                        Download App
                    </button>
                </div>

                {/* Mobile Menu Button (hidden in original but good to have) */}
                <div className="md:hidden">
                    <button className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

"use client"
import { X, Apple, Smartphone } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        isMac: false
    });

    useEffect(() => {
        // Detect device and OS
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        // Check if mobile device
        const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

        // Check specific OS
        const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
        const isAndroidDevice = /android/i.test(userAgent);
        const isMacDevice = /Mac|Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent) && !isMobileDevice;

        setDeviceInfo({
            isMobile: isMobileDevice,
            isIOS: isIOSDevice,
            isAndroid: isAndroidDevice,
            isMac: isMacDevice
        });
    }, []);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleDownload = () => {
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.brillianzhub.ipray';
        const appStoreUrl = 'https://apps.apple.com/us/app/ipray-daily/id6746961354';

        // Mobile devices: Direct to specific store
        if (deviceInfo.isIOS) {
            window.open(appStoreUrl, '_blank');
        } else if (deviceInfo.isAndroid) {
            window.open(playStoreUrl, '_blank');
        } else if (deviceInfo.isMac) {
            // Mac desktop: Prefer App Store
            window.open(appStoreUrl, '_blank');
        } else {
            // Windows/Linux desktop: Prefer Play Store (Android works with Windows 11)
            window.open(playStoreUrl, '_blank');
        }
    };

    // Render button text based on device
    const getButtonText = () => {
        if (deviceInfo.isIOS) return 'Download on App Store';
        if (deviceInfo.isAndroid) return 'Get it on Google Play';
        if (deviceInfo.isMac) return 'Download App';
        return 'Download App';
    };

    const getButtonIcon = () => {
        if (deviceInfo.isIOS) return <Apple className="w-5 h-5" />;
        if (deviceInfo.isAndroid) return <Smartphone className="w-5 h-5" />;
        return null;
    };

    return (
        <nav className="bg-gradient-to-r sticky top-0 z-50 from-[#f4fbff] via-[#E0F2FE66] to-[#DBEAFE] shadow-sm border-b border-gray-100 px-6 py-4">
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
                    <button
                        onClick={handleDownload}
                        className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center gap-2"
                    >
                        {getButtonIcon()}
                        <span>{getButtonText()}</span>
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
                            <X color='white' className='text-white z-50' />
                        ) : (
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
                            className="block text-white hover:text-gray-300 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/prayers"
                            className="block text-white hover:text-gray-300 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Prayers
                        </Link>
                        <Link
                            href="/blog"
                            className="block text-white hover:text-gray-300 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-white hover:text-gray-300 font-medium transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                        <div className="pt-4 border-t border-gray-700">
                            <button
                                onClick={() => {
                                    handleDownload();
                                    closeMobileMenu();
                                }}
                                className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
                            >
                                {getButtonIcon()}
                                <span>{getButtonText()}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
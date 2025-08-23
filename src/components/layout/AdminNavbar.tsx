/* eslint-disable */

"use client"
import React, { useState } from 'react';
import { Bell, ChevronDown, User, Home } from 'lucide-react';

interface NotificationProps {
    count?: number;
    hasNotifications?: boolean;
}

interface AdminUser {
    name: string;
    avatar?: string;
    role?: string;
    email?: string;
}

interface AdminNavbarProps {
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    notifications?: NotificationProps;
    user?: AdminUser;
    className?: string;
    pageTitle?: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({
    onNotificationClick,
    onProfileClick,
    notifications = { hasNotifications: false, count: 0 },
    user = { name: 'Admin User', email: 'chuksbon6@gmail.com' },
    className = '',
    pageTitle = 'Admin Dashboard'
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleNotificationClick = (): void => {
        if (onNotificationClick) {
            onNotificationClick();
        }
    };

    const handleProfileClick = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
        if (onProfileClick) {
            onProfileClick();
        }
    };

    const getInitials = (name: string): string => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <nav className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
            <div className="flex items-center justify-between">
                {/* Left Section - Page Title */}
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
                </div>

                {/* Right Section - Profile */}
                <div className="flex items-center space-x-4 relative">
                    {/* Profile Section */}
                    <div className="relative">
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center space-x-3 text-sm focus:outline-none hover:bg-gray-50 rounded-lg transition-colors p-2"
                        >
                            {/* Avatar with Initials */}
                            <div className="relative">
                                {user.avatar ? (
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src={user.avatar}
                                        alt={`${user.name} avatar`}
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="text-left">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </div>
                            </div>

                            {/* Dropdown Arrow */}
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <div className="py-1">
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Settings
                                    </button>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default AdminNavbar;
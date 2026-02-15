/* eslint-disable */

"use client"
import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, User, Home } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
    // user?: AdminUser;
    className?: string;
    pageTitle?: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({
    onProfileClick,
    notifications = { hasNotifications: false, count: 0 },
    // user: propUser,
    className = '',
    pageTitle = 'Admin Dashboard'
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<AdminUser>({ name: 'Admin User', email: 'chuksbon6@gmail.com' });
    const router = useRouter();

    // Load user data from cookies on component mount
    useEffect(() => {
        const userData = Cookies.get('user_data');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser({
                    name: parsedUser.first_name || 'Admin User',
                    email: parsedUser.email || '',
                    avatar: parsedUser.avatar || parsedUser.profile_picture,
                    role: parsedUser.role || parsedUser.user_type
                });
            } catch (error) {
                console.error('Error parsing user data from cookies:', error);
                // Keep default user data if parsing fails
            }
        }

        // If user prop is provided, it takes precedence
        // if (propUser) {
        //     setUser(propUser);
        // }
    }, []);

    const handleLogout = (): void => {
        // Clear all auth-related cookies
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_data');

        // Close dropdown
        setIsDropdownOpen(false);

        // Redirect to auth page using Next.js router
        router.push('/auth');
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
                                {user.role && (
                                    <div className="text-xs text-gray-500">
                                        {user.role}
                                    </div>
                                )}
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
                                    {user.role && (
                                        <div className="text-xs text-gray-400 mt-1">{user.role}</div>
                                    )}
                                </div>
                                <div className="py-1">
                                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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
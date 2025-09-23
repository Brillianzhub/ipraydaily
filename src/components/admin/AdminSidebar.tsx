/* eslint-disable */
"use client"
import React, { useState, useEffect } from 'react';
import {
    Home,
    BookOpen,
    Share2,
    Mail,
    Bell,
    Users,
    Settings,
    Menu,
    ChevronLeft
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    badge?: string;
    disabled?: boolean;
}

const AdminSidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('/dashboard');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    const menuItems: MenuItem[] = [
        {
            icon: Home,
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            icon: Share2,
            label: 'Social Media Sharing',
            href: '/dashboard/social'
        },
        {
            icon: BookOpen,
            label: 'Blog Management',
            href: '/dashboard/blog-management',
        },
        {
            icon: Mail,
            label: 'Email Notifications',
            href: '/email-notifications',
            badge: 'Soon',
            disabled: true
        },
        {
            icon: Bell,
            label: 'App Notifications',
            href: '/app-notifications',
            badge: 'Soon',
            disabled: true
        },
        {
            icon: Users,
            label: 'User Management',
            href: '/user-management',
            badge: 'Soon',
            disabled: true
        }
    ];

    const bottomMenuItem: MenuItem = {
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        badge: 'Soon',
        disabled: true
    };

    // Sync activeItem with current pathname
    useEffect(() => {
        setActiveItem(pathname);
    }, [pathname]);

    const handleMenuItemClick = (item: MenuItem): void => {
        if (!item.disabled) {
            setActiveItem(item.href);
            router.push(item.href);
        }
    };

    const isItemActive = (href: string): boolean => {
        return activeItem === href || (href !== '/dashboard' && activeItem.startsWith(href));
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-72'} bg-white h-screen sticky bottom-0 flex flex-col shadow-xl border-r border-gray-200/60 transition-all duration-300 ease-in-out backdrop-blur-sm`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-100/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center overflow-hidden">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                            <img
                                src="/ipray.jpeg"
                                alt="logo"
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="ml-2 transition-all duration-300">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    IprayDaily
                                </h1>
                                <p className="text-sm text-gray-500 mt-0.5">Admin Portal</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        {isCollapsed ? (
                            <Menu className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
                {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-4">
                        Main Menu
                    </h3>
                )}
                <nav className="space-y-2 max-h-[600px] overflow-y-auto">
                    {menuItems.map((item: MenuItem, index: number) => {
                        const Icon = item.icon;
                        const isActive = isItemActive(item.href);
                        const isHovered = hoveredItem === item.href;

                        return (
                            <div key={index} className="relative group">
                                <button
                                    type="button"
                                    onClick={() => handleMenuItemClick(item)}
                                    onMouseEnter={() => setHoveredItem(item.href)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    disabled={item.disabled}
                                    className={`flex items-center w-full p-3 text-left rounded-2xl transition-all duration-300 ease-in-out relative overflow-hidden ${isActive
                                        ? 'text-white shadow-lg'
                                        : item.disabled
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : isHovered
                                                ? 'text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900'
                                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                                    style={isActive ? {
                                        background: `linear-gradient(135deg, #0088DD 0%, #0066BB 100%)`,
                                        boxShadow: `0 10px 15px -3px rgba(0, 136, 221, 0.25), 0 4px 6px -2px rgba(0, 136, 221, 0.05)`
                                    } : isHovered && !item.disabled ? {
                                        background: `linear-gradient(135deg, #f8fafc 0%, rgba(0, 136, 221, 0.05) 100%)`
                                    } : {}}
                                >
                                    {/* Animated background */}
                                    {isHovered && !isActive && !item.disabled && (
                                        <div className="absolute inset-0 rounded-2xl" style={{
                                            background: `linear-gradient(135deg, rgba(0, 136, 221, 0.1) 0%, rgba(0, 102, 187, 0.1) 100%)`
                                        }} />
                                    )}

                                    <div className="flex items-center relative z-10">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-white/20 shadow-inner'
                                            : item.disabled
                                                ? 'bg-transparent'
                                                : isHovered
                                                    ? 'shadow-sm'
                                                    : 'bg-transparent'
                                            }`}
                                            style={isHovered && !isActive && !item.disabled ? {
                                                backgroundColor: 'rgba(0, 136, 221, 0.1)'
                                            } : {}}>
                                            <Icon className={`h-5 w-5 transition-all duration-300 ${isActive
                                                ? 'text-white'
                                                : item.disabled
                                                    ? 'text-gray-300'
                                                    : isHovered
                                                        ? ''
                                                        : 'text-gray-500'
                                                }`}
                                            />
                                        </div>
                                        {!isCollapsed && (
                                            <span className={`font-medium text-base ml-3 transition-all duration-300 ${isActive ? 'text-white' : ''
                                                }`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>

                                    {!isCollapsed && (
                                        <div className="flex items-center space-x-2 relative z-10">
                                            {item.badge && (
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${isActive
                                                    ? 'bg-white/20 text-white shadow-inner'
                                                    : 'bg-orange-100 text-orange-600 border border-orange-200'
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </button>

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                        {item.label}
                                        {item.badge && (
                                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Settings - Fixed at bottom */}
            <div className="border-t border-gray-100/80 p-4 mt-auto backdrop-blur-sm">
                {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                        System
                    </h3>
                )}
                <div className="relative group">
                    <button
                        type="button"
                        onClick={() => handleMenuItemClick(bottomMenuItem)}
                        onMouseEnter={() => setHoveredItem(bottomMenuItem.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        disabled={bottomMenuItem.disabled}
                        className={`flex items-center w-full p-3 text-left rounded-2xl transition-all duration-300 ease-in-out relative overflow-hidden ${bottomMenuItem.disabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : hoveredItem === bottomMenuItem.href
                                ? 'text-gray-900'
                                : 'text-gray-600 hover:text-gray-900'
                            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                        style={hoveredItem === bottomMenuItem.href && !bottomMenuItem.disabled ? {
                            background: `linear-gradient(135deg, #f8fafc 0%, rgba(0, 136, 221, 0.05) 100%)`
                        } : {}}>
                        <div className="flex items-center relative z-10">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${bottomMenuItem.disabled
                                ? 'bg-transparent'
                                : hoveredItem === bottomMenuItem.href
                                    ? 'shadow-sm'
                                    : 'bg-transparent'
                                }`}
                                style={hoveredItem === bottomMenuItem.href && !bottomMenuItem.disabled ? {
                                    backgroundColor: 'rgba(0, 136, 221, 0.1)'
                                } : {}}>
                                <Settings className={`h-5 w-5 transition-all duration-300 ${bottomMenuItem.disabled
                                    ? 'text-gray-300'
                                    : hoveredItem === bottomMenuItem.href
                                        ? ''
                                        : 'text-gray-500'
                                    }`}
                                    style={hoveredItem === bottomMenuItem.href && !bottomMenuItem.disabled ? {
                                        color: '#0088DD'
                                    } : {}} />
                            </div>
                            {!isCollapsed && (
                                <span className="font-medium text-base ml-3">
                                    {bottomMenuItem.label}
                                </span>
                            )}
                        </div>

                        {!isCollapsed && bottomMenuItem.badge && (
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-600 border border-orange-200 relative z-10">
                                {bottomMenuItem.badge}
                            </span>
                        )}
                    </button>

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            {bottomMenuItem.label}
                            {bottomMenuItem.badge && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500 rounded-full">
                                    {bottomMenuItem.badge}
                                </span>
                            )}
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
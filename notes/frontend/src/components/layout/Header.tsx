import {
    Bell,
    ChevronDown,
    Menu,
    Search
} from 'lucide-react';
import { useState } from 'react';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const user = useSelector((state: RootState) => state.authentication.user);
    const loginOrOut = user && user.name !== 'no user' ? true : false;

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </button>

                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden sm:block">
                                Afsar Tanvir Notes
                            </h1>
                        </div>
                    </div>

                    {/* Center Section - Search */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products, orders, customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowUserMenu(false);
                                }}
                                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-800 dark:text-white">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                                New order #1234 received
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                2 minutes ago
                                            </p>
                                        </div>
                                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                                Product stock low: iPhone 15
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                1 hour ago
                                            </p>
                                        </div>
                                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                                Customer review submitted
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                3 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowUserMenu(!showUserMenu);
                                    setShowNotifications(false);
                                }}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white text-sm font-semibold">
                                        User Menu
                                    </span>
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {user ? user.name : 'no user'}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-700 dark:text-gray-200 transition-transform ${
                                        showUserMenu ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-2">
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                            <Link to="/profile">Profile</Link>
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                            Settings
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                            Help Center
                                        </button>
                                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-2 transition-colors">
                                            <Link
                                                to={`/auth/${
                                                    loginOrOut
                                                        ? 'Logout'
                                                        : 'Login'
                                                }`}
                                                className="w-4 h-4"
                                            >
                                                {loginOrOut
                                                    ? 'Logout'
                                                    : 'Login'}
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

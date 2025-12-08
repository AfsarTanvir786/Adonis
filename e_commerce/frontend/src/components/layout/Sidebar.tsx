import { NavLink, useLocation } from 'react-router-dom';
import { X, Home, Package, ShoppingCart, Users, Settings, BarChart3, Tag } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

function Sidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.authentication.user);

    const menuItems = [
        { path: '/home', icon: Home, label: 'Dashboard' },
        { path: '/products', icon: Package, label: 'Products' },
        { path: '/orders', icon: ShoppingCart, label: 'Orders' },
        { path: '/orderItems', icon: ShoppingCart, label: 'order Items' },
        { path: '/customers', icon: Users, label: 'Customers' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/categories', icon: Tag, label: 'Categories' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Overlay for mobile - this prevents the black screen */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 mt-16`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>

                {/* Menu Items */}
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-15 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center gap-3 px-4 py-3 bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-semibold">
                                JD
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                {user?.fullName || 'no user'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email || 'no email'}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
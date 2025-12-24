import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import AppToaster from '../ui/toaster';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Main content area with proper padding and margin */}
        <main className="flex-1 p-6 lg:ml-64 pt-20">
          <Outlet />
          <AppToaster />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

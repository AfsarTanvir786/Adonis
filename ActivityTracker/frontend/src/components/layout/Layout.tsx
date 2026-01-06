import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function Layout() {  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <Outlet />
    </div>
  );
}

export default Layout;

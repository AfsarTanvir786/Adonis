import { Outlet } from 'react-router-dom';

function Layout() {  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </div>
  );
}

export default Layout;

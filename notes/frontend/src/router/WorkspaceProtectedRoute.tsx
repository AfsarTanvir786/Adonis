import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function WorkspaceProtectedRoute() {
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (user.role === 'member') {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

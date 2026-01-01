import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  redirectTo?: string;
  roles?: Array<'admin' | 'employee'>;
};

export default function ProtectedRoute({
  redirectTo = '/unauthorized',
  roles,
}: Props) {
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return <Navigate to={redirectTo} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

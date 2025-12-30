import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import Error404 from '@/components/errors/Error404';
import Unauthorized from '@/components/errors/Unauthorized';
import { authRoutes } from './AuthRoute';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/profile/Profile';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      {authRoutes}

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Error404 title="Could Not Find Page." />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

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
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import UploadImage from '@/pages/upload-image/UploadImage';
import ProtectedRoute from './ProtectedRoute';
import PlanSection from '@/pages/plan-section/PlanSection';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/plans" element={<PlanSection />} />
      {authRoutes}
      <Route element={<ProtectedRoute redirectTo="/unauthorized" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route
        element={<ProtectedRoute redirectTo="/unauthorized" roles={["admin"]} />}
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Error404 title="Could Not Find Page." />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

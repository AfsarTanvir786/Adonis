import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router';
import Layout from '@/components/layout/Layout';
import Error404 from '@/components/errors/Error404';
import { authRoutes } from './AuthRoute';
import Profile from '@/pages/profile/Profile';
import Unauthorized from '@/components/errors/Unauthorized';
import { companyRoutes } from './CompanyRoute';
import { WorkspaceRoutes } from './workspaceRoute';
import { MyNoteRoute } from './MyNoteRoute';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {authRoutes}
            {companyRoutes}
            {WorkspaceRoutes}
            {MyNoteRoute}
            <Route path="/profile" element={<Profile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
                path="*"
                element={<Error404 title="Could Not Find Page." />}
            />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}

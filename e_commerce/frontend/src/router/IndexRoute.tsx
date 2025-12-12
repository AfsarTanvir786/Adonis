import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router';
import Layout from '@/components/layout/Layout';
import Error404 from '@/components/errors/Error404';
import { productRoutes } from './ProductRoute';
import { categoryRoutes } from './CategoryRoute';
import { authRoutes } from './AuthRoute';
import { customerRoutes } from './CustomerRoute';
import { orderRoutes } from './OrderRoute';
import { orderItemRoutes } from './OrderItemRoute';
import Profile from '@/pages/profile/Profile';
import Unauthorized from '@/components/errors/Unauthorized';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {productRoutes}
            {categoryRoutes}
            {authRoutes}
            {orderRoutes}
            {orderItemRoutes}
            {customerRoutes}
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

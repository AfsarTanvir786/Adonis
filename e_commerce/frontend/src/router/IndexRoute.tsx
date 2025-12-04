import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import Layout from '@/components/layout/Layout';
import Error404 from '@/components/errors/Error404';
import { productRoutes } from './ProductRoute';
import { categoryRoutes } from './CategoryRoute';
import { authRoutes } from './AuthRoute';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {productRoutes}
            {categoryRoutes}
            {authRoutes}
            <Route path="*" element={<Error404 title="Could Not Find Page." />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}

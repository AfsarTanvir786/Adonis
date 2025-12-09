import { Route } from 'react-router';
import ProductIndex from '@/pages/products/Index';
import ProductList from '@/pages/products/ProductList';
import ProductCreate from '@/pages/products/ProductCreate';
import ProductEdit from '@/pages/products/ProductEdit';
import ProductDetails from '@/pages/products/ProductDetails';
import Error404 from '@/components/errors/Error404';
import ProductDelete from '@/pages/products/ProductDelete';

export const productRoutes = (
    <Route path="products" element={<ProductIndex />}>
        <Route index element={<ProductList />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="edit/:id" element={<ProductEdit />} />
        <Route path="delete/:id" element={<ProductDelete />} />
        <Route path="details/:id" element={<ProductDetails />} />
        <Route
            path="*"
            element={<Error404 title="Could Not Find Product." />}
        />
    </Route>
);

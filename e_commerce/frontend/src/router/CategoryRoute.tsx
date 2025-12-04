import { Route } from 'react-router';
import CategoryIndex from '@/pages/category/Index';
import CategoryList from '@/pages/category/CategoryList';
import CategoryCreate from '@/pages/category/CategoryCreate';
import CategoryEdit from '@/pages/category/CategoryEdit';
import CategoryDetails from '@/pages/category/CategoryDetails';
import Error404 from '@/components/errors/Error404';

export const categoryRoutes = (
    <Route path="categories" element={<CategoryIndex />}>
        <Route index element={<CategoryList />} />
        <Route path="create" element={<CategoryCreate />} />
        <Route path="edit/:id" element={<CategoryEdit />} />
        <Route path="details/:id" element={<CategoryDetails />} />
        <Route path="*" element={<Error404 title="Could Not Find Category." />} />
    </Route>
);

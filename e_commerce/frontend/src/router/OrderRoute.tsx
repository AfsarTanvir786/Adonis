import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import OrderIndex from '@/pages/orders/Index';
import OrderList from '@/pages/orders/OrderList';
import OrderDetails from '@/pages/orders/OrderDetails';

export const orderRoutes = (
    <Route path="orders" element={<OrderIndex />}>
        <Route index element={<OrderList />} />
        <Route path="details/:id" element={<OrderDetails />} />
        <Route path="*" element={<Error404 title="Could Not Find Order." />} />
    </Route>
);

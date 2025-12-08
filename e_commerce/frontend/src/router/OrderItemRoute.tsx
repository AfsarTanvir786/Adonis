import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import Index from '@/pages/orders/Index';
import OrderItemList from '@/pages/orderItems/OrderItemList';
import OrderItemCreate from '@/pages/orderItems/OrderItemCreate';
import OrderItemEdit from '@/pages/orderItems/OrderItemEdit';
import OrderItemDetails from '@/pages/orderItems/OrderItemDetails';

export const orderItemRoutes = (
    <Route path="orderItems" element={<Index />}>
        <Route index element={<OrderItemList />} />
        <Route path="create" element={<OrderItemCreate />} />
        <Route path="edit/:id" element={<OrderItemEdit />} />
        <Route path="details/:id" element={<OrderItemDetails />} />
        <Route path="*" element={<Error404 title="Could Not Find orderItem." />} />
    </Route>
);

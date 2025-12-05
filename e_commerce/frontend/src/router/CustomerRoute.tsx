import { Route } from 'react-router';
import Index from '@/pages/customers/Index';
import CustomerList from '@/pages/customers/CustomerList';

export const customerRoutes = (
    <Route path="customers" element={<Index />}>
        <Route index element={<CustomerList />} />
    </Route>
);

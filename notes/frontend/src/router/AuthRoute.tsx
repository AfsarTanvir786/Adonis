import { Route } from 'react-router';
import AuthIndex from '@/lib/pages/auth/Index';
import Login from '@/lib/pages/auth/Login';
import Logout from '@/lib/pages/auth/Logout';
import Register from '@/lib/pages/auth/Register';
import ABC from '@/lib/pages/auth/ABC';

export const authRoutes = (
    <Route path="auth" element={<AuthIndex />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="abc" element={<ABC />} />
    </Route>
);

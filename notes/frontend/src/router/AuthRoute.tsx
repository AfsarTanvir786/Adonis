import { Route } from 'react-router';
import AuthIndex from '@/pages/auth/Index';
import Login from '@/pages/auth/Login';
import Logout from '@/pages/auth/Logout';
import Register from '@/pages/auth/Register';
import ABC from '@/pages/auth/ABC';

export const authRoutes = (
    <Route path="auth" element={<AuthIndex />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="abc" element={<ABC />} />
    </Route>
);

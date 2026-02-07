import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from '../pages/dashboard';
import UsersPage from '../pages/users';
import OrdersPage from '../pages/orders';
import LoginPage from '../pages/login';
import useAppStore from '../stores/useAppStore';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAppStore(state => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'orders',
                element: <OrdersPage />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
]);

export default routes;

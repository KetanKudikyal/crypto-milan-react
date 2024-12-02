import '@suiet/wallet-kit/style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import AdminPage from './pages/admin';
import EventDetails from './pages/EventDetails';
import Events from './pages/Events';
import HomePage from './pages/HomePage';
import Provider from './provider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/events',
        element: <Events />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
    {
        path: '/events/:eventId',
        element: <EventDetails />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

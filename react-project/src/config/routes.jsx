import React, { lazy } from 'react';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const Tours = lazy(() => import('../pages/Tours'));
const Wellness = lazy(() => import('../pages/Wellness'));
const Library = lazy(() => import('../pages/Library'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));
const SeedGenerator = lazy(() => import('../pages/SeedGenerator'));
const HeritageExplorer = lazy(() => import('../pages/HeritageExplorer'));
const Contact = lazy(() => import('../pages/Contact'));
const Monetization = lazy(() => import('../pages/Monetization'));
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const routes = [
    { path: '/', element: <Home />, exact: true },
    { path: '/explore', element: <Explore /> },
    { path: '/tours', element: <Tours /> },
    { path: '/wellness', element: <Wellness /> },
    { path: '/heritage-map', element: <HeritageExplorer /> },
    { path: '/library', element: <Library /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },
    { path: '/monetization', element: <Monetization /> },
    { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/tools/sql-seed-generator', element: <SeedGenerator /> },
    { path: '*', element: <Home /> }, // Fallback route
];

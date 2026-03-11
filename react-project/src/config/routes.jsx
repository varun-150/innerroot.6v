import React from 'react';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Tours from '../pages/Tours';
import Wellness from '../pages/Wellness';
import Library from '../pages/Library';
import Community from '../pages/Community';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Subscription from '../pages/Subscription';
import SeedGenerator from '../pages/SeedGenerator';
import HeritageExplorer from '../pages/HeritageExplorer';
import Contact from '../pages/Contact';
import Monetization from '../pages/Monetization';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const routes = [
    { path: '/', element: <Home />, exact: true },
    { path: '/explore', element: <Explore /> },
    { path: '/tours', element: <Tours /> },
    { path: '/wellness', element: <Wellness /> },
    { path: '/heritage-map', element: <HeritageExplorer /> },
    { path: '/library', element: <Library /> },
    { path: '/community', element: <Community /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },
    { path: '/monetization', element: <Monetization /> },
    { path: '/subscription', element: <Subscription /> },
    { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/tools/sql-seed-generator', element: <SeedGenerator /> },
    { path: '*', element: <Home /> }, // Fallback route
];

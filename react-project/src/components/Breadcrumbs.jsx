import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[var(--muted)]">
                <li>
                    <Link to="/" className="flex items-center hover:text-[var(--accent)] transition-colors">
                        <Home className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                            {last ? (
                                <span className="font-semibold text-[var(--fg)] capitalize">
                                    {value.replace(/-/g, ' ')}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-[var(--accent)] transition-colors capitalize">
                                    {value.replace(/-/g, ' ')}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;

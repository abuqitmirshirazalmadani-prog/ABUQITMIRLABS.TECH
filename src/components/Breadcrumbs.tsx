import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    name: string;
    to?: string;
}

interface BreadcrumbsProps {
    customItems?: BreadcrumbItem[];
}

const Breadcrumbs = ({ customItems }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (location.pathname === '/' && !customItems) return null;

    const items: BreadcrumbItem[] = customItems || [
        { name: 'HQ', to: '/' },
        ...pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const name = value.replace(/-/g, ' ');
            return { name, to };
        })
    ];

    return (
        <nav className="absolute top-24 left-0 right-0 z-40 px-6 md:px-10 py-4 pointer-events-none" aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-auto">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isHome = index === 0 && item.to === '/';

                    return (
                        <div key={index} className="flex items-center gap-2">
                            {index > 0 && <ChevronRight size={10} strokeWidth={3} className="text-zinc-800" />}
                            {isLast ? (
                                <span className="text-[#ff5b36] truncate max-w-[200px] md:max-w-none text-wrap" title={item.name}>
                                    {item.name}
                                </span>
                            ) : (
                                <Link to={item.to || '#'} className="text-zinc-600 hover:text-[#ff5b36] transition-colors flex items-center gap-1.5 shrink-0">
                                    {isHome && <Home size={12} strokeWidth={3} />}
                                    <span>{item.name}</span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumbs;

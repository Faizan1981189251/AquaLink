import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, Search, Package, User, BarChart3, TrendingUp, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  userType: 'customer' | 'supplier';
}

export default function Layout({ children, userType }: LayoutProps) {
  const location = useLocation();

  const customerTabs = [
    { path: '/', icon: Droplets, label: 'Home' },
    { path: '/suppliers', icon: Search, label: 'Suppliers' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const supplierTabs = [
    { path: '/supplier/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/supplier/orders', icon: Package, label: 'Orders' },
    { path: '/supplier/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/supplier/settings', icon: Settings, label: 'Settings' },
  ];

  const tabs = userType === 'supplier' ? supplierTabs : customerTabs;

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      
      <nav className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-around">
          {tabs.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
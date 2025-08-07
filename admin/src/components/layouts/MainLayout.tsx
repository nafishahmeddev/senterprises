import { useState } from 'react';
import {
  XMarkIcon,
  Squares2X2Icon,
  DocumentIcon,
  KeyIcon,
  CogIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Header from './partials/Header';
import { Link, Outlet } from '@tanstack/react-router';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items type
  interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    current: boolean;
  }

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: Squares2X2Icon, current: true },
    { name: 'Passports', href: '/passports', icon: DocumentIcon, current: false },
    { name: 'Access', href: '/access', icon: KeyIcon, current: false },
    { name: 'Settings', href: '/settings', icon: CogIcon, current: false },
  ];

  // Header callbacks
  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const userMenuActions = [
    { label: "Account Settings", href: "#" },
    { label: "Password Management", href: "#" },
    { isDivider: true },
    {
      label: "Sign out",
      onClick: () => {
        console.log('Sign out clicked');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 bg-indigo-600 flex-shrink-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xl">A</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-white font-semibold text-lg">Admin Panel</h1>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 [&.active]:bg-indigo-50 [&.active]:text-indigo-600`}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: 'active'
                }}
                children={({ isActive }) => (
                  <>
                    <item.icon className={`mr-3 flex-shrink-0 w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                    {item.name}
                  </>
                )}
              />
            ))}
          </div>
        </nav>

        {/* User section at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <UserCircleIcon className="text-gray-400 w-8 h-8" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          onNotificationClick={handleNotificationClick}
          user={{ name: "John Doe", role: "Administrator" }}
          userMenuActions={userMenuActions}
          notificationCount={3}
        />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState } from 'react';
import Header from './partials/Header';
import { Link, Outlet } from '@tanstack/react-router';

// Icon component type
interface IconProps {
  className?: string;
}

// Mock Heroicons - you can replace these with actual @heroicons/react imports
const XIcon = ({ className }: IconProps) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DashboardIcon = ({ className }: IconProps) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
  </svg>
);

const PassportIcon = ({ className }: IconProps) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AccessIcon = ({ className }: IconProps) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const CogIcon = ({ className }: IconProps) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UserCircleIcon = ({ className }: IconProps) => (
  <svg className={className || "w-8 h-8"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items type
  interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<IconProps>;
    current: boolean;
  }

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: DashboardIcon, current: true },
    { name: 'Passports', href: '/passports', icon: PassportIcon, current: false },
    { name: 'Access', href: '/access', icon: AccessIcon, current: false },
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
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
            <XIcon className="w-6 h-6" />
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
                  className:'active'
                }}
                children={({isActive}) => (
                  <>
                    <item.icon className={`mr-3 flex-shrink-0 w-5 h-5 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

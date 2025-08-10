import { useState } from 'react';
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// Types
interface UserMenuAction {
  label?: string;
  href?: string;
  onClick?: () => void;
  isDivider?: boolean;
}

interface User {
  name: string;
  avatar?: string;
  role?: string;
}

interface HeaderProps {
  showNotifications?: boolean;
  notificationCount?: number;
  user?: User;
  userMenuActions?: UserMenuAction[];
  onMenuToggle?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

export default function Header({
  showNotifications = true,
  notificationCount = 0,
  user = { name: "John Doe", role: "Administrator" },
  userMenuActions = [
    { label: "Profile", href: "#" },
    { label: "Settings", href: "#" },
    { isDivider: true },
    { label: "Sign out", href: "#" }
  ],
  onMenuToggle,
  onNotificationClick,
  className = ""
}: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuAction = (action: UserMenuAction) => {
    if (action.onClick) {
      action.onClick();
    }
    setUserMenuOpen(false);
  };

  const handleMenuToggle = () => {
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 flex-shrink-0 ${className}`}>
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Menu button - visible on all screen sizes */}
          {onMenuToggle && (
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              title="Toggle menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {showNotifications && (
            <button 
              onClick={handleNotificationClick}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative"
            >
              <BellIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          )}

          {/* User menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8" />
                )}
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {/* User info */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    {user.role && (
                      <p className="text-xs text-gray-500">{user.role}</p>
                    )}
                  </div>
                  
                  {/* Menu actions */}
                  {userMenuActions.map((action, index) => (
                    action.isDivider ? (
                      <div key={index} className="border-t border-gray-100 my-1" />
                    ) : (
                      <button
                        key={index}
                        onClick={() => handleUserMenuAction(action)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {action.label}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  );
}

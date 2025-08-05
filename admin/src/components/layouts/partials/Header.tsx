import { useState } from 'react';

// Icon component type
interface IconProps {
  className?: string;
}

// Header Icons
const MenuIcon = ({ className }: IconProps) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const BellIcon = ({ className }: IconProps) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserCircleIcon = ({ className }: IconProps) => (
  <svg className={className || "w-8 h-8"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronDownIcon = ({ className }: IconProps) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

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
          {/* Mobile menu button */}
          {onMenuToggle && (
            <button
              onClick={handleMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <MenuIcon className="w-6 h-6" />
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

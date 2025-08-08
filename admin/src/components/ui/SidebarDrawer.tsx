import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface SidebarDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  width?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  title,
  children,
  width = 'lg'
}: SidebarDrawerProps) {
  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  if (!isOpen) return null

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full ${widthClasses[width]} transform transition-transform ease-in-out duration-300`}>
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

import { createLazyFileRoute } from '@tanstack/react-router'
import {
  PlusIcon,
  KeyIcon,
  CogIcon,
} from '@heroicons/react/24/outline'
import { Fragment } from 'react/jsx-runtime'

export const Route = createLazyFileRoute('/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Fragment>
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your system.</p>
    </div>

    {/* Content area */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                <PlusIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Add New Passport</span>
            </div>
          </button>
          <button className="w-full text-left p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mr-3">
                <KeyIcon className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Manage Access</span>
            </div>
          </button>
          <button className="w-full text-left p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                <CogIcon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">System Settings</span>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">System started successfully</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New passport document added</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Access permissions updated</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">System backup completed</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* System Status */}
    <div className="mt-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">All systems operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">Database connected</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">Security active</span>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
}

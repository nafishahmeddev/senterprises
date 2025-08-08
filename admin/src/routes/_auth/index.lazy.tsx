import { createLazyFileRoute } from '@tanstack/react-router'
import {
  DocumentIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import { Fragment } from 'react/jsx-runtime'

export const Route = createLazyFileRoute('/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate  = Route.useNavigate()
  return <Fragment>
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your system.</p>
    </div>

    {/* Content area */}
    <div className="max-w-4xl">
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Passports Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors" onClick={()=>navigate({to: "/passports"})}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <DocumentIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Passports</h3>
            </div>
            <p className="text-gray-600 mb-4">
              View, edit, and organize all passport documents in one centralized location.
            </p>
            <div className="text-sm text-indigo-600 font-medium">
              Access Management →
            </div>
          </div>

          {/* Manage Access Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors" onClick={()=>navigate({to: "/access"})}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <KeyIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Access</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Control user permissions and secure access to sensitive passport information.
            </p>
            <div className="text-sm text-green-600 font-medium">
              Security Controls →
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">System Overview</h3>
          <p className="text-gray-600 mb-6">
            Enterprise-grade passport management system designed for efficiency and security.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">Secure</div>
              <div className="text-sm text-gray-500">Data Protection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">Available</div>
              <div className="text-sm text-gray-500">24/7 Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Scalable</div>
              <div className="text-sm text-gray-500">Enterprise Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
}

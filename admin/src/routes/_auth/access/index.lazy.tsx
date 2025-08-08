import { createLazyFileRoute } from '@tanstack/react-router'
import { ClockIcon } from '@heroicons/react/24/outline'

export const Route = createLazyFileRoute('/_auth/access/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Password Manager</h1>
        <p className="text-gray-600 mt-2">Secure password management system coming soon.</p>
      </div>

      {/* Content area */}
      <div className="max-w-4xl">
        {/* Coming Soon Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Status</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <ClockIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
            </div>
            <p className="text-gray-600 mb-4">
              We're building a secure password management system. Store and organize all your passwords safely in one place.
            </p>
            <div className="text-sm text-blue-600 font-medium">
              Development in Progress →
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Planned Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Secure password storage</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Password generator</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Multi-device sync</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-700">Team sharing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

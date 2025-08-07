import {
  DocumentIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type { Passport } from '../../types/passport'

interface PassportViewModalProps {
  isOpen: boolean
  passport: Passport | undefined
  onClose: () => void
  onEdit: () => void
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function PassportViewModal({ isOpen, passport, onClose, onEdit }: PassportViewModalProps) {
  if (!isOpen || !passport) return undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-50" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {passport.first_name} {passport.last_name}
              </h2>
              <p className="text-sm text-gray-500">Passport Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-gray-500 uppercase">Passport Number</label>
              <p className="font-mono text-sm">{passport.passport_number}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">MOFA Number</label>
              <p className="font-mono text-sm">{passport.mofa_no}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Date of Birth</label>
              <p className="text-sm">{formatDate(passport.date_of_birth)}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Issue Date</label>
              <p className="text-sm">{formatDate(passport.issue_date)}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Company</label>
              <p className="text-sm">{passport.company}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Agent</label>
              <p className="text-sm">{passport.agent}</p>
            </div>
          </div>

          {/* Files */}
          {passport.files && passport.files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Attached Files</h3>
              <div className="space-y-2">
                {passport.files.map((file) => (
                  <div key={file.passport_file_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <DocumentIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {file.file_url.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.file_type?.toUpperCase()} • {file.file_size}
                        </p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Fields */}
          {passport.custom_fields && passport.custom_fields.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h3>
              <div className="space-y-2">
                {passport.custom_fields.map((field) => (
                  <div key={field.passport_field_id} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">{field.name}</span>
                    <span className="text-sm text-gray-900">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

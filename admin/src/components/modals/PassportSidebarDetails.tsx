import { PencilIcon, DocumentIcon, PlusIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Formatter from '@app/lib/formatter'
import { useQuery } from '@tanstack/react-query'
import PassportApi from '@app/services/passport'
import SidebarDrawer from '../ui/SidebarDrawer'
import { Fragment } from 'react'

function LoadingComponent({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }
  return <Fragment>{children}</Fragment>
}

type PassportSidebarDetailsProps = FormDialogState<Passport> & {
  onEdit: () => void,
  onClose: () => void
}

export default function PassportSidebarDetails({ open, record, onEdit, onClose }: PassportSidebarDetailsProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["admin", "passports", record?.passport_id],
    queryFn: () => PassportApi.get(Number(record?.passport_id)),
    enabled: !!record?.passport_id,
  })

  const passport = data?.result.passport;
  const files = data?.result.files || [];
  const fields = data?.result.fields || [];

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes('pdf')) return '📄';
    if (fileType?.includes('image')) return '🖼️';
    if (fileType?.includes('document')) return '📝';
    return '📁';
  };

  const formatFileSize = (sizeInBytes: string) => {
    const bytes = parseInt(sizeInBytes);
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };


  return (
    <SidebarDrawer isOpen={open} onClose={onClose} title={`Passport Details: ${record?.passport_number}`} width="xl">
      <LoadingComponent isLoading={isFetching}>
        {passport ? (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-semibold text-blue-600">{files.length}</div>
                <div className="text-sm text-blue-600">Files Attached</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-semibold text-green-600">{fields.length}</div>
                <div className="text-sm text-green-600">Custom Fields</div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {passport.first_name} {passport.last_name}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Formatter.date(passport.date_of_birth)}
                  </dd>
                </div>

                {passport.father_name && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Father's Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.father_name}</dd>
                  </div>
                )}

                {passport.mother_name && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Mother's Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.mother_name}</dd>
                  </div>
                )}

                {passport.contact && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.contact}</dd>
                  </div>
                )}

                {passport.address && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.address}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Passport Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Passport Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Passport Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono">
                    {passport.passport_number}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Formatter.date(passport.issue_date)}
                  </dd>
                </div>

                {passport.mofa_no && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">MOFA Number</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">
                      {passport.mofa_no}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Employment Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Employment Information</h3>
              <dl className="space-y-4">
                {passport.company && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Company</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.company}</dd>
                  </div>
                )}

                {passport.office && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Office</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.office}</dd>
                  </div>
                )}

                {passport.agent && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Agent</dt>
                    <dd className="mt-1 text-sm text-gray-900">{passport.agent}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Files */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Attached Files</h3>
                <button
                  onClick={() => console.log('Add file')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add File
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.passport_file_id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {getFileIcon(file.file_type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.file_url.split('/').pop()}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{formatFileSize(file.file_size)}</span>
                        <span className="mx-1">•</span>
                        <span>Type {file.file_type}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => console.log('View file', file.passport_file_id)}
                        className="p-1 text-gray-400 hover:text-indigo-600 rounded"
                        title="View file"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Download file', file.passport_file_id)}
                        className="p-1 text-gray-400 hover:text-green-600 rounded"
                        title="Download file"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Delete file', file.passport_file_id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete file"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {files.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-3 text-sm text-gray-500">No files attached</p>
                    <p className="mt-1 text-xs text-gray-400">Drag and drop files here, or click to browse</p>
                    <button
                      onClick={() => console.log('Upload first file')}
                      className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Choose Files
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Fields */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Additional Fields</h3>
                <button
                  onClick={() => console.log('Add field')}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add Field
                </button>
              </div>

              <dl className="space-y-4">
                {fields.map((field) => (
                  <div key={field.passport_field_id} className="group">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-500">{field.name}</dt>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => console.log('Edit field', field.passport_field_id)}
                          className="p-1 text-gray-400 hover:text-indigo-600 rounded"
                          title="Edit field"
                        >
                          <PencilIcon className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Delete field', field.passport_field_id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded"
                          title="Delete field"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <dd className="mt-1 text-sm text-gray-900">{field.value}</dd>
                  </div>
                ))}

                {fields.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="mx-auto h-8 w-8 text-gray-400 flex items-center justify-center">
                      📝
                    </div>
                    <p className="mt-2 text-sm text-gray-500">No additional fields</p>
                    <button
                      onClick={() => console.log('Add first field')}
                      className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Add your first field
                    </button>
                  </div>
                )}
              </dl>
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Record Information</h3>
              <p className="text-xs text-gray-400">
                Upload Date: {Formatter.date(passport.upload_date)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No passport details available.</p>
          </div>
        )}
      </LoadingComponent>
    </SidebarDrawer>
  )
}

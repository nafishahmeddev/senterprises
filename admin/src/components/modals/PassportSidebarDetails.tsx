import { PencilIcon, DocumentIcon, PlusIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Formatter from '@app/lib/formatter'
import { useQuery } from '@tanstack/react-query'
import PassportApi from '@app/services/passport'
import SidebarDrawer from '../ui/SidebarDrawer'
import LoadingComponent from '../LoadingComponent'
import { useState } from 'react'
import PassportFieldDialog from './PassportFieldDialog'
import PassportFileDialog from './PassportFileDialog'


function FilesSection({ passport_id }: { passport_id: number }) {
  const [fileFormDialog, setFileFormDialog] = useState<FormDialogState<{ file: PassportFile | undefined, passport_id: number }>>({
    open: false,
    record: undefined
  });

  const { data } = useQuery({
    queryKey: ["admin", "passports", passport_id, "files"],
    queryFn: () => PassportApi.getAllFiles(Number(passport_id)),
    enabled: !!passport_id,
  })

  const files: PassportFile[] = data?.result.files || [];
  
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

  const handleDeleteFile = async (file: PassportFile) => {
    if (window.confirm(`Are you sure you want to delete "${file.file_url.split('/').pop()}"?`)) {
      try {
        await PassportApi.deleteFile(passport_id, file.passport_file_id)
        // The query will automatically refetch due to the mutation
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Attached Files</h3>
        <button
          onClick={() => {
            setFileFormDialog({
              open: true,
              record: {
                passport_id: passport_id,
                file: undefined
              }
            });
          }}
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
                className="p-1 text-gray-400 hover:text-indigo-600 rounded bg-amber-50"
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
                onClick={() => handleDeleteFile(file)}
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
              onClick={() => {
                setFileFormDialog({
                  open: true,
                  record: {
                    passport_id: passport_id,
                    file: undefined
                  }
                });
              }}
              className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Choose Files
            </button>
          </div>
        )}
      </div>

      {/* File Dialog */}
      <PassportFileDialog
        open={fileFormDialog.open}
        record={fileFormDialog.record}
        onClose={() => {
          setFileFormDialog({
            open: false,
            record: undefined
          });
        }}
        onSubmit={() => {}}
      />
    </div>
  )
}

function FieldsSection({ passport_id }: { passport_id: number }) {
  const [fieldFormDialog, setFieldFormDialog] = useState<FormDialogState<{ field: PassportField | undefined, passport_id: number }>>({
    open: false,
    record: undefined
  });

  const { data } = useQuery({
    queryKey: ["admin", "passports", passport_id, "fields"],
    queryFn: () => PassportApi.getAllFields(Number(passport_id)),
    enabled: !!passport_id,
  })

  const fields: PassportField[] = data?.result.fields || [];


  const handleDeleteField = async (field: PassportField) => {
    if (window.confirm(`Are you sure you want to delete the field "${field.name}"?`)) {
      try {
        await PassportApi.deleteField(passport_id, field.passport_field_id)
        // The query will automatically refetch due to the mutation
      } catch (error) {
        console.error('Error deleting field:', error)
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Additional Fields</h3>
        <button
          onClick={() => {
            setFieldFormDialog({
              open: true, record: {
                passport_id: passport_id,
                field: undefined
              }
            });
          }}
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
                  onClick={() => {
                    setFieldFormDialog({
                      open: true,
                      record: {
                        passport_id: passport_id,
                        field: field
                      }
                    });
                  }}
                  className="p-1 text-gray-400 hover:text-indigo-600 rounded"
                  title="Edit field"
                >
                  <PencilIcon className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDeleteField(field)}
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
              onClick={() => {
                setFieldFormDialog({
                  open: true,
                  record: {
                    passport_id: passport_id,
                    field: undefined
                  }
                });
              }}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Add your first field
            </button>
          </div>
        )}
      </dl>

      {/* Field Dialog */}
      <PassportFieldDialog
        {...fieldFormDialog}
        onClose={() => {
          setFieldFormDialog({ open: false, record: undefined });
        }}
        onSubmit={() => { }}
      />
    </div>
  )
}

type PassportSidebarDetailsProps = FormDialogState<number> & {
  onEdit: () => void,
  onClose: () => void
}

export default function PassportSidebarDetails({ open, record: passport_id, onEdit, onClose }: PassportSidebarDetailsProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["admin", "passports", passport_id],
    queryFn: () => PassportApi.get(Number(passport_id)),
    enabled: !!passport_id,
  })

  const passport = data?.result.passport;
  return (
    <SidebarDrawer isOpen={open} onClose={onClose} title={`Passport Details`} width="xl">
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


            <FilesSection passport_id={passport.passport_id} />


            {/* Custom Fields */}
            <FieldsSection passport_id={passport.passport_id} />

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

import { createLazyFileRoute } from '@tanstack/react-router'
import { Fragment, useState } from 'react'

export const Route = createLazyFileRoute('/_auth/passports/')({
  component: RouteComponent,
})

// Icon components
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const FileIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

// Supporting table interfaces
interface PassportFile {
  passport_file_id: number
  file_url: string
  passport_id: number
  file_size?: string
  file_type?: string
}

interface PassportField {
  passport_field_id: number
  name: string
  value: string
  passport_id: number
  upload_date: string
}

// Passport interface based on the database schema
interface Passport {
  passport_id: number
  first_name: string
  last_name: string
  date_of_birth: string
  issue_date: string
  agent: string
  office: string
  company: string
  upload_date: string
  mofa_no: string
  father_name: string
  mother_name: string
  address: string
  passport_number: string
  contact: string
  files?: PassportFile[]
  custom_fields?: PassportField[]
}

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPassport, setSelectedPassport] = useState<Passport | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view')

  // Mock data - replace with actual API call
  const mockPassports: Passport[] = [
    {
      passport_id: 1,
      first_name: "John",
      last_name: "Doe",
      date_of_birth: "1990-05-15",
      issue_date: "2023-01-10",
      agent: "Agent Smith",
      office: "Dubai Office",
      company: "ABC Company",
      upload_date: "2023-01-15",
      mofa_no: "MOF123456",
      father_name: "Robert Doe",
      mother_name: "Mary Doe",
      address: "123 Main Street, City, Country",
      passport_number: "AB1234567",
      contact: "1234567890",
      files: [
        { passport_file_id: 1, file_url: "/uploads/passport1.pdf", passport_id: 1, file_size: "2.5MB", file_type: "pdf" },
        { passport_file_id: 2, file_url: "/uploads/photo1.jpg", passport_id: 1, file_size: "1.2MB", file_type: "jpg" }
      ],
      custom_fields: [
        { passport_field_id: 1, name: "VISA NUMBER", value: "85415", passport_id: 1, upload_date: "2023-01-15" },
        { passport_field_id: 2, name: "Emergency Contact", value: "Jane Doe - 9876543210", passport_id: 1, upload_date: "2023-01-15" }
      ]
    },
    {
      passport_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      date_of_birth: "1985-08-22",
      issue_date: "2023-02-20",
      agent: "Agent Johnson",
      office: "Abu Dhabi Office",
      company: "XYZ Corporation",
      upload_date: "2023-02-25",
      mofa_no: "MOF789012",
      father_name: "William Smith",
      mother_name: "Sarah Smith",
      address: "456 Oak Avenue, Town, Country",
      passport_number: "CD7890123",
      contact: "0987654321",
      files: [
        { passport_file_id: 3, file_url: "/uploads/passport2.pdf", passport_id: 2, file_size: "3.1MB", file_type: "pdf" }
      ],
      custom_fields: [
        { passport_field_id: 3, name: "Medical Certificate", value: "Valid until 2024-12-31", passport_id: 2, upload_date: "2023-02-25" }
      ]
    }
  ]

  const filteredPassports = mockPassports.filter(passport =>
    `${passport.first_name} ${passport.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passport.passport_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passport.mofa_no.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openModal = (mode: 'view' | 'add' | 'edit', passport?: Passport) => {
    setModalMode(mode)
    setSelectedPassport(passport || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPassport(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Passports</h1>
            <p className="text-gray-600 mt-2">Manage passport documents and information</p>
          </div>
          <button
            onClick={() => openModal('add')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add New Passport
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, passport number, or MOFA number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Passports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passport Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MOFA Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPassports.map((passport) => (
                <tr key={passport.passport_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {passport.first_name} {passport.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Born: {formatDate(passport.date_of_birth)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {passport.passport_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {passport.mofa_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{passport.company}</div>
                    <div className="text-sm text-gray-500">{passport.office}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(passport.issue_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {passport.agent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openModal('view', passport)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                        title="View Details"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={() => openModal('edit', passport)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => console.log('Delete', passport.passport_id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPassports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchTerm ? 'No passports found matching your search.' : 'No passports available.'}
            </div>
          </div>
        )}
      </div>

      {/* Simple Modal for View/Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            
            {modalMode === 'view' ? (
              // VIEW MODE - Simple Details
              <>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedPassport?.first_name} {selectedPassport?.last_name}
                      </h2>
                      <p className="text-sm text-gray-500">Passport Details</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Passport Number</label>
                      <p className="font-mono text-sm">{selectedPassport?.passport_number}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">MOFA Number</label>
                      <p className="font-mono text-sm">{selectedPassport?.mofa_no}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Date of Birth</label>
                      <p className="text-sm">{formatDate(selectedPassport?.date_of_birth || '')}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Issue Date</label>
                      <p className="text-sm">{formatDate(selectedPassport?.issue_date || '')}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Company</label>
                      <p className="text-sm">{selectedPassport?.company}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase">Agent</label>
                      <p className="text-sm">{selectedPassport?.agent}</p>
                    </div>
                  </div>

                  {/* Files */}
                  {selectedPassport?.files && selectedPassport.files.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Attached Files</h3>
                      <div className="space-y-2">
                        {selectedPassport.files.map((file) => (
                          <div key={file.passport_file_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <FileIcon className="w-5 h-5 text-gray-400 mr-3" />
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
                              <DownloadIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Fields */}
                  {selectedPassport?.custom_fields && selectedPassport.custom_fields.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h3>
                      <div className="space-y-2">
                        {selectedPassport.custom_fields.map((field) => (
                          <div key={field.passport_field_id} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-600">{field.name}</span>
                            <span className="text-sm text-gray-900">{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => selectedPassport && openModal('edit', selectedPassport)}
                      className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // FORM MODE - Simple Form
              <>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      {modalMode === 'add' ? 'Add Passport' : 'Edit Passport'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <form className="space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.first_name || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.last_name || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.passport_number || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">MOFA Number *</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.mofa_no || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          defaultValue={selectedPassport?.date_of_birth || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                        <input
                          type="date"
                          defaultValue={selectedPassport?.issue_date || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.company || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                        <input
                          type="text"
                          defaultValue={selectedPassport?.agent || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                      <input
                        type="tel"
                        defaultValue={selectedPassport?.contact || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        defaultValue={selectedPassport?.address || ''}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Files</label>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">PDF, Images, Documents accepted</p>
                    </div>

                    {/* Dynamic Custom Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Fields</label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Field name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            placeholder="Field value"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <button
                          type="button"
                          className="text-sm text-indigo-600 hover:text-indigo-700"
                        >
                          + Add another field
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log(`${modalMode === 'add' ? 'Adding' : 'Updating'} passport`)
                        closeModal()
                      }}
                      className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      {modalMode === 'add' ? 'Add Passport' : 'Update Passport'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

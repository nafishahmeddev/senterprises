import { createLazyFileRoute } from '@tanstack/react-router'
import { Fragment, useState } from 'react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import type { Passport } from '../../../types/passport'
import PassportViewModal from '../../../components/modals/PassportViewModal'
import PassportFormModal from '../../../components/modals/PassportFormModal'

export const Route = createLazyFileRoute('/_auth/passports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPassport, setSelectedPassport] = useState<Passport | undefined>(undefined)
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
    setSelectedPassport(passport)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPassport(undefined)
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
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', passport)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log('Delete', passport.passport_id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
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
            className="absolute inset-0 bg-gray-900/50 bg-opacity-50" 
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            
            {modalMode === 'view' ? (
              // VIEW MODE - Simple Details
              <PassportViewModal isOpen={isModalOpen} onClose={closeModal} passport={selectedPassport} onEdit={() => openModal('edit', selectedPassport)} />
            ) : (
              // FORM MODE - Simple Form
              <PassportFormModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                mode={modalMode} 
                passport={selectedPassport} 
                onSubmit={(passport) => {
                  console.log(`${modalMode === 'add' ? 'Adding' : 'Updating'} passport`, passport)
                  closeModal()
                }}
              />
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

import { createLazyFileRoute } from '@tanstack/react-router'
import { Fragment, useState } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import PassportViewModal from '../../../components/modals/PassportViewModal'
import PassportFormModal from '../../../components/modals/PassportFormModal'
import DataTable, { type Column } from '../../../components/ui/DataTable'
import SearchInput from '../../../components/ui/SearchInput'
import usePaginateState from '@app/hooks/usePaginatedState'
import z from 'zod'
import { useQuery } from '@tanstack/react-query'
import PassportApi from '@app/services/passport'

export const Route = createLazyFileRoute('/_auth/passports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPassport, setSelectedPassport] = useState<Passport | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view')

  const schema = z.object({
    keyword: z.string().optional(),
  })
  const { state, form, setPagination } = usePaginateState<z.infer<typeof schema>, Passport>({
    initialFilter: { keyword: '' },
    initialSort: { field: 'first_name', direction: 'asc' },
    initialPagination: { page: 1, limit: 10 },
    validationSchema: schema,
  })

  // Fetch passports based on search term
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "passports", state],
    queryFn: async () => PassportApi.all({
      keyword: searchTerm,
      page: state.pagination.page,
      limit: state.pagination.limit,
    }),
  })

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

  // Define columns for the DataTable
  const columns: Column<Passport>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (passport) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {passport.first_name} {passport.last_name}
          </div>
          <div className="text-sm text-gray-500">
            Born: {formatDate(passport.date_of_birth)}
          </div>
        </div>
      ),
    },
    {
      key: 'passport_number',
      header: 'Passport Number',
      accessor: 'passport_number',
      className: 'text-sm text-gray-900',
    },
    {
      key: 'mofa_no',
      header: 'MOFA Number',
      accessor: 'mofa_no',
      className: 'text-sm text-gray-900',
    },
    {
      key: 'company',
      header: 'Company',
      render: (passport) => (
        <div>
          <div className="text-sm text-gray-900">{passport.company}</div>
          <div className="text-sm text-gray-500">{passport.office}</div>
        </div>
      ),
    },
    {
      key: 'issue_date',
      header: 'Issue Date',
      render: (passport) => (
        <span className="text-sm text-gray-900">
          {formatDate(passport.issue_date)}
        </span>
      ),
    },
    {
      key: 'agent',
      header: 'Agent',
      accessor: 'agent',
      className: 'text-sm text-gray-900',
    },
    {
      key: 'actions',
      header: 'Actions',
      headerClassName: 'text-right',
      className: 'text-right text-sm font-medium',
      render: (passport) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              openModal('view', passport)
            }}
            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              openModal('edit', passport)
            }}
            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
            title="Edit"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Delete', passport.passport_id)
            }}
            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

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
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, passport number, or MOFA number..."
            className="flex-1"
            showButton={true}
            buttonText="Search"
            loading={isLoading}
            onSubmit={form.handleSubmit}
          />
        </div>
      </div>

      {/* Passports DataTable */}
      <DataTable
        data={data?.result.records || []}
        columns={columns}
        loading={isLoading}
        pagination={data ? {
          page: state.pagination.page,
          limit: state.pagination.limit,
          pages: data.result.pages,
        } : undefined}
        onPaginationChange={setPagination}
        emptyMessage={searchTerm ? `No passports found matching "${searchTerm}".` : "No passports available."}
        keyExtractor={(passport) => passport.passport_id.toString()}
      />

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

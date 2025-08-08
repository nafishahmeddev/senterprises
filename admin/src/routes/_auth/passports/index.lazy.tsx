import { createLazyFileRoute } from '@tanstack/react-router'
import { Fragment, useState } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import DataTable, { type Column } from '../../../components/ui/DataTable'
import AdvancedSearchInput, { type SearchField } from '../../../components/ui/AdvancedSearchInput'
import PassportSidebarDetails from '../../../components/modals/PassportSidebarDetails'
import usePaginateState from '@app/hooks/usePaginatedState'
import z from 'zod'
import { useQuery } from '@tanstack/react-query'
import PassportApi from '@app/services/passport'
import Formatter from '@app/lib/formatter'
import PassportFormDialog from '@app/components/modals/PassportFormDialog'

export const Route = createLazyFileRoute('/_auth/passports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [sidebarDialog, setSidebarDialog] = useState<FormDialogState<Passport>>({ open: false })
  const [formDialog, setFormDialog] = useState<FormDialogState<Passport | undefined>>({ open: false, })

  const schema = z.object({
    keyword: z.string().optional(),
  })
  const { state, form, setPagination } = usePaginateState<z.infer<typeof schema>, Passport>({
    initialFilter: { keyword: '' },
    initialSort: { field: 'first_name', direction: 'asc' },
    initialPagination: { page: 1, limit: 10 },
    validationSchema: schema,
  })

  // Search configuration
  const searchFields: SearchField[] = [
    {
      key: 'keyword',
      label: 'Search Passports',
      placeholder: 'Enter passport number, name, etc.',
      type: 'text',
      value: form.getFieldValue('keyword') || '',
      onChange: (value) => {
        setPagination({ page: 1, limit: state.pagination.limit })
        form.setFieldValue('keyword', value)
      },
    },
    // Future advanced search fields can be added here:
    // {
    //   key: 'company',
    //   label: 'Company',
    //   placeholder: 'Filter by company...',
    //   type: 'text',
    //   value: '',
    //   onChange: (value) => console.log('Company filter:', value),
    // },
    // {
    //   key: 'agent',
    //   label: 'Agent',
    //   placeholder: 'Filter by agent...',
    //   type: 'text',
    //   value: '',
    //   onChange: (value) => console.log('Agent filter:', value),
    // },
  ]

  // Fetch passports based on search term
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "passports", state],
    queryFn: async () => PassportApi.all({
      keyword: state.filter.keyword || '', // Use actual keyword from state
      page: state.pagination.page,
      limit: state.pagination.limit,
    }),
  })


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
            Born: {Formatter.date(passport.date_of_birth)}
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
          {Formatter.date(passport.issue_date)}
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
              setSidebarDialog({
                open: true,
                record: passport,
              })
            }}
            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFormDialog({
                open: true,
                record: passport,
              })
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
            onClick={() => setFormDialog({ open: true, record: undefined })}
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
          <AdvancedSearchInput
            fields={searchFields}
            onSubmit={form.handleSubmit}
            loading={isLoading}
            className="flex-1"
            buttonText="Filter"
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
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
          pages: data.result.count > 0 ? Math.ceil(data.result.count / state.pagination.limit) : 1,
        } : undefined}
        onPaginationChange={setPagination}
        emptyMessage={state.filter.keyword ? `No passports found matching "${state.filter.keyword}".` : "No passports available."}
        keyExtractor={(passport) => passport.passport_id.toString()}
        onRowClick={(passport) => setSidebarDialog({ open: true, record: passport })}
        rowClassName="cursor-pointer hover:bg-gray-50"
      />



      {/* Sidebar Drawer for Passport Details */}

      <PassportSidebarDetails
        {...sidebarDialog}
        onClose={() => setSidebarDialog({ open: false })}
        onEdit={() => {
          setFormDialog({ open: true, record: sidebarDialog.record })
          setSidebarDialog({ open: false })
        }}
      />

      {/* Form Dialog for Creating/Editing Passport */}
      <PassportFormDialog
        {...formDialog}
        onClose={() => setFormDialog({ open: false, record: undefined })}
        onSubmit={(passport) => {
          if (!formDialog.record) {
            setSidebarDialog({ open: true, record: passport })
          }
          setFormDialog({ open: false, record: undefined })
        }}
      />

    </Fragment>
  )
}

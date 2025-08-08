import { Fragment, type ReactNode } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

// Generic types for the DataTable component
export interface Column<T> {
  key: string
  header: string
  accessor?: keyof T | ((item: T) => ReactNode)
  render?: (item: T, value: unknown) => ReactNode
  sortable?: boolean
  className?: string
  headerClassName?: string
}

export interface PaginationInfo {
  page: number
  limit: number
  pages: number
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pagination?: PaginationInfo
  onPaginationChange?: (pagination: { page: number; limit: number }) => void
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  rowClassName?: string | ((item: T) => string)
  keyExtractor: (item: T) => string | number
}

export default function DataTable<T>({
  data,
  columns,
  pagination,
  onPaginationChange,
  loading = false,
  emptyMessage = 'No data available.',
  onRowClick,
  rowClassName = '',
  keyExtractor,
}: DataTableProps<T>) {
  
  const getCellValue = (item: T, column: Column<T>) => {
    if (column.accessor) {
      if (typeof column.accessor === 'function') {
        return column.accessor(item)
      }
      return item[column.accessor]
    }
    return ''
  }

  const renderCell = (item: T, column: Column<T>): ReactNode => {
    const value = getCellValue(item, column)
    
    if (column.render) {
      return column.render(item, value)
    }
    
    // Handle primitive values that can be rendered directly
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value)
    }
    
    // Handle null/undefined
    if (value == null) {
      return ''
    }
    
    // For other types, try to convert to string
    return String(value)
  }

  const getRowClassName = (item: T) => {
    const baseClass = 'hover:bg-gray-50'
    const clickableClass = onRowClick ? 'cursor-pointer' : ''
    
    if (typeof rowClassName === 'function') {
      return `${baseClass} ${clickableClass} ${rowClassName(item)}`
    }
    
    return `${baseClass} ${clickableClass} ${rowClassName}`
  }

  return (
    <Fragment>
      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.headerClassName || ''
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-2 text-gray-500">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      {emptyMessage}
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    className={getRowClassName(item)}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && data.length > 0 && onPaginationChange && (
        <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg">
          {/* Mobile pagination */}
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPaginationChange({
                page: Math.max(1, pagination.page - 1),
                limit: pagination.limit
              })}
              disabled={pagination.page <= 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPaginationChange({
                page: pagination.page + 1,
                limit: pagination.limit
              })}
              disabled={pagination.page >= pagination.pages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {/* Desktop pagination */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.limit,
                    (pagination.page - 1) * pagination.limit + data.length
                  )}
                </span>{' '}
                of{' '}
                <span className="font-medium">
                  {pagination.pages * pagination.limit}
                </span>{' '}
                results (Page {pagination.page} of {pagination.pages})
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Items per page selector */}
              <div className="flex items-center space-x-2">
                <label htmlFor="limit" className="text-sm text-gray-700">
                  Show:
                </label>
                <select
                  id="limit"
                  value={pagination.limit}
                  onChange={(e) => onPaginationChange({
                    page: 1,
                    limit: parseInt(e.target.value)
                  })}
                  className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Page navigation */}
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous button */}
                <button
                  onClick={() => onPaginationChange({
                    page: Math.max(1, pagination.page - 1),
                    limit: pagination.limit
                  })}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Page numbers */}
                {(() => {
                  const currentPage = pagination.page
                  const totalPages = pagination.pages
                  const pages = []
                  
                  // Calculate page range to show
                  let startPage = Math.max(1, currentPage - 2)
                  let endPage = Math.min(totalPages, currentPage + 2)
                  
                  // Adjust range if we're near the beginning or end
                  if (endPage - startPage < 4) {
                    if (startPage === 1) {
                      endPage = Math.min(totalPages, startPage + 4)
                    } else if (endPage === totalPages) {
                      startPage = Math.max(1, endPage - 4)
                    }
                  }

                  // Show first page if not in range
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => onPaginationChange({ page: 1, limit: pagination.limit })}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        1
                      </button>
                    )
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      )
                    }
                  }

                  // Show page range
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => onPaginationChange({ page: i, limit: pagination.limit })}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          i === currentPage
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i}
                      </button>
                    )
                  }

                  // Show last page if not in range
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="ellipsis2" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      )
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => onPaginationChange({ page: totalPages, limit: pagination.limit })}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {totalPages}
                      </button>
                    )
                  }

                  return pages
                })()}

                {/* Next button */}
                <button
                  onClick={() => onPaginationChange({
                    page: pagination.page + 1,
                    limit: pagination.limit
                  })}
                  disabled={pagination.page >= pagination.pages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

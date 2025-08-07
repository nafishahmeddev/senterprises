import { useState } from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

export interface SearchField {
  key: string
  label: string
  placeholder?: string
  type?: 'text' | 'select' | 'date'
  options?: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
}

export interface AdvancedSearchProps {
  fields: SearchField[]
  onSubmit?: () => void
  loading?: boolean
  className?: string
  buttonText?: string
  showAdvanced?: boolean
  onToggleAdvanced?: () => void
}

export default function AdvancedSearchInput({
  fields,
  onSubmit,
  loading = false,
  className = "",
  buttonText = "Search",
  showAdvanced = false,
  onToggleAdvanced,
}: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(showAdvanced)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  const handleFieldChange = (fieldKey: string, value: string) => {
    const field = fields.find(f => f.key === fieldKey)
    field?.onChange?.(value)
  }

  const clearField = (fieldKey: string) => {
    const field = fields.find(f => f.key === fieldKey)
    field?.onChange?.('')
  }

  const clearAllFields = () => {
    fields.forEach(field => {
      field.onChange?.('')
    })
  }

  const hasAnyValue = fields.some(field => field.value && field.value.trim() !== '')
  const primaryField = fields[0] // First field is the primary search
  const additionalFields = fields.slice(1) // Rest are advanced fields

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    onToggleAdvanced?.()
  }

  const renderField = (field: SearchField, isPrimary = false) => {
    const value = field.value || ''
    
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.key} className={`relative ${isPrimary ? 'flex-1' : ''}`}>
          <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <select
            id={field.key}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <div key={field.key} className={`relative ${isPrimary ? 'flex-1' : ''}`}>
        {!isPrimary && (
          <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
        )}
        <div className="relative">
          {isPrimary && (
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
          <input
            id={field.key}
            type={field.type || 'text'}
            placeholder={field.placeholder || `Search by ${field.label.toLowerCase()}...`}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className={`w-full border border-gray-300 rounded-md py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              isPrimary ? 'pl-10 pr-4' : 'px-3'
            }`}
          />
          {value && (
            <button
              type="button"
              onClick={() => clearField(field.key)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Primary Search Row */}
        <div className="flex gap-2">
          {primaryField && renderField(primaryField, true)}
          
          {/* Advanced Toggle Button */}
          {additionalFields.length > 0 && (
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Advanced
              <ChevronDownIcon 
                className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          )}
          
          {/* Search Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                {buttonText}
              </>
            )}
          </button>
        </div>

        {/* Advanced Search Fields */}
        {isExpanded && additionalFields.length > 0 && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFields.map((field) => renderField(field))}
            </div>
            
            {/* Clear All Button */}
            {hasAnyValue && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={clearAllFields}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </form>

      {/* Active Filters Display */}
      {hasAnyValue && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {fields
              .filter((field) => field.value && field.value.trim() !== '')
              .map((field) => (
                <span
                  key={field.key}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {field.label}: {field.value}
                  <button
                    type="button"
                    onClick={() => clearField(field.key)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

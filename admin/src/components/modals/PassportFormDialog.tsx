import PassportApi from '@app/services/passport'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import z from 'zod'

type PassportFormDialogProps = FormDialogState<Passport | undefined> & {
  onClose: () => void
  onSubmit: (data: Passport) => void
}

export default function PassportFormDialog({ open, record, onClose, onSubmit }: PassportFormDialogProps) {
  const mutation = useMutation({
    mutationFn: (values: Partial<Passport>) => {
      const promise = record ? PassportApi.update(record.passport_id, values) : PassportApi.create(values);
      return promise;
    },
    onSuccess: (data) => {
      onSubmit(data.result.passport);
      onClose();
      toast.success(`Passport ${record ? 'updated' : 'created'} successfully!`);
    },
    onError: (error) => {
      console.error("Error submitting passport form:", error);
      toast.error("Failed to submit passport form.");
    }
  })
  const { Field, handleSubmit } = useForm({
    defaultValues: record || {
      first_name: '',
      last_name: '',
      passport_number: '',
      mofa_no: '',
      date_of_birth: '',
      issue_date: '',
      company: '',
      agent: '',
      contact: '',
      address: '',
    },
    validators: {
      onChange: z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        passport_number: z.string().min(1, "Passport number is required"),
        mofa_no: z.string().min(1, "MOFA number is required"),
        date_of_birth: z.string().min(1, "Date of birth is required"),
        issue_date: z.string().min(1, "Issue date is required"),
        company: z.string(),
        agent: z.string(),
        contact: z.string(),
        address: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    }
  })

  return createPortal(
    <dialog open={open} className="modal">
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
              <h2 className="text-xl font-bold text-gray-900">
                {record ? 'Edit Passport' : 'Add Passport'}
              </h2>
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
            <form className="space-y-4">
              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <Field name="first_name">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="last_name">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field name="passport_number">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="mofa_no">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MOFA Number *</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field name="date_of_birth">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="issue_date">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                      <input
                        type="date"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field name="company">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="agent">
                  {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                      <input
                        type="text"
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <Field name="contact">
                {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <input
                      type="tel"
                      name={name}
                      value={value || ''}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>

              <Field name="address">
                {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name={name}
                      value={value || ''}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{meta.errors.join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 mt-4">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {record ? 'Update Passport' : 'Add Passport'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
    , document.body)
}

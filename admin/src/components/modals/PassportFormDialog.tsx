import PassportApi from '@app/services/passport'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import z from 'zod'
import LoadingComponent from '../LoadingComponent'
import { useEffect } from 'react'
import Dialog from '../ui/Dialog'

type PassportFormDialogProps = FormDialogState<number | undefined> & {
  onClose: () => void
  onSubmit: (passport_id: number) => void
}

export default function PassportFormDialog({ open, record: passport_id, onClose, onSubmit }: PassportFormDialogProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["admin", "passports", passport_id],
    queryFn: () => PassportApi.get(Number(passport_id)),
    enabled: !!passport_id,
  })
  const mutation = useMutation({
    mutationFn: (values: Partial<Passport>) => {
      const promise = passport_id ? PassportApi.update(passport_id, values) : PassportApi.create(values);
      return promise;
    },
    onSuccess: (data) => {
      onSubmit(data.result.passport_id);
      onClose();
      toast.success(`Passport ${passport_id ? 'updated' : 'created'} successfully!`);
    },
    onError: (error) => {
      console.error("Error submitting passport form:", error);
      toast.error("Failed to submit passport form.");
    }
  })
  const { Field, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: data?.result.passport.first_name || '',
      last_name: data?.result.passport.last_name || '',
      passport_number: data?.result.passport.passport_number || '',
      mofa_no: data?.result.passport.mofa_no || '',
      date_of_birth: data?.result.passport.date_of_birth || '',
      issue_date: data?.result.passport.issue_date || '',
      father_name: data?.result.passport.father_name || '',
      mother_name: data?.result.passport.mother_name || '',
      company: data?.result.passport.company || '',
      agent: data?.result.passport.agent || '',
      office: data?.result.passport.office || '',
      contact: data?.result.passport.contact || '',
      address: data?.result.passport.address || '',
    },
    validators: {
      onChange: z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        passport_number: z.string().min(1, "Passport number is required"),
        mofa_no: z.string(),
        date_of_birth: z.string().min(1, "Date of birth is required"),
        issue_date: z.string().min(1, "Issue date is required"),
        father_name: z.string(),
        mother_name: z.string(),
        company: z.string(),
        agent: z.string(),
        office: z.string(),
        contact: z.string(),
        address: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    }
  })

  useEffect(() => {
    reset();
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [open, reset])

  return (
    <Dialog isOpen={open} onClose={onClose} title={passport_id ? "Edit Passport" : "Add Passport"}>
      <LoadingComponent isLoading={isFetching || mutation.isPending}>
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
            </div>

            {/* Parent Names */}
            <div className="grid grid-cols-2 gap-4">
              <Field name="father_name">
                {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                    <input
                      type="text"
                      name={name}
                      value={value || ''}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="mother_name">
                {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                    <input
                      type="text"
                      name={name}
                      value={value || ''}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
              <Field name="office">
                {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office</label>
                    <input
                      type="text"
                      name={name}
                      value={value || ''}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                      <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                    )}
                  </div>
                )}
              </Field>
              <div>


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
              </div>
            </div>


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
        <div className="p-6 border-t bg-gray-50 mt-4 border-gray-200">
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
              {passport_id ? 'Update Passport' : 'Add Passport'}
            </button>
          </div>
        </div>
      </LoadingComponent>
    </Dialog>
  )
}

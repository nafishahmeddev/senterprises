import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import z from 'zod'
import LoadingComponent from '../LoadingComponent'
import { useEffect } from 'react'
import Dialog from '../ui/Dialog'
import PassportApi from '@app/services/passport'

type PassportFieldDialogProps = FormDialogState<{
  passport_id: number
  field: PassportField | undefined
}> & {
  onClose: () => void
  onSubmit: () => void
}

export default function PassportFieldDialog({ open, record, onClose, onSubmit }: PassportFieldDialogProps) {
  const passport_id = record?.passport_id;
  const field = record?.field || undefined;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { name: string; value: string }) => {
      const fieldData = field 
        ? { ...values, passport_field_id: field.passport_field_id }
        : values;
      return PassportApi.upsertField(Number(passport_id), fieldData);
    },
    onSuccess: () => {
      onSubmit();
      onClose();
      toast.success(`Field ${field ? 'updated' : 'created'} successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["admin", "passports", passport_id, "fields"]
      });
    },
    onError: (error) => {
      console.error("Error submitting field:", error);
      toast.error("Failed to submit field.");
    }
  })

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: {
      name: field?.name || '',
      value: field?.value || '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Field name is required"),
        value: z.string().min(1, "Field value is required"),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    }
  })

  useEffect(() => {
    reset();
  }, [open, field, reset])

  return (
    <Dialog 
      isOpen={open} 
      onClose={onClose} 
      title={field ? "Edit Custom Field" : "Add Custom Field"}
      size="md"
    >
      <LoadingComponent isLoading={mutation.isPending}>
        {/* Content */}
        <div className="p-6">
          <form className="space-y-4">
            <Field name="name">
              {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Name *
                  </label>
                  <input
                    type="text"
                    disabled={!!field}
                    name={name}
                    value={value || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="e.g., Emergency Contact, Blood Type, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {meta.errors.map(error => error?.message).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </Field>

            <Field name="value">
              {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Value *
                  </label>
                  <textarea
                    name={name}
                    value={value || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    rows={3}
                    placeholder="Enter the field value..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {meta.errors.map(error => error?.message).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </Field>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {field ? 'Update Field' : 'Add Field'}
            </button>
          </div>
        </div>
      </LoadingComponent>
    </Dialog>
  )
}

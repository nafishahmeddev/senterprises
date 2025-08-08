import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoadingComponent from '../LoadingComponent'
import { useEffect, useState } from 'react'
import Dialog from '../ui/Dialog'
import PassportApi from '@app/services/passport'

type PassportFileDialogProps = {
  open: boolean
  record?: {
    passport_id: number
  }
  onClose: () => void
  onSubmit: () => void
}

export default function PassportFileDialog({ open, record, onClose, onSubmit }: PassportFileDialogProps) {
  const queryClient = useQueryClient();
  const passport_id = record?.passport_id;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: (file: File) => {
      return PassportApi.uploadFile(Number(passport_id), file);
    },
    onSuccess: () => {
      onSubmit();
      onClose();
      toast.success('File uploaded successfully!');
      queryClient.invalidateQueries({
        queryKey: ["admin", "passports", passport_id, "files"],
      });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.");
    }
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  const handleSubmit = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile);
    } else {
      toast.error("Please select a file to upload.");
    }
  }

  useEffect(() => {
    setSelectedFile(null);
  }, [open])

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      title={"Upload File"}
      size="md"
    >
      <LoadingComponent isLoading={mutation.isPending}>
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select File *
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
              </p>
            </div>

            {selectedFile && (
              <div className="p-3 border border-gray-200 rounded-lg bg-green-50">
                <p className="text-sm font-medium text-green-900">
                  Selected: {selectedFile.name}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Size: {Math.round(selectedFile.size / 1024)} KB
                </p>
              </div>
            )}
          </div>
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
              disabled={mutation.isPending || !selectedFile}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload File
            </button>
          </div>
        </div>
      </LoadingComponent>
    </Dialog>
  )
}

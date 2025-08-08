import { useState } from 'react'

export interface FileViewerFile {
  url: string
  name: string
  type: string
  size?: string | number
}

export interface UseFileViewerReturn {
  isOpen: boolean
  file: FileViewerFile | null
  openViewer: (file: FileViewerFile) => void
  closeViewer: () => void
}

export function useFileViewer(): UseFileViewerReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<FileViewerFile | null>(null)

  const openViewer = (fileToView: FileViewerFile) => {
    setFile(fileToView)
    setIsOpen(true)
  }

  const closeViewer = () => {
    setIsOpen(false)
    // Delay clearing the file to allow for closing animation
    setTimeout(() => {
      setFile(null)
    }, 300)
  }

  return {
    isOpen,
    file,
    openViewer,
    closeViewer
  }
}

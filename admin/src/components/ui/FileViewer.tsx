import { useState } from 'react'
import { XMarkIcon, ArrowDownTrayIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'

export interface FileViewerProps {
  isOpen: boolean
  onClose: () => void
  file: {
    url: string
    name: string
    type: string
    size?: string | number
  }
  downloadUrl?: string
}

export default function FileViewer({ isOpen, onClose, file, downloadUrl }: FileViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [error, setError] = useState(false)

  if (!isOpen) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = downloadUrl || file.url
    link.download = file.name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25))
  }

  const resetZoom = () => {
    setZoom(100)
  }

  const getFileType = () => {
    const fileType = file.type.toLowerCase()
    const fileName = file.name.toLowerCase()
    
    if (fileType.includes('pdf') || fileName.endsWith('.pdf')) return 'pdf'
    if (fileType.includes('image') || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)) return 'image'
    if (fileType.includes('video') || /\.(mp4|avi|mov|wmv|flv|webm)$/i.test(fileName)) return 'video'
    if (fileType.includes('audio') || /\.(mp3|wav|ogg|aac|flac)$/i.test(fileName)) return 'audio'
    if (fileType.includes('text') || /\.(txt|csv|log)$/i.test(fileName)) return 'text'
    if (/\.(doc|docx|rtf)$/i.test(fileName)) return 'document'
    if (/\.(xls|xlsx|csv)$/i.test(fileName)) return 'spreadsheet'
    if (/\.(ppt|pptx)$/i.test(fileName)) return 'presentation'
    
    return 'unknown'
  }

  const formatFileSize = (size: string | number) => {
    if (!size) return ''
    const bytes = typeof size === 'string' ? parseInt(size) : size
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }
    return `${Math.round(bytes / 1024)} KB`
  }

  const renderFileContent = () => {
    const fileType = getFileType()

    switch (fileType) {
      case 'pdf':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={`${file.url}#zoom=${zoom}`}
              className="w-full h-full border-0"
              title={file.name}
              onError={() => setError(true)}
            />
          </div>
        )

      case 'image':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-auto">
            <img
              src={file.url}
              alt={file.name}
              style={{ transform: `scale(${zoom / 100})` }}
              className="max-w-none transition-transform duration-200"
              onError={() => setError(true)}
            />
          </div>
        )

      case 'video':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <video
              src={file.url}
              controls
              className="max-w-full max-h-full"
              style={{ transform: `scale(${zoom / 100})` }}
              onError={() => setError(true)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )

      case 'audio':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                {file.size && (
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                )}
              </div>
              <audio
                src={file.url}
                controls
                className="w-full max-w-md"
                onError={() => setError(true)}
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="w-full h-full p-6 overflow-auto">
            <iframe
              src={file.url}
              className="w-full h-full border-0 bg-white"
              title={file.name}
              onError={() => setError(true)}
            />
          </div>
        )

      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">📄</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{file.name}</h3>
              {file.size && (
                <p className="text-sm text-gray-500 mb-4">{formatFileSize(file.size)}</p>
              )}
              <p className="text-gray-600 mb-6">
                This file type cannot be previewed directly.
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download to View
              </button>
            </div>
          </div>
        )
    }
  }

  const showZoomControls = ['pdf', 'image', 'video'].includes(getFileType())

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XMarkIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load File</h3>
            <p className="text-gray-600 mb-6">
              The file could not be loaded. It may be corrupted or in an unsupported format.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Download File
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-white font-medium truncate max-w-md">{file.name}</h2>
            {file.size && (
              <span className="text-gray-300 text-sm">{formatFileSize(file.size)}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            {showZoomControls && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <MagnifyingGlassMinusIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-3 py-1 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors text-sm"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <MagnifyingGlassPlusIcon className="h-5 w-5" />
                </button>
                <div className="w-px h-6 bg-gray-600 mx-2" />
              </>
            )}
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Download"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 pt-16">
        {renderFileContent()}
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  )
}

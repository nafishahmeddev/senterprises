import FileViewer from './FileViewer'
import { useFileViewer } from '@app/hooks/useFileViewer'

// Example usage component
export default function FileViewerExample() {
  const { isOpen, file, openViewer, closeViewer } = useFileViewer()

  const sampleFiles = [
    {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      name: 'Sample Document.pdf',
      type: 'application/pdf',
      size: '245760'
    },
    {
      url: 'https://via.placeholder.com/800x600/0066CC/FFFFFF?text=Sample+Image',
      name: 'Sample Image.png',
      type: 'image/png', 
      size: '102400'
    },
    {
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      name: 'Sample Video.mp4',
      type: 'video/mp4',
      size: '1048576'
    }
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Universal File Viewer Example</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleFiles.map((file, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{file.name}</h3>
            <p className="text-sm text-gray-600 mb-3">
              Type: {file.type}
              <br />
              Size: {Math.round(parseInt(file.size) / 1024)} KB
            </p>
            <button
              onClick={() => openViewer(file)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              View File
            </button>
          </div>
        ))}
      </div>

      <FileViewer
        isOpen={isOpen}
        onClose={closeViewer}
        file={file || { url: '', name: '', type: '' }}
      />
    </div>
  )
}

/*
Usage in any component:

import FileViewer from '@app/components/ui/FileViewer'
import { useFileViewer } from '@app/hooks/useFileViewer'

function MyComponent() {
  const { isOpen, file, openViewer, closeViewer } = useFileViewer()

  const handleViewFile = () => {
    openViewer({
      url: 'https://example.com/file.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: '245760' // optional
    })
  }

  return (
    <div>
      <button onClick={handleViewFile}>View File</button>
      
      <FileViewer
        isOpen={isOpen}
        onClose={closeViewer}
        file={file || { url: '', name: '', type: '' }}
        downloadUrl="https://example.com/download/file.pdf" // optional custom download URL
      />
    </div>
  )
}
*/

export default function PendingComponent() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}

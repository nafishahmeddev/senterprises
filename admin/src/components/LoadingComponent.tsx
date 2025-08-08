import { Fragment } from "react"

interface LoadingComponentProps {
  isLoading: boolean
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  text?: string
  overlay?: boolean
}

export default function LoadingComponent({ 
  isLoading, 
  children, 
  size = 'md', 
  text = 'Loading...', 
  overlay = false 
}: LoadingComponentProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  if (isLoading) {
    const loadingContent = (
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Spinner */}
        <div className={`${sizeClasses[size]} animate-spin`}>
          <svg 
            className="w-full h-full text-indigo-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        
        {/* Loading text */}
        <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </span>
      </div>
    )

    if (overlay) {
      return (
        <div className="relative">
          {children}
          <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
            {loadingContent}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center h-full min-h-[200px] p-8">
        {loadingContent}
      </div>
    )
  }
  
  return <Fragment>{children}</Fragment>
}
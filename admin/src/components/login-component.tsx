import { useState } from 'react'
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import AuthApi from '@app/services/auth'
import toast from 'react-hot-toast'


export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false)

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onChange: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(2, "Password must be at least 2 characters long"),
        rememberMe: z.boolean(),
      })
    },
    onSubmit: async ({ value }) => AuthApi.login({
      email: value.email,
      password: value.password,
      remember: value.rememberMe,
    }).then(() => {
      toast.success("Login successful!")
    }).catch((error) => {
      console.error("Login failed:", error)
      toast.error("Login failed. Please check your credentials and try again.")
    }),
  })



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center bg-indigo-100 rounded-full">
            <div className="text-2xl font-bold text-indigo-600">SE</div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to{' '}
            <span className="font-medium text-indigo-600">S Enterprises</span>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}>
          <div className="space-y-4">
            {/* Email Field */}
            <Field name="email">
              {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name={name}
                      type="email"
                      autoComplete="email"
                      required
                      value={value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${meta.errors.length > 0 ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                  )}
                </div>
              )}
            </Field>

            {/* Password Field */}
            <Field name="password">
              {({ name, state: { value, meta }, handleChange, handleBlur }) => (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name={name}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      className={`appearance-none relative block w-full pl-10 pr-10 py-3 border placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${meta.errors.length > 0 ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">{meta.errors.map(error => error?.message).join(', ')}</p>
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            {/* Remember Me */}
            <Field name="rememberMe">
              {({ name, state: { value }, handleChange }) => (
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name={name}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleChange(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              )}
            </Field>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Subscribe>
              {({ isSubmitting }) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              )}
            </Subscribe>
          </div>

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Contact administrator
              </a>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Secure Login</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                SSL Encrypted
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                Secure Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Usage example:
// <LoginComponent 
//   onLogin={(credentials) => console.log('Login attempt:', credentials)}
//   isLoading={false}
//   error=""
// />

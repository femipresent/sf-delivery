import React, { useState } from 'react';
import { ShieldCheckIcon, EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const AdminLogin = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      // Mock authentication for admin (replace with real API call)
      const admin_emails = ['admin@example.com', 'superadmin@sfdelivery.ng'];

      if (admin_emails.includes(email)) {
        onLoginSuccess('admin');
      } else {
        setError('Invalid admin credentials. Please use a valid admin email.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-blue-500 bg-white flex items-center justify-center">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">S&F Delivery</h1>
          <p className="text-gray-600 mt-2">Admin Portal</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Admin Login</h2>
              <button
                type="button"
                onClick={onBack}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ×
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <ExclamationCircleIcon className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-red-800">{error}</p>
              </div>
            )}

            {/* Demo credentials info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-1">Demo Admin Credentials:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p>Email: <span className="font-mono">admin@example.com</span></p>
                <p>Email: <span className="font-mono">superadmin@sfdelivery.ng</span></p>
                <p>Password: <span className="font-mono">any password</span></p>
              </div>
            </div>

            {/* Email input */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Admin Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login to Admin Portal'
              )}
            </button>

            {/* Remember me */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center mx-auto"
            >
              <ArrowLeftIcon className="w-3 h-3 mr-1" />
              Back to main site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

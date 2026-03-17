import React, { useState } from 'react';
import { TruckIcon, UserGroupIcon, EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Login = ({ onLoginSuccess, onBack }) => {
  const { login } = useAuth();
  const [userType, setUserType] = useState(null); // 'shipper', 'driver', or 'dispatcher'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Demo accounts (hardcoded)
  const demoAccounts = {
    shipper: ['shipper@example.com', 'oluwafemi@sfdelivery.ng'],
    driver: ['driver@example.com', 'john@sfdelivery.ng'],
    dispatcher: ['dispatcher@example.com', 'manager@sfdelivery.ng']
  };

  // Get registered emails from localStorage
  const getRegisteredEmails = (type) => {
    const registeredUsers = localStorage.getItem('sf_registered_users');
    if (registeredUsers) {
      try {
        const users = JSON.parse(registeredUsers);
        return users
          .filter(user => user.userType === type)
          .map(user => user.email.toLowerCase());
      } catch (e) {
        console.error('Error parsing registered users:', e);
      }
    }
    return [];
  };

  // Check if email is registered
  const isEmailRegistered = (userEmail, type) => {
    const registeredEmails = getRegisteredEmails(type);
    const demoEmails = demoAccounts[type] || [];
    return registeredEmails.includes(userEmail.toLowerCase()) || demoEmails.includes(userEmail.toLowerCase());
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetError('');
    
    if (!email.trim()) {
      setResetError('Please enter your email address first');
      return;
    }

    // Check if email is registered
    if (!isEmailRegistered(email, userType)) {
      setResetError("Can't find account with this email. Please sign up first.");
      return;
    }

    // Simulate sending OTP
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 800);
  };

  // Handle OTP verification and password reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetError('');

    if (!otp.trim()) {
      setResetError('Please enter the OTP sent to your email');
      return;
    }

    if (otp !== '123456') {
      setResetError('Invalid OTP. Please try again or request a new one.');
      return;
    }

    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    // Simulate password reset
    setLoading(true);
    setTimeout(() => {
      setResetSuccess(true);
      setLoading(false);
    }, 800);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setError('');
    setEmail('');
    setPassword('');
    setShowForgotPassword(false);
    setOtpSent(false);
    setResetError('');
    setResetSuccess(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    const result = await login(userType, { email, password });

    if (result.success) {
      onLoginSuccess(userType, result.data);
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const handleBack = () => {
    setUserType(null);
    setError('');
    setEmail('');
    setPassword('');
    setShowForgotPassword(false);
    setOtpSent(false);
    setResetError('');
    setResetSuccess(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setOtpSent(false);
    setResetError('');
    setResetSuccess(false);
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!userType) {
    // User type selection screen
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-green-500 bg-white flex items-center justify-center">
                <TruckIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">S&F Delivery</h1>
            <p className="text-gray-600 mt-2">Logistics Management Platform</p>
          </div>

          {/* Login type selection */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Select Login Type</h2>
                <button
                  onClick={() => onBack && onBack()}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                  ← Back to Home
                </button>
              </div>

              {/* Shipper option */}
              <button
                onClick={() => handleUserTypeSelect('shipper')}
                className="w-full mb-3 p-4 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-md group-hover:bg-green-200 transition-colors">
                      <UserGroupIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-semibold text-gray-900 text-sm">Shipper Account</p>
                      <p className="text-xs text-gray-500">Manage shipments and bookings</p>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold text-sm">→</div>
                </div>
              </button>

              {/* Driver option */}
              <button
                onClick={() => handleUserTypeSelect('driver')}
                className="w-full mb-3 p-4 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-md group-hover:bg-red-200 transition-colors">
                      <TruckIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-semibold text-gray-900 text-sm">Driver Account</p>
                      <p className="text-xs text-gray-500">View assigned jobs and deliveries</p>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold text-sm">→</div>
                </div>
              </button>

              {/* Dispatcher option */}
              <button
                onClick={() => handleUserTypeSelect('dispatcher')}
                className="w-full mb-3 p-4 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-md group-hover:bg-purple-200 transition-colors">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-semibold text-gray-900 text-sm">Dispatcher Account</p>
                      <p className="text-xs text-gray-500">Manage fleet and operations</p>
                    </div>
                  </div>
                  <div className="text-purple-600 font-bold text-sm">→</div>
                </div>
              </button>


            </div>

            {/* Footer info */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Select your account type to continue to the login page
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login form screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-lg border-2 border-green-500 bg-white hover:bg-green-50 transition-colors"
          >
            <TruckIcon className="w-8 h-8 text-green-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">S&F Delivery</h1>
          <p className="text-gray-600 mt-2">
            {userType === 'shipper' ? 'Shipper' : userType === 'driver' ? 'Driver' : userType === 'dispatcher' ? 'Dispatcher' : 'User'} Login
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
              <button
                type="button"
                onClick={handleBack}
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



            {/* Email input */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                userType === 'shipper'
                  ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white'
                  : userType === 'driver'
                  ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white'
                  : userType === 'dispatcher'
                  ? 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white'
              } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Remember me */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              Need help? <button type="button" className="text-green-600 hover:text-green-700 font-medium">Contact support</button>
            </p>
            <button
              type="button"
              onClick={() => onBack && onBack()}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
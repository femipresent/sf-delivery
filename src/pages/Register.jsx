import React, { useState } from 'react';
import { TruckIcon, UserGroupIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, BuildingOfficeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { OTPAPI } from '../api/axios';

const Register = ({ onRegisterSuccess, onBack }) => {
  const { signup } = useAuth();
  const [userType, setUserType] = useState(null);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingUserType, setPendingUserType] = useState(null);
  const [pendingData, setPendingData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    address: '',
    licenseNumber: '',
    vehicleInfo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Send OTP to email first
      await OTPAPI.post('/send-otp', { email: formData.email });
      // Store pending data and show OTP step
      setPendingUserType(userType);
      setPendingData({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        licenseNumber: formData.licenseNumber,
        vehicleInfo: formData.vehicleInfo,
        ...formData
      });
      setOtpStep(true);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp.trim()) {
      setError('Please enter the OTP sent to your email');
      setLoading(false);
      return;
    }

    try {
      // Verify OTP
      await OTPAPI.post('/verify-otp', { email: pendingData.email, otp });

      // OTP verified - now create account
      const result = await signup(pendingUserType, pendingData);

      if (result.success) {
        onRegisterSuccess(pendingUserType, result.data);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    try {
      await OTPAPI.post('/send-otp', { email: pendingData.email });
      setError('');
      alert('OTP resent successfully!');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleBack = () => {
    setUserType(null);
    setOtpStep(false);
    setOtp('');
    setError('');
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      password: '', confirmPassword: '', businessName: '',
      address: '', licenseNumber: '', vehicleInfo: ''
    });
  };

  // OTP Verification Screen
  if (otpStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-lg border-2 border-green-500 bg-white flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Verify Email</h1>
            <p className="text-gray-600 mt-2">Enter the OTP sent to {pendingData?.email}</p>
          </div>

          <form onSubmit={handleVerifyOTP} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Verification</h2>
              <p className="text-sm text-gray-500 mb-6">Check your inbox for a 6-digit OTP code</p>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code *</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Verifying...
                  </>
                ) : 'Verify & Create Account'}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Didn't receive OTP? Resend
                </button>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button onClick={onBack} className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-lg border-2 border-green-500 bg-white hover:bg-green-50 transition-colors">
              <TruckIcon className="w-8 h-8 text-green-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">S&F Delivery</h1>
            <p className="text-gray-600 mt-2">Create Your Account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Select Account Type</h2>

              <button onClick={() => handleUserTypeSelect('shipper')} className="w-full mb-4 p-6 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <UserGroupIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4 text-left">
                      <p className="font-semibold text-gray-900">Shipper Account</p>
                      <p className="text-sm text-gray-500">Manage shipments and bookings</p>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">→</div>
                </div>
              </button>

              <button onClick={() => handleUserTypeSelect('driver')} className="w-full p-6 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <TruckIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4 text-left">
                      <p className="font-semibold text-gray-900">Driver Account</p>
                      <p className="text-sm text-gray-500">View assigned jobs and deliveries</p>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold">→</div>
                </div>
              </button>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  <span className="font-medium">Dispatcher accounts</span> are for staff only and cannot be registered online.
                  <br />Please contact administration for access.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Already have an account?{' '}
                <button onClick={() => onBack && onBack('login')} className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={handleBack} className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-lg border-2 border-green-500 bg-white hover:bg-green-50 transition-colors">
            <TruckIcon className="w-8 h-8 text-green-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">S&F Delivery</h1>
          <p className="text-gray-600 mt-2">{userType === 'shipper' ? 'Shipper' : 'Driver'} Registration</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
              <button type="button" onClick={handleBack} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="John" disabled={loading} required />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Doe" disabled={loading} required />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading} required />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+234 800 123 4567" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading} />
              </div>
            </div>

            {userType === 'shipper' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} placeholder="Your Business Name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading} />
                </div>
              </div>
            )}

            {userType === 'driver' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
                  <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g. DL12345678" disabled={loading} required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Info *</label>
                  <input type="text" name="vehicleInfo" value={formData.vehicleInfo} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g. Toyota Hilux - ABC123XY" disabled={loading} required />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading} required />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" disabled={loading} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-semibold transition-colors ${userType === 'shipper' ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white' : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white'} flex items-center justify-center`}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Sending OTP...
                </>
              ) : 'Continue'}
            </button>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button type="button" onClick={() => onBack && onBack('login')} className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

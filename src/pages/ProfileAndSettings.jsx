import React, { useState, useRef } from 'react';
import {
  UserCircleIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const ProfileAndSettings = () => {
  // User profile data
  const [userData, setUserData] = useState({
    id: 1,
    name: 'Oluwafemi Og',
    email: 'oluwafemi.og@example.com',
    phone: '+234 801 234 5678',
    userType: 'Individual', // 'Individual' or 'Business'
    address: '123 Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    profilePhoto: null,
    joinedDate: '2023-06-15',
    lastLogin: '2024-01-16 14:30',
    status: 'active',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    idNumber: 'NG-12345678'
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    passwordLastChanged: '2023-12-01',
    devices: [
      { id: 1, name: 'iPhone 13', lastActive: '2024-01-16 14:30', location: 'Lagos, Nigeria' },
      { id: 2, name: 'MacBook Pro', lastActive: '2024-01-16 10:15', location: 'Lagos, Nigeria' }
    ],
    sessions: [
      { id: 1, browser: 'Chrome', os: 'iOS', ip: '192.168.1.1', lastActive: '2 mins ago' },
      { id: 2, browser: 'Safari', os: 'macOS', ip: '192.168.1.2', lastActive: '1 hour ago' }
    ]
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', last4: '4242', brand: 'Visa', expires: '12/2025', isDefault: true },
    { id: 2, type: 'bank', bank: 'Zenith Bank', last4: '7890', account: '1234567890', isDefault: false }
  ]);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    shipmentUpdates: true,
    paymentReminders: true,
    promotionalEmails: false,
    smsAlerts: false,
    newFeatures: true,
    securityAlerts: true,
    deliveryNotifications: true,
    driverUpdates: true
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    defaultService: 'express',
    autoSave: true,
    notificationsSound: true,
    mapProvider: 'google'
  });

  // Editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Personal info form
  const [personalInfo, setPersonalInfo] = useState({
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    idNumber: userData.idNumber
  });

  const fileInputRef = useRef(null);

  // Handle profile photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image under 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profilePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Update user data with personal info
    const updatedUserData = {
      ...userData,
      dateOfBirth: personalInfo.dateOfBirth,
      gender: personalInfo.gender,
      idNumber: personalInfo.idNumber
    };
    
    setUserData(updatedUserData);
    setIsEditingProfile(false);
    
    alert('Profile updated successfully!');
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    
    // Check for password strength
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongRegex.test(passwordData.newPassword)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    
    setSecuritySettings(prev => ({
      ...prev,
      passwordLastChanged: new Date().toISOString().split('T')[0]
    }));
    
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    alert('Password changed successfully!');
  };

  // Toggle notification preference
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Update preferences
  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Add new payment method
  const handleAddPaymentMethod = () => {
    const newMethod = {
      id: paymentMethods.length + 1,
      type: 'card',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      brand: 'Visa',
      expires: '12/2026',
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  // Remove payment method
  const removePaymentMethod = (id) => {
    if (paymentMethods.length > 1) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    } else {
      alert('You must have at least one payment method.');
    }
  };

  // Revoke device access
  const revokeDevice = (id) => {
    if (securitySettings.devices.length > 1) {
      setSecuritySettings(prev => ({
        ...prev,
        devices: prev.devices.filter(device => device.id !== id)
      }));
    } else {
      alert('You must have at least one device.');
    }
  };

  // Terminate session
  const terminateSession = (id) => {
    setSecuritySettings(prev => ({
      ...prev,
      sessions: prev.sessions.filter(session => session.id !== id)
    }));
  };

  // Export data
  const handleExportData = () => {
    const data = {
      profile: userData,
      settings: {
        security: securitySettings,
        notifications: notifications,
        preferences: preferences
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile_data_export.json';
    a.click();
    
    alert('Data exported successfully!');
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col items-center p-4">
              <div className="relative mb-4">
                {userData.profilePhoto ? (
                  <img
                    src={userData.profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <UserCircleIcon className="w-24 h-24 text-gray-400" />
                )}
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg"
                  title="Change photo"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600 text-sm">{userData.email}</p>
              <div className="flex items-center mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mr-2">
                  {userData.userType}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {userData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <nav className="p-2">
              {[
                { id: 'profile', label: 'Profile Information', icon: UserCircleIcon },
                { id: 'security', label: 'Security', icon: ShieldCheckIcon },
                { id: 'notifications', label: 'Notifications', icon: BellIcon },
                { id: 'payments', label: 'Payment Methods', icon: CreditCardIcon },
                { id: 'preferences', label: 'Preferences', icon: GlobeAltIcon },
                { id: 'devices', label: 'Devices & Sessions', icon: DevicePhoneMobileIcon }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 my-1 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${
                    activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Personal Information</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        ) : (
                          <p className="text-gray-900">{userData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        ) : (
                          <div className="flex items-center">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="text-gray-900">{userData.email}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="text-gray-900">{userData.phone}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">{formatDate(userData.dateOfBirth)}</p>
                        )}
                      </div>
                    </div>

                    {/* Address & Additional Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Address & Identification</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={userData.address}
                            onChange={(e) => setUserData({...userData, address: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <HomeIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="text-gray-900">{userData.address}</p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              value={userData.city}
                              onChange={(e) => setUserData({...userData, city: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{userData.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              value={userData.state}
                              onChange={(e) => setUserData({...userData, state: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{userData.state}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        {isEditingProfile ? (
                          <select
                            value={personalInfo.gender}
                            onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        ) : (
                          <p className="text-gray-900">{userData.gender}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Number
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={personalInfo.idNumber}
                            onChange={(e) => setPersonalInfo({...personalInfo, idNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="NG-12345678"
                          />
                        ) : (
                          <div className="flex items-center">
                            <IdentificationIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <p className="text-gray-900">{userData.idNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Account Info (Read-only) */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">User Type</p>
                        <p className="font-medium text-gray-900">{userData.userType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {new Date(userData.joinedDate).toLocaleDateString('en-NG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Login</p>
                        <p className="font-medium text-gray-900">{userData.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          {userData.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setPersonalInfo({
                            dateOfBirth: userData.dateOfBirth,
                            gender: userData.gender,
                            idNumber: userData.idNumber
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                <p className="text-gray-600 text-sm mt-1">Manage your account security and login preferences</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({
                      ...securitySettings,
                      twoFactorEnabled: !securitySettings.twoFactorEnabled
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Change Password */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Password</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Last changed: {securitySettings.passwordLastChanged}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <KeyIcon className="w-4 h-4 mr-2" />
                      {isChangingPassword ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>

                  {isChangingPassword && (
                    <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="At least 8 characters"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        <p>Password must contain:</p>
                        <ul className="list-disc pl-4 mt-1">
                          <li>At least 8 characters</li>
                          <li>One uppercase letter</li>
                          <li>One lowercase letter</li>
                          <li>One number</li>
                          <li>One special character</li>
                        </ul>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Security Notifications */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Security Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Login Notifications</p>
                        <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                      </div>
                      <button
                        onClick={() => setSecuritySettings({
                          ...securitySettings,
                          loginNotifications: !securitySettings.loginNotifications
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.loginNotifications ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <p className="text-gray-600 text-sm mt-1">Choose what notifications you want to receive</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Email Notifications */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600 mt-1">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({
                        ...securitySettings,
                        emailNotifications: !securitySettings.emailNotifications
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {securitySettings.emailNotifications && (
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">Shipment Updates</p>
                          <p className="text-sm text-gray-600">Tracking updates and delivery notifications</p>
                        </div>
                        <button
                          onClick={() => toggleNotification('shipmentUpdates')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.shipmentUpdates ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.shipmentUpdates ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">Payment Reminders</p>
                          <p className="text-sm text-gray-600">Invoice due dates and payment confirmations</p>
                        </div>
                        <button
                          onClick={() => toggleNotification('paymentReminders')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.paymentReminders ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.paymentReminders ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">Promotional Emails</p>
                          <p className="text-sm text-gray-600">Special offers and announcements</p>
                        </div>
                        <button
                          onClick={() => toggleNotification('promotionalEmails')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.promotionalEmails ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.promotionalEmails ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* SMS Notifications */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600 mt-1">Receive important updates via SMS</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({
                        ...securitySettings,
                        smsNotifications: !securitySettings.smsNotifications
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.smsNotifications ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        securitySettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Delivery Notifications */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Delivery Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Delivery Updates</p>
                        <p className="text-sm text-gray-600">Real-time delivery status updates</p>
                      </div>
                      <button
                        onClick={() => toggleNotification('deliveryNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.deliveryNotifications ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          notifications.deliveryNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Driver Updates</p>
                        <p className="text-sm text-gray-600">Driver assignment and ETA notifications</p>
                      </div>
                      <button
                        onClick={() => toggleNotification('driverUpdates')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.driverUpdates ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          notifications.driverUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Security Alerts</p>
                        <p className="text-sm text-gray-600">Important security updates and alerts</p>
                      </div>
                      <button
                        onClick={() => toggleNotification('securityAlerts')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications.securityAlerts ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                    <p className="text-gray-600 text-sm mt-1">Manage your saved payment methods</p>
                  </div>
                  <button
                    onClick={handleAddPaymentMethod}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {method.type === 'card' ? (
                            <CreditCardIcon className="w-8 h-8 text-gray-400 mr-4" />
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                              <span className="text-xs font-medium text-gray-600">BANK</span>
                            </div>
                          )}
                          <div>
                            {method.type === 'card' ? (
                              <>
                                <p className="font-medium text-gray-900">{method.brand} •••• {method.last4}</p>
                                <p className="text-sm text-gray-600">Expires {method.expires}</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-gray-900">{method.bank}</p>
                                <p className="text-sm text-gray-600">Account ••••{method.last4}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.isDefault ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Default
                            </span>
                          ) : (
                            <button
                              onClick={() => setDefaultPaymentMethod(method.id)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => removePaymentMethod(method.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Remove"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                <p className="text-gray-600 text-sm mt-1">Customize your app experience</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* App Preferences */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => updatePreference('theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => updatePreference('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="yo">Yoruba</option>
                        <option value="ha">Hausa</option>
                        <option value="ig">Igbo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => updatePreference('timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New York (EST)</option>
                      </select>
                    </div>
                  </div>

                  {/* Business Preferences */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => updatePreference('currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => updatePreference('dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Map Provider
                      </label>
                      <select
                        value={preferences.mapProvider}
                        onChange={(e) => updatePreference('mapProvider', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="google">Google Maps</option>
                        <option value="openstreet">OpenStreetMap</option>
                        <option value="mapbox">Mapbox</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Preferences */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Notification Sound</p>
                      <p className="text-sm text-gray-600">Play sound for notifications</p>
                    </div>
                    <button
                      onClick={() => updatePreference('notificationsSound', !preferences.notificationsSound)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notificationsSound ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        preferences.notificationsSound ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto Save</p>
                      <p className="text-sm text-gray-600">Automatically save changes to forms</p>
                    </div>
                    <button
                      onClick={() => updatePreference('autoSave', !preferences.autoSave)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.autoSave ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Devices & Sessions Tab */}
          {activeTab === 'devices' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Devices & Sessions</h3>
                <p className="text-gray-600 text-sm mt-1">Manage your logged-in devices and active sessions</p>
              </div>

              <div className="p-6">
                {/* Devices */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">Your Devices</h4>
                  <div className="space-y-4">
                    {securitySettings.devices.map((device) => (
                      <div key={device.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DevicePhoneMobileIcon className="w-8 h-8 text-gray-400 mr-4" />
                            <div>
                              <p className="font-medium text-gray-900">{device.name}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                <span>Last active: {device.lastActive}</span>
                              </div>
                              <p className="text-sm text-gray-600">{device.location}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => revokeDevice(device.id)}
                            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                          >
                            Revoke Access
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Active Sessions</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Browser
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            OS
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP Address
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Active
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {securitySettings.sessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{session.browser}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{session.os}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{session.ip}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{session.lastActive}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => terminateSession(session.id)}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Terminate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
          </div>
          <p className="text-gray-600 mb-4">Export your account data or download your information</p>
          <button
            onClick={handleExportData}
            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Export Account Data
          </button>
        </div>

        <div className="bg-white border border-red-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
          </div>
          <p className="text-gray-600 mb-4">Permanently delete your account and all associated data</p>
          <button
            onClick={handleDeleteAccount}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndSettings;
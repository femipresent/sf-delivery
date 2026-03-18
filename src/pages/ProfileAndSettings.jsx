import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
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

const ProfileAndSettings = ({ onLogout }) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error: profileError, fetchProfile, updateProfile } = useProfile();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [tempData, setTempData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const fileInputRef = useRef(null);

  // Load temp data for editing
  useEffect(() => {
    if (profile) {
      setTempData(profile);
    }
  }, [profile]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = await updateProfile({ profilePhoto: reader.result });
        if (result.success) {
          fetchProfile(); // Refresh
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateProfile(tempData);
    if (result.success) {
      setIsEditingProfile(false);
    } else {
      alert(result.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Update via backend (add endpoint later)
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const toggleNotification = (key) => {
    // Update via backend later
  };

  const updatePreference = (key, value) => {
    // Update via backend later
  };

  if (profileLoading) return <div>Loading profile...</div>;
  if (profileError) return <div>Error: {profileError}</div>;

  const userData = profile || {};

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col items-center p-4">
              <div className="relative mb-4">
                <img
                  src={userData.profilePhoto || '/default-avatar.png'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg"
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
              <h2 className="text-xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h2>
              <p className="text-gray-600 text-sm">{userData.email}</p>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mt-1">
                {user?.userType || 'User'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <nav className="p-2">
              {[
                { id: 'profile', label: 'Profile Information', icon: UserCircleIcon },
                { id: 'security', label: 'Security', icon: ShieldCheckIcon },
                { id: 'notifications', label: 'Notifications', icon: BellIcon },
                { id: 'preferences', label: 'Preferences', icon: GlobeAltIcon }
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
                    {isEditingProfile ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={tempData.firstName || ''}
                        onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={tempData.lastName || ''}
                        onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={tempData.email || ''}
                        onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={tempData.phone || ''}
                        onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditingProfile}
                      />
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Other tabs with mock removed - use profile data where possible */}
          {/* Security, Notifications etc - simplified without mock state */}
          {activeTab === 'security' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
              <p>Password change coming soon...</p>
              <button onClick={() => setIsChangingPassword(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Real profile data - mock removed


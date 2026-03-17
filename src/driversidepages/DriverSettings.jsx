import React, { useState, useEffect, useRef } from 'react';
import {
  UserIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  MapIcon,
  TruckIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  DocumentTextIcon,
  LockClosedIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  CloudArrowDownIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  PencilIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  CreditCardIcon,
  CalendarIcon,
  DeviceTabletIcon,
  SignalIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  CameraIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const DriverSettings = () => {
  // State for active section
  const [activeSection, setActiveSection] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Driver profile data
  const [driverProfile, setDriverProfile] = useState({
    name: 'Musa Ibrahim',
    email: 'musa.ibrahim@s-fdelivery.ng',
    phone: '+234 812 345 6789',
    driverId: 'DRV-7890',
    dateOfBirth: '1990-05-15',
    address: '123 Driver Street, Lagos',
    emergencyContact: {
      name: 'Amina Ibrahim',
      phone: '+234 803 987 6543',
      relationship: 'Wife'
    },
    license: {
      number: 'NGR7890123456',
      expiry: '2025-08-31',
      type: 'Class E'
    },
    joinedDate: '2022-03-15',
    vehicleAssigned: 'Toyota Hilux - ABC-123XY'
  });

  // Settings state
  const [settings, setSettings] = useState({
    // Notification Settings
    notifications: {
      newJobs: true,
      jobUpdates: true,
      paymentAlerts: true,
      systemAlerts: true,
      promotions: false,
      sound: true,
      vibration: true
    },
    // Navigation Settings
    navigation: {
      voiceGuidance: true,
      avoidTolls: false,
      avoidHighways: false,
      preferredRoute: 'fastest',
      autoRecalculate: true
    },
    // Privacy Settings
    privacy: {
      shareLocation: true,
      showRating: true,
      profileVisibility: 'team-only',
      dataCollection: true
    },
    // App Settings
    app: {
      theme: 'light',
      language: 'en',
      autoUpdate: true,
      dataSaver: false
    },
    // Account Security
    security: {
      twoFactorAuth: false,
      biometricLogin: true,
      autoLogout: 30, // minutes
      loginNotifications: true
    }
  });

  // Password state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Documents state
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Driver License', type: 'license', expiry: '2025-08-31', status: 'valid' },
    { id: 2, name: 'Vehicle Insurance', type: 'insurance', expiry: '2024-06-30', status: 'expiring' },
    { id: 3, name: 'Roadworthiness Certificate', type: 'certificate', expiry: '2024-09-15', status: 'valid' },
    { id: 4, name: 'Police Clearance', type: 'clearance', expiry: '2025-12-31', status: 'valid' }
  ]);

  // Statistics
  const [statistics, setStatistics] = useState({
    totalDeliveries: 247,
    rating: 4.8,
    onTimeRate: 96.5,
    totalEarnings: 1250000,
    hoursWorked: 1560,
    fuelEfficiency: 8.5
  });

  // Handle file input click
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size should be less than 5MB');
      return;
    }

    setUploadError('');
    uploadProfilePicture(file);
  };

  // Simulate profile picture upload
  const uploadProfilePicture = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Create object URL for preview
          const objectUrl = URL.createObjectURL(file);
          
          // Simulate API call completion
          setTimeout(() => {
            setProfilePicture(objectUrl);
            setIsUploading(false);
            setUploadSuccess(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => setUploadSuccess(false), 3000);
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Remove profile picture
  const removeProfilePicture = () => {
    setProfilePicture('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  // Take photo from camera
  const takePhoto = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          alert('Camera access granted. This feature would capture a photo in a real implementation.');
          // In a real app, you would capture the photo here
        })
        .catch((error) => {
          console.error('Camera access error:', error);
          setUploadError('Camera access denied. Please allow camera access in your browser settings.');
        });
    } else {
      setUploadError('Camera not available on this device');
    }
  };

  // Handle profile update
  const handleProfileUpdate = (field, value) => {
    setDriverProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle emergency contact update
  const handleEmergencyContactUpdate = (field, value) => {
    setDriverProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  // Handle settings update
  const handleSettingUpdate = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Handle password update
  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (password.new.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      setPassword({ current: '', new: '', confirm: '' });
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // Save all settings
  const saveAllSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  // Profile Picture Upload Component
  const ProfilePictureUpload = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <CameraIcon className="w-5 h-5 text-blue-600 mr-2" />
        Profile Picture
      </h3>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Current Profile Picture */}
        <div className="relative">
          <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
            <img
              src={profilePicture}
              alt="Driver Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Edit Badge */}
          <button
            onClick={handleFileInputClick}
            className="absolute bottom-3 right-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:shadow-xl"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Upload Controls */}
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Update Profile Picture</h4>
            <p className="text-sm text-gray-600 mb-4">
              Upload a clear photo of yourself. Recommended size: 500x500 pixels. Max size: 5MB.
            </p>
          </div>
          
          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="font-medium text-blue-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Upload Success */}
          {uploadSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-green-700">Profile picture updated successfully!</span>
              </div>
            </div>
          )}
          
          {/* Upload Error */}
          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <XCircleIcon className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-sm text-red-700">{uploadError}</span>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={handleFileInputClick}
              disabled={isUploading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all flex items-center justify-center"
            >
              <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
              Upload Photo
            </button>
            
            <button
              onClick={takePhoto}
              disabled={isUploading}
              className="p-3 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center"
            >
              <CameraIcon className="w-5 h-5 mr-2" />
              Take Photo
            </button>
            
            <button
              onClick={removeProfilePicture}
              disabled={isUploading}
              className="p-3 border border-red-300 hover:bg-red-50 disabled:opacity-50 text-red-700 font-medium rounded-xl transition-all flex items-center justify-center"
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              Remove
            </button>
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          
          {/* Image Guidelines */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Image Guidelines:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li className="flex items-center">
                <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                Use a clear, recent photo of yourself
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                Face should be clearly visible
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                Use good lighting and plain background
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                No sunglasses or hats that obscure face
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile section
  const ProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Picture Upload */}
      <ProfilePictureUpload />

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <UserIcon className="w-5 h-5 text-blue-600 mr-2" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={driverProfile.name}
              onChange={(e) => handleProfileUpdate('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={driverProfile.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={driverProfile.phone}
              onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={driverProfile.dateOfBirth}
              onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={driverProfile.address}
              onChange={(e) => handleProfileUpdate('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <PhoneIcon className="w-5 h-5 text-red-600 mr-2" />
          Emergency Contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
            <input
              type="text"
              value={driverProfile.emergencyContact.name}
              onChange={(e) => handleEmergencyContactUpdate('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={driverProfile.emergencyContact.phone}
              onChange={(e) => handleEmergencyContactUpdate('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              value={driverProfile.emergencyContact.relationship}
              onChange={(e) => handleEmergencyContactUpdate('relationship', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* License Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <IdentificationIcon className="w-5 h-5 text-green-600 mr-2" />
          License Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value={driverProfile.license.number}
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              value={driverProfile.license.expiry}
              onChange={(e) => handleProfileUpdate('license', { ...driverProfile.license, expiry: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
            <select
              value={driverProfile.license.type}
              onChange={(e) => handleProfileUpdate('license', { ...driverProfile.license, type: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Class E">Class E (Heavy Vehicles)</option>
              <option value="Class D">Class D (Commercial)</option>
              <option value="Class C">Class C (Light Vehicles)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Notification Settings
  const NotificationSettings = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <BellIcon className="w-5 h-5 text-yellow-600 mr-2" />
        Notification Settings
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Job Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">New Job Alerts</p>
                <p className="text-xs text-gray-500">Get notified when new jobs are available</p>
              </div>
              <button
                onClick={() => handleSettingUpdate('notifications', 'newJobs', !settings.notifications.newJobs)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications.newJobs ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications.newJobs ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Job Updates</p>
                <p className="text-xs text-gray-500">Status changes and route updates</p>
              </div>
              <button
                onClick={() => handleSettingUpdate('notifications', 'jobUpdates', !settings.notifications.jobUpdates)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications.jobUpdates ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications.jobUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Payment Notifications</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Alerts</p>
              <p className="text-xs text-gray-500">Get notified when payments are processed</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('notifications', 'paymentAlerts', !settings.notifications.paymentAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.notifications.paymentAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.notifications.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.sound}
                onChange={(e) => handleSettingUpdate('notifications', 'sound', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Sound</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.vibration}
                onChange={(e) => handleSettingUpdate('notifications', 'vibration', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Vibration</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation Settings
  const NavigationSettings = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <MapIcon className="w-5 h-5 text-green-600 mr-2" />
        Navigation Settings
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Voice Guidance</p>
            <p className="text-xs text-gray-500">Turn-by-turn voice instructions</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('navigation', 'voiceGuidance', !settings.navigation.voiceGuidance)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.navigation.voiceGuidance ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.navigation.voiceGuidance ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Avoid Tolls</p>
            <p className="text-xs text-gray-500">Calculate routes without toll roads</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('navigation', 'avoidTolls', !settings.navigation.avoidTolls)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.navigation.avoidTolls ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.navigation.avoidTolls ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Route Preferences</h4>
          <div className="space-y-3">
            {['fastest', 'shortest', 'economic'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="preferredRoute"
                  checked={settings.navigation.preferredRoute === option}
                  onChange={() => handleSettingUpdate('navigation', 'preferredRoute', option)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={option} className="ml-2 text-sm text-gray-700 capitalize">
                  {option} route
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Security Settings
  const SecuritySettings = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <LockClosedIcon className="w-5 h-5 text-red-600 mr-2" />
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                value={password.current}
                onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.current ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                value={password.new}
                onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                placeholder="Enter new password"
              />
              <button
                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.new ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={password.confirm}
                onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                placeholder="Confirm new password"
              />
              <button
                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            onClick={handlePasswordChange}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Security Preferences */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
          Security Preferences
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Biometric Login</p>
              <p className="text-xs text-gray-500">Use fingerprint or face ID</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('security', 'biometricLogin', !settings.security.biometricLogin)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.security.biometricLogin ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.security.biometricLogin ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Auto Logout</h4>
            <select
              value={settings.security.autoLogout}
              onChange={(e) =>  handleSettingUpdate('security', 'autoLogout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Privacy Settings
  const PrivacySettings = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <GlobeAltIcon className="w-5 h-5 text-purple-600 mr-2" />
        Privacy Settings
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Share Live Location</p>
            <p className="text-xs text-gray-500">Allow tracking during active jobs</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('privacy', 'shareLocation', !settings.privacy.shareLocation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.privacy.shareLocation ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.privacy.shareLocation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Show Rating to Customers</p>
            <p className="text-xs text-gray-500">Display your rating to customers</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('privacy', 'showRating', !settings.privacy.showRating)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.privacy.showRating ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.privacy.showRating ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Profile Visibility</h4>
          <div className="space-y-3">
            {['team-only', 'all-drivers', 'public'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`visibility-${option}`}
                  name="profileVisibility"
                  checked={settings.privacy.profileVisibility === option}
                  onChange={() => handleSettingUpdate('privacy', 'profileVisibility', option)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={`visibility-${option}`} className="ml-2 text-sm text-gray-700 capitalize">
                  {option.replace('-', ' ')}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // App Settings
  const AppSettings = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <DevicePhoneMobileIcon className="w-5 h-5 text-indigo-600 mr-2" />
        App Settings
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Theme</h4>
          <div className="flex gap-4">
            <button
              onClick={() => handleSettingUpdate('app', 'theme', 'light')}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 ${
                settings.app.theme === 'light' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <SunIcon className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="text-sm font-medium">Light</span>
            </button>
            
            <button
              onClick={() => handleSettingUpdate('app', 'theme', 'dark')}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 ${
                settings.app.theme === 'dark' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <MoonIcon className="w-5 h-5 mr-2 text-gray-700" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            
            <button
              onClick={() => handleSettingUpdate('app', 'theme', 'auto')}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 ${
                settings.app.theme === 'auto' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <ArrowPathIcon className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Auto</span>
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Language</h4>
          <select
            value={settings.app.language}
            onChange={(e) => handleSettingUpdate('app', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ar">Arabic</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yoruba</option>
            <option value="ig">Igbo</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Auto Update</p>
            <p className="text-xs text-gray-500">Automatically update app when available</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('app', 'autoUpdate', !settings.app.autoUpdate)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.app.autoUpdate ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.app.autoUpdate ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Data Saver Mode</p>
            <p className="text-xs text-gray-500">Reduce data usage for maps and images</p>
          </div>
          <button
            onClick={() => handleSettingUpdate('app', 'dataSaver', !settings.app.dataSaver)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.app.dataSaver ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.app.dataSaver ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  // Documents Section
  const DocumentsSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DocumentTextIcon className="w-5 h-5 text-amber-600 mr-2" />
            Documents
          </h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center">
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            Upload New
          </button>
        </div>
        
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  doc.status === 'valid' ? 'bg-green-100' : 
                  doc.status === 'expiring' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <DocumentDuplicateIcon className={`w-6 h-6 ${
                    doc.status === 'valid' ? 'text-green-600' : 
                    doc.status === 'expiring' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Expires: {doc.expiry}
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                      doc.status === 'valid' ? 'bg-green-100 text-green-800' : 
                      doc.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <CloudArrowDownIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <ChartBarIcon className="w-5 h-5 text-purple-600 mr-2" />
          Statistics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center">
              <TruckIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-blue-700">Total Deliveries</p>
                <p className="text-xl font-bold text-gray-900">{statistics.totalDeliveries}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-green-700">On-time Rate</p>
                <p className="text-xl font-bold text-gray-900">{statistics.onTimeRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-xl">
            <div className="flex items-center">
              <StarIcon className="w-8 h-8 text-amber-600" />
              <div className="ml-3">
                <p className="text-sm text-amber-700">Rating</p>
                <p className="text-xl font-bold text-gray-900">{statistics.rating}/5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-xl">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-emerald-600" />
              <div className="ml-3">
                <p className="text-sm text-emerald-700">Total Earnings</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(statistics.totalEarnings)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-xl">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-indigo-600" />
              <div className="ml-3">
                <p className="text-sm text-indigo-700">Hours Worked</p>
                <p className="text-xl font-bold text-gray-900">{statistics.hoursWorked}h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-xl">
            <div className="flex items-center">
              <SignalIcon className="w-8 h-8 text-cyan-600" />
              <div className="ml-3">
                <p className="text-sm text-cyan-700">Fuel Efficiency</p>
                <p className="text-xl font-bold text-gray-900">{statistics.fuelEfficiency} km/L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          
          {/* Save Button */}
          <div className="relative">
            <button
              onClick={saveAllSettings}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors flex items-center"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Save All Changes
                </>
              )}
            </button>
            
            {/* Save Success Indicator */}
            {saveSuccess && (
              <div className="absolute -bottom-10 right-0 px-4 py-2 bg-green-600 text-white rounded-lg animate-pulse">
                <div className="flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Settings saved successfully!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sticky top-6">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: UserIcon },
                { id: 'notifications', label: 'Notifications', icon: BellIcon },
                { id: 'navigation', label: 'Navigation', icon: MapIcon },
                { id: 'security', label: 'Security', icon: ShieldCheckIcon },
                { id: 'privacy', label: 'Privacy', icon: GlobeAltIcon },
                { id: 'app', label: 'App Settings', icon: DevicePhoneMobileIcon },
                { id: 'documents', label: 'Documents & Stats', icon: DocumentTextIcon },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRightIcon className={`w-4 h-4 transition-transform ${
                    activeSection === item.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ))}
              
              {/* Logout Button */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Driver Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={profilePicture}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">{driverProfile.name}</h4>
                <p className="text-xs text-gray-500">{driverProfile.driverId}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TruckIcon className="w-4 h-4 mr-2" />
                <span>{driverProfile.vehicleAssigned}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Joined: {driverProfile.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-800">Settings Saved Successfully</p>
                  <p className="text-sm text-green-600">All changes have been applied to your account</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Active Section Content */}
          <div className="transition-all duration-300">
            {activeSection === 'profile' && <ProfileSection />}
            {activeSection === 'notifications' && <NotificationSettings />}
            {activeSection === 'navigation' && <NavigationSettings />}
            {activeSection === 'security' && <SecuritySettings />}
            {activeSection === 'privacy' && <PrivacySettings />}
            {activeSection === 'app' && <AppSettings />}
            {activeSection === 'documents' && <DocumentsSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Star icon component (missing from heroicons import)
const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

export default DriverSettings;
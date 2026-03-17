import React, { useState, useEffect, useMemo } from 'react';
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BanknotesIcon,
  MapPinIcon,
  TruckIcon,
  DocumentTextIcon,
  BellIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CreditCardIcon,
  CalculatorIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  KeyIcon,
  CloudIcon,
  CpuChipIcon,
  ServerIcon,
  LockClosedIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PhotoIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ArchiveBoxIcon,
  DocumentCheckIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Custom DatabaseIcon component
const DatabaseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

const SystemSettings = () => {
  // State management
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'SwiftFlow Logistics',
    companyLogo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    language: 'en',
    supportEmail: 'support@swiftflow.ng',
    supportPhone: '+2348001234567',
    website: 'https://swiftflow.ng',
    businessHours: {
      start: '08:00',
      end: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
  });
  
  // Rate Management
  const [rates, setRates] = useState({
    baseRates: [
      { id: 1, service: 'FTL', baseRate: 50000, perKm: 250, perKg: 150, minCharge: 30000, active: true },
      { id: 2, service: 'LTL', baseRate: 20000, perKm: 150, perKg: 100, minCharge: 15000, active: true },
      { id: 3, service: 'Express', baseRate: 15000, perKm: 200, perKg: 120, minCharge: 10000, active: true },
      { id: 4, service: 'Same Day', baseRate: 25000, perKm: 300, perKg: 180, minCharge: 20000, active: true },
      { id: 5, service: 'Cold Chain', baseRate: 35000, perKm: 400, perKg: 250, minCharge: 30000, active: true },
    ],
    surcharges: [
      { id: 1, type: 'Fuel Surcharge', percentage: 12.5, applyTo: 'all', active: true },
      { id: 2, type: 'Peak Hours', percentage: 15, applyTo: 'express', timeRange: '17:00-20:00', active: true },
      { id: 3, type: 'Weekend Delivery', flatFee: 5000, applyTo: 'all', active: true },
      { id: 4, type: 'Remote Area', percentage: 25, applyTo: 'all', active: true },
      { id: 5, type: 'Security Escort', flatFee: 25000, applyTo: 'secure', active: true },
    ],
    zones: [
      { id: 1, name: 'Lagos Metro', cities: ['Lagos', 'Ikeja', 'Victoria Island'], rateMultiplier: 1.0 },
      { id: 2, name: 'South West', cities: ['Ibadan', 'Abeokuta', 'Ogun'], rateMultiplier: 1.2 },
      { id: 3, name: 'North Central', cities: ['Abuja', 'Kaduna', 'Jos'], rateMultiplier: 1.3 },
      { id: 4, name: 'South South', cities: ['Port Harcourt', 'Warri', 'Calabar'], rateMultiplier: 1.4 },
      { id: 5, name: 'North East', cities: ['Maiduguri', 'Yola', 'Bauchi'], rateMultiplier: 1.5 },
    ],
    discounts: [
      { id: 1, name: 'Volume Discount', type: 'percentage', value: 10, minShipments: 50, active: true },
      { id: 2, name: 'Loyalty Discount', type: 'percentage', value: 5, minMonths: 6, active: true },
      { id: 3, name: 'Corporate Rate', type: 'flat', value: 20000, customerGroup: 'corporate', active: true },
    ],
  });
  
  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethods: [
      { id: 1, method: 'Bank Transfer', enabled: true, processingFee: 0 },
      { id: 2, method: 'Credit Card', enabled: true, processingFee: 1.5 },
      { id: 3, method: 'Debit Card', enabled: true, processingFee: 1.0 },
      { id: 4, method: 'Wallet', enabled: true, processingFee: 0 },
      { id: 5, method: 'Cash', enabled: true, processingFee: 0 },
      { id: 6, method: 'USSD', enabled: true, processingFee: 0.5 },
    ],
    codSettings: {
      enabled: true,
      maxAmount: 500000,
      collectionFee: 2.5,
      settlementDays: 1,
    },
    invoiceSettings: {
      prefix: 'INV',
      nextNumber: 1045,
      terms: 'Net 15 days',
      lateFee: 2.5,
      taxRate: 7.5,
    },
    payoutSettings: {
      driverPayoutSchedule: 'weekly',
      payoutMethod: 'bank_transfer',
      minimumPayout: 10000,
      autoApprove: true,
    },
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailTemplates: [
      { id: 1, name: 'Shipment Confirmation', enabled: true, subject: 'Your Shipment #{trackingNumber} has been confirmed' },
      { id: 2, name: 'Pickup Notification', enabled: true, subject: 'Your shipment is being picked up' },
      { id: 3, name: 'Delivery Notification', enabled: true, subject: 'Your shipment has been delivered' },
      { id: 4, name: 'Delay Notification', enabled: true, subject: 'Update on your shipment delivery' },
      { id: 5, name: 'Invoice Generated', enabled: true, subject: 'Invoice #{invoiceNumber} for your shipment' },
    ],
    smsSettings: {
      enabled: true,
      provider: 'Twilio',
      senderId: 'SWFTFLOW',
      lowBalanceAlert: 1000,
    },
    pushNotifications: {
      driverNewJob: true,
      driverJobUpdate: true,
      shipperStatusUpdate: true,
      adminDisputeAlert: true,
      systemMaintenance: true,
    },
    webhooks: [
      { id: 1, name: 'Order Created', url: 'https://api.customer.com/webhook/order', enabled: true },
      { id: 2, name: 'Delivery Status', url: 'https://api.customer.com/webhook/delivery', enabled: true },
      { id: 3, name: 'POD Uploaded', url: 'https://api.customer.com/webhook/pod', enabled: true },
    ],
  });
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireNumbers: true,
      requireSpecialChars: true,
      expireDays: 90,
      maxAttempts: 5,
      lockoutMinutes: 30,
    },
    twoFactorAuth: {
      enabled: true,
      methods: ['authenticator', 'sms'],
      requiredForAdmins: true,
      requiredForDrivers: false,
    },
    sessionSettings: {
      timeoutMinutes: 30,
      maxSessions: 3,
      concurrentSessions: false,
    },
    apiSecurity: {
      apiKeys: [
        { id: 1, name: 'Production API', key: 'sk_live_*****abcd', lastUsed: '2024-03-15', enabled: true },
        { id: 2, name: 'Development API', key: 'sk_test_*****efgh', lastUsed: '2024-03-14', enabled: true },
      ],
      rateLimit: {
        requestsPerMinute: 60,
        burstLimit: 100,
      },
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    },
  });
  
  // System Configuration
  const [systemConfig, setSystemConfig] = useState({
    maintenance: {
      enabled: false,
      startTime: '',
      endTime: '',
      message: 'System undergoing scheduled maintenance',
    },
    backupSettings: {
      autoBackup: true,
      frequency: 'daily',
      retentionDays: 30,
      cloudStorage: true,
      lastBackup: '2024-03-15 02:00',
    },
    performance: {
      cacheEnabled: true,
      cacheDuration: 300,
      imageOptimization: true,
      maxFileSize: 10, // MB
      concurrentJobs: 5,
    },
    integrations: [
      { id: 1, name: 'Google Maps', enabled: true, apiKey: '*****', lastSync: '2024-03-15' },
      { id: 2, name: 'Paystack', enabled: true, apiKey: '*****', testMode: false },
      { id: 3, name: 'Flutterwave', enabled: true, apiKey: '*****', testMode: false },
      { id: 4, name: 'Twilio SMS', enabled: true, apiKey: '*****', balance: 24500 },
      { id: 5, name: 'SendGrid', enabled: true, apiKey: '*****', emailsSent: 1245 },
    ],
  });
  
  // Audit Log
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'Admin User', action: 'Updated rate settings', timestamp: '2024-03-15 14:30', ip: '192.168.1.100' },
    { id: 2, user: 'System', action: 'Automatic database backup', timestamp: '2024-03-15 02:00', ip: 'System' },
    { id: 3, user: 'Admin User', action: 'Added new driver', timestamp: '2024-03-14 11:15', ip: '192.168.1.100' },
    { id: 4, user: 'Dispatcher', action: 'Reassigned shipment', timestamp: '2024-03-14 09:45', ip: '192.168.1.101' },
    { id: 5, user: 'Admin User', action: 'Changed payment settings', timestamp: '2024-03-13 16:20', ip: '192.168.1.100' },
    { id: 6, user: 'System', action: 'Sent bulk notifications', timestamp: '2024-03-13 08:00', ip: 'System' },
    { id: 7, user: 'Admin User', action: 'Updated security policy', timestamp: '2024-03-12 10:30', ip: '192.168.1.100' },
  ]);
  
  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  const handleResetSettings = (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} settings to defaults?`)) {
      // In a real app, this would reset to default values
      alert(`${section} settings have been reset to defaults`);
    }
  };
  
  const handleAddRate = () => {
    const newRate = {
      id: rates.baseRates.length + 1,
      service: 'New Service',
      baseRate: 0,
      perKm: 0,
      perKg: 0,
      minCharge: 0,
      active: true,
    };
    setRates(prev => ({
      ...prev,
      baseRates: [...prev.baseRates, newRate],
    }));
  };
  
  const handleDeleteRate = (id) => {
    if (window.confirm('Are you sure you want to delete this rate?')) {
      setRates(prev => ({
        ...prev,
        baseRates: prev.baseRates.filter(rate => rate.id !== id),
      }));
    }
  };
  
  const handleToggleIntegration = (id) => {
    setSystemConfig(prev => ({
      ...prev,
      integrations: prev.integrations.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      ),
    }));
  };
  
  const handleRegenerateApiKey = (id) => {
    if (window.confirm('Are you sure you want to regenerate this API key? The old key will become invalid.')) {
      setSecuritySettings(prev => ({
        ...prev,
        apiSecurity: {
          ...prev.apiSecurity,
          apiKeys: prev.apiSecurity.apiKeys.map(key => 
            key.id === id 
              ? { ...key, key: `sk_${Math.random().toString(36).substr(2, 20)}`, lastUsed: new Date().toISOString().split('T')[0] }
              : key
          ),
        },
      }));
    }
  };
  
  // Setting Section Component
  const SettingSection = ({ title, icon: Icon, description, children, action }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {action && (
          <button
            onClick={action}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Reset to Defaults
          </button>
        )}
      </div>
      {children}
    </div>
  );
  
  // Setting Row Component
  const SettingRow = ({ label, description, children, required = false }) => (
    <div className="border-t border-gray-100 py-4 first:border-t-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-900">{label}</label>
            {required && <span className="text-red-500 text-xs">*</span>}
          </div>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="w-full md:w-64">
          {children}
        </div>
      </div>
    </div>
  );
  
  // Toggle Switch Component
  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </div>
  );
  
  // Tab Navigation
  const tabs = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'rates', label: 'Rate Management', icon: CalculatorIcon },
    { id: 'payments', label: 'Payments', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'system', label: 'System', icon: ServerIcon },
    { id: 'audit', label: 'Audit Log', icon: DocumentCheckIcon },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Configure and manage platform settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Save Success Notification */}
        {saveSuccess && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <p className="text-green-800">Settings saved successfully!</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div>
            <SettingSection
              title="Company Information"
              icon={BuildingOfficeIcon}
              description="Basic company details and contact information"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Company Name"
                  description="Display name shown throughout the platform"
                  required
                >
                  <input
                    type="text"
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
                
                <SettingRow
                  label="Company Logo"
                  description="Recommended size: 200x60px, PNG or JPG format"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={generalSettings.companyLogo}
                      alt="Company Logo"
                      className="h-12 w-auto rounded-lg"
                    />
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      Change Logo
                    </button>
                  </div>
                </SettingRow>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow label="Timezone">
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Africa/Lagos">West Africa Time (WAT)</option>
                      <option value="Africa/Abidjan">Greenwich Mean Time (GMT)</option>
                      <option value="Africa/Johannesburg">South Africa Standard Time (SAST)</option>
                    </select>
                  </SettingRow>
                  
                  <SettingRow label="Currency">
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </SettingRow>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow label="Date Format">
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </SettingRow>
                  
                  <SettingRow label="Time Format">
                    <select
                      value={generalSettings.timeFormat}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timeFormat: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="24h">24 Hour (14:30)</option>
                      <option value="12h">12 Hour (2:30 PM)</option>
                    </select>
                  </SettingRow>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Support Email"
                    description="Contact email for customer support"
                  >
                    <input
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Support Phone"
                    description="Contact phone number for support"
                  >
                    <input
                      type="tel"
                      value={generalSettings.supportPhone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <SettingRow
                  label="Website"
                  description="Company website URL"
                >
                  <input
                    type="url"
                    value={generalSettings.website}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Business Hours"
              icon={ClockIcon}
              description="Define operating hours for deliveries and support"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={generalSettings.businessHours.start}
                      onChange={(e) => setGeneralSettings(prev => ({
                        ...prev,
                        businessHours: { ...prev.businessHours, start: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={generalSettings.businessHours.end}
                      onChange={(e) => setGeneralSettings(prev => ({
                        ...prev,
                        businessHours: { ...prev.businessHours, end: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const days = [...generalSettings.businessHours.days];
                            if (days.includes(day)) {
                              setGeneralSettings(prev => ({
                                ...prev,
                                businessHours: {
                                  ...prev.businessHours,
                                  days: days.filter(d => d !== day)
                                }
                              }));
                            } else {
                              setGeneralSettings(prev => ({
                                ...prev,
                                businessHours: {
                                  ...prev.businessHours,
                                  days: [...days, day]
                                }
                              }));
                            }
                          }}
                          className={`px-3 py-1.5 text-sm rounded-lg ${
                            generalSettings.businessHours.days.includes(day)
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* Rate Management Tab */}
        {activeTab === 'rates' && (
          <div>
            <SettingSection
              title="Base Rate Configuration"
              icon={CalculatorIcon}
              description="Configure base rates for different service types"
              action={() => handleResetSettings('rates')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Service Rates</h4>
                  <button
                    onClick={handleAddRate}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Service
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Service Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Base Rate (₦)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Per KM (₦)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Per KG (₦)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Min. Charge (₦)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rates.baseRates.map(rate => (
                        <tr key={rate.id}>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={rate.service}
                              onChange={(e) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, service: e.target.value } : r
                                )
                              }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={rate.baseRate}
                              onChange={(e) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, baseRate: parseInt(e.target.value) || 0 } : r
                                )
                              }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={rate.perKm}
                              onChange={(e) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, perKm: parseInt(e.target.value) || 0 } : r
                                )
                              }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={rate.perKg}
                              onChange={(e) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, perKg: parseInt(e.target.value) || 0 } : r
                                )
                              }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={rate.minCharge}
                              onChange={(e) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, minCharge: parseInt(e.target.value) || 0 } : r
                                )
                              }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <ToggleSwitch
                              enabled={rate.active}
                              onChange={(enabled) => setRates(prev => ({
                                ...prev,
                                baseRates: prev.baseRates.map(r => 
                                  r.id === rate.id ? { ...r, active: enabled } : r
                                )
                              }))}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDeleteRate(rate.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Surcharges & Additional Fees"
              icon={BanknotesIcon}
              description="Configure additional fees for special conditions"
            >
              <div className="space-y-4">
                {rates.surcharges.map(surcharge => (
                  <div key={surcharge.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{surcharge.type}</h4>
                        {surcharge.timeRange && (
                          <p className="text-sm text-gray-500 mt-1">Time: {surcharge.timeRange}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="font-medium text-gray-900">
                            {surcharge.percentage ? `${surcharge.percentage}%` : formatCurrency(surcharge.flatFee)}
                          </span>
                          <p className="text-xs text-gray-500">Apply to: {surcharge.applyTo}</p>
                        </div>
                        <ToggleSwitch
                          enabled={surcharge.active}
                          onChange={(enabled) => setRates(prev => ({
                            ...prev,
                            surcharges: prev.surcharges.map(s => 
                              s.id === surcharge.id ? { ...s, active: enabled } : s
                            )
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Delivery Zones"
              icon={MapPinIcon}
              description="Define zones for zone-based pricing"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rates.zones.map(zone => (
                    <div key={zone.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{zone.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {zone.rateMultiplier}x
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Cities: {zone.cities.join(', ')}</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={zone.rateMultiplier}
                          onChange={(e) => setRates(prev => ({
                            ...prev,
                            zones: prev.zones.map(z => 
                              z.id === zone.id ? { ...z, rateMultiplier: parseFloat(e.target.value) } : z
                            )
                          }))}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Discounts & Promotions"
              icon={ChartBarIcon}
              description="Configure discounts for customers"
            >
              <div className="space-y-4">
                {rates.discounts.map(discount => (
                  <div key={discount.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{discount.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {discount.type === 'percentage' 
                            ? `${discount.value}% discount`
                            : `${formatCurrency(discount.value)} flat discount`
                          }
                          {discount.minShipments && ` • Min ${discount.minShipments} shipments`}
                          {discount.minMonths && ` • Min ${discount.minMonths} months`}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <ToggleSwitch
                          enabled={discount.active}
                          onChange={(enabled) => setRates(prev => ({
                            ...prev,
                            discounts: prev.discounts.map(d => 
                              d.id === discount.id ? { ...d, active: enabled } : d
                            )
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <SettingSection
              title="Payment Methods"
              icon={CreditCardIcon}
              description="Configure available payment methods and processing fees"
            >
              <div className="space-y-4">
                {paymentSettings.paymentMethods.map(method => (
                  <div key={method.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <CreditCardIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{method.method}</h4>
                          <p className="text-sm text-gray-500">
                            Processing fee: {method.processingFee}%
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={method.enabled}
                        onChange={(enabled) => setPaymentSettings(prev => ({
                          ...prev,
                          paymentMethods: prev.paymentMethods.map(m => 
                            m.id === method.id ? { ...m, enabled } : m
                          )
                        }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Cash on Delivery (COD)"
              icon={WalletIcon}
              description="Configure COD settings and fees"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Enable COD"
                  description="Allow cash on delivery payments"
                >
                  <ToggleSwitch
                    enabled={paymentSettings.codSettings.enabled}
                    onChange={(enabled) => setPaymentSettings(prev => ({
                      ...prev,
                      codSettings: { ...prev.codSettings, enabled }
                    }))}
                  />
                </SettingRow>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Maximum COD Amount"
                    description="Maximum amount allowed for COD"
                  >
                    <input
                      type="number"
                      value={paymentSettings.codSettings.maxAmount}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        codSettings: { ...prev.codSettings, maxAmount: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Collection Fee"
                    description="Percentage fee for COD collection"
                  >
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.codSettings.collectionFee}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          codSettings: { ...prev.codSettings, collectionFee: parseFloat(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">%</span>
                    </div>
                  </SettingRow>
                </div>
                
                <SettingRow
                  label="Settlement Days"
                  description="Days to settle COD collections"
                >
                  <input
                    type="number"
                    value={paymentSettings.codSettings.settlementDays}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      codSettings: { ...prev.codSettings, settlementDays: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Invoice Settings"
              icon={DocumentTextIcon}
              description="Configure invoice generation and terms"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Invoice Prefix"
                    description="Prefix for invoice numbers"
                  >
                    <input
                      type="text"
                      value={paymentSettings.invoiceSettings.prefix}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        invoiceSettings: { ...prev.invoiceSettings, prefix: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Next Invoice Number"
                    description="Starting number for next invoice"
                  >
                    <input
                      type="number"
                      value={paymentSettings.invoiceSettings.nextNumber}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        invoiceSettings: { ...prev.invoiceSettings, nextNumber: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <SettingRow
                  label="Payment Terms"
                  description="Default payment terms on invoices"
                >
                  <input
                    type="text"
                    value={paymentSettings.invoiceSettings.terms}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      invoiceSettings: { ...prev.invoiceSettings, terms: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Late Fee Percentage"
                    description="Late payment fee percentage"
                  >
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.invoiceSettings.lateFee}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          invoiceSettings: { ...prev.invoiceSettings, lateFee: parseFloat(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">%</span>
                    </div>
                  </SettingRow>
                  
                  <SettingRow
                    label="Tax Rate"
                    description="Default tax rate for invoices"
                  >
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={paymentSettings.invoiceSettings.taxRate}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          invoiceSettings: { ...prev.invoiceSettings, taxRate: parseFloat(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">%</span>
                    </div>
                  </SettingRow>
                </div>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Driver Payouts"
              icon={UserGroupIcon}
              description="Configure driver payment settings"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Payout Schedule"
                  description="Frequency of driver payments"
                >
                  <select
                    value={paymentSettings.payoutSettings.driverPayoutSchedule}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      payoutSettings: { ...prev.payoutSettings, driverPayoutSchedule: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </SettingRow>
                
                <SettingRow
                  label="Payout Method"
                  description="Default payment method for drivers"
                >
                  <select
                    value={paymentSettings.payoutSettings.payoutMethod}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      payoutSettings: { ...prev.payoutSettings, payoutMethod: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="cash">Cash</option>
                  </select>
                </SettingRow>
                
                <SettingRow
                  label="Minimum Payout Amount"
                  description="Minimum amount required for payout"
                >
                  <input
                    type="number"
                    value={paymentSettings.payoutSettings.minimumPayout}
                    onChange={(e) => setPaymentSettings(prev => ({
                      ...prev,
                      payoutSettings: { ...prev.payoutSettings, minimumPayout: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
                
                <SettingRow
                  label="Auto-Approve Payouts"
                  description="Automatically approve payouts meeting criteria"
                >
                  <ToggleSwitch
                    enabled={paymentSettings.payoutSettings.autoApprove}
                    onChange={(enabled) => setPaymentSettings(prev => ({
                      ...prev,
                      payoutSettings: { ...prev.payoutSettings, autoApprove: enabled }
                    }))}
                  />
                </SettingRow>
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <SettingSection
              title="Email Templates"
              icon={EnvelopeIcon}
              description="Configure email notification templates"
            >
              <div className="space-y-4">
                {notificationSettings.emailTemplates.map(template => (
                  <div key={template.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Subject: {template.subject}</p>
                      </div>
                      <ToggleSwitch
                        enabled={template.enabled}
                        onChange={(enabled) => setNotificationSettings(prev => ({
                          ...prev,
                          emailTemplates: prev.emailTemplates.map(t => 
                            t.id === template.id ? { ...t, enabled } : t
                          )
                        }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SettingSection>
            
            <SettingSection
              title="SMS Settings"
              icon={BellIcon}
              description="Configure SMS notification settings"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Enable SMS Notifications"
                  description="Send SMS notifications to customers and drivers"
                >
                  <ToggleSwitch
                    enabled={notificationSettings.smsSettings.enabled}
                    onChange={(enabled) => setNotificationSettings(prev => ({
                      ...prev,
                      smsSettings: { ...prev.smsSettings, enabled }
                    }))}
                  />
                </SettingRow>
                
                {notificationSettings.smsSettings.enabled && (
                  <>
                    <SettingRow
                      label="SMS Provider"
                      description="SMS gateway provider"
                    >
                      <select
                        value={notificationSettings.smsSettings.provider}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsSettings: { ...prev.smsSettings, provider: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Twilio">Twilio</option>
                        <option value="Termii">Termii</option>
                        <option value="BulkSMS">BulkSMS</option>
                      </select>
                    </SettingRow>
                    
                    <SettingRow
                      label="Sender ID"
                      description="Display name for SMS sender"
                    >
                      <input
                        type="text"
                        value={notificationSettings.smsSettings.senderId}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsSettings: { ...prev.smsSettings, senderId: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </SettingRow>
                    
                    <SettingRow
                      label="Low Balance Alert"
                      description="Alert when SMS balance is low"
                    >
                      <input
                        type="number"
                        value={notificationSettings.smsSettings.lowBalanceAlert}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsSettings: { ...prev.smsSettings, lowBalanceAlert: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </SettingRow>
                  </>
                )}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Push Notifications"
              icon={BellIcon}
              description="Configure mobile push notifications"
            >
              <div className="space-y-4">
                {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Send push notification for {key.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={value}
                      onChange={(enabled) => setNotificationSettings(prev => ({
                        ...prev,
                        pushNotifications: { ...prev.pushNotifications, [key]: enabled }
                      }))}
                    />
                  </div>
                ))}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Webhooks"
              icon={LinkIcon}
              description="Configure external API webhooks"
            >
              <div className="space-y-4">
                {notificationSettings.webhooks.map(webhook => (
                  <div key={webhook.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 break-all">{webhook.url}</p>
                      </div>
                      <ToggleSwitch
                        enabled={webhook.enabled}
                        onChange={(enabled) => setNotificationSettings(prev => ({
                          ...prev,
                          webhooks: prev.webhooks.map(w => 
                            w.id === webhook.id ? { ...w, enabled } : w
                          )
                        }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <SettingSection
              title="Password Policy"
              icon={LockClosedIcon}
              description="Configure password requirements and policies"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Minimum Password Length"
                    description="Minimum number of characters"
                  >
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.minLength}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, minLength: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Password Expiry Days"
                    description="Days before password expires"
                  >
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.expireDays}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, expireDays: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Maximum Login Attempts"
                    description="Failed attempts before lockout"
                  >
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.maxAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, maxAttempts: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Lockout Duration (minutes)"
                    description="Minutes account stays locked"
                  >
                    <input
                      type="number"
                      value={securitySettings.passwordPolicy.lockoutMinutes}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, lockoutMinutes: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Require Numbers</p>
                      <p className="text-sm text-gray-500">Password must contain numbers</p>
                    </div>
                    <ToggleSwitch
                      enabled={securitySettings.passwordPolicy.requireNumbers}
                      onChange={(enabled) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, requireNumbers: enabled }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Require Special Characters</p>
                      <p className="text-sm text-gray-500">Password must contain special characters</p>
                    </div>
                    <ToggleSwitch
                      enabled={securitySettings.passwordPolicy.requireSpecialChars}
                      onChange={(enabled) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: { ...prev.passwordPolicy, requireSpecialChars: enabled }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Two-Factor Authentication"
              icon={ShieldCheckIcon}
              description="Configure 2FA settings for enhanced security"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Enable Two-Factor Authentication"
                  description="Add an extra layer of security"
                >
                  <ToggleSwitch
                    enabled={securitySettings.twoFactorAuth.enabled}
                    onChange={(enabled) => setSecuritySettings(prev => ({
                      ...prev,
                      twoFactorAuth: { ...prev.twoFactorAuth, enabled }
                    }))}
                  />
                </SettingRow>
                
                {securitySettings.twoFactorAuth.enabled && (
                  <>
                    <SettingRow
                      label="Required for Administrators"
                      description="Force 2FA for all admin users"
                    >
                      <ToggleSwitch
                        enabled={securitySettings.twoFactorAuth.requiredForAdmins}
                        onChange={(enabled) => setSecuritySettings(prev => ({
                          ...prev,
                          twoFactorAuth: { ...prev.twoFactorAuth, requiredForAdmins: enabled }
                        }))}
                      />
                    </SettingRow>
                    
                    <SettingRow
                      label="Required for Drivers"
                      description="Force 2FA for all driver accounts"
                    >
                      <ToggleSwitch
                        enabled={securitySettings.twoFactorAuth.requiredForDrivers}
                        onChange={(enabled) => setSecuritySettings(prev => ({
                          ...prev,
                          twoFactorAuth: { ...prev.twoFactorAuth, requiredForDrivers: enabled }
                        }))}
                      />
                    </SettingRow>
                    
                    <SettingRow
                      label="Authentication Methods"
                      description="Allowed 2FA methods"
                    >
                      <div className="space-y-2">
                        {securitySettings.twoFactorAuth.methods.map(method => (
                          <div key={method} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700 capitalize">{method}</span>
                          </div>
                        ))}
                      </div>
                    </SettingRow>
                  </>
                )}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Session Settings"
              icon={ClockIcon}
              description="Configure user session management"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Session Timeout (minutes)"
                  description="Inactivity timeout before automatic logout"
                >
                  <input
                    type="number"
                    value={securitySettings.sessionSettings.timeoutMinutes}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionSettings: { ...prev.sessionSettings, timeoutMinutes: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
                
                <SettingRow
                  label="Maximum Concurrent Sessions"
                  description="Maximum number of simultaneous sessions per user"
                >
                  <input
                    type="number"
                    value={securitySettings.sessionSettings.maxSessions}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionSettings: { ...prev.sessionSettings, maxSessions: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </SettingRow>
                
                <SettingRow
                  label="Allow Concurrent Sessions"
                  description="Allow users to be logged in from multiple devices"
                >
                  <ToggleSwitch
                    enabled={securitySettings.sessionSettings.concurrentSessions}
                    onChange={(enabled) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionSettings: { ...prev.sessionSettings, concurrentSessions: enabled }
                    }))}
                  />
                </SettingRow>
              </div>
            </SettingSection>
            
            <SettingSection
              title="API Security"
              icon={KeyIcon}
              description="Manage API keys and security settings"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">API Keys</h4>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                      <PlusIcon className="h-4 w-4" />
                      Generate New Key
                    </button>
                  </div>
                  
                  {securitySettings.apiSecurity.apiKeys.map(apiKey => (
                    <div key={apiKey.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Last used: {apiKey.lastUsed}</p>
                        </div>
                        <ToggleSwitch
                          enabled={apiKey.enabled}
                          onChange={(enabled) => setSecuritySettings(prev => ({
                            ...prev,
                            apiSecurity: {
                              ...prev.apiSecurity,
                              apiKeys: prev.apiSecurity.apiKeys.map(key => 
                                key.id === apiKey.id ? { ...key, enabled } : key
                              )
                            }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm bg-gray-100 px-3 py-1.5 rounded font-mono">
                          {apiKey.key}
                        </code>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRegenerateApiKey(apiKey.id)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Regenerate
                          </button>
                          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Rate Limit (requests/minute)"
                    description="Maximum API requests per minute"
                  >
                    <input
                      type="number"
                      value={securitySettings.apiSecurity.rateLimit.requestsPerMinute}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        apiSecurity: {
                          ...prev.apiSecurity,
                          rateLimit: { ...prev.apiSecurity.rateLimit, requestsPerMinute: parseInt(e.target.value) || 0 }
                        }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Burst Limit"
                    description="Maximum burst requests allowed"
                  >
                    <input
                      type="number"
                      value={securitySettings.apiSecurity.rateLimit.burstLimit}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        apiSecurity: {
                          ...prev.apiSecurity,
                          rateLimit: { ...prev.apiSecurity.rateLimit, burstLimit: parseInt(e.target.value) || 0 }
                        }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <SettingRow
                  label="IP Whitelist"
                  description="Allowed IP addresses for API access"
                >
                  <textarea
                    value={securitySettings.apiSecurity.ipWhitelist.join('\n')}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      apiSecurity: {
                        ...prev.apiSecurity,
                        ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
                      }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Enter one IP address or CIDR per line"
                  />
                </SettingRow>
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* System Tab */}
        {activeTab === 'system' && (
          <div>
            <SettingSection
              title="Maintenance Mode"
              icon={ServerIcon}
              description="Configure system maintenance settings"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Enable Maintenance Mode"
                  description="Take system offline for maintenance"
                >
                  <ToggleSwitch
                    enabled={systemConfig.maintenance.enabled}
                    onChange={(enabled) => setSystemConfig(prev => ({
                      ...prev,
                      maintenance: { ...prev.maintenance, enabled }
                    }))}
                  />
                </SettingRow>
                
                {systemConfig.maintenance.enabled && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SettingRow
                        label="Start Time"
                        description="Maintenance start time"
                      >
                        <input
                          type="datetime-local"
                          value={systemConfig.maintenance.startTime}
                          onChange={(e) => setSystemConfig(prev => ({
                            ...prev,
                            maintenance: { ...prev.maintenance, startTime: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </SettingRow>
                      
                      <SettingRow
                        label="End Time"
                        description="Maintenance end time"
                      >
                        <input
                          type="datetime-local"
                          value={systemConfig.maintenance.endTime}
                          onChange={(e) => setSystemConfig(prev => ({
                            ...prev,
                            maintenance: { ...prev.maintenance, endTime: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </SettingRow>
                    </div>
                    
                    <SettingRow
                      label="Maintenance Message"
                      description="Message shown to users during maintenance"
                    >
                      <textarea
                        value={systemConfig.maintenance.message}
                        onChange={(e) => setSystemConfig(prev => ({
                          ...prev,
                          maintenance: { ...prev.maintenance, message: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </SettingRow>
                  </>
                )}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Backup Settings"
              icon={DatabaseIcon}
              description="Configure system backup and recovery"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Automatic Backups"
                  description="Enable automatic database backups"
                >
                  <ToggleSwitch
                    enabled={systemConfig.backupSettings.autoBackup}
                    onChange={(enabled) => setSystemConfig(prev => ({
                      ...prev,
                      backupSettings: { ...prev.backupSettings, autoBackup: enabled }
                    }))}
                  />
                </SettingRow>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Backup Frequency"
                    description="How often to create backups"
                  >
                    <select
                      value={systemConfig.backupSettings.frequency}
                      onChange={(e) => setSystemConfig(prev => ({
                        ...prev,
                        backupSettings: { ...prev.backupSettings, frequency: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </SettingRow>
                  
                  <SettingRow
                    label="Retention Period (days)"
                    description="Days to keep backup files"
                  >
                    <input
                      type="number"
                      value={systemConfig.backupSettings.retentionDays}
                      onChange={(e) => setSystemConfig(prev => ({
                        ...prev,
                        backupSettings: { ...prev.backupSettings, retentionDays: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
                
                <SettingRow
                  label="Cloud Storage"
                  description="Store backups in cloud storage"
                >
                  <ToggleSwitch
                    enabled={systemConfig.backupSettings.cloudStorage}
                    onChange={(enabled) => setSystemConfig(prev => ({
                      ...prev,
                      backupSettings: { ...prev.backupSettings, cloudStorage: enabled }
                    }))}
                  />
                </SettingRow>
                
                {systemConfig.backupSettings.lastBackup && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Last Backup Successful</p>
                        <p className="text-sm text-green-600">
                          Completed: {formatDate(systemConfig.backupSettings.lastBackup)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SettingSection>
            
            <SettingSection
              title="Performance Settings"
              icon={CpuChipIcon}
              description="Configure system performance and optimization"
            >
              <div className="space-y-6">
                <SettingRow
                  label="Enable Caching"
                  description="Cache frequently accessed data"
                >
                  <ToggleSwitch
                    enabled={systemConfig.performance.cacheEnabled}
                    onChange={(enabled) => setSystemConfig(prev => ({
                      ...prev,
                      performance: { ...prev.performance, cacheEnabled: enabled }
                    }))}
                  />
                </SettingRow>
                
                {systemConfig.performance.cacheEnabled && (
                  <SettingRow
                    label="Cache Duration (seconds)"
                    description="Time to keep cached data"
                  >
                    <input
                      type="number"
                      value={systemConfig.performance.cacheDuration}
                      onChange={(e) => setSystemConfig(prev => ({
                        ...prev,
                        performance: { ...prev.performance, cacheDuration: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                )}
                
                <SettingRow
                  label="Image Optimization"
                  description="Optimize images for faster loading"
                >
                  <ToggleSwitch
                    enabled={systemConfig.performance.imageOptimization}
                    onChange={(enabled) => setSystemConfig(prev => ({
                      ...prev,
                      performance: { ...prev.performance, imageOptimization: enabled }
                    }))}
                  />
                </SettingRow>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingRow
                    label="Maximum File Size (MB)"
                    description="Maximum file size for uploads"
                  >
                    <input
                      type="number"
                      value={systemConfig.performance.maxFileSize}
                      onChange={(e) => setSystemConfig(prev => ({
                        ...prev,
                        performance: { ...prev.performance, maxFileSize: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                  
                  <SettingRow
                    label="Concurrent Jobs"
                    description="Maximum concurrent background jobs"
                  >
                    <input
                      type="number"
                      value={systemConfig.performance.concurrentJobs}
                      onChange={(e) => setSystemConfig(prev => ({
                        ...prev,
                        performance: { ...prev.performance, concurrentJobs: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </SettingRow>
                </div>
              </div>
            </SettingSection>
            
            <SettingSection
              title="Integrations"
              icon={LinkIcon}
              description="Manage third-party integrations"
            >
              <div className="space-y-4">
                {systemConfig.integrations.map(integration => (
                  <div key={integration.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CloudIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-500">
                            {integration.testMode ? 'Test Mode' : 'Live Mode'}
                            {integration.lastSync && ` • Last sync: ${integration.lastSync}`}
                          </p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={integration.enabled}
                        onChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                    
                    {integration.enabled && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <KeyIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">API Key: {integration.apiKey}</span>
                          </div>
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            Edit
                          </button>
                        </div>
                        
                        {integration.balance && (
                          <div className="flex items-center gap-2 mt-2">
                            <BanknotesIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Balance: {formatCurrency(integration.balance)}
                            </span>
                          </div>
                        )}
                        
                        {integration.emailsSent && (
                          <div className="flex items-center gap-2 mt-2">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Emails sent: {integration.emailsSent}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SettingSection>
          </div>
        )}
        
        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <div>
            <SettingSection
              title="Audit Log"
              icon={DocumentCheckIcon}
              description="View system activity and changes"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                      Last 7 days
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Export Log
                    </button>
                  </div>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search audit log..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Timestamp</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(log.timestamp)}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-blue-100 rounded-full">
                                <UserIcon className="h-3 w-3 text-blue-600" />
                              </div>
                              <span className="text-sm text-gray-900">{log.user}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-900">{log.action}</span>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{log.ip}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing {auditLogs.length} audit entries
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        1
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SettingSection>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Clear Audit Log</h3>
                  <p className="text-sm text-gray-500">Permanently delete audit log entries</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Clearing the audit log will permanently delete all audit entries. This action cannot be undone.
                </p>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Delete entries older than 90 days</option>
                    <option>Delete entries older than 180 days</option>
                    <option>Delete all entries</option>
                  </select>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Clear Audit Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;
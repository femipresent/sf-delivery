import React, { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import UserManagement from '../../adminsidepages/UserManagement';
import DriverManagement from '../../adminsidepages/DriverManagement';
import ShipperManagement from '../../adminsidepages/ShipperManagement';
import Analytics from '../../adminsidepages/Analytics';
import PaymentBilling from '../../adminsidepages/PaymentBilling';
import PODManagement from '../../adminsidepages/PODManagement';
import Reports from '../../adminsidepages/Reports';
import SystemSettings from '../../adminsidepages/SystemSettings';
import SecurityManagement from '../../adminsidepages/SecurityManagement';

const AdminDashboard = ({ onLogout, user, activeModule = 'dashboard', onModuleChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);

  // Mock data for notifications
  const notifications = [
    { id: 1, title: 'New User Registration', message: 'John Doe has registered as a new shipper', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment Received', message: 'Payment of ₦125,000 received from ABC Retail', time: '1 hour ago', unread: true },
    { id: 3, title: 'System Update', message: 'Scheduled maintenance tonight at 2 AM', time: '3 hours ago', unread: false },
    { id: 4, title: 'New Driver Approved', message: 'Driver Musa Ibrahim has been approved', time: '5 hours ago', unread: false },
    { id: 5, title: 'Delivery Alert', message: '3 deliveries pending verification', time: '1 day ago', unread: false },
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'users', label: 'User Management', icon: UserGroupIcon },
    { id: 'drivers', label: 'Driver Management', icon: TruckIcon },
    { id: 'shippers', label: 'Shipper Management', icon: BuildingStorefrontIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'payments', label: 'Payments & Billing', icon: CurrencyDollarIcon },
    { id: 'pod', label: 'POD Management', icon: ClipboardDocumentCheckIcon },
    { id: 'reports', label: 'Reports', icon: DocumentTextIcon },
    { id: 'settings', label: 'System Settings', icon: CogIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
  ];

  // Quick stats
  const quickStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', color: 'blue' },
    { label: 'Active Drivers', value: '156', change: '+5%', color: 'green' },
    { label: 'Shippers', value: '89', change: '+8%', color: 'purple' },
    { label: 'Revenue Today', value: '₦425,000', change: '+15%', color: 'red' },
  ];

  // Recent activities
  const recentActivities = [
    { user: 'Admin User', action: 'Updated system settings', time: '10 min ago' },
    { user: 'Sarah Johnson', action: 'Added new delivery route', time: '25 min ago' },
    { user: 'System', action: 'Generated monthly report', time: '1 hour ago' },
    { user: 'Musa Ibrahim', action: 'Completed delivery #DLV-2024-001234', time: '2 hours ago' },
    { user: 'ABC Retail', action: 'Made payment of ₦125,000', time: '3 hours ago' },
  ];

  // Handle logout
  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('sf_user');
    localStorage.removeItem('sf_currentPage');
    localStorage.removeItem('sf_adminModule');
    if (onLogout) {
      onLogout();
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  // Handle navigation
  const handleNavigation = (moduleId) => {
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
    // Save to localStorage
    localStorage.setItem('sf_adminModule', moduleId);
  };

  // Handle quick action
  const handleQuickAction = (action) => {
    if (action === 'Add New User') {
      setIsAddUserModalOpen(true);
    } else if (action === 'Generate Report') {
      setIsGenerateReportModalOpen(true);
    } else {
      alert(`${action} action clicked`);
    }
  };

  // Render content based on active module
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return renderDashboardContent();
      case 'users':
        return renderUsersContent();
      case 'drivers':
        return renderDriversContent();
      case 'shippers':
        return renderShippersContent();
      case 'analytics':
        return renderAnalyticsContent();
      case 'payments':
        return renderPaymentsContent();
      case 'pod':
        return renderPODContent();
      case 'reports':
        return renderReportsContent();
      case 'settings':
        return renderSettingsContent();
      case 'security':
        return renderSecurityContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Overview */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">99.8%</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">247</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm font-medium text-gray-900">API Requests</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12.4K</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button 
              onClick={() => handleNavigation('payments')}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, user: 'ABC Retail', amount: '₦125,000', type: 'Payment', status: 'Completed', time: '10:30 AM' },
              { id: 2, user: 'XYZ Wholesalers', amount: '₦89,500', type: 'Refund', status: 'Pending', time: '09:45 AM' },
              { id: 3, user: 'Tech Solutions', amount: '₦45,000', type: 'Payment', status: 'Completed', time: 'Yesterday' },
              { id: 4, user: 'Fresh Foods', amount: '₦67,800', type: 'Payment', status: 'Completed', time: 'Yesterday' },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{transaction.user}</p>
                  <p className="text-sm text-gray-500">{transaction.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{transaction.amount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <span className="text-xs text-gray-500">{transaction.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity (Last 7 Days)</h3>
        <div className="h-64 flex items-end gap-2">
          {[65, 78, 92, 85, 96, 88, 72].map((value, index) => {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const height = (value / 100) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{days[index]}</span>
                <span className="text-sm font-medium text-gray-900 mt-1">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderUsersContent = () => (
    <UserManagement />
  );

  const renderDriversContent = () => (
    <DriverManagement />
  );

  const renderShippersContent = () => (
    <ShipperManagement />
  );

  const renderAnalyticsContent = () => (
    <Analytics />
  );

  const renderPaymentsContent = () => (
    <PaymentBilling />
  );

  const renderPODContent = () => (
    <PODManagement />
  );

  const renderReportsContent = () => (
    <Reports />
  );

  const renderSettingsContent = () => (
    <SystemSettings />
  );

  const renderSecurityContent = () => (
    <SecurityManagement />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo/Brand */}
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-2xl mx-4 hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, drivers, shipments, or reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
                >
                  <BellIcon className="h-5 w-5" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsNotificationsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <span className="text-sm text-red-600 font-medium">
                            {notifications.filter(n => n.unread).length} new
                          </span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 p-2 rounded-lg ${notification.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <BellIcon className={`h-4 w-4 ${notification.unread ? 'text-blue-600' : 'text-gray-600'}`} />
                              </div>
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                              </div>
                              {notification.unread && (
                                <div className="ml-2">
                                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setIsNotificationsOpen(false);
                            handleNavigation('notifications');
                          }}
                          className="w-full text-center text-sm font-medium text-red-600 hover:text-red-700 rounded-full py-2 hover:bg-red-50"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{user?.name?.charAt(0) || 'A'}</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500"></p>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 hidden md:block" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">{user?.name?.charAt(0) || 'A'}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user?.name || 'Admin'}</p>
                            <p className="text-sm text-gray-500">{user?.email || 'admin@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleNavigation('profile');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <UserCircleIcon className="h-5 w-5 mr-3" />
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleNavigation('settings');
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <CogIcon className="h-5 w-5 mr-3" />
                          Settings
                        </button>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span className="ml-2 text-lg font-semibold">Search</span>
              </div>
              <form onSubmit={handleSearch} className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, drivers, shipments, or reports..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:relative lg:translate-x-0 z-30 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item.id)}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-full transition-colors ${
                          activeModule === item.id
                            ? 'bg-red-50 text-red-700 border border-red-100'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Stats Section */}
              <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stat.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          stat.color === 'green' ? 'bg-green-100 text-green-800' :
                          stat.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivities.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserCircleIcon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.user}</p>
                        <p className="text-xs text-gray-600 truncate">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            {/* Bottom Section - System Status */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">System Status</span>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">All Systems OK</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: Today, 14:30
              </div>
              <button
                onClick={() => handleNavigation('system-status')}
                className="w-full mt-3 text-sm font-medium text-red-600 hover:text-red-700 text-center py-2 rounded-full hover:bg-red-50"
              >
                View System Details
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Content Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {navItems.find(item => item.id === activeModule)?.label || 'Administration Dashboard'}
                </h1>
                <p className="text-gray-600 mt-2">Manage users, drivers, shippers, and system settings</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleQuickAction('Add New User')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add New User
                </button>
                <button
                  onClick={() => handleQuickAction('Generate Report')}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors"
                >
                  <DocumentTextIcon className="h-5 w-5" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { id: 'users', icon: UserGroupIcon, label: 'User Management', value: '1,247 Users', color: 'blue' },
              { id: 'drivers', icon: TruckIcon, label: 'Driver Management', value: '156 Drivers', color: 'green' },
              { id: 'shippers', icon: BuildingStorefrontIcon, label: 'Shipper Management', value: '89 Shippers', color: 'purple' },
              { id: 'payments', icon: CurrencyDollarIcon, label: 'Payment Overview', value: '₦425K Today', color: 'red' },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => handleNavigation(card.id)}
                  className={`bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 border border-${card.color}-200 rounded-2xl p-5 text-left hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 text-${card.color}-600`} />
                    <span className={`text-sm font-medium text-${card.color}-700`}>{card.label}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-3">{card.value}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.id === 'users' && 'Manage all system users'}
                    {card.id === 'drivers' && 'Active and pending drivers'}
                    {card.id === 'shippers' && 'Business and individual shippers'}
                    {card.id === 'payments' && 'Transactions and settlements'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* System Alerts */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-5 mb-6">
            <div className="flex items-start">
              <ExclamationCircleIcon className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900">System Alert</h3>
                <p className="text-yellow-800 mt-1">
                  Scheduled maintenance is planned for tonight at 2:00 AM. The system will be unavailable for approximately 30 minutes.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Today, 2:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">30 minutes downtime</span>
                  </div>
                </div>
              </div>
              <button className="text-sm font-medium text-yellow-700 hover:text-yellow-800 whitespace-nowrap">
                Dismiss
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            {renderModuleContent()}
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-500">
              <div>
                <p>© 2024 Delivery Management System. All rights reserved.</p>
                <p className="mt-1">Version 2.4.1 • Last updated: Today, 14:30</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => handleNavigation('help')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Help & Support
                </button>
                <button
                  onClick={() => handleNavigation('terms')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleNavigation('privacy')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                <p className="text-sm text-gray-500">Create a new user account</p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Type *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="">Select user type</option>
                      <option value="driver">Driver</option>
                      <option value="shipper">Shipper</option>
                      <option value="dispatcher">Dispatcher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="">Select role</option>
                      <option value="driver">Driver</option>
                      <option value="senior_driver">Senior Driver</option>
                      <option value="shipper">Shipper</option>
                      <option value="shipper_admin">Shipper Admin</option>
                      <option value="dispatcher">Dispatcher</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter business name (optional)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows="3"
                    placeholder="Enter address (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('User created successfully!');
                  setIsAddUserModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {isGenerateReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
                <p className="text-sm text-gray-500">Create and download system reports</p>
              </div>
              <button
                onClick={() => setIsGenerateReportModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="">Select report type</option>
                      <option value="user_activity">User Activity Report</option>
                      <option value="financial">Financial Report</option>
                      <option value="shipment">Shipment Report</option>
                      <option value="performance">Performance Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="">Select date range</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Format *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Include Details</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-sm text-gray-700">Charts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Summary</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows="3"
                    placeholder="Any additional notes or requirements..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setIsGenerateReportModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Report generated and downloaded successfully!');
                  setIsGenerateReportModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
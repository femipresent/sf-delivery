import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  LockClosedIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  UserIcon,
  BuildingOfficeIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  CheckIcon,
  XMarkIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const SecurityManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  // Users Management
  const [users, setUsers] = useState([]);
  
  // Roles & Permissions
  const [roles, setRoles] = useState([
    {
      id: 'ROLE-001',
      name: 'Super Admin',
      description: 'Full system access and administration',
      userCount: 1,
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        shipments: { view: true, create: true, edit: true, delete: true },
        drivers: { view: true, create: true, edit: true, delete: true },
        vehicles: { view: true, create: true, edit: true, delete: true },
        dispatch: { view: true, create: true, edit: true, delete: true },
        billing: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
        security: { view: true, create: true, edit: true, delete: true },
      },
    },
    {
      id: 'ROLE-002',
      name: 'Dispatcher',
      description: 'Manage shipments and driver assignments',
      userCount: 3,
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        shipments: { view: true, create: true, edit: true, delete: false },
        drivers: { view: true, create: false, edit: true, delete: false },
        vehicles: { view: true, create: false, edit: false, delete: false },
        dispatch: { view: true, create: true, edit: true, delete: false },
        billing: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 'ROLE-003',
      name: 'Driver',
      description: 'View and update assigned shipments',
      userCount: 45,
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        shipments: { view: true, create: false, edit: true, delete: false },
        drivers: { view: false, create: false, edit: false, delete: false },
        vehicles: { view: true, create: false, edit: false, delete: false },
        dispatch: { view: false, create: false, edit: false, delete: false },
        billing: { view: true, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 'ROLE-004',
      name: 'Shipper',
      description: 'Create and track shipments',
      userCount: 128,
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        shipments: { view: true, create: true, edit: true, delete: false },
        drivers: { view: false, create: false, edit: false, delete: false },
        vehicles: { view: false, create: false, edit: false, delete: false },
        dispatch: { view: false, create: false, edit: false, delete: false },
        billing: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 'ROLE-005',
      name: 'Accountant',
      description: 'Manage billing and payments',
      userCount: 2,
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        shipments: { view: true, create: false, edit: false, delete: false },
        drivers: { view: true, create: false, edit: false, delete: false },
        vehicles: { view: false, create: false, edit: false, delete: false },
        dispatch: { view: false, create: false, edit: false, delete: false },
        billing: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
      },
    },
  ]);
  
  // Security Events
  const [securityEvents, setSecurityEvents] = useState([]);
  
  // Login History
  const [loginHistory, setLoginHistory] = useState([]);
  
  // Active Sessions
  const [activeSessions, setActiveSessions] = useState([]);
  
  // State for modals and forms
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: ClockIcon },
      suspended: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
      investigating: { color: 'bg-yellow-100 text-yellow-800', icon: ExclamationTriangleIcon },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      success: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      failed: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    };
    
    const configItem = config[status] || config.inactive;
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  const getSeverityBadge = (severity) => {
    const config = {
      high: { color: 'bg-red-100 text-red-800', label: 'High' },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
      low: { color: 'bg-blue-100 text-blue-800', label: 'Low' },
    };
    
    const configItem = config[severity] || config.low;
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        {configItem.label}
      </span>
    );
  };
  
  const getRoleColor = (role) => {
    const colors = {
      'Super Admin': 'bg-purple-100 text-purple-800',
      'Dispatcher': 'bg-blue-100 text-blue-800',
      'Driver': 'bg-green-100 text-green-800',
      'Shipper': 'bg-orange-100 text-orange-800',
      'Accountant': 'bg-pink-100 text-pink-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };
  
  // Action handlers
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };
  
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      showNotificationMessage('User deleted successfully', 'success');
    }
  };
  
  const handleToggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    showNotificationMessage(`User status updated to ${newStatus}`, 'success');
  };
  
  const handleAddRole = () => {
    setSelectedRole(null);
    setShowRoleModal(true);
  };
  
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };
  
  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
      showNotificationMessage('Role deleted successfully', 'success');
    }
  };
  
  const handleTerminateSession = (sessionId) => {
    if (window.confirm('Terminate this session?')) {
      setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
      showNotificationMessage('Session terminated successfully', 'success');
    }
  };
  
  const handleTerminateAllSessions = () => {
    if (window.confirm('Terminate all active sessions?')) {
      setActiveSessions([]);
      showNotificationMessage('All sessions terminated', 'success');
    }
  };
  
  const handleExportData = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotificationMessage(`${type} exported successfully`, 'success');
    }, 1000);
  };
  
  // Filtered data
  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    return filtered;
  }, [users, searchTerm, statusFilter, roleFilter]);
  
  // Stats calculation
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const adminUsers = users.filter(u => u.role === 'Super Admin').length;
    const twoFactorUsers = users.filter(u => u.twoFactor).length;
    const todayLogins = loginHistory.filter(l => 
      new Date(l.timestamp).toDateString() === new Date().toDateString()
    ).length;
    const failedLogins = loginHistory.filter(l => l.status === 'failed').length;
    const activeSessionsCount = activeSessions.length;
    const securityAlerts = securityEvents.filter(e => e.status === 'investigating').length;
    
    return {
      totalUsers,
      activeUsers,
      adminUsers,
      twoFactorUsers,
      todayLogins,
      failedLogins,
      activeSessionsCount,
      securityAlerts,
    };
  }, [users, loginHistory, activeSessions, securityEvents]);
  
  // Permission Toggle Component
  const PermissionToggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
  
  // Permission Matrix Component
  const PermissionMatrix = ({ permissions }) => {
    const modules = [
      { key: 'users', label: 'Users Management' },
      { key: 'shipments', label: 'Shipments' },
      { key: 'drivers', label: 'Drivers' },
      { key: 'vehicles', label: 'Vehicles' },
      { key: 'dispatch', label: 'Dispatch' },
      { key: 'billing', label: 'Billing & Payments' },
      { key: 'reports', label: 'Reports & Analytics' },
      { key: 'settings', label: 'System Settings' },
      { key: 'security', label: 'Security' },
    ];
    
    const actions = ['view', 'create', 'edit', 'delete'];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Module</th>
              {actions.map(action => (
                <th key={action} className="px-4 py-3 text-center text-sm font-medium text-gray-700 capitalize">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {modules.map(module => (
              <tr key={module.key}>
                <td className="px-4 py-3 text-sm text-gray-900">{module.label}</td>
                {actions.map(action => (
                  <td key={action} className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      {permissions[module.key]?.[action] ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // User Card Component
  const UserCard = ({ user }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <UserIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
          {getStatusBadge(user.status)}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-sm">
          <p className="text-gray-500">Last Login</p>
          <p className="font-medium">{formatDate(user.lastLogin)}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">2FA</p>
          <p className={`font-medium ${user.twoFactor ? 'text-green-600' : 'text-gray-600'}`}>
            {user.twoFactor ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <DevicePhoneMobileIcon className="h-4 w-4" />
          <span>{user.devices} device{user.devices !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleToggleUserStatus(user.id, user.status)}
            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
          >
            {user.status === 'active' ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
  
  // Security Event Card Component
  const SecurityEventCard = ({ event }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {getSeverityBadge(event.severity)}
            <span className="text-sm font-medium text-gray-900">{event.type.replace('_', ' ')}</span>
          </div>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>
        {getStatusBadge(event.status)}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">User</p>
          <p className="font-medium">{event.user}</p>
        </div>
        <div>
          <p className="text-gray-500">IP Address</p>
          <code className="font-mono text-gray-900">{event.ip}</code>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium">{event.location}</p>
        </div>
        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium">{formatDate(event.timestamp)}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Mark as Resolved
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Investigate
          </button>
        </div>
      </div>
    </div>
  );
  
  // Tab Navigation
  const tabs = [
    { id: 'users', label: 'Users', icon: UserGroupIcon, count: stats.totalUsers },
    { id: 'roles', label: 'Roles', icon: ShieldCheckIcon, count: roles.length },
    { id: 'sessions', label: 'Sessions', icon: ComputerDesktopIcon, count: stats.activeSessionsCount },
    { id: 'login-history', label: 'Login History', icon: ClockIcon, count: stats.todayLogins },
    { id: 'security-events', label: 'Security Events', icon: ExclamationTriangleIcon, count: stats.securityAlerts },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security & Access Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage users, roles, permissions, and security monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExportData('security_report')}
              disabled={isLoading}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <ArrowDownTrayIcon className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
              Export Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700">Total Users</p>
                <p className="text-lg font-bold text-blue-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-700">Active Users</p>
                <p className="text-lg font-bold text-green-900">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700">2FA Enabled</p>
                <p className="text-lg font-bold text-purple-900">{stats.twoFactorUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-700">Security Alerts</p>
                <p className="text-lg font-bold text-yellow-900">{stats.securityAlerts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ComputerDesktopIcon className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Active Sessions</p>
                <p className="text-lg font-bold text-orange-900">{stats.activeSessionsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-pink-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-pink-600" />
              <div>
                <p className="text-sm text-pink-700">Today's Logins</p>
                <p className="text-lg font-bold text-pink-900">{stats.todayLogins}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <XCircleIcon className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-red-700">Failed Logins</p>
                <p className="text-lg font-bold text-red-900">{stats.failedLogins}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-700">Admins</p>
                <p className="text-lg font-bold text-gray-900">{stats.adminUsers}</p>
              </div>
            </div>
          </div>
        </div>
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
                  {tab.count > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Roles</option>
                    {Array.from(new Set(users.map(u => u.role))).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <FunnelIcon className="h-4 w-4" />
                    More Filters
                  </button>
                </div>
              </div>
              
              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">2FA Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="all">All</option>
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Joined</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="all">Any time</option>
                      <option value="today">Today</option>
                      <option value="week">Past week</option>
                      <option value="month">Past month</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <UserGroupIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500 mb-4">
                    No users match your current filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setRoleFilter('all');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
            
            {/* User Types Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">User Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(
                  users.reduce((acc, user) => {
                    acc[user.role] = (acc[user.role] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([role, count]) => (
                  <div key={role} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{role}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                      </div>
                      <div className={`p-2 rounded-full ${getRoleColor(role).split(' ')[0]}`}>
                        <UserIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Roles & Permissions Tab */}
        {activeTab === 'roles' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Roles & Permissions</h3>
                  <p className="text-sm text-gray-500">Manage user roles and their permissions</p>
                </div>
                <button
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Role
                </button>
              </div>
            </div>
            
            {/* Roles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {roles.map(role => (
                <div key={role.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{role.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(role.name)}`}>
                          {role.userCount} users
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {role.name !== 'Super Admin' && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Key Permissions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(role.permissions)
                        .slice(0, 4)
                        .map(([module, perms]) => (
                          <div key={module} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700 capitalize">{module}</span>
                            <div className="flex items-center gap-1">
                              {Object.values(perms).filter(Boolean).length > 0 && (
                                <span className="text-xs text-green-600">
                                  {Object.values(perms).filter(Boolean).length}/4
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                    
                    <button
                      onClick={() => handleEditRole(role)}
                      className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      View Full Permissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Permission Matrix Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Permission Matrix</h3>
              <PermissionMatrix permissions={roles[0].permissions} />
            </div>
          </div>
        )}
        
        {/* Active Sessions Tab */}
        {activeTab === 'sessions' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Active Sessions</h3>
                  <p className="text-sm text-gray-500">
                    {activeSessions.length} active session{activeSessions.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={handleTerminateAllSessions}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Terminate All Sessions
                </button>
              </div>
            </div>
            
            {/* Sessions List */}
            <div className="space-y-4">
              {activeSessions.map(session => (
                <div key={session.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{session.user}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{session.ip}</code>
                          <span className="text-sm text-gray-500">{session.location}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                    >
                      Terminate
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Device</p>
                      <p className="font-medium text-gray-900">{session.device}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Browser</p>
                      <p className="font-medium text-gray-900">{session.browser}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Operating System</p>
                      <p className="font-medium text-gray-900">{session.os}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Session Duration</p>
                      <p className="font-medium text-gray-900">1h 15m</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>Login: {formatDate(session.loginTime)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowPathIcon className="h-4 w-4" />
                        <span>Last activity: {formatDate(session.lastActivity)}</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircleIcon className="h-4 w-4" />
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Session Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Desktop Sessions</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">
                      {activeSessions.filter(s => s.device.includes('Windows') || s.device.includes('macOS')).length}
                    </p>
                  </div>
                  <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Mobile Sessions</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">
                      {activeSessions.filter(s => s.device.includes('Mobile') || s.device.includes('Android') || s.device.includes('iOS')).length}
                    </p>
                  </div>
                  <DevicePhoneMobileIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Average Duration</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">1.8h</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Login History Tab */}
        {activeTab === 'login-history' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search login history..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select className="px-3 py-2.5 border border-gray-300 rounded-lg">
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select className="px-3 py-2.5 border border-gray-300 rounded-lg">
                    <option value="all">All Users</option>
                    {Array.from(new Set(loginHistory.map(l => l.user))).map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                  
                  <input
                    type="date"
                    className="px-3 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Login History Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">2FA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loginHistory.map(login => (
                      <tr key={login.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{login.user}</p>
                            <p className="text-sm text-gray-500">{login.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">{login.ip}</code>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{login.location}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{login.device}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{formatDate(login.timestamp)}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(login.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 ${login.twoFactor ? 'text-green-600' : 'text-gray-400'}`}>
                            {login.twoFactor ? (
                              <CheckCircleIcon className="h-4 w-4" />
                            ) : (
                              <XCircleIcon className="h-4 w-4" />
                            )}
                            {login.twoFactor ? 'Yes' : 'No'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Login Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Login Success Rate</h4>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">98.2%</div>
                    <p className="text-gray-500">Successful logins in the last 30 days</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Failed Login Sources</h4>
                <div className="space-y-3">
                  {loginHistory
                    .filter(l => l.status === 'failed')
                    .slice(0, 5)
                    .map(login => (
                      <div key={login.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{login.ip}</p>
                          <p className="text-sm text-gray-500">{login.location}</p>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(login.timestamp)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Security Events Tab */}
        {activeTab === 'security-events' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Security Events</h3>
                  <p className="text-sm text-gray-500">
                    {securityEvents.filter(e => e.status === 'investigating').length} events require attention
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Severity</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Mark All as Resolved
                  </button>
                </div>
              </div>
            </div>
            
            {/* Security Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {securityEvents.map(event => (
                <SecurityEventCard key={event.id} event={event} />
              ))}
            </div>
            
            {/* Security Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Event Distribution</h4>
                <div className="space-y-3">
                  {Object.entries(
                    securityEvents.reduce((acc, event) => {
                      acc[event.type] = (acc[event.type] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{type.replace('_', ' ')}</span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Top IP Addresses</h4>
                <div className="space-y-3">
                  {securityEvents
                    .reduce((acc, event) => {
                      acc[event.ip] = (acc[event.ip] || 0) + 1;
                      return acc;
                    }, {})
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
                    .map(({ ip, count }) => (
                      <div key={ip} className="flex items-center justify-between">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">{ip}</code>
                        <span className="font-medium text-gray-900">{count} events</span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Response Time</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Response Time</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2.4 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Events Resolved Today</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Open Investigations</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
          <div className={`rounded-xl shadow-lg p-4 flex items-center gap-3 ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            ) : notification.type === 'error' ? (
              <XCircleIcon className="h-5 w-5 text-red-600" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-blue-600" />
            )}
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          </div>
        </div>
      )}
      
      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedUser ? 'Edit User' : 'Add New User'}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedUser ? 'Update user details and permissions' : 'Create a new user account'}
                </p>
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedUser?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedUser?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      defaultValue={selectedUser?.role || 'Shipper'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Dispatcher">Dispatcher</option>
                      <option value="Driver">Driver</option>
                      <option value="Shipper">Shipper</option>
                      <option value="Accountant">Accountant</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      defaultValue={selectedUser?.status || 'active'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Require Two-Factor Authentication
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.twoFactor || false}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      User must enable two-factor authentication
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send Welcome Email
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={!selectedUser}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Send account details and welcome instructions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  showNotificationMessage(
                    selectedUser ? 'User updated successfully' : 'User created successfully',
                    'success'
                  );
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {selectedUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add/Edit Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedRole ? 'Edit Role' : 'Add New Role'}
                </h3>
                <p className="text-sm text-gray-500">
                  Configure role permissions and access levels
                </p>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.description || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Permissions</h4>
                  <PermissionMatrix 
                    permissions={selectedRole?.permissions || roles[0].permissions} 
                  />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  showNotificationMessage(
                    selectedRole ? 'Role updated successfully' : 'Role created successfully',
                    'success'
                  );
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {selectedRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityManagement;
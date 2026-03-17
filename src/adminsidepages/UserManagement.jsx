import React, { useState, useEffect, useMemo } from 'react';
import {
  UserGroupIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  LockOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
  ChartBarIcon,
  UserIcon,
  TruckIcon,
  CubeIcon,
  CogIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

// Custom Refresh Icon
const RefreshIcon = ArrowPathIcon;

// Mock user data
const initialUsers = [
  {
    id: 'USR-001',
    firstName: 'Musa',
    lastName: 'Ibrahim',
    email: 'musa@example.com',
    phone: '+2348012345678',
    userType: 'driver',
    role: 'driver',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-02-20 14:30',
    permissions: ['view_deliveries', 'update_status'],
    vehicle: 'Toyota Hilux - ABC123XY',
    activeDeliveries: 3,
  },
  {
    id: 'USR-002',
    firstName: 'Chinedu',
    lastName: 'Okoro',
    email: 'chinedu@example.com',
    phone: '+2348023456789',
    userType: 'driver',
    role: 'driver',
    status: 'pending',
    registrationDate: '2024-02-01',
    lastLogin: '2024-02-19 09:15',
    permissions: ['view_deliveries'],
    vehicle: 'Mitsubishi Canter - XYZ456AB',
    activeDeliveries: 0,
  },
  {
    id: 'USR-003',
    firstName: 'Amina',
    lastName: 'Yusuf',
    email: 'amina@example.com',
    phone: '+2348034567890',
    userType: 'driver',
    role: 'senior_driver',
    status: 'active',
    registrationDate: '2023-11-20',
    lastLogin: '2024-02-20 16:45',
    permissions: ['view_deliveries', 'update_status', 'view_earnings'],
    vehicle: 'Refrigerated Van - KAN789CD',
    activeDeliveries: 2,
  },
  {
    id: 'USR-004',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@xyzwholesale.com',
    phone: '+2348044445555',
    userType: 'shipper',
    role: 'shipper_admin',
    status: 'active',
    registrationDate: '2024-01-10',
    lastLogin: '2024-02-20 11:30',
    permissions: ['create_shipments', 'track_deliveries', 'manage_invoices'],
    businessName: 'XYZ Wholesalers',
    totalShipments: 76,
    pendingPayments: 125000,
  },
  {
    id: 'USR-005',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert@techsolutions.com',
    phone: '+2348088889999',
    userType: 'shipper',
    role: 'shipper',
    status: 'active',
    registrationDate: '2024-02-05',
    lastLogin: '2024-02-20 10:15',
    permissions: ['create_shipments', 'track_deliveries'],
    businessName: 'Tech Solutions Ltd',
    totalShipments: 12,
    pendingPayments: 45000,
  },
  {
    id: 'USR-006',
    firstName: 'Grace',
    lastName: 'Okafor',
    email: 'grace@example.com',
    phone: '+2348056789012',
    userType: 'dispatcher',
    role: 'dispatcher',
    status: 'active',
    registrationDate: '2024-01-25',
    lastLogin: '2024-02-20 15:20',
    permissions: ['manage_drivers', 'assign_deliveries', 'track_all'],
    assignedDrivers: 8,
    pendingAssignments: 5,
  },
  {
    id: 'USR-007',
    firstName: 'Ibrahim',
    lastName: 'Sani',
    email: 'ibrahim@example.com',
    phone: '+2348067890123',
    userType: 'driver',
    role: 'driver',
    status: 'inactive',
    registrationDate: '2024-02-10',
    lastLogin: '2024-02-18 13:10',
    permissions: ['view_deliveries'],
    vehicle: 'Nissan Urvan - ABJ789GH',
    activeDeliveries: 0,
  },
  {
    id: 'USR-008',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@sfdelivery.com',
    phone: '+2348077778888',
    userType: 'admin',
    role: 'super_admin',
    status: 'active',
    registrationDate: '2023-12-01',
    lastLogin: '2024-02-20 14:45',
    permissions: ['full_access'],
    createdUsers: 1247,
  },
  {
    id: 'USR-009',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@abcretail.com',
    phone: '+2348011112222',
    userType: 'shipper',
    role: 'shipper',
    status: 'suspended',
    registrationDate: '2024-01-30',
    lastLogin: '2024-02-15 09:00',
    permissions: ['create_shipments'],
    businessName: 'ABC Retail Store',
    totalShipments: 89,
    pendingPayments: 0,
  },
  {
    id: 'USR-010',
    firstName: 'Mohammed',
    lastName: 'Bello',
    email: 'mohammed@freshfoods.com',
    phone: '+2348066667777',
    userType: 'shipper',
    role: 'shipper_admin',
    status: 'active',
    registrationDate: '2024-02-12',
    lastLogin: '2024-02-20 08:45',
    permissions: ['create_shipments', 'track_deliveries', 'manage_invoices'],
    businessName: 'Fresh Foods Market',
    totalShipments: 58,
    pendingPayments: 74500,
  },
];

const UserManagement = () => {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({});
  const [createForm, setCreateForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'shipper',
    role: 'shipper',
    status: 'pending',
    businessName: '',
    address: '',
  });
  const [statusAction, setStatusAction] = useState('');
  const [actionReason, setActionReason] = useState('');

  // Calculate statistics
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const pending = users.filter(u => u.status === 'pending').length;
    const inactive = users.filter(u => u.status === 'inactive').length;
    const suspended = users.filter(u => u.status === 'suspended').length;
    
    const drivers = users.filter(u => u.userType === 'driver').length;
    const shippers = users.filter(u => u.userType === 'shipper').length;
    const dispatchers = users.filter(u => u.userType === 'dispatcher').length;
    const admins = users.filter(u => u.userType === 'admin').length;
    
    return {
      total,
      active,
      pending,
      inactive,
      suspended,
      drivers,
      shippers,
      dispatchers,
      admins,
      activePercentage: ((active / total) * 100).toFixed(1),
    };
  }, [users]);

  // Filter and sort users
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.id.toLowerCase().includes(term) ||
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term) ||
        (user.businessName && user.businessName.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    // Apply user type filter
    if (userTypeFilter !== 'all') {
      result = result.filter(user => user.userType === userTypeFilter);
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case 'oldest':
          return new Date(a.registrationDate) - new Date(b.registrationDate);
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'type':
          return a.userType.localeCompare(b.userType);
        default:
          return 0;
      }
    });

    setFilteredUsers(result);
  }, [users, searchTerm, statusFilter, userTypeFilter, roleFilter, sortBy]);

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ExclamationTriangleIcon },
      inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircleIcon },
      suspended: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
    };
    
    const configItem = config[status] || config.pending;
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${configItem.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getUserTypeBadge = (userType) => {
    const config = {
      driver: { color: 'bg-blue-100 text-blue-800', icon: '🚛' },
      shipper: { color: 'bg-green-100 text-green-800', icon: '📦' },
      dispatcher: { color: 'bg-purple-100 text-purple-800', icon: '📋' },
      admin: { color: 'bg-red-100 text-red-800', icon: '👑' },
    };
    
    const configItem = config[userType] || { color: 'bg-gray-100 text-gray-800', icon: '👤' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${configItem.color}`}>
        <span className="text-sm">{configItem.icon}</span>
        {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roles = {
      driver: { label: 'Driver', color: 'bg-blue-50 text-blue-700' },
      senior_driver: { label: 'Senior Driver', color: 'bg-blue-100 text-blue-800' },
      shipper: { label: 'Shipper', color: 'bg-green-50 text-green-700' },
      shipper_admin: { label: 'Shipper Admin', color: 'bg-green-100 text-green-800' },
      dispatcher: { label: 'Dispatcher', color: 'bg-purple-50 text-purple-700' },
      admin: { label: 'Admin', color: 'bg-red-50 text-red-700' },
      super_admin: { label: 'Super Admin', color: 'bg-red-100 text-red-800' },
    };
    
    const roleConfig = roles[role] || { label: role, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleConfig.color}`}>
        {roleConfig.label}
      </span>
    );
  };

  // Action handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      alert('User data refreshed!');
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const exportData = filteredUsers.map(user => ({
        ID: user.id,
        Name: `${user.firstName} ${user.lastName}`,
        Email: user.email,
        Phone: user.phone,
        'User Type': user.userType,
        Role: user.role,
        Status: user.status,
        'Registration Date': user.registrationDate,
        'Last Login': user.lastLogin,
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('User data exported successfully!');
    }, 1500);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id ? { ...user, ...editForm } : user
    ));
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditForm({});
    alert('User updated successfully!');
  };

  const handleCreateUser = () => {
    const newUser = {
      id: `USR-${Date.now().toString().slice(-6)}`,
      ...createForm,
      registrationDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      permissions: [],
    };
    
    setUsers(prev => [...prev, newUser]);
    setIsCreateModalOpen(false);
    setCreateForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userType: 'shipper',
      role: 'shipper',
      status: 'pending',
      businessName: '',
      address: '',
    });
    alert('User created successfully!');
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    alert('User deleted successfully!');
  };

  const handleStatusChange = (user, action) => {
    setSelectedUser(user);
    setStatusAction(action);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedUser || !statusAction) return;
    
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: statusAction } 
        : user
    ));
    
    setIsStatusModalOpen(false);
    setSelectedUser(null);
    setStatusAction('');
    setActionReason('');
    alert(`User status changed to ${statusAction}!`);
  };

  const handleResetPassword = (user) => {
    alert(`Password reset email sent to ${user.email}`);
  };

  const handleResendVerification = (user) => {
    alert(`Verification email resent to ${user.email}`);
  };

  // Stats cards
  const StatCard = ({ label, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </div>
      )}
    </div>
  );

  // User Detail Modal
  const UserDetailModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <p className="text-sm text-gray-500">{selectedUser.id}</p>
            </div>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-6 max-h-[calc(90vh-120px)]">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <div className="mt-1">{getUserTypeBadge(selectedUser.userType)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-medium">{formatDate(selectedUser.registrationDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium">{selectedUser.lastLogin === 'Never' ? 'Never' : formatDateTime(selectedUser.lastLogin)}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUser.businessName && (
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{selectedUser.businessName}</p>
                  </div>
                )}
                {selectedUser.vehicle && (
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium">{selectedUser.vehicle}</p>
                  </div>
                )}
                {selectedUser.totalShipments !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Total Shipments</p>
                    <p className="font-medium">{selectedUser.totalShipments}</p>
                  </div>
                )}
                {selectedUser.activeDeliveries !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Active Deliveries</p>
                    <p className="font-medium">{selectedUser.activeDeliveries}</p>
                  </div>
                )}
                {selectedUser.pendingPayments !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Pending Payments</p>
                    <p className="font-medium">₦{selectedUser.pendingPayments.toLocaleString()}</p>
                  </div>
                )}
                {selectedUser.assignedDrivers !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Assigned Drivers</p>
                    <p className="font-medium">{selectedUser.assignedDrivers}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.permissions && selectedUser.permissions.length > 0 ? (
                  selectedUser.permissions.map((permission, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No specific permissions assigned</p>
                )}
              </div>
            </div>

            {/* Activity Log (Mock) */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { action: 'Logged in', time: '2 hours ago' },
                  { action: 'Updated profile', time: '1 day ago' },
                  { action: 'Created shipment', time: '2 days ago' },
                  { action: 'Changed password', time: '1 week ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{activity.action}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => handleResetPassword(selectedUser)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset Password
              </button>
              <button
                onClick={() => handleResendVerification(selectedUser)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Resend Verification
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditUser(selectedUser);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit User Modal
  const EditUserModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
              <p className="text-sm text-gray-500">{selectedUser.id}</p>
            </div>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.firstName || ''}
                    onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.lastName || ''}
                    onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.userType || ''}
                    onChange={(e) => setEditForm({...editForm, userType: e.target.value})}
                  >
                    <option value="driver">Driver</option>
                    <option value="shipper">Shipper</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.role || ''}
                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                  >
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                {editForm.userType === 'shipper' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editForm.businessName || ''}
                      onChange={(e) => setEditForm({...editForm, businessName: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Create User Modal
  const CreateUserModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
              <p className="text-sm text-gray-500">Add a new user to the system</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(false)}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.firstName}
                    onChange={(e) => setCreateForm({...createForm, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.lastName}
                    onChange={(e) => setCreateForm({...createForm, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.phone}
                    onChange={(e) => setCreateForm({...createForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Type *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.userType}
                    onChange={(e) => setCreateForm({...createForm, userType: e.target.value})}
                  >
                    <option value="driver">Driver</option>
                    <option value="shipper">Shipper</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.role}
                    onChange={(e) => setCreateForm({...createForm, role: e.target.value})}
                  >
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
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={createForm.status}
                    onChange={(e) => setCreateForm({...createForm, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                {createForm.userType === 'shipper' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={createForm.businessName}
                      onChange={(e) => setCreateForm({...createForm, businessName: e.target.value})}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={createForm.address}
                  onChange={(e) => setCreateForm({...createForm, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete User</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Status Change Modal
  const StatusChangeModal = () => {
    if (!selectedUser || !statusAction) return null;

    const actionLabels = {
      active: 'Activate',
      inactive: 'Deactivate',
      suspended: 'Suspend',
      pending: 'Set as Pending',
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 ${
              statusAction === 'active' ? 'bg-green-100' :
              statusAction === 'suspended' ? 'bg-red-100' :
              'bg-yellow-100'
            }`}>
              {statusAction === 'active' ? (
                <LockOpenIcon className="h-6 w-6 text-green-600" />
              ) : statusAction === 'suspended' ? (
                <LockClosedIcon className="h-6 w-6 text-red-600" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              {actionLabels[statusAction]} User
            </h3>
            <p className="text-gray-600 text-center mb-4">
              {statusAction === 'active' 
                ? 'This will allow the user to access the system.'
                : statusAction === 'suspended'
                ? 'This will temporarily block the user from accessing the system.'
                : 'This will set the user as inactive.'}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Enter reason for this action..."
              />
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStatusChange}
                className={`px-4 py-2 text-white rounded-full transition-colors ${
                  statusAction === 'active' ? 'bg-green-600 hover:bg-green-700' :
                  statusAction === 'suspended' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all system users, roles, and permissions</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors disabled:opacity-50"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
            >
              <UserPlusIcon className="h-5 w-5" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Users" 
            value={stats.total} 
            icon={UserGroupIcon} 
            color="bg-blue-50 text-blue-600"
            change="+12.5%"
          />
          <StatCard 
            label="Active Users" 
            value={stats.active} 
            icon={CheckCircleIcon} 
            color="bg-green-50 text-green-600"
            change="+8.2%"
          />
          <StatCard 
            label="Pending Verification" 
            value={stats.pending} 
            icon={ExclamationTriangleIcon} 
            color="bg-yellow-50 text-yellow-600"
            change="+5.3%"
          />
          <StatCard 
            label="Active Rate" 
            value={`${stats.activePercentage}%`} 
            icon={ShieldCheckIcon} 
            color="bg-purple-50 text-purple-600"
          />
        </div>

        {/* User Type Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drivers</p>
                <p className="text-lg font-bold text-blue-600">{stats.drivers}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-xl">🚛</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shippers</p>
                <p className="text-lg font-bold text-green-600">{stats.shippers}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <span className="text-xl">📦</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dispatchers</p>
                <p className="text-lg font-bold text-purple-600">{stats.dispatchers}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <span className="text-xl">📋</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-lg font-bold text-red-600">{stats.admins}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <span className="text-xl">👑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or user ID..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="driver">Driver</option>
                <option value="shipper">Shipper</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="admin">Admin</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="driver">Driver</option>
                <option value="senior_driver">Senior Driver</option>
                <option value="shipper">Shipper</option>
                <option value="shipper_admin">Shipper Admin</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="email">Email A-Z</option>
                <option value="type">User Type</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type & Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <UserGroupIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">No users found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                          {user.businessName && (
                            <div className="text-sm text-gray-500">{user.businessName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{user.phone}</span>
                        </div>
                        {user.lastLogin !== 'Never' && (
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              Last login: {formatDateTime(user.lastLogin)}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>{getUserTypeBadge(user.userType)}</div>
                        <div>{getRoleBadge(user.role)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(user.registrationDate)}</div>
                      <div className="text-xs text-gray-500">
                        {user.userType === 'driver' && user.activeDeliveries !== undefined && (
                          <span>{user.activeDeliveries} active deliveries</span>
                        )}
                        {user.userType === 'shipper' && user.totalShipments !== undefined && (
                          <span>{user.totalShipments} shipments</span>
                        )}
                        {user.userType === 'dispatcher' && user.assignedDrivers !== undefined && (
                          <span>{user.assignedDrivers} drivers</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit User"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <div className="relative group">
                          <button
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                            title="More Actions"
                          >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-1">
                              {user.status !== 'active' && (
                                <button
                                  onClick={() => handleStatusChange(user, 'active')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <LockOpenIcon className="h-4 w-4" />
                                  Activate Account
                                </button>
                              )}
                              {user.status === 'active' && (
                                <button
                                  onClick={() => handleStatusChange(user, 'inactive')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <LockClosedIcon className="h-4 w-4" />
                                  Deactivate Account
                                </button>
                              )}
                              {user.status !== 'suspended' && (
                                <button
                                  onClick={() => handleStatusChange(user, 'suspended')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <XCircleIcon className="h-4 w-4" />
                                  Suspend Account
                                </button>
                              )}
                              <button
                                onClick={() => handleResetPassword(user)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <KeyIcon className="h-4 w-4" />
                                Reset Password
                              </button>
                              <div className="border-t border-gray-100">
                                <button
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsDeleteModalOpen(true);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                  Delete User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isViewModalOpen && <UserDetailModal />}
      {isEditModalOpen && <EditUserModal />}
      {isCreateModalOpen && <CreateUserModal />}
      {isDeleteModalOpen && <DeleteConfirmationModal />}
      {isStatusModalOpen && <StatusChangeModal />}
    </div>
  );
};

// Helper Icon component
const KeyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export default UserManagement;
import React, { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  SignalIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  XMarkIcon,
  TruckIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  CreditCardIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  UserPlusIcon,
  DocumentArrowUpIcon,
  ClipboardDocumentListIcon,
  StarIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const Drivers = () => {
  // Initial drivers data
  const initialDrivers = [
    {
      id: 1,
      name: 'Musa Ibrahim',
      driverId: 'DRV-001',
      phone: '+2348012345678',
      email: 'musa@freightflow.ng',
      address: '123 Main St, Lagos',
      licenseNumber: 'NGR7890123456',
      licenseType: 'Class E',
      licenseExpiry: '2025-08-31',
      status: 'active',
      vehicleAssigned: 'ABC-123XY',
      vehicleType: 'Toyota Hilux',
      rating: 4.8,
      totalTrips: 247,
      onTimeRate: 96.5,
      earnings: 1250000,
      joinedDate: '2022-03-15',
      lastActive: '2024-02-20',
      documents: ['license', 'medical', 'clearance'],
      notes: 'Reliable driver, excellent customer feedback',
      profileImage: null,
    },
    {
      id: 2,
      name: 'Chinedu Okoro',
      driverId: 'DRV-002',
      phone: '+2348023456789',
      email: 'chinedu@freightflow.ng',
      address: '456 Oak Ave, Abuja',
      licenseNumber: 'NGR7890123457',
      licenseType: 'Class D',
      licenseExpiry: '2024-06-30',
      status: 'active',
      vehicleAssigned: 'DEF-456YZ',
      vehicleType: 'Ford Ranger',
      rating: 4.6,
      totalTrips: 189,
      onTimeRate: 94.2,
      earnings: 980000,
      joinedDate: '2022-05-20',
      lastActive: '2024-02-19',
      documents: ['license', 'medical'],
      notes: 'Good performance, needs navigation improvement',
      profileImage: null,
    },
    {
      id: 3,
      name: 'Amina Yusuf',
      driverId: 'DRV-003',
      phone: '+2348034567890',
      email: 'amina@freightflow.ng',
      address: '789 Pine Rd, Kano',
      licenseNumber: 'NGR7890123458',
      licenseType: 'Class E',
      licenseExpiry: '2025-03-15',
      status: 'active',
      vehicleAssigned: 'GHI-789AB',
      vehicleType: 'Nissan Navara',
      rating: 4.9,
      totalTrips: 312,
      onTimeRate: 97.8,
      earnings: 1560000,
      joinedDate: '2021-11-10',
      lastActive: '2024-02-20',
      documents: ['license', 'medical', 'clearance', 'training'],
      notes: 'Top performer, trainer material',
      profileImage: null,
    },
    {
      id: 4,
      name: 'Emeka Nwachukwu',
      driverId: 'DRV-004',
      phone: '+2348045678901',
      email: 'emeka@freightflow.ng',
      address: '101 Elm St, Port Harcourt',
      licenseNumber: 'NGR7890123459',
      licenseType: 'Class C',
      licenseExpiry: '2024-09-30',
      status: 'inactive',
      vehicleAssigned: 'JKL-012CD',
      vehicleType: 'Toyota Hiace',
      rating: 4.5,
      totalTrips: 156,
      onTimeRate: 93.1,
      earnings: 780000,
      joinedDate: '2023-01-15',
      lastActive: '2024-01-30',
      documents: ['license'],
      notes: 'On leave until March 2024',
      profileImage: null,
    },
    {
      id: 5,
      name: 'Grace Okafor',
      driverId: 'DRV-005',
      phone: '+2348056789012',
      email: 'grace@freightflow.ng',
      address: '202 Maple Dr, Ibadan',
      licenseNumber: 'NGR7890123460',
      licenseType: 'Class D',
      licenseExpiry: '2024-12-31',
      status: 'active',
      vehicleAssigned: 'MNO-345EF',
      vehicleType: 'Mitsubishi Canter',
      rating: 4.7,
      totalTrips: 198,
      onTimeRate: 95.3,
      earnings: 1020000,
      joinedDate: '2022-08-25',
      lastActive: '2024-02-20',
      documents: ['license', 'medical', 'clearance'],
      notes: 'Excellent with customer service',
      profileImage: null,
    },
    {
      id: 6,
      name: 'Ibrahim Sani',
      driverId: 'DRV-006',
      phone: '+2348067890123',
      email: 'ibrahim@freightflow.ng',
      address: '303 Cedar Ln, Kaduna',
      licenseNumber: 'NGR7890123461',
      licenseType: 'Class E',
      licenseExpiry: '2024-05-15',
      status: 'pending',
      vehicleAssigned: null,
      vehicleType: 'Toyota Hilux',
      rating: 0,
      totalTrips: 0,
      onTimeRate: 0,
      earnings: 0,
      joinedDate: '2024-02-01',
      lastActive: '2024-02-01',
      documents: ['license', 'medical'],
      notes: 'New driver, training in progress',
      profileImage: null,
    },
  ];

  const [drivers, setDrivers] = useState(initialDrivers);
  const [filteredDrivers, setFilteredDrivers] = useState(initialDrivers);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Form states
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    licenseNumber: '',
    licenseType: 'Class C',
    licenseExpiry: '',
    status: 'pending',
    vehicleAssigned: '',
    vehicleType: '',
    notes: '',
  });

  // Available vehicles for assignment
  const availableVehicles = [
    { id: 'V001', plate: 'ABC-123XY', type: 'Toyota Hilux', status: 'available' },
    { id: 'V002', plate: 'DEF-456YZ', type: 'Ford Ranger', status: 'assigned' },
    { id: 'V003', plate: 'GHI-789AB', type: 'Nissan Navara', status: 'available' },
    { id: 'V004', plate: 'JKL-012CD', type: 'Toyota Hiace', status: 'assigned' },
    { id: 'V005', plate: 'MNO-345EF', type: 'Mitsubishi Canter', status: 'available' },
  ];

  // License types
  const licenseTypes = ['Class A', 'Class B', 'Class C', 'Class D', 'Class E'];

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
    };
    return `px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.inactive}`;
  };

  const getLicenseBadge = (type) => {
    const styles = {
      'Class A': 'bg-red-100 text-red-800 border-red-200',
      'Class B': 'bg-orange-100 text-orange-800 border-orange-200',
      'Class C': 'bg-green-100 text-green-800 border-green-200',
      'Class D': 'bg-blue-100 text-blue-800 border-blue-200',
      'Class E': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return `px-2 py-1 rounded-full text-xs font-medium border ${styles[type] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { label: 'Expired', color: 'text-red-600', bg: 'bg-red-50' };
    if (days <= 30) return { label: 'Expiring Soon', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (days <= 90) return { label: 'Renewal Due', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { label: 'Valid', color: 'text-green-600', bg: 'bg-green-50' };
  };

  // Filter and sort drivers
  useEffect(() => {
    let result = drivers;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(driver =>
        driver.name.toLowerCase().includes(term) ||
        driver.driverId.toLowerCase().includes(term) ||
        driver.phone.includes(searchTerm) ||
        driver.email.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(driver => driver.status === statusFilter);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'earnings':
          return b.earnings - a.earnings;
        case 'newest':
          return new Date(b.joinedDate) - new Date(a.joinedDate);
        case 'oldest':
          return new Date(a.joinedDate) - new Date(b.joinedDate);
        default:
          return 0;
      }
    });

    setFilteredDrivers(result);
  }, [drivers, searchTerm, statusFilter, sortBy]);

  // Calculate statistics
  const stats = {
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    pending: drivers.filter(d => d.status === 'pending').length,
    inactive: drivers.filter(d => d.status === 'inactive').length,
    totalEarnings: drivers.reduce((sum, d) => sum + d.earnings, 0),
    avgRating: (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.filter(d => d.rating > 0).length || 0).toFixed(1),
    expiringLicenses: drivers.filter(d => getDaysUntilExpiry(d.licenseExpiry) <= 30).length,
  };

  // Handle driver actions
  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.licenseNumber) {
      alert('Please fill in required fields: Name, Phone, and License Number');
      return;
    }

    const driver = {
      id: drivers.length + 1,
      driverId: `DRV-${(drivers.length + 1).toString().padStart(3, '0')}`,
      ...newDriver,
      rating: 0,
      totalTrips: 0,
      onTimeRate: 0,
      earnings: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      documents: ['license'],
      profileImage: null,
    };

    setDrivers([...drivers, driver]);
    setIsAddModalOpen(false);
    resetForm();
    alert('Driver added successfully!');
  };

  const handleUpdateDriver = () => {
    if (!selectedDriver) return;

    const updatedDrivers = drivers.map(driver =>
      driver.id === selectedDriver.id ? { ...driver, ...newDriver } : driver
    );

    setDrivers(updatedDrivers);
    setIsEditModalOpen(false);
    setSelectedDriver(null);
    resetForm();
    alert('Driver updated successfully!');
  };

  const handleDeleteDriver = (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(driver => driver.id !== id));
      alert('Driver deleted successfully!');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setDrivers(drivers.map(driver =>
      driver.id === id ? { ...driver, status: newStatus } : driver
    ));
    alert(`Driver status changed to ${newStatus}`);
  };

  const handleAssignVehicle = (driverId, vehiclePlate) => {
    setDrivers(drivers.map(driver =>
      driver.id === driverId ? { 
        ...driver, 
        vehicleAssigned: vehiclePlate,
        vehicleType: availableVehicles.find(v => v.plate === vehiclePlate)?.type || driver.vehicleType
      } : driver
    ));
    alert(`Vehicle assigned successfully!`);
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setIsViewModalOpen(true);
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setNewDriver({
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      address: driver.address,
      licenseNumber: driver.licenseNumber,
      licenseType: driver.licenseType,
      licenseExpiry: driver.licenseExpiry,
      status: driver.status,
      vehicleAssigned: driver.vehicleAssigned,
      vehicleType: driver.vehicleType,
      notes: driver.notes,
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setNewDriver({
      name: '',
      phone: '',
      email: '',
      address: '',
      licenseNumber: '',
      licenseType: 'Class C',
      licenseExpiry: '',
      status: 'pending',
      vehicleAssigned: '',
      vehicleType: '',
      notes: '',
    });
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(drivers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `drivers-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    alert('Data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">Driver Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage and monitor your fleet drivers</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Add Driver</span>
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              <ArrowUpTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Drivers</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg flex-shrink-0 ml-2">
                <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-3 sm:mt-4">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                <span className="text-xs sm:text-sm text-gray-600">{stats.active} active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs sm:text-sm text-gray-600">{stats.pending} pending</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Earnings</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1 truncate">
                  {formatCurrency(stats.totalEarnings)}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-green-50 rounded-lg flex-shrink-0 ml-2">
                <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-4">
              <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              <span className="text-xs sm:text-sm text-gray-600 truncate">Avg Rating: {stats.avgRating}/5</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Drivers</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-50 rounded-lg flex-shrink-0 ml-2">
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-green-500 h-1.5 sm:h-2 rounded-full" 
                    style={{ width: `${(stats.active / stats.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {Math.round((stats.active / stats.total) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Expiring Licenses</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.expiringLicenses}</p>
              </div>
              <div className="p-2 sm:p-3 bg-red-50 rounded-lg flex-shrink-0 ml-2">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Requires immediate attention</p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                />
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full min-w-0 border border-gray-300 rounded-full px-3 py-2 sm:py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 min-w-0">
                <ClipboardDocumentListIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full min-w-0 border border-gray-300 rounded-full px-3 py-2 sm:py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="rating">Highest Rating</option>
                  <option value="earnings">Highest Earnings</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setSortBy('newest');
                }}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm sm:text-base whitespace-nowrap"
              >
                <ArrowPathIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drivers Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Driver Registry</h2>
              <span className="text-xs sm:text-sm text-gray-600">
                Showing {filteredDrivers.length} of {drivers.length} drivers
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Driver
                    </th>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                      Contact
                    </th>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                      License & Vehicle
                    </th>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Performance
                    </th>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredDrivers.map((driver) => {
                    const expiryStatus = getExpiryStatus(driver.licenseExpiry);
                    
                    return (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-3 sm:px-4 md:px-5 py-3">
                          <div className="flex items-center min-w-0">
                            <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0 mr-2 sm:mr-3">
                              <span className="text-white font-semibold text-xs sm:text-sm">
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate text-sm sm:text-base">{driver.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500 truncate">{driver.driverId}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-3 sm:px-4 md:px-5 py-3 hidden lg:table-cell">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <PhoneIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-900 truncate">{driver.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <EnvelopeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-600 truncate">{driver.email}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-3 sm:px-4 md:px-5 py-3 hidden md:table-cell">
                          <div className="space-y-1 sm:space-y-2 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <IdentificationIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className={`text-xs ${expiryStatus.color} truncate`}>
                                {driver.licenseType} • {driver.licenseNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <TruckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-900 truncate">
                                {driver.vehicleAssigned || 'Not Assigned'}
                              </span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-3 sm:px-4 md:px-5 py-3">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{driver.rating}/5</span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 truncate">
                              {driver.totalTrips} trips • {driver.onTimeRate}% on-time
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-green-600 truncate">
                              {formatCurrency(driver.earnings)}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-3 sm:px-4 md:px-5 py-3">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className={getStatusBadge(driver.status)}>
                              {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                              Last: {formatDate(driver.lastActive)}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-3 sm:px-4 md:px-5 py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => handleViewDriver(driver)}
                              className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleEditDriver(driver)}
                              className="p-1.5 sm:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDriver(driver);
                                setIsDocumentsModalOpen(true);
                              }}
                              className="p-1.5 sm:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                              title="Documents"
                            >
                              <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDriver(driver.id)}
                              className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredDrivers.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <UserCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No drivers found</h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No drivers available in the system'}
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm sm:text-base"
                >
                  <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Add New Driver
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Add New Driver</h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleAddDriver(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="Enter driver's full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="+2348012345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="driver@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="NGR7890123456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Type
                    </label>
                    <select
                      value={newDriver.licenseType}
                      onChange={(e) => setNewDriver({...newDriver, licenseType: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      {licenseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Expiry Date
                    </label>
                    <input
                      type="date"
                      value={newDriver.licenseExpiry}
                      onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status
                    </label>
                    <select
                      value={newDriver.status}
                      onChange={(e) => setNewDriver({...newDriver, status: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Assign Vehicle
                    </label>
                    <select
                      value={newDriver.vehicleAssigned}
                      onChange={(e) => setNewDriver({...newDriver, vehicleAssigned: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      <option value="">Select a vehicle</option>
                      {availableVehicles
                        .filter(v => v.status === 'available')
                        .map(vehicle => (
                          <option key={vehicle.id} value={vehicle.plate}>
                            {vehicle.plate} - {vehicle.type}
                          </option>
                        ))}
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newDriver.address}
                      onChange={(e) => setNewDriver({...newDriver, address: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="123 Main Street, City, State"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newDriver.notes}
                      onChange={(e) => setNewDriver({...newDriver, notes: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      placeholder="Additional notes about the driver..."
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-gray-200 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      resetForm();
                    }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm sm:text-base"
                  >
                    Add Driver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Driver Modal */}
      {isViewModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Driver Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Driver Profile Card */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <span className="text-white text-lg sm:text-xl font-bold">
                          {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{selectedDriver.name}</h4>
                        <p className="text-gray-600 text-sm sm:text-base truncate">{selectedDriver.driverId}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2">
                          <span className={getStatusBadge(selectedDriver.status)}>
                            {selectedDriver.status.charAt(0).toUpperCase() + selectedDriver.status.slice(1)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600 truncate">
                            Joined {formatDate(selectedDriver.joinedDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{selectedDriver.rating}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Rating</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{selectedDriver.totalTrips}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Trips</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{selectedDriver.onTimeRate}%</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">On-Time Rate</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                        {formatCurrency(selectedDriver.earnings)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Earnings</div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
                    <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Quick Actions</h5>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          handleEditDriver(selectedDriver);
                        }}
                        className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full text-sm sm:text-base"
                      >
                        <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        Edit Driver
                      </button>
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          setIsDocumentsModalOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full text-sm sm:text-base"
                      >
                        <DocumentTextIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        View Documents
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedDriver.id, 
                          selectedDriver.status === 'active' ? 'inactive' : 'active'
                        )}
                        className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm sm:text-base"
                      >
                        {selectedDriver.status === 'active' ? 'Deactivate' : 'Activate'} Driver
                      </button>
                    </div>
                  </div>
                  
                  {/* Vehicle Assignment */}
                  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
                    <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Vehicle Assignment</h5>
                    <div className="space-y-2">
                      {selectedDriver.vehicleAssigned ? (
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-xl">
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate text-sm sm:text-base">{selectedDriver.vehicleAssigned}</div>
                            <div className="text-xs sm:text-sm text-gray-600 truncate">{selectedDriver.vehicleType}</div>
                          </div>
                          <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 ml-2" />
                        </div>
                      ) : (
                        <div className="text-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-xl">
                          <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto mb-1 sm:mb-2" />
                          <p className="text-xs sm:text-sm text-gray-600">No vehicle assigned</p>
                          <button
                            onClick={() => {
                              const availableVehicle = availableVehicles.find(v => v.status === 'available');
                              if (availableVehicle) {
                                handleAssignVehicle(selectedDriver.id, availableVehicle.plate);
                              }
                            }}
                            className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Assign Vehicle
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-5">
                  <h5 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Contact Information</h5>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Phone</div>
                        <div className="font-medium text-sm sm:text-base truncate">{selectedDriver.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Email</div>
                        <div className="font-medium text-sm sm:text-base truncate">{selectedDriver.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Address</div>
                        <div className="font-medium text-sm sm:text-base truncate">{selectedDriver.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Last Active</div>
                        <div className="font-medium text-sm sm:text-base truncate">{formatDate(selectedDriver.lastActive)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-5">
                  <h5 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">License Information</h5>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                      <div className="text-xs sm:text-sm text-gray-600">License Number</div>
                      <div className="font-medium text-sm sm:text-base truncate text-right xs:text-left">{selectedDriver.licenseNumber}</div>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                      <div className="text-xs sm:text-sm text-gray-600">License Type</div>
                      <span className={getLicenseBadge(selectedDriver.licenseType)}>
                        {selectedDriver.licenseType}
                      </span>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                      <div className="text-xs sm:text-sm text-gray-600">Expiry Date</div>
                      <div className="font-medium text-sm sm:text-base truncate text-right xs:text-left">{formatDate(selectedDriver.licenseExpiry)}</div>
                    </div>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                      <div className="text-xs sm:text-sm text-gray-600">Status</div>
                      <span className={`text-xs sm:text-sm font-medium ${getExpiryStatus(selectedDriver.licenseExpiry).color} truncate`}>
                        {getExpiryStatus(selectedDriver.licenseExpiry).label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notes Section */}
              {selectedDriver.notes && (
                <div className="mt-4 sm:mt-6 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-5">
                  <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Notes</h5>
                  <p className="text-gray-600 text-sm sm:text-base">{selectedDriver.notes}</p>
                </div>
              )}
              
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Modal */}
      {isEditModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Edit Driver: {selectedDriver.name}</h3>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedDriver(null);
                    resetForm();
                  }}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateDriver(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Status
                    </label>
                    <select
                      value={newDriver.status}
                      onChange={(e) => setNewDriver({...newDriver, status: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newDriver.address}
                      onChange={(e) => setNewDriver({...newDriver, address: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Type
                    </label>
                    <select
                      value={newDriver.licenseType}
                      onChange={(e) => setNewDriver({...newDriver, licenseType: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      {licenseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      License Expiry Date
                    </label>
                    <input
                      type="date"
                      value={newDriver.licenseExpiry}
                      onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Vehicle Assignment
                    </label>
                    <select
                      value={newDriver.vehicleAssigned}
                      onChange={(e) => setNewDriver({...newDriver, vehicleAssigned: e.target.value})}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    >
                      <option value="">No vehicle assigned</option>
                      {availableVehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.plate}>
                          {vehicle.plate} - {vehicle.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newDriver.notes}
                      onChange={(e) => setNewDriver({...newDriver, notes: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 border-t border-gray-200 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => handleDeleteDriver(selectedDriver.id)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 border border-red-600 text-red-600 hover:bg-red-50 font-medium rounded-full text-sm sm:text-base"
                  >
                    Delete Driver
                  </button>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedDriver(null);
                        resetForm();
                      }}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm sm:text-base"
                    >
                      Update Driver
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {isDocumentsModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-2 sm:mx-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Documents: {selectedDriver.name}</h3>
                <button
                  onClick={() => setIsDocumentsModalOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center">
                  <DocumentArrowUpIcon className="h-8 w-8 sm:h-10 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Drag and drop files here or click to upload</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="documentUpload"
                    onChange={(e) => {
                      alert(`Uploading ${e.target.files.length} document(s)`);
                    }}
                  />
                  <label
                    htmlFor="documentUpload"
                    className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full cursor-pointer text-sm sm:text-base"
                  >
                    <ArrowUpTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    Browse Files
                  </label>
                  <p className="text-xs text-gray-500 mt-2 sm:mt-3">PDF, JPG, PNG up to 10MB</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Uploaded Documents</h5>
                  <div className="space-y-2">
                    {selectedDriver.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate text-sm sm:text-base">
                              {doc.charAt(0).toUpperCase() + doc.slice(1)} Certificate
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 truncate">
                              Uploaded {formatDate(new Date().toISOString())}
                            </div>
                          </div>
                        </div>
                        <DocumentCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={() => setIsDocumentsModalOpen(false)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
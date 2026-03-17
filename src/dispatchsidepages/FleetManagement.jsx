import React, { useState } from 'react';
import {
  TruckIcon,
  UserCircleIcon,
  DocumentTextIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  SignalIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const FleetManagement = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: 'ABC-123XY',
      type: 'Truck',
      model: 'Toyota Hilux',
      capacity: '5 tons',
      year: '2020',
      status: 'active',
      driver: 'Musa Ibrahim',
      insuranceExpiry: '2024-12-31',
      registrationExpiry: '2024-10-15',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      documents: ['insurance', 'registration', 'roadworthiness']
    },
    {
      id: 2,
      plateNumber: 'DEF-456YZ',
      type: 'Pickup',
      model: 'Ford Ranger',
      capacity: '3 tons',
      year: '2021',
      status: 'active',
      driver: 'Chinedu Okoro',
      insuranceExpiry: '2024-11-30',
      registrationExpiry: '2024-09-30',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      documents: ['insurance', 'registration']
    },
    {
      id: 3,
      plateNumber: 'GHI-789AB',
      type: 'Van',
      model: 'Nissan Navara',
      capacity: '4 tons',
      year: '2019',
      status: 'maintenance',
      driver: 'Amina Yusuf',
      insuranceExpiry: '2024-10-31',
      registrationExpiry: '2024-08-31',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      documents: ['insurance', 'registration', 'roadworthiness']
    },
    {
      id: 4,
      plateNumber: 'JKL-012CD',
      type: 'Minibus',
      model: 'Toyota Hiace',
      capacity: '2 tons',
      year: '2022',
      status: 'active',
      driver: 'Emeka Nwachukwu',
      insuranceExpiry: '2025-01-31',
      registrationExpiry: '2024-12-31',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      documents: ['insurance', 'registration']
    },
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Musa Ibrahim',
      driverId: 'DRV-001',
      phone: '+2348012345678',
      email: 'musa@freightflow.ng',
      licenseNumber: 'NGR7890123456',
      licenseExpiry: '2025-08-31',
      licenseType: 'Class E',
      status: 'active',
      vehicleAssigned: 'ABC-123XY',
      rating: 4.8,
      totalDeliveries: 247,
      onTimeRate: 96.5,
      earnings: 1250000,
      documents: ['license', 'medical', 'clearance']
    },
    {
      id: 2,
      name: 'Chinedu Okoro',
      driverId: 'DRV-002',
      phone: '+2348023456789',
      email: 'chinedu@freightflow.ng',
      licenseNumber: 'NGR7890123457',
      licenseExpiry: '2024-06-30',
      licenseType: 'Class D',
      status: 'active',
      vehicleAssigned: 'DEF-456YZ',
      rating: 4.6,
      totalDeliveries: 189,
      onTimeRate: 94.2,
      earnings: 980000,
      documents: ['license', 'medical']
    },
    {
      id: 3,
      name: 'Amina Yusuf',
      driverId: 'DRV-003',
      phone: '+2348034567890',
      email: 'amina@freightflow.ng',
      licenseNumber: 'NGR7890123458',
      licenseExpiry: '2025-03-15',
      licenseType: 'Class E',
      status: 'active',
      vehicleAssigned: 'GHI-789AB',
      rating: 4.9,
      totalDeliveries: 312,
      onTimeRate: 97.8,
      earnings: 1560000,
      documents: ['license', 'medical', 'clearance', 'training']
    },
    {
      id: 4,
      name: 'Emeka Nwachukwu',
      driverId: 'DRV-004',
      phone: '+2348045678901',
      email: 'emeka@freightflow.ng',
      licenseNumber: 'NGR7890123459',
      licenseExpiry: '2024-09-30',
      licenseType: 'Class C',
      status: 'inactive',
      vehicleAssigned: 'JKL-012CD',
      rating: 4.5,
      totalDeliveries: 156,
      onTimeRate: 93.1,
      earnings: 780000,
      documents: ['license']
    },
  ]);

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newVehicle, setNewVehicle] = useState({
    plateNumber: '',
    type: 'Truck',
    model: '',
    capacity: '',
    year: new Date().getFullYear().toString(),
    status: 'active',
    driverId: '',
    insuranceExpiry: '',
    registrationExpiry: '',
  });

  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    licenseType: 'Class C',
    status: 'active',
    vehicleAssigned: '',
  });

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLicenseColor = (type) => {
    switch(type) {
      case 'Class E': return 'bg-purple-100 text-purple-800';
      case 'Class D': return 'bg-blue-100 text-blue-800';
      case 'Class C': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { status: 'expired', color: 'bg-red-100 text-red-800' };
    if (days <= 30) return { status: 'expiring', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'valid', color: 'bg-green-100 text-green-800' };
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery);
    
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddVehicle = () => {
    if (!newVehicle.plateNumber || !newVehicle.model || !newVehicle.capacity) {
      alert('Please fill in all required fields');
      return;
    }

    const vehicle = {
      id: vehicles.length + 1,
      ...newVehicle,
      driver: drivers.find(d => d.id === parseInt(newVehicle.driverId))?.name || 'Unassigned',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      documents: ['insurance', 'registration']
    };

    setVehicles([...vehicles, vehicle]);
    setShowAddVehicle(false);
    setNewVehicle({
      plateNumber: '',
      type: 'Truck',
      model: '',
      capacity: '',
      year: new Date().getFullYear().toString(),
      status: 'active',
      driverId: '',
      insuranceExpiry: '',
      registrationExpiry: '',
    });
  };

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.licenseNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const driver = {
      id: drivers.length + 1,
      ...newDriver,
      driverId: `DRV-${(drivers.length + 1).toString().padStart(3, '0')}`,
      rating: 0,
      totalDeliveries: 0,
      onTimeRate: 0,
      earnings: 0,
      documents: ['license']
    };

    setDrivers([...drivers, driver]);
    setShowAddDriver(false);
    setNewDriver({
      name: '',
      phone: '',
      email: '',
      licenseNumber: '',
      licenseExpiry: '',
      licenseType: 'Class C',
      status: 'active',
      vehicleAssigned: '',
    });
  };

  const handleAssignVehicle = (driverId, vehicleId) => {
    const driver = drivers.find(d => d.id === driverId);
    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (!driver || !vehicle) {
      alert('Driver or vehicle not found');
      return;
    }

    const updatedDrivers = drivers.map(d =>
      d.id === driverId ? { ...d, vehicleAssigned: vehicle.plateNumber } : d
    );

    const updatedVehicles = vehicles.map(v =>
      v.id === vehicleId ? { ...v, driver: driver.name } : v
    );

    setDrivers(updatedDrivers);
    setVehicles(updatedVehicles);
  };

  const handleViewEarnings = (driver) => {
    alert(`Driver Earnings: ${driver.name}
Total Earnings: ${formatCurrency(driver.earnings)}
Total Deliveries: ${driver.totalDeliveries}
On-Time Rate: ${driver.onTimeRate}%
Rating: ${driver.rating}/5.0`);
  };

  const handleViewDocumentExpiry = (item, type) => {
    let expiryDate, docType;
    
    if (type === 'vehicle') {
      expiryDate = item.insuranceExpiry;
      docType = 'Vehicle Insurance';
    } else {
      expiryDate = item.licenseExpiry;
      docType = 'Driver License';
    }

    const expiryStatus = getExpiryStatus(expiryDate);
    const days = getDaysUntilExpiry(expiryDate);

    alert(`${docType} Status:
Expiry Date: ${expiryDate}
Status: ${expiryStatus.status.toUpperCase()}
Days Remaining: ${days} days`);
  };

  const stats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active').length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'active').length,
    expiringDocuments: [
      ...vehicles.filter(v => getDaysUntilExpiry(v.insuranceExpiry) <= 30),
      ...drivers.filter(d => getDaysUntilExpiry(d.licenseExpiry) <= 30)
    ].length,
    maintenanceDue: vehicles.filter(v => {
      const nextMaintenance = new Date(v.nextMaintenance);
      const today = new Date();
      const diffDays = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length,
  };

  const vehicleTypes = ['Truck', 'Pickup', 'Van', 'Minibus', 'Trailer', 'Motorcycle'];
  const licenseTypes = ['Class A', 'Class B', 'Class C', 'Class D', 'Class E'];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Fleet Management</h1>
            <p className="text-sm text-gray-600">Manage vehicles, drivers, and documents</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddVehicle(true)}
              className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Add Vehicle
            </button>
            <button
              onClick={() => setShowAddDriver(true)}
              className="px-3 sm:px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Add Driver
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Vehicles</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.totalVehicles}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
              <span>{stats.activeVehicles} active</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Drivers</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.totalDrivers}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <UserCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
              <span>{stats.activeDrivers} active</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Documents</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.expiringDocuments}</p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
              <span>Requires attention</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Maintenance Due</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.maintenanceDue}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
              <Cog6ToothIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
              <span>Within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            {['vehicles', 'drivers', 'documents', 'assignments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                placeholder={`Search ${activeTab}...`}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
              className="px-3 sm:px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center text-sm sm:text-base"
            >
              <ArrowPathIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Vehicle Registry</h2>
            <p className="text-sm text-gray-500">Manage all vehicles in the fleet</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Vehicle</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Driver</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Insurance</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Maintenance</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => {
                  const insuranceStatus = getExpiryStatus(vehicle.insuranceExpiry);
                  const maintenanceDays = getDaysUntilExpiry(vehicle.nextMaintenance);
                  
                  return (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">{vehicle.plateNumber}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{vehicle.year}</div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1">{vehicle.model} • {vehicle.type}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center">
                          <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mr-2 sm:mr-3" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{vehicle.model}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{vehicle.type} • {vehicle.capacity}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center">
                          <UserCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mr-2 sm:mr-3" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{vehicle.driver}</div>
                            <div className="text-xs text-gray-500">Assigned</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            insuranceStatus.status === 'expired' ? 'bg-red-500' :
                            insuranceStatus.status === 'expiring' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{vehicle.insuranceExpiry}</div>
                            <div className={`text-xs ${insuranceStatus.color.replace('bg-', 'text-').replace('100', '800')}`}>
                              {insuranceStatus.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                        <div className="text-sm text-gray-900">Due: {vehicle.nextMaintenance}</div>
                        <div className={`text-xs font-medium ${
                          maintenanceDays <= 7 ? 'text-red-600' :
                          maintenanceDays <= 30 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {maintenanceDays > 0 ? `${maintenanceDays} days` : 'OVERDUE'}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleViewDocumentExpiry(vehicle, 'vehicle')}
                            className="p-1 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => alert(`Edit vehicle ${vehicle.plateNumber}`)}
                            className="p-1 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Driver Profiles</h2>
            <p className="text-sm text-gray-500">Manage all drivers in the fleet</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">License</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Performance</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers.map((driver) => {
                  const licenseStatus = getExpiryStatus(driver.licenseExpiry);
                  
                  return (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-white font-semibold text-xs sm:text-sm">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{driver.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{driver.driverId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                        <div className="text-sm text-gray-900">{driver.phone}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{driver.email}</div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                        <div className="mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLicenseColor(driver.licenseType)}`}>
                            {driver.licenseType}
                          </span>
                        </div>
                        <div className="text-sm text-gray-900">{driver.licenseNumber}</div>
                        <div className={`text-xs font-medium ${licenseStatus.color.replace('bg-', 'text-').replace('100', '800')}`}>
                          {driver.licenseExpiry} ({licenseStatus.status})
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center">
                          <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-1 sm:mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{driver.vehicleAssigned || 'Unassigned'}</div>
                            <div className="text-xs text-gray-500">
                              {driver.vehicleAssigned ? 'Assigned' : 'Need assignment'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <SignalIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium">{driver.rating}/5</span>
                          </div>
                          <div className="text-sm text-gray-900">{driver.totalDeliveries} deliveries</div>
                          <div className="text-xs text-green-600">{driver.onTimeRate}% on-time</div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleViewEarnings(driver)}
                            className="p-1 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleViewDocumentExpiry(driver, 'driver')}
                            className="p-1 sm:p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                            title="View License"
                          >
                            <IdentificationIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Management</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Expiring Licenses */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Expiring Driver Licenses</h3>
              <div className="space-y-3">
                {drivers
                  .filter(driver => getDaysUntilExpiry(driver.licenseExpiry) <= 60)
                  .sort((a, b) => getDaysUntilExpiry(a.licenseExpiry) - getDaysUntilExpiry(b.licenseExpiry))
                  .map(driver => {
                    const days = getDaysUntilExpiry(driver.licenseExpiry);
                    const status = getExpiryStatus(driver.licenseExpiry);
                    
                    return (
                      <div key={driver.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{driver.name}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {days <= 0 ? 'EXPIRED' : `${days} days`}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-3">
                          <div>License: {driver.licenseNumber}</div>
                          <div>Expiry: {driver.licenseExpiry}</div>
                          <div>Type: {driver.licenseType}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => alert(`Send renewal reminder to ${driver.name}`)}
                            className="px-2 sm:px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg"
                          >
                            Send Reminder
                          </button>
                          <button
                            onClick={() => alert(`Upload renewed license for ${driver.name}`)}
                            className="px-2 sm:px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-lg"
                          >
                            Upload Renewal
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Expiring Insurance */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Expiring Vehicle Insurance</h3>
              <div className="space-y-3">
                {vehicles
                  .filter(vehicle => getDaysUntilExpiry(vehicle.insuranceExpiry) <= 60)
                  .sort((a, b) => getDaysUntilExpiry(a.insuranceExpiry) - getDaysUntilExpiry(b.insuranceExpiry))
                  .map(vehicle => {
                    const days = getDaysUntilExpiry(vehicle.insuranceExpiry);
                    const status = getExpiryStatus(vehicle.insuranceExpiry);
                    
                    return (
                      <div key={vehicle.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{vehicle.plateNumber}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {days <= 0 ? 'EXPIRED' : `${days} days`}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-3">
                          <div>Vehicle: {vehicle.model} ({vehicle.type})</div>
                          <div>Driver: {vehicle.driver}</div>
                          <div>Expiry: {vehicle.insuranceExpiry}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => alert(`Renew insurance for ${vehicle.plateNumber}`)}
                            className="px-2 sm:px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg"
                          >
                            Renew Insurance
                          </button>
                          <button
                            onClick={() => alert(`View insurance documents for ${vehicle.plateNumber}`)}
                            className="px-2 sm:px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-lg"
                          >
                            View Documents
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle-Driver Assignments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Unassigned Vehicles */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Unassigned Vehicles ({vehicles.filter(v => !v.driver || v.driver === 'Unassigned').length})</h3>
              <div className="space-y-3">
                {vehicles
                  .filter(vehicle => !vehicle.driver || vehicle.driver === 'Unassigned')
                  .map(vehicle => (
                    <div key={vehicle.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{vehicle.plateNumber}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{vehicle.model} • {vehicle.capacity}</div>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          Unassigned
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Assign to Driver:</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAssignVehicle(parseInt(e.target.value), vehicle.id);
                            }
                          }}
                        >
                          <option value="">Select Driver</option>
                          {drivers
                            .filter(driver => !driver.vehicleAssigned || driver.vehicleAssigned === '')
                            .map(driver => (
                              <option key={driver.id} value={driver.id}>
                                {driver.name} ({driver.driverId})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Available Drivers */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Available Drivers ({drivers.filter(d => !d.vehicleAssigned || d.vehicleAssigned === '').length})</h3>
              <div className="space-y-3">
                {drivers
                  .filter(driver => !driver.vehicleAssigned || driver.vehicleAssigned === '')
                  .map(driver => (
                    <div key={driver.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-white font-semibold text-xs sm:text-sm">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{driver.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{driver.driverId}</div>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Assign Vehicle:</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAssignVehicle(driver.id, parseInt(e.target.value));
                            }
                          }}
                        >
                          <option value="">Select Vehicle</option>
                          {vehicles
                            .filter(vehicle => !vehicle.driver || vehicle.driver === 'Unassigned')
                            .map(vehicle => (
                              <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.plateNumber} ({vehicle.model})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Vehicle</h3>
              <button
                onClick={() => setShowAddVehicle(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number *</label>
                <input
                  type="text"
                  value={newVehicle.plateNumber}
                  onChange={(e) => setNewVehicle({...newVehicle, plateNumber: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., ABC-123XY"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g., Toyota Hilux"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                  <input
                    type="text"
                    value={newVehicle.capacity}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g., 5 tons"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Driver</label>
                <select
                  value={newVehicle.driverId}
                  onChange={(e) => setNewVehicle({...newVehicle, driverId: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Unassigned</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry</label>
                  <input
                    type="date"
                    value={newVehicle.insuranceExpiry}
                    onChange={(e) => setNewVehicle({...newVehicle, insuranceExpiry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Expiry</label>
                  <input
                    type="date"
                    value={newVehicle.registrationExpiry}
                    onChange={(e) => setNewVehicle({...newVehicle, registrationExpiry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={handleAddVehicle}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                >
                  Add Vehicle
                </button>
                <button
                  onClick={() => setShowAddVehicle(false)}
                  className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Driver</h3>
              <button
                onClick={() => setShowAddDriver(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Musa Ibrahim"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="+2348012345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newDriver.email}
                    onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="driver@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                <input
                  type="text"
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., NGR7890123456"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
                  <select
                    value={newDriver.licenseType}
                    onChange={(e) => setNewDriver({...newDriver, licenseType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {licenseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Expiry</label>
                  <input
                    type="date"
                    value={newDriver.licenseExpiry}
                    onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Vehicle</label>
                <select
                  value={newDriver.vehicleAssigned}
                  onChange={(e) => setNewDriver({...newDriver, vehicleAssigned: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Unassigned</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.plateNumber}>
                      {vehicle.plateNumber} ({vehicle.model})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={handleAddDriver}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                >
                  Add Driver
                </button>
                <button
                  onClick={() => setShowAddDriver(false)}
                  className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;
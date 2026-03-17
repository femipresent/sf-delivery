import React, { useState, useEffect, useMemo } from 'react';
import {
  UserIcon,
  TruckIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  ShieldCheckIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  CogIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  DocumentCheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

// Custom Icons
const RefreshIcon = ArrowPathIcon;

// Mock driver data
const initialDrivers = [
  {
    id: 'DRV-001',
    firstName: 'Musa',
    lastName: 'Ibrahim',
    email: 'musa@example.com',
    phone: '+2348012345678',
    status: 'active',
    availability: 'available',
    vehicleType: 'truck',
    vehicle: 'Toyota Hilux - ABC123XY',
    licenseNumber: 'DL789456123',
    licenseExpiry: '2025-12-31',
    rating: 4.8,
    totalDeliveries: 342,
    successfulDeliveries: 335,
    failedDeliveries: 7,
    totalEarnings: 1250000,
    currentLocation: {
      lat: 6.5244,
      lng: 3.3792,
      address: 'Ikeja, Lagos',
      lastUpdated: '2024-02-20T14:30:00'
    },
    performance: {
      onTimeRate: 94,
      acceptanceRate: 98,
      rating: 4.8
    },
    documents: {
      license: { valid: true, expiry: '2025-12-31' },
      insurance: { valid: true, expiry: '2024-12-31' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [
      { id: 'SHIP-001', status: 'in_transit', destination: 'Abuja', estimatedDelivery: '2024-02-21 14:00' }
    ],
    joinedDate: '2023-05-15',
    lastActive: '2024-02-20 14:30',
    notes: 'Reliable driver, handles fragile items with care',
    emergencyContact: {
      name: 'Amina Ibrahim',
      phone: '+2348023456789',
      relationship: 'Wife'
    }
  },
  {
    id: 'DRV-002',
    firstName: 'Amina',
    lastName: 'Yusuf',
    email: 'amina@example.com',
    phone: '+2348034567890',
    status: 'active',
    availability: 'on_delivery',
    vehicleType: 'refrigerated_van',
    vehicle: 'Refrigerated Van - KAN789CD',
    licenseNumber: 'DL789456124',
    licenseExpiry: '2026-03-15',
    rating: 4.9,
    totalDeliveries: 289,
    successfulDeliveries: 287,
    failedDeliveries: 2,
    totalEarnings: 1100000,
    currentLocation: {
      lat: 6.6018,
      lng: 3.3515,
      address: 'Victoria Island, Lagos',
      lastUpdated: '2024-02-20T13:45:00'
    },
    performance: {
      onTimeRate: 96,
      acceptanceRate: 99,
      rating: 4.9
    },
    documents: {
      license: { valid: true, expiry: '2026-03-15' },
      insurance: { valid: true, expiry: '2024-09-30' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [
      { id: 'SHIP-004', status: 'out_for_delivery', destination: 'Ibadan', estimatedDelivery: '2024-02-20 17:00' }
    ],
    joinedDate: '2023-08-22',
    lastActive: '2024-02-20 13:45',
    notes: 'Specializes in temperature-sensitive deliveries',
    emergencyContact: {
      name: 'Mohammed Yusuf',
      phone: '+2348045678901',
      relationship: 'Husband'
    }
  },
  {
    id: 'DRV-003',
    firstName: 'Chinedu',
    lastName: 'Okoro',
    email: 'chinedu@example.com',
    phone: '+2348023456789',
    status: 'active',
    availability: 'available',
    vehicleType: 'truck',
    vehicle: 'Mitsubishi Canter - XYZ456AB',
    licenseNumber: 'DL789456125',
    licenseExpiry: '2024-11-30',
    rating: 4.5,
    totalDeliveries: 198,
    successfulDeliveries: 192,
    failedDeliveries: 6,
    totalEarnings: 850000,
    currentLocation: {
      lat: 6.4654,
      lng: 3.4064,
      address: 'Surulere, Lagos',
      lastUpdated: '2024-02-20T12:15:00'
    },
    performance: {
      onTimeRate: 91,
      acceptanceRate: 95,
      rating: 4.5
    },
    documents: {
      license: { valid: true, expiry: '2024-11-30' },
      insurance: { valid: false, expiry: '2024-01-15' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [],
    joinedDate: '2024-01-10',
    lastActive: '2024-02-20 12:15',
    notes: 'New driver, requires supervision',
    emergencyContact: {
      name: 'Grace Okoro',
      phone: '+2348034567890',
      relationship: 'Sister'
    }
  },
  {
    id: 'DRV-004',
    firstName: 'Ibrahim',
    lastName: 'Sani',
    email: 'ibrahim@example.com',
    phone: '+2348067890123',
    status: 'inactive',
    availability: 'offline',
    vehicleType: 'van',
    vehicle: 'Nissan Urvan - ABJ789GH',
    licenseNumber: 'DL789456126',
    licenseExpiry: '2025-06-30',
    rating: 4.2,
    totalDeliveries: 156,
    successfulDeliveries: 150,
    failedDeliveries: 6,
    totalEarnings: 650000,
    currentLocation: {
      lat: 6.4413,
      lng: 3.4266,
      address: 'Yaba, Lagos',
      lastUpdated: '2024-02-18T09:30:00'
    },
    performance: {
      onTimeRate: 89,
      acceptanceRate: 92,
      rating: 4.2
    },
    documents: {
      license: { valid: true, expiry: '2025-06-30' },
      insurance: { valid: true, expiry: '2024-12-31' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [],
    joinedDate: '2023-11-05',
    lastActive: '2024-02-18 09:30',
    notes: 'On leave until further notice',
    emergencyContact: {
      name: 'Fatima Sani',
      phone: '+2348078901234',
      relationship: 'Mother'
    }
  },
  {
    id: 'DRV-005',
    firstName: 'Grace',
    lastName: 'Okafor',
    email: 'grace@example.com',
    phone: '+2348056789012',
    status: 'active',
    availability: 'on_break',
    vehicleType: 'motorcycle',
    vehicle: 'Dispatch Bike - LAG456YZ',
    licenseNumber: 'DL789456127',
    licenseExpiry: '2024-08-31',
    rating: 4.7,
    totalDeliveries: 421,
    successfulDeliveries: 418,
    failedDeliveries: 3,
    totalEarnings: 980000,
    currentLocation: {
      lat: 6.5244,
      lng: 3.3792,
      address: 'Ikeja, Lagos',
      lastUpdated: '2024-02-20T11:00:00'
    },
    performance: {
      onTimeRate: 95,
      acceptanceRate: 97,
      rating: 4.7
    },
    documents: {
      license: { valid: true, expiry: '2024-08-31' },
      insurance: { valid: true, expiry: '2024-12-31' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [],
    joinedDate: '2023-03-12',
    lastActive: '2024-02-20 11:00',
    notes: 'Expert in urban quick deliveries',
    emergencyContact: {
      name: 'David Okafor',
      phone: '+2348067890123',
      relationship: 'Brother'
    }
  },
  {
    id: 'DRV-006',
    firstName: 'Mohammed',
    lastName: 'Bello',
    email: 'mohammed@example.com',
    phone: '+2348066667777',
    status: 'pending',
    availability: 'unavailable',
    vehicleType: 'truck',
    vehicle: 'Volvo FH - KAD123FG',
    licenseNumber: 'DL789456128',
    licenseExpiry: '2026-01-31',
    rating: null,
    totalDeliveries: 0,
    successfulDeliveries: 0,
    failedDeliveries: 0,
    totalEarnings: 0,
    currentLocation: null,
    performance: {
      onTimeRate: 0,
      acceptanceRate: 0,
      rating: 0
    },
    documents: {
      license: { valid: false, expiry: '2026-01-31' },
      insurance: { valid: false, expiry: '2024-12-31' },
      vehiclePapers: { valid: false }
    },
    assignedShipments: [],
    joinedDate: '2024-02-15',
    lastActive: null,
    notes: 'New driver application, pending verification',
    emergencyContact: {
      name: 'Hassan Bello',
      phone: '+2348077778888',
      relationship: 'Father'
    }
  },
  {
    id: 'DRV-007',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '+2348044445555',
    status: 'suspended',
    availability: 'offline',
    vehicleType: 'truck',
    vehicle: 'Mercedes Benz - LAG789JK',
    licenseNumber: 'DL789456129',
    licenseExpiry: '2025-04-30',
    rating: 4.3,
    totalDeliveries: 278,
    successfulDeliveries: 272,
    failedDeliveries: 6,
    totalEarnings: 1150000,
    currentLocation: null,
    performance: {
      onTimeRate: 92,
      acceptanceRate: 94,
      rating: 4.3
    },
    documents: {
      license: { valid: true, expiry: '2025-04-30' },
      insurance: { valid: false, expiry: '2024-02-01' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [],
    joinedDate: '2023-06-18',
    lastActive: '2024-02-10 08:45',
    notes: 'Suspended due to expired insurance',
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '+2348055556666',
      relationship: 'Husband'
    }
  },
  {
    id: 'DRV-008',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert@example.com',
    phone: '+2348088889999',
    status: 'active',
    availability: 'available',
    vehicleType: 'van',
    vehicle: 'Toyota Hiace - PHC456LM',
    licenseNumber: 'DL789456130',
    licenseExpiry: '2025-09-30',
    rating: 4.6,
    totalDeliveries: 312,
    successfulDeliveries: 308,
    failedDeliveries: 4,
    totalEarnings: 1050000,
    currentLocation: {
      lat: 4.8156,
      lng: 7.0498,
      address: 'Port Harcourt',
      lastUpdated: '2024-02-20T10:30:00'
    },
    performance: {
      onTimeRate: 93,
      acceptanceRate: 96,
      rating: 4.6
    },
    documents: {
      license: { valid: true, expiry: '2025-09-30' },
      insurance: { valid: true, expiry: '2024-11-30' },
      vehiclePapers: { valid: true }
    },
    assignedShipments: [
      { id: 'SHIP-005', status: 'in_transit', destination: 'Kano', estimatedDelivery: '2024-02-21 18:00' }
    ],
    joinedDate: '2023-09-25',
    lastActive: '2024-02-20 10:30',
    notes: 'Covers South-East and South-South routes',
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+2348099990000',
      relationship: 'Wife'
    }
  },
];

const DriverManagement = () => {
  // State management
  const [drivers, setDrivers] = useState(initialDrivers);
  const [filteredDrivers, setFilteredDrivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAssignShipmentModalOpen, setIsAssignShipmentModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({});
  const [createForm, setCreateForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleType: 'truck',
    vehicle: '',
    licenseNumber: '',
    licenseExpiry: '',
    status: 'pending',
  });
  const [statusAction, setStatusAction] = useState('');
  const [selectedShipment, setSelectedShipment] = useState('');

  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = drivers.length;
    const active = drivers.filter(d => d.status === 'active').length;
    const inactive = drivers.filter(d => d.status === 'inactive').length;
    const pending = drivers.filter(d => d.status === 'pending').length;
    const suspended = drivers.filter(d => d.status === 'suspended').length;
    
    const available = drivers.filter(d => d.availability === 'available').length;
    const onDelivery = drivers.filter(d => d.availability === 'on_delivery').length;
    const onBreak = drivers.filter(d => d.availability === 'on_break').length;
    const offline = drivers.filter(d => d.availability === 'offline').length;
    
    const totalEarnings = drivers.reduce((sum, driver) => sum + driver.totalEarnings, 0);
    const totalDeliveries = drivers.reduce((sum, driver) => sum + driver.totalDeliveries, 0);
    const avgRating = (drivers.reduce((sum, driver) => sum + (driver.rating || 0), 0) / drivers.filter(d => d.rating).length).toFixed(1);
    
    const documentsExpiring = drivers.filter(d => {
      const licenseExpiry = new Date(d.documents.license.expiry);
      const today = new Date();
      const diffTime = licenseExpiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length;

    const documentsExpired = drivers.filter(d => {
      const licenseExpiry = new Date(d.documents.license.expiry);
      const today = new Date();
      return licenseExpiry < today;
    }).length;

    return {
      total,
      active,
      inactive,
      pending,
      suspended,
      available,
      onDelivery,
      onBreak,
      offline,
      totalEarnings,
      totalDeliveries,
      avgRating,
      documentsExpiring,
      documentsExpired,
      activePercentage: ((active / total) * 100).toFixed(1),
    };
  }, [drivers]);

  // Filter and sort drivers
  useEffect(() => {
    let result = [...drivers];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(driver =>
        driver.id.toLowerCase().includes(term) ||
        driver.firstName.toLowerCase().includes(term) ||
        driver.lastName.toLowerCase().includes(term) ||
        driver.email.toLowerCase().includes(term) ||
        driver.phone.includes(term) ||
        driver.vehicle.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(driver => driver.status === statusFilter);
    }

    // Apply availability filter
    if (availabilityFilter !== 'all') {
      result = result.filter(driver => driver.availability === availabilityFilter);
    }

    // Apply vehicle filter
    if (vehicleFilter !== 'all') {
      result = result.filter(driver => driver.vehicleType === vehicleFilter);
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      result = result.filter(driver => driver.rating >= minRating);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.joinedDate) - new Date(a.joinedDate);
        case 'oldest':
          return new Date(a.joinedDate) - new Date(b.joinedDate);
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'deliveries':
          return b.totalDeliveries - a.totalDeliveries;
        case 'earnings':
          return b.totalEarnings - a.totalEarnings;
        default:
          return 0;
      }
    });

    setFilteredDrivers(result);
  }, [drivers, searchTerm, statusFilter, availabilityFilter, vehicleFilter, ratingFilter, sortBy]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
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
      inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
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

  const getAvailabilityBadge = (availability) => {
    const config = {
      available: { color: 'bg-green-100 text-green-800', label: 'Available' },
      on_delivery: { color: 'bg-blue-100 text-blue-800', label: 'On Delivery' },
      on_break: { color: 'bg-yellow-100 text-yellow-800', label: 'On Break' },
      offline: { color: 'bg-gray-100 text-gray-800', label: 'Offline' },
      unavailable: { color: 'bg-red-100 text-red-800', label: 'Unavailable' },
    };
    
    const configItem = config[availability] || config.offline;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        {configItem.label}
      </span>
    );
  };

  const getVehicleBadge = (vehicleType) => {
    const config = {
      truck: { color: 'bg-blue-100 text-blue-800', icon: '🚛', label: 'Truck' },
      van: { color: 'bg-purple-100 text-purple-800', icon: '🚐', label: 'Van' },
      refrigerated_van: { color: 'bg-green-100 text-green-800', icon: '🚚', label: 'Refrigerated Van' },
      motorcycle: { color: 'bg-orange-100 text-orange-800', icon: '🏍️', label: 'Motorcycle' },
    };
    
    const configItem = config[vehicleType] || { color: 'bg-gray-100 text-gray-800', icon: '🚗', label: 'Other' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        <span className="text-sm">{configItem.icon}</span>
        {configItem.label}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    if (!rating) return <span className="text-gray-400 text-sm">No rating</span>;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Action handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotificationMessage('Driver data refreshed successfully', 'success');
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const exportData = filteredDrivers.map(driver => ({
        ID: driver.id,
        Name: `${driver.firstName} ${driver.lastName}`,
        Email: driver.email,
        Phone: driver.phone,
        Status: driver.status,
        Availability: driver.availability,
        Vehicle: driver.vehicle,
        Rating: driver.rating || 'N/A',
        'Total Deliveries': driver.totalDeliveries,
        'Total Earnings': `₦${driver.totalEarnings.toLocaleString()}`,
        'Joined Date': driver.joinedDate,
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', `drivers-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotificationMessage('Driver data exported successfully', 'success');
    }, 1500);
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setIsViewModalOpen(true);
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setEditForm({ ...driver });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setDrivers(prev => prev.map(driver => 
      driver.id === selectedDriver.id ? { ...driver, ...editForm } : driver
    ));
    setIsEditModalOpen(false);
    setSelectedDriver(null);
    setEditForm({});
    showNotificationMessage('Driver updated successfully', 'success');
  };

  const handleCreateDriver = () => {
    const newDriver = {
      id: `DRV-${Date.now().toString().slice(-6)}`,
      ...createForm,
      rating: null,
      totalDeliveries: 0,
      successfulDeliveries: 0,
      failedDeliveries: 0,
      totalEarnings: 0,
      currentLocation: null,
      performance: {
        onTimeRate: 0,
        acceptanceRate: 0,
        rating: 0
      },
      documents: {
        license: { valid: false, expiry: createForm.licenseExpiry },
        insurance: { valid: false, expiry: '' },
        vehiclePapers: { valid: false }
      },
      assignedShipments: [],
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: null,
      notes: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    };
    
    setDrivers(prev => [...prev, newDriver]);
    setIsCreateModalOpen(false);
    setCreateForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      vehicleType: 'truck',
      vehicle: '',
      licenseNumber: '',
      licenseExpiry: '',
      status: 'pending',
    });
    showNotificationMessage('Driver created successfully', 'success');
  };

  const handleDeleteDriver = () => {
    if (!selectedDriver) return;
    
    setDrivers(prev => prev.filter(driver => driver.id !== selectedDriver.id));
    setIsDeleteModalOpen(false);
    setSelectedDriver(null);
    showNotificationMessage('Driver deleted successfully', 'success');
  };

  const handleStatusChange = (driver, action) => {
    setSelectedDriver(driver);
    setStatusAction(action);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedDriver || !statusAction) return;
    
    setDrivers(prev => prev.map(driver => 
      driver.id === selectedDriver.id 
        ? { 
            ...driver, 
            status: statusAction,
            availability: statusAction === 'active' ? 'available' : 'offline'
          } 
        : driver
    ));
    
    setIsStatusModalOpen(false);
    setSelectedDriver(null);
    setStatusAction('');
    showNotificationMessage(`Driver status changed to ${statusAction}`, 'success');
  };

  const handleAssignShipment = (driver) => {
    setSelectedDriver(driver);
    setIsAssignShipmentModalOpen(true);
  };

  const handleConfirmAssignShipment = () => {
    if (!selectedDriver || !selectedShipment) return;
    
    setDrivers(prev => prev.map(driver => 
      driver.id === selectedDriver.id 
        ? { 
            ...driver, 
            assignedShipments: [
              ...driver.assignedShipments,
              { id: selectedShipment, status: 'assigned', destination: 'Unknown', estimatedDelivery: '2024-02-21 18:00' }
            ],
            availability: 'on_delivery'
          } 
        : driver
    ));
    
    setIsAssignShipmentModalOpen(false);
    setSelectedDriver(null);
    setSelectedShipment('');
    showNotificationMessage('Shipment assigned to driver successfully', 'success');
  };

  const handleViewDocuments = (driver) => {
    setSelectedDriver(driver);
    setIsDocumentsModalOpen(true);
  };

  const handleSendReminder = (driver, documentType) => {
    showNotificationMessage(`${documentType} renewal reminder sent to ${driver.firstName}`, 'info');
  };

  // Stats cards - All rounded
  const StatCard = ({ label, value, icon: Icon, color, change, suffix = '' }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}{suffix}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change}
        </div>
      )}
    </div>
  );

  // Performance card - Rounded
  const PerformanceCard = ({ label, value, max = 100, color = 'bg-blue-500' }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <span className="text-lg font-bold text-gray-900">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  // Driver Detail Modal
  const DriverDetailModal = () => {
    if (!selectedDriver) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Driver Details</h3>
              <p className="text-sm text-gray-500">{selectedDriver.id}</p>
            </div>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Driver Status</p>
                    <div className="mt-1">{getStatusBadge(selectedDriver.status)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <TruckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Availability</p>
                    <div className="mt-1">{getAvailabilityBadge(selectedDriver.availability)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <StarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <div className="mt-1">{getRatingStars(selectedDriver.rating)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedDriver.firstName} {selectedDriver.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedDriver.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedDriver.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p className="font-medium">{formatDate(selectedDriver.joinedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="font-medium">{formatDateTime(selectedDriver.lastActive)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <div className="mt-1">{getVehicleBadge(selectedDriver.vehicleType)}</div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Vehicle Information</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <TruckIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedDriver.vehicle}</p>
                          <p className="text-sm text-gray-600">{selectedDriver.vehicleType.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">License Number</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">License Expiry</p>
                          <p className={`text-sm font-medium ${new Date(selectedDriver.documents.license.expiry) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatDate(selectedDriver.documents.license.expiry)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <PhoneIcon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedDriver.emergencyContact.name}</p>
                        <p className="text-sm text-gray-600">{selectedDriver.emergencyContact.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedDriver.emergencyContact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Total Deliveries</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{selectedDriver.totalDeliveries}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">Successful</p>
                          <p className="text-sm font-medium text-green-600">{selectedDriver.successfulDeliveries}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Failed</p>
                          <p className="text-sm font-medium text-red-600">{selectedDriver.failedDeliveries}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">₦{selectedDriver.totalEarnings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-2">Lifetime earnings</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">On-Time Rate</span>
                        <span className="text-sm font-medium text-gray-900">{selectedDriver.performance.onTimeRate}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${selectedDriver.performance.onTimeRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Acceptance Rate</span>
                        <span className="text-sm font-medium text-gray-900">{selectedDriver.performance.acceptanceRate}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${selectedDriver.performance.acceptanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Location */}
                {selectedDriver.currentLocation && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Current Location</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <MapPinIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedDriver.currentLocation.address}</p>
                          <p className="text-sm text-gray-600">
                            Last updated: {formatDateTime(selectedDriver.currentLocation.lastUpdated)}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                        <div className="text-center">
                          <MapPinIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">GPS Location Map</p>
                          <p className="text-xs text-gray-500">Lat: {selectedDriver.currentLocation.lat}, Lng: {selectedDriver.currentLocation.lng}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assigned Shipments */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Assigned Shipments</h4>
                  {selectedDriver.assignedShipments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDriver.assignedShipments.map((shipment, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{shipment.id}</p>
                              <p className="text-sm text-gray-600">Destination: {shipment.destination}</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {shipment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Est. Delivery: {formatDateTime(shipment.estimatedDelivery)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">No Assigned Shipments</p>
                          <p className="text-sm text-gray-600">This driver is currently available</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {selectedDriver.notes && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Notes</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-800">{selectedDriver.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between rounded-b-2xl">
            <div className="flex gap-3">
              <button
                onClick={() => handleViewDocuments(selectedDriver)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                View Documents
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedDriver.phone);
                  showNotificationMessage('Phone number copied to clipboard', 'info');
                }}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Copy Contact
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditDriver(selectedDriver);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Driver
              </button>
              {selectedDriver.assignedShipments.length === 0 && (
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleAssignShipment(selectedDriver);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
                >
                  Assign Shipment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Documents Modal
  const DocumentsModal = () => {
    if (!selectedDriver) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Driver Documents</h3>
              <p className="text-sm text-gray-500">{selectedDriver.firstName} {selectedDriver.lastName}</p>
            </div>
            <button
              onClick={() => setIsDocumentsModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="space-y-4">
              {/* Driver's License */}
              <div className={`rounded-xl p-4 border ${selectedDriver.documents.license.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedDriver.documents.license.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                      <DocumentCheckIcon className={`h-5 w-5 ${selectedDriver.documents.license.valid ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Driver's License</p>
                      <p className="text-sm text-gray-600">License No: {selectedDriver.licenseNumber}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedDriver.documents.license.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedDriver.documents.license.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className={`text-sm font-medium ${new Date(selectedDriver.documents.license.expiry) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatDate(selectedDriver.documents.license.expiry)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedDriver.documents.license.expiry) < new Date() ? 'Expired' : 'Active'}
                    </p>
                  </div>
                </div>
                {!selectedDriver.documents.license.valid && (
                  <button
                    onClick={() => handleSendReminder(selectedDriver, 'License')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send Renewal Reminder
                  </button>
                )}
              </div>

              {/* Insurance */}
              <div className={`rounded-xl p-4 border ${selectedDriver.documents.insurance.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedDriver.documents.insurance.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                      <ShieldCheckIcon className={`h-5 w-5 ${selectedDriver.documents.insurance.valid ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vehicle Insurance</p>
                      <p className="text-sm text-gray-600">Third-party liability insurance</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedDriver.documents.insurance.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedDriver.documents.insurance.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className={`text-sm font-medium ${selectedDriver.documents.insurance.expiry && new Date(selectedDriver.documents.insurance.expiry) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                      {selectedDriver.documents.insurance.expiry ? formatDate(selectedDriver.documents.insurance.expiry) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Coverage</p>
                    <p className="text-sm font-medium">Comprehensive</p>
                  </div>
                </div>
                {!selectedDriver.documents.insurance.valid && (
                  <button
                    onClick={() => handleSendReminder(selectedDriver, 'Insurance')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send Renewal Reminder
                  </button>
                )}
              </div>

              {/* Vehicle Papers */}
              <div className={`rounded-xl p-4 border ${selectedDriver.documents.vehiclePapers.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedDriver.documents.vehiclePapers.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                      <DocumentTextIcon className={`h-5 w-5 ${selectedDriver.documents.vehiclePapers.valid ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vehicle Papers</p>
                      <p className="text-sm text-gray-600">Registration & Roadworthiness</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedDriver.documents.vehiclePapers.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedDriver.documents.vehiclePapers.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Vehicle</p>
                    <p className="text-sm font-medium">{selectedDriver.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium">{selectedDriver.vehicleType.replace('_', ' ')}</p>
                  </div>
                </div>
                {!selectedDriver.documents.vehiclePapers.valid && (
                  <button
                    onClick={() => handleSendReminder(selectedDriver, 'Vehicle Papers')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Send Update Reminder
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsDocumentsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Simulate document verification
                setDrivers(prev => prev.map(driver => 
                  driver.id === selectedDriver.id 
                    ? { 
                        ...driver, 
                        documents: {
                          license: { ...driver.documents.license, valid: true },
                          insurance: { ...driver.documents.insurance, valid: true },
                          vehiclePapers: { ...driver.documents.vehiclePapers, valid: true }
                        },
                        status: 'active'
                      } 
                    : driver
                ));
                setIsDocumentsModalOpen(false);
                showNotificationMessage('All documents verified successfully', 'success');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Verify All Documents
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Assign Shipment Modal
  const AssignShipmentModal = () => {
    if (!selectedDriver) return null;

    const availableShipments = [
      { id: 'SHIP-009', origin: 'Lagos', destination: 'Abuja', weight: '15kg', priority: 'high' },
      { id: 'SHIP-010', origin: 'Port Harcourt', destination: 'Enugu', weight: '8kg', priority: 'normal' },
      { id: 'SHIP-011', origin: 'Kano', destination: 'Kaduna', weight: '25kg', priority: 'normal' },
      { id: 'SHIP-012', origin: 'Ibadan', destination: 'Lagos', weight: '5kg', priority: 'express' },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Assign Shipment</h3>
              <p className="text-sm text-gray-500">Assign shipment to {selectedDriver.firstName} {selectedDriver.lastName}</p>
            </div>
            <button
              onClick={() => setIsAssignShipmentModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="mb-6 bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <TruckIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Driver Information</p>
                  <p className="text-sm text-gray-600">
                    {selectedDriver.vehicle} • {selectedDriver.currentLocation?.address || 'Location unknown'}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Available Shipments</h4>
            <div className="space-y-3">
              {availableShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedShipment === shipment.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                  onClick={() => setSelectedShipment(shipment.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{shipment.id}</p>
                      <p className="text-sm text-gray-600">
                        {shipment.origin} → {shipment.destination}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shipment.priority === 'high' ? 'bg-red-100 text-red-800' :
                        shipment.priority === 'express' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {shipment.priority}
                      </span>
                      {selectedShipment === shipment.id && (
                        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <CubeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{shipment.weight}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{shipment.origin} → {shipment.destination}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedShipment && (
              <div className="mt-6 bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipment Selected</p>
                    <p className="text-sm text-gray-600">
                      {selectedShipment} will be assigned to {selectedDriver.firstName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsAssignShipmentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAssignShipment}
              disabled={!selectedShipment}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Shipment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Status Change Modal
  const StatusChangeModal = () => {
    if (!selectedDriver || !statusAction) return null;

    const actionLabels = {
      active: { label: 'Activate Driver', color: 'green', icon: LockOpenIcon },
      inactive: { label: 'Deactivate Driver', color: 'gray', icon: LockClosedIcon },
      suspended: { label: 'Suspend Driver', color: 'red', icon: XCircleIcon },
    };

    const config = actionLabels[statusAction] || { label: 'Change Status', color: 'blue', icon: CogIcon };
    const Icon = config.icon;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className={`flex items-center justify-center w-12 h-12 ${config.color === 'green' ? 'bg-green-100' : config.color === 'red' ? 'bg-red-100' : 'bg-gray-100'} rounded-full mx-auto mb-4`}>
              <Icon className={`h-6 w-6 ${config.color === 'green' ? 'text-green-600' : config.color === 'red' ? 'text-red-600' : 'text-gray-600'}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              {config.label}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to change {selectedDriver.firstName}'s status to {statusAction}?
              {statusAction === 'suspended' && ' This will prevent them from accepting new deliveries.'}
            </p>
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
                  config.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                  config.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-gray-600 hover:bg-gray-700'
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

  // Notification Component
  const Notification = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Notification />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Management</h1>
            <p className="text-gray-600 mt-2">Manage driver profiles, assignments, and performance</p>
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
              Add New Driver
            </button>
          </div>
        </div>

        {/* Stats Dashboard - All cards rounded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Drivers" 
            value={stats.total} 
            icon={UserIcon} 
            color="bg-blue-50 text-blue-600"
            change="+8.5%"
          />
          <StatCard 
            label="Active Drivers" 
            value={stats.active} 
            icon={CheckCircleIcon} 
            color="bg-green-50 text-green-600"
            change="+12.3%"
          />
          <StatCard 
            label="Available Now" 
            value={stats.available} 
            icon={TruckIcon} 
            color="bg-indigo-50 text-indigo-600"
            change="+5.7%"
          />
          <StatCard 
            label="Total Earnings" 
            value={`₦${(stats.totalEarnings / 1000000).toFixed(1)}M`} 
            icon={CurrencyDollarIcon} 
            color="bg-purple-50 text-purple-600"
            change="+18.2%"
          />
        </div>

        {/* Status Distribution - All cards rounded */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Delivery</p>
                <p className="text-lg font-bold text-blue-600">{stats.onDelivery}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <TruckIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-lg font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-full">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-lg font-bold text-red-600">{stats.suspended}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-full">
                <XCircleIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-lg font-bold text-yellow-600">{stats.avgRating}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-full">
                <StarIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance & Documents - All cards rounded */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <PerformanceCard 
            label="Overall Performance" 
            value={92} 
            color="bg-green-500"
          />
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalDeliveries}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-full">
                <DocumentCheckIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Completed shipments across all drivers</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Expiring</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.documentsExpiring}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Documents expiring in next 30 days</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, vehicle, or license..."
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
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="on_delivery">On Delivery</option>
                <option value="on_break">On Break</option>
                <option value="offline">Offline</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
              >
                <option value="all">All Vehicles</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="refrigerated_van">Refrigerated Van</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rating</option>
                <option value="deliveries">Most Deliveries</option>
                <option value="earnings">Highest Earnings</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-2xl">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vehicle & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status & Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Earnings & Deliveries
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-2xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center rounded-b-2xl">
                    <div className="flex flex-col items-center justify-center">
                      <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">No drivers found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                          driver.status === 'active' ? 'bg-green-100' : 
                          driver.status === 'suspended' ? 'bg-red-100' :
                          driver.status === 'pending' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <UserIcon className={`h-5 w-5 ${
                            driver.status === 'active' ? 'text-green-600' : 
                            driver.status === 'suspended' ? 'text-red-600' :
                            driver.status === 'pending' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {driver.firstName} {driver.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{driver.id}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{driver.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TruckIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{driver.vehicle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {driver.currentLocation?.address || 'Location unknown'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {getVehicleBadge(driver.vehicleType)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>{getStatusBadge(driver.status)}</div>
                        <div>{getAvailabilityBadge(driver.availability)}</div>
                        <div>{getRatingStars(driver.rating)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">On-Time</span>
                            <span className="font-medium">{driver.performance.onTimeRate}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${driver.performance.onTimeRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Acceptance</span>
                            <span className="font-medium">{driver.performance.acceptanceRate}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${driver.performance.acceptanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">
                          ₦{driver.totalEarnings.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {driver.totalDeliveries} total deliveries
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600">{driver.successfulDeliveries} ✓</span>
                          <span className="text-red-600">{driver.failedDeliveries} ✗</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDriver(driver)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditDriver(driver)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit Driver"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleViewDocuments(driver)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                          title="View Documents"
                        >
                          <DocumentTextIcon className="h-5 w-5" />
                        </button>
                        {driver.status !== 'active' && driver.status !== 'suspended' && (
                          <button
                            onClick={() => handleStatusChange(driver, 'active')}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Activate Driver"
                          >
                            <LockOpenIcon className="h-5 w-5" />
                          </button>
                        )}
                        {driver.status === 'active' && (
                          <button
                            onClick={() => handleAssignShipment(driver)}
                            disabled={driver.assignedShipments.length > 0}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-50"
                            title="Assign Shipment"
                          >
                            <TruckIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - All buttons rounded */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-b-2xl">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing <span className="font-medium">{filteredDrivers.length}</span> of <span className="font-medium">{drivers.length}</span> drivers
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isViewModalOpen && <DriverDetailModal />}
      {isDocumentsModalOpen && <DocumentsModal />}
      {isAssignShipmentModalOpen && <AssignShipmentModal />}
      {isStatusModalOpen && <StatusChangeModal />}
    </div>
  );
};

// Helper Icon component
const CubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default DriverManagement;
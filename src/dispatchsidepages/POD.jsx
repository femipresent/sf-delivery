import React, { useState, useEffect, useMemo } from 'react';

// Only import icons that exist in @heroicons/react/24/outline
import {
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
  DocumentTextIcon,
  TruckIcon,
  UserCircleIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  EyeIcon,
  CheckIcon,
  PhotoIcon,
  DocumentArrowUpIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  BellIcon,
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  ReceiptRefundIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon,
  XMarkIcon,
  CubeIcon, // Use CubeIcon instead of PackageIcon
  ShoppingBagIcon, // Alternative
} from '@heroicons/react/24/outline';

// Custom icon for Package if needed
const PackageIcon = CubeIcon || ShoppingBagIcon || ((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
));

// Custom SignatureIcon if not available
const SignatureIconCustom = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// Mock data
const initialDeliveries = [
  {
    id: 'POD-001',
    deliveryId: 'DLV-2024-001234',
    trackingNumber: 'TRK7890123456',
    customer: {
      name: 'ABC Retail Store',
      id: 'CUST-001',
      phone: '+2348012345678',
      email: 'store@abcretail.com',
      address: '123 Market Street, Lagos Island, Lagos',
    },
    driver: {
      name: 'Musa Ibrahim',
      id: 'DRV-001',
      phone: '+2348012345678',
      vehicle: 'Toyota Hilux - ABC123XY',
    },
    deliveryInfo: {
      date: '2024-02-20',
      scheduledWindow: '14:00 - 16:00',
      actualTime: '14:30',
      location: {
        address: '123 Market Street, Lagos Island',
        coordinates: { lat: 6.5244, lng: 3.3792 },
        accuracy: '5m',
      },
    },
    shipment: {
      type: 'Retail Goods',
      items: [
        { id: 1, name: 'Nike Air Max', quantity: 10, condition: 'Good', weight: '25kg' },
        { id: 2, name: 'Denim Jeans', quantity: 5, condition: 'Good', weight: '15kg' },
      ],
      totalItems: 15,
      totalWeight: '40kg',
      packageCount: 2,
      condition: 'Intact',
    },
    podDetails: {
      status: 'verified',
      verificationLevel: 'level-3',
      recipient: {
        name: 'John Doe',
        phone: '+2348022223333',
        relationship: 'Store Manager',
        idType: 'Driver License',
        idNumber: 'DL123456789',
      },
      evidence: {
        signature: true,
        signatureTime: '2024-02-20T14:30:00',
        photos: 3,
        photoUrls: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
        gpsVerification: true,
        timestamp: '2024-02-20T14:30:00',
      },
      digitalPod: {
        generated: true,
        documentId: 'POD-DOC-001234',
        timestamp: '2024-02-20T14:32:00',
        qrCode: true,
        qrCodeId: 'QR-789012',
      },
    },
    payment: {
      deliveryFee: 15000,
      codAmount: 0,
      method: 'Card',
      status: 'Paid',
      invoice: 'INV-2024-0001',
    },
    notes: 'Delivered to back entrance as requested',
    specialInstructions: 'Call before arrival',
    verification: {
      verifiedBy: 'System Auto-Verify',
      verifiedAt: '2024-02-20T14:35:00',
      notes: 'All requirements met',
    },
    createdAt: '2024-02-20T08:00:00',
    updatedAt: '2024-02-20T14:35:00',
  },
  {
    id: 'POD-002',
    deliveryId: 'DLV-2024-001235',
    trackingNumber: 'TRK7890123457',
    customer: {
      name: 'XYZ Wholesalers',
      id: 'CUST-002',
      phone: '+2348023456789',
      email: 'orders@xyzwholesale.com',
      address: '456 Industrial Estate, Ikeja, Lagos',
    },
    driver: {
      name: 'Chinedu Okoro',
      id: 'DRV-002',
      phone: '+2348023456789',
      vehicle: 'Mitsubishi Canter - XYZ456AB',
    },
    deliveryInfo: {
      date: '2024-02-20',
      scheduledWindow: '10:00 - 12:00',
      actualTime: '11:15',
      location: {
        address: '456 Industrial Estate, Ikeja',
        coordinates: { lat: 6.6189, lng: 3.3417 },
        accuracy: '8m',
      },
    },
    shipment: {
      type: 'Industrial Equipment',
      items: [
        { id: 1, name: 'Power Generator', quantity: 1, condition: 'Good', weight: '150kg' },
        { id: 2, name: 'Generator Parts', quantity: 3, condition: 'Minor Damage', weight: '45kg' },
      ],
      totalItems: 4,
      totalWeight: '195kg',
      packageCount: 4,
      condition: 'Minor Damage',
    },
    podDetails: {
      status: 'pending_verification',
      verificationLevel: 'level-2',
      recipient: {
        name: 'Sarah Johnson',
        phone: '+2348044445555',
        relationship: 'Operations Manager',
        idType: 'Company ID',
        idNumber: 'EMP-7890',
      },
      evidence: {
        signature: true,
        signatureTime: '2024-02-20T11:15:00',
        photos: 0,
        photoUrls: [],
        gpsVerification: true,
        timestamp: '2024-02-20T11:15:00',
      },
      digitalPod: {
        generated: true,
        documentId: 'POD-DOC-001235',
        timestamp: '2024-02-20T11:17:00',
        qrCode: true,
        qrCodeId: 'QR-789013',
      },
    },
    payment: {
      deliveryFee: 25000,
      codAmount: 500000,
      method: 'Cash',
      status: 'Pending',
      invoice: 'INV-2024-0002',
    },
    notes: 'Equipment delivered to warehouse',
    specialInstructions: 'Handle with care',
    verification: {
      verifiedBy: null,
      verifiedAt: null,
      notes: 'Awaiting photo verification',
    },
    createdAt: '2024-02-20T07:30:00',
    updatedAt: '2024-02-20T11:17:00',
  },
];

const POD = () => {
  // State management
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPOD, setSelectedPOD] = useState(null);
  
  // Modal states
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');

  // Calculate statistics
  const stats = useMemo(() => {
    const total = deliveries.length;
    const verified = deliveries.filter(d => d.podDetails.status === 'verified').length;
    const pendingVerification = deliveries.filter(d => d.podDetails.status === 'pending_verification').length;
    const disputed = deliveries.filter(d => d.podDetails.status === 'disputed').length;
    const pending = deliveries.filter(d => d.podDetails.status === 'pending').length;
    const digitalPODs = deliveries.filter(d => d.podDetails.digitalPod.generated).length;
    
    return {
      total,
      verified,
      pendingVerification,
      disputed,
      pending,
      digitalPODRate: total > 0 ? ((digitalPODs / total) * 100).toFixed(1) : '0.0',
      averageVerificationTime: '15min',
      highRisk: deliveries.filter(d => d.podDetails.verificationLevel === 'level-1').length,
    };
  }, [deliveries]);

  // Filter and sort deliveries
  const filteredDeliveries = useMemo(() => {
    let result = [...deliveries];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d =>
        d.deliveryId.toLowerCase().includes(term) ||
        d.trackingNumber.toLowerCase().includes(term) ||
        d.customer.name.toLowerCase().includes(term) ||
        d.driver.name.toLowerCase().includes(term) ||
        d.customer.phone.includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(d => d.podDetails.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date(today);
      
      switch (dateFilter) {
        case 'today':
          result = result.filter(d => d.deliveryInfo.date === today.toISOString().split('T')[0]);
          break;
        case 'yesterday':
          filterDate.setDate(filterDate.getDate() - 1);
          result = result.filter(d => d.deliveryInfo.date === filterDate.toISOString().split('T')[0]);
          break;
        case 'week':
          filterDate.setDate(filterDate.getDate() - 7);
          result = result.filter(d => new Date(d.deliveryInfo.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(filterDate.getMonth() - 1);
          result = result.filter(d => new Date(d.deliveryInfo.date) >= filterDate);
          break;
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.deliveryInfo.date + 'T' + b.deliveryInfo.actualTime) - 
                 new Date(a.deliveryInfo.date + 'T' + a.deliveryInfo.actualTime);
        case 'oldest':
          return new Date(a.deliveryInfo.date + 'T' + a.deliveryInfo.actualTime) - 
                 new Date(b.deliveryInfo.date + 'T' + b.deliveryInfo.actualTime);
        case 'customer':
          return a.customer.name.localeCompare(b.customer.name);
        case 'driver':
          return a.driver.name.localeCompare(b.driver.name);
        case 'status':
          return a.podDetails.status.localeCompare(b.podDetails.status);
        default:
          return 0;
      }
    });

    return result;
  }, [deliveries, searchTerm, statusFilter, dateFilter, sortBy]);

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      verified: {
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircleIcon,
        label: 'Verified',
      },
      pending_verification: {
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: ClockIcon,
        label: 'Pending Verification',
      },
      pending: {
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: ClockIcon,
        label: 'Pending',
      },
      disputed: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: ExclamationTriangleIcon,
        label: 'Disputed',
      },
    };

    const configItem = config[status] || config.pending;
    const Icon = configItem.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${configItem.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {configItem.label}
      </span>
    );
  };

  const getVerificationLevelBadge = (level) => {
    const levels = {
      'level-0': { label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
      'level-1': { label: 'Basic', color: 'bg-red-100 text-red-800' },
      'level-2': { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
      'level-3': { label: 'Complete', color: 'bg-green-100 text-green-800' },
    };
    
    const current = levels[level] || levels['level-0'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${current.color}`}>
        {current.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const config = {
      Paid: 'bg-green-50 text-green-700 border-green-200',
      Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Failed: 'bg-red-50 text-red-700 border-red-200',
      Refunded: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${config[status] || 'bg-gray-50 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  // Action handlers
  const handleViewDetails = (pod) => {
    setSelectedPOD(pod);
    setIsDetailModalOpen(true);
  };

  const handleVerifyPOD = (podId) => {
    setDeliveries(prev =>
      prev.map(pod =>
        pod.id === podId
          ? {
              ...pod,
              podDetails: {
                ...pod.podDetails,
                status: 'verified',
                verificationLevel: 'level-3',
              },
              verification: {
                verifiedBy: 'Admin User',
                verifiedAt: new Date().toISOString(),
                notes: verificationNotes || 'Manually verified by admin',
              },
            }
          : pod
      )
    );
    setIsVerifyModalOpen(false);
    setVerificationNotes('');
    alert('POD verified successfully!');
  };

  const handleGeneratePOD = (podId) => {
    const pod = deliveries.find(p => p.id === podId);
    if (!pod) return;

    const newPOD = {
      ...pod,
      podDetails: {
        ...pod.podDetails,
        digitalPod: {
          generated: true,
          documentId: `POD-DOC-${Date.now()}`,
          timestamp: new Date().toISOString(),
          qrCode: true,
          qrCodeId: `QR-${Math.random().toString(36).substr(2, 9)}`,
        },
        status: 'verified',
        verificationLevel: 'level-3',
      },
      verification: {
        verifiedBy: 'System Generated',
        verifiedAt: new Date().toISOString(),
        notes: 'Automatically generated POD',
      },
    };

    setDeliveries(prev => prev.map(p => (p.id === podId ? newPOD : p)));
    alert('POD document generated successfully!');
  };

  const handleDownloadPOD = (pod) => {
    if (!pod.podDetails.digitalPod.generated) {
      alert('No digital POD available for download');
      return;
    }

    // Simulate download
    const podData = {
      documentId: pod.podDetails.digitalPod.documentId,
      deliveryId: pod.deliveryId,
      customer: pod.customer.name,
      date: pod.deliveryInfo.date,
      verifiedBy: pod.verification.verifiedBy,
      verificationTime: pod.verification.verifiedAt,
    };

    const dataStr = JSON.stringify(podData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `POD-${pod.deliveryId}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('POD document downloaded!');
  };

  // Render component
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Proof of Delivery Management</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Track, verify, and manage delivery confirmations</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base">
              <DocumentArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Generate POD
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors text-sm sm:text-base">
              <ArrowDownTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Deliveries</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                <TruckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-green-600 font-medium mt-2 sm:mt-3">
              {stats.verified} verified deliveries
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Verified PODs</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stats.verified}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
              {stats.digitalPODRate}% digital POD rate
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Verification</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stats.pendingVerification}</p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg">
                <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
              {stats.disputed} disputed, {stats.pending} pending
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">High Risk Deliveries</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stats.highRisk}</p>
              </div>
              <div className="p-2 sm:p-3 bg-red-50 rounded-lg">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
              Require immediate attention
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Delivery ID, Tracking #, Customer, Driver, or Phone..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <select
                className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All POD Status</option>
                <option value="verified">Verified</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="pending">Pending</option>
                <option value="disputed">Disputed</option>
              </select>
              
              <select
                className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
              
              <select
                className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="customer">Customer Name</option>
                <option value="driver">Driver Name</option>
                <option value="status">POD Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* POD List Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full min-w-[1000px] sm:min-w-0">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Delivery Information
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer & Driver
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  POD Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Evidence
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{delivery.deliveryId}</span>
                        <span className="text-xs text-gray-500 hidden sm:block">|</span>
                        <span className="text-xs sm:text-sm text-gray-600">{delivery.trackingNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 flex-wrap">
                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{formatDate(delivery.deliveryInfo.date)}</span>
                        <span className="text-gray-400">•</span>
                        <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{delivery.deliveryInfo.actualTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate max-w-[200px] sm:max-w-xs">{delivery.customer.address}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 sm:px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{delivery.customer.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{delivery.customer.phone}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{delivery.driver.name}</p>
                        <p className="text-xs text-gray-500">{delivery.driver.vehicle}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 sm:px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        {getStatusBadge(delivery.podDetails.status)}
                      </div>
                      <div>
                        {getVerificationLevelBadge(delivery.podDetails.verificationLevel)}
                      </div>
                      {delivery.verification.verifiedBy && (
                        <div className="text-xs text-gray-500">
                          Verified by: {delivery.verification.verifiedBy}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 sm:px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`flex items-center gap-1.5 text-xs sm:text-sm ${
                          delivery.podDetails.evidence.signature
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                            <span className="text-sm sm:text-lg">✍️</span>
                          </div>
                          Signature
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs sm:text-sm ${
                          delivery.podDetails.evidence.photos > 0
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}>
                          <CameraIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          Photos ({delivery.podDetails.evidence.photos})
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {delivery.podDetails.digitalPod.generated ? (
                          <div className="flex items-center gap-1.5 text-green-600 text-xs sm:text-sm">
                            <DocumentCheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            Digital POD Generated
                          </div>
                        ) : (
                          <div className="text-gray-400 text-xs sm:text-sm">No Digital POD</div>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleViewDetails(delivery)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        View Details
                      </button>
                      
                      <div className="flex gap-2">
                        {delivery.podDetails.status === 'pending_verification' && (
                          <button
                            onClick={() => {
                              setSelectedPOD(delivery);
                              setIsVerifyModalOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs sm:text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <CheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            Verify
                          </button>
                        )}
                        
                        {delivery.podDetails.digitalPod.generated ? (
                          <button
                            onClick={() => handleDownloadPOD(delivery)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <ArrowDownTrayIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            Download
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGeneratePOD(delivery.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <DocumentArrowUpIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            Generate POD
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No PODs found</h3>
            <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedPOD && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">POD Details</h3>
                <p className="text-xs sm:text-sm text-gray-500">{selectedPOD.deliveryId}</p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(90vh-120px)]">
              {/* Customer & Driver Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <BuildingStorefrontIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    Customer Information
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Customer Name</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.customer.phone}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{selectedPOD.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Delivery Address</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.customer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    Driver Information
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Driver Name</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.driver.name}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.driver.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Vehicle</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.driver.vehicle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  Delivery Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Delivery Date</p>
                    <p className="font-medium text-sm sm:text-base">{formatDate(selectedPOD.deliveryInfo.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Scheduled Window</p>
                    <p className="font-medium text-sm sm:text-base">{selectedPOD.deliveryInfo.scheduledWindow}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Actual Time</p>
                    <p className="font-medium text-sm sm:text-base">{selectedPOD.deliveryInfo.actualTime}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Location Accuracy</p>
                    <p className="font-medium text-sm sm:text-base">{selectedPOD.deliveryInfo.location.accuracy || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <PackageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  Shipment Details
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Shipment Type</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.shipment.type}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Total Items</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.shipment.totalItems}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Total Weight</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.shipment.totalWeight}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">Items</p>
                    <div className="space-y-2">
                      {selectedPOD.shipment.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                          <div>
                            <p className="font-medium text-sm sm:text-base">{item.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600">{item.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Delivery Fee</p>
                    <p className="font-medium text-base sm:text-lg">{formatCurrency(selectedPOD.payment.deliveryFee)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">COD Amount</p>
                    <p className="font-medium text-base sm:text-lg">{formatCurrency(selectedPOD.payment.codAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-sm sm:text-base">{selectedPOD.payment.method}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Payment Status</p>
                    {getPaymentStatusBadge(selectedPOD.payment.status)}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Notes & Instructions</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Delivery Notes</p>
                    <p className="font-medium text-sm sm:text-base">{selectedPOD.notes}</p>
                  </div>
                  {selectedPOD.specialInstructions && (
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Special Instructions</p>
                      <p className="font-medium text-amber-600 text-sm sm:text-base">{selectedPOD.specialInstructions}</p>
                    </div>
                  )}
                  {selectedPOD.verification.notes && (
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Verification Notes</p>
                      <p className="font-medium text-sm sm:text-base">{selectedPOD.verification.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadPOD(selectedPOD)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                <ArrowDownTrayIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                Download POD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {isVerifyModalOpen && selectedPOD && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-md">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Verify POD</h3>
              <button onClick={() => setIsVerifyModalOpen(false)} className="rounded-lg hover:bg-gray-100 p-1">
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Delivery: {selectedPOD.deliveryId}</p>
                <p className="text-xs sm:text-sm text-gray-600">Customer: {selectedPOD.customer.name}</p>
              </div>
              <div className="mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Verification Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  rows="3"
                  placeholder="Add verification notes..."
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setIsVerifyModalOpen(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleVerifyPOD(selectedPOD.id)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                >
                  Confirm Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POD;
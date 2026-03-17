import React, { useState, useEffect, useMemo } from 'react';
import {
  BuildingStorefrontIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  CubeIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  TruckIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  BanknotesIcon,
  DocumentDuplicateIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// Custom Icons
const RefreshIcon = ArrowPathIcon;
const InvoiceIcon = DocumentDuplicateIcon;

// Mock shipper data
const initialShippers = [
  {
    id: 'SHP-001',
    businessName: 'XYZ Wholesalers',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@xyzwholesale.com',
    phone: '+2348044445555',
    status: 'active',
    accountType: 'premium',
    businessType: 'wholesale',
    registrationNumber: 'RC12345678',
    taxId: 'TIN789456123',
    address: {
      street: 'No 24, Allen Avenue',
      city: 'Ikeja, Lagos',
      country: 'Nigeria'
    },
    billingAddress: {
      street: 'Plot 15, Wuse Zone 5',
      city: 'Abuja',
      country: 'Nigeria'
    },
    paymentTerms: 'net_30',
    creditLimit: 500000,
    outstandingBalance: 125000,
    totalShipments: 342,
    pendingShipments: 8,
    deliveredShipments: 327,
    cancelledShipments: 7,
    totalSpending: 1850000,
    avgShipmentValue: 5409,
    lastShipmentDate: '2024-02-20',
    nextPaymentDate: '2024-03-15',
    joinedDate: '2023-05-10',
    accountManager: 'Grace Okafor',
    rating: 4.8,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Reliable customer, always pays on time',
    preferredDelivery: ['express', 'standard'],
    discountRate: 5,
    loyaltyPoints: 1250
  },
  {
    id: 'SHP-002',
    businessName: 'Tech Solutions Ltd',
    contactPerson: 'Robert Chen',
    email: 'robert@techsolutions.com',
    phone: '+2348088889999',
    status: 'active',
    accountType: 'standard',
    businessType: 'technology',
    registrationNumber: 'RC87654321',
    taxId: 'TIN987654321',
    address: {
      street: 'No 15, Broad Street',
      city: 'Lagos Island',
      country: 'Nigeria'
    },
    billingAddress: {
      sameAsAddress: true
    },
    paymentTerms: 'net_15',
    creditLimit: 250000,
    outstandingBalance: 45000,
    totalShipments: 156,
    pendingShipments: 3,
    deliveredShipments: 150,
    cancelledShipments: 3,
    totalSpending: 850000,
    avgShipmentValue: 5449,
    lastShipmentDate: '2024-02-19',
    nextPaymentDate: '2024-03-05',
    joinedDate: '2023-08-22',
    accountManager: 'Admin User',
    rating: 4.5,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: false },
      bankStatement: { uploaded: false, verified: false }
    },
    notes: 'Fast-growing tech company',
    preferredDelivery: ['express'],
    discountRate: 0,
    loyaltyPoints: 780
  },
  {
    id: 'SHP-003',
    businessName: 'Fresh Foods Market',
    contactPerson: 'Mohammed Bello',
    email: 'mohammed@freshfoods.com',
    phone: '+2348066667777',
    status: 'active',
    accountType: 'premium',
    businessType: 'food_beverage',
    registrationNumber: 'RC11223344',
    taxId: 'TIN112233445',
    address: {
      street: 'Plot 8, GRA',
      city: 'Port Harcourt',
      country: 'Nigeria'
    },
    billingAddress: {
      street: 'Same as above',
      city: 'Port Harcourt',
      country: 'Nigeria'
    },
    paymentTerms: 'prepaid',
    creditLimit: 0,
    outstandingBalance: 0,
    totalShipments: 289,
    pendingShipments: 5,
    deliveredShipments: 282,
    cancelledShipments: 2,
    totalSpending: 1650000,
    avgShipmentValue: 5710,
    lastShipmentDate: '2024-02-20',
    nextPaymentDate: 'N/A',
    joinedDate: '2023-09-15',
    accountManager: 'Grace Okafor',
    rating: 4.9,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Temperature-sensitive shipments only',
    preferredDelivery: ['refrigerated'],
    discountRate: 8,
    loyaltyPoints: 1890
  },
  {
    id: 'SHP-004',
    businessName: 'ABC Retail Store',
    contactPerson: 'John Doe',
    email: 'john@abcretail.com',
    phone: '+2348011112222',
    status: 'suspended',
    accountType: 'standard',
    businessType: 'retail',
    registrationNumber: 'RC55667788',
    taxId: 'TIN556677889',
    address: {
      street: 'No 45, New Market Road',
      city: 'Onitsha',
      country: 'Nigeria'
    },
    billingAddress: {
      street: 'Plot 22, GRA',
      city: 'Onitsha',
      country: 'Nigeria'
    },
    paymentTerms: 'net_30',
    creditLimit: 150000,
    outstandingBalance: 75000,
    totalShipments: 198,
    pendingShipments: 0,
    deliveredShipments: 192,
    cancelledShipments: 6,
    totalSpending: 980000,
    avgShipmentValue: 4949,
    lastShipmentDate: '2024-02-10',
    nextPaymentDate: '2024-02-28',
    joinedDate: '2023-11-05',
    accountManager: 'Admin User',
    rating: 4.2,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: false, verified: false },
      bankStatement: { uploaded: false, verified: false }
    },
    notes: 'Account suspended due to overdue payments',
    preferredDelivery: ['economy', 'standard'],
    discountRate: 0,
    loyaltyPoints: 450
  },
  {
    id: 'SHP-005',
    businessName: 'Premium Clothing Boutique',
    contactPerson: 'Grace Williams',
    email: 'grace@premiumclothing.com',
    phone: '+2348077776666',
    status: 'active',
    accountType: 'premium',
    businessType: 'fashion',
    registrationNumber: 'RC99887766',
    taxId: 'TIN998877665',
    address: {
      street: 'No 33, Victoria Island',
      city: 'Lagos',
      country: 'Nigeria'
    },
    billingAddress: {
      sameAsAddress: true
    },
    paymentTerms: 'prepaid',
    creditLimit: 0,
    outstandingBalance: 0,
    totalShipments: 89,
    pendingShipments: 2,
    deliveredShipments: 87,
    cancelledShipments: 0,
    totalSpending: 650000,
    avgShipmentValue: 7303,
    lastShipmentDate: '2024-02-19',
    nextPaymentDate: 'N/A',
    joinedDate: '2024-01-15',
    accountManager: 'Grace Okafor',
    rating: 4.7,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'High-value shipments, requires special handling',
    preferredDelivery: ['express', 'white_glove'],
    discountRate: 10,
    loyaltyPoints: 890
  },
  {
    id: 'SHP-006',
    businessName: 'MediCare Pharmaceuticals',
    contactPerson: 'Dr. Ibrahim Sani',
    email: 'ibrahim@medicarepharma.com',
    phone: '+2348099998888',
    status: 'active',
    accountType: 'enterprise',
    businessType: 'pharmaceutical',
    registrationNumber: 'RC33445566',
    taxId: 'TIN334455667',
    address: {
      street: 'Plot 10, GRA',
      city: 'Kano',
      country: 'Nigeria'
    },
    billingAddress: {
      street: 'Corporate Headquarters',
      city: 'Abuja',
      country: 'Nigeria'
    },
    paymentTerms: 'net_45',
    creditLimit: 1000000,
    outstandingBalance: 250000,
    totalShipments: 421,
    pendingShipments: 12,
    deliveredShipments: 408,
    cancelledShipments: 1,
    totalSpending: 2850000,
    avgShipmentValue: 6774,
    lastShipmentDate: '2024-02-20',
    nextPaymentDate: '2024-04-05',
    joinedDate: '2023-03-20',
    accountManager: 'Admin User',
    rating: 4.6,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Requires temperature-controlled shipping',
    preferredDelivery: ['refrigerated', 'express'],
    discountRate: 12,
    loyaltyPoints: 2450
  },
  {
    id: 'SHP-007',
    businessName: 'QuickMart Superstores',
    contactPerson: 'Chinedu Okoro',
    email: 'chinedu@quickmart.com',
    phone: '+2348022223333',
    status: 'pending',
    accountType: 'standard',
    businessType: 'retail',
    registrationNumber: 'RC77778888',
    taxId: 'TIN777788889',
    address: {
      street: 'No 27, Ring Road',
      city: 'Benin City',
      country: 'Nigeria'
    },
    billingAddress: {
      sameAsAddress: true
    },
    paymentTerms: 'net_30',
    creditLimit: 200000,
    outstandingBalance: 0,
    totalShipments: 0,
    pendingShipments: 0,
    deliveredShipments: 0,
    cancelledShipments: 0,
    totalSpending: 0,
    avgShipmentValue: 0,
    lastShipmentDate: 'N/A',
    nextPaymentDate: 'N/A',
    joinedDate: '2024-02-18',
    accountManager: 'Grace Okafor',
    rating: null,
    documents: {
      registration: { uploaded: true, verified: false },
      taxCertificate: { uploaded: false, verified: false },
      bankStatement: { uploaded: false, verified: false }
    },
    notes: 'New account, awaiting document verification',
    preferredDelivery: ['standard'],
    discountRate: 0,
    loyaltyPoints: 0
  },
  {
    id: 'SHP-008',
    businessName: 'Global Electronics',
    contactPerson: 'Amina Yusuf',
    email: 'amina@globalelectronics.com',
    phone: '+2348055554444',
    status: 'inactive',
    accountType: 'standard',
    businessType: 'electronics',
    registrationNumber: 'RC999000111',
    taxId: 'TIN999000112',
    address: {
      street: 'No 8, Ahmadu Bello Way',
      city: 'Kaduna',
      country: 'Nigeria'
    },
    billingAddress: {
      street: 'Corporate Office',
      city: 'Lagos',
      country: 'Nigeria'
    },
    paymentTerms: 'prepaid',
    creditLimit: 0,
    outstandingBalance: 0,
    totalShipments: 156,
    pendingShipments: 0,
    deliveredShipments: 154,
    cancelledShipments: 2,
    totalSpending: 950000,
    avgShipmentValue: 6090,
    lastShipmentDate: '2024-01-15',
    nextPaymentDate: 'N/A',
    joinedDate: '2023-07-10',
    accountManager: 'Admin User',
    rating: 4.3,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Account inactive - seasonal business',
    preferredDelivery: ['standard', 'express'],
    discountRate: 0,
    loyaltyPoints: 680
  },
  {
    id: 'SHP-009',
    businessName: 'Nigerian Agricultural Co.',
    contactPerson: 'Emeka Okafor',
    email: 'emeka@nigerianagri.com',
    phone: '+2348033332222',
    status: 'active',
    accountType: 'enterprise',
    businessType: 'agriculture',
    registrationNumber: 'RC222333444',
    taxId: 'TIN222333445',
    address: {
      street: 'Plot 18, Industrial Layout',
      city: 'Enugu',
      country: 'Nigeria'
    },
    billingAddress: {
      sameAsAddress: true
    },
    paymentTerms: 'net_60',
    creditLimit: 750000,
    outstandingBalance: 320000,
    totalShipments: 278,
    pendingShipments: 6,
    deliveredShipments: 272,
    cancelledShipments: 0,
    totalSpending: 1850000,
    avgShipmentValue: 6655,
    lastShipmentDate: '2024-02-19',
    nextPaymentDate: '2024-04-20',
    joinedDate: '2023-04-25',
    accountManager: 'Grace Okafor',
    rating: 4.4,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Bulk shipments, requires special equipment',
    preferredDelivery: ['bulk', 'standard'],
    discountRate: 7,
    loyaltyPoints: 1670
  },
  {
    id: 'SHP-010',
    businessName: 'Lagos Fashion Hub',
    contactPerson: 'Fatima Sani',
    email: 'fatima@lagosfashion.com',
    phone: '+2348044443333',
    status: 'active',
    accountType: 'premium',
    businessType: 'fashion',
    registrationNumber: 'RC555666777',
    taxId: 'TIN555666778',
    address: {
      street: 'No 15, Marina Road',
      city: 'Lagos',
      country: 'Nigeria'
    },
    billingAddress: {
      sameAsAddress: true
    },
    paymentTerms: 'prepaid',
    creditLimit: 0,
    outstandingBalance: 0,
    totalShipments: 134,
    pendingShipments: 4,
    deliveredShipments: 130,
    cancelledShipments: 0,
    totalSpending: 850000,
    avgShipmentValue: 6343,
    lastShipmentDate: '2024-02-20',
    nextPaymentDate: 'N/A',
    joinedDate: '2023-10-30',
    accountManager: 'Admin User',
    rating: 4.8,
    documents: {
      registration: { uploaded: true, verified: true },
      taxCertificate: { uploaded: true, verified: true },
      bankStatement: { uploaded: true, verified: true }
    },
    notes: 'Fast fashion shipments, quick turnaround required',
    preferredDelivery: ['express'],
    discountRate: 6,
    loyaltyPoints: 980
  },
];

const ShipperManagement = () => {
  // State management
  const [shippers, setShippers] = useState(initialShippers);
  const [filteredShippers, setFilteredShippers] = useState(initialShippers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [accountTypeFilter, setAccountTypeFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedShipper, setSelectedShipper] = useState(null);
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({});
  const [createForm, setCreateForm] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'retail',
    accountType: 'standard',
    status: 'pending',
    address: { street: '', city: '', country: 'Nigeria' },
    paymentTerms: 'net_30',
    creditLimit: 0,
  });
  const [statusAction, setStatusAction] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');

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
    const total = shippers.length;
    const active = shippers.filter(s => s.status === 'active').length;
    const inactive = shippers.filter(s => s.status === 'inactive').length;
    const pending = shippers.filter(s => s.status === 'pending').length;
    const suspended = shippers.filter(s => s.status === 'suspended').length;
    
    const premium = shippers.filter(s => s.accountType === 'premium').length;
    const standard = shippers.filter(s => s.accountType === 'standard').length;
    const enterprise = shippers.filter(s => s.accountType === 'enterprise').length;
    
    const totalShipments = shippers.reduce((sum, shipper) => sum + shipper.totalShipments, 0);
    const totalRevenue = shippers.reduce((sum, shipper) => sum + shipper.totalSpending, 0);
    const outstandingBalance = shippers.reduce((sum, shipper) => sum + shipper.outstandingBalance, 0);
    const overduePayments = shippers.filter(s => {
      if (s.nextPaymentDate === 'N/A' || s.outstandingBalance === 0) return false;
      const nextPayment = new Date(s.nextPaymentDate);
      const today = new Date();
      return nextPayment < today;
    }).length;

    const avgRating = (shippers.reduce((sum, shipper) => sum + (shipper.rating || 0), 0) / shippers.filter(s => s.rating).length).toFixed(1);
    const loyaltyPoints = shippers.reduce((sum, shipper) => sum + shipper.loyaltyPoints, 0);

    const recentGrowth = '+12.5%';
    const avgSpendingPerShipment = totalShipments > 0 ? (totalRevenue / totalShipments).toFixed(0) : 0;

    return {
      total,
      active,
      inactive,
      pending,
      suspended,
      premium,
      standard,
      enterprise,
      totalShipments,
      totalRevenue,
      outstandingBalance,
      overduePayments,
      avgRating,
      loyaltyPoints,
      recentGrowth,
      avgSpendingPerShipment,
      activePercentage: ((active / total) * 100).toFixed(1),
    };
  }, [shippers]);

  // Filter and sort shippers
  useEffect(() => {
    let result = [...shippers];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(shipper =>
        shipper.id.toLowerCase().includes(term) ||
        shipper.businessName.toLowerCase().includes(term) ||
        shipper.contactPerson.toLowerCase().includes(term) ||
        shipper.email.toLowerCase().includes(term) ||
        shipper.phone.includes(term) ||
        shipper.registrationNumber.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(shipper => shipper.status === statusFilter);
    }

    // Apply account type filter
    if (accountTypeFilter !== 'all') {
      result = result.filter(shipper => shipper.accountType === accountTypeFilter);
    }

    // Apply business type filter
    if (businessTypeFilter !== 'all') {
      result = result.filter(shipper => shipper.businessType === businessTypeFilter);
    }

    // Apply payment filter
    if (paymentFilter !== 'all') {
      if (paymentFilter === 'overdue') {
        result = result.filter(shipper => {
          if (shipper.nextPaymentDate === 'N/A' || shipper.outstandingBalance === 0) return false;
          const nextPayment = new Date(shipper.nextPaymentDate);
          const today = new Date();
          return nextPayment < today;
        });
      } else if (paymentFilter === 'paid') {
        result = result.filter(shipper => shipper.outstandingBalance === 0);
      } else if (paymentFilter === 'outstanding') {
        result = result.filter(shipper => shipper.outstandingBalance > 0);
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.joinedDate) - new Date(a.joinedDate);
        case 'oldest':
          return new Date(a.joinedDate) - new Date(b.joinedDate);
        case 'name':
          return a.businessName.localeCompare(b.businessName);
        case 'revenue':
          return b.totalSpending - a.totalSpending;
        case 'shipments':
          return b.totalShipments - a.totalShipments;
        case 'balance':
          return b.outstandingBalance - a.outstandingBalance;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredShippers(result);
  }, [shippers, searchTerm, statusFilter, accountTypeFilter, businessTypeFilter, paymentFilter, sortBy]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  const getAccountTypeBadge = (accountType) => {
    const config = {
      premium: { color: 'bg-purple-100 text-purple-800', icon: '👑', label: 'Premium' },
      standard: { color: 'bg-blue-100 text-blue-800', icon: '⭐', label: 'Standard' },
      enterprise: { color: 'bg-green-100 text-green-800', icon: '🏢', label: 'Enterprise' },
    };
    
    const configItem = config[accountType] || { color: 'bg-gray-100 text-gray-800', icon: '📦', label: 'Basic' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        <span className="text-sm">{configItem.icon}</span>
        {configItem.label}
      </span>
    );
  };

  const getBusinessTypeBadge = (businessType) => {
    const config = {
      wholesale: { color: 'bg-blue-50 text-blue-700', label: 'Wholesale' },
      retail: { color: 'bg-green-50 text-green-700', label: 'Retail' },
      technology: { color: 'bg-purple-50 text-purple-700', label: 'Technology' },
      food_beverage: { color: 'bg-red-50 text-red-700', label: 'Food & Beverage' },
      fashion: { color: 'bg-pink-50 text-pink-700', label: 'Fashion' },
      pharmaceutical: { color: 'bg-indigo-50 text-indigo-700', label: 'Pharmaceutical' },
      electronics: { color: 'bg-yellow-50 text-yellow-700', label: 'Electronics' },
      agriculture: { color: 'bg-brown-50 text-brown-700', label: 'Agriculture' },
    };
    
    const configItem = config[businessType] || { color: 'bg-gray-100 text-gray-800', label: businessType };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        {configItem.label}
      </span>
    );
  };

  const getPaymentTermsBadge = (terms) => {
    const config = {
      prepaid: { color: 'bg-green-100 text-green-800', label: 'Prepaid' },
      net_15: { color: 'bg-blue-100 text-blue-800', label: 'Net 15' },
      net_30: { color: 'bg-yellow-100 text-yellow-800', label: 'Net 30' },
      net_45: { color: 'bg-orange-100 text-orange-800', label: 'Net 45' },
      net_60: { color: 'bg-red-100 text-red-800', label: 'Net 60' },
    };
    
    const configItem = config[terms] || { color: 'bg-gray-100 text-gray-800', label: terms };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
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
      showNotificationMessage('Shipper data refreshed successfully', 'success');
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const exportData = filteredShippers.map(shipper => ({
        ID: shipper.id,
        'Business Name': shipper.businessName,
        'Contact Person': shipper.contactPerson,
        Email: shipper.email,
        Phone: shipper.phone,
        Status: shipper.status,
        'Account Type': shipper.accountType,
        'Business Type': shipper.businessType,
        'Total Shipments': shipper.totalShipments,
        'Total Revenue': `₦${shipper.totalSpending.toLocaleString()}`,
        'Outstanding Balance': `₦${shipper.outstandingBalance.toLocaleString()}`,
        'Joined Date': shipper.joinedDate,
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', `shippers-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotificationMessage('Shipper data exported successfully', 'success');
    }, 1500);
  };

  const handleViewShipper = (shipper) => {
    setSelectedShipper(shipper);
    setIsViewModalOpen(true);
  };

  const handleEditShipper = (shipper) => {
    setSelectedShipper(shipper);
    setEditForm({ ...shipper });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setShippers(prev => prev.map(shipper => 
      shipper.id === selectedShipper.id ? { ...shipper, ...editForm } : shipper
    ));
    setIsEditModalOpen(false);
    setSelectedShipper(null);
    setEditForm({});
    showNotificationMessage('Shipper updated successfully', 'success');
  };

  const handleCreateShipper = () => {
    const newShipper = {
      id: `SHP-${Date.now().toString().slice(-6)}`,
      ...createForm,
      registrationNumber: `RC${Math.random().toString().slice(2, 10)}`,
      taxId: `TIN${Math.random().toString().slice(2, 11)}`,
      outstandingBalance: 0,
      totalShipments: 0,
      pendingShipments: 0,
      deliveredShipments: 0,
      cancelledShipments: 0,
      totalSpending: 0,
      avgShipmentValue: 0,
      lastShipmentDate: 'N/A',
      nextPaymentDate: createForm.paymentTerms === 'prepaid' ? 'N/A' : 
        new Date(Date.now() + (parseInt(createForm.paymentTerms.split('_')[1] || 30) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      accountManager: 'Grace Okafor',
      rating: null,
      documents: {
        registration: { uploaded: false, verified: false },
        taxCertificate: { uploaded: false, verified: false },
        bankStatement: { uploaded: false, verified: false }
      },
      notes: '',
      preferredDelivery: ['standard'],
      discountRate: 0,
      loyaltyPoints: 0
    };
    
    setShippers(prev => [...prev, newShipper]);
    setIsCreateModalOpen(false);
    setCreateForm({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      businessType: 'retail',
      accountType: 'standard',
      status: 'pending',
      address: { street: '', city: '', country: 'Nigeria' },
      paymentTerms: 'net_30',
      creditLimit: 0,
    });
    showNotificationMessage('Shipper created successfully', 'success');
  };

  const handleDeleteShipper = () => {
    if (!selectedShipper) return;
    
    setShippers(prev => prev.filter(shipper => shipper.id !== selectedShipper.id));
    setIsDeleteModalOpen(false);
    setSelectedShipper(null);
    showNotificationMessage('Shipper deleted successfully', 'success');
  };

  const handleStatusChange = (shipper, action) => {
    setSelectedShipper(shipper);
    setStatusAction(action);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedShipper || !statusAction) return;
    
    setShippers(prev => prev.map(shipper => 
      shipper.id === selectedShipper.id 
        ? { ...shipper, status: statusAction } 
        : shipper
    ));
    
    setIsStatusModalOpen(false);
    setSelectedShipper(null);
    setStatusAction('');
    showNotificationMessage(`Shipper status changed to ${statusAction}`, 'success');
  };

  const handleRecordPayment = (shipper) => {
    setSelectedShipper(shipper);
    setPaymentAmount(shipper.outstandingBalance.toString());
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedShipper || !paymentAmount) return;
    
    const payment = parseFloat(paymentAmount);
    if (isNaN(payment) || payment <= 0) {
      showNotificationMessage('Please enter a valid payment amount', 'error');
      return;
    }

    setShippers(prev => prev.map(shipper => 
      shipper.id === selectedShipper.id 
        ? { 
            ...shipper, 
            outstandingBalance: Math.max(0, shipper.outstandingBalance - payment),
            loyaltyPoints: shipper.loyaltyPoints + Math.floor(payment / 1000)
          } 
        : shipper
    ));
    
    setIsPaymentModalOpen(false);
    setSelectedShipper(null);
    setPaymentAmount('');
    setPaymentMethod('bank_transfer');
    showNotificationMessage(`Payment of ₦${payment.toLocaleString()} recorded successfully`, 'success');
  };

  const handleGenerateInvoice = (shipper) => {
    setSelectedShipper(shipper);
    setIsInvoiceModalOpen(true);
  };

  const handleViewDocuments = (shipper) => {
    setSelectedShipper(shipper);
    setIsDocumentsModalOpen(true);
  };

  const handleSendReminder = (shipper, documentType) => {
    showNotificationMessage(`${documentType} reminder sent to ${shipper.contactPerson}`, 'info');
  };

  // Stats cards - All rounded
  const StatCard = ({ label, value, icon: Icon, color, change, suffix = '', valueColor = 'text-gray-900' }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}{suffix}</p>
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

  // Status Distribution Cards - All rounded
  const StatusCard = ({ status, count, color, icon: Icon, bgColor }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{status}</p>
          <p className={`text-lg font-bold mt-1 ${color}`}>{count}</p>
        </div>
        <div className={`p-2 rounded-full ${bgColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  // Shipper Detail Modal
  const ShipperDetailModal = () => {
    if (!selectedShipper) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Shipper Details</h3>
              <p className="text-sm text-gray-500">{selectedShipper.id}</p>
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
                    <BuildingStorefrontIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <div className="mt-1">{getStatusBadge(selectedShipper.status)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <UserIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Type</p>
                    <div className="mt-1">{getAccountTypeBadge(selectedShipper.accountType)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <StarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                    <div className="mt-1">{getRatingStars(selectedShipper.rating)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Business Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Business Information</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <BuildingStorefrontIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedShipper.businessName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getBusinessTypeBadge(selectedShipper.businessType)}
                            <span className="text-sm text-gray-600">{selectedShipper.registrationNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Tax ID</p>
                          <p className="text-sm font-medium">{selectedShipper.taxId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Joined Date</p>
                          <p className="text-sm font-medium">{formatDate(selectedShipper.joinedDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <UserIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedShipper.contactPerson}</p>
                          <p className="text-sm text-gray-600">Contact Person</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedShipper.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedShipper.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <MapPinIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Business Address</p>
                          <p className="text-sm text-gray-600">{selectedShipper.address.city}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{selectedShipper.address.street}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedShipper.address.country}</p>
                    </div>
                  </div>
                </div>

                {/* Account Manager */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Management</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <UserGroupIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Account Manager</p>
                        <p className="text-sm text-gray-600">{selectedShipper.accountManager}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Discount Rate</span>
                        <span className="font-medium text-gray-900">{selectedShipper.discountRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Loyalty Points</span>
                        <span className="font-medium text-gray-900">{selectedShipper.loyaltyPoints}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Preferred Delivery</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedShipper.preferredDelivery.map((type, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedShipper.notes && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Notes</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-800">{selectedShipper.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Financial Summary */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Financial Summary</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(selectedShipper.totalSpending)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Outstanding Balance</p>
                      <p className={`text-2xl font-bold mt-1 ${selectedShipper.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(selectedShipper.outstandingBalance)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Credit Limit</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedShipper.creditLimit)}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(100, (selectedShipper.outstandingBalance / selectedShipper.creditLimit) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {((selectedShipper.outstandingBalance / selectedShipper.creditLimit) * 100).toFixed(1)}% utilized
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CreditCardIcon className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-gray-900">Payment Terms</span>
                        </div>
                        {getPaymentTermsBadge(selectedShipper.paymentTerms)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Next Payment Date</span>
                          <span className={`font-medium ${selectedShipper.nextPaymentDate !== 'N/A' && new Date(selectedShipper.nextPaymentDate) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatDate(selectedShipper.nextPaymentDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Avg Shipment Value</span>
                          <span className="font-medium text-gray-900">{formatCurrency(selectedShipper.avgShipmentValue)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipment Statistics */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Shipment Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Total Shipments</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{selectedShipper.totalShipments}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">{selectedShipper.pendingShipments}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{selectedShipper.deliveredShipments}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">Cancelled</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">{selectedShipper.cancelledShipments}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CubeIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Success Rate</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {selectedShipper.totalShipments > 0 
                          ? ((selectedShipper.deliveredShipments / selectedShipper.totalShipments) * 100).toFixed(1)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Last Shipment</span>
                      </div>
                      <span className="font-medium text-gray-900">{formatDate(selectedShipper.lastShipmentDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {[
                      { action: 'Created new shipment', time: '2 hours ago', type: 'shipment' },
                      { action: 'Made payment', time: '1 day ago', type: 'payment' },
                      { action: 'Updated business information', time: '3 days ago', type: 'update' },
                      { action: 'Contacted support', time: '1 week ago', type: 'support' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-full ${
                            activity.type === 'shipment' ? 'bg-blue-100' :
                            activity.type === 'payment' ? 'bg-green-100' :
                            activity.type === 'update' ? 'bg-yellow-100' : 'bg-purple-100'
                          }`}>
                            {activity.type === 'shipment' ? <TruckIcon className="h-3 w-3 text-blue-600" /> :
                             activity.type === 'payment' ? <CreditCardIcon className="h-3 w-3 text-green-600" /> :
                             activity.type === 'update' ? <PencilIcon className="h-3 w-3 text-yellow-600" /> :
                             <ChatBubbleLeftRightIcon className="h-3 w-3 text-purple-600" />}
                          </div>
                          <span className="text-sm text-gray-700">{activity.action}</span>
                        </div>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between rounded-b-2xl">
            <div className="flex gap-3">
              <button
                onClick={() => handleViewDocuments(selectedShipper)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                View Documents
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedShipper.email);
                  showNotificationMessage('Email copied to clipboard', 'info');
                }}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Copy Contact
              </button>
              {selectedShipper.outstandingBalance > 0 && (
                <button
                  onClick={() => handleRecordPayment(selectedShipper)}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
                >
                  Record Payment
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleGenerateInvoice(selectedShipper)}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Generate Invoice
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditShipper(selectedShipper);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Shipper
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Documents Modal
  const DocumentsModal = () => {
    if (!selectedShipper) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Shipper Documents</h3>
              <p className="text-sm text-gray-500">{selectedShipper.businessName}</p>
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
              {/* Business Registration */}
              <div className={`rounded-xl p-4 border ${selectedShipper.documents.registration.verified ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedShipper.documents.registration.verified ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <DocumentTextIcon className={`h-5 w-5 ${selectedShipper.documents.registration.verified ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Business Registration</p>
                      <p className="text-sm text-gray-600">CAC Certificate</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedShipper.documents.registration.verified ? 'bg-green-100 text-green-800' : selectedShipper.documents.registration.uploaded ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedShipper.documents.registration.verified ? 'Verified' : selectedShipper.documents.registration.uploaded ? 'Pending' : 'Missing'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Registration Number</p>
                    <p className="text-sm font-medium">{selectedShipper.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium">
                      {selectedShipper.documents.registration.verified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
                {!selectedShipper.documents.registration.uploaded && (
                  <button
                    onClick={() => handleSendReminder(selectedShipper, 'Registration')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Request Document
                  </button>
                )}
              </div>

              {/* Tax Certificate */}
              <div className={`rounded-xl p-4 border ${selectedShipper.documents.taxCertificate.verified ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedShipper.documents.taxCertificate.verified ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <BanknotesIcon className={`h-5 w-5 ${selectedShipper.documents.taxCertificate.verified ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Tax Certificate</p>
                      <p className="text-sm text-gray-600">Tax Identification Number (TIN)</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedShipper.documents.taxCertificate.verified ? 'bg-green-100 text-green-800' : selectedShipper.documents.taxCertificate.uploaded ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedShipper.documents.taxCertificate.verified ? 'Verified' : selectedShipper.documents.taxCertificate.uploaded ? 'Pending' : 'Missing'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Tax ID</p>
                    <p className="text-sm font-medium">{selectedShipper.taxId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium">
                      {selectedShipper.documents.taxCertificate.verified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
                {!selectedShipper.documents.taxCertificate.uploaded && (
                  <button
                    onClick={() => handleSendReminder(selectedShipper, 'Tax Certificate')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Request Document
                  </button>
                )}
              </div>

              {/* Bank Statement */}
              <div className={`rounded-xl p-4 border ${selectedShipper.documents.bankStatement.verified ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedShipper.documents.bankStatement.verified ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <CreditCardIcon className={`h-5 w-5 ${selectedShipper.documents.bankStatement.verified ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Bank Statement</p>
                      <p className="text-sm text-gray-600">Recent 3-month statement</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedShipper.documents.bankStatement.verified ? 'bg-green-100 text-green-800' : selectedShipper.documents.bankStatement.uploaded ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedShipper.documents.bankStatement.verified ? 'Verified' : selectedShipper.documents.bankStatement.uploaded ? 'Pending' : 'Missing'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Credit Limit</p>
                    <p className="text-sm font-medium">{formatCurrency(selectedShipper.creditLimit)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium">
                      {selectedShipper.documents.bankStatement.verified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
                {!selectedShipper.documents.bankStatement.uploaded && (
                  <button
                    onClick={() => handleSendReminder(selectedShipper, 'Bank Statement')}
                    className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Request Document
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
                setShippers(prev => prev.map(shipper => 
                  shipper.id === selectedShipper.id 
                    ? { 
                        ...shipper, 
                        documents: {
                          registration: { ...shipper.documents.registration, verified: true },
                          taxCertificate: { ...shipper.documents.taxCertificate, verified: true },
                          bankStatement: { ...shipper.documents.bankStatement, verified: true }
                        },
                        status: 'active'
                      } 
                    : shipper
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

  // Record Payment Modal
  const RecordPaymentModal = () => {
    if (!selectedShipper) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Record Payment</h3>
            <p className="text-gray-600 text-center mb-6">
              Record a payment for {selectedShipper.businessName}
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Outstanding Balance</span>
                  <span className="text-lg font-bold text-red-600">{formatCurrency(selectedShipper.outstandingBalance)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (₦)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={selectedShipper.outstandingBalance}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: {formatCurrency(selectedShipper.outstandingBalance)}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number (Optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter reference number"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-center gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPayment}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Record Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Generate Invoice Modal
  const GenerateInvoiceModal = () => {
    if (!selectedShipper) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
              <InvoiceIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Generate Invoice</h3>
            <p className="text-gray-600 text-center mb-6">
              Generate invoice for {selectedShipper.businessName}
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Outstanding Balance</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedShipper.outstandingBalance)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Period</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="outstanding">Outstanding Balance</option>
                  <option value="custom">Custom Amount</option>
                  <option value="monthly">Monthly Statement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Include Details</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Shipment Details</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Tax Breakdown</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Payment History</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-center gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                showNotificationMessage(`Invoice generated for ${selectedShipper.businessName}`, 'success');
                setIsInvoiceModalOpen(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Status Change Modal
  const StatusChangeModal = () => {
    if (!selectedShipper || !statusAction) return null;

    const actionLabels = {
      active: { label: 'Activate Shipper', color: 'green', icon: CheckCircleIcon },
      inactive: { label: 'Deactivate Shipper', color: 'gray', icon: XCircleIcon },
      suspended: { label: 'Suspend Shipper', color: 'red', icon: XCircleIcon },
    };

    const config = actionLabels[statusAction] || { label: 'Change Status', color: 'blue', icon: ClockIcon };
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
              Are you sure you want to change {selectedShipper.businessName}'s status to {statusAction}?
              {statusAction === 'suspended' && ' This will prevent them from creating new shipments.'}
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shipper Management</h1>
            <p className="text-gray-600 mt-2">Manage shipper accounts, billing, and shipments</p>
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
              <PlusIcon className="h-5 w-5" />
              Add New Shipper
            </button>
          </div>
        </div>

        {/* Stats Dashboard - All cards rounded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Shippers" 
            value={stats.total} 
            icon={BuildingStorefrontIcon} 
            color="bg-blue-50 text-blue-600"
            change="+15.2%"
          />
          <StatCard 
            label="Active Shippers" 
            value={stats.active} 
            icon={CheckCircleIcon} 
            color="bg-green-50 text-green-600"
            change="+8.5%"
          />
          <StatCard 
            label="Total Revenue" 
            value={`₦${(stats.totalRevenue / 1000000).toFixed(1)}M`} 
            icon={CurrencyDollarIcon} 
            color="bg-purple-50 text-purple-600"
            change="+18.7%"
            valueColor="text-purple-700"
          />
          <StatCard 
            label="Outstanding Balance" 
            value={`₦${(stats.outstandingBalance / 1000000).toFixed(1)}M`} 
            icon={CreditCardIcon} 
            color="bg-red-50 text-red-600"
            change="+5.3%"
            valueColor="text-red-600"
          />
        </div>

        {/* Status Distribution - All cards rounded */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatusCard 
            status="Premium Accounts" 
            count={stats.premium} 
            color="text-purple-600" 
            icon={StarIcon}
            bgColor="bg-purple-50"
          />
          <StatusCard 
            status="Standard Accounts" 
            count={stats.standard} 
            color="text-blue-600" 
            icon={UserIcon}
            bgColor="bg-blue-50"
          />
          <StatusCard 
            status="Overdue Payments" 
            count={stats.overduePayments} 
            color="text-red-600" 
            icon={ExclamationTriangleIcon}
            bgColor="bg-red-50"
          />
          <StatusCard 
            status="Avg Rating" 
            count={stats.avgRating} 
            color="text-yellow-600" 
            icon={StarIcon}
            bgColor="bg-yellow-50"
          />
        </div>

        {/* Performance & Financials - All cards rounded */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalShipments}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-full">
                <CubeIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Across all shippers</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Spending per Shipment</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₦{stats.avgSpendingPerShipment}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Average shipment value</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.loyaltyPoints.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Total loyalty points earned</p>
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
                  placeholder="Search by business name, contact person, email, or registration number..."
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
                value={accountTypeFilter}
                onChange={(e) => setAccountTypeFilter(e.target.value)}
              >
                <option value="all">All Account Types</option>
                <option value="premium">Premium</option>
                <option value="standard">Standard</option>
                <option value="enterprise">Enterprise</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={businessTypeFilter}
                onChange={(e) => setBusinessTypeFilter(e.target.value)}
              >
                <option value="all">All Business Types</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="technology">Technology</option>
                <option value="food_beverage">Food & Beverage</option>
                <option value="fashion">Fashion</option>
                <option value="pharmaceutical">Pharmaceutical</option>
                <option value="electronics">Electronics</option>
                <option value="agriculture">Agriculture</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="outstanding">Outstanding</option>
                <option value="overdue">Overdue</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="revenue">Highest Revenue</option>
                <option value="shipments">Most Shipments</option>
                <option value="balance">Highest Balance</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Shippers Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-2xl">
                  Shipper
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Account Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Financial Summary
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shipment Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-2xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShippers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center rounded-b-2xl">
                    <div className="flex flex-col items-center justify-center">
                      <BuildingStorefrontIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">No shippers found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredShippers.map((shipper) => (
                  <tr key={shipper.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                          shipper.accountType === 'premium' ? 'bg-purple-100' : 
                          shipper.accountType === 'enterprise' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          <BuildingStorefrontIcon className={`h-5 w-5 ${
                            shipper.accountType === 'premium' ? 'text-purple-600' : 
                            shipper.accountType === 'enterprise' ? 'text-green-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {shipper.businessName}
                          </div>
                          <div className="text-sm text-gray-500">{shipper.id}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(shipper.status)}
                            {getBusinessTypeBadge(shipper.businessType)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{shipper.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{shipper.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{shipper.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>{getAccountTypeBadge(shipper.accountType)}</div>
                        <div>{getPaymentTermsBadge(shipper.paymentTerms)}</div>
                        <div className="text-sm text-gray-600">
                          Joined: {formatDate(shipper.joinedDate)}
                        </div>
                        <div>{getRatingStars(shipper.rating)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">
                          {formatCurrency(shipper.totalSpending)}
                        </div>
                        <div className={`text-sm ${shipper.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          Balance: {formatCurrency(shipper.outstandingBalance)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Limit: {formatCurrency(shipper.creditLimit)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Next Payment: {formatDate(shipper.nextPaymentDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">
                          {shipper.totalShipments} shipments
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600">{shipper.deliveredShipments} ✓</span>
                          <span className="text-yellow-600">{shipper.pendingShipments} ⏱️</span>
                          <span className="text-red-600">{shipper.cancelledShipments} ✗</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Last: {formatDate(shipper.lastShipmentDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Success: {shipper.totalShipments > 0 
                            ? ((shipper.deliveredShipments / shipper.totalShipments) * 100).toFixed(0)
                            : 0}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewShipper(shipper)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditShipper(shipper)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit Shipper"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleViewDocuments(shipper)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                          title="View Documents"
                        >
                          <DocumentTextIcon className="h-5 w-5" />
                        </button>
                        {shipper.outstandingBalance > 0 && (
                          <button
                            onClick={() => handleRecordPayment(shipper)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Record Payment"
                          >
                            <CreditCardIcon className="h-5 w-5" />
                          </button>
                        )}
                        {shipper.status !== 'active' && shipper.status !== 'suspended' && (
                          <button
                            onClick={() => handleStatusChange(shipper, 'active')}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Activate Shipper"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
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
            Showing <span className="font-medium">{filteredShippers.length}</span> of <span className="font-medium">{shippers.length}</span> shippers
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
      {isViewModalOpen && <ShipperDetailModal />}
      {isDocumentsModalOpen && <DocumentsModal />}
      {isPaymentModalOpen && <RecordPaymentModal />}
      {isInvoiceModalOpen && <GenerateInvoiceModal />}
      {isStatusModalOpen && <StatusChangeModal />}
    </div>
  );
};





export default ShipperManagement;
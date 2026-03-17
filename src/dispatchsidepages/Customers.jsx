// Customers.jsx
import React, { useState } from 'react';

// Heroicons imports
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  PaperClipIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const Customers = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('all');

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    customerType: 'business',
    industry: 'Manufacturing',
    taxId: '',
    paymentTerms: 'net30',
    creditLimit: '',
    discountRate: '0'
  });

  // Advanced filters state
  const [filters, setFilters] = useState({
    dateRange: 'all-time',
    industry: 'all',
    location: 'all',
    creditStatus: 'all',
    volume: 'all'
  });

  // Static data for dropdowns
  const states = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Enugu', 'Benin'];
  const industries = [
    'Manufacturing',
    'Logistics',
    'Oil & Gas',
    'Technology',
    'Agriculture',
    'Healthcare',
    'Construction',
    'Retail',
    'Import/Export',
    'FMCG',
    'Pharmaceuticals',
    'Automotive'
  ];
  const paymentTerms = ['prepaid', 'net7', 'net15', 'net30', 'net45', 'net60'];

  // Customer data - Initial state
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      name: 'ABC Manufacturing Ltd',
      contactPerson: 'John Smith',
      email: 'john@abcmanufacturing.com',
      phone: '+234 801 234 5678',
      type: 'business',
      status: 'active',
      industry: 'Manufacturing',
      location: 'Lagos',
      address: '123 Industrial Estate, Ikeja, Lagos',
      registrationDate: '2023-01-15',
      totalShipments: 48,
      totalSpent: 12850000,
      averageOrderValue: 267708,
      lastShipment: '2024-01-10',
      paymentTerms: 'net30',
      creditLimit: 5000000,
      creditUsed: 1200000,
      rating: 4.8,
      documents: ['tax-certificate.pdf', 'business-license.pdf'],
      notes: 'VIP customer - priority shipping required'
    },
    {
      id: 'CUST-002',
      name: 'Global Logistics Ltd',
      contactPerson: 'Mr. Williams',
      email: 'williams@globallogistics.com',
      phone: '+234 802 345 6789',
      type: 'business',
      status: 'active',
      industry: 'Logistics',
      location: 'Abuja',
      address: '456 Central Business District, Abuja',
      registrationDate: '2023-03-22',
      totalShipments: 32,
      totalSpent: 8950000,
      averageOrderValue: 279688,
      lastShipment: '2024-01-12',
      paymentTerms: 'net15',
      creditLimit: 3000000,
      creditUsed: 850000,
      rating: 4.5,
      documents: ['contract.pdf', 'insurance.pdf'],
      notes: 'Regular shipments to multiple states'
    },
    {
      id: 'CUST-003',
      name: 'Oil & Gas Solutions',
      contactPerson: 'Engineer Johnson',
      email: 'johnson@oilgas.com',
      phone: '+234 803 456 7890',
      type: 'business',
      status: 'active',
      industry: 'Oil & Gas',
      location: 'Port Harcourt',
      address: '789 Oil Field Road, Port Harcourt',
      registrationDate: '2023-05-10',
      totalShipments: 25,
      totalSpent: 15200000,
      averageOrderValue: 608000,
      lastShipment: '2024-01-14',
      paymentTerms: 'net45',
      creditLimit: 10000000,
      creditUsed: 3500000,
      rating: 4.9,
      documents: ['safety-cert.pdf', 'equipment-list.pdf'],
      notes: 'High-value cargo, requires special handling'
    },
    {
      id: 'CUST-004',
      name: 'Tech Solutions Ltd',
      contactPerson: 'IT Manager',
      email: 'it@techsolutions.com',
      phone: '+234 804 567 8901',
      type: 'business',
      status: 'active',
      industry: 'Technology',
      location: 'Lagos',
      address: '321 Tech Park, Victoria Island, Lagos',
      registrationDate: '2023-06-18',
      totalShipments: 41,
      totalSpent: 6800000,
      averageOrderValue: 165854,
      lastShipment: '2024-01-15',
      paymentTerms: 'net30',
      creditLimit: 2500000,
      creditUsed: 420000,
      rating: 4.3,
      documents: ['nda.pdf', 'product-list.pdf'],
      notes: 'Express deliveries for IT equipment'
    },
    {
      id: 'CUST-005',
      name: 'Agricultural Supplies Co.',
      contactPerson: 'Farm Manager',
      email: 'manager@agsupplies.com',
      phone: '+234 805 678 9012',
      type: 'business',
      status: 'active',
      industry: 'Agriculture',
      location: 'Kano',
      address: 'Farm Depot, Kano State',
      registrationDate: '2023-02-28',
      totalShipments: 18,
      totalSpent: 4250000,
      averageOrderValue: 236111,
      lastShipment: '2024-01-11',
      paymentTerms: 'net60',
      creditLimit: 1500000,
      creditUsed: 950000,
      rating: 4.1,
      documents: ['farm-license.pdf'],
      notes: 'Seasonal shipments, bulk agricultural products'
    },
    {
      id: 'CUST-006',
      name: 'Medical Supplies Inc.',
      contactPerson: 'Dr. Adebayo',
      email: 'adebayo@medical.com',
      phone: '+234 806 789 0123',
      type: 'business',
      status: 'warning',
      industry: 'Healthcare',
      location: 'Abuja',
      address: 'Medical Center, Wuse, Abuja',
      registrationDate: '2023-07-05',
      totalShipments: 12,
      totalSpent: 3100000,
      averageOrderValue: 258333,
      lastShipment: '2023-12-20',
      paymentTerms: 'net30',
      creditLimit: 1000000,
      creditUsed: 1050000,
      rating: 3.8,
      documents: ['medical-license.pdf'],
      notes: 'Credit limit exceeded, requires follow-up'
    },
    {
      id: 'CUST-007',
      name: 'Real Estate Developers',
      contactPerson: 'Site Supervisor',
      email: 'site@realestate.com',
      phone: '+234 807 890 1234',
      type: 'business',
      status: 'active',
      industry: 'Construction',
      location: 'Lagos',
      address: 'Construction Site, Lekki, Lagos',
      registrationDate: '2023-09-12',
      totalShipments: 22,
      totalSpent: 9750000,
      averageOrderValue: 443182,
      lastShipment: '2024-01-13',
      paymentTerms: 'net30',
      creditLimit: 4000000,
      creditUsed: 1800000,
      rating: 4.4,
      documents: ['construction-permit.pdf'],
      notes: 'Heavy construction materials, frequent shipments'
    },
    {
      id: 'CUST-008',
      name: 'Retail Chain Stores',
      contactPerson: 'Store Manager',
      email: 'manager@retailchain.com',
      phone: '+234 808 901 2345',
      type: 'business',
      status: 'active',
      industry: 'Retail',
      location: 'Ibadan',
      address: 'Shopping Mall, Dugbe, Ibadan',
      registrationDate: '2023-04-30',
      totalShipments: 56,
      totalSpent: 7850000,
      averageOrderValue: 140179,
      lastShipment: '2024-01-09',
      paymentTerms: 'net15',
      creditLimit: 3000000,
      creditUsed: 650000,
      rating: 4.7,
      documents: ['retail-license.pdf'],
      notes: 'Daily deliveries to multiple store locations'
    },
    {
      id: 'CUST-009',
      name: 'Sarah Johnson',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+234 809 012 3456',
      type: 'individual',
      status: 'active',
      industry: 'Personal',
      location: 'Abuja',
      address: '456 Downtown Mall, Abuja',
      registrationDate: '2023-08-22',
      totalShipments: 8,
      totalSpent: 1250000,
      averageOrderValue: 156250,
      lastShipment: '2024-01-08',
      paymentTerms: 'prepaid',
      creditLimit: 0,
      creditUsed: 0,
      rating: 4.6,
      documents: ['id-card.pdf'],
      notes: 'Regular personal shipments'
    },
    {
      id: 'CUST-010',
      name: 'David Brown Enterprises',
      contactPerson: 'David Brown',
      email: 'david@dbent.com',
      phone: '+234 810 123 4567',
      type: 'business',
      status: 'inactive',
      industry: 'Import/Export',
      location: 'Lagos',
      address: 'Apapa Port, Lagos',
      registrationDate: '2023-11-05',
      totalShipments: 5,
      totalSpent: 2100000,
      averageOrderValue: 420000,
      lastShipment: '2023-10-15',
      paymentTerms: 'net30',
      creditLimit: 2000000,
      creditUsed: 0,
      rating: 3.5,
      documents: ['import-license.pdf'],
      notes: 'No activity for 3 months'
    }
  ]);

  // Constants
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'business', label: 'Business' },
    { value: 'individual', label: 'Individual' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'warning', label: 'Warning', color: 'yellow' },
    { value: 'inactive', label: 'Inactive', color: 'red' }
  ];

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'individual': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`h-3 w-3 ${i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const getCreditUtilizationColor = (used, limit) => {
    if (limit === 0) return 'bg-gray-200';
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const businessCustomers = customers.filter(c => c.type === 'business').length;
    const individualCustomers = customers.filter(c => c.type === 'individual').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const averageRating = customers.length > 0 
      ? customers.reduce((sum, c) => sum + c.rating, 0) / customers.length 
      : 0;
    const warningCustomers = customers.filter(c => c.status === 'warning').length;
    const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
    const vipCustomers = customers.filter(c => c.rating >= 4.5).length;

    return {
      totalCustomers,
      activeCustomers,
      businessCustomers,
      individualCustomers,
      totalRevenue,
      averageRating,
      warningCustomers,
      inactiveCustomers,
      vipCustomers
    };
  };

  const stats = calculateStats();

  // Customer selection functions
  const toggleSelection = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllOnPage = () => {
    const currentPageIds = filteredCustomers
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map(c => c.id);
    
    if (selectedCustomers.length === currentPageIds.length) {
      setSelectedCustomers(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedCustomers(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Customer operations
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      alert('Please fill in required fields: Name, Email, and Phone');
      return;
    }

    setLoading(true);
    
    const customerId = `CUST-${String(customers.length + 1001).padStart(3, '0')}`;
    const customer = {
      id: customerId,
      name: newCustomer.name,
      contactPerson: newCustomer.name.split(' ')[0] + ' ' + newCustomer.name.split(' ')[1] || newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      type: newCustomer.customerType,
      status: 'active',
      industry: newCustomer.industry,
      location: newCustomer.city,
      address: `${newCustomer.address}, ${newCustomer.city}, ${newCustomer.state}`,
      registrationDate: new Date().toISOString().split('T')[0],
      totalShipments: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      lastShipment: null,
      paymentTerms: newCustomer.paymentTerms,
      creditLimit: parseFloat(newCustomer.creditLimit) || 0,
      creditUsed: 0,
      rating: 0,
      documents: [],
      notes: ''
    };
    
    setTimeout(() => {
      setCustomers(prev => [customer, ...prev]);
      // Reset form
      setNewCustomer({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria',
        customerType: 'business',
        industry: 'Manufacturing',
        taxId: '',
        paymentTerms: 'net30',
        creditLimit: '',
        discountRate: '0'
      });
      setShowAddCustomer(false);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm(`Are you sure you want to delete customer ${customerId}? This action cannot be undone.`)) {
      setLoading(true);
      setTimeout(() => {
        setCustomers(prev => prev.filter(c => c.id !== customerId));
        setSelectedCustomers(prev => prev.filter(id => id !== customerId));
        setLoading(false);
      }, 1000);
    }
  };

  const handleUpdateStatus = (customerId, newStatus) => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(prev => prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: newStatus }
          : customer
      ));
      setLoading(false);
    }, 800);
  };

  // Filtering and sorting
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!customer.name.toLowerCase().includes(searchLower) &&
          !customer.id.toLowerCase().includes(searchLower) &&
          !customer.email.toLowerCase().includes(searchLower) &&
          !customer.phone.includes(searchTerm)) {
        return false;
      }
    }

    // Type filter
    if (filterType !== 'all' && customer.type !== filterType) {
      return false;
    }

    // Status filter
    if (filterStatus !== 'all' && customer.status !== filterStatus) {
      return false;
    }

    // Active tab filter
    if (activeTab === 'active' && customer.status !== 'active') return false;
    if (activeTab === 'warning' && customer.status !== 'warning') return false;
    if (activeTab === 'inactive' && customer.status !== 'inactive') return false;
    if (activeTab === 'vip' && customer.rating < 4.5) return false;

    // Advanced filters
    if (filters.industry !== 'all' && customer.industry !== filters.industry) return false;
    if (filters.location !== 'all' && customer.location !== filters.location) return false;

    return true;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    switch(sortBy) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'date':
        return multiplier * (new Date(b.registrationDate) - new Date(a.registrationDate));
      case 'revenue':
        return multiplier * (b.totalSpent - a.totalSpent);
      case 'shipments':
        return multiplier * (b.totalShipments - a.totalShipments);
      case 'rating':
        return multiplier * (b.rating - a.rating);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = sortedCustomers.slice(startIndex, endIndex);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
    setActiveTab('all');
    setFilters({
      dateRange: 'all-time',
      industry: 'all',
      location: 'all',
      creditStatus: 'all',
      volume: 'all'
    });
  };

  // Import/Export functions
  const handleImport = () => {
    alert('Import functionality would open file picker here');
  };

  const handleExport = () => {
    alert('Exporting customer data to CSV...');
  };

  // Component: Add Customer Modal
  const AddCustomerModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
                <p className="text-sm text-gray-600 mt-1">Enter customer details</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <UserCircleIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newCustomer.company}
                      onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2 text-green-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="customer@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+234 801 234 5678"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-red-500" />
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <select
                        value={newCustomer.city}
                        onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        value={newCustomer.state}
                        onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={newCustomer.country}
                        onChange={(e) => setNewCustomer({...newCustomer, country: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-50"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <BuildingOfficeIcon className="w-5 h-5 mr-2 text-purple-500" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Type
                    </label>
                    <select
                      value={newCustomer.customerType}
                      onChange={(e) => setNewCustomer({...newCustomer, customerType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="business">Business</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <select
                      value={newCustomer.industry}
                      onChange={(e) => setNewCustomer({...newCustomer, industry: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Terms
                    </label>
                    <select
                      value={newCustomer.paymentTerms}
                      onChange={(e) => setNewCustomer({...newCustomer, paymentTerms: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {paymentTerms.map(term => (
                        <option key={term} value={term}>{term.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credit Limit (₦)
                    </label>
                    <input
                      type="number"
                      value={newCustomer.creditLimit}
                      onChange={(e) => setNewCustomer({...newCustomer, creditLimit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="5000000"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="w-4 h-4 mr-2" />
                    Create Customer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Customer Details Modal
  const CustomerDetailsModal = ({ customer, isOpen, onClose }) => {
    if (!isOpen || !customer) return null;

    const creditUsedPercentage = customer.creditLimit > 0 
      ? (customer.creditUsed / customer.creditLimit) * 100 
      : 0;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white z-10 border-b p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(customer.status)}`}>
                    {customer.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(customer.type)}`}>
                    {customer.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{customer.id}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <UserCircleIcon className="w-5 h-5 mr-2 text-blue-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <UserCircleIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.contactPerson}</p>
                        <p className="text-sm text-gray-500">Contact Person</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.email}</p>
                        <p className="text-sm text-gray-500">Email</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
                        <p className="text-sm text-gray-500">Phone</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.location}</p>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-sm text-gray-600 mt-1">{customer.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2 text-purple-500" />
                    Business Details
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Industry</p>
                        <p className="text-sm font-medium">{customer.industry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Customer Since</p>
                        <p className="text-sm font-medium">{formatDate(customer.registrationDate)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer Rating</p>
                      <div className="flex items-center mt-1">
                        {getRatingStars(customer.rating)}
                        <span className="ml-2 text-sm font-medium">{customer.rating.toFixed(1)}/5</span>
                      </div>
                    </div>
                    {customer.notes && (
                      <div>
                        <p className="text-xs text-gray-500">Notes</p>
                        <p className="text-sm text-gray-900 mt-1">{customer.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Financial Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
                    Financial Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Total Spent</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Avg Order Value</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(customer.averageOrderValue)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Payment Terms</p>
                      <p className="text-sm font-medium">{customer.paymentTerms.toUpperCase()}</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500">Credit Limit</p>
                        <p className="text-xs font-medium">
                          {formatCurrency(customer.creditUsed)} of {formatCurrency(customer.creditLimit)}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getCreditUtilizationColor(customer.creditUsed, customer.creditLimit)}`}
                          style={{ width: `${Math.min(creditUsedPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {creditUsedPercentage.toFixed(1)}% utilized
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Statistics */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-red-500" />
                    Shipping Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{customer.totalShipments}</p>
                        <p className="text-xs text-gray-500">Total Shipments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {customer.totalShipments > 0 ? Math.round(customer.totalShipments / ((Date.now() - new Date(customer.registrationDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) * 10) / 10 : 0}
                        </p>
                        <p className="text-xs text-gray-500">Monthly Avg</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Shipment</p>
                      <p className="text-sm font-medium">
                        {customer.lastShipment ? formatDate(customer.lastShipment) : 'No shipments yet'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                {customer.documents && customer.documents.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500" />
                      Documents
                    </h3>
                    <div className="space-y-2">
                      {customer.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex items-center">
                            <DocumentArrowDownIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 truncate">{doc}</span>
                          </div>
                          <button className="text-sm text-red-600 hover:text-red-700 transition-colors px-3 py-1 border border-gray-300 hover:bg-gray-50 rounded-full">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Create Shipment
              </button>
              <button className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 flex items-center justify-center">
                <PencilIcon className="w-5 h-5 mr-2" />
                Edit Customer
              </button>
              <button className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                View Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Filters Panel
  const FiltersPanel = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 mb-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Volume</label>
          <select
            value={filters.volume}
            onChange={(e) => setFilters({ ...filters, volume: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Volumes</option>
            <option value="high">High (50+ shipments)</option>
            <option value="medium">Medium (20-49 shipments)</option>
            <option value="low">Low (1-19 shipments)</option>
            <option value="none">No Shipments</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={handleClearFilters}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors duration-200"
        >
          Clear All Filters
        </button>
        <button
          onClick={() => setShowFilters(false)}
          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="mb-3 md:mb-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage customer accounts and relationships</p>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 md:gap-3">
            <button 
              onClick={() => setShowAddCustomer(true)}
              className="px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <PlusIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">New Customer</span>
              <span className="xs:hidden">New</span>
            </button>
            <button 
              onClick={handleImport}
              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs md:text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <ArrowUpTrayIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">Import</span>
            </button>
            <button 
              onClick={handleExport}
              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs md:text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Customers</p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.totalCustomers}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-full">
              <UserCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Active</p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.activeCustomers}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-green-100 rounded-full">
              <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Business</p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.businessCustomers}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-full">
              <BuildingOfficeIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Revenue</p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-orange-100 rounded-full">
              <CurrencyDollarIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Avg Rating</p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.averageRating.toFixed(1)}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-yellow-100 rounded-full">
              <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Tabs */}
      <div className="flex space-x-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({stats.totalCustomers})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'active' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active ({stats.activeCustomers})
        </button>
        <button
          onClick={() => setActiveTab('warning')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'warning' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Warning ({stats.warningCustomers})
        </button>
        <button
          onClick={() => setActiveTab('inactive')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Inactive ({stats.inactiveCustomers})
        </button>
        <button
          onClick={() => setActiveTab('vip')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'vip' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          VIP ({stats.vipCustomers})
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customers..."
                className="w-full pl-8 pr-3 py-2 sm:pl-9 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-24 sm:w-auto"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-24 sm:w-auto"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 sm:p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                <ChevronUpDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              </button>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 sm:p-2 border rounded-full transition-colors duration-200 ${
                showFilters ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-500'
              }`}
              title="Advanced Filters"
            >
              <FunnelIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            
            {selectedCustomers.length > 0 && (
              <button
                onClick={() => alert(`${selectedCustomers.length} customers selected`)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
              >
                <span className="hidden sm:inline">Selected ({selectedCustomers.length})</span>
                <span className="sm:hidden">({selectedCustomers.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <FiltersPanel />

      {/* Customers Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    checked={currentCustomers.every(c => selectedCustomers.includes(c.id)) && currentCustomers.length > 0}
                    onChange={selectAllOnPage}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                  />
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                  Customer
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell min-w-[150px]">
                  Contact
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Business
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell min-w-[120px]">
                  Shipping
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell min-w-[120px]">
                  Financial
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className={`hover:bg-gray-50 transition-colors duration-150 ${selectedCustomers.includes(customer.id) ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleSelection(customer.id)}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                      />
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              {customer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-[120px] md:max-w-none">
                            {customer.name}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500">{customer.id}</div>
                          <div className="flex items-center mt-0.5 sm:mt-1 space-x-1">
                            <span className={`px-1 py-0.5 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                            <span className={`px-1 py-0.5 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full ${getTypeColor(customer.type)}`}>
                              {customer.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden md:table-cell">
                      <div className="text-xs sm:text-sm text-gray-900 truncate">{customer.contactPerson}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 truncate">{customer.email}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm text-gray-900">{customer.industry}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{formatDate(customer.registrationDate)}</div>
                      <div className="flex items-center mt-0.5 sm:mt-1">
                        {getRatingStars(customer.rating)}
                        <span className="ml-1 text-[10px] sm:text-xs font-medium">{customer.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden lg:table-cell">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{customer.totalShipments} shipments</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{formatCurrency(customer.totalSpent)}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Last: {formatDate(customer.lastShipment)}</div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden lg:table-cell">
                      <div className="text-xs sm:text-sm text-gray-900">{customer.paymentTerms.toUpperCase()}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Limit: {formatCurrency(customer.creditLimit)}</div>
                      {customer.creditLimit > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 mt-0.5 sm:mt-1">
                          <div 
                            className={`h-1 sm:h-1.5 rounded-full ${getCreditUtilizationColor(customer.creditUsed, customer.creditLimit)}`}
                            style={{ 
                              width: `${Math.min((customer.creditUsed / customer.creditLimit) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setShowCustomerDetails(true);
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                          title="View Details"
                        >
                          <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(customer.id, customer.status === 'active' ? 'inactive' : 'active')}
                          className={`p-1 rounded-full transition-colors duration-150 ${
                            customer.status === 'active' 
                              ? 'text-red-500 hover:text-red-700 hover:bg-red-100' 
                              : 'text-green-500 hover:text-green-700 hover:bg-green-100'
                          }`}
                          title={customer.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {customer.status === 'active' ? (
                            <XCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-150"
                          title="Delete"
                        >
                          <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
                    <UserCircleIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-500">No customers found</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                    <button 
                      onClick={() => setShowAddCustomer(true)}
                      className="mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
                    >
                      Add New Customer
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {currentCustomers.length > 0 && (
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="p-1 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-xs sm:text-sm text-gray-500">entries</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <span className="px-2 py-1 text-xs sm:text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 animate-pulse">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-red-600 border-t-transparent mx-auto mb-2 sm:mb-3"></div>
            <p className="text-xs sm:text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddCustomerModal
        isOpen={showAddCustomer}
        onClose={() => setShowAddCustomer(false)}
      />

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={showCustomerDetails}
        onClose={() => {
          setShowCustomerDetails(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
};

export default Customers;
// Shipment.jsx
import React, { useState } from 'react';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  TruckIcon,
  MapPinIcon,
  UserCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PrinterIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

const Shipments = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showShipmentDetails, setShowShipmentDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddShipmentModal, setShowAddShipmentModal] = useState(false);
  const [newShipment, setNewShipment] = useState({
    type: 'FTL',
    origin: 'Lagos',
    destination: 'Abuja',
    customer: '',
    priority: 'medium',
    cargoType: '',
    weight: '',
    value: '',
    revenue: '',
    pickupAddress: '',
    pickupContact: '',
    deliveryAddress: '',
    deliveryContact: ''
  });

  // Advanced filters
  const [filters, setFilters] = useState({
    dateRange: 'today',
    customer: 'all',
    origin: 'all',
    destination: 'all',
    priority: 'all'
  });

  // Shipment data
  const [shipments, setShipments] = useState([
    {
      id: 'SH-7890',
      type: 'FTL',
      status: 'pending',
      origin: 'Lagos',
      destination: 'Abuja',
      customer: 'ABC Manufacturing',
      priority: 'high',
      createdAt: '2024-01-15 09:30',
      cargo: { type: 'Electronics', weight: '150 kg', value: '₦2,500,000' },
      pickup: { address: '123 Warehouse St, Lagos', contact: 'John Smith' },
      delivery: { address: '456 Downtown Mall, Abuja', contact: 'Sarah Johnson' },
      revenue: '₦85,000',
      driver: null,
      vehicle: null,
      lastUpdated: '5 mins ago'
    },
    {
      id: 'SH-7889',
      type: 'FTL',
      status: 'assigned',
      origin: 'Lagos',
      destination: 'Ibadan',
      customer: 'Global Logistics Ltd',
      priority: 'medium',
      createdAt: '2024-01-15 08:15',
      cargo: { type: 'Construction Materials', weight: '3.2 tons', value: '₦1,800,000' },
      pickup: { address: 'Construction Depot, Lagos', contact: 'Mr. Williams' },
      delivery: { address: 'Building Site, Ibadan', contact: 'Site Manager' },
      revenue: '₦65,000',
      driver: 'Musa Ibrahim',
      vehicle: 'Toyota Hilux (LSD 123 XY)',
      lastUpdated: '15 mins ago'
    },
    {
      id: 'SH-7888',
      type: 'LTL',
      status: 'in-transit',
      origin: 'Port Harcourt',
      destination: 'Enugu',
      customer: 'Oil & Gas Solutions',
      priority: 'high',
      createdAt: '2024-01-14 14:30',
      cargo: { type: 'Oil Equipment', weight: '850 kg', value: '₦5,200,000' },
      pickup: { address: 'Oil Rig Base, Port Harcourt', contact: 'Engineer Johnson' },
      delivery: { address: 'Industrial Zone, Enugu', contact: 'Plant Manager' },
      revenue: '₦120,000',
      driver: 'Amina Yusuf',
      vehicle: 'Nissan Navara',
      lastUpdated: '30 mins ago'
    },
    {
      id: 'SH-7887',
      type: 'Express',
      status: 'delivered',
      origin: 'Ikeja',
      destination: 'Victoria Island',
      customer: 'Tech Solutions Ltd',
      priority: 'high',
      createdAt: '2024-01-15 07:00',
      cargo: { type: 'IT Equipment', weight: '45 kg', value: '₦3,500,000' },
      pickup: { address: 'Tech Park, Ikeja', contact: 'IT Manager' },
      delivery: { address: 'Data Center, Victoria Island', contact: 'Data Center Admin' },
      revenue: '₦45,000',
      driver: 'Emeka Nwachukwu',
      vehicle: 'Toyota Hiace',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'SH-7886',
      type: 'LTL',
      status: 'exception',
      origin: 'Kano',
      destination: 'Kaduna',
      customer: 'Agricultural Supplies Co.',
      priority: 'medium',
      createdAt: '2024-01-14 11:00',
      cargo: { type: 'Agricultural Products', weight: '2.5 tons', value: '₦950,000' },
      pickup: { address: 'Farm Depot, Kano', contact: 'Farm Manager' },
      delivery: { address: 'Agricultural Market, Kaduna', contact: 'Market Supervisor' },
      revenue: '₦55,000',
      driver: 'Grace Okafor',
      vehicle: 'Mitsubishi Canter',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'SH-7885',
      type: 'Same Day',
      status: 'cancelled',
      origin: 'Abuja',
      destination: 'Kubwa',
      customer: 'Medical Supplies Inc.',
      priority: 'high',
      createdAt: '2024-01-15 08:45',
      cargo: { type: 'Pharmaceuticals', weight: '35 kg', value: '₦1,200,000' },
      pickup: { address: 'Medical Center, Abuja', contact: 'Dr. Adebayo' },
      delivery: { address: 'Hospital, Kubwa', contact: 'Hospital Admin' },
      revenue: '₦0',
      driver: null,
      vehicle: null,
      lastUpdated: '45 mins ago'
    },
    {
      id: 'SH-7884',
      type: 'FTL',
      status: 'at-pickup',
      origin: 'Lekki',
      destination: 'Ajah',
      customer: 'Real Estate Developers',
      priority: 'low',
      createdAt: '2024-01-15 10:00',
      cargo: { type: 'Construction Materials', weight: '4.5 tons', value: '₦3,800,000' },
      pickup: { address: 'Warehouse, Lekki', contact: 'Warehouse Manager' },
      delivery: { address: 'Construction Site, Ajah', contact: 'Site Supervisor' },
      revenue: '₦95,000',
      driver: 'Samuel Eze',
      vehicle: 'Mercedes Sprinter',
      lastUpdated: '20 mins ago'
    },
    {
      id: 'SH-7883',
      type: 'LTL',
      status: 'at-delivery',
      origin: 'Surulere',
      destination: 'Yaba',
      customer: 'Retail Chain Stores',
      priority: 'medium',
      createdAt: '2024-01-15 09:15',
      cargo: { type: 'Retail Goods', weight: '1.8 tons', value: '₦2,100,000' },
      pickup: { address: 'Distribution Center, Surulere', contact: 'Store Manager' },
      delivery: { address: 'Shopping Mall, Yaba', contact: 'Mall Manager' },
      revenue: '₦75,000',
      driver: 'John Okonkwo',
      vehicle: 'Volvo Truck',
      lastUpdated: '10 mins ago'
    }
  ]);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'red' },
    { value: 'assigned', label: 'Assigned', color: 'yellow' },
    { value: 'at-pickup', label: 'At Pickup', color: 'orange' },
    { value: 'in-transit', label: 'In Transit', color: 'purple' },
    { value: 'at-delivery', label: 'At Delivery', color: 'blue' },
    { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'exception', label: 'Exception', color: 'pink' },
    { value: 'cancelled', label: 'Cancelled', color: 'gray' }
  ];

  // Type options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'FTL', label: 'FTL' },
    { value: 'LTL', label: 'LTL' },
    { value: 'Express', label: 'Express' },
    { value: 'Same Day', label: 'Same Day' }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'at-pickup': return 'bg-orange-100 text-orange-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      case 'at-delivery': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'exception': return 'bg-pink-100 text-pink-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Toggle selection
  const toggleSelection = (shipmentId) => {
    setSelectedShipments(prev => {
      if (prev.includes(shipmentId)) {
        return prev.filter(id => id !== shipmentId);
      } else {
        return [...prev, shipmentId];
      }
    });
  };

  // Select all on current page
  const selectAllOnPage = () => {
    const currentPageIds = filteredShipments
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map(s => s.id);
    
    if (selectedShipments.length === currentPageIds.length) {
      setSelectedShipments(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedShipments(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Handle add new shipment
  const handleAddNewShipment = () => {
    if (!newShipment.customer || !newShipment.origin || !newShipment.destination) {
      alert('Please fill in Customer, Origin, and Destination fields');
      return;
    }

    setLoading(true);
    
    const shipmentId = `SH-${Math.floor(Math.random() * 9000 + 1000)}`;
    const shipment = {
      id: shipmentId,
      type: newShipment.type,
      status: 'pending',
      origin: newShipment.origin,
      destination: newShipment.destination,
      customer: newShipment.customer,
      priority: newShipment.priority,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      cargo: { 
        type: newShipment.cargoType || 'General Goods', 
        weight: newShipment.weight || '1 ton', 
        value: newShipment.value || '₦500,000' 
      },
      pickup: { 
        address: newShipment.pickupAddress || `${newShipment.origin} Warehouse`, 
        contact: newShipment.pickupContact || 'Contact Person' 
      },
      delivery: { 
        address: newShipment.deliveryAddress || `${newShipment.destination} Warehouse`, 
        contact: newShipment.deliveryContact || 'Contact Person' 
      },
      revenue: newShipment.revenue || '₦50,000',
      driver: null,
      vehicle: null,
      lastUpdated: 'Just now'
    };
    
    setTimeout(() => {
      setShipments(prev => [shipment, ...prev]);
      setNewShipment({
        type: 'FTL',
        origin: 'Lagos',
        destination: 'Abuja',
        customer: '',
        priority: 'medium',
        cargoType: '',
        weight: '',
        value: '',
        revenue: '',
        pickupAddress: '',
        pickupContact: '',
        deliveryAddress: '',
        deliveryContact: ''
      });
      setShowAddShipmentModal(false);
      setLoading(false);
    }, 1000);
  };

  // Handle duplicate shipment
  const handleDuplicateShipment = (shipment) => {
    setLoading(true);
    
    const newShipment = {
      ...shipment,
      id: `SH-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: 'pending',
      driver: null,
      vehicle: null,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastUpdated: 'Just now'
    };
    
    setTimeout(() => {
      setShipments(prev => [newShipment, ...prev]);
      setLoading(false);
    }, 1000);
  };

  // Handle delete shipment
  const handleDeleteShipment = (shipmentId) => {
    if (window.confirm(`Are you sure you want to delete shipment ${shipmentId}?`)) {
      setLoading(true);
      
      setTimeout(() => {
        setShipments(prev => prev.filter(s => s.id !== shipmentId));
        setSelectedShipments(prev => prev.filter(id => id !== shipmentId));
        setLoading(false);
      }, 1000);
    }
  };

  // Handle update status
  const handleUpdateStatus = (shipmentId, newStatus) => {
    setLoading(true);
    
    setTimeout(() => {
      setShipments(prev => prev.map(shipment => 
        shipment.id === shipmentId 
          ? { ...shipment, status: newStatus, lastUpdated: 'Just now' }
          : shipment
      ));
      setLoading(false);
    }, 800);
  };

  // Filter shipments
  const filteredShipments = shipments.filter(shipment => {
    // Search filter
    if (searchTerm && !shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filterStatus !== 'all' && shipment.status !== filterStatus) {
      return false;
    }

    // Type filter
    if (filterType !== 'all' && shipment.type !== filterType) {
      return false;
    }

    return true;
  });

  // Sort shipments
  const sortedShipments = [...filteredShipments].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    switch(sortBy) {
      case 'date':
        return multiplier * (new Date(b.createdAt) - new Date(a.createdAt));
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return multiplier * (priorityOrder[b.priority] - priorityOrder[a.priority]);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedShipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShipments = sortedShipments.slice(startIndex, endIndex);

  // Stats calculations
  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => s.status === 'in-transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    revenue: shipments.reduce((sum, s) => {
      const revenue = parseFloat(s.revenue.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(revenue) ? 0 : revenue);
    }, 0)
  };

  // Shipment Details Modal
  const ShipmentDetailsModal = ({ shipment, isOpen, onClose }) => {
    if (!isOpen || !shipment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shipment #{shipment.id}</h2>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                  {shipment.status.toUpperCase()}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(shipment.priority)}`}>
                  {shipment.priority.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Shipment ID</p>
                        <p className="text-sm font-medium">{shipment.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium">{shipment.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-sm font-medium">{shipment.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm font-medium">{formatDate(shipment.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-sm font-medium">{shipment.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-green-500" />
                    Route Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Origin</p>
                      <p className="text-sm font-medium">{shipment.origin}</p>
                      <p className="text-sm text-gray-600 mt-1">{shipment.pickup.address}</p>
                      <p className="text-xs text-gray-500 mt-1">Contact: {shipment.pickup.contact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Destination</p>
                      <p className="text-sm font-medium">{shipment.destination}</p>
                      <p className="text-sm text-gray-600 mt-1">{shipment.delivery.address}</p>
                      <p className="text-xs text-gray-500 mt-1">Contact: {shipment.delivery.contact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cargo & Status */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-blue-500" />
                    Cargo Details
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium">{shipment.cargo.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="text-sm font-medium">{shipment.cargo.weight}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Value</p>
                      <p className="text-sm font-medium">{shipment.cargo.value}</p>
                    </div>
                  </div>
                </div>

                {/* Driver Information */}
                {shipment.driver ? (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Driver Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {shipment.driver.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{shipment.driver}</p>
                          <p className="text-xs text-gray-500">{shipment.vehicle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Driver Assignment</h3>
                    <p className="text-sm text-gray-600">No driver assigned yet</p>
                    <button className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all">
                      Assign Driver
                    </button>
                  </div>
                )}

                {/* Financial Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Financial Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-sm font-semibold text-gray-900">{shipment.revenue}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Cargo Value</p>
                      <p className="text-sm font-semibold text-gray-900">{shipment.cargo.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex space-x-4">
              <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all flex items-center justify-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Track Shipment
              </button>
              <button className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                View Documents
              </button>
              <button className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center">
                <PrinterIcon className="w-5 h-5 mr-2" />
                Print Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add New Shipment Modal
  const AddShipmentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Shipment</h2>
              <p className="text-sm text-gray-600 mt-1">Fill in the shipment details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={newShipment.customer}
                  onChange={(e) => setNewShipment({...newShipment, customer: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin *
                  </label>
                  <select
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Kano">Kano</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Kaduna">Kaduna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination *
                  </label>
                  <select
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Abuja">Abuja</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Kano">Kano</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Kaduna">Kaduna</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipment Type
                  </label>
                  <select
                    value={newShipment.type}
                    onChange={(e) => setNewShipment({...newShipment, type: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="FTL">FTL</option>
                    <option value="LTL">LTL</option>
                    <option value="Express">Express</option>
                    <option value="Same Day">Same Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newShipment.priority}
                    onChange={(e) => setNewShipment({...newShipment, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo Type
                </label>
                <input
                  type="text"
                  value={newShipment.cargoType}
                  onChange={(e) => setNewShipment({...newShipment, cargoType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., Electronics, Construction Materials"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={newShipment.weight}
                    onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g., 1.5 tons"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Revenue
                  </label>
                  <input
                    type="text"
                    value={newShipment.revenue}
                    onChange={(e) => setNewShipment({...newShipment, revenue: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g., ₦85,000"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-900 mb-3">Pickup Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      value={newShipment.pickupAddress}
                      onChange={(e) => setNewShipment({...newShipment, pickupAddress: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter pickup address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Contact
                    </label>
                    <input
                      type="text"
                      value={newShipment.pickupContact}
                      onChange={(e) => setNewShipment({...newShipment, pickupContact: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-900 mb-3">Delivery Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={newShipment.deliveryAddress}
                      onChange={(e) => setNewShipment({...newShipment, deliveryAddress: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter delivery address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Contact
                    </label>
                    <input
                      type="text"
                      value={newShipment.deliveryContact}
                      onChange={(e) => setNewShipment({...newShipment, deliveryContact: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewShipment}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Shipment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filters Panel
  const FiltersPanel = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 mb-6 ${showFilters ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
          <select
            value={filters.customer}
            onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Customers</option>
            <option value="ABC Manufacturing">ABC Manufacturing</option>
            <option value="Global Logistics Ltd">Global Logistics Ltd</option>
            <option value="Oil & Gas Solutions">Oil & Gas Solutions</option>
            <option value="Tech Solutions Ltd">Tech Solutions Ltd</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
          <select
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Origins</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Kano">Kano</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => setFilters({
            dateRange: 'today',
            customer: 'all',
            origin: 'all',
            destination: 'all',
            priority: 'all'
          })}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear Filters
        </button>
        <button
          onClick={() => setShowFilters(false)}
          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Shipments</h1>
            <p className="text-sm md:text-base text-gray-600">Manage and track all shipments</p>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 md:gap-3">
            <button 
              onClick={() => setShowAddShipmentModal(true)}
              className="px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <PlusIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">New Shipment</span>
              <span className="xs:hidden">New</span>
            </button>
            <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs md:text-sm font-medium rounded-full transition-all flex items-center justify-center">
              <ArrowUpTrayIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Shipments</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-full">
              <TruckIcon className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Pending</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{stats.pending}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-red-100 rounded-full">
              <ClockIcon className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">In Transit</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{stats.inTransit}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-full">
              <TruckIcon className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Revenue</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">₦{stats.revenue.toLocaleString('en-NG')}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-green-100 rounded-full">
              <CurrencyDollarIcon className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 mb-6">
        <div className="flex flex-col space-y-3 md:space-y-0">
          {/* Search input */}
          <div className="w-full">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shipments..."
                className="w-full pl-8 pr-3 py-2 md:pl-9 md:py-2.5 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="min-w-[120px] p-2 text-xs md:text-sm border border-gray-300 rounded-lg flex-1"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="min-w-[100px] p-2 text-xs md:text-sm border border-gray-300 rounded-lg flex-1"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[36px]"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                <ChevronUpDownIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 border rounded-lg min-w-[36px] ${showFilters ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-500'}`}
                title="Advanced Filters"
              >
                <FunnelIcon className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            
            {/* Selected shipments button */}
            {selectedShipments.length > 0 && (
              <button
                onClick={() => {
                  alert(`${selectedShipments.length} shipments selected`);
                }}
                className="px-3 py-1.5 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap"
              >
                Selected ({selectedShipments.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <FiltersPanel />

      {/* Shipments Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[1024px] md:min-w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input
                      type="checkbox"
                      checked={currentShipments.every(s => selectedShipments.includes(s.id)) && currentShipments.length > 0}
                      onChange={selectAllOnPage}
                      className="h-3 w-3 md:h-4 md:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                    Shipment Details
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Status
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Route
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Cargo
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Driver
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Revenue
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentShipments.map((shipment) => (
                  <tr 
                    key={shipment.id} 
                    className={`hover:bg-gray-50 ${selectedShipments.includes(shipment.id) ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedShipments.includes(shipment.id)}
                        onChange={() => toggleSelection(shipment.id)}
                        className="h-3 w-3 md:h-4 md:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                      />
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-red-100 flex items-center justify-center">
                            <TruckIcon className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                          </div>
                        </div>
                        <div className="ml-2 md:ml-3">
                          <div className="text-xs md:text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-none">
                            {shipment.id}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 mt-0.5">
                            <span className={`px-1.5 py-0.5 text-[10px] md:text-xs rounded-full ${getPriorityColor(shipment.priority)}`}>
                              {shipment.priority}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500">{shipment.type}</span>
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
                            {shipment.customer}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-[10px] md:text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      <div className="text-xs md:text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPinIcon className="h-2 w-2 md:h-3 md:w-3 text-green-500 mr-1" />
                          <span className="truncate max-w-[60px] md:max-w-none">{shipment.origin}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <ArrowTopRightOnSquareIcon className="h-2 w-2 md:h-3 md:w-3 text-red-500 mr-1" />
                          <span className="truncate max-w-[60px] md:max-w-none">{shipment.destination}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      <div className="text-xs md:text-sm text-gray-900 truncate max-w-[100px] md:max-w-none">
                        {shipment.cargo.type}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">{shipment.cargo.weight}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      {shipment.driver ? (
                        <div>
                          <div className="text-xs md:text-sm text-gray-900 truncate max-w-[100px] md:max-w-none">
                            {shipment.driver}
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-500 truncate max-w-[100px] md:max-w-none">
                            {shipment.vehicle}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs md:text-sm text-gray-500 italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      <div className="text-xs md:text-sm font-medium text-gray-900">{shipment.revenue}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setShowShipmentDetails(true);
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                          title="View Details"
                        >
                          <EyeIcon className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateShipment(shipment)}
                          disabled={loading}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                          title="Duplicate"
                        >
                          <DocumentDuplicateIcon className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                        {shipment.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(shipment.id, 'assigned')}
                            disabled={loading}
                            className="p-1 text-green-500 hover:text-green-700 hover:bg-green-100 rounded"
                            title="Assign Driver"
                          >
                            <UserCircleIcon className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteShipment(shipment.id)}
                          disabled={loading}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded"
                          title="Delete"
                        >
                          <TrashIcon className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Empty State */}
        {currentShipments.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <TruckIcon className="h-8 w-8 md:h-12 md:w-12 text-gray-300 mx-auto mb-2 md:mb-3" />
            <p className="text-xs md:text-sm text-gray-500">No shipments found</p>
            <button 
              onClick={() => setShowAddShipmentModal(true)}
              className="mt-2 md:mt-3 px-3 py-1.5 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium rounded-lg"
            >
              Create New Shipment
            </button>
          </div>
        )}
        
        {/* Pagination */}
        <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs md:text-sm text-gray-500">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="p-1 text-xs md:text-sm border border-gray-300 rounded"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-xs md:text-sm text-gray-500">entries</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 md:p-6">
            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-2 border-red-600 border-t-transparent mx-auto mb-2 md:mb-3"></div>
            <p className="text-xs md:text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Add Shipment Modal */}
      <AddShipmentModal
        isOpen={showAddShipmentModal}
        onClose={() => setShowAddShipmentModal(false)}
      />

      {/* Shipment Details Modal */}
      <ShipmentDetailsModal
        shipment={selectedShipment}
        isOpen={showShipmentDetails}
        onClose={() => {
          setShowShipmentDetails(false);
          setSelectedShipment(null);
        }}
      />
    </div>
  );
};

export default Shipments;
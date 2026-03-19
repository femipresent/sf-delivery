import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  TruckIcon,
  MapIcon,
  ClockIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  PlusCircleIcon,
  MapPinIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  UsersIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  WalletIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  CloudArrowDownIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  PhotoIcon,
  UserCircleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// ==================== UTILITIES ====================
const Loader = ({ size = 'md', color = 'green' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
  const colorClasses = {
    green: 'border-green-200 border-t-green-600',
    blue: 'border-blue-200 border-t-blue-600',
    white: 'border-gray-200 border-t-white'
  };
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

const formatCurrency = (amount) => {
  return `₦${amount?.toLocaleString('en-NG') || '0'}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// ==================== COMPONENTS ====================
// StatCard Component - Responsive
const StatCard = ({ title, value, icon: Icon, color, description, trend, suffix }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs hover:shadow-sm transition-all duration-300">
    <div className="flex items-start justify-between mb-2">
      <div className={`p-1.5 rounded-lg ${color?.bg || 'bg-gray-100'} ${color?.text || 'text-gray-600'}`}>
        {Icon && <Icon className="w-4 h-4" />}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
          trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
   
    <div className="mb-1">
      <p className="text-xs font-medium text-gray-500 mb-0.5">{title}</p>
      <p className="text-lg font-bold text-gray-900">
        {suffix === '₦' ? formatCurrency(value) : value}{suffix === '%' ? '%' : ''}
      </p>
    </div>
   
    {description && (
      <p className="text-xs text-gray-500 truncate">{description}</p>
    )}
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Booked': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Booked' },
    'Assigned': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Assigned' },
    'Picked Up': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Picked Up' },
    'In Transit': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'In Transit' },
    'Delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
    'Failed': { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' }
  };
 
  const config = statusConfig[status] || statusConfig['Booked'];
 
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Notification Dropdown Component
const NotificationDropdown = ({ isOpen, notifications, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-1 rounded-full">
            {notifications.length} New
          </span>
        </div>
      </div>
     
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                {notification.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                {notification.action && (
                  <button className="mt-2 text-xs text-green-600 hover:text-green-700 font-medium">
                    {notification.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
     
      <div className="p-3 border-t border-gray-200">
        <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 rounded-full hover:bg-green-50">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

// ==================== SHIPPER LAYOUT ====================
const ShipperLayout = ({ children, activeTab: externalActiveTab, setActiveTab: externalSetActiveTab, onLogout }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState('Dashboard');
  const [activeFilter, setActiveFilter] = useState('all');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [allShipments, setAllShipments] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const activeTab = externalActiveTab || internalActiveTab;
  const setActiveTab = externalSetActiveTab || setInternalActiveTab;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, statsRes] = await Promise.all([
          API.get('/bookings'),
          API.get('/bookings/stats')
        ]);
        const bookings = bookingsRes.data.data.map(b => ({
          id: b._id,
          trackingNumber: b.trackingNumber,
          name: b.itemDetails?.description || `${b.pickup?.address?.city} → ${b.delivery?.address?.city}`,
          status: b.status === 'draft' ? 'Booked' : b.status === 'assigned' ? 'Assigned' : b.status === 'picked_up' ? 'Picked Up' : b.status === 'in_transit' ? 'In Transit' : b.status === 'delivered' ? 'Delivered' : 'Booked',
          origin: `${b.pickup?.address?.street}, ${b.pickup?.address?.city}`,
          destination: `${b.delivery?.address?.street}, ${b.delivery?.address?.city}`,
          service: b.services?.ftl?.selected ? 'FTL' : b.services?.ltl?.selected ? 'LTL' : b.services?.express?.selected ? 'Express' : 'Last-Mile',
          scheduled: b.pickup?.scheduledDate,
          deliveredAt: b.proofOfDelivery?.deliveredAt || '',
          amount: b.pricing?.total || 0,
          weight: `${b.itemDetails?.weight || 0} kg`,
          driver: b.assignedDriver?.name || '',
          hasPOD: !!b.proofOfDelivery,
          pickupDetails: null,
          deliveryDetails: b.proofOfDelivery ? {
            recipient: b.proofOfDelivery.recipientName,
            notes: b.proofOfDelivery.deliveryNotes
          } : null
        }));
        setAllShipments(bookings);
        setFilteredShipments(bookings);
        setStatsData(statsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const calculateStats = () => {
    const totalShipments = allShipments.length;
    const deliveredShipments = allShipments.filter(s => s.status === 'Delivered').length;
    const inTransitShipments = allShipments.filter(s => s.status === 'In Transit').length;
    const pickedUpShipments = allShipments.filter(s => s.status === 'Picked Up').length;
    const deliveredAmount = allShipments.filter(s => s.status === 'Delivered').reduce((sum, s) => sum + s.amount, 0);
    const totalAmount = allShipments.reduce((sum, s) => sum + s.amount, 0);
    return {
      totalShipments,
      deliveredShipments,
      inTransitShipments,
      pickedUpShipments,
      deliveredAmount,
      totalAmount,
      deliveryRate: totalShipments > 0 ? Math.round((deliveredShipments / totalShipments) * 100) : 0
    };
  };

  const stats = calculateStats();
  const notifications = [
    {
      id: 1,
      title: `Welcome, ${user?.name || 'User'}!`,
      message: `You have ${stats.totalShipments} shipment${stats.totalShipments !== 1 ? 's' : ''} on your account.`,
      time: 'Just now',
      type: 'success',
      icon: <EnvelopeIcon className="w-5 h-5" />,
      unread: true,
      action: 'View Dashboard'
    },
    ...(stats.deliveredShipments > 0 ? [{
      id: 2,
      title: `${stats.deliveredShipments} Shipment${stats.deliveredShipments !== 1 ? 's' : ''} Delivered`,
      message: `${stats.deliveredShipments} shipment${stats.deliveredShipments !== 1 ? 's' : ''} completed with proof of delivery.`,
      time: 'Today',
      type: 'success',
      icon: <CheckCircleIcon className="w-5 h-5" />,
      unread: true
    }] : []),
    ...(stats.inTransitShipments > 0 ? [{
      id: 3,
      title: `${stats.inTransitShipments} Shipment${stats.inTransitShipments !== 1 ? 's' : ''} In Transit`,
      message: `${stats.inTransitShipments} shipment${stats.inTransitShipments !== 1 ? 's' : ''} currently on the way.`,
      time: 'Today',
      type: 'info',
      icon: <TruckIcon className="w-5 h-5" />,
      unread: true
    }] : [])
  ];

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Book Shipment', icon: PlusCircleIcon },
    { name: 'Track Shipment', icon: MapIcon },
    { name: 'Shipment History', icon: ClipboardDocumentListIcon },
    { name: 'Proof of Delivery', icon: DocumentTextIcon },
    { name: 'Invoices & Payments', icon: CurrencyDollarIcon },
    { name: 'Reports & Analytics', icon: ChartPieIcon },
    { name: 'Profile & Settings', icon: UserIcon },
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredShipments(allShipments);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const filtered = allShipments.filter(shipment =>
      shipment.id.toLowerCase().includes(query) ||
      shipment.trackingNumber.toLowerCase().includes(query) ||
      shipment.name.toLowerCase().includes(query) ||
      shipment.driver.toLowerCase().includes(query) ||
      shipment.origin.toLowerCase().includes(query) ||
      shipment.destination.toLowerCase().includes(query)
    );
    setFilteredShipments(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredShipments(allShipments);
    } else {
      const filtered = allShipments.filter(s => s.status === activeFilter);
      setFilteredShipments(filtered);
    }
  }, [activeFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Modal Components
  const ShipmentDetailsModal = ({ shipment, onClose }) => {
    if (!shipment) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{shipment.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Tracking: {shipment.trackingNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Current Status</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <StatusBadge status={shipment.status} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service Type</p>
                  <span className="text-lg font-semibold text-gray-900">{shipment.service}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount</p>
                  <span className="text-lg font-semibold text-green-600">{formatCurrency(shipment.amount)}</span>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Route Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup Location</p>
                    <p className="text-lg font-semibold text-gray-900">{shipment.origin}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-green-400 to-gray-200"></div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <MapIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Location</p>
                    <p className="text-lg font-semibold text-gray-900">{shipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Package Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Weight</p>
                  <p className="text-lg font-semibold text-gray-900">{shipment.weight}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Scheduled Date</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(shipment.scheduled)}</p>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            {shipment.driver && (
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Assigned Driver</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <UserCircleIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{shipment.driver}</p>
                    <p className="text-sm text-gray-600">Driver ID: DRV-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pickup Details */}
            {shipment.pickupDetails && (
              <div className="border border-gray-200 rounded-xl p-4 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <PhotoIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Pickup Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Picked Up By</p>
                    <p className="font-medium text-gray-900">{shipment.pickupDetails.pickedUpBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup Time</p>
                    <p className="font-medium text-gray-900">
                      {new Date(shipment.pickupDetails.pickupTime).toLocaleString('en-NG')}
                    </p>
                  </div>
                  {shipment.pickupDetails.pickupNotes && (
                    <div>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="font-medium text-gray-900">{shipment.pickupDetails.pickupNotes}</p>
                    </div>
                  )}
                  {shipment.pickupDetails.pickupPhoto && (
                    <div className="flex items-center text-green-700 text-sm font-medium">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Pickup photo available
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Details */}
            {shipment.deliveryDetails && (
              <div className="border border-gray-200 rounded-xl p-4 bg-green-50">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                  Delivery Proof
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Received By</p>
                    <p className="font-medium text-gray-900">{shipment.deliveryDetails.recipient}</p>
                  </div>
                  {shipment.deliveredAt && (
                    <div>
                      <p className="text-sm text-gray-600">Delivery Time</p>
                      <p className="font-medium text-gray-900">
                        {new Date(shipment.deliveredAt).toLocaleString('en-NG')}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {shipment.deliveryDetails.signature && (
                      <span className="inline-flex items-center bg-white text-green-700 text-sm font-medium px-3 py-1 rounded-full border border-green-200">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Signature
                      </span>
                    )}
                    {shipment.deliveryDetails.photo && (
                      <span className="inline-flex items-center bg-white text-blue-700 text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
                        <PhotoIcon className="w-4 h-4 mr-1" />
                        Photo
                      </span>
                    )}
                  </div>
                  {shipment.deliveryDetails.notes && (
                    <div>
                      <p className="text-sm text-gray-600">Delivery Notes</p>
                      <p className="font-medium text-gray-900">{shipment.deliveryDetails.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShipmentTrackingModal = ({ shipment, onClose }) => {
    if (!shipment) return null;

    const trackingSteps = [
      { status: 'Booked', time: shipment.scheduled, icon: CheckCircleIcon, completed: true },
      { status: 'Picked Up', time: shipment.pickupDetails?.pickupTime || '', icon: UsersIcon, completed: shipment.pickupDetails ? true : false },
      { status: 'In Transit', time: '', icon: TruckIcon, completed: shipment.status === 'In Transit' || shipment.status === 'Delivered' },
      { status: 'Delivered', time: shipment.deliveredAt || '', icon: CheckCircleIcon, completed: shipment.status === 'Delivered' }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Track Shipment</h2>
              <p className="text-sm text-gray-600 mt-1">{shipment.trackingNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Tracking Timeline */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-6">Delivery Timeline</h3>
              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="flex">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <StepIcon className="w-5 h-5" />
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-16 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="pt-1">
                        <p className="font-semibold text-gray-900">{step.status}</p>
                        {step.time && (
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(step.time).toLocaleString('en-NG', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })}
                          </p>
                        )}
                        {!step.time && step.status !== 'Delivered' && (
                          <p className="text-sm text-gray-500 italic">Pending...</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Status Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Current Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-gray-900">{shipment.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {shipment.status === 'Delivered' ? 'Delivered' : 'In Transit'}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Route</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">From</p>
                    <p className="font-semibold text-gray-900">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-300"></div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <MapIcon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">To</p>
                    <p className="font-semibold text-gray-900">{shipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            {shipment.driver && (
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Driver Information</h3>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <UserCircleIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{shipment.driver}</p>
                    <p className="text-sm text-gray-600">Professional Driver</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Content - Only round spinner during loading
  const DashboardContent = () => {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Shipper Dashboard</h1>
              <div className="flex items-center">
                <p className="text-xs sm:text-sm text-gray-600">Welcome back, {user?.name?.split(' ')[0] || 'User'} • {stats.totalShipments} Active Shipments</p>
              </div>
            </div>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-xs sm:text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpTrayIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Refresh Data</span>
                <span className="sm:hidden">Refresh</span>
              </button>
              <button
                onClick={() => setActiveTab('Book Shipment')}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full text-xs sm:text-sm flex items-center"
              >
                <PlusCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Book Shipment</span>
                <span className="sm:hidden">Book</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
            <StatCard
              title="Total Shipments"
              value={stats.totalShipments}
              icon={TruckIcon}
              color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
              description="All active shipments"
              style={{ animationDelay: '200ms' }}
            />
            <StatCard
              title="Delivered"
              value={stats.deliveredShipments}
              icon={CheckCircleIcon}
              color={{ bg: 'bg-green-100', text: 'text-green-600' }}
              description="With POD proof"
              style={{ animationDelay: '300ms' }}
            />
            <StatCard
              title="In Transit"
              value={stats.inTransitShipments}
              icon={MapIcon}
              color={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }}
              description="Currently moving"
              style={{ animationDelay: '400ms' }}
            />
            <StatCard
              title="Picked Up"
              value={stats.pickedUpShipments}
              icon={UsersIcon}
              color={{ bg: 'bg-yellow-100', text: 'text-yellow-600' }}
              description="By company staff"
              style={{ animationDelay: '500ms' }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Shipment Overview</h2>
                <div className="flex space-x-1">
                  {['all', 'Delivered', 'In Transit', 'Picked Up', 'Booked'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium rounded-full ${
                        activeFilter === filter
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter === 'all' ? 'All' : filter.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Total Value</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Delivered Value</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.deliveredAmount)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Success Rate</p>
                  <p className="text-lg font-bold text-gray-900">{stats.deliveryRate}%</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Avg. Delivery</p>
                  <p className="text-lg font-bold text-gray-900">2.1 days</p>
                </div>
              </div>

              <div className="space-y-3">
                {filteredShipments.map((shipment, index) => (
                  <div
                    key={shipment.id}
                    className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{shipment.name}</span>
                          <StatusBadge status={shipment.status} />
                          {shipment.hasPOD && (
                            <span className="text-xs bg-green-100 text-green-800 font-medium px-1.5 py-0.5 rounded-full flex items-center">
                              <CheckBadgeIcon className="w-3 h-3 mr-1" />
                              POD
                            </span>
                          )}
                          {shipment.pickupDetails?.pickupPhoto && (
                            <span className="text-xs bg-blue-100 text-blue-800 font-medium px-1.5 py-0.5 rounded-full flex items-center">
                              <PhotoIcon className="w-3 h-3 mr-1" />
                              Pickup
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="truncate">{shipment.origin} → {shipment.destination}</span>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span className="mr-2">Tracking: {shipment.trackingNumber}</span>
                          {shipment.driver && (
                            <span className="flex items-center">
                              <UserCircleIcon className="w-3 h-3 mr-1" />
                              {shipment.driver}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-base sm:text-lg font-semibold text-gray-900">{formatCurrency(shipment.amount)}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{shipment.service}</p>
                      </div>
                    </div>

                    {(shipment.pickupDetails || shipment.deliveryDetails) && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        {shipment.pickupDetails && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Pickup Details:</p>
                            <div className="flex items-center text-xs text-gray-600">
                              <UsersIcon className="w-3 h-3 mr-1 text-gray-400" />
                              <span className="mr-2">By: {shipment.pickupDetails.pickedUpBy}</span>
                              <span className="mr-2">•</span>
                              <ClockIcon className="w-3 h-3 mr-1 text-gray-400" />
                              <span>{new Date(shipment.pickupDetails.pickupTime).toLocaleString('en-NG', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}</span>
                            </div>
                            {shipment.pickupDetails.pickupNotes && (
                              <p className="text-xs text-gray-500 mt-1">Note: {shipment.pickupDetails.pickupNotes}</p>
                            )}
                          </div>
                        )}

                        {shipment.deliveryDetails && (
                          <div>
                            <p className="text-xs font-medium text-gray-700 mb-1">Delivery Proof:</p>
                            <div className="flex items-center flex-wrap gap-2 text-xs text-gray-600">
                              {shipment.deliveryDetails.signature && (
                                <span className="flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                                  Signed
                                </span>
                              )}
                              {shipment.deliveryDetails.photo && (
                                <span className="flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                  <PhotoIcon className="w-3 h-3 mr-1" />
                                  Photo
                                </span>
                              )}
                              <span className="flex items-center">
                                <UserCircleIcon className="w-3 h-3 mr-1 text-gray-400" />
                                Received by: {shipment.deliveryDetails.recipient}
                              </span>
                            </div>
                            {shipment.deliveryDetails.notes && (
                              <p className="text-xs text-gray-500 mt-1">Note: {shipment.deliveryDetails.notes}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm mt-3">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <div className="flex items-center">
                          <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                          <span className="text-gray-600">{formatDate(shipment.scheduled)}</span>
                        </div>
                        <div className="flex items-center">
                          <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                          <span className="text-gray-600">{shipment.weight}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setModalType('details');
                          }}
                          className="px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-full text-xs flex items-center">
                          <DocumentMagnifyingGlassIcon className="w-3 h-3 mr-1" />
                          Details
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setModalType('tracking');
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-full text-xs flex items-center">
                          <MapIcon className="w-3 h-3 mr-1" />
                          Track
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('Book Shipment')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-full transition-colors flex items-center justify-center text-sm"
                >
                  <PlusCircleIcon className="w-4 h-4 mr-2" />
                  New Shipment
                </button>
                <button className="w-full border border-green-600 hover:bg-green-50 text-green-700 font-medium py-2.5 rounded-full transition-colors flex items-center justify-center text-sm">
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  Bulk Upload
                </button>
                <button
                  onClick={() => setActiveTab('Track Shipment')}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-full transition-colors flex items-center justify-center text-sm"
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Track Shipment
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Delivery Proof</h3>
                <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-1 rounded-full">
                  {allShipments.filter(s => s.hasPOD).length} Available
                </span>
              </div>
             
              <div className="space-y-2">
                {allShipments
                  .filter(s => s.hasPOD)
                  .slice(0, 3)
                  .map((shipment) => (
                    <div key={shipment.id} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{shipment.name}</span>
                        <div className="flex space-x-1">
                          <span className="text-xs bg-green-100 text-green-800 font-medium px-1.5 py-0.5 rounded-full">
                            Delivered
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">To: {shipment.deliveryDetails?.recipient}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(shipment.deliveredAt).toLocaleDateString('en-NG')}
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setModalType('details');
                          }}
                          className="px-2 py-1 text-xs bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-full">
                          View Proof
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Pickups</h3>
                <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full">
                  {allShipments.filter(s => s.pickupDetails).length} With Details
                </span>
              </div>
             
              <div className="space-y-2">
                {allShipments
                  .filter(s => s.pickupDetails)
                  .slice(0, 2)
                  .map((shipment) => (
                    <div key={shipment.id} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{shipment.name}</span>
                        {shipment.pickupDetails?.pickupPhoto && (
                          <span className="text-xs bg-blue-100 text-blue-800 font-medium px-1.5 py-0.5 rounded-full">
                            Photo Taken
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">Picked up by: {shipment.pickupDetails?.pickedUpBy}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(shipment.pickupDetails?.pickupTime).toLocaleTimeString('en-NG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setModalType('details');
                          }}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-full">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Service Types</h3>
                <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full">
                  4 Types
                </span>
              </div>
             
              <div className="space-y-2">
                {[
                  { service: 'Same-Day', description: 'Within Lagos', price: '₦3,500+', icon: ClockIcon, available: true },
                  { service: 'Express', description: 'Priority Delivery', price: '₦4,500+', icon: MapPinIcon, available: true },
                  { service: 'Standard', description: 'Regular Delivery', price: '₦2,500+', icon: TruckIcon, available: true },
                  { service: 'Interstate', description: 'Other States', price: '₦9,500+', icon: BuildingStorefrontIcon, available: true }
                ].map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.service} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{service.service}</p>
                            <p className="text-xs text-gray-500">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{service.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard
            title="Total Value"
            value={stats.totalAmount}
            icon={CurrencyDollarIcon}
            color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}
            suffix="₦"
            description="All shipments"
          />
          <StatCard
            title="Delivered Value"
            value={stats.deliveredAmount}
            icon={WalletIcon}
            color={{ bg: 'bg-green-100', text: 'text-green-600' }}
            suffix="₦"
            description="5 shipments"
          />
          <StatCard
            title="Success Rate"
            value={stats.deliveryRate}
            icon={ShieldCheckIcon}
            color={{ bg: 'bg-emerald-100', text: 'text-emerald-600' }}
            suffix="%"
            description="On-time delivery"
          />
          <StatCard
            title="Avg. Cost"
            value={7500}
            icon={ChartBarIcon}
            color={{ bg: 'bg-cyan-100', text: 'text-cyan-600' }}
            suffix="₦"
            description="Per shipment"
          />
        </div>

        {/* Reports Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Performance Summary</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm flex items-center">
                <CloudArrowDownIcon className="w-4 h-4 mr-1" />
                Export
              </button>
              <button
                onClick={() => setActiveTab('Reports & Analytics')}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full text-sm"
              >
                View All
              </button>
            </div>
          </div>
         
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-2">
                <ChartBarIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Cost Efficiency</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">₦7,500</div>
                <div className="text-xs text-gray-500">Per shipment</div>
              </div>
            </div>
           
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-2">
                <TruckIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Delivery Success</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.deliveryRate}%</div>
                <div className="text-xs text-gray-500">On-time rate</div>
              </div>
            </div>
           
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center mb-2">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Revenue Impact</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">+8%</div>
                <div className="text-xs text-gray-500">Monthly growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Book Shipment':
      case 'Track Shipment':
      case 'Shipment History':
      case 'Proof of Delivery':
      case 'Invoices & Payments':
      case 'Reports & Analytics':
      case 'Profile & Settings':
        if (children) {
          return children;
        } else {
          const TabContent = () => (
            <div className="p-4 sm:p-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    {navigation.find(n => n.name === activeTab)?.icon &&
                      React.createElement(navigation.find(n => n.name === activeTab).icon, {
                        className: "w-6 h-6 text-green-600"
                      })
                    }
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{activeTab}</h3>
                    <p className="text-sm text-gray-600">This feature is under development</p>
                  </div>
                </div>
               
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">Coming Soon</h4>
                      <p className="text-sm text-gray-600">This {activeTab.toLowerCase()} feature will be available in the next update.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">Expected Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Real-time tracking and updates</li>
                        <li>• Detailed analytics and reports</li>
                        <li>• Document management</li>
                        <li>• Payment processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
          return <TabContent />;
        }
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <style>{``}</style>

      {/* Modals */}
      {modalType === 'details' && (
        <ShipmentDetailsModal 
          shipment={selectedShipment} 
          onClose={() => {
            setModalType(null);
            setSelectedShipment(null);
          }} 
        />
      )}
      {modalType === 'tracking' && (
        <ShipmentTrackingModal 
          shipment={selectedShipment} 
          onClose={() => {
            setModalType(null);
            setSelectedShipment(null);
          }} 
        />
      )}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <div className={`fixed inset-y-0 left-0 w-64 sm:w-72 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border-2 border-green-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-base sm:text-lg font-bold text-gray-900">Safe & Fast Delivery</h1>
                <p className="text-xs text-gray-500">Shipper Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-full transition-colors ${
                    activeTab === item.name
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setActiveTab(item.name);
                    setSidebarOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-500">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaW9MRchAX63vAozkNFhsHbzLdxs0Q6Dh9cQUH8adk0g&s"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">Shipper</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-72 lg:flex-col bg-white border-r">
        <div className="flex items-center h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-green-500">
              <img
                src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">S&F Delivery</h1>
              <p className="text-xs text-gray-500"></p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-full transition-colors ${
                  activeTab === item.name
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaW9MRchAX63vAozkNFhsHbzLdxs0Q6Dh9cQUH8adk0g&s"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">Shipper</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="lg:pl-64 xl:pl-72 flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-white border-b">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 hover:bg-gray-100 rounded-full mr-2"
              >
                <Bars3Icon className="w-5 h-5 text-gray-500" />
              </button>
              <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-green-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <h2 className="text-sm font-bold text-gray-900">FreightFlow</h2>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-2 sm:mx-4 md:mx-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, tracking number, driver..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                >
                  <BellIcon className="w-5 h-5 text-gray-500" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
               
                <NotificationDropdown
                  isOpen={notificationsOpen}
                  notifications={notifications}
                  onClose={() => setNotificationsOpen(false)}
                />
              </div>

              <button
                onClick={() => setActiveTab('Profile & Settings')}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-full"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-green-500">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaW9MRchAX63vAozkNFhsHbzLdxs0Q6Dh9cQUH8adk0g&s"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500">Shipper</div>
                </div>
                <ChevronRightIcon className="hidden sm:block w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {renderContent()}
        </main>

        <footer className="bg-gray-900 text-white border-t border-gray-800">
          <div className="px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-green-500 mr-3">
                    <img
                      src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">S&F Delivery</h3>
                    <p className="text-sm text-gray-400">Logistics Management Platform</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Streamlining Safe & fast delivery, courier & fleet management across Nigeria.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setActiveTab('Dashboard')} className="text-gray-400 hover:text-white text-sm">Dashboard</button></li>
                  <li><button onClick={() => setActiveTab('Book Shipment')} className="text-gray-400 hover:text-white text-sm">Book Shipment</button></li>
                  <li><button onClick={() => setActiveTab('Track Shipment')} className="text-gray-400 hover:text-white text-sm">Track Shipment</button></li>
                  <li><button onClick={() => setActiveTab('Shipment History')} className="text-gray-400 hover:text-white text-sm">Shipment History</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400 text-sm">FTL (Full Truckload)</li>
                  <li className="text-gray-400 text-sm">LTL (Less Than Truckload)</li>
                  <li className="text-gray-400 text-sm">Last-Mile Delivery</li>
                  <li className="text-gray-400 text-sm">Express & Same-Day</li>
                  <li className="text-gray-400 text-sm">Scheduled Routes</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Contact & Support</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400 text-sm">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    <span>090-1700-0000</span>
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                    <span>support@s&fdelivery.ng</span>
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>Mon-Fri: 8AM-6PM</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-400 mb-4 md:mb-0">
                  © {new Date().getFullYear()} Safe & Fast Logistics Nigeria Ltd. • {stats.totalShipments} Active Shipments
                </div>
                <div className="flex space-x-4">
                  <button className="text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-gray-800 rounded-full">Support</button>
                  <button className="text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-gray-800 rounded-full">Privacy Policy</button>
                  <button className="text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-gray-800 rounded-full">Terms of Service</button>
                  <button className="text-sm text-gray-400 hover:text-white px-2 py-1 hover:bg-gray-800 rounded-full">Cookie Policy</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ShipperLayout;
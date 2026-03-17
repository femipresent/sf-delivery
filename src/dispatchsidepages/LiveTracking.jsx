// LiveTracking.jsx
import React, { useState, useEffect, useRef } from 'react';
import MapView from '../components/MapView';
import {
  MapPinIcon,
  TruckIcon,
  UserCircleIcon,
  PhoneIcon,
  ClockIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  PrinterIcon,
  ShareIcon,
  BellIcon,
  FlagIcon,
  EyeIcon,
  PaperClipIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const LiveTracking = () => {
  // State management
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  const [timeRange, setTimeRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 });
  const [zoomLevel, setZoomLevel] = useState(12);
  
  // New states for notifications and filters
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'delay',
      title: 'Delay Alert: SH-7886',
      message: 'Shipment delayed by 45 minutes due to traffic on Zaria Road',
      time: '5 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'geofence',
      title: 'Vehicle Entered Zone',
      message: 'DRV-001 has entered Lagos Mainland zone',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Delivery Completed',
      message: 'SH-7887 delivered successfully to Victoria Island',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'exception',
      title: 'POD Missing',
      message: 'Proof of Delivery not captured for SH-7884',
      time: '2 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'vehicle',
      title: 'Vehicle Offline',
      message: 'DRV-006 has been offline for more than 4 hours',
      time: '3 hours ago',
      read: false,
      priority: 'medium'
    }
  ]);

  // Enhanced filter state
  const [advancedFilters, setAdvancedFilters] = useState({
    vehicleType: 'all',
    capacityMin: '',
    capacityMax: '',
    distanceRange: 'all',
    ratingMin: '0',
    withActiveJob: 'all',
    zone: 'all'
  });

  // Ref for auto-refresh interval
  const refreshIntervalRef = useRef(null);

  // Live tracking data
  const [trackingData, setTrackingData] = useState({
    drivers: [
      {
        id: 'DRV-001',
        name: 'Musa Ibrahim',
        phone: '+234 801 234 5678',
        status: 'on-job',
        vehicle: {
          type: 'Truck',
          model: 'Toyota Hilux',
          plate: 'LSD 123 XY',
          capacity: '3.5 Tons'
        },
        currentJob: {
          shipmentId: 'SH-7889',
          customer: 'Global Logistics Ltd',
          origin: 'Lagos',
          destination: 'Ibadan',
          cargo: 'Construction Materials',
          pickupAddress: 'Construction Depot, Lagos',
          deliveryAddress: 'Building Site, Ibadan',
          pickupTime: '2024-01-15 08:15',
          estimatedDelivery: '2024-01-15 14:00',
          status: 'in-transit'
        },
        location: {
          lat: 6.5115,
          lng: 3.3942,
          address: 'Ikorodu Road, Lagos',
          speed: '45 km/h',
          lastUpdated: '2 minutes ago'
        },
        stats: {
          deliveriesToday: 3,
          onTimeRate: '92%',
          rating: 4.5,
          distanceCovered: '85 km'
        }
      },
      {
        id: 'DRV-002',
        name: 'Amina Yusuf',
        phone: '+234 802 345 6789',
        status: 'on-job',
        vehicle: {
          type: 'Van',
          model: 'Nissan Navara',
          plate: 'KJA 456 AB',
          capacity: '1.5 Tons'
        },
        currentJob: {
          shipmentId: 'SH-7888',
          customer: 'Oil & Gas Solutions',
          origin: 'Port Harcourt',
          destination: 'Enugu',
          cargo: 'Oil Equipment',
          pickupAddress: 'Oil Rig Base, Port Harcourt',
          deliveryAddress: 'Industrial Zone, Enugu',
          pickupTime: '2024-01-14 14:30',
          estimatedDelivery: '2024-01-15 16:30',
          status: 'at-delivery'
        },
        location: {
          lat: 6.4413,
          lng: 7.4989,
          address: 'New Haven, Enugu',
          speed: '0 km/h',
          lastUpdated: 'Just now'
        },
        stats: {
          deliveriesToday: 2,
          onTimeRate: '88%',
          rating: 4.2,
          distanceCovered: '320 km'
        }
      },
      {
        id: 'DRV-003',
        name: 'Emeka Nwachukwu',
        phone: '+234 803 456 7890',
        status: 'available',
        vehicle: {
          type: 'Minivan',
          model: 'Toyota Hiace',
          plate: 'FST 789 CD',
          capacity: '800 kg'
        },
        currentJob: null,
        location: {
          lat: 6.5244,
          lng: 3.3792,
          address: 'Victoria Island, Lagos',
          speed: '0 km/h',
          lastUpdated: '5 minutes ago'
        },
        stats: {
          deliveriesToday: 4,
          onTimeRate: '95%',
          rating: 4.7,
          distanceCovered: '65 km'
        }
      },
      {
        id: 'DRV-004',
        name: 'Grace Okafor',
        phone: '+234 804 567 8901',
        status: 'on-job',
        vehicle: {
          type: 'Truck',
          model: 'Mitsubishi Canter',
          plate: 'KAD 012 EF',
          capacity: '2.5 Tons'
        },
        currentJob: {
          shipmentId: 'SH-7886',
          customer: 'Agricultural Supplies Co.',
          origin: 'Kano',
          destination: 'Kaduna',
          cargo: 'Agricultural Products',
          pickupAddress: 'Farm Depot, Kano',
          deliveryAddress: 'Agricultural Market, Kaduna',
          pickupTime: '2024-01-14 11:00',
          estimatedDelivery: '2024-01-15 12:00',
          status: 'exception'
        },
        location: {
          lat: 11.0765,
          lng: 7.7106,
          address: 'Zaria Road, Kaduna',
          speed: '25 km/h',
          lastUpdated: '10 minutes ago'
        },
        stats: {
          deliveriesToday: 1,
          onTimeRate: '85%',
          rating: 4.0,
          distanceCovered: '180 km'
        }
      },
      {
        id: 'DRV-005',
        name: 'Samuel Eze',
        phone: '+234 805 678 9012',
        status: 'on-job',
        vehicle: {
          type: 'Truck',
          model: 'Mercedes Sprinter',
          plate: 'LAG 345 GH',
          capacity: '4.5 Tons'
        },
        currentJob: {
          shipmentId: 'SH-7884',
          customer: 'Real Estate Developers',
          origin: 'Lekki',
          destination: 'Ajah',
          cargo: 'Construction Materials',
          pickupAddress: 'Warehouse, Lekki',
          deliveryAddress: 'Construction Site, Ajah',
          pickupTime: '2024-01-15 10:00',
          estimatedDelivery: '2024-01-15 12:30',
          status: 'at-pickup'
        },
        location: {
          lat: 6.4418,
          lng: 3.5487,
          address: 'Lekki Phase 1, Lagos',
          speed: '0 km/h',
          lastUpdated: '15 minutes ago'
        },
        stats: {
          deliveriesToday: 2,
          onTimeRate: '90%',
          rating: 4.3,
          distanceCovered: '45 km'
        }
      },
      {
        id: 'DRV-006',
        name: 'John Okonkwo',
        phone: '+234 806 789 0123',
        status: 'offline',
        vehicle: {
          type: 'Truck',
          model: 'Volvo Truck',
          plate: 'ABJ 678 IJ',
          capacity: '10 Tons'
        },
        currentJob: null,
        location: null,
        stats: {
          deliveriesToday: 0,
          onTimeRate: '87%',
          rating: 4.1,
          distanceCovered: '0 km'
        }
      }
    ],
    shipments: [
      {
        id: 'SH-7889',
        status: 'in-transit',
        origin: 'Lagos',
        destination: 'Ibadan',
        customer: 'Global Logistics Ltd',
        driver: 'Musa Ibrahim',
        estimatedArrival: '14:00',
        currentLocation: 'Ikorodu Road, Lagos',
        delay: '0 mins'
      },
      {
        id: 'SH-7888',
        status: 'at-delivery',
        origin: 'Port Harcourt',
        destination: 'Enugu',
        customer: 'Oil & Gas Solutions',
        driver: 'Amina Yusuf',
        estimatedArrival: '16:30',
        currentLocation: 'New Haven, Enugu',
        delay: '15 mins'
      },
      {
        id: 'SH-7886',
        status: 'exception',
        origin: 'Kano',
        destination: 'Kaduna',
        customer: 'Agricultural Supplies Co.',
        driver: 'Grace Okafor',
        estimatedArrival: '12:00',
        currentLocation: 'Zaria Road, Kaduna',
        delay: '45 mins'
      },
      {
        id: 'SH-7884',
        status: 'at-pickup',
        origin: 'Lekki',
        destination: 'Ajah',
        customer: 'Real Estate Developers',
        driver: 'Samuel Eze',
        estimatedArrival: '12:30',
        currentLocation: 'Lekki Phase 1, Lagos',
        delay: '0 mins'
      },
      {
        id: 'SH-7883',
        status: 'pending',
        origin: 'Surulere',
        destination: 'Yaba',
        customer: 'Retail Chain Stores',
        driver: null,
        estimatedArrival: '15:00',
        currentLocation: 'Not assigned',
        delay: null
      }
    ]
  });

  // Status options for filtering
  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'available', label: 'Available', color: 'green' },
    { value: 'on-job', label: 'On Job', color: 'blue' },
    { value: 'offline', label: 'Offline', color: 'gray' }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-job': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'at-pickup': return 'bg-orange-100 text-orange-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'at-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'exception': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get driver marker color
  const getDriverMarkerColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-500 border-green-600';
      case 'on-job': return 'bg-blue-500 border-blue-600';
      case 'offline': return 'bg-gray-400 border-gray-500';
      default: return 'bg-gray-400 border-gray-500';
    }
  };

  // Get shipment marker color
  const getShipmentMarkerColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500 border-yellow-600';
      case 'at-pickup': return 'bg-orange-500 border-orange-600';
      case 'in-transit': return 'bg-blue-500 border-blue-600';
      case 'at-delivery': return 'bg-purple-500 border-purple-600';
      case 'delivered': return 'bg-green-500 border-green-600';
      case 'exception': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-400 border-gray-500';
    }
  };

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-refresh tracking data
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      // Simulate real-time updates
      setTrackingData(prev => ({
        ...prev,
        drivers: prev.drivers.map(driver => {
          if (driver.status === 'on-job' && driver.location) {
            // Simulate small location changes
            return {
              ...driver,
              location: {
                ...driver.location,
                lat: driver.location.lat + (Math.random() - 0.5) * 0.001,
                lng: driver.location.lng + (Math.random() - 0.5) * 0.001,
                lastUpdated: 'Just now'
              }
            };
          }
          return driver;
        })
      }));
    }, 30000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Manual refresh
  const handleManualRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filter drivers based on search and status
  const filteredDrivers = trackingData.drivers.filter(driver => {
    if (searchTerm && !driver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !driver.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filterStatus !== 'all' && driver.status !== filterStatus) {
      return false;
    }

    // Apply advanced filters
    if (advancedFilters.vehicleType !== 'all' && driver.vehicle.type !== advancedFilters.vehicleType) {
      return false;
    }

    if (advancedFilters.withActiveJob === 'yes' && !driver.currentJob) {
      return false;
    }

    if (advancedFilters.withActiveJob === 'no' && driver.currentJob) {
      return false;
    }

    if (advancedFilters.ratingMin !== '0' && driver.stats.rating < parseFloat(advancedFilters.ratingMin)) {
      return false;
    }

    return true;
  });

  // Filter shipments
  const filteredShipments = trackingData.shipments.filter(shipment => {
    if (searchTerm && !shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Get drivers by status count
  const statusCounts = {
    available: trackingData.drivers.filter(d => d.status === 'available').length,
    onJob: trackingData.drivers.filter(d => d.status === 'on-job').length,
    offline: trackingData.drivers.filter(d => d.status === 'offline').length
  };

  // Toggle notifications panel
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowFilterPanel(false);
  };

  // Toggle filter panel
  const handleToggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowNotifications(false);
  };

  // Mark notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Clear all notifications
  const handleClearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      setShowNotifications(false);
    }
  };

  // Apply advanced filters
  const handleApplyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Filters applied successfully!');
      setShowFilterPanel(false);
      setLoading(false);
    }, 1000);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setAdvancedFilters({
      vehicleType: 'all',
      capacityMin: '',
      capacityMax: '',
      distanceRange: 'all',
      ratingMin: '0',
      withActiveJob: 'all',
      zone: 'all'
    });
    setFilterStatus('all');
    setSearchTerm('');
  };

  // Handle assign shipment
  const handleAssignShipment = (shipmentId) => {
    setShowAssignModal(true);
  };

  // Handle contact driver
  const handleContactDriver = (driverId, phone) => {
    alert(`Calling ${driverId} at ${phone}`);
  };

  // Handle view driver details
  const handleViewDriverDetails = (driver) => {
    setSelectedDriver(driver);
    setShowDriverDetails(true);
  };

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(20, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(1, prev - 1));
  };

  // Handle center on driver
  const handleCenterOnDriver = (driver) => {
    if (driver.location) {
      setMapCenter({ lat: driver.location.lat, lng: driver.location.lng });
      setZoomLevel(15);
    }
  };

  // Notifications Panel Component
  const NotificationsPanel = () => {
    if (!showNotifications) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:items-start md:justify-end">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden mt-16 md:mt-20">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  {unreadCount} unread of {notifications.length} total
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="ml-4 text-sm text-red-600 hover:text-red-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAllNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  title="Clear all"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XCircleIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No notifications</p>
                <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-red-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {notification.type === 'delay' && (
                          <ClockIcon className="h-5 w-5 text-red-500" />
                        )}
                        {notification.type === 'geofence' && (
                          <MapPinIcon className="h-5 w-5 text-blue-500" />
                        )}
                        {notification.type === 'delivery' && (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        {notification.type === 'exception' && (
                          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                        )}
                        {notification.type === 'vehicle' && (
                          <TruckIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Real-time alerts refresh every 30 seconds
              </span>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="text-sm text-red-600 hover:text-red-700"
              >
                {loading ? 'Refreshing...' : 'Refresh now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter Panel Component
  const FilterPanel = () => {
    if (!showFilterPanel) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:items-start md:justify-end">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden mt-16 md:mt-20">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
              <p className="text-sm text-gray-600 mt-1">Filter drivers and shipments</p>
            </div>
            <button
              onClick={() => setShowFilterPanel(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[60vh] p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={advancedFilters.vehicleType}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, vehicleType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Vehicle Types</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Bike">Bike</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Capacity
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      value={advancedFilters.capacityMin}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, capacityMin: e.target.value})}
                      placeholder="Min (tons)"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={advancedFilters.capacityMax}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, capacityMax: e.target.value})}
                      placeholder="Max (tons)"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  With Active Job
                </label>
                <select
                  value={advancedFilters.withActiveJob}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, withActiveJob: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Drivers</option>
                  <option value="yes">With Active Job</option>
                  <option value="no">Without Active Job</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={advancedFilters.ratingMin}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, ratingMin: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="0">Any Rating</option>
                  <option value="3.0">3.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone/Location
                </label>
                <select
                  value={advancedFilters.zone}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, zone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Zones</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="port-harcourt">Port Harcourt</option>
                  <option value="kano">Kano</option>
                  <option value="ibadan">Ibadan</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 mt-6 border-t">
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all"
              >
                Clear All Filters
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
              >
                {loading ? 'Applying...' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Driver Details Modal
  const DriverDetailsModal = ({ driver, isOpen, onClose }) => {
    if (!isOpen || !driver) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{driver.name}</h2>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.status)}`}>
                  {driver.status.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">{driver.id}</span>
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
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Driver ID</p>
                      <p className="text-sm font-medium">{driver.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{driver.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vehicle</p>
                    <p className="text-sm font-medium">{driver.vehicle.model} ({driver.vehicle.plate})</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium">{driver.vehicle.capacity}</p>
                  </div>
                </div>
              </div>

              {driver.location && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Current Location</h3>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{driver.location.address}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="text-sm font-medium">{driver.location.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Speed</p>
                        <p className="text-sm font-medium">{driver.location.speed}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {driver.currentJob ? (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Current Job</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Shipment ID</p>
                      <p className="text-sm font-medium">{driver.currentJob.shipmentId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-sm font-medium">{driver.currentJob.customer}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">From</p>
                        <p className="text-sm font-medium">{driver.currentJob.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">To</p>
                        <p className="text-sm font-medium">{driver.currentJob.destination}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.currentJob.status)}`}>
                        {driver.currentJob.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Current Status</h3>
                  <p className="text-sm text-gray-600">No active job assigned</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Today's Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{driver.stats.deliveriesToday}</p>
                    <p className="text-xs text-gray-500">Deliveries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{driver.stats.onTimeRate}</p>
                    <p className="text-xs text-gray-500">On-Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{driver.stats.rating}/5</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{driver.stats.distanceCovered}</p>
                    <p className="text-xs text-gray-500">Distance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t">
              <button
                onClick={() => handleContactDriver(driver.id, driver.phone)}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all flex items-center justify-center"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Call Driver
              </button>
              <button
                onClick={() => handleCenterOnDriver(driver)}
                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center"
              >
                <MapPinIcon className="w-4 h-4 mr-2" />
                Center Map
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Assign Shipment Modal
  const AssignShipmentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Assign Shipment</h2>
              <p className="text-sm text-gray-600 mt-1">Select driver for shipment</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Driver
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg text-sm">
                  <option value="">Choose a driver</option>
                  {filteredDrivers
                    .filter(d => d.status === 'available')
                    .map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.vehicle.model} - {driver.vehicle.capacity})
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipment Details
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">SH-7883 - Retail Chain Stores</p>
                  <p className="text-sm text-gray-600 mt-1">Surulere → Yaba</p>
                  <p className="text-sm text-gray-500 mt-1">Estimated Delivery: 15:00</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  rows="3"
                  placeholder="Add special instructions for the driver..."
                />
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
                onClick={() => {
                  alert('Shipment assigned successfully!');
                  onClose();
                }}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
              >
                Assign Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simulated Map Component
  const TrackingMap = () => (
    <MapView
      height="100%"
      markers={[
        ...filteredDrivers
          .filter(d => d.location)
          .map(driver => ({
            position: [driver.location.lat, driver.location.lng],
            label: driver.name,
            popup: `${driver.id} • ${driver.status} • ${driver.location.speed}`,
            color: driver.status === 'available' ? '#22C55E' : driver.status === 'on-job' ? '#3B82F6' : '#9CA3AF',
            type: 'truck',
          })),
        ...filteredShipments
          .filter(s => s.status !== 'pending')
          .map((shipment, i) => ({
            position: [6.45 + i * 0.05, 3.38 + i * 0.03],
            label: shipment.id,
            popup: `${shipment.customer} • ${shipment.origin} → ${shipment.destination}`,
            color: shipment.status === 'exception' ? '#EF4444' : shipment.status === 'at-delivery' ? '#8B5CF6' : '#F59E0B',
            type: 'dot',
          })),
      ]}
    />
  );

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Live Tracking</h1>
            <p className="text-sm md:text-base text-gray-600">Real-time monitoring of drivers and shipments</p>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 md:gap-3">
            <div className="relative">
              <button 
                onClick={handleToggleNotifications}
                className="px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <BellIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="hidden xs:inline">Alerts Center</span>
                <span className="xs:hidden">Alerts</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              onClick={handleToggleFilterPanel}
              className={`px-3 py-2 md:px-4 md:py-2 border text-xs md:text-sm font-medium rounded-full transition-all flex items-center justify-center ${
                showFilterPanel 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <AdjustmentsHorizontalIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden xs:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Drivers</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{trackingData.drivers.length}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-full">
              <UserCircleIcon className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Available</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{statusCounts.available}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-green-100 rounded-full">
              <CheckCircleIcon className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">On Job</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{statusCounts.onJob}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-full">
              <TruckIcon className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Active Shipments</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{filteredShipments.length}</p>
            </div>
            <div className="p-1.5 md:p-2 bg-orange-100 rounded-full">
              <MapPinIcon className="h-4 w-4 md:h-6 md:w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'map' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            List View
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-xs md:text-sm"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className={`p-2 border border-gray-300 rounded-lg ${loading ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <ArrowPathIcon className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drivers or shipments..."
                className="w-full pl-8 pr-3 py-2 md:pl-9 md:py-2.5 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 text-xs md:text-sm border border-gray-300 rounded-lg"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <button 
              onClick={handleToggleFilterPanel}
              className={`p-2 border rounded-lg ${
                showFilterPanel 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-500'
              }`}
            >
              <FunnelIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="h-[500px] md:h-[600px]">
                <TrackingMap />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Active Shipments</h3>
                <span className="text-xs text-gray-500">{filteredShipments.length} total</span>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {filteredShipments.map(shipment => (
                  <div key={shipment.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{shipment.id}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{shipment.customer}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {shipment.origin} → {shipment.destination}
                        </p>
                        <div className="flex items-center mt-2">
                          <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">ETA: {shipment.estimatedArrival}</span>
                          {shipment.delay && (
                            <span className="text-xs text-red-600 ml-2">({shipment.delay} delay)</span>
                          )}
                        </div>
                      </div>
                      {shipment.status === 'pending' && (
                        <button
                          onClick={() => handleAssignShipment(shipment.id)}
                          className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                          Assign
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Driver Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Available</span>
                  </div>
                  <span className="text-sm font-medium">{statusCounts.available}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-700">On Job</span>
                  </div>
                  <span className="text-sm font-medium">{statusCounts.onJob}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-sm text-gray-700">Offline</span>
                  </div>
                  <span className="text-sm font-medium">{statusCounts.offline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers.map(driver => (
                  <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                          <div className="text-xs text-gray-500">{driver.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.status)}`}>
                        {driver.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{driver.vehicle.model}</div>
                      <div className="text-xs text-gray-500">{driver.vehicle.plate}</div>
                    </td>
                    <td className="px-6 py-4">
                      {driver.currentJob ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{driver.currentJob.shipmentId}</div>
                          <div className="text-xs text-gray-500">{driver.currentJob.origin} → {driver.currentJob.destination}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">No active job</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {driver.location ? (
                        <div>
                          <div className="text-sm text-gray-900">{driver.location.address}</div>
                          <div className="text-xs text-gray-500">{driver.location.lastUpdated}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Location unavailable</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDriverDetails(driver)}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleContactDriver(driver.id, driver.phone)}
                          className="p-1 text-green-500 hover:text-green-700 hover:bg-green-100 rounded"
                          title="Call Driver"
                        >
                          <PhoneIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCenterOnDriver(driver)}
                          className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded"
                          title="Center on Map"
                        >
                          <MapPinIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add the panels */}
      <NotificationsPanel />
      <FilterPanel />

      {/* Driver Details Modal */}
      <DriverDetailsModal
        driver={selectedDriver}
        isOpen={showDriverDetails}
        onClose={() => {
          setShowDriverDetails(false);
          setSelectedDriver(null);
        }}
      />

      {/* Assign Shipment Modal */}
      <AssignShipmentModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
      />
    </div>
  );
};

export default LiveTracking;
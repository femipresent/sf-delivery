import React, { useState, useEffect } from 'react';
import DispatchBoard from '../../dispatchsidepages/DispatchBoard';
import Shipment from '../../dispatchsidepages/Shipments';
import FleetManagement from '../../dispatchsidepages/FleetManagement';
import LiveTracking from '../../dispatchsidepages/LiveTracking';
import Drivers from '../../dispatchsidepages/Drivers';
import Customers from '../../dispatchsidepages/Customers';
import Billing from '../../dispatchsidepages/Billing';
import POD from '../../dispatchsidepages/POD';
import Analytics from '../../dispatchsidepages/Analytics';

import {
  HomeIcon,
  MapIcon,
  TruckIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  BellIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowUpTrayIcon,
  FunnelIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  SignalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  WalletIcon,
  CreditCardIcon,
  BanknotesIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  ClipboardIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Shipments from '../../dispatchsidepages/Shipments';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-red-200"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading Dispatch Board...</p>
      <p className="text-sm text-gray-500">Preparing your logistics operations</p>
    </div>
  </div>
);

// Small inline loader
const InlineLoader = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-600 border-t-transparent"></div>
    <span className="ml-2 text-sm text-gray-600">Loading...</span>
  </div>
);

// Main Layout Component
const DispatcherLayout = ({ children, activeTab = 'dashboard', onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Shipment Request', message: 'FTL shipment from Lagos to Abuja', time: '5 mins ago', unread: true, type: 'shipment' },
    { id: 2, title: 'Driver Check-in', message: 'Musa Ibrahim checked in for duty', time: '15 mins ago', unread: true, type: 'driver' },
    { id: 3, title: 'POD Captured', message: 'POD for Shipment #7890 captured', time: '1 hour ago', unread: false, type: 'pod' },
    { id: 4, title: 'Delivery Delay', message: 'Traffic delay on Lagos-Ibadan Expressway', time: '2 hours ago', unread: false, type: 'alert' },
  ]);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipmentDetailsOpen, setShipmentDetailsOpen] = useState(false);
  const [assignDriverOpen, setAssignDriverOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [newShipmentOpen, setNewShipmentOpen] = useState(false);
  const [messageDriverOpen, setMessageDriverOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [newShipmentForm, setNewShipmentForm] = useState({
    type: 'FTL',
    origin: '',
    destination: '',
    customer: '',
    priority: 'medium',
    cargoType: '',
    weight: '',
    dimensions: '',
    value: '',
    pickupAddress: '',
    pickupContact: '',
    pickupPhone: '',
    pickupTime: '',
    deliveryAddress: '',
    deliveryContact: '',
    deliveryPhone: '',
    deliveryTime: ''
  });

  // Simulate initial loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate data loading when switching tabs
  useEffect(() => {
    if (currentTab) {
      setDataLoading(true);
      const timer = setTimeout(() => {
        setDataLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentTab]);

  // State for all functionalities
  const [dispatchBoard, setDispatchBoard] = useState({
    pending: [
      { 
        id: 'SH-7890', 
        type: 'FTL', 
        origin: 'Lagos', 
        destination: 'Abuja', 
        customer: 'ABC Manufacturing', 
        priority: 'high', 
        createdAt: '09:30 AM',
        cargo: { type: 'Electronics', weight: '150 kg', dimensions: '2.5 x 1.5 x 1.2 m', value: '₦2,500,000' },
        pickup: { address: '123 Warehouse St, Industrial Park', time: '10:30 AM', contact: 'John Smith', phone: '0803 123 4567' },
        delivery: { address: '456 Downtown Mall, City Center', time: '11:45 AM', contact: 'Sarah Johnson', phone: '0805 456 7890' }
      },
      { 
        id: 'SH-7891', 
        type: 'LTL', 
        origin: 'Ikeja', 
        destination: 'Victoria Island', 
        customer: 'XYZ Retail', 
        priority: 'medium', 
        createdAt: '10:15 AM',
        cargo: { type: 'Clothing', weight: '45 kg', dimensions: '1.5 x 1.0 x 0.8 m', value: '₦850,000' },
        pickup: { address: 'Retail Outlet, Ikeja', time: '11:00 AM', contact: 'Mr. Ade', phone: '0802 111 2222' },
        delivery: { address: 'Victoria Island Mall', time: '12:30 PM', contact: 'Mrs. Bello', phone: '0905 333 4444' }
      },
    ],
    assigned: [
      { 
        id: 'SH-7889', 
        driver: 'Musa Ibrahim', 
        vehicle: 'Toyota Hilux', 
        pickupTime: '11:00 AM', 
        status: 'en-route-pickup',
        driverPhone: '0808 123 4567',
        currentLocation: 'Ikeja',
        progress: 30
      },
      { 
        id: 'SH-7888', 
        driver: 'Chinedu Okoro', 
        vehicle: 'Ford Ranger', 
        pickupTime: '10:45 AM', 
        status: 'at-pickup',
        driverPhone: '0809 987 6543',
        currentLocation: 'Apapa Port',
        progress: 60
      },
    ],
    inProgress: [
      { 
        id: 'SH-7887', 
        driver: 'Amina Yusuf', 
        vehicle: 'Nissan Navara', 
        deliveryETA: '12:30 PM', 
        currentLocation: 'Ibadan Expressway',
        driverPhone: '0812 345 6789',
        status: 'in-transit',
        progress: 75,
        trackingUrl: '#'
      },
      { 
        id: 'SH-7886', 
        driver: 'Emeka Nwachukwu', 
        vehicle: 'Toyota Hiace', 
        deliveryETA: '1:15 PM', 
        currentLocation: 'Apapa',
        driverPhone: '0703 456 7890',
        status: 'in-transit',
        progress: 50,
        trackingUrl: '#'
      },
    ]
  });

  // Available drivers with contact info
  const [availableDrivers, setAvailableDrivers] = useState([
    { id: 1, name: 'Musa Ibrahim', status: 'available', vehicle: 'Toyota Hilux', capacity: '5 tons', location: 'Ikeja', rating: 4.8, phone: '0808 123 4567' },
    { id: 2, name: 'Chinedu Okoro', status: 'on-job', vehicle: 'Ford Ranger', capacity: '3 tons', location: 'Victoria Island', rating: 4.6, phone: '0809 987 6543' },
    { id: 3, name: 'Amina Yusuf', status: 'available', vehicle: 'Nissan Navara', capacity: '4 tons', location: 'Lekki', rating: 4.9, phone: '0812 345 6789' },
    { id: 4, name: 'Emeka Nwachukwu', status: 'on-job', vehicle: 'Toyota Hiace', capacity: '2 tons', location: 'Apapa', rating: 4.5, phone: '0703 456 7890' },
    { id: 5, name: 'Ahmed Bello', status: 'available', vehicle: 'Mercedes Sprinter', capacity: '3.5 tons', location: 'Surulere', rating: 4.7, phone: '0810 111 2222' },
    { id: 6, name: 'Grace Okafor', status: 'available', vehicle: 'Mitsubishi Canter', capacity: '6 tons', location: 'Yaba', rating: 4.8, phone: '0905 333 4444' },
  ]);

  // Dashboard KPIs
  const [dashboardStats, setDashboardStats] = useState({
    totalShipments: { today: 42, week: 285, month: 1120, trend: '+12%' },
    onTimeRate: { percentage: 94.2, target: 95, trend: '+1.5%' },
    activeVehicles: { count: 24, available: 18, onJob: 6 },
    revenue: { today: 1250000, week: 8500000, month: 28500000, trend: '+8.3%' },
    pendingShipments: 12,
    deliveryExceptions: 3
  });

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-job': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'en-route-pickup': return 'bg-yellow-100 text-yellow-800';
      case 'at-pickup': return 'bg-orange-100 text-orange-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // ===== FIXED NAVIGATION =====
  // Removed duplicate "Dashboard" and "Dispatch Board" issue
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, key: 'dashboard' },
    { name: 'Dispatch Board', icon: ClipboardDocumentListIcon, key: 'dispatch' },
    { name: 'Shipments', icon: TruckIcon, key: 'shipments' },
    { name: 'Fleet Management', icon: TruckIcon, key: 'fleet' },
    { name: 'Live Tracking', icon: MapIcon, key: 'live-tracking' },
    { name: 'Drivers', icon: UsersIcon, key: 'drivers' },
    { name: 'Customers', icon: UsersIcon, key: 'customers' },
    { name: 'Proof of Delivery', icon: ClipboardDocumentCheckIcon, key: 'pod' },
    { name: 'Billing & Payments', icon: CurrencyDollarIcon, key: 'billing' },
    { name: 'Analytics', icon: ChartBarIcon, key: 'analytics' },
    { name: 'Documents', icon: DocumentTextIcon, key: 'documents' },
    { name: 'Settings', icon: Cog6ToothIcon, key: 'settings' }
  ];

  // ===== FUNCTIONALITY FUNCTIONS =====

  // 1. View Shipment Details
  const handleViewShipmentDetails = (shipment) => {
    setSelectedShipment(shipment);
    setShipmentDetailsOpen(true);
  };

  // 2. Assign Driver
  const handleAssignDriver = (shipment) => {
    setSelectedShipment(shipment);
    setAssignDriverOpen(true);
  };

  // 3. Assign Driver to Shipment
  const handleAssignDriverToShipment = (driverId) => {
    if (!selectedShipment) return;
    
    const driver = availableDrivers.find(d => d.id === driverId);
    if (!driver) return;

    // Show loading
    setDataLoading(true);

    // Update dispatch board - move from pending to assigned
    setDispatchBoard(prev => {
      const updatedPending = prev.pending.filter(s => s.id !== selectedShipment.id);
      const newAssigned = {
        ...selectedShipment,
        driver: driver.name,
        vehicle: driver.vehicle,
        driverPhone: driver.phone,
        status: 'en-route-pickup',
        pickupTime: 'Now',
        progress: 10
      };
      
      return {
        ...prev,
        pending: updatedPending,
        assigned: [...prev.assigned, newAssigned]
      };
    });

    // Update driver status
    setAvailableDrivers(prev => 
      prev.map(d => d.id === driverId ? { ...d, status: 'on-job' } : d)
    );

    setTimeout(() => {
      setDataLoading(false);
      setAssignDriverOpen(false);
      setSelectedShipment(null);
    }, 500);
  };

  // 4. Track Shipment Live
  const handleTrackShipment = (shipment) => {
    setSelectedShipment(shipment);
    setTrackingOpen(true);
    setCurrentTab('live-tracking');
  };

  // 5. Update Shipment Status
  const handleUpdateShipmentStatus = (shipmentId, newStatus) => {
    setDataLoading(true);
    
    setDispatchBoard(prev => {
      // Check in assigned
      const assignedIndex = prev.assigned.findIndex(s => s.id === shipmentId);
      if (assignedIndex !== -1) {
        const updatedAssigned = [...prev.assigned];
        const shipment = updatedAssigned[assignedIndex];
        
        if (newStatus === 'in-transit') {
          // Move from assigned to inProgress
          updatedAssigned.splice(assignedIndex, 1);
          const newInProgress = {
            ...shipment,
            status: newStatus,
            progress: 50
          };
          setTimeout(() => setDataLoading(false), 300);
          return {
            ...prev,
            assigned: updatedAssigned,
            inProgress: [...prev.inProgress, newInProgress]
          };
        }
        
        // Just update status in assigned
        updatedAssigned[assignedIndex] = { ...shipment, status: newStatus };
        setTimeout(() => setDataLoading(false), 300);
        return { ...prev, assigned: updatedAssigned };
      }

      // Check in inProgress
      const inProgressIndex = prev.inProgress.findIndex(s => s.id === shipmentId);
      if (inProgressIndex !== -1) {
        const updatedInProgress = [...prev.inProgress];
        const shipment = updatedInProgress[inProgressIndex];
        
        if (newStatus === 'delivered') {
          // Remove from inProgress (delivered)
          updatedInProgress.splice(inProgressIndex, 1);
          
          // Update driver status back to available
          const driver = availableDrivers.find(d => d.name === shipment.driver);
          if (driver) {
            setAvailableDrivers(prevDrivers => 
              prevDrivers.map(d => d.name === shipment.driver ? { ...d, status: 'available' } : d)
            );
          }
          
          setTimeout(() => setDataLoading(false), 300);
          return { ...prev, inProgress: updatedInProgress };
        }
        
        // Update status in inProgress
        updatedInProgress[inProgressIndex] = { 
          ...shipment, 
          status: newStatus,
          progress: newStatus === 'delivery-arrived' ? 90 : shipment.progress
        };
        setTimeout(() => setDataLoading(false), 300);
        return { ...prev, inProgress: updatedInProgress };
      }

      setTimeout(() => setDataLoading(false), 300);
      return prev;
    });
  };

  // 6. Call Driver
  const handleCallDriver = (phoneNumber) => {
    setDataLoading(true);
    // In a real app, this would initiate a phone call
    // For demo, we'll show a confirmation
    console.log(`Calling driver at ${phoneNumber}`);
    // Simulate call
    console.log(`Dialing ${phoneNumber}...`);
    
    setTimeout(() => setDataLoading(false), 500);
  };

  // 7. Text Driver - Open messaging modal
  const handleTextDriver = (driver, message = '') => {
    setSelectedDriver(driver);
    setMessageText(message);
    setMessageDriverOpen(true);
  };

  // 8. Send Message to Driver
  const handleSendMessage = () => {
    if (!selectedDriver || !messageText.trim()) return;
    
    setDataLoading(true);
    
    // In a real app, this would send the message
    console.log(`Sending message to ${selectedDriver.name} (${selectedDriver.phone}): ${messageText}`);
    
    // Clear and close
    setTimeout(() => {
      setMessageText('');
      setMessageDriverOpen(false);
      setSelectedDriver(null);
      setDataLoading(false);
    }, 800);
  };

  // 9. Create New Shipment
  const handleCreateNewShipment = () => {
    setNewShipmentOpen(true);
  };

  // 10. Submit New Shipment
  const handleSubmitNewShipment = () => {
    setDataLoading(true);
    
    // Generate new shipment ID
    const newId = `SH-${Math.floor(Math.random() * 9000 + 1000)}`;
    
    // Create new shipment object
    const newShipment = {
      id: newId,
      type: newShipmentForm.type,
      origin: newShipmentForm.origin,
      destination: newShipmentForm.destination,
      customer: newShipmentForm.customer,
      priority: newShipmentForm.priority,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cargo: {
        type: newShipmentForm.cargoType,
        weight: newShipmentForm.weight,
        dimensions: newShipmentForm.dimensions,
        value: newShipmentForm.value
      },
      pickup: {
        address: newShipmentForm.pickupAddress,
        time: newShipmentForm.pickupTime,
        contact: newShipmentForm.pickupContact,
        phone: newShipmentForm.pickupPhone
      },
      delivery: {
        address: newShipmentForm.deliveryAddress,
        time: newShipmentForm.deliveryTime,
        contact: newShipmentForm.deliveryContact,
        phone: newShipmentForm.deliveryPhone
      }
    };

    // Add to pending shipments
    setDispatchBoard(prev => ({
      ...prev,
      pending: [...prev.pending, newShipment]
    }));

    // Update dashboard stats
    setDashboardStats(prev => ({
      ...prev,
      totalShipments: {
        ...prev.totalShipments,
        today: prev.totalShipments.today + 1,
        week: prev.totalShipments.week + 1,
        month: prev.totalShipments.month + 1
      },
      pendingShipments: prev.pendingShipments + 1
    }));

    // Reset form and close modal
    setTimeout(() => {
      setNewShipmentForm({
        type: 'FTL',
        origin: '',
        destination: '',
        customer: '',
        priority: 'medium',
        cargoType: '',
        weight: '',
        dimensions: '',
        value: '',
        pickupAddress: '',
        pickupContact: '',
        pickupPhone: '',
        pickupTime: '',
        deliveryAddress: '',
        deliveryContact: '',
        deliveryPhone: '',
        deliveryTime: ''
      });
      setNewShipmentOpen(false);
      setDataLoading(false);
    }, 1000);
  };

  // 11. View All Drivers
  const handleViewAllDrivers = () => {
    setCurrentTab('drivers');
  };

  // 12. Mark Notification as Read
  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false } 
          : notification
      )
    );
  };

  // 13. Clear All Notifications
  const handleClearAllNotifications = () => {
    setDataLoading(true);
    setTimeout(() => {
      setNotifications([]);
      setNotificationMenuOpen(false);
      setDataLoading(false);
    }, 500);
  };

  // 14. Refresh Data
  const handleRefreshData = () => {
    setDataLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDataLoading(false);
      // Add a new notification for refresh
      setNotifications(prev => [
        {
          id: prev.length + 1,
          title: 'Data Refreshed',
          message: 'Dispatch board data has been refreshed',
          time: 'Just now',
          unread: true,
          type: 'alert'
        },
        ...prev
      ]);
    }, 1200);
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
              <p className="text-gray-600">{shipment.cargo?.type} • {shipment.cargo?.weight}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Pickup Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium">{shipment.pickup?.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm font-medium">{shipment.pickup?.contact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{shipment.pickup?.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium">{shipment.pickup?.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Delivery Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium">{shipment.delivery?.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm font-medium">{shipment.delivery?.contact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{shipment.delivery?.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium">{shipment.delivery?.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Cargo Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium">{shipment.cargo?.type}</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="text-sm font-medium">{shipment.cargo?.weight}</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-xs text-gray-500">Dimensions</p>
                  <p className="text-sm font-medium">{shipment.cargo?.dimensions}</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-xs text-gray-500">Value</p>
                  <p className="text-sm font-medium">{shipment.cargo?.value}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  onClose();
                  handleTrackShipment(shipment);
                }}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all flex items-center justify-center">
                <MapIcon className="w-5 h-5 mr-2" />
                Track Live
              </button>
              <button 
                onClick={() => {
                  onClose();
                  handleAssignDriver(shipment);
                }}
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all flex items-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Assign Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Assign Driver Modal
  const AssignDriverModal = ({ shipment, isOpen, onClose }) => {
    if (!isOpen || !shipment) return null;

    const availableDriversList = availableDrivers.filter(driver => driver.status === 'available');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Assign Driver to #{shipment.id}</h2>
              <p className="text-gray-600">Select an available driver</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Shipment Details</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium">{shipment.cargo?.type} • {shipment.cargo?.weight}</p>
                <p className="text-sm text-gray-600">{shipment.origin} → {shipment.destination}</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Available Drivers ({availableDriversList.length})</h3>
            <div className="space-y-3">
              {availableDriversList.map((driver) => (
                <div key={driver.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{driver.name}</h4>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-gray-500">{driver.vehicle}</span>
                          <span className="text-xs text-gray-500">{driver.capacity}</span>
                          <span className="text-xs text-gray-500">{driver.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleCallDriver(driver.phone)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                        title="Call Driver">
                        <PhoneIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleTextDriver(driver)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                        title="Text Driver">
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          handleAssignDriverToShipment(driver.id);
                          onClose();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all">
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Message Driver Modal
  const MessageDriverModal = ({ driver, isOpen, onClose }) => {
    if (!isOpen || !driver) return null;

    const commonMessages = [
      "Please proceed to pickup location immediately",
      "ETA update requested",
      "Delivery completed successfully?",
      "Any issues with the shipment?",
      "Traffic alert on your route"
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Message Driver</h2>
              <p className="text-gray-600">Send message to {driver.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Messages</h3>
              <div className="space-y-2">
                {commonMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => setMessageText(message)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700"
                  >
                    {message}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Message
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Type your message here..."
              />
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleSendMessage}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all">
                Send Message
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New Shipment Modal
  const NewShipmentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
      setNewShipmentForm(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Shipment</h2>
              <p className="text-gray-600">Fill in all shipment details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Type</label>
                  <select
                    value={newShipmentForm.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="FTL">FTL (Full Truck Load)</option>
                    <option value="LTL">LTL (Less Than Truckload)</option>
                    <option value="express">Express</option>
                    <option value="same-day">Same Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={newShipmentForm.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Lagos"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={newShipmentForm.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Abuja"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <input
                    type="text"
                    value={newShipmentForm.customer}
                    onChange={(e) => handleInputChange('customer', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newShipmentForm.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Cargo Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Cargo Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type</label>
                  <input
                    type="text"
                    value={newShipmentForm.cargoType}
                    onChange={(e) => handleInputChange('cargoType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Electronics, Clothing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={newShipmentForm.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 150 kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={newShipmentForm.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 2.5 x 1.5 x 1.2 m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value (₦)</label>
                  <input
                    type="text"
                    value={newShipmentForm.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 2,500,000"
                  />
                </div>
              </div>
            </div>

            {/* Pickup & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Pickup Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newShipmentForm.pickupAddress}
                    onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="2"
                    placeholder="Full pickup address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newShipmentForm.pickupContact}
                    onChange={(e) => handleInputChange('pickupContact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newShipmentForm.pickupPhone}
                    onChange={(e) => handleInputChange('pickupPhone', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={newShipmentForm.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 10:30 AM"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Delivery Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={newShipmentForm.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="2"
                    placeholder="Full delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newShipmentForm.deliveryContact}
                    onChange={(e) => handleInputChange('deliveryContact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newShipmentForm.deliveryPhone}
                    onChange={(e) => handleInputChange('deliveryPhone', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={newShipmentForm.deliveryTime}
                    onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 11:45 AM"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button 
                onClick={handleSubmitNewShipment}
                disabled={dataLoading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {dataLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating...
                  </>
                ) : 'Create Shipment'}
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Stats Component
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Shipments</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.totalShipments.today}</p>
            <p className="text-xs text-gray-500">
              <span className="text-green-600 font-medium">{dashboardStats.totalShipments.trend}</span> vs yesterday
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TruckIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">On-Time Delivery Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.onTimeRate.percentage}%</p>
            <p className="text-xs text-gray-500">
              Target: <span className="font-medium">{dashboardStats.onTimeRate.target}%</span>
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <CheckCircleIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Vehicles</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardStats.activeVehicles.count}</p>
            <p className="text-xs text-green-600 font-medium">
              {dashboardStats.activeVehicles.available} available
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TruckIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Today's Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(dashboardStats.revenue.today)}</p>
            <p className="text-xs text-green-600 font-medium">
              {dashboardStats.revenue.trend} increase
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <CurrencyDollarIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );

  // Dispatch Board Component
  const DispatchBoard = () => (
    <div className="bg-white border border-gray-200 rounded-2xl mb-6">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Dispatch Board</h2>
            <p className="text-sm text-gray-500">Manage shipments & assignments</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRefreshData}
              disabled={dataLoading}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
              title="Refresh">
              <ArrowPathIcon className={`h-5 w-5 ${dataLoading ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
        {/* Pending Shipments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Pending ({dispatchBoard.pending.length})</h3>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Requires Assignment
            </span>
          </div>
          <div className="space-y-3">
            {dispatchBoard.pending.map((shipment) => (
              <div key={shipment.id} className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{shipment.id}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(shipment.priority)}`}>
                      {shipment.priority} priority
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{shipment.createdAt}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span>{shipment.origin} → {shipment.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{shipment.customer}</span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={() => handleAssignDriver(shipment)}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all">
                    Assign Driver
                  </button>
                  <button 
                    onClick={() => handleViewShipmentDetails(shipment)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Shipments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Assigned ({dispatchBoard.assigned.length})</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Ready for Pickup
            </span>
          </div>
          <div className="space-y-3">
            {dispatchBoard.assigned.map((shipment) => (
              <div key={shipment.id} className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{shipment.id}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{shipment.pickupTime}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{shipment.driver}</span>
                  </div>
                  <div className="flex items-center">
                    <TruckIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{shipment.vehicle}</span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={() => handleViewShipmentDetails(shipment)}
                    className="flex-1 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-full transition-all">
                    View Details
                  </button>
                  <button 
                    onClick={() => handleTrackShipment(shipment)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all">
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <button 
                    onClick={() => handleCallDriver(shipment.driverPhone)}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full transition-all flex items-center justify-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Call Driver
                  </button>
                  <button 
                    onClick={() => handleUpdateShipmentStatus(shipment.id, 'in-transit')}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-all">
                    Mark In Transit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">In Progress ({dispatchBoard.inProgress.length})</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              In Transit
            </span>
          </div>
          <div className="space-y-3">
            {dispatchBoard.inProgress.map((shipment) => (
              <div key={shipment.id} className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{shipment.id}</h4>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {shipment.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">ETA: {shipment.deliveryETA}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{shipment.driver}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-red-500 mr-2" />
                    <span>{shipment.currentLocation}</span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <button 
                    onClick={() => handleTrackShipment(shipment)}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md">
                    Track Live
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleCallDriver(shipment.driverPhone)}
                      className="flex-1 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-full transition-all flex items-center justify-center">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      Call
                    </button>
                    <button 
                      onClick={() => handleUpdateShipmentStatus(shipment.id, 'delivery-arrived')}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-all">
                      At Delivery
                    </button>
                    <button 
                      onClick={() => handleUpdateShipmentStatus(shipment.id, 'delivered')}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-all">
                      Delivered
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Available Drivers Component
  const AvailableDriversComponent = () => (
    <div className="bg-white border border-gray-200 rounded-2xl">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Available Drivers ({availableDrivers.filter(d => d.status === 'available').length})</h2>
            <p className="text-sm text-gray-500">Manage driver assignments</p>
          </div>
          <button 
            onClick={handleViewAllDrivers}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md">
            View All Drivers
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {availableDrivers.slice(0, 4).map((driver) => (
          <div key={driver.id} className="p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{driver.name}</h3>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.status)}`}>
                      {driver.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">{driver.vehicle}</span>
                    <span className="text-xs text-gray-500">{driver.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center">
                    <SignalIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium">{driver.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{driver.phone}</p>
                  <span className="text-xs text-gray-500">Contact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleCallDriver(driver.phone)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                    title="Call Driver">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleTextDriver(driver)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                    title="Text Driver">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Notifications Dropdown
  const NotificationsDropdown = () => (
    <div className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 ${
      notificationMenuOpen ? 'block' : 'hidden'
    }`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          <button 
            onClick={handleClearAllNotifications}
            disabled={dataLoading}
            className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {dataLoading ? 'Clearing...' : 'Clear All'}
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                notification.unread ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleMarkNotificationAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.type === 'shipment' && (
                    <TruckIcon className="h-5 w-5 text-blue-500" />
                  )}
                  {notification.type === 'driver' && (
                    <UserCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                  {notification.type === 'pod' && (
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-purple-500" />
                  )}
                  {notification.type === 'alert' && (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t">
        <button 
          onClick={() => setNotificationMenuOpen(false)}
          className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
          View All Notifications
        </button>
      </div>
    </div>
  );

  // User Menu Dropdown
  const UserMenuDropdown = () => (
    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 ${
      userMenuOpen ? 'block' : 'hidden'
    }`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">David Thompson</p>
            <p className="text-xs text-gray-500">Dispatcher</p>
          </div>
        </div>
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            <UserCircleIcon className="inline-block w-4 h-4 mr-2" />
            Profile Settings
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            <Cog6ToothIcon className="inline-block w-4 h-4 mr-2" />
            Preferences
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            <InformationCircleIcon className="inline-block w-4 h-4 mr-2" />
            Help & Support
          </button>
        </div>
      </div>
      <div className="border-t p-3">
        <button 
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
          <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );

  // Main Content Area
  const MainContent = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispatch Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your logistics operations</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleRefreshData}
              disabled={dataLoading}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <ArrowPathIcon className={`h-5 w-5 ${dataLoading ? 'animate-spin' : ''}`} />
            </button>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Operational
            </span>
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {dataLoading ? <InlineLoader /> : (
        <>
          <DashboardStats />
          <DispatchBoard />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AvailableDriversComponent />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleCreateNewShipment}
                    className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all shadow-sm hover:shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create New Shipment
                  </button>
                  <button 
                    onClick={() => setCurrentTab('shipments')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all">
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                    Bulk Upload
                  </button>
                  <button 
                    onClick={() => setCurrentTab('live-tracking')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all">
                    <MapIcon className="h-5 w-5 mr-2" />
                    Live Tracking Map
                  </button>
                  <button 
                    onClick={() => setCurrentTab('billing')}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Generate Invoice
                  </button>
                </div>
              </div>

              <div className="bg-white border border-red-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-red-900">Delivery Exceptions</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    {dashboardStats.deliveryExceptions} Issues
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Failed Delivery</p>
                        <p className="text-xs text-red-700">Shipment #7885 - Recipient unavailable</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Delayed Shipment</p>
                        <p className="text-xs text-yellow-700">Shipment #7887 - Traffic delay</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('pod')}
                    className="w-full py-2 text-center text-red-600 hover:text-red-700 text-sm font-medium rounded-full hover:bg-red-50">
                    View all exceptions →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  

  

  

  

  // Modals
  const renderModals = () => (
    <>
      <ShipmentDetailsModal
        shipment={selectedShipment}
        isOpen={shipmentDetailsOpen}
        onClose={() => {
          setShipmentDetailsOpen(false);
          setSelectedShipment(null);
        }}
      />
      
      <AssignDriverModal
        shipment={selectedShipment}
        isOpen={assignDriverOpen}
        onClose={() => {
          setAssignDriverOpen(false);
          setSelectedShipment(null);
        }}
      />
      
      <MessageDriverModal
        driver={selectedDriver}
        isOpen={messageDriverOpen}
        onClose={() => {
          setMessageDriverOpen(false);
          setSelectedDriver(null);
          setMessageText('');
        }}
      />
      
      <NewShipmentModal
        isOpen={newShipmentOpen}
        onClose={() => {
          setNewShipmentOpen(false);
          setNewShipmentForm({
            type: 'FTL',
            origin: '',
            destination: '',
            customer: '',
            priority: 'medium',
            cargoType: '',
            weight: '',
            dimensions: '',
            value: '',
            pickupAddress: '',
            pickupContact: '',
            pickupPhone: '',
            pickupTime: '',
            deliveryAddress: '',
            deliveryContact: '',
            deliveryPhone: '',
            deliveryTime: ''
          });
        }}
      />
    </>
  );

  // Mobile Sidebar - RED THEME
  const MobileSidebar = () => (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <div className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-red-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="S&F Delivery Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <h1 className="text-base font-bold text-gray-900">S&F Delivery</h1>
                <p className="text-xs text-gray-500">Dispatcher Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1.5">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setCurrentTab(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-full transition-all ${
                    currentTab === item.key
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                  alt="Dispatcher Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-900">David Thompson</p>
                <p className="text-xs text-gray-500">Dispatcher • DT-7890</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Desktop Sidebar - RED THEME
  const DesktopSidebar = () => (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-red-500">
            <img
              src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
              alt="S&F Delivery Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900">S&F Delivery</h1>
            <p className="text-xs text-gray-500">Dispatcher Portal</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentTab(item.key)}
              className={`flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-full transition-all ${
                currentTab === item.key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-5 border-t">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
              alt="Dispatcher Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">David Thompson</p>
            <p className="text-xs text-gray-500">Dispatcher • DT-7890</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  // Show loader while initial loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full">
      {renderModals()}
      <MobileSidebar />
      <DesktopSidebar />

      <div className="lg:pl-64 w-full overflow-x-hidden">
        {/* Header - RED THEME */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg mr-1.5"
              >
                <Bars3Icon className="w-4 h-4 text-gray-500" />
              </button>
              <div className="w-7 h-7 rounded-lg overflow-hidden border-2 border-red-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-1.5">
                <h2 className="text-sm font-bold text-gray-900">S&F Delivery</h2>
                <p className="text-xs text-gray-500">Dispatcher</p>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shipments, drivers, customers..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                disabled={dataLoading}
                className="p-1.5 hover:bg-gray-100 rounded-full relative transition-all disabled:opacity-50"
              >
                <BellIcon className="w-4 h-4 text-gray-500" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={handleRefreshData}
                disabled={dataLoading}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
                title="Refresh Data"
              >
                <ArrowPathIcon className={`w-4 h-4 text-gray-500 ${dataLoading ? 'animate-spin' : ''}`} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  disabled={dataLoading}
                  className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-red-500">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDownIcon className="w-3 h-3 text-gray-500" />
                </button>
                
                <NotificationsDropdown />
                <UserMenuDropdown />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full overflow-x-hidden">
          {dataLoading && currentTab === 'dashboard' && (
            <div className="p-6">
              <InlineLoader />
            </div>
          )}
          
          {currentTab === 'dashboard' && <MainContent />}
          {currentTab === 'dispatch' && <DispatchBoard />}
          {currentTab === 'shipments' && <Shipments/>}
          {currentTab === 'fleet' && <FleetManagement />}
          {currentTab === 'live-tracking' && <LiveTracking />}
          {currentTab === 'drivers' && <Drivers />}
          {currentTab === 'customers' && <Customers />}
          {currentTab === 'pod' && <POD />}
          {currentTab === 'billing' && <Billing />}
          {currentTab === 'analytics' && <Analytics />}
          {currentTab === 'documents' && <Documents />}
          {currentTab === 'settings' && <Settings />}
          
          {/* Render imported DispatchBoardComponent when on dispatch-board route */}
          {currentTab === 'dispatch-board' && <DispatchBoard/>}
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DispatcherLayout;
import React, { useState, useEffect } from 'react';
import ActiveJobsPage from '../../driversidepages/ActiveJobspage';
import NavigationSystem from '../../driversidepages/NavigationSystem';
import EarningsPage from '../../driversidepages/EarningsPage';
import SchedulePage from '../../driversidepages/SchedulePage';
import DriverPerformance from '../../driversidepages/DriverPerformance';
import DocumentsPage from '../../driversidepages/DocumentsPage';
import DriverSettings from '../../driversidepages/DriverSettings';
import MyTruckPage from '../../driversidepages/MyTruckPage';
import ThemeToggle from '../ThemeToggle';
import {
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
  ShieldCheckIcon,
  PhotoIcon,
  UserCircleIcon,
  PhoneIcon,
  HomeIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  WifiIcon,
  SignalIcon,
  Battery50Icon,
  ArrowPathIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  CameraIcon,
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon as ChevronRightSolid,
  ArrowsRightLeftIcon,
  CogIcon,
  Battery100Icon,
  FireIcon,
  IdentificationIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

// ==================== UTILITIES ====================
const Loader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-200 border-t-blue-600`}></div>
  );
};

const formatCurrency = (amount) => {
  return `₦${amount?.toLocaleString('en-NG') || '0'}`;
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ==================== COMPONENTS ====================
const StatCard = ({ title, value, icon: Icon, color, description, suffix, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 w-full text-left"
  >
    <div className="flex items-start justify-between mb-2 md:mb-3">
      <div className={`p-2 md:p-2.5 rounded-full ${color?.bg || 'bg-blue-50'} ${color?.text || 'text-blue-600'}`}>
        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
      </div>
    </div>
   
    <div className="mb-1 md:mb-2">
      <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-lg md:text-xl font-bold text-gray-900">
        {suffix === '₦' ? formatCurrency(value) : value}{suffix === '%' ? '%' : ''}
      </p>
    </div>
   
    {description && (
      <p className="text-xs text-gray-500 truncate">{description}</p>
    )}
  </button>
);

const StatusBadge = ({ status, type = 'driver' }) => {
  const statusConfig = {
    driver: {
      'available': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Available', icon: CheckCircleIcon },
      'on-job': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'On Job', icon: TruckIcon },
      'offline': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Offline', icon: ClockIcon },
      'on-break': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'On Break', icon: PauseCircleIcon }
    },
    job: {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'accepted': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Accepted' },
      'picked-up': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Picked Up' },
      'in-transit': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Transit' },
      'delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
      'failed': { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' }
    }
  };
 
  const config = statusConfig[type][status] || statusConfig[type]['pending'];
  const Icon = config.icon;
 
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.text} flex items-center`}>
      {Icon && <Icon className="w-3.5 h-3.5 mr-1.5" />}
      {config.label}
    </span>
  );
};

// Profile Modal Component
const ProfileModal = ({ driver, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl md:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Driver Profile</h2>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="text-center mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-blue-500 mx-auto mb-3 md:mb-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
              alt="Driver Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">{driver.name}</h3>
          <p className="text-blue-600 font-medium text-sm md:text-base">Driver ID: {driver.id}</p>
          <div className="flex items-center justify-center mt-1 md:mt-2">
            <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-medium text-sm md:text-base">{driver.rating}</span>
            <span className="text-gray-500 ml-2 text-xs md:text-sm">({driver.completedJobs} deliveries)</span>
          </div>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <div className="bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <UserCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3" />
              <h4 className="font-medium text-gray-900 text-sm md:text-base">Personal Information</h4>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center text-xs md:text-sm">
                <EnvelopeIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mr-1.5 md:mr-2" />
                <span className="text-gray-600">{driver.email}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm">
                <PhoneIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mr-1.5 md:mr-2" />
                <span className="text-gray-600">{driver.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl md:rounded-2xl p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <TruckIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3" />
              <h4 className="font-medium text-gray-900 text-sm md:text-base">Vehicle Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium">{driver.vehicle.type}</p>
              </div>
              <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl">
                <p className="text-xs text-gray-500">Plate</p>
                <p className="text-sm font-medium">{driver.vehicle.plate}</p>
              </div>
              <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl">
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="text-sm font-medium">{driver.vehicle.capacity}</p>
              </div>
              <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl">
                <p className="text-xs text-gray-500">Year</p>
                <p className="text-sm font-medium">{driver.vehicle.year}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-xl md:rounded-2xl p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <BuildingOfficeIcon className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mr-2 md:mr-3" />
              <h4 className="font-medium text-gray-900 text-sm md:text-base">Company Details</h4>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center text-xs md:text-sm">
                <IdentificationIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mr-1.5 md:mr-2" />
                <span className="text-gray-600">S&F Delivery Services Ltd.</span>
              </div>
              <div className="flex items-center text-xs md:text-sm">
                <MapPinIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mr-1.5 md:mr-2" />
                <span className="text-gray-600">Lagos Headquarters</span>
              </div>
            </div>
          </div>
          
          <button className="w-full py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors text-sm md:text-base">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ==================== DRIVER LAYOUT ====================
const DriverLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverStatus, setDriverStatus] = useState('available');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const driver = {
    name: 'Musa Ibrahim',
    id: 'DRV-7890',
    phone: '+234 812 345 6789',
    email: 'musa.ibrahim@s-fdelivery.ng',
    vehicle: {
      type: 'Toyota Hilux',
      plate: 'ABC-123XY',
      capacity: '1.5 Tons',
      color: 'White',
      year: '2022',
      fuelType: 'Diesel',
      mileage: '45,200 km',
      lastService: '2024-01-10',
      nextService: '2024-03-10',
      insuranceExpiry: '2024-06-30'
    },
    rating: 4.8,
    completedJobs: 247,
    todayEarnings: 18500,
    weeklyEarnings: 89200,
    monthlyEarnings: 342500
  };

  const jobs = [
    {
      id: 'DEL-7890',
      status: 'in-transit',
      pickup: {
        address: '123 Warehouse St, Industrial Park, Lagos',
        contact: 'John Smith',
        phone: '555-0123',
        time: '10:30 AM',
        completed: true,
        location: { lat: 6.5244, lng: 3.3792 }
      },
      delivery: {
        address: '456 Downtown Mall, City Center, Lagos',
        contact: 'Sarah Johnson',
        phone: '555-4567',
        time: '11:45 AM',
        completed: false,
        location: { lat: 6.4551, lng: 3.3942 }
      },
      cargo: {
        type: 'Electronics',
        description: 'Smartphones & Accessories',
        weight: '150 kg',
        dimensions: '2.5 x 1.5 x 1.2 m',
        value: '₦2,500,000',
        specialInstructions: 'Handle with care - Fragile items'
      },
      payment: {
        amount: 8500,
        type: 'COD + Commission',
        codAmount: 250000,
        commission: 425,
        totalEarnings: 8925
      }
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Job Assigned',
      message: 'Pickup from Warehouse A to Downtown Mall',
      time: '2 min ago',
      type: 'job',
      icon: <TruckIcon className="w-4 h-4 md:w-5 md:h-5" />,
      unread: true
    },
    {
      id: 2,
      title: 'Route Optimization',
      message: 'Traffic alert on Main St - alternate route suggested',
      time: '15 min ago',
      type: 'alert',
      icon: <ExclamationCircleIcon className="w-4 h-4 md:w-5 md:h-5" />,
      unread: true
    },
    {
      id: 3,
      title: 'Payment Received',
      message: '₦8,500 for Delivery #7890 has been processed',
      time: '1 hour ago',
      type: 'payment',
      icon: <CurrencyDollarIcon className="w-4 h-4 md:w-5 md:h-5" />,
      unread: false
    }
  ];

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, key: 'dashboard' },
    { name: 'Active Jobs', icon: TruckIcon, key: 'jobs' },
    { name: 'My Truck', icon: TruckIcon, key: 'truck' },
    { name: 'Navigation', icon: MapIcon, key: 'navigation' },
    { name: 'Earnings', icon: CurrencyDollarIcon, key: 'earnings' },
    { name: 'Schedule', icon: CalendarIcon, key: 'schedule' },
    { name: 'Performance', icon: ChartBarIcon, key: 'performance' },
    { name: 'Documents', icon: DocumentTextIcon, key: 'documents' },
    { name: 'Settings', icon: Cog6ToothIcon, key: 'settings' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentJob(jobs[0]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [jobs]);

  const handleStatusChange = (status) => {
    setDriverStatus(status);
  };

  const DashboardContent = () => {
    if (isLoading) {
      return (
        <div className="p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px] rounded-2xl">
          <div className="text-center">
            <Loader size="md md:lg" />
            <p className="mt-3 md:mt-4 text-blue-600 font-medium text-sm md:text-base">Loading driver dashboard...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-3 md:p-4 lg:p-6">
        {/* Welcome Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
            <div className="mb-3 md:mb-0">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, {driver.name}!</h1>
              <p className="text-gray-600 text-xs md:text-sm">Driver ID: {driver.id} • {driver.completedJobs} completed deliveries</p>
            </div>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-3">
              <div className="mb-2 md:mb-0">
                <StatusBadge status={driverStatus} type="driver" />
              </div>
              <div className="flex space-x-1.5 md:space-x-2">
                <button
                  onClick={() => handleStatusChange('available')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                    driverStatus === 'available'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => handleStatusChange('on-job')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                    driverStatus === 'on-job'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  On Job
                </button>
                <button
                  onClick={() => handleStatusChange('on-break')}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-xs md:text-sm font-medium transition-all"
                >
                  Break
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6">
            <StatCard
              title="Today's Earnings"
              value={driver.todayEarnings}
              icon={CurrencyDollarIcon}
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              suffix="₦"
              description="3 deliveries completed"
            />
            <StatCard
              title="Weekly Total"
              value={driver.weeklyEarnings}
              icon={ChartBarIcon}
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              suffix="₦"
              description="14 deliveries"
            />
            <StatCard
              title="Driver Rating"
              value={driver.rating}
              icon={ShieldCheckIcon}
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              suffix="/5"
              description="247 deliveries"
            />
            <StatCard
              title="Active Job"
              value={currentJob ? 'In Progress' : 'None'}
              icon={TruckIcon}
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              description={currentJob ? `ETA: ${jobs[0].delivery.time}` : 'Available for work'}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {/* Left Column - Current Job */}
          <div className="lg:col-span-2 space-y-4 md:space-y-5 lg:space-y-6">
            {/* Current Job Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-0">Current Delivery</h2>
                <StatusBadge status={currentJob?.status || 'pending'} type="job" />
              </div>

              {currentJob ? (
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Job Timeline */}
                  <div className="space-y-3 md:space-y-4">
                    {/* Pickup */}
                    <div className="flex items-start">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        jobs[0].pickup.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {jobs[0].pickup.completed ? (
                          <CheckCircleIcon className="w-4 h-4 md:w-6 md:h-6" />
                        ) : (
                          <MapPinIcon className="w-4 h-4 md:w-6 md:h-6" />
                        )}
                      </div>
                      <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm md:text-base">Pickup Location</p>
                        <p className="text-xs md:text-sm text-gray-600 truncate">{jobs[0].pickup.address}</p>
                        <div className="flex flex-wrap items-center mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                          <UserIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          <span>{jobs[0].pickup.contact}</span>
                          <PhoneIcon className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-4 mr-1 md:mr-2" />
                          <span>{jobs[0].pickup.phone}</span>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs md:text-sm font-medium text-gray-900">{jobs[0].pickup.time}</p>
                        {jobs[0].pickup.completed && (
                          <p className="text-xs text-green-600 mt-0.5">Completed</p>
                        )}
                      </div>
                    </div>

                    {/* Timeline connector */}
                    <div className="flex justify-center">
                      <div className="w-px h-4 md:h-6 bg-gray-300"></div>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-start">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        jobs[0].delivery.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {jobs[0].delivery.completed ? (
                          <CheckCircleIcon className="w-4 h-4 md:w-6 md:h-6" />
                        ) : (
                          <MapPinIcon className="w-4 h-4 md:w-6 md:h-6" />
                        )}
                      </div>
                      <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm md:text-base">Delivery Location</p>
                        <p className="text-xs md:text-sm text-gray-600 truncate">{jobs[0].delivery.address}</p>
                        <div className="flex flex-wrap items-center mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                          <UserIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          <span>{jobs[0].delivery.contact}</span>
                          <PhoneIcon className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-4 mr-1 md:mr-2" />
                          <span>{jobs[0].delivery.phone}</span>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs md:text-sm font-medium text-gray-900">{jobs[0].delivery.time}</p>
                        <p className="text-xs text-blue-600 mt-0.5">ETA: 25 min</p>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Details */}
                  <div className="bg-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4">
                    <div className="flex items-center mb-2 md:mb-3">
                      <div className="p-1.5 md:p-2 bg-blue-100 rounded-full mr-2 md:mr-3">
                        <PackageIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-600" />
                      </div>
                      <p className="font-medium text-gray-900 text-sm md:text-base">Cargo Details</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                      <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl">
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-xs md:text-sm font-medium">{jobs[0].cargo.type}</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl">
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="text-xs md:text-sm font-medium">{jobs[0].cargo.weight}</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl">
                        <p className="text-xs text-gray-500">Dimensions</p>
                        <p className="text-xs md:text-sm font-medium">{jobs[0].cargo.dimensions}</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl">
                        <p className="text-xs text-gray-500">Value</p>
                        <p className="text-xs md:text-sm font-medium">{jobs[0].cargo.value}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button 
                      onClick={() => setActiveTab('navigation')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 md:py-3 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg text-sm md:text-base">
                      <MapIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Navigate to Delivery
                    </button>
                    <button className="px-4 py-2.5 md:px-6 md:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all text-sm md:text-base">
                      <DocumentCheckIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 md:py-10">
                  <TruckIcon className="w-10 h-10 md:w-14 md:h-14 text-gray-300 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">No Active Job</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">You are currently available for new deliveries</p>
                  <button className="px-4 py-2.5 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-md text-sm md:text-base">
                    Check Available Jobs
                  </button>
                </div>
              )}
            </div>

            {/* Earnings History */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Earnings</h2>
                <button className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-full text-xs md:text-sm transition-all">
                  View All
                </button>
              </div>
              <div className="space-y-2 md:space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 md:p-4 border border-gray-100 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm md:text-base truncate">Delivery #{7890 - item}</p>
                      <p className="text-xs md:text-sm text-gray-600 truncate">Downtown Mall • Electronics</p>
                    </div>
                    <div className="text-right ml-2 flex-shrink-0">
                      <p className="font-medium text-gray-900 text-sm md:text-base">₦8,{500 - item * 100}</p>
                      <p className="text-xs text-gray-500">Today, 10:{30 - item * 5} AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base lg:text-lg">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button className="p-3 md:p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all hover:shadow-md">
                  <DocumentTextIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600 mb-1.5 md:mb-2 lg:mb-3" />
                  <span className="text-xs md:text-sm font-medium">POD</span>
                </button>
                <button className="p-3 md:p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all hover:shadow-md">
                  <MapIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600 mb-1.5 md:mb-2 lg:mb-3" />
                  <span className="text-xs md:text-sm font-medium">Navigation</span>
                </button>
                <button className="p-3 md:p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all hover:shadow-md">
                  <PhotoIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600 mb-1.5 md:mb-2 lg:mb-3" />
                  <span className="text-xs md:text-sm font-medium">Scan</span>
                </button>
                <button className="p-3 md:p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl md:rounded-2xl flex flex-col items-center justify-center transition-all hover:shadow-md">
                  <CurrencyDollarIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600 mb-1.5 md:mb-2 lg:mb-3" />
                  <span className="text-xs md:text-sm font-medium">COD</span>
                </button>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base lg:text-lg">Today's Performance</h3>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1.5 md:mb-2">
                    <span className="text-gray-600">On-time Rate</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div className="bg-blue-600 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1.5 md:mb-2">
                    <span className="text-gray-600">Fuel Efficiency</span>
                    <span className="font-medium">8.5 km/L</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div className="bg-blue-600 h-1.5 md:h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1.5 md:mb-2">
                    <span className="text-gray-600">Customer Rating</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div className="bg-blue-600 h-1.5 md:h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-4 md:p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader size="lg" />
            <p className="mt-3 md:mt-4 text-blue-600 font-medium text-sm md:text-base">Loading driver dashboard...</p>
          </div>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'jobs':
        return <ActiveJobsPage />;
      case 'truck':
        return <MyTruckPage driver={driver} />;
      case 'navigation':
        return <NavigationSystem />;
      case 'earnings':
        return <EarningsPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'performance':
        return <DriverPerformance />;
      case 'documents':
        return <DocumentsPage />;
      case 'settings':
        return <DriverSettings />;
      default:
        return children || <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full">
      {profileModalOpen && <ProfileModal driver={driver} onClose={() => setProfileModalOpen(false)} />}

      {/* Mobile Sidebar */}
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
          <div className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border-2 border-blue-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="S&F Delivery Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2 md:ml-3">
                <h1 className="text-base md:text-lg font-bold text-gray-900">S&F Delivery</h1>
                <p className="text-xs text-gray-500">Driver Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 px-3 md:px-4 py-4 md:py-6 overflow-y-auto">
            <nav className="space-y-1.5 md:space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2.5 md:px-4 md:py-3.5 text-sm font-medium rounded-full transition-all ${
                    activeTab === item.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 md:p-4 lg:p-5 border-t">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-blue-500">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                  alt="Driver Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2 md:ml-3">
                <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                <p className="text-xs text-gray-500">Driver • {driver.id}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 md:px-4 md:py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-blue-500">
              <img
                src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                alt="S&F Delivery Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">S&F Delivery</h1>
              <p className="text-xs text-gray-500">Driver Portal</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-full transition-all ${
                  activeTab === item.key
                    ? 'bg-blue-600 text-white shadow-sm'
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
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                alt="Driver Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
              <p className="text-xs text-gray-500">Driver • {driver.id}</p>
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

      {/* Main Content */}
      <div className="lg:pl-64 w-full overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-14 md:h-16 px-3 md:px-4 lg:px-6">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg mr-1.5 md:mr-2"
              >
                <Bars3Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              </button>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg overflow-hidden border-2 border-blue-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-1.5 md:ml-2">
                <h2 className="text-sm font-bold text-gray-900">S&F Delivery</h2>
                <p className="text-xs text-gray-500">Driver</p>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-2 md:mx-3 lg:mx-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deliveries, locations..."
                  className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full relative transition-all">
                <BellIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-2 md:right-3 lg:right-4 top-14 md:top-16 w-80 md:w-96 bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200 z-40 max-h-80 md:max-h-96 overflow-y-auto">
                  <div className="p-3 md:p-4 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Notifications</h3>
                      <span className="text-xs bg-red-100 text-red-800 font-medium px-2 py-0.5 md:px-2 md:py-1 rounded-full">
                        {notifications.filter(n => n.unread).length} New
                      </span>
                    </div>
                  </div>
                  <div>
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all ${notification.unread ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`p-1.5 md:p-2 rounded-full mr-2 md:mr-3 ${
                            notification.type === 'job' ? 'bg-blue-100 text-blue-600' : 
                            notification.type === 'alert' ? 'bg-yellow-100 text-yellow-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-0.5 md:mb-1">
                              <p className="font-medium text-gray-900 text-sm md:text-base truncate">{notification.title}</p>
                              <span className="text-xs text-gray-500 ml-1 flex-shrink-0">{notification.time}</span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 truncate">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 md:p-3 border-t border-gray-200 sticky bottom-0 bg-white">
                    <button className="w-full text-center text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium py-1.5 md:py-2 rounded-full hover:bg-blue-50">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="text-right hidden md:block mr-2 lg:mr-3">
                  <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                  <p className="text-xs text-gray-500">{driver.vehicle.plate}</p>
                </div>
                <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-blue-500">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
                    alt="Driver Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full overflow-x-hidden">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white border-t border-gray-800">
          <div className="px-3 md:px-4 lg:px-6 py-4 md:py-6 lg:py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border-2 border-blue-500 mr-2 md:mr-3">
                    <img
                      src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">S&F Delivery Driver</h3>
                    <p className="text-xs md:text-sm text-gray-400">Driver Management Platform</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-400">
                  Empowering drivers with efficient job management and tracking across Nigeria.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 lg:mb-4">Driver Links</h4>
                <ul className="space-y-1 md:space-y-2">
                  <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-400 hover:text-white text-xs md:text-sm">Dashboard</button></li>
                  <li><button onClick={() => setActiveTab('jobs')} className="text-gray-400 hover:text-white text-xs md:text-sm">Active Jobs</button></li>
                  <li><button onClick={() => setActiveTab('earnings')} className="text-gray-400 hover:text-white text-xs md:text-sm">Earnings</button></li>
                  <li><button onClick={() => setActiveTab('navigation')} className="text-gray-400 hover:text-white text-xs md:text-sm">Navigation</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 lg:mb-4">Support</h4>
                <ul className="space-y-1 md:space-y-2">
                  <li className="text-gray-400 text-xs md:text-sm">Job Assistance</li>
                  <li className="text-gray-400 text-xs md:text-sm">Technical Support</li>
                  <li className="text-gray-400 text-xs md:text-sm">Payment Issues</li>
                  <li className="text-gray-400 text-xs md:text-sm">Driver Training</li>
                </ul>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 lg:mb-4">Contact</h4>
                <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
                  <li className="flex items-center text-gray-400 text-xs md:text-sm">
                    <PhoneIcon className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    <span>01-700-0000</span>
                  </li>
                  <li className="flex items-center text-gray-400 text-xs md:text-sm">
                    <ChatBubbleLeftRightIcon className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    <span>support@sfdelivery.ng</span>
                  </li>
                  <li className="flex items-center text-gray-400 text-xs md:text-sm">
                    <ClockIcon className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    <span>24/7 Driver Support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-4 md:mt-6 lg:mt-8 pt-3 md:pt-4 lg:pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-xs md:text-sm text-gray-400 mb-3 md:mb-0">
                  © {new Date().getFullYear()} Safe & Fast Logistics Nigeria Ltd. • {driver.completedJobs} Total Deliveries
                </div>
                <div className="flex space-x-2 md:space-x-3 lg:space-x-4">
                  <button className="text-xs md:text-sm text-gray-400 hover:text-white px-2 py-0.5 md:px-2 md:py-1 hover:bg-gray-800 rounded-full">Support</button>
                  <button className="text-xs md:text-sm text-gray-400 hover:text-white px-2 py-0.5 md:px-2 md:py-1 hover:bg-gray-800 rounded-full">Privacy</button>
                  <button className="text-xs md:text-sm text-gray-400 hover:text-white px-2 py-0.5 md:px-2 md:py-1 hover:bg-gray-800 rounded-full">Terms</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const PackageIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export default DriverLayout;
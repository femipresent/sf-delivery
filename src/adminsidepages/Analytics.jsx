import React, { useState, useEffect, useMemo } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserGroupIcon,
  CubeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EyeIcon,
  PlusIcon,
  StarIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Custom Icons
const RefreshIcon = ArrowPathIcon;

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 15250000,
    revenueChange: '+18.5%',
    totalShipments: 2458,
    shipmentsChange: '+12.3%',
    activeDrivers: 42,
    driversChange: '+5.7%',
    activeShippers: 156,
    shippersChange: '+8.2%',
    deliverySuccessRate: 94.2,
    successRateChange: '+2.1%',
    avgDeliveryTime: '2.5',
    deliveryTimeChange: '-0.3',
  },
  
  revenue: {
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [850, 920, 1050, 980, 1120, 1250, 1320, 1280, 1420, 1380, 1525, 1480], // in thousands
    },
    byService: [
      { name: 'Express Delivery', value: 45, color: 'bg-purple-500' },
      { name: 'Standard Delivery', value: 30, color: 'bg-blue-500' },
      { name: 'Economy Delivery', value: 15, color: 'bg-green-500' },
      { name: 'Refrigerated', value: 10, color: 'bg-indigo-500' },
    ],
  },
  
  shipments: {
    byStatus: {
      delivered: 1985,
      inTransit: 285,
      pending: 128,
      delayed: 48,
      cancelled: 16,
    },
    dailyVolume: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [85, 92, 78, 105, 120, 65, 45],
    },
  },
  
  performance: {
    onTimeDelivery: 92.5,
    driverRating: 4.7,
    shipperSatisfaction: 4.8,
    repeatCustomers: 78.3,
  },
  
  topMetrics: {
    topShippers: [
      { name: 'XYZ Wholesalers', shipments: 342, revenue: 1850000, growth: '+15%' },
      { name: 'Tech Solutions Ltd', shipments: 156, revenue: 850000, growth: '+8%' },
      { name: 'Fresh Foods Market', shipments: 289, revenue: 1650000, growth: '+22%' },
      { name: 'ABC Retail Store', shipments: 198, revenue: 980000, growth: '+5%' },
      { name: 'Premium Clothing', shipments: 89, revenue: 650000, growth: '+18%' },
    ],
    topDrivers: [
      { name: 'Musa Ibrahim', deliveries: 342, rating: 4.8, efficiency: 96 },
      { name: 'Amina Yusuf', deliveries: 289, rating: 4.9, efficiency: 98 },
      { name: 'Chinedu Okoro', deliveries: 198, rating: 4.5, efficiency: 91 },
      { name: 'Grace Okafor', deliveries: 421, rating: 4.7, efficiency: 95 },
      { name: 'Robert Chen', deliveries: 312, rating: 4.6, efficiency: 93 },
    ],
    topRoutes: [
      { route: 'Lagos → Abuja', shipments: 452, revenue: 2850000, avgTime: '1.5 days' },
      { route: 'Lagos → Port Harcourt', shipments: 389, revenue: 1850000, avgTime: '1 day' },
      { route: 'Lagos → Ibadan', shipments: 312, revenue: 850000, avgTime: '6 hours' },
      { route: 'Abuja → Kano', shipments: 245, revenue: 1250000, avgTime: '1.2 days' },
      { route: 'Port Harcourt → Enugu', shipments: 198, revenue: 980000, avgTime: '10 hours' },
    ],
  },
  
  trends: {
    peakHours: [
      { hour: '08:00', deliveries: 45 },
      { hour: '10:00', deliveries: 68 },
      { hour: '12:00', deliveries: 92 },
      { hour: '14:00', deliveries: 78 },
      { hour: '16:00', deliveries: 85 },
      { hour: '18:00', deliveries: 62 },
    ],
    seasonalTrends: [
      { month: 'Jan', index: 85 },
      { month: 'Feb', index: 92 },
      { month: 'Mar', index: 88 },
      { month: 'Apr', index: 95 },
      { month: 'May', index: 102 },
      { month: 'Jun', index: 98 },
      { month: 'Jul', index: 105 },
      { month: 'Aug', index: 112 },
      { month: 'Sep', index: 108 },
      { month: 'Oct', index: 115 },
      { month: 'Nov', index: 125 },
      { month: 'Dec', index: 142 },
    ],
  },
};

const Analytics = () => {
  // State management
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotificationMessage('Analytics data refreshed', 'success');
    }, 1000);
  };

  // Handle export
  const handleExport = () => {
    showNotificationMessage('Exporting analytics data...', 'info');
    setTimeout(() => {
      showNotificationMessage('Analytics data exported successfully', 'success');
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Stats cards - All rounded with hover effects
  const StatCard = ({ label, value, icon: Icon, color, change, suffix = '', valueColor = 'text-gray-900', hoverColor = 'hover:bg-gray-50' }) => (
    <div className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition-all duration-200 ${hoverColor} hover:shadow-md hover:border-gray-300`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}{suffix}</p>
        </div>
        <div className={`p-3 rounded-full ${color} transition-transform duration-200 hover:scale-105`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change.startsWith('+') ? (
            <ArrowTrendingUpIcon className="h-4 w-4" />
          ) : change.startsWith('-') ? (
            <ArrowTrendingDownIcon className="h-4 w-4" />
          ) : null}
          {change}
        </div>
      )}
    </div>
  );

  // Metric card with progress - All rounded
  const MetricCard = ({ label, value, icon: Icon, color, progress, max = 100, description }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progress >= 90 ? 'bg-green-500' : progress >= 80 ? 'bg-blue-500' : 'bg-yellow-500'} rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progress}%</span>
          <span>{max}% target</span>
        </div>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      )}
    </div>
  );

  // Mini chart component
  const MiniChart = ({ data, color = 'bg-blue-500', height = 'h-12' }) => (
    <div className={`${height} w-full flex items-end gap-px`}>
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        >
          <div className={`${color} rounded-t transition-all duration-300 hover:opacity-80`} style={{ height: '100%' }}></div>
        </div>
      ))}
    </div>
  );

  // Top list item component
  const TopListItem = ({ rank, name, metric, value, growth, color = 'bg-blue-100' }) => (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${color} group-hover:scale-105 transition-transform`}>
          <span className="text-sm font-bold">{rank}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{metric}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900">{value}</p>
        <p className={`text-xs ${growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {growth}
        </p>
      </div>
    </div>
  );

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Track performance, revenue, and shipment metrics</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px] bg-white transition-all duration-200 hover:border-gray-400"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 disabled:opacity-50 hover:shadow-sm"
            >
              <RefreshIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 hover:shadow-sm"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats - All cards rounded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Revenue" 
            value={formatCurrency(analyticsData.overview.totalRevenue).replace('NGN', '₦')}
            icon={CurrencyDollarIcon} 
            color="bg-purple-50 text-purple-600"
            change={analyticsData.overview.revenueChange}
            hoverColor="hover:bg-purple-50/50"
          />
          <StatCard 
            label="Total Shipments" 
            value={formatNumber(analyticsData.overview.totalShipments)}
            icon={TruckIcon} 
            color="bg-blue-50 text-blue-600"
            change={analyticsData.overview.shipmentsChange}
            hoverColor="hover:bg-blue-50/50"
          />
          <StatCard 
            label="Active Drivers" 
            value={analyticsData.overview.activeDrivers}
            icon={UserGroupIcon} 
            color="bg-green-50 text-green-600"
            change={analyticsData.overview.driversChange}
            hoverColor="hover:bg-green-50/50"
          />
          <StatCard 
            label="Active Shippers" 
            value={analyticsData.overview.activeShippers}
            icon={BuildingStorefrontIcon} 
            color="bg-indigo-50 text-indigo-600"
            change={analyticsData.overview.shippersChange}
            hoverColor="hover:bg-indigo-50/50"
          />
        </div>

        {/* Performance Metrics - All cards rounded */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            label="Delivery Success Rate" 
            value={`${analyticsData.overview.deliverySuccessRate}%`}
            icon={CheckCircleIcon}
            color="bg-green-100 text-green-600"
            progress={analyticsData.overview.deliverySuccessRate}
            description="Percentage of successful deliveries"
          />
          <MetricCard 
            label="Avg Delivery Time" 
            value={`${analyticsData.overview.avgDeliveryTime} days`}
            icon={ClockIcon}
            color="bg-blue-100 text-blue-600"
            progress={85}
            description="Average delivery duration"
          />
          <MetricCard 
            label="On-Time Delivery" 
            value={`${analyticsData.performance.onTimeDelivery}%`}
            icon={StarIcon}
            color="bg-yellow-100 text-yellow-600"
            progress={analyticsData.performance.onTimeDelivery}
            description="Deliveries completed on schedule"
          />
          <MetricCard 
            label="Repeat Customers" 
            value={`${analyticsData.performance.repeatCustomers}%`}
            icon={UserIcon}
            color="bg-purple-100 text-purple-600"
            progress={analyticsData.performance.repeatCustomers}
            description="Percentage of returning shippers"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-600">Monthly revenue in thousands</p>
            </div>
            <div className="flex gap-2">
              {['revenue', 'shipments', 'growth'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedMetric === metric 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64">
            <div className="h-full flex items-end gap-2">
              {analyticsData.revenue.monthly.data.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-300 hover:from-red-600 hover:to-red-500 group-hover:shadow-lg"
                    style={{ height: `${(value / Math.max(...analyticsData.revenue.monthly.data)) * 80}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center p-2">
                      <p className="text-xs font-bold text-white">₦{value}k</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{analyticsData.revenue.monthly.labels[index]}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6">
            {analyticsData.revenue.byService.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${service.color}`}></div>
                <span className="text-sm text-gray-600">{service.name}</span>
                <span className="text-sm font-medium">{service.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Shipment Status</h3>
              <p className="text-sm text-gray-600">Current shipment distribution</p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">This Week</span>
            </div>
          </div>
          
          {/* Status Breakdown */}
          <div className="space-y-4">
            {[
              { status: 'Delivered', count: analyticsData.shipments.byStatus.delivered, color: 'bg-green-500', percentage: 81 },
              { status: 'In Transit', count: analyticsData.shipments.byStatus.inTransit, color: 'bg-blue-500', percentage: 12 },
              { status: 'Pending', count: analyticsData.shipments.byStatus.pending, color: 'bg-yellow-500', percentage: 5 },
              { status: 'Delayed', count: analyticsData.shipments.byStatus.delayed, color: 'bg-orange-500', percentage: 2 },
              { status: 'Cancelled', count: analyticsData.shipments.byStatus.cancelled, color: 'bg-red-500', percentage: 1 },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color} transition-transform duration-200 group-hover:scale-125`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">{formatNumber(item.count)}</span>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500 group-hover:shadow-md`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Daily Volume */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Daily Shipment Volume</h4>
            <MiniChart data={analyticsData.shipments.dailyVolume.data} color="bg-blue-500" height="h-16" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {analyticsData.shipments.dailyVolume.labels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Top Shippers */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Shippers</h3>
              <p className="text-sm text-gray-600">By shipments and revenue</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-2">
            {analyticsData.topMetrics.topShippers.map((shipper, index) => (
              <div 
                key={index}
                className="p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                onClick={() => showNotificationMessage(`Viewing details for ${shipper.name}`, 'info')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      <BuildingStorefrontIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600">{shipper.name}</p>
                      <p className="text-sm text-gray-600">{formatNumber(shipper.shipments)} shipments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(shipper.revenue).replace('NGN', '₦')}</p>
                    <p className={`text-xs ${shipper.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {shipper.growth}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Drivers</h3>
              <p className="text-sm text-gray-600">By performance and efficiency</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-2">
            {analyticsData.topMetrics.topDrivers.map((driver, index) => (
              <div 
                key={index}
                className="p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                onClick={() => showNotificationMessage(`Viewing performance for ${driver.name}`, 'info')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      <UserIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-green-600">{driver.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-3 w-3 ${star <= Math.floor(driver.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium">{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatNumber(driver.deliveries)}</p>
                    <p className="text-sm text-gray-600">{driver.efficiency}% efficiency</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Routes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Routes</h3>
              <p className="text-sm text-gray-600">Most profitable delivery routes</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-2">
            {analyticsData.topMetrics.topRoutes.map((route, index) => (
              <div 
                key={index}
                className="p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                onClick={() => showNotificationMessage(`Viewing route analytics for ${route.route}`, 'info')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MapPinIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-purple-600">{route.route}</p>
                      <p className="text-sm text-gray-600">Avg: {route.avgTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatNumber(route.shipments)}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(route.revenue).replace('NGN', '₦')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Peak Delivery Hours</h3>
              <p className="text-sm text-gray-600">Average deliveries per hour</p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>
          
          <div className="h-48">
            <div className="h-full flex items-end gap-3">
              {analyticsData.trends.peakHours.map((hour, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-300 hover:from-indigo-600 hover:to-indigo-500"
                    style={{ height: `${(hour.deliveries / 100) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center p-2">
                      <p className="text-xs font-bold text-white">{hour.deliveries} deliveries</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{hour.hour}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Seasonal Trends</h3>
              <p className="text-sm text-gray-600">Monthly shipment volume index</p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">2024</span>
            </div>
          </div>
          
          <div className="h-48">
            <div className="h-full flex items-end gap-1">
              {analyticsData.trends.seasonalTrends.map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-green-500"
                    style={{ height: `${(month.index / 150) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center p-2">
                      <p className="text-xs font-bold text-white">Index: {month.index}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{month.month}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Driver Rating</p>
              <p className="text-lg font-bold text-gray-900">{analyticsData.performance.driverRating}/5.0</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-full">
              <StarIcon className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shipper Satisfaction</p>
              <p className="text-lg font-bold text-gray-900">{analyticsData.performance.shipperSatisfaction}/5.0</p>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <UserGroupIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Shipments</p>
              <p className="text-lg font-bold text-gray-900">85</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <TruckIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue Today</p>
              <p className="text-lg font-bold text-gray-900">₦450k</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-full">
              <CurrencyDollarIcon className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
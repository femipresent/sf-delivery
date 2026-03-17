import React, { useState, useEffect, useMemo } from 'react';
import {
  ChartBarIcon,
  DocumentTextIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  TableCellsIcon,
  MapPinIcon,
  ShieldCheckIcon,
  CubeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalculatorIcon,
  StarIcon,
  WalletIcon,
  DocumentChartBarIcon,
  ChartPieIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PrinterIcon,
  CloudArrowDownIcon,
  AdjustmentsHorizontalIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

// Mock data for reports
const mockShipments = [
  { id: 'SH-001', customer: 'ShopRight Supermarket', driver: 'Musa Ibrahim', pickup: 'Lagos Warehouse', delivery: 'ShopRight Ikeja', date: '2024-03-15', status: 'delivered', onTime: true, revenue: 45000, weight: 500, service: 'LTL', payment: 'paid' },
  { id: 'SH-002', customer: 'Tech Solutions Ltd', driver: 'Amina Yusuf', pickup: 'Victoria Island', delivery: 'GRA Ibadan', date: '2024-03-15', status: 'delivered', onTime: true, revenue: 65000, weight: 1200, service: 'FTL', payment: 'paid' },
  { id: 'SH-003', customer: 'Fresh Foods Market', driver: 'Chinedu Okafor', pickup: 'Abuja Central', delivery: 'Kubwa Market', date: '2024-03-14', status: 'delivered', onTime: false, revenue: 32000, weight: 300, service: 'Express', payment: 'pending' },
  { id: 'SH-004', customer: 'MediCare Pharmaceuticals', driver: 'Grace Okafor', pickup: 'Lekki Phase 1', delivery: 'General Hospital PH', date: '2024-03-14', status: 'in_transit', onTime: null, revenue: 55000, weight: 450, service: 'Cold Chain', payment: 'pending' },
  { id: 'SH-005', customer: 'XYZ Wholesalers', driver: 'Ibrahim Sani', pickup: 'Kano Industrial', delivery: 'Maiduguri Market', date: '2024-03-13', status: 'delivered', onTime: true, revenue: 89000, weight: 2000, service: 'FTL', payment: 'paid' },
  { id: 'SH-006', customer: 'ABC Retail Store', driver: 'Musa Ibrahim', pickup: 'Ilorin Depot', delivery: 'Osogbo Main', date: '2024-03-13', status: 'delivered', onTime: true, revenue: 41000, weight: 600, service: 'LTL', payment: 'paid' },
  { id: 'SH-007', customer: 'Fashion Hub Ltd', driver: 'Amina Yusuf', pickup: 'Onitsha Market', delivery: 'Enugu Showroom', date: '2024-03-12', status: 'failed', onTime: false, revenue: 0, weight: 350, service: 'Same Day', payment: 'cancelled' },
  { id: 'SH-008', customer: 'CBN Logistics', driver: 'Robert Chen', pickup: 'CBN Abuja', delivery: 'Zenith Bank HQ', date: '2024-03-12', status: 'delivered', onTime: true, revenue: 120000, weight: 150, service: 'Secure', payment: 'paid' },
  { id: 'SH-009', customer: 'Glo Mobile', driver: 'Grace Okafor', pickup: 'Lagos HQ', delivery: 'Ibadan Branch', date: '2024-03-11', status: 'delivered', onTime: true, revenue: 38000, weight: 250, service: 'Express', payment: 'paid' },
  { id: 'SH-010', customer: 'Dangote Cement', driver: 'Ibrahim Sani', pickup: 'Ibese Plant', delivery: 'Lagos Port', date: '2024-03-11', status: 'delivered', onTime: true, revenue: 210000, weight: 30000, service: 'FTL', payment: 'pending' },
];

const mockDrivers = [
  { id: 'DRV-001', name: 'Musa Ibrahim', vehicle: 'Toyota Hilux', status: 'active', deliveries: 245, onTimeRate: 94, rating: 4.8, earnings: 1250000, joined: '2023-01-15' },
  { id: 'DRV-002', name: 'Amina Yusuf', vehicle: 'Ford Transit', status: 'active', deliveries: 189, onTimeRate: 91, rating: 4.6, earnings: 980000, joined: '2023-03-22' },
  { id: 'DRV-003', name: 'Chinedu Okafor', vehicle: 'Motorcycle', status: 'active', deliveries: 312, onTimeRate: 88, rating: 4.5, earnings: 750000, joined: '2022-11-05' },
  { id: 'DRV-004', name: 'Grace Okafor', vehicle: 'Nissan Urvan', status: 'active', deliveries: 156, onTimeRate: 96, rating: 4.9, earnings: 860000, joined: '2023-06-18' },
  { id: 'DRV-005', name: 'Ibrahim Sani', vehicle: 'Mercedes Truck', status: 'active', deliveries: 178, onTimeRate: 92, rating: 4.7, earnings: 1450000, joined: '2023-02-10' },
  { id: 'DRV-006', name: 'Robert Chen', vehicle: 'Toyota Camry', status: 'inactive', deliveries: 89, onTimeRate: 85, rating: 4.3, earnings: 420000, joined: '2023-08-30' },
];

const mockRevenueData = {
  daily: [45000, 65000, 32000, 55000, 89000, 41000, 0, 120000, 38000, 210000],
  weekly: [320000, 285000, 410000, 380000, 290000, 450000, 520000],
  monthly: [2450000, 2380000, 2560000, 2410000, 2630000, 2510000, 2480000, 2590000, 2720000, 2850000, 2910000, 3100000],
  byService: [
    { service: 'FTL', revenue: 1560000, shipments: 42 },
    { service: 'LTL', revenue: 890000, shipments: 85 },
    { service: 'Express', revenue: 560000, shipments: 120 },
    { service: 'Same Day', revenue: 320000, shipments: 65 },
    { service: 'Cold Chain', revenue: 780000, shipments: 28 },
    { service: 'Secure', revenue: 950000, shipments: 15 },
  ],
  byCustomer: [
    { customer: 'Dangote Cement', revenue: 2100000, shipments: 24 },
    { customer: 'CBN Logistics', revenue: 1560000, shipments: 18 },
    { customer: 'ShopRight Supermarket', revenue: 980000, shipments: 56 },
    { customer: 'Tech Solutions Ltd', revenue: 870000, shipments: 32 },
    { customer: 'MediCare Pharmaceuticals', revenue: 650000, shipments: 41 },
    { customer: 'XYZ Wholesalers', revenue: 540000, shipments: 28 },
  ],
};

const mockPerformanceData = {
  onTimeDelivery: 91.5,
  failedDeliveries: 3.2,
  customerSatisfaction: 4.7,
  averageDeliveryTime: '2.8 hours',
  peakDeliveryHours: ['10:00-12:00', '15:00-17:00'],
  topRoutes: [
    { route: 'Lagos → Ibadan', shipments: 145, avgTime: '2.1h', revenue: 850000 },
    { route: 'Abuja → Kaduna', shipments: 98, avgTime: '1.8h', revenue: 620000 },
    { route: 'Port Harcourt → Owerri', shipments: 76, avgTime: '1.5h', revenue: 450000 },
    { route: 'Kano → Maiduguri', shipments: 54, avgTime: '6.2h', revenue: 980000 },
    { route: 'Enugu → Onitsha', shipments: 121, avgTime: '1.2h', revenue: 420000 },
  ],
};

const Reports = () => {
  // State management
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('overview');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    service: 'all',
    driver: 'all',
    customer: 'all',
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('charts');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Filtered data
  const filteredShipments = useMemo(() => {
    let filtered = [...mockShipments];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(shipment => 
        shipment.id.toLowerCase().includes(term) ||
        shipment.customer.toLowerCase().includes(term) ||
        shipment.driver.toLowerCase().includes(term) ||
        shipment.pickup.toLowerCase().includes(term) ||
        shipment.delivery.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (selectedFilters.status !== 'all') {
      filtered = filtered.filter(shipment => shipment.status === selectedFilters.status);
    }
    
    if (selectedFilters.service !== 'all') {
      filtered = filtered.filter(shipment => shipment.service === selectedFilters.service);
    }
    
    if (selectedFilters.driver !== 'all') {
      filtered = filtered.filter(shipment => shipment.driver === selectedFilters.driver);
    }
    
    // Apply date range
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (dateRange) {
      case 'today':
        cutoffDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        // All time - no filtering
        break;
    }
    
    if (dateRange !== 'all') {
      filtered = filtered.filter(shipment => new Date(shipment.date) >= cutoffDate);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return filtered;
  }, [searchTerm, selectedFilters, dateRange, sortConfig]);
  
  // Calculate statistics
  const stats = useMemo(() => {
    const totalShipments = filteredShipments.length;
    const deliveredShipments = filteredShipments.filter(s => s.status === 'delivered').length;
    const inTransitShipments = filteredShipments.filter(s => s.status === 'in_transit').length;
    const failedShipments = filteredShipments.filter(s => s.status === 'failed').length;
    
    const totalRevenue = filteredShipments.reduce((sum, shipment) => sum + shipment.revenue, 0);
    const averageRevenue = totalShipments > 0 ? totalRevenue / totalShipments : 0;
    
    const onTimeDeliveries = filteredShipments.filter(s => s.status === 'delivered' && s.onTime).length;
    const onTimeRate = deliveredShipments > 0 ? (onTimeDeliveries / deliveredShipments * 100).toFixed(1) : 0;
    
    const topDriver = mockDrivers.sort((a, b) => b.deliveries - a.deliveries)[0];
    const topCustomer = mockRevenueData.byCustomer.sort((a, b) => b.revenue - a.revenue)[0];
    
    const revenueByService = mockRevenueData.byService.reduce((acc, service) => {
      acc[service.service] = service.revenue;
      return acc;
    }, {});
    
    return {
      totalShipments,
      deliveredShipments,
      inTransitShipments,
      failedShipments,
      totalRevenue,
      averageRevenue,
      onTimeRate,
      topDriver,
      topCustomer,
      revenueByService,
      shipmentDistribution: {
        delivered: deliveredShipments,
        in_transit: inTransitShipments,
        failed: failedShipments,
        pending: totalShipments - deliveredShipments - inTransitShipments - failedShipments,
      },
    };
  }, [filteredShipments]);
  
  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  const getStatusBadge = (status) => {
    const config = {
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered', icon: CheckCircleIcon },
      in_transit: { color: 'bg-blue-100 text-blue-800', label: 'In Transit', icon: TruckIcon },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed', icon: XCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: ClockIcon },
    };
    
    const configItem = config[status] || config.pending;
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        <Icon className="h-3 w-3" />
        {configItem.label}
      </span>
    );
  };
  
  const handleExport = (type) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`${type.toUpperCase()} export completed!`);
    }, 1500);
  };
  
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  // KPI Cards Component
  const KPICard = ({ title, value, icon: Icon, change, color, suffix = '' }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-gray-900">{value}{suffix}</p>
            {change && (
              <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
  
  // Chart Component (placeholder)
  const ChartPlaceholder = ({ title, type = 'bar', height = 200 }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-500 hover:text-gray-700">Day</button>
          <button className="text-xs text-gray-500 hover:text-gray-700">Week</button>
          <button className="text-xs text-gray-500 hover:text-gray-700">Month</button>
        </div>
      </div>
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
          <p className="text-xs text-gray-400 mt-1">{type === 'bar' ? 'Bar Chart' : type === 'line' ? 'Line Chart' : 'Pie Chart'}</p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor performance, revenue, and operational metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport(exportFormat)}
              disabled={isExporting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <ArrowDownTrayIcon className={`h-4 w-4 ${isExporting ? 'animate-pulse' : ''}`} />
              {isExporting ? 'Exporting...' : `Export ${exportFormat.toUpperCase()}`}
            </button>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Range */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="quarter">Past Quarter</option>
                  <option value="year">Past Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            
            {/* Report Type */}
            <div className="flex-1">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="overview">Overview Dashboard</option>
                <option value="delivery">Delivery Reports</option>
                <option value="revenue">Revenue Reports</option>
                <option value="driver">Driver Performance</option>
                <option value="customer">Customer Analytics</option>
              </select>
            </div>
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('charts')}
                className={`p-2 rounded-lg ${viewMode === 'charts' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <ChartBarIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg flex items-center gap-2 ${showFilters ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <FunnelIcon className="h-5 w-5" />
                <span className="text-sm hidden md:inline">Filters</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedFilters.status}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="in_transit">In Transit</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select
                  value={selectedFilters.service}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Services</option>
                  <option value="FTL">FTL</option>
                  <option value="LTL">LTL</option>
                  <option value="Express">Express</option>
                  <option value="Same Day">Same Day</option>
                  <option value="Cold Chain">Cold Chain</option>
                  <option value="Secure">Secure</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver</label>
                <select
                  value={selectedFilters.driver}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, driver: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Drivers</option>
                  {mockDrivers.map(driver => (
                    <option key={driver.id} value={driver.name}>{driver.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                <select
                  value={selectedFilters.customer}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, customer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Customers</option>
                  {Array.from(new Set(mockShipments.map(s => s.customer))).map(customer => (
                    <option key={customer} value={customer}>{customer}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Total Shipments"
            value={stats.totalShipments}
            icon={CubeIcon}
            change="+12%"
            color="bg-blue-100 text-blue-600"
          />
          <KPICard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={CurrencyDollarIcon}
            change="+18%"
            color="bg-green-100 text-green-600"
          />
          <KPICard
            title="On-Time Rate"
            value={stats.onTimeRate}
            icon={CheckCircleIcon}
            suffix="%"
            change="+2.5%"
            color="bg-purple-100 text-purple-600"
          />
          <KPICard
            title="Avg Revenue/Shipment"
            value={formatCurrency(stats.averageRevenue)}
            icon={CalculatorIcon}
            change="+5.2%"
            color="bg-orange-100 text-orange-600"
          />
        </div>
        
        {/* Charts Section */}
        {viewMode === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartPlaceholder 
              title="Revenue Trend"
              type="line"
              height={300}
            />
            <ChartPlaceholder 
              title="Shipment Distribution"
              type="pie"
              height={300}
            />
            <ChartPlaceholder 
              title="Service Type Performance"
              type="bar"
              height={300}
            />
            <ChartPlaceholder 
              title="Top Performing Routes"
              type="bar"
              height={300}
            />
          </div>
        )}
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <UserGroupIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Driver Performance</h3>
                <p className="text-sm text-gray-500">Top performers this month</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockDrivers.slice(0, 3).map(driver => (
                <div key={driver.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{driver.deliveries} deliveries</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Top Customers</h3>
                <p className="text-sm text-gray-500">By revenue this month</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockRevenueData.byCustomer.slice(0, 3).map(customer => (
                <div key={customer.customer} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{customer.customer}</p>
                    <p className="text-sm text-gray-500">{customer.shipments} shipments</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(customer.revenue)}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <MapPinIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Route Performance</h3>
                <p className="text-sm text-gray-500">Top routes by shipments</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockPerformanceData.topRoutes.slice(0, 3).map(route => (
                <div key={route.route} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{route.route}</p>
                    <p className="text-sm text-gray-500">{route.avgTime} avg time</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{route.shipments}</p>
                    <p className="text-xs text-gray-500">Shipments</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Detailed Shipments Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Shipment Details</h3>
              <p className="text-sm text-gray-500">{filteredShipments.length} shipments found</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <EyeIcon className="h-4 w-4 inline mr-1" />
                Preview
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <PrinterIcon className="h-4 w-4 inline mr-1" />
                Print
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center gap-1">
                      ID
                      {sortConfig.key === 'id' && (
                        sortConfig.direction === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortConfig.key === 'date' && (
                        sortConfig.direction === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('revenue')}
                  >
                    <div className="flex items-center gap-1">
                      Revenue
                      {sortConfig.key === 'revenue' && (
                        sortConfig.direction === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredShipments.map(shipment => (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{shipment.id}</p>
                        <p className="text-xs text-gray-500">Driver: {shipment.driver}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{shipment.customer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">{shipment.pickup} → {shipment.delivery}</p>
                          <p className="text-xs text-gray-500">{shipment.weight}kg</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{formatDate(shipment.date)}</p>
                      {shipment.onTime !== null && (
                        <span className={`inline-flex items-center gap-1 text-xs ${shipment.onTime ? 'text-green-600' : 'text-red-600'}`}>
                          {shipment.onTime ? '✓ On Time' : '✗ Delayed'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(shipment.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(shipment.revenue)}</p>
                        <p className="text-xs text-gray-500 capitalize">{shipment.payment}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {shipment.service}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredShipments.length === 0 && (
            <div className="py-12 text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
              <p className="text-gray-500 mb-4">
                No shipment records match your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedFilters({
                    status: 'all',
                    service: 'all',
                    driver: 'all',
                    customer: 'all',
                  });
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredShipments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredShipments.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Performance Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">On-Time Delivery Rate</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{mockPerformanceData.onTimeDelivery}%</p>
                <p className="text-sm text-green-600 mt-1">↑ 2.3% from last month</p>
              </div>
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Customer Satisfaction</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold text-blue-900">{mockPerformanceData.customerSatisfaction}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(mockPerformanceData.customerSatisfaction) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-1">↑ 0.2 from last quarter</p>
              </div>
              <StarIcon className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Failed Deliveries</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{mockPerformanceData.failedDeliveries}%</p>
                <p className="text-sm text-purple-600 mt-1">↓ 0.8% from last month</p>
              </div>
              <ExclamationTriangleIcon className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>
        
        {/* Quick Export Options */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Export Reports</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleExport('delivery')}
              className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <TruckIcon className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Delivery Report</p>
              <p className="text-sm text-gray-500">Completed deliveries</p>
            </button>
            
            <button
              onClick={() => handleExport('revenue')}
              className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <CurrencyDollarIcon className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Revenue Report</p>
              <p className="text-sm text-gray-500">Financial overview</p>
            </button>
            
            <button
              onClick={() => handleExport('driver')}
              className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <UserGroupIcon className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Driver Report</p>
              <p className="text-sm text-gray-500">Performance metrics</p>
            </button>
            
            <button
              onClick={() => handleExport('customer')}
              className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <BuildingOfficeIcon className="h-6 w-6 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900">Customer Report</p>
              <p className="text-sm text-gray-500">Client analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
import React, { useState, useEffect, useMemo } from 'react';
import {
  ChartBarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  ChartPieIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  InformationCircleIcon,
  StarIcon,
  RocketLaunchIcon,
  BoltIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

// Custom icon for Refresh
const RefreshIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

// Mock data for analytics
const mockAnalyticsData = {
  // KPI Metrics
  kpis: {
    totalDeliveries: 1247,
    completedDeliveries: 1189,
    completionRate: 95.3,
    totalRevenue: 18540000,
    averageDeliveryTime: 45,
    onTimeRate: 92.5,
    customerSatisfaction: 4.7,
    activeDrivers: 47,
    activeVehicles: 42,
    fuelEfficiency: 12.4,
    operationalCost: 3450000,
  },

  // Delivery Metrics
  deliveryMetrics: {
    dailyDeliveries: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [187, 203, 198, 215, 221, 176, 145],
      trend: '+8.2%',
      trendUp: true,
    },
    deliveryStatus: [
      { status: 'Completed', count: 1189, percentage: 95.3 },
      { status: 'In Transit', count: 32, percentage: 2.6 },
      { status: 'Pending', count: 18, percentage: 1.4 },
      { status: 'Failed', count: 8, percentage: 0.7 },
    ],
    peakHours: [
      { hour: '08:00-10:00', deliveries: 156 },
      { hour: '10:00-12:00', deliveries: 198 },
      { hour: '12:00-14:00', deliveries: 234 },
      { hour: '14:00-16:00', deliveries: 187 },
      { hour: '16:00-18:00', deliveries: 165 },
    ],
  },

  // Revenue Analytics
  revenueAnalytics: {
    monthlyRevenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [1250000, 1380000, 1420000, 1560000, 1620000, 1750000, 1680000, 1854000, 1780000, 1920000, 2050000, 2180000],
      trend: '+15.3%',
      trendUp: true,
    },
    revenueByService: [
      { service: 'Standard Delivery', amount: 9850000, percentage: 53.1 },
      { service: 'Express Delivery', amount: 5640000, percentage: 30.4 },
      { service: 'Same-Day Delivery', amount: 2450000, percentage: 13.2 },
      { service: 'COD Services', amount: 600000, percentage: 3.3 },
    ],
    paymentMethods: [
      { method: 'Card', percentage: 45, count: 536 },
      { method: 'Cash', percentage: 32, count: 381 },
      { method: 'Transfer', percentage: 18, count: 214 },
      { method: 'Mobile Money', percentage: 5, count: 58 },
    ],
  },

  // Performance Analytics
  performanceAnalytics: {
    driverPerformance: [
      { driver: 'Musa Ibrahim', deliveries: 156, successRate: 98.7, avgTime: 42, rating: 4.9 },
      { driver: 'Chinedu Okoro', deliveries: 142, successRate: 97.2, avgTime: 45, rating: 4.8 },
      { driver: 'Amina Yusuf', deliveries: 138, successRate: 99.1, avgTime: 38, rating: 5.0 },
      { driver: 'Grace Okafor', deliveries: 127, successRate: 96.5, avgTime: 47, rating: 4.7 },
      { driver: 'Ibrahim Sani', deliveries: 119, successRate: 95.8, avgTime: 50, rating: 4.6 },
    ],
    topCustomers: [
      { customer: 'ABC Retail Store', deliveries: 89, revenue: 1250000, growth: '+12%' },
      { customer: 'XYZ Wholesalers', deliveries: 76, revenue: 985000, growth: '+8%' },
      { customer: 'Tech Solutions Ltd', deliveries: 65, revenue: 856000, growth: '+15%' },
      { customer: 'Fresh Foods Market', deliveries: 58, revenue: 745000, growth: '+5%' },
      { customer: 'Pharmacy Plus', deliveries: 52, revenue: 685000, growth: '+18%' },
    ],
    routeEfficiency: [
      { route: 'Lagos Mainland', avgTime: 38, fuelCost: 12500, efficiency: 94 },
      { route: 'Lagos Island', avgTime: 42, fuelCost: 14200, efficiency: 89 },
      { route: 'Ikeja', avgTime: 35, fuelCost: 11800, efficiency: 96 },
      { route: 'Victoria Island', avgTime: 45, fuelCost: 15600, efficiency: 85 },
      { route: 'Ajah', avgTime: 52, fuelCost: 17800, efficiency: 78 },
    ],
  },

  // Operational Insights
  operationalInsights: {
    vehicleUtilization: [
      { vehicle: 'Toyota Hilux - ABC123', utilization: 92, maintenance: 'Good', trips: 156 },
      { vehicle: 'Mitsubishi Canter - XYZ456', utilization: 88, maintenance: 'Good', trips: 142 },
      { vehicle: 'Toyota Hiace - VIL789', utilization: 85, maintenance: 'Due Soon', trips: 138 },
      { vehicle: 'Nissan Urvan - ABJ123', utilization: 91, maintenance: 'Good', trips: 127 },
      { vehicle: 'Refrigerated Van - KAN456', utilization: 78, maintenance: 'Good', trips: 119 },
    ],
    maintenanceAlerts: [
      { vehicle: 'Toyota Hiace - VIL789', issue: 'Brake pads worn', severity: 'medium', daysLeft: 7 },
      { vehicle: 'Nissan Urvan - ABJ123', issue: 'Oil change due', severity: 'low', daysLeft: 14 },
      { vehicle: 'Toyota Hilux - ABC123', issue: 'Tire pressure low', severity: 'low', daysLeft: 3 },
    ],
    costAnalysis: [
      { category: 'Fuel', amount: 1250000, percentage: 36.2, trend: '+8%' },
      { category: 'Maintenance', amount: 785000, percentage: 22.8, trend: '+5%' },
      { category: 'Salaries', amount: 985000, percentage: 28.6, trend: '+12%' },
      { category: 'Insurance', amount: 325000, percentage: 9.4, trend: '+3%' },
      { category: 'Miscellaneous', amount: 150000, percentage: 4.3, trend: '-2%' },
    ],
  },

  // Time-based data
  timePeriods: ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Quarter', 'Last Year'],
};

const Analytics = () => {
  // State management
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'delivery', 'revenue', 'performance', 'operations'
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      alert('Analytics data refreshed!');
    }, 1000);
  };

  // Handle export
  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert('Analytics data exported successfully!');
    }, 1500);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Get trend color
  const getTrendColor = (isUp) => {
    return isUp ? 'text-green-600' : 'text-red-600';
  };

  // Get trend icon
  const getTrendIcon = (isUp) => {
    return isUp ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  };

  // Render KPI Cards
  const renderKPICards = () => {
    const kpiCards = [
      {
        title: 'Total Deliveries',
        value: mockAnalyticsData.kpis.totalDeliveries,
        icon: TruckIcon,
        color: 'bg-blue-50 text-blue-600',
        change: '+12.5%',
        changeUp: true,
        description: 'Completed: 1,189 (95.3%)',
      },
      {
        title: 'Total Revenue',
        value: formatCurrency(mockAnalyticsData.kpis.totalRevenue),
        icon: CurrencyDollarIcon,
        color: 'bg-green-50 text-green-600',
        change: '+15.3%',
        changeUp: true,
        description: 'Avg per delivery: ₦14,850',
      },
      {
        title: 'Avg Delivery Time',
        value: `${mockAnalyticsData.kpis.averageDeliveryTime} min`,
        icon: ClockIcon,
        color: 'bg-purple-50 text-purple-600',
        change: '-8.2%',
        changeUp: false,
        description: 'On-time rate: 92.5%',
      },
      {
        title: 'Customer Satisfaction',
        value: mockAnalyticsData.kpis.customerSatisfaction,
        icon: StarIcon,
        color: 'bg-yellow-50 text-yellow-600',
        change: '+0.3',
        changeUp: true,
        description: 'Out of 5.0 rating',
      },
      {
        title: 'Active Drivers',
        value: mockAnalyticsData.kpis.activeDrivers,
        icon: UserGroupIcon,
        color: 'bg-indigo-50 text-indigo-600',
        change: '+5',
        changeUp: true,
        description: '47 out of 50 capacity',
      },
      {
        title: 'Operational Cost',
        value: formatCurrency(mockAnalyticsData.kpis.operationalCost),
        icon: CalculatorIcon,
        color: 'bg-red-50 text-red-600',
        change: '+8.4%',
        changeUp: false,
        description: 'Per delivery: ₦2,765',
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = getTrendIcon(kpi.changeUp);
          
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${kpi.color.split(' ')[0]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(kpi.changeUp)}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{kpi.title}</p>
                <p className="text-xs text-gray-500 mt-2">{kpi.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Delivery Metrics
  const renderDeliveryMetrics = () => {
    const TrendIcon = getTrendIcon(mockAnalyticsData.deliveryMetrics.dailyDeliveries.trendUp);
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Performance</h3>
            <p className="text-sm text-gray-500">Daily delivery trends and status distribution</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{timePeriod}</span>
            <div className={`flex items-center gap-1 ${getTrendColor(mockAnalyticsData.deliveryMetrics.dailyDeliveries.trendUp)}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{mockAnalyticsData.deliveryMetrics.dailyDeliveries.trend}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Deliveries Chart */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Daily Deliveries</h4>
              <span className="text-sm text-gray-500">Last 7 days</span>
            </div>
            <div className="h-64 flex items-end gap-2 mt-6">
              {mockAnalyticsData.deliveryMetrics.dailyDeliveries.data.map((value, index) => {
                const maxValue = Math.max(...mockAnalyticsData.deliveryMetrics.dailyDeliveries.data);
                const height = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {mockAnalyticsData.deliveryMetrics.dailyDeliveries.labels[index]}
                    </span>
                    <span className="text-sm font-medium text-gray-900 mt-1">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Status */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Delivery Status</h4>
            <div className="space-y-4">
              {mockAnalyticsData.deliveryMetrics.deliveryStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status.status === 'Completed' ? 'bg-green-500' :
                      status.status === 'In Transit' ? 'bg-blue-500' :
                      status.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm text-gray-700">{status.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{status.count}</span>
                    <span className="text-xs text-gray-500 ml-2">({formatPercentage(status.percentage)})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Peak Hours */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-4">Peak Delivery Hours</h4>
              <div className="space-y-3">
                {mockAnalyticsData.deliveryMetrics.peakHours.map((hour, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{hour.hour}</span>
                      <span className="font-medium text-gray-900">{hour.deliveries}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(hour.deliveries / 234) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Revenue Analytics
  const renderRevenueAnalytics = () => {
    const TrendIcon = getTrendIcon(mockAnalyticsData.revenueAnalytics.monthlyRevenue.trendUp);
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            <p className="text-sm text-gray-500">Monthly revenue trends and service breakdown</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Monthly Growth</span>
            <div className={`flex items-center gap-1 ${getTrendColor(mockAnalyticsData.revenueAnalytics.monthlyRevenue.trendUp)}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{mockAnalyticsData.revenueAnalytics.monthlyRevenue.trend}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Monthly Revenue</h4>
            <div className="h-64 flex items-end gap-1 mt-6">
              {mockAnalyticsData.revenueAnalytics.monthlyRevenue.data.map((value, index) => {
                const maxValue = Math.max(...mockAnalyticsData.revenueAnalytics.monthlyRevenue.data);
                const height = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2 rotate-45 whitespace-nowrap">
                      {mockAnalyticsData.revenueAnalytics.monthlyRevenue.labels[index]}
                    </span>
                    <span className="text-xs font-medium text-gray-900 mt-1">
                      {formatCurrency(value / 1000000).replace('.00', '')}M
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Revenue by Service Type</h4>
              <div className="space-y-4">
                {mockAnalyticsData.revenueAnalytics.revenueByService.map((service, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{service.service}</span>
                      <span className="font-medium text-gray-900">{formatCurrency(service.amount)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                        {formatPercentage(service.percentage)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Payment Methods Distribution</h4>
              <div className="grid grid-cols-2 gap-4">
                {mockAnalyticsData.revenueAnalytics.paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{method.method}</span>
                      <span className="text-sm font-bold text-gray-900">{formatPercentage(method.percentage)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {method.count} transactions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Performance Analytics
  const renderPerformanceAnalytics = () => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
            <p className="text-sm text-gray-500">Driver performance and top customers</p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 rounded-full px-4 py-2 hover:bg-blue-50 transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Driver Performance Table */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Top Performing Drivers</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider py-3">Driver</th>
                    <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider py-3">Deliveries</th>
                    <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider py-3">Success Rate</th>
                    <th className="text-left text-xs font-semibold text-gray-700 uppercase tracking-wider py-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalyticsData.performanceAnalytics.driverPerformance.map((driver, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{driver.driver}</p>
                          <p className="text-xs text-gray-500">{driver.avgTime} min avg</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-gray-900">{driver.deliveries}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{formatPercentage(driver.successRate)}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full bg-green-500"
                              style={{ width: `${driver.successRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Customers & Route Efficiency */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Top Customers by Revenue</h4>
              <div className="space-y-4">
                {mockAnalyticsData.performanceAnalytics.topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.customer}</p>
                      <p className="text-xs text-gray-500">{customer.deliveries} deliveries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(customer.revenue)}</p>
                      <div className={`inline-flex items-center gap-1 text-xs ${getTrendColor(true)}`}>
                        <ArrowTrendingUpIcon className="h-3 w-3" />
                        <span>{customer.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Route Efficiency</h4>
              <div className="space-y-3">
                {mockAnalyticsData.performanceAnalytics.routeEfficiency.map((route, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{route.route}</span>
                      <span className="font-medium text-gray-900">{route.efficiency}% efficient</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Avg: {route.avgTime}min</span>
                      <span>Fuel: {formatCurrency(route.fuelCost)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{ width: `${route.efficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Operational Insights
  const renderOperationalInsights = () => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Operational Insights</h3>
            <p className="text-sm text-gray-500">Vehicle utilization and cost analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-600">Total Vehicles: </span>
              <span className="font-medium text-gray-900">{mockAnalyticsData.kpis.activeVehicles}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Fuel Efficiency: </span>
              <span className="font-medium text-gray-900">{mockAnalyticsData.kpis.fuelEfficiency} km/L</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Utilization */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Vehicle Utilization</h4>
            <div className="space-y-4">
              {mockAnalyticsData.operationalInsights.vehicleUtilization.map((vehicle, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{vehicle.vehicle}</p>
                      <p className="text-xs text-gray-500">{vehicle.trips} trips completed</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.maintenance === 'Good' ? 'bg-green-100 text-green-800' :
                      vehicle.maintenance === 'Due Soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.maintenance}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Utilization Rate</span>
                      <span className="font-medium text-gray-900">{vehicle.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                        style={{ width: `${vehicle.utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Alerts */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Maintenance Alerts</h4>
            <div className="space-y-4">
              {mockAnalyticsData.operationalInsights.maintenanceAlerts.map((alert, index) => (
                <div key={index} className={`border-l-4 rounded-r-lg p-4 ${
                  alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.vehicle}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.issue}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {alert.daysLeft} days remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Analysis */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Cost Analysis</h4>
            <div className="space-y-6">
              {mockAnalyticsData.operationalInsights.costAnalysis.map((cost, index) => {
                const TrendIcon = getTrendIcon(!cost.trend.startsWith('+'));
                
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cost.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{formatCurrency(cost.amount)}</span>
                        <div className={`flex items-center gap-1 text-xs ${getTrendColor(!cost.trend.startsWith('+'))}`}>
                          <TrendIcon className="h-3 w-3" />
                          <span>{cost.trend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                          style={{ width: `${cost.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                        {formatPercentage(cost.percentage)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Metric Detail Modal
  const renderMetricDetailModal = () => {
    if (!selectedMetric) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedMetric.title} Details</h3>
              <p className="text-sm text-gray-500">Detailed analysis and insights</p>
            </div>
            <button
              onClick={() => setSelectedMetric(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{selectedMetric.value}</p>
                  <p className="text-sm text-gray-600 mt-1">Current value</p>
                </div>
                <div className={`flex items-center gap-2 ${getTrendColor(selectedMetric.changeUp)}`}>
                  {selectedMetric.changeUp ? (
                    <ArrowTrendingUpIcon className="h-5 w-5" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5" />
                  )}
                  <span className="text-lg font-medium">{selectedMetric.change}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{selectedMetric.description}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Historical Data</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">Period {item}</span>
                    <span className="text-sm font-medium text-gray-900">Value {item}</span>
                    <span className={`text-xs ${item % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item % 2 === 0 ? '+5.2%' : '-2.1%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={() => setSelectedMetric(null)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive delivery and operational insights</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="px-5 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              {mockAnalyticsData.timePeriods.map((period) => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors disabled:opacity-50"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              {isExporting ? 'Exporting...' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                viewMode === 'overview'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('delivery')}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                viewMode === 'delivery'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Delivery Metrics
            </button>
            <button
              onClick={() => setViewMode('revenue')}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                viewMode === 'revenue'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Revenue Analytics
            </button>
            <button
              onClick={() => setViewMode('performance')}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                viewMode === 'performance'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setViewMode('operations')}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                viewMode === 'operations'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Operations
            </button>
          </div>
        </div>

        {/* KPI Cards - Always Visible */}
        {renderKPICards()}
      </div>

      {/* Main Content based on View Mode */}
      <div className="space-y-6">
        {(viewMode === 'overview' || viewMode === 'delivery') && renderDeliveryMetrics()}
        {(viewMode === 'overview' || viewMode === 'revenue') && renderRevenueAnalytics()}
        {(viewMode === 'overview' || viewMode === 'performance') && renderPerformanceAnalytics()}
        {(viewMode === 'overview' || viewMode === 'operations') && renderOperationalInsights()}

        {/* Quick Insights */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
              <p className="text-sm text-gray-500">Key recommendations and alerts</p>
            </div>
            <InformationCircleIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Optimization Opportunity</span>
              </div>
              <p className="text-sm text-blue-800">
                Route efficiency can be improved by 15% by optimizing Victoria Island deliveries
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <BoltIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Peak Performance</span>
              </div>
              <p className="text-sm text-green-800">
                Driver Amina Yusuf achieved 99.1% success rate this month - consider incentive
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Maintenance Alert</span>
              </div>
              <p className="text-sm text-yellow-800">
                Vehicle VIL789 requires brake maintenance in 7 days - schedule service
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TruckIcon className="h-6 w-6 text-gray-400" />
              <h4 className="font-medium text-gray-900">Delivery Summary</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Distance Covered</span>
                <span className="text-sm font-medium text-gray-900">12,456 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fuel Consumption</span>
                <span className="text-sm font-medium text-gray-900">1,004 L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Carbon Emissions</span>
                <span className="text-sm font-medium text-gray-900">2.68 tons</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BanknotesIcon className="h-6 w-6 text-gray-400" />
              <h4 className="font-medium text-gray-900">Financial Summary</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Net Profit</span>
                <span className="text-sm font-medium text-green-600">{formatCurrency(15090000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Profit Margin</span>
                <span className="text-sm font-medium text-gray-900">23.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="text-sm font-medium text-gray-900">18.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserGroupIcon className="h-6 w-6 text-gray-400" />
              <h4 className="font-medium text-gray-900">Customer Summary</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New Customers</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Retention Rate</span>
                <span className="text-sm font-medium text-gray-900">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Order Value</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(14850)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Detail Modal */}
      {renderMetricDetailModal()}
    </div>
  );
};

export default Analytics;
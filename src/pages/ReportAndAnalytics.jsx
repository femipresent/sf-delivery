import React, { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const ReportsAndAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-17');
  
  // Shipment data from your previous data
  const shipments = [
    // Delivered (Paid) Shipments - 5 items
    {
      id: 'FRT-2024-00157',
      name: 'Documents Package',
      status: 'Delivered',
      origin: 'Lagos Office',
      destination: 'Ikeja Office',
      service: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 14:30',
      amount: 3500,
      weight: '0.3 kg',
      driver: 'Musa Ibrahim',
      hasPOD: true,
      paymentDate: '2024-01-14 15:45'
    },
    {
      id: 'FRT-2024-00156',
      name: 'Small Electronics',
      status: 'Delivered',
      origin: 'Lagos Seller',
      destination: 'Ibadan Customer',
      service: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 16:45',
      amount: 12000,
      weight: '2.5 kg',
      driver: 'Chukwu Emeka',
      hasPOD: true,
      paymentDate: '2024-01-14 17:30'
    },
    {
      id: 'FRT-2024-00153',
      name: 'Food Items',
      status: 'Delivered',
      origin: 'Lagos Restaurant',
      destination: 'Lagos Office',
      service: 'Same-Day',
      scheduled: '2024-01-13',
      deliveredAt: '2024-01-13 18:20',
      amount: 3800,
      weight: '4.2 kg',
      driver: 'Tunde Lawal',
      hasPOD: true,
      paymentDate: '2024-01-13 19:15'
    },
    {
      id: 'FRT-2024-00152',
      name: 'Office Supplies',
      status: 'Delivered',
      origin: 'Lagos Supplier',
      destination: 'Abuja Office',
      service: 'LTL',
      scheduled: '2024-01-13',
      deliveredAt: '2024-01-13 15:30',
      amount: 18500,
      weight: '25 kg',
      driver: 'Ngozi Okoro',
      hasPOD: true,
      paymentDate: '2024-01-13 16:45'
    },
    {
      id: 'FRT-2024-00151',
      name: 'Pharmaceuticals',
      status: 'Delivered',
      origin: 'Lagos Pharma',
      destination: 'Ibadan Clinic',
      service: 'Express',
      scheduled: '2024-01-12',
      deliveredAt: '2024-01-12 12:15',
      amount: 9500,
      weight: '5.2 kg',
      driver: 'Chinedu Obi',
      hasPOD: true,
      paymentDate: '2024-01-12 13:30'
    },
    
    // Pending Shipments - 5 items
    {
      id: 'FRT-2024-00158',
      name: 'Phone Delivery',
      status: 'In Transit',
      origin: 'Lagos Warehouse',
      destination: 'Lagos Customer',
      service: 'Same-Day',
      scheduled: '2024-01-15',
      amount: 4500,
      weight: '0.5 kg',
      driver: 'John Okafor',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00155',
      name: 'Medical Supplies',
      status: 'Picked Up',
      origin: 'Lagos Pharmacy',
      destination: 'Lagos Hospital',
      service: 'Same-Day',
      scheduled: '2024-01-16',
      amount: 5500,
      weight: '3.5 kg',
      driver: 'Amina Yusuf',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00154',
      name: 'Clothing Package',
      status: 'Picked Up',
      origin: 'Lagos Store',
      destination: 'Lagos Customer',
      service: 'Standard',
      scheduled: '2024-01-16',
      amount: 4200,
      weight: '1.8 kg',
      driver: 'Bola Adekunle',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00150',
      name: 'Small Parcel',
      status: 'Booked',
      origin: 'Lagos Shop',
      destination: 'Port Harcourt',
      service: 'Standard',
      scheduled: '2024-01-17',
      amount: 12500,
      weight: '3.8 kg',
      driver: '',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00149',
      name: 'E-commerce Package',
      status: 'Assigned',
      origin: 'Lagos Fulfillment',
      destination: 'Lagos Customer',
      service: 'Last-Mile',
      scheduled: '2024-01-17',
      amount: 3200,
      weight: '0.8 kg',
      driver: 'Kabiru Sani',
      hasPOD: false
    }
  ];

  // Calculate all metrics
  const calculateMetrics = () => {
    const totalShipments = shipments.length;
    const deliveredShipments = shipments.filter(s => s.status === 'Delivered');
    const pendingShipments = shipments.filter(s => s.status !== 'Delivered');
    
    const totalRevenue = deliveredShipments.reduce((sum, s) => sum + s.amount, 0);
    const pendingRevenue = pendingShipments.reduce((sum, s) => sum + s.amount, 0);
    const totalWeight = shipments.reduce((sum, s) => {
      const weightNum = parseFloat(s.weight) || 0;
      return sum + weightNum;
    }, 0);
    
    // Calculate by service type
    const serviceTypes = {};
    shipments.forEach(s => {
      serviceTypes[s.service] = (serviceTypes[s.service] || 0) + 1;
    });
    
    // Calculate by status
    const statusCounts = {};
    shipments.forEach(s => {
      statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
    });
    
    // Calculate by destination
    const destinationStats = {};
    shipments.forEach(s => {
      if (!destinationStats[s.destination]) {
        destinationStats[s.destination] = {
          count: 0,
          revenue: 0,
          weight: 0
        };
      }
      destinationStats[s.destination].count++;
      if (s.status === 'Delivered') {
        destinationStats[s.destination].revenue += s.amount;
      }
      const weightNum = parseFloat(s.weight) || 0;
      destinationStats[s.destination].weight += weightNum;
    });
    
    // Calculate daily stats
    const dailyStats = {};
    shipments.forEach(s => {
      const date = s.scheduled.split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = {
          shipments: 0,
          revenue: 0,
          delivered: 0
        };
      }
      dailyStats[date].shipments++;
      if (s.status === 'Delivered') {
        dailyStats[date].revenue += s.amount;
        dailyStats[date].delivered++;
      }
    });
    
    // Driver performance
    const driverStats = {};
    shipments.forEach(s => {
      if (s.driver) {
        if (!driverStats[s.driver]) {
          driverStats[s.driver] = {
            deliveries: 0,
            completed: 0,
            revenue: 0
          };
        }
        driverStats[s.driver].deliveries++;
        if (s.status === 'Delivered') {
          driverStats[s.driver].completed++;
          driverStats[s.driver].revenue += s.amount;
        }
      }
    });
    
    return {
      totalShipments,
      deliveredShipments: deliveredShipments.length,
      pendingShipments: pendingShipments.length,
      totalRevenue,
      pendingRevenue,
      totalWeight: `${totalWeight.toFixed(1)} kg`,
      deliveryRate: (deliveredShipments.length / totalShipments * 100).toFixed(1),
      averageRevenue: deliveredShipments.length > 0 ? totalRevenue / deliveredShipments.length : 0,
      serviceTypes,
      statusCounts,
      destinationStats,
      dailyStats,
      driverStats
    };
  };

  const metrics = calculateMetrics();

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  // Generate report data
  const generateReportData = () => {
    switch(reportType) {
      case 'financial':
        return {
          title: 'Financial Report',
          headers: ['Date', 'Shipment ID', 'Description', 'Amount', 'Status', 'Payment Date'],
          data: shipments
            .filter(s => s.status === 'Delivered')
            .map(s => [
              s.scheduled,
              s.id,
              s.name,
              formatCurrency(s.amount),
              s.status,
              s.paymentDate || 'N/A'
            ])
        };
      case 'performance':
        return {
          title: 'Performance Report',
          headers: ['Driver', 'Total Deliveries', 'Completed', 'Success Rate', 'Revenue'],
          data: Object.entries(metrics.driverStats).map(([driver, stats]) => [
            driver,
            stats.deliveries,
            stats.completed,
            `${((stats.completed / stats.deliveries) * 100).toFixed(1)}%`,
            formatCurrency(stats.revenue)
          ])
        };
      case 'shipments':
        return {
          title: 'Shipments Report',
          headers: ['ID', 'Description', 'Status', 'Origin', 'Destination', 'Service', 'Amount', 'Weight'],
          data: shipments.map(s => [
            s.id,
            s.name,
            s.status,
            s.origin,
            s.destination,
            s.service,
            formatCurrency(s.amount),
            s.weight
          ])
        };
      default: // overview
        return {
          title: 'Overview Report',
          headers: ['Metric', 'Value', 'Details'],
          data: [
            ['Total Shipments', metrics.totalShipments, `Delivered: ${metrics.deliveredShipments}, Pending: ${metrics.pendingShipments}`],
            ['Total Revenue', formatCurrency(metrics.totalRevenue), `Pending: ${formatCurrency(metrics.pendingRevenue)}`],
            ['Delivery Rate', `${metrics.deliveryRate}%`, `${metrics.deliveredShipments} of ${metrics.totalShipments} shipments`],
            ['Average Revenue', formatCurrency(metrics.averageRevenue), 'Per delivered shipment'],
            ['Total Weight', metrics.totalWeight, 'Across all shipments'],
            ['Service Distribution', Object.keys(metrics.serviceTypes).length, Object.entries(metrics.serviceTypes).map(([s, c]) => `${s}: ${c}`).join(', ')]
          ]
        };
    }
  };

  const reportData = generateReportData();

  // Export functions
  const exportToCSV = () => {
    const csvContent = [
      reportData.headers.join(','),
      ...reportData.data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${reportData.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    alert(`Generating PDF report: ${reportData.title}`);
    // In a real app, this would generate a PDF using a library like jsPDF
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Track performance, revenue, and shipment analytics</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
              Export PDF
            </button>
            <button
              onClick={printReport}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center"
            >
              <PrinterIcon className="w-5 h-5 mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="overview">Overview</option>
              <option value="financial">Financial</option>
              <option value="performance">Performance</option>
              <option value="shipments">Shipments</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <TruckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-lg font-bold text-gray-900">{metrics.totalShipments}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-green-600 mr-2">↑ 12%</span>
                <span>vs last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-green-600 mr-2">↑ 18%</span>
                <span>vs last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Rate</p>
              <p className="text-lg font-bold text-gray-900">{metrics.deliveryRate}%</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-green-600 mr-2">↑ 5%</span>
                <span>vs last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <ArrowTrendingUpIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Revenue/Shipment</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(metrics.averageRevenue)}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-green-600 mr-2">↑ 8%</span>
                <span>vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Shipment Status Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Shipment Status Distribution</h3>
            <ChartPieIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(metrics.statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    status === 'Delivered' ? 'bg-green-500' :
                    status === 'In Transit' ? 'bg-blue-500' :
                    status === 'Picked Up' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`} />
                  <span className="text-sm text-gray-700">{status}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">{count}</span>
                  <span className="text-xs text-gray-500">
                    {((count / metrics.totalShipments) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type Distribution */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Service Type Distribution</h3>
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(metrics.serviceTypes).map(([service, count]) => (
              <div key={service} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{service}</span>
                  <span className="text-gray-900 font-medium">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / metrics.totalShipments) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Weight
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(metrics.destinationStats)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([destination, stats]) => {
                  const deliveredToDest = shipments.filter(s => 
                    s.destination === destination && s.status === 'Delivered'
                  ).length;
                  const deliveryRate = (deliveredToDest / stats.count * 100).toFixed(1);
                  
                  return (
                    <tr key={destination} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{destination}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{stats.count}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(stats.revenue)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{stats.weight.toFixed(1)} kg</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${deliveryRate >= 80 ? 'bg-green-600' : deliveryRate >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                              style={{ width: `${deliveryRate}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            deliveryRate >= 80 ? 'text-green-600' : 
                            deliveryRate >= 60 ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {deliveryRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Performance */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Deliveries
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Generated
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(metrics.driverStats)
                .sort((a, b) => b[1].completed - a[1].completed)
                .map(([driver, stats]) => {
                  const successRate = (stats.completed / stats.deliveries * 100).toFixed(1);
                  
                  return (
                    <tr key={driver} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <UserGroupIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{driver}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{stats.deliveries}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{stats.completed}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${
                          successRate >= 80 ? 'text-green-600' : 
                          successRate >= 60 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {successRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(stats.revenue)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {successRate >= 80 ? (
                            <>
                              <ArrowTrendingUpIcon className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-xs text-green-600">Excellent</span>
                            </>
                          ) : successRate >= 60 ? (
                            <>
                              <ArrowTrendingUpIcon className="w-4 h-4 text-yellow-600 mr-1" />
                              <span className="text-xs text-yellow-600">Good</span>
                            </>
                          ) : (
                            <>
                              <ArrowTrendingDownIcon className="w-4 h-4 text-red-600 mr-1" />
                              <span className="text-xs text-red-600">Needs Improvement</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Report Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{reportData.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              <span>{startDate} to {endDate}</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {reportData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Showing {reportData.data.length} of {reportData.data.length} records
            </div>
            <div>
              Report generated on {new Date().toLocaleDateString('en-NG')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
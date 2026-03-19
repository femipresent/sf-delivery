import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ChartPieIcon, ArrowTrendingUpIcon, TruckIcon, CurrencyDollarIcon, MapPinIcon, UserGroupIcon, ArrowDownTrayIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';

const ReportsAndAnalytics = () => {
  const [reportType, setReportType] = useState('overview');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/bookings');
        const bookings = res.data.data.map(b => ({
          id: b._id,
          trackingNumber: b.trackingNumber,
          name: b.itemDetails?.description || 'Shipment',
          status: b.status === 'draft' ? 'Booked' : b.status === 'assigned' ? 'Assigned' : b.status === 'picked_up' ? 'Picked Up' : b.status === 'in_transit' ? 'In Transit' : b.status === 'delivered' ? 'Delivered' : 'Booked',
          origin: `${b.pickup?.address?.city || ''}`,
          destination: `${b.delivery?.address?.city || ''}`,
          service: b.services?.ftl?.selected ? 'FTL' : b.services?.ltl?.selected ? 'LTL' : b.services?.express?.selected ? 'Express' : 'Last-Mile',
          scheduled: b.pickup?.scheduledDate,
          amount: b.pricing?.total || 0,
          weight: parseFloat(b.itemDetails?.weight) || 0,
          driver: b.assignedDriver?.name || '',
          hasPOD: !!b.proofOfDelivery,
        }));
        setShipments(bookings);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => `₦${amount?.toLocaleString('en-NG') || '0'}`;

  const filtered = shipments.filter(s => {
    if (!startDate && !endDate) return true;
    const date = new Date(s.scheduled);
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    return true;
  });

  const delivered = filtered.filter(s => s.status === 'Delivered');
  const totalRevenue = delivered.reduce((sum, s) => sum + s.amount, 0);
  const deliveryRate = filtered.length > 0 ? ((delivered.length / filtered.length) * 100).toFixed(1) : 0;
  const avgRevenue = delivered.length > 0 ? totalRevenue / delivered.length : 0;

  const serviceTypes = filtered.reduce((acc, s) => { acc[s.service] = (acc[s.service] || 0) + 1; return acc; }, {});
  const statusCounts = filtered.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc; }, {});
  const driverStats = filtered.reduce((acc, s) => {
    if (!s.driver) return acc;
    if (!acc[s.driver]) acc[s.driver] = { deliveries: 0, completed: 0, revenue: 0 };
    acc[s.driver].deliveries++;
    if (s.status === 'Delivered') { acc[s.driver].completed++; acc[s.driver].revenue += s.amount; }
    return acc;
  }, {});

  const getReportData = () => {
    switch (reportType) {
      case 'financial':
        return { headers: ['Date', 'Tracking #', 'Description', 'Amount', 'Status'], rows: delivered.map(s => [new Date(s.scheduled).toLocaleDateString('en-NG'), s.trackingNumber, s.name, formatCurrency(s.amount), s.status]) };
      case 'shipments':
        return { headers: ['Tracking #', 'Description', 'Status', 'Origin', 'Destination', 'Service', 'Amount'], rows: filtered.map(s => [s.trackingNumber, s.name, s.status, s.origin, s.destination, s.service, formatCurrency(s.amount)]) };
      default:
        return { headers: ['Metric', 'Value'], rows: [['Total Shipments', filtered.length], ['Delivered', delivered.length], ['Total Revenue', formatCurrency(totalRevenue)], ['Delivery Rate', `${deliveryRate}%`], ['Avg Revenue/Shipment', formatCurrency(avgRevenue)]] };
    }
  };

  const exportCSV = () => {
    const { headers, rows } = getReportData();
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const report = getReportData();

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-200 border-t-green-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Track performance, revenue, and shipment analytics</p>
        </div>
        <button onClick={exportCSV} className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center">
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Export CSV
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="overview">Overview</option>
              <option value="financial">Financial</option>
              <option value="shipments">Shipments</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="flex items-end">
            <button onClick={() => { setStartDate(''); setEndDate(''); }} className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Clear Filters</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Shipments', value: filtered.length, icon: TruckIcon, color: 'bg-blue-100 text-blue-600' },
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: CurrencyDollarIcon, color: 'bg-green-100 text-green-600' },
          { label: 'Delivery Rate', value: `${deliveryRate}%`, icon: ChartBarIcon, color: 'bg-purple-100 text-purple-600' },
          { label: 'Avg Revenue', value: formatCurrency(avgRevenue), icon: ArrowTrendingUpIcon, color: 'bg-yellow-100 text-yellow-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${color.split(' ')[0]}`}>
                <Icon className={`w-6 h-6 ${color.split(' ')[1]}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${status === 'Delivered' ? 'bg-green-500' : status === 'In Transit' ? 'bg-blue-500' : status === 'Picked Up' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                  <span className="text-sm text-gray-700">{status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{count}</span>
                  <span className="text-xs text-gray-500">({((count / filtered.length) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            ))}
            {Object.keys(statusCounts).length === 0 && <p className="text-gray-500 text-sm">No data</p>}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution</h3>
          <div className="space-y-3">
            {Object.entries(serviceTypes).map(([service, count]) => (
              <div key={service}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{service}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(count / filtered.length) * 100}%` }} />
                </div>
              </div>
            ))}
            {Object.keys(serviceTypes).length === 0 && <p className="text-gray-500 text-sm">No data</p>}
          </div>
        </div>
      </div>

      {Object.keys(driverStats).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {['Driver', 'Assigned', 'Completed', 'Success Rate', 'Revenue'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(driverStats).sort((a, b) => b[1].completed - a[1].completed).map(([driver, stats]) => {
                  const rate = ((stats.completed / stats.deliveries) * 100).toFixed(1);
                  return (
                    <tr key={driver} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{driver}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{stats.deliveries}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{stats.completed}</td>
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: rate >= 80 ? '#16a34a' : rate >= 60 ? '#ca8a04' : '#dc2626' }}>{rate}%</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(stats.revenue)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>{report.headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => <td key={j} className="px-6 py-4 text-sm text-gray-900">{cell}</td>)}
                </tr>
              ))}
              {report.rows.length === 0 && (
                <tr><td colSpan={report.headers.length} className="px-6 py-8 text-center text-gray-500">No data available</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-500 flex justify-between">
          <span>{report.rows.length} records</span>
          <span>Generated on {new Date().toLocaleDateString('en-NG')}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;

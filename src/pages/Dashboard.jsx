import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get('/bookings/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalShipments = stats?.totalBookings || 0;
  const activeOrders = stats?.stats?.filter(s => ['assigned', 'picked_up', 'in_transit'].includes(s._id))
    .reduce((sum, s) => sum + s.count, 0) || 0;
  const totalRevenue = stats?.stats?.reduce((sum, s) => sum + (s.totalAmount || 0), 0) || 0;

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to S&F Delivery</h1>
      <p className="text-gray-600 mt-2">Your logistics dashboard</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Shipments</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900">{totalShipments}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Active Orders</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">{activeOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ₦{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

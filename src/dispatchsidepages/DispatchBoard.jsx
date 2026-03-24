import React, { useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import {
  TruckIcon, MapPinIcon, CheckCircleIcon, ExclamationTriangleIcon,
  UserCircleIcon, MagnifyingGlassIcon, ArrowPathIcon, XMarkIcon,
  PhoneIcon, EyeIcon, ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const statusMap = {
  draft: { col: 'unassigned', label: 'Unassigned', color: 'bg-red-100 text-red-800' },
  pending: { col: 'unassigned', label: 'Unassigned', color: 'bg-red-100 text-red-800' },
  assigned: { col: 'assigned', label: 'Assigned', color: 'bg-yellow-100 text-yellow-800' },
  picked_up: { col: 'pickup', label: 'Picked Up', color: 'bg-orange-100 text-orange-800' },
  in_transit: { col: 'intransit', label: 'In Transit', color: 'bg-blue-100 text-blue-800' },
  delivered: { col: 'completed', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  failed: { col: 'exceptions', label: 'Failed', color: 'bg-gray-100 text-gray-800' },
};

const columns = [
  { key: 'unassigned', title: 'Unassigned', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
  { key: 'assigned', title: 'Assigned', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700' },
  { key: 'pickup', title: 'Picked Up', color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-700' },
  { key: 'intransit', title: 'In Transit', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
  { key: 'completed', title: 'Completed', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
  { key: 'exceptions', title: 'Exceptions', color: 'bg-gray-50 border-gray-200', textColor: 'text-gray-700' },
];

const DispatchBoard = () => {
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignModal, setAssignModal] = useState(null); // booking to assign
  const [selectedDriver, setSelectedDriver] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [detailModal, setDetailModal] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pendingRes, activeRes, driversRes] = await Promise.all([
        API.get('/dispatcher/shipments/pending'),
        API.get('/dispatcher/shipments/active'),
        API.get('/dispatcher/drivers/available'),
      ]);
      const all = [...(pendingRes.data.data || []), ...(activeRes.data.data || [])];
      // deduplicate by _id
      const seen = new Set();
      const deduped = all.filter(b => { if (seen.has(b._id)) return false; seen.add(b._id); return true; });
      setBookings(deduped);
      setDrivers(driversRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch dispatch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAssign = async () => {
    if (!selectedDriver || !assignModal) return;
    setAssigning(true);
    try {
      await API.post(`/dispatcher/shipments/${assignModal._id}/assign`, { driverId: selectedDriver });
      setAssignModal(null);
      setSelectedDriver('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Assignment failed');
    } finally {
      setAssigning(false);
    }
  };

  const getServiceType = (b) => {
    if (b.services?.ftl?.selected) return 'FTL';
    if (b.services?.ltl?.selected) return 'LTL';
    if (b.services?.express?.selected) return 'Express';
    return 'Last-Mile';
  };

  const filtered = bookings.filter(b => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      b.trackingNumber?.toLowerCase().includes(q) ||
      b.pickup?.address?.city?.toLowerCase().includes(q) ||
      b.delivery?.address?.city?.toLowerCase().includes(q)
    );
  });

  const getColumn = (b) => statusMap[b.status]?.col || 'unassigned';

  const boardData = columns.reduce((acc, col) => {
    acc[col.key] = filtered.filter(b => getColumn(b) === col.key);
    return acc;
  }, {});

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-200 border-t-red-600"></div>
      <span className="ml-3 text-gray-600">Loading dispatch board...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispatch Board</h1>
          <p className="text-gray-600 text-sm">{bookings.length} total shipments • {bookings.filter(b => b.status === 'draft' || b.status === 'pending').length} awaiting assignment</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tracking, city..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-56"
            />
          </div>
          <button onClick={fetchData} className="p-2 border border-gray-300 rounded-full hover:bg-gray-50" title="Refresh">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {columns.map(col => (
          <div key={col.key} className={`${col.color} border rounded-xl p-3 text-center`}>
            <div className={`text-lg font-bold text-gray-900`}>{boardData[col.key].length}</div>
            <div className={`text-xs font-medium ${col.textColor}`}>{col.title}</div>
          </div>
        ))}
      </div>

      {/* Board */}
      <div className="flex overflow-x-auto pb-4 space-x-4">
        {columns.map(col => (
          <div key={col.key} className={`flex-shrink-0 w-72 ${col.color} border rounded-xl p-3 min-h-96`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`font-semibold text-sm ${col.textColor}`}>{col.title}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full bg-white ${col.textColor}`}>{boardData[col.key].length}</span>
            </div>

            <div className="space-y-2">
              {boardData[col.key].map(booking => (
                <div key={booking._id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-sm">{booking.trackingNumber}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusMap[booking.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {getServiceType(booking)}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <MapPinIcon className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                    <span className="truncate">{booking.pickup?.address?.city} → {booking.delivery?.address?.city}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    {booking.itemDetails?.description || 'No description'} • {booking.itemDetails?.weight || 0}kg
                  </div>

                  {booking.assignedDriver && (
                    <div className="flex items-center p-1.5 bg-gray-50 rounded-lg mb-2">
                      <UserCircleIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="text-xs font-medium text-gray-700">
                        {booking.assignedDriver?.firstName} {booking.assignedDriver?.lastName}
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-1 mt-2">
                    <button
                      onClick={() => setDetailModal(booking)}
                      className="flex-1 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center justify-center"
                    >
                      <EyeIcon className="h-3 w-3 mr-1" /> View
                    </button>
                    {(booking.status === 'draft' || booking.status === 'pending') && (
                      <button
                        onClick={() => { setAssignModal(booking); setSelectedDriver(''); }}
                        className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg flex items-center justify-center"
                      >
                        <TruckIcon className="h-3 w-3 mr-1" /> Assign
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {boardData[col.key].length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <ClipboardDocumentListIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-xs">No shipments</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Available Drivers */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Available Drivers <span className="text-sm font-normal text-gray-500">({drivers.length} registered)</span>
        </h3>
        {drivers.length === 0 ? (
          <p className="text-gray-500 text-sm">No drivers registered yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {drivers.map(driver => (
              <div key={driver._id} className="border border-gray-200 rounded-xl p-3 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <span className="text-white font-semibold text-xs">
                      {driver.firstName?.[0]}{driver.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{driver.firstName} {driver.lastName}</p>
                    <p className="text-xs text-gray-500">{driver.vehicleInfo || 'No vehicle info'}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{driver.licenseNumber || 'No license'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Driver Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Assign Driver</h3>
                <p className="text-sm text-gray-500">{assignModal.trackingNumber} • {assignModal.pickup?.address?.city} → {assignModal.delivery?.address?.city}</p>
              </div>
              <button onClick={() => setAssignModal(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Driver</label>
              {drivers.length === 0 ? (
                <p className="text-sm text-red-600">No drivers available. Register a driver first.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {drivers.map(driver => (
                    <label key={driver._id} className={`flex items-center p-3 border rounded-xl cursor-pointer ${selectedDriver === driver._id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="driver"
                        value={driver._id}
                        checked={selectedDriver === driver._id}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        className="mr-3 text-red-600"
                      />
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">{driver.firstName?.[0]}{driver.lastName?.[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{driver.firstName} {driver.lastName}</p>
                        <p className="text-xs text-gray-500">{driver.vehicleInfo || 'No vehicle'}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button onClick={() => setAssignModal(null)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedDriver || assigning}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium rounded-full"
              >
                {assigning ? 'Assigning...' : 'Assign Driver'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shipment Details</h3>
              <button onClick={() => setDetailModal(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Tracking #</span><span className="font-medium">{detailModal.trackingNumber}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[detailModal.status]?.color}`}>{detailModal.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{getServiceType(detailModal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Pickup</span><span className="font-medium text-right max-w-xs">{detailModal.pickup?.address?.street}, {detailModal.pickup?.address?.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className="font-medium text-right max-w-xs">{detailModal.delivery?.address?.street}, {detailModal.delivery?.address?.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Weight</span><span className="font-medium">{detailModal.itemDetails?.weight || 0} kg</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-medium text-green-600">₦{(detailModal.pricing?.total || 0).toLocaleString()}</span></div>
              {detailModal.assignedDriver && (
                <div className="flex justify-between"><span className="text-gray-500">Driver</span><span className="font-medium">{detailModal.assignedDriver?.firstName} {detailModal.assignedDriver?.lastName}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">Pickup Contact</span><span className="font-medium">{detailModal.pickup?.contactPerson} • {detailModal.pickup?.contactPhone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Receiver</span><span className="font-medium">{detailModal.delivery?.reciepentName} • {detailModal.delivery?.reciepentPhone}</span></div>
            </div>
            <div className="mt-4 flex space-x-3">
              {(detailModal.status === 'draft' || detailModal.status === 'pending') && (
                <button onClick={() => { setAssignModal(detailModal); setDetailModal(null); setSelectedDriver(''); }} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-sm">
                  Assign Driver
                </button>
              )}
              <button onClick={() => setDetailModal(null)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-full text-sm hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchBoard;

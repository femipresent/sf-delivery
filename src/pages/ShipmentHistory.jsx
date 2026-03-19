import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ShipmentHistory = ({ onTrackShipment, onBookShipment }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [allShipments, setAllShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await API.get('/bookings');
        const bookings = res.data.data.map(b => ({
          id: b._id,
          trackingNumber: b.trackingNumber,
          name: b.itemDetails?.description || `${b.pickup?.address?.city} → ${b.delivery?.address?.city}`,
          status: b.status === 'draft' ? 'Booked' : b.status === 'assigned' ? 'Assigned' : b.status === 'picked_up' ? 'Picked Up' : b.status === 'in_transit' ? 'In Transit' : b.status === 'delivered' ? 'Delivered' : 'Booked',
          origin: `${b.pickup?.address?.street || ''}, ${b.pickup?.address?.city || ''}`,
          destination: `${b.delivery?.address?.street || ''}, ${b.delivery?.address?.city || ''}`,
          service: b.services?.ftl?.selected ? 'FTL' : b.services?.ltl?.selected ? 'LTL' : b.services?.express?.selected ? 'Express' : 'Last-Mile',
          scheduled: b.pickup?.scheduledDate,
          deliveredAt: b.proofOfDelivery?.deliveredAt || '',
          amount: b.pricing?.total || 0,
          weight: `${b.itemDetails?.weight || 0} kg`,
          driver: b.assignedDriver?.name || '',
          hasPOD: !!b.proofOfDelivery,
          deliveryDetails: b.proofOfDelivery ? {
            recipient: b.proofOfDelivery.recipientName,
            notes: b.proofOfDelivery.deliveryNotes,
            signature: !!b.proofOfDelivery.signature,
            photo: !!b.proofOfDelivery.photo
          } : null
        }));
        setAllShipments(bookings);
      } catch (err) {
        console.error('Failed to fetch shipments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Picked Up': return 'bg-yellow-100 text-yellow-800';
      case 'Booked': return 'bg-gray-100 text-gray-800';
      case 'Assigned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => `₦${amount?.toLocaleString('en-NG') || '0'}`;

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const filteredShipments = allShipments.filter(shipment => {
    if (filter !== 'all' && shipment.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        shipment.trackingNumber?.toLowerCase().includes(q) ||
        shipment.name?.toLowerCase().includes(q) ||
        shipment.driver?.toLowerCase().includes(q) ||
        shipment.origin?.toLowerCase().includes(q) ||
        shipment.destination?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-200 border-t-green-600"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shipment History</h1>
          <p className="text-gray-600 mt-2">Track and manage all your shipments</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by tracking number, name, driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="In Transit">In Transit</option>
                <option value="Picked Up">Picked Up</option>
                <option value="Booked">Booked</option>
                <option value="Assigned">Assigned</option>
              </select>
              <button onClick={() => { setSearch(''); setFilter('all'); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Clear
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{shipment.trackingNumber}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{shipment.name}</div>
                      <div className="text-sm text-gray-500">{shipment.service} • {shipment.weight}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{shipment.origin} → {shipment.destination}</div>
                      <div className="text-xs text-gray-500">{formatDate(shipment.scheduled)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                      {shipment.driver && <div className="text-xs text-gray-500 mt-1">Driver: {shipment.driver}</div>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(shipment.amount)}</div>
                      <div className="text-xs text-gray-500">{shipment.hasPOD ? 'POD Available' : 'No POD'}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => setSelectedShipment(shipment)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded">View</button>
                        <button onClick={() => onTrackShipment && onTrackShipment(shipment.trackingNumber)} className="px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded">Track</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredShipments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900">No shipments found</h3>
                <button onClick={() => onBookShipment && onBookShipment()} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
                  Book New Shipment
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-3">
              {[['Total', allShipments.length, 'text-gray-900'], ['Delivered', allShipments.filter(s => s.status === 'Delivered').length, 'text-green-600'], ['In Transit', allShipments.filter(s => s.status === 'In Transit').length, 'text-blue-600'], ['Picked Up', allShipments.filter(s => s.status === 'Picked Up').length, 'text-yellow-600']].map(([label, val, color]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600">{label}:</span>
                  <span className={`font-bold ${color}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => onBookShipment && onBookShipment()} className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">Book New Shipment</button>
              <button onClick={() => onTrackShipment && onTrackShipment()} className="w-full px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg">Track Shipment</button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {allShipments.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{s.trackingNumber}</div>
                    <div className="text-xs text-gray-600">{s.status}</div>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(s.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Shipment Details</h2>
                <button onClick={() => setSelectedShipment(null)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Tracking Number</p><p className="font-semibold">{selectedShipment.trackingNumber}</p></div>
                  <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedShipment.status)}`}>{selectedShipment.status}</span></div>
                  <div><p className="text-sm text-gray-500">Origin</p><p className="font-medium">{selectedShipment.origin}</p></div>
                  <div><p className="text-sm text-gray-500">Destination</p><p className="font-medium">{selectedShipment.destination}</p></div>
                  <div><p className="text-sm text-gray-500">Service</p><p className="font-medium">{selectedShipment.service}</p></div>
                  <div><p className="text-sm text-gray-500">Weight</p><p className="font-medium">{selectedShipment.weight}</p></div>
                  <div><p className="text-sm text-gray-500">Driver</p><p className="font-medium">{selectedShipment.driver || 'Not assigned'}</p></div>
                  <div><p className="text-sm text-gray-500">Amount</p><p className="text-xl font-bold text-green-600">{formatCurrency(selectedShipment.amount)}</p></div>
                </div>
                {selectedShipment.deliveryDetails && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Delivery Proof</h4>
                    <p><span className="text-gray-500">Recipient: </span>{selectedShipment.deliveryDetails.recipient}</p>
                    {selectedShipment.deliveryDetails.notes && <p><span className="text-gray-500">Notes: </span>{selectedShipment.deliveryDetails.notes}</p>}
                  </div>
                )}
                <div className="flex space-x-4 pt-4 border-t">
                  <button onClick={() => { setSelectedShipment(null); onTrackShipment && onTrackShipment(selectedShipment.trackingNumber); }} className="flex-1 px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg">Track Shipment</button>
                  <button onClick={() => setSelectedShipment(null)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentHistory;

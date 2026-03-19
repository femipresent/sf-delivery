import React, { useState, useEffect } from 'react';
import { PhotoIcon, CheckCircleIcon, UserCircleIcon, CalendarIcon, MapPinIcon, DocumentTextIcon, MagnifyingGlassIcon, XMarkIcon, TruckIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';

const ProofOfDelivery = () => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveredShipments, setDeliveredShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPODs = async () => {
      try {
        const res = await API.get('/bookings');
        const pods = res.data.data
          .filter(b => b.status === 'delivered' && b.proofOfDelivery)
          .map(b => ({
            id: b._id,
            trackingNumber: b.trackingNumber,
            shipmentName: b.itemDetails?.description || `${b.pickup?.address?.city} → ${b.delivery?.address?.city}`,
            origin: `${b.pickup?.address?.street || ''}, ${b.pickup?.address?.city || ''}`,
            destination: `${b.delivery?.address?.street || ''}, ${b.delivery?.address?.city || ''}`,
            driver: b.assignedDriver?.name || 'N/A',
            deliveredAt: b.proofOfDelivery.deliveredAt,
            recipient: b.proofOfDelivery.recipientName || 'N/A',
            notes: b.proofOfDelivery.deliveryNotes || '',
            hasPhoto: !!b.proofOfDelivery.photo,
            hasSignature: !!b.proofOfDelivery.signature,
            photo: b.proofOfDelivery.photo || null,
            amount: b.pricing?.total || 0,
            weight: `${b.itemDetails?.weight || 0} kg`,
          }));
        setDeliveredShipments(pods);
      } catch (err) {
        console.error('Failed to fetch PODs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPODs();
  }, []);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

  const filtered = deliveredShipments.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.trackingNumber?.toLowerCase().includes(q) || s.shipmentName?.toLowerCase().includes(q) || s.driver?.toLowerCase().includes(q) || s.recipient?.toLowerCase().includes(q);
  });

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-200 border-t-green-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Proof of Delivery</h1>
        <p className="text-gray-600 mt-2">View delivery confirmations with photos and signatures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Proofs', value: deliveredShipments.length, icon: CheckCircleIcon, color: 'bg-green-100 text-green-600' },
          { label: 'With Photos', value: deliveredShipments.filter(s => s.hasPhoto).length, icon: PhotoIcon, color: 'bg-blue-100 text-blue-600' },
          { label: 'With Signatures', value: deliveredShipments.filter(s => s.hasSignature).length, icon: DocumentTextIcon, color: 'bg-purple-100 text-purple-600' },
          { label: 'Delivered Value', value: `₦${deliveredShipments.reduce((s, d) => s + d.amount, 0).toLocaleString()}`, icon: TruckIcon, color: 'bg-amber-100 text-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
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

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by tracking number, driver, recipient..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><XMarkIcon className="w-4 h-4" /></button>}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Shipment', 'Recipient', 'Proof', 'Delivery Date', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-50 rounded-lg mr-3">
                        <TruckIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{s.shipmentName}</p>
                        <p className="text-xs text-gray-500">{s.trackingNumber}</p>
                        <p className="text-xs text-gray-500">{s.origin} → {s.destination}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{s.recipient}</p>
                        <p className="text-xs text-gray-500">Driver: {s.driver}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      {s.hasSignature && <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">Signature</span>}
                      {s.hasPhoto && <span className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full">Photo</span>}
                      {!s.hasSignature && !s.hasPhoto && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">Notes only</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                      {formatDate(s.deliveredAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelectedProof(s)} className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-lg text-sm flex items-center">
                      <DocumentMagnifyingGlassIcon className="w-4 h-4 mr-1" /> View Proof
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proofs found</h3>
            <p className="text-gray-500">{deliveredShipments.length === 0 ? 'No delivered shipments with proof yet.' : 'Try adjusting your search.'}</p>
          </div>
        )}
      </div>

      {selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Proof of Delivery</h2>
                  <p className="text-gray-600">{selectedProof.trackingNumber}</p>
                </div>
                <button onClick={() => setSelectedProof(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedProof.photo && (
                  <div>
                    <p className="font-medium text-gray-900 mb-2 flex items-center"><PhotoIcon className="w-5 h-5 mr-2 text-gray-400" />Delivery Photo</p>
                    <img src={selectedProof.photo} alt="Delivery" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-500">Shipment</p><p className="font-medium">{selectedProof.shipmentName}</p></div>
                    <div><p className="text-gray-500">Recipient</p><p className="font-medium">{selectedProof.recipient}</p></div>
                    <div><p className="text-gray-500">Driver</p><p className="font-medium">{selectedProof.driver}</p></div>
                    <div><p className="text-gray-500">Amount</p><p className="font-medium">₦{selectedProof.amount.toLocaleString()}</p></div>
                    <div><p className="text-gray-500">Weight</p><p className="font-medium">{selectedProof.weight}</p></div>
                    <div><p className="text-gray-500">Delivered At</p><p className="font-medium">{formatDate(selectedProof.deliveredAt)}</p></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Proof Evidence</h4>
                  <div className="flex space-x-2">
                    {selectedProof.hasSignature && <span className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"><CheckCircleIcon className="w-4 h-4 mr-1" />Signature Captured</span>}
                    {selectedProof.hasPhoto && <span className="inline-flex items-center bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"><PhotoIcon className="w-4 h-4 mr-1" />Photo Taken</span>}
                  </div>
                  {selectedProof.notes && <p className="mt-3 text-sm text-gray-700"><span className="font-medium">Notes: </span>{selectedProof.notes}</p>}
                </div>

                <button onClick={() => setSelectedProof(null)} className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofOfDelivery;

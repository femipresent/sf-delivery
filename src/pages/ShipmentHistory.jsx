import React, { useState } from 'react';

const Loader = ({ size = 'md', color = 'green' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
 
  const colorClasses = {
    green: 'border-green-200 border-t-green-600',
    blue: 'border-blue-200 border-t-blue-600',
    white: 'border-gray-200 border-t-white'
  };
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

const ShipmentHistory = ({ onTrackShipment, onBookShipment }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Using YOUR EXACT shipment data
  const allShipments = [
    { 
      id: 'FRT-2024-00158', 
      trackingNumber: 'TRK789012345',
      name: 'Phone Delivery',
      status: 'In Transit', 
      origin: 'Lagos Warehouse', 
      destination: 'Lagos Customer',
      service: 'Same-Day',
      scheduled: '2024-01-15',
      deliveredAt: '',
      amount: 4500,
      weight: '0.5 kg',
      driver: 'John Okafor',
      hasPOD: false,
      pickupDetails: {
        pickedUpBy: 'Company Staff - Musa',
        pickupTime: '2024-01-15 09:30',
        pickupPhoto: true,
        pickupNotes: 'Phone packaged securely'
      },
      deliveryDetails: null
    },
    { 
      id: 'FRT-2024-00157', 
      trackingNumber: 'TRK789012344',
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
      pickupDetails: {
        pickedUpBy: 'Company Staff - Amina',
        pickupTime: '2024-01-14 08:15',
        pickupPhoto: true,
        pickupNotes: 'Documents in sealed envelope'
      },
      deliveryDetails: {
        recipient: 'Office Manager',
        signature: true,
        photo: true,
        notes: 'Received by secretary',
        deliveryProof: 'Photo available'
      }
    },
    { 
      id: 'FRT-2024-00156', 
      trackingNumber: 'TRK789012343',
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
      pickupDetails: {
        pickedUpBy: 'Company Staff - David',
        pickupTime: '2024-01-14 07:30',
        pickupPhoto: true,
        pickupNotes: 'Electronics properly packed'
      },
      deliveryDetails: {
        recipient: 'Customer',
        signature: true,
        photo: true,
        notes: 'Delivered to doorstep',
        deliveryProof: 'Signature & photo'
      }
    },
    { 
      id: 'FRT-2024-00155', 
      trackingNumber: 'TRK789012342',
      name: 'Medical Supplies',
      status: 'Picked Up', 
      origin: 'Lagos Pharmacy', 
      destination: 'Lagos Hospital',
      service: 'Same-Day',
      scheduled: '2024-01-16',
      deliveredAt: '',
      amount: 5500,
      weight: '3.5 kg',
      driver: 'Amina Yusuf',
      hasPOD: false,
      pickupDetails: {
        pickedUpBy: 'Company Staff - James',
        pickupTime: '2024-01-16 10:00',
        pickupPhoto: true,
        pickupNotes: 'Temperature-controlled items verified'
      },
      deliveryDetails: null
    },
    { 
      id: 'FRT-2024-00154', 
      trackingNumber: 'TRK789012341',
      name: 'Clothing Package',
      status: 'Picked Up', 
      origin: 'Lagos Store', 
      destination: 'Lagos Customer',
      service: 'Standard',
      scheduled: '2024-01-16',
      deliveredAt: '',
      amount: 4200,
      weight: '1.8 kg',
      driver: 'Bola Adekunle',
      hasPOD: false,
      pickupDetails: {
        pickedUpBy: 'Company Staff - Sarah',
        pickupTime: '2024-01-16 11:45',
        pickupPhoto: true,
        pickupNotes: 'Clothes packaged in box'
      },
      deliveryDetails: null
    },
    { 
      id: 'FRT-2024-00153', 
      trackingNumber: 'TRK789012340',
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
      pickupDetails: {
        pickedUpBy: 'Company Staff - Mike',
        pickupTime: '2024-01-13 06:00',
        pickupPhoto: true,
        pickupNotes: 'Food properly insulated'
      },
      deliveryDetails: {
        recipient: 'Office Reception',
        signature: true,
        photo: true,
        notes: 'Delivered warm',
        deliveryProof: 'Photo evidence'
      }
    },
    { 
      id: 'FRT-2024-00152', 
      trackingNumber: 'TRK789012339',
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
      pickupDetails: {
        pickedUpBy: 'Company Staff - Peter',
        pickupTime: '2024-01-13 08:30',
        pickupPhoto: true,
        pickupNotes: 'Supplies properly loaded'
      },
      deliveryDetails: {
        recipient: 'Office Manager',
        signature: true,
        photo: true,
        notes: 'Received in good condition',
        deliveryProof: 'Signature confirmation'
      }
    },
    { 
      id: 'FRT-2024-00151', 
      trackingNumber: 'TRK789012338',
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
      pickupDetails: {
        pickedUpBy: 'Company Staff - Grace',
        pickupTime: '2024-01-12 07:00',
        pickupPhoto: true,
        pickupNotes: 'Temperature logged throughout'
      },
      deliveryDetails: {
        recipient: 'Clinic Administrator',
        signature: true,
        photo: true,
        notes: 'Cold chain maintained',
        deliveryProof: 'Temperature log + signature'
      }
    },
    { 
      id: 'FRT-2024-00150', 
      trackingNumber: 'TRK789012337',
      name: 'Small Parcel',
      status: 'Booked', 
      origin: 'Lagos Shop', 
      destination: 'Port Harcourt',
      service: 'Standard',
      scheduled: '2024-01-17',
      deliveredAt: '',
      amount: 12500,
      weight: '3.8 kg',
      driver: '',
      hasPOD: false,
      pickupDetails: null,
      deliveryDetails: null
    },
    { 
      id: 'FRT-2024-00149', 
      trackingNumber: 'TRK789012336',
      name: 'E-commerce Package',
      status: 'Assigned', 
      origin: 'Lagos Fulfillment', 
      destination: 'Lagos Customer',
      service: 'Last-Mile',
      scheduled: '2024-01-17',
      deliveredAt: '',
      amount: 3200,
      weight: '0.8 kg',
      driver: 'Kabiru Sani',
      hasPOD: false,
      pickupDetails: null,
      deliveryDetails: null
    }
  ];

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

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredShipments = allShipments.filter(shipment => {
    if (filter !== 'all' && shipment.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        shipment.trackingNumber?.toLowerCase().includes(searchLower) ||
        shipment.name?.toLowerCase().includes(searchLower) ||
        shipment.driver?.toLowerCase().includes(searchLower) ||
        shipment.origin?.toLowerCase().includes(searchLower) ||
        shipment.destination?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleViewDetails = (shipment) => {
    setSelectedShipment(shipment);
  };

  const handleCloseDetails = () => {
    setSelectedShipment(null);
  };

  const handleTrackShipment = (trackingNumber) => {
    if (onTrackShipment && trackingNumber) {
      onTrackShipment(trackingNumber);
    }
  };

  const handleBookNewShipment = () => {
    if (onBookShipment) {
      onBookShipment();
    }
  };

  const downloadInvoice = (shipment) => {
    const invoiceContent = `
      FreightFlow Shipping Invoice
      ============================
      
      Shipment ID: ${shipment.id}
      Tracking Number: ${shipment.trackingNumber}
      Name: ${shipment.name}
      Date: ${new Date().toLocaleDateString()}
      
      Origin: ${shipment.origin}
      Destination: ${shipment.destination}
      
      Scheduled: ${formatDate(shipment.scheduled)}
      ${shipment.deliveredAt ? `Delivered: ${formatDate(shipment.deliveredAt)}` : 'Status: Pending Delivery'}
      
      Service: ${shipment.service}
      Weight: ${shipment.weight}
      Driver: ${shipment.driver || 'Not assigned'}
      
      Status: ${shipment.status}
      
      Amount: ${formatCurrency(shipment.amount)}
      
      ${shipment.pickupDetails ? `
      Pickup Details:
      - Picked up by: ${shipment.pickupDetails.pickedUpBy}
      - Pickup time: ${new Date(shipment.pickupDetails.pickupTime).toLocaleString()}
      - Notes: ${shipment.pickupDetails.pickupNotes}
      ` : ''}
      
      ${shipment.deliveryDetails ? `
      Delivery Proof:
      - Recipient: ${shipment.deliveryDetails.recipient}
      - Delivery proof: ${shipment.deliveryDetails.deliveryProof}
      - Notes: ${shipment.deliveryDetails.notes}
      ` : ''}
      
      ---------------------------------
      Thank you for choosing FreightFlow!
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${shipment.trackingNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shipment History</h1>
          <p className="text-gray-600 mt-2">Track and manage all your shipments in one place</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by tracking number, name, driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="In Transit">In Transit</option>
                <option value="Picked Up">Picked Up</option>
                <option value="Booked">Booked</option>
                <option value="Assigned">Assigned</option>
              </select>
              
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all hover:scale-[1.02]"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Shipments Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipment Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{shipment.trackingNumber}</div>
                      <div className="text-xs text-gray-500">{shipment.id}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{shipment.name}</div>
                      <div className="text-sm text-gray-600">{shipment.service} • {shipment.weight}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{shipment.origin} → {shipment.destination}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(shipment.scheduled)} - {formatDate(shipment.deliveredAt) || 'Pending'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {shipment.driver && `Driver: ${shipment.driver}`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(shipment.amount)}</div>
                      <div className="text-xs text-gray-500">
                        {shipment.hasPOD ? 'POD Available' : 'No POD'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(shipment)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleTrackShipment(shipment.trackingNumber)}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors"
                        >
                          Track
                        </button>
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
                <p className="text-gray-600 mt-1">Try adjusting your search or filter</p>
                <button
                  onClick={handleBookNewShipment}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
                >
                  Book New Shipment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Shipments:</span>
                <span className="font-bold">{allShipments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivered:</span>
                <span className="font-bold text-green-600">
                  {allShipments.filter(s => s.status === 'Delivered').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Transit:</span>
                <span className="font-bold text-blue-600">
                  {allShipments.filter(s => s.status === 'In Transit').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Picked Up:</span>
                <span className="font-bold text-yellow-600">
                  {allShipments.filter(s => s.status === 'Picked Up').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleBookNewShipment}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all"
              >
                Book New Shipment
              </button>
              <button
                onClick={() => handleTrackShipment(null)}
                className="w-full px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-all"
              >
                Track Shipment
              </button>
              <button
                onClick={() => {
                  allShipments.forEach((shipment, index) => {
                    setTimeout(() => downloadInvoice(shipment), index * 100);
                  });
                }}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-all"
              >
                Download All Invoices
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {allShipments.slice(0, 3).map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{shipment.trackingNumber}</div>
                    <div className="text-sm text-gray-600">{shipment.status}</div>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(shipment.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Shipment Details</h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tracking Number</h4>
                    <p className="text-lg font-semibold">{selectedShipment.trackingNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Shipment ID</h4>
                    <p className="text-lg font-semibold">{selectedShipment.id}</p>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Shipment Name</h4>
                      <p className="font-medium">{selectedShipment.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Service</h4>
                      <p className="font-medium">{selectedShipment.service}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Origin</h4>
                    <p className="font-medium">{selectedShipment.origin}</p>
                    <p className="text-sm text-gray-600">Scheduled: {formatDate(selectedShipment.scheduled)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Destination</h4>
                    <p className="font-medium">{selectedShipment.destination}</p>
                    <p className="text-sm text-gray-600">
                      {selectedShipment.deliveredAt 
                        ? `Delivered: ${formatDate(selectedShipment.deliveredAt)}` 
                        : 'Pending Delivery'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedShipment.status)}`}>
                      {selectedShipment.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Driver</h4>
                    <p className="font-medium">{selectedShipment.driver || 'Not assigned'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Weight</h4>
                    <p className="font-medium">{selectedShipment.weight}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Proof of Delivery</h4>
                    <p className="font-medium">{selectedShipment.hasPOD ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedShipment.amount)}</p>
                </div>

                {selectedShipment.pickupDetails && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Pickup Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Picked up by:</span>
                        <span className="font-medium">{selectedShipment.pickupDetails.pickedUpBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup time:</span>
                        <span className="font-medium">{new Date(selectedShipment.pickupDetails.pickupTime).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Photo taken:</span>
                        <span className="font-medium">{selectedShipment.pickupDetails.pickupPhoto ? 'Yes' : 'No'}</span>
                      </div>
                      {selectedShipment.pickupDetails.pickupNotes && (
                        <div>
                          <span className="text-gray-600">Notes:</span>
                          <p className="text-gray-700 mt-1">{selectedShipment.pickupDetails.pickupNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedShipment.deliveryDetails && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Proof</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="font-medium">{selectedShipment.deliveryDetails.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Signature:</span>
                        <span className="font-medium">{selectedShipment.deliveryDetails.signature ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Photo:</span>
                        <span className="font-medium">{selectedShipment.deliveryDetails.photo ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery proof:</span>
                        <span className="font-medium">{selectedShipment.deliveryDetails.deliveryProof}</span>
                      </div>
                      {selectedShipment.deliveryDetails.notes && (
                        <div>
                          <span className="text-gray-600">Notes:</span>
                          <p className="text-gray-700 mt-1">{selectedShipment.deliveryDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => downloadInvoice(selectedShipment)}
                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Download Invoice
                  </button>
                  <button
                    onClick={() => {
                      handleCloseDetails();
                      handleTrackShipment(selectedShipment.trackingNumber);
                    }}
                    className="flex-1 px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors"
                  >
                    Track Shipment
                  </button>
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
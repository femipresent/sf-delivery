import React, { useState } from 'react';
import { 
  PhotoIcon, 
  CheckCircleIcon, 
  UserCircleIcon, 
  CalendarIcon,
  MapPinIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  DocumentMagnifyingGlassIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const ProofOfDelivery = () => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for delivered shipments with proof
  const deliveredShipments = [
    {
      id: 'FRT-2024-00157',
      orderNumber: 'ORD-00157',
      shipmentName: 'Documents Package',
      customer: 'Jane Smith',
      deliveryDate: '2024-01-14 14:30',
      deliveredAt: '2024-01-14 14:30',
      origin: 'Lagos Office',
      destination: 'Ikeja Office',
      driver: 'Musa Ibrahim',
      recipient: 'Office Manager',
      recipientPhone: '+234 801 234 5678',
      proofType: 'full', // full, signature, photo
      deliveryProof: {
        signature: true,
        signatureImage: 'https://example.com/signature1.png',
        photo: true,
        deliveryPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        recipientPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        notes: 'Received by secretary at front desk',
        timestamp: '2024-01-14 14:30:45',
        location: {
          lat: 6.5244,
          lng: 3.3792,
          address: '123 Ikeja Road, Lagos'
        }
      },
      amount: 3500,
      weight: '0.3 kg'
    },
    {
      id: 'FRT-2024-00156',
      orderNumber: 'ORD-00156',
      shipmentName: 'Small Electronics',
      customer: 'Bob Johnson',
      deliveryDate: '2024-01-14 16:45',
      deliveredAt: '2024-01-14 16:45',
      origin: 'Lagos Seller',
      destination: 'Ibadan Customer',
      driver: 'Chukwu Emeka',
      recipient: 'Bob Johnson (Customer)',
      recipientPhone: '+234 802 345 6789',
      proofType: 'full',
      deliveryProof: {
        signature: true,
        signatureImage: 'https://example.com/signature2.png',
        photo: true,
        deliveryPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        recipientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        notes: 'Delivered to doorstep, customer satisfied',
        timestamp: '2024-01-14 16:45:20',
        location: {
          lat: 7.3775,
          lng: 3.9470,
          address: '45 Bodija Market, Ibadan'
        }
      },
      amount: 12000,
      weight: '2.5 kg'
    },
    {
      id: 'FRT-2024-00153',
      orderNumber: 'ORD-00153',
      shipmentName: 'Food Items',
      customer: 'Lagos Restaurant',
      deliveryDate: '2024-01-13 18:20',
      deliveredAt: '2024-01-13 18:20',
      origin: 'Lagos Restaurant',
      destination: 'Lagos Office',
      driver: 'Tunde Lawal',
      recipient: 'Office Reception',
      recipientPhone: '+234 803 456 7890',
      proofType: 'signature',
      deliveryProof: {
        signature: true,
        signatureImage: 'https://example.com/signature3.png',
        photo: false,
        deliveryPhoto: null,
        recipientPhoto: null,
        notes: 'Delivered warm, received by receptionist',
        timestamp: '2024-01-13 18:20:15',
        location: {
          lat: 6.4550,
          lng: 3.3841,
          address: 'Victoria Island, Lagos'
        }
      },
      amount: 3800,
      weight: '4.2 kg'
    },
    {
      id: 'FRT-2024-00152',
      orderNumber: 'ORD-00152',
      shipmentName: 'Office Supplies',
      customer: 'Lagos Supplier',
      deliveryDate: '2024-01-13 15:30',
      deliveredAt: '2024-01-13 15:30',
      origin: 'Lagos Supplier',
      destination: 'Abuja Office',
      driver: 'Ngozi Okoro',
      recipient: 'Office Manager',
      recipientPhone: '+234 804 567 8901',
      proofType: 'photo',
      deliveryProof: {
        signature: false,
        signatureImage: null,
        photo: true,
        deliveryPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        recipientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        notes: 'Received in good condition',
        timestamp: '2024-01-13 15:30:30',
        location: {
          lat: 9.0765,
          lng: 7.3986,
          address: 'Central Business District, Abuja'
        }
      },
      amount: 18500,
      weight: '25 kg'
    }
  ];

  // Filter shipments based on search and filter
  const filteredShipments = deliveredShipments.filter(shipment => {
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.shipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'full' && shipment.proofType === 'full') ||
      (filterStatus === 'signature' && shipment.proofType === 'signature') ||
      (filterStatus === 'photo' && shipment.proofType === 'photo');
    
    return matchesSearch && matchesFilter;
  });

  const handleViewProof = (shipment) => {
    setSelectedProof(shipment);
  };

  const handleCloseProof = () => {
    setSelectedProof(null);
  };

  const handleDownloadProof = (shipment) => {
    console.log('Downloading proof for:', shipment.id);
    // In a real app, this would generate and download a PDF
    alert(`Downloading proof of delivery for ${shipment.id}`);
  };

  const handlePrintProof = (shipment) => {
    console.log('Printing proof for:', shipment.id);
    // In a real app, this would open print dialog
    alert(`Printing proof of delivery for ${shipment.id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProofTypeBadge = (type) => {
    const types = {
      'full': { label: 'Full Proof', color: 'bg-green-100 text-green-800' },
      'signature': { label: 'Signature Only', color: 'bg-blue-100 text-blue-800' },
      'photo': { label: 'Photo Only', color: 'bg-purple-100 text-purple-800' }
    };
    return types[type] || types['full'];
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Proof of Delivery</h1>
        <p className="text-gray-600 mt-2">View and manage delivery confirmations with photos and signatures</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Proofs</p>
              <p className="text-lg font-bold text-gray-900">{deliveredShipments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <PhotoIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">With Photos</p>
              <p className="text-lg font-bold text-gray-900">
                {deliveredShipments.filter(s => s.deliveryProof.photo).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <DocumentTextIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">With Signatures</p>
              <p className="text-lg font-bold text-gray-900">
                {deliveredShipments.filter(s => s.deliveryProof.signature).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg mr-3">
              <TruckIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivered Value</p>
              <p className="text-lg font-bold text-gray-900">
                ₦{deliveredShipments.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, order number, customer, driver..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {['all', 'full', 'signature', 'photo'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterStatus(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                  filterStatus === filter
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Proofs' : 
                 filter === 'full' ? 'Full Proof' :
                 filter === 'signature' ? 'Signature' : 'Photo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Proofs Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proof Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShipments.map((shipment) => {
                const proofType = getProofTypeBadge(shipment.proofType);
                return (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center">
                          <div className="p-2 bg-green-50 rounded-lg mr-3">
                            <TruckIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{shipment.shipmentName}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">ID: {shipment.id}</span>
                              <span>Order: {shipment.orderNumber}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPinIcon className="w-3 h-3 mr-1" />
                              <span>{shipment.origin} → {shipment.destination}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{shipment.recipient}</p>
                          <p className="text-sm text-gray-500">{shipment.recipientPhone}</p>
                          <p className="text-xs text-gray-500 mt-1">Driver: {shipment.driver}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${proofType.color}`}>
                          {proofType.label}
                        </span>
                        <div className="flex space-x-1">
                          {shipment.deliveryProof.signature && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                              Signature
                            </span>
                          )}
                          {shipment.deliveryProof.photo && (
                            <span className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full">
                              Photo
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(shipment.deliveryDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewProof(shipment)}
                          className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-lg text-sm flex items-center"
                        >
                          <DocumentMagnifyingGlassIcon className="w-4 h-4 mr-1" />
                          View Proof
                        </button>
                        <button
                          onClick={() => handleDownloadProof(shipment)}
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                          title="Download"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handlePrintProof(shipment)}
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                          title="Print"
                        >
                          <PrinterIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proofs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Proof Details Modal */}
      {selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Proof of Delivery Details</h2>
                  <p className="text-gray-600">{selectedProof.id} • {selectedProof.shipmentName}</p>
                </div>
                <button
                  onClick={handleCloseProof}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Proof Images */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Delivery Evidence</h3>
                  
                  {/* Delivery Photo */}
                  {selectedProof.deliveryProof.photo && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <PhotoIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">Delivery Photo</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={selectedProof.deliveryProof.deliveryPhoto}
                          alt="Delivery"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Recipient Photo */}
                  {selectedProof.deliveryProof.recipientPhoto && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <UserCircleIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">Recipient Photo</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={selectedProof.deliveryProof.recipientPhoto}
                          alt="Recipient"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Signature */}
                  {selectedProof.deliveryProof.signature && (
                    <div>
                      <div className="flex items-center mb-2">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">Recipient Signature</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-300 mb-2">Signature</div>
                          <p className="text-sm text-gray-500">Digital signature captured on delivery</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Delivery Information</h3>
                  
                  {/* Shipment Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Shipment Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Shipment ID</p>
                        <p className="font-medium">{selectedProof.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Order Number</p>
                        <p className="font-medium">{selectedProof.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Customer</p>
                        <p className="font-medium">{selectedProof.customer}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium">₦{selectedProof.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Weight</p>
                        <p className="font-medium">{selectedProof.weight}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Driver</p>
                        <p className="font-medium">{selectedProof.driver}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Recipient Details</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="font-medium">{selectedProof.recipient}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone Number</p>
                        <p className="font-medium">{selectedProof.recipientPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Notes</h4>
                    <p className="text-gray-700">{selectedProof.deliveryProof.notes}</p>
                  </div>

                  {/* Delivery Metadata */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Metadata</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Time</span>
                        <span className="font-medium">{formatDate(selectedProof.deliveredAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium">{selectedProof.deliveryProof.location.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Proof Type</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProofTypeBadge(selectedProof.proofType).color}`}>
                          {getProofTypeBadge(selectedProof.proofType).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => handleDownloadProof(selectedProof)}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => handlePrintProof(selectedProof)}
                      className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center"
                    >
                      <PrinterIcon className="w-5 h-5 mr-2" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofOfDelivery;
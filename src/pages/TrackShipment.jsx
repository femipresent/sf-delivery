// TrackShipment.jsx
import React, { useState, useEffect, useRef } from 'react';
import MapView from '../components/MapView';
import { useShipmentTracking } from '../hooks/useSocket';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  TruckIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  PrinterIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  MapIcon,
  EyeIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('status');
  const [messageText, setMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  
  const chatEndRef = useRef(null);

  // Real-time location tracking
  const { driverLocation } = useShipmentTracking(shipmentDetails?.id);

  // EXACT SAME SHIPMENT DATA as in ShipperLayout
  const allShipments = [
    {
      id: 'FRT-2024-00158',
      trackingNumber: 'TRK789012345',
      name: 'Phone Delivery',
      status: 'In Transit',
      statusCode: 'in_transit',
      origin: 'Lagos Warehouse',
      destination: 'Lagos Customer',
      serviceType: 'Same-Day',
      scheduled: '2024-01-15',
      deliveredAt: '',
      amount: 4500,
      weight: '0.5 kg',
      driver: {
        name: 'John Okafor',
        phone: '+2348012345678',
        vehicle: 'Toyota Hilux (ABC-123XY)'
      },
      hasPOD: false,
      pickupDetails: {
        pickedUpBy: 'Company Staff - Musa',
        pickupTime: '2024-01-15 09:30',
        pickupPhoto: true,
        pickupNotes: 'Phone packaged securely'
      },
      deliveryDetails: null,
      quote: {
        total: 4500,
        insurance: 200,
        codAmount: 0
      },
      timeline: [
        { id: 1, status: 'Booked', description: 'Shipment booked online', location: 'Lagos Warehouse', timestamp: '2024-01-14 14:30', completed: true },
        { id: 2, status: 'Assigned', description: 'Assigned to driver John Okafor', location: 'Lagos Dispatch', timestamp: '2024-01-15 08:00', completed: true },
        { id: 3, status: 'Picked Up', description: 'Picked up from warehouse', location: 'Lagos Warehouse', timestamp: '2024-01-15 09:30', completed: true },
        { id: 4, status: 'In Transit', description: 'En route to delivery location', location: 'Lagos Mainland', timestamp: '2024-01-15 10:15', completed: true, current: true },
        { id: 5, status: 'Out for Delivery', description: 'Arriving at destination', location: 'Lagos Customer Area', timestamp: '2024-01-15 15:00', completed: false },
        { id: 6, status: 'Delivered', description: 'Package delivered to recipient', location: 'Lagos Customer', timestamp: '2024-01-15 16:30', completed: false }
      ],
      locationHistory: [
        { lat: 6.4654, lng: 3.4064, timestamp: '2024-01-15 09:30', status: 'Picked Up' },
        { lat: 6.4660, lng: 3.4070, timestamp: '2024-01-15 10:15', status: 'In Transit' },
        { lat: 6.4670, lng: 3.4080, timestamp: '2024-01-15 11:15', status: 'In Transit' },
        { lat: 6.5244, lng: 3.3792, timestamp: '2024-01-15 14:45', status: 'Out for Delivery' }
      ],
      currentLocation: { lat: 6.5250, lng: 3.3800 },
      estimatedArrival: '30 minutes',
      distanceCovered: '85%',
      messages: [
        { id: 1, sender: 'driver', text: 'I have picked up the phone package from warehouse', time: '2024-01-15 09:35', read: true },
        { id: 2, sender: 'shipper', text: 'Great! Please deliver by 3 PM', time: '2024-01-15 09:40', read: true },
        { id: 3, sender: 'driver', text: 'Traffic on the route, will be there by 3:30 PM', time: '2024-01-15 14:20', read: true }
      ],
      alerts: [
        { id: 1, type: 'info', message: 'Driver is 5km away from destination', time: 'Just now' },
        { id: 2, type: 'success', message: 'Package picked up successfully', time: '3 hours ago' },
        { id: 3, type: 'info', message: 'ETA updated due to traffic', time: '1 hour ago' }
      ],
      notes: 'Fragile items - Handle with care',
      sender: {
        name: 'Oluwafemi Og.',
        phone: '08012345678',
        email: 'femi@shipper.com'
      },
      receiver: {
        name: 'Lagos Customer',
        phone: '08087654321',
        email: 'customer@email.com'
      }
    },
    {
      id: 'FRT-2024-00157',
      trackingNumber: 'TRK789012344',
      name: 'Documents Package',
      status: 'Delivered',
      statusCode: 'delivered',
      origin: 'Lagos Office',
      destination: 'Ikeja Office',
      serviceType: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 14:30',
      amount: 3500,
      weight: '0.3 kg',
      driver: {
        name: 'Musa Ibrahim',
        phone: '+2348023456789',
        vehicle: 'Honda Motorcycle (DEF-456GH)'
      },
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
      },
      timeline: [
        { id: 1, status: 'Booked', description: 'Documents shipment booked', location: 'Lagos Office', timestamp: '2024-01-13 10:00', completed: true },
        { id: 2, status: 'Picked Up', description: 'Picked up by company staff', location: 'Lagos Office', timestamp: '2024-01-14 08:15', completed: true },
        { id: 3, status: 'In Transit', description: 'En route to Ikeja', location: 'En route', timestamp: '2024-01-14 09:00', completed: true },
        { id: 4, status: 'Delivered', description: 'Delivered to office manager', location: 'Ikeja Office', timestamp: '2024-01-14 14:30', completed: true }
      ],
      messages: [
        { id: 1, sender: 'driver', text: 'Documents picked up successfully', time: '2024-01-14 08:20', read: true },
        { id: 2, sender: 'shipper', text: 'Please deliver to 3rd floor reception', time: '2024-01-14 08:25', read: true }
      ],
      sender: {
        name: 'Oluwafemi Og.',
        phone: '08012345678',
        email: 'femi@shipper.com'
      },
      receiver: {
        name: 'Office Manager',
        phone: '08087654321',
        email: 'office@company.com'
      }
    },
    {
      id: 'FRT-2024-00156',
      trackingNumber: 'TRK789012343',
      name: 'Small Electronics',
      status: 'Delivered',
      statusCode: 'delivered',
      origin: 'Lagos Seller',
      destination: 'Ibadan Customer',
      serviceType: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 16:45',
      amount: 12000,
      weight: '2.5 kg',
      driver: {
        name: 'Chukwu Emeka',
        phone: '+2348034567890',
        vehicle: 'Toyota Camry (GHI-789JK)'
      },
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
      },
      messages: [
        { id: 1, sender: 'shipper', text: 'Handle with care, fragile electronics', time: '2024-01-14 07:25', read: true }
      ]
    }
  ];

  // Recent shipments for quick access - EXACT SAME as before
  const mockRecentShipments = [
    { trackingNumber: 'TRK789012345', name: 'Phone Delivery', status: 'In Transit', date: '2024-01-15' },
    { trackingNumber: 'TRK789012344', name: 'Documents Package', status: 'Delivered', date: '2024-01-14' },
    { trackingNumber: 'TRK789012343', name: 'Small Electronics', status: 'Delivered', date: '2024-01-14' },
    { trackingNumber: 'TRK789012342', name: 'Medical Supplies', status: 'Picked Up', date: '2024-01-16' }
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('trackingHistory')) || [];
    setSearchHistory(savedHistory);
    setRecentShipments(mockRecentShipments);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [shipmentDetails?.messages]);

  const handleTrackShipment = async (trackingNum = trackingNumber) => {
    if (!trackingNum.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    setLoading(true);
    
    try {
      const { default: API } = await import('../api/axios');
      const response = await API.get(`/bookings/track/${trackingNum.trim()}`);
      const data = response.data.data;

      // Map backend data to frontend format
      const shipment = {
        id: data._id,
        trackingNumber: data.trackingNumber,
        name: `${data.pickup?.address?.city} → ${data.delivery?.address?.city}`,
        status: data.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        statusCode: data.status,
        origin: data.pickup?.address?.street + ', ' + data.pickup?.address?.city,
        destination: data.delivery?.address?.street + ', ' + data.delivery?.address?.city,
        pickup: data.pickup,
        delivery: data.delivery,
        timeline: data.trackingHistory?.map((h, i) => ({
          id: i + 1,
          status: h.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: h.note || h.status,
          location: h.location || '',
          timestamp: h.timestamp,
          completed: true
        })) || [],
        messages: []
      };

      setShipmentDetails(shipment);

      const newHistory = [
        { number: trackingNum, name: shipment.name, date: new Date().toISOString() },
        ...searchHistory.filter(h => h.number !== trackingNum)
      ].slice(0, 5);

      setSearchHistory(newHistory);
      localStorage.setItem('trackingHistory', JSON.stringify(newHistory));
    } catch (error) {
      setShipmentDetails(null);
      alert(error.response?.data?.message || 'Tracking number not found. Please check and try again.');
    }
    
    setLoading(false);
  };

  const handleRecentShipmentClick = (trackingNum) => {
    setTrackingNumber(trackingNum);
    handleTrackShipment(trackingNum);
  };

  const handleShareTracking = () => {
    if (!shipmentDetails) return;
    
    const shareText = `Track my shipment #${shipmentDetails.trackingNumber} on FreightFlow: ${window.location.origin}/track/${shipmentDetails.trackingNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Track My Shipment',
        text: shareText,
        url: `${window.location.origin}/track/${shipmentDetails.trackingNumber}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Tracking link copied to clipboard!');
    }
  };

  const handlePrintDetails = () => {
    window.print();
  };

  const handleContactDriver = () => {
    if (!shipmentDetails?.driver?.phone) return;
    setShowCallModal(true);
  };

  const handleContactSupport = () => {
    window.open('tel:017000000');
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !shipmentDetails) return;
    
    setIsSendingMessage(true);
    
    // Add new message to chat
    const newMessage = {
      id: (shipmentDetails.messages?.length || 0) + 1,
      sender: 'shipper',
      text: messageText,
      time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    const updatedMessages = [...(shipmentDetails.messages || []), newMessage];
    const updatedShipment = {
      ...shipmentDetails,
      messages: updatedMessages
    };
    
    setShipmentDetails(updatedShipment);
    setMessageText('');
    setIsSendingMessage(false);
    
    // Simulate driver reply after 2 seconds
    setTimeout(() => {
      const driverReply = {
        id: updatedMessages.length + 1,
        sender: 'driver',
        text: 'Message received. Will update you shortly.',
        time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      
      const finalMessages = [...updatedMessages, driverReply];
      const finalShipment = {
        ...updatedShipment,
        messages: finalMessages
      };
      setShipmentDetails(finalShipment);
    }, 2000);
  };

  // NEW: Call Driver Modal Component
  const CallDriverModal = () => {
    if (!showCallModal || !shipmentDetails?.driver?.phone) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <PhoneIcon className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call Driver</h3>
                <p className="text-sm text-gray-600">Shipment: {shipmentDetails.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowCallModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <UserCircleIcon className="w-12 h-12 text-gray-400 mr-4" />
              <div>
                <p className="font-semibold text-gray-900">{shipmentDetails.driver.name}</p>
                <p className="text-sm text-gray-600">Driver • {shipmentDetails.status}</p>
                {shipmentDetails.driver.vehicle && (
                  <p className="text-sm text-gray-500">{shipmentDetails.driver.vehicle}</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-4">
              <div className="flex items-center mb-2">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600 mr-2" />
                <p className="text-sm font-medium text-blue-800">Safety First</p>
              </div>
              <p className="text-xs text-blue-700">
                For safety reasons, please avoid calling the driver while they are driving.
                Use the messaging feature for non-urgent communication.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${shipmentDetails.driver.phone}`}
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl text-center flex items-center justify-center"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Call Now: {shipmentDetails.driver.phone}
            </a>
            
            <button
              onClick={() => {
                const callBackMessage = {
                  id: (shipmentDetails.messages?.length || 0) + 1,
                  sender: 'shipper',
                  text: 'Please call me back when you are available.',
                  time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
                  read: true
                };
                
                const updatedMessages = [...(shipmentDetails.messages || []), callBackMessage];
                const updatedShipment = {
                  ...shipmentDetails,
                  messages: updatedMessages
                };
                
                setShipmentDetails(updatedShipment);
                setShowCallModal(false);
              }}
              className="w-full border border-green-600 hover:bg-green-50 text-green-700 font-medium py-3 px-4 rounded-xl text-center"
            >
              Request Call Back
            </button>
            
            <button
              onClick={() => setShowCallModal(false)}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Driver Communication Section Component
  const DriverCommunicationSection = () => {
    if (!shipmentDetails?.driver) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Communicate with Driver</h3>
            <p className="text-sm text-gray-600">Chat directly with {shipmentDetails.driver.name}</p>
          </div>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipmentDetails.statusCode)}`}>
              {shipmentDetails.status}
            </span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-xl">
          <UserCircleIcon className="w-12 h-12 text-gray-400 mr-4" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{shipmentDetails.driver.name}</p>
            <p className="text-sm text-gray-600">Driver • {shipmentDetails.driver.phone}</p>
            {shipmentDetails.driver.vehicle && (
              <p className="text-sm text-gray-500">{shipmentDetails.driver.vehicle}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleContactDriver}
              className="p-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-full"
            >
              <PhoneIcon className="w-5 h-5" />
            </button>
            <button
              className="p-3 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Messages</h4>
            <span className="text-xs text-gray-500">
              {shipmentDetails.messages?.length || 0} messages
            </span>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto p-2">
            {shipmentDetails.messages && shipmentDetails.messages.length > 0 ? (
              shipmentDetails.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'shipper' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${
                      msg.sender === 'shipper'
                        ? 'bg-green-100 text-green-900 rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No messages yet</p>
                <p className="text-sm text-gray-400 mt-1">Send your first message to the driver</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Type a message to ${shipmentDetails.driver.name}...`}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || isSendingMessage}
            className="px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSendingMessage ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => {
              setMessageText('What is your ETA?');
            }}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            What is your ETA?
          </button>
          <button
            onClick={() => {
              setMessageText('Please update delivery status');
            }}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
          >
            Update status
          </button>
        </div>
      </div>
    );
  };

  const getStatusColor = (statusCode) => {
    switch (statusCode) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-yellow-100 text-yellow-800';
      case 'booked': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (statusCode) => {
    switch (statusCode) {
      case 'delivered': return <CheckCircleIcon className="w-5 h-5" />;
      case 'in_transit': return <TruckIcon className="w-5 h-5" />;
      case 'picked_up': return <MapPinIcon className="w-5 h-5" />;
      default: return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    const date = new Date(dateTime);
    return date.toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <CallDriverModal />
      
      <div className="max-w-7xl mx-auto">
        {/* Header - EXACT SAME AS BEFORE */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Track Shipment</h1>
          <p className="text-sm sm:text-base text-gray-600">Real-time tracking for all your shipments</p>
        </div>

        {/* Main Content Grid - EXACT SAME LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Search & Quick Actions - EXACT SAME */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section - EXACT SAME */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Track by Number</h2>
              
              <div className="space-y-4">
                {/* Search Input - EXACT SAME */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackShipment()}
                    placeholder="Enter tracking number (e.g., FF202401151234)"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={() => handleTrackShipment()}
                    disabled={loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? (
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      'Track'
                    )}
                  </button>
                </div>

                {/* Quick Actions - EXACT SAME */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigator.clipboard.readText().then(text => setTrackingNumber(text))}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
                    Paste
                  </button>
                  <button
                    onClick={handleShareTracking}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => setTrackingNumber('')}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Clear
                  </button>
                </div>

                {/* Search History - EXACT SAME */}
                {searchHistory.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
                    <div className="space-y-2">
                      {searchHistory.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentShipmentClick(item.number)}
                          className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{item.number}</div>
                            <div className="text-sm text-gray-500">{item.name}</div>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipment Details - EXACT SAME with ADDED communication section */}
            {shipmentDetails ? (
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                {/* Header with Status - EXACT SAME */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipmentDetails.statusCode)}`}>
                        {getStatusIcon(shipmentDetails.statusCode)}
                        <span className="ml-2">{shipmentDetails.status}</span>
                      </span>
                      {shipmentDetails.statusCode === 'in_transit' && (
                        <span className="ml-3 text-sm text-blue-600 font-medium">
                          ETA: {shipmentDetails.estimatedArrival}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Tracking #: {shipmentDetails.trackingNumber}</h2>
                    <p className="text-sm text-gray-600">{shipmentDetails.name} • {shipmentDetails.serviceType}</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    <button
                      onClick={handleShareTracking}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Share tracking"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handlePrintDetails}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Print details"
                    >
                      <PrinterIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tabs - EXACT SAME */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-4">
                    {['status', 'details', 'map', 'proof', 'communications'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium text-sm ${
                          activeTab === tab
                            ? 'text-green-600 border-b-2 border-green-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab === 'status' && 'Status & Timeline'}
                        {tab === 'details' && 'Shipment Details'}
                        {tab === 'map' && 'Live Tracking'}
                        {tab === 'proof' && 'Proof of Delivery'}
                        {tab === 'communications' && 'Driver Communication'} {/* NEW TAB */}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content - EXACT SAME with NEW communications tab */}
                {activeTab === 'status' && (
                  <div className="space-y-6">
                    {/* Progress Bar - EXACT SAME */}
                    {shipmentDetails.distanceCovered && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Pickup</span>
                          <span>{shipmentDetails.distanceCovered} Complete</span>
                          <span>Delivery</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600 transition-all duration-500"
                            style={{ width: shipmentDetails.distanceCovered }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Timeline - EXACT SAME */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Timeline</h3>
                      <div className="space-y-4">
                        {shipmentDetails.timeline?.map((event) => (
                          <div key={event.id} className="flex">
                            <div className="flex flex-col items-center mr-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                event.completed 
                                  ? 'bg-green-100 text-green-600' 
                                  : event.current
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                {event.completed ? (
                                  <CheckCircleIcon className="w-5 h-5" />
                                ) : event.current ? (
                                  <ClockIcon className="w-5 h-5" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                )}
                              </div>
                              {event.id < shipmentDetails.timeline.length && (
                                <div className={`flex-1 w-0.5 ${
                                  shipmentDetails.timeline[event.id]?.completed 
                                    ? 'bg-green-200' 
                                    : 'bg-gray-200'
                                }`}></div>
                              )}
                            </div>
                            <div className={`flex-1 pb-4 ${event.id < shipmentDetails.timeline.length ? 'border-b border-gray-100' : ''}`}>
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">{event.status}</h4>
                                <span className="text-sm text-gray-500">{formatDateTime(event.timestamp)}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts - EXACT SAME */}
                    {shipmentDetails.alerts && shipmentDetails.alerts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
                        <div className="space-y-3">
                          {shipmentDetails.alerts.map(alert => (
                            <div key={alert.id} className={`p-3 rounded-lg ${
                              alert.type === 'success' ? 'bg-green-50 border border-green-100' :
                              alert.type === 'info' ? 'bg-blue-50 border border-blue-100' :
                              'bg-yellow-50 border border-yellow-100'
                            }`}>
                              <div className="flex items-start">
                                {alert.type === 'success' ? (
                                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                                ) : alert.type === 'info' ? (
                                  <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                                ) : (
                                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm">{alert.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {/* Shipment Info - EXACT SAME */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Pickup Details</h4>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm">{shipmentDetails.origin}</p>
                            {shipmentDetails.pickupDetails && (
                              <>
                                <p className="text-xs text-gray-500 mt-1">
                                  By: {shipmentDetails.pickupDetails.pickedUpBy}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Time: {formatDateTime(shipmentDetails.pickupDetails.pickupTime)}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Details</h4>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm">{shipmentDetails.destination}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Estimated: {formatDateTime(shipmentDetails.scheduled)}
                              {shipmentDetails.deliveredAt && (
                                <span className="text-green-600"> • Delivered: {formatDateTime(shipmentDetails.deliveredAt)}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Cargo Information</h4>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Amount:</span>
                                <span className="ml-2 font-medium">₦{shipmentDetails.amount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Weight:</span>
                                <span className="ml-2 font-medium">{shipmentDetails.weight}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Service:</span>
                                <span className="ml-2 font-medium">{shipmentDetails.serviceType}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Driver Information</h4>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                              <div>
                                <p className="font-medium">{shipmentDetails.driver.name}</p>
                                <p className="text-sm text-gray-600">{shipmentDetails.driver.phone}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'map' && shipmentDetails.currentLocation && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Live Tracking Map</h3>
                      <div className="flex items-center space-x-2">
                        {driverLocation && (
                          <span className="flex items-center text-sm text-green-600 font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            Live
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          Updated: {formatDateTime(driverLocation?.timestamp || new Date())}
                        </span>
                      </div>
                    </div>
                    <MapView
                      height="400px"
                      markers={[
                        { position: [6.4654, 3.4064], label: 'Pickup', popup: shipmentDetails.origin, color: '#10B981', type: 'dot' },
                        { 
                          position: driverLocation 
                            ? [driverLocation.lat, driverLocation.lng] 
                            : [shipmentDetails.currentLocation?.lat || 6.5250, shipmentDetails.currentLocation?.lng || 3.3800], 
                          label: 'Driver', 
                          popup: `Driver • ${driverLocation ? 'Live' : 'Last known location'}`, 
                          color: '#3B82F6', 
                          type: 'truck' 
                        },
                        { position: [6.5244, 3.3792], label: 'Delivery', popup: shipmentDetails.destination, color: '#EF4444', type: 'dot' },
                      ]}
                      route={[
                        [6.4654, 3.4064],
                        driverLocation 
                          ? [driverLocation.lat, driverLocation.lng] 
                          : [shipmentDetails.currentLocation?.lat || 6.5250, shipmentDetails.currentLocation?.lng || 3.3800],
                        [6.5244, 3.3792],
                      ]}
                      routeColor="#3B82F6"
                    />
                    <div className="flex gap-4 mt-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Pickup</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Driver {driverLocation ? '(Live)' : ''}</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Delivery</span>
                    </div>
                  </div>
                )}

                {activeTab === 'proof' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Proof of Delivery</h3>
                    
                    {shipmentDetails.proofOfDelivery?.signed || shipmentDetails.deliveryDetails ? (
                      <div className="space-y-6">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-green-900">Delivery Confirmed</h4>
                              <p className="text-sm text-green-700">
                                Package delivered on {formatDateTime(shipmentDetails.deliveredAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ClockIcon className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Proof of Delivery Pending</h4>
                        <p className="text-gray-600">Delivery proof will be available once the package is delivered.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* NEW: Communications Tab */}
                {activeTab === 'communications' && (
                  <DriverCommunicationSection />
                )}
              </div>
            ) : (
              /* No Shipment Found / Initial State - EXACT SAME */
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Shipment</h3>
                <p className="text-gray-600 mb-6">Enter a tracking number above to view real-time status, location, and estimated delivery time.</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1">How to Track</div>
                    <div className="text-xs text-gray-600">1. Enter tracking number</div>
                    <div className="text-xs text-gray-600">2. Click Track button</div>
                    <div className="text-xs text-gray-600">3. View real-time updates</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1">Need Help?</div>
                    <div className="text-xs text-gray-600">Check your confirmation email for tracking number or contact support.</div>
                    <button
                      onClick={handleContactSupport}
                      className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Contact Support →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Recent Shipments & Actions - EXACT SAME */}
          <div className="space-y-6">
            {/* Recent Shipments - EXACT SAME */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h3>
              
              <div className="space-y-3">
                {recentShipments.map((shipment) => (
                  <button
                    key={shipment.trackingNumber}
                    onClick={() => handleRecentShipmentClick(shipment.trackingNumber)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg border ${
                      shipmentDetails?.trackingNumber === shipment.trackingNumber
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-900 text-sm">{shipment.name}</div>
                      <div className="text-xs text-gray-500">{shipment.trackingNumber}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shipment.status}
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
              
              {/* View All Shipments Button - EXACT SAME */}
              <button className="w-full mt-4 text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                View All Shipments
              </button>
            </div>

            {/* Quick Actions - EXACT SAME */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleContactSupport}
                  className="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Contact Support</div>
                    <div className="text-xs text-gray-600">Get help with tracking</div>
                  </div>
                </button>
                
                <button
                  onClick={handlePrintDetails}
                  className="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <PrinterIcon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Print Details</div>
                    <div className="text-xs text-gray-600">Print shipment information</div>
                  </div>
                </button>
                
                <button
                  onClick={handleShareTracking}
                  className="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ShareIcon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Share Tracking</div>
                    <div className="text-xs text-gray-600">Share with others</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Tracking Tips - EXACT SAME */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tracking Tips</h3>
              
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  Tracking updates every 5-15 minutes
                </li>
                <li className="flex items-start">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  Contact driver directly for urgent updates
                </li>
                <li className="flex items-start">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  Save tracking numbers for quick access
                </li>
                <li className="flex items-start">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                  Enable notifications for status updates
                </li>
              </ul>
            </div>

            {/* Support Card - EXACT SAME */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Need Help?</h4>
                  <p className="text-sm text-gray-600">Our support team is here 24/7</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleContactSupport}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg"
                >
                  Contact Support
                </button>
                <div className="text-center text-sm text-gray-600">
                  Call: <span className="font-medium">01-700-0000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Information - EXACT SAME */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-2">
              <MapIcon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">Live Tracking</span>
            </div>
            <p className="text-sm text-gray-600">Real-time GPS tracking for all shipments</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-2">
              <ClockIcon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">ETA Updates</span>
            </div>
            <p className="text-sm text-gray-600">Dynamic ETA based on traffic and route</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center mb-2">
              <DocumentTextIcon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">Proof of Delivery</span>
            </div>
            <p className="text-sm text-gray-600">Digital signatures and photos upon delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
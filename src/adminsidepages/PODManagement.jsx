import React, { useState, useEffect, useMemo } from 'react';
import {
  DocumentCheckIcon,
  TruckIcon,
  UserIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CameraIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CloudArrowUpIcon,
  PhotoIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

// Custom Icons
const RefreshIcon = ArrowPathIcon;
const PODIcon = DocumentCheckIcon;

// Custom Signature Icon (since it's not available in @heroicons/react/24/outline)
const SignatureIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.756 5.756-2.242 8.244m-2.578-2.578a9 9 0 01-13.664-6.666 9 9 0 011.848-3.856m2.578 2.578a9 9 0 0013.664 6.666 9 9 0 01-1.848 3.856m-2.578-2.578a9 9 0 01-2.121-2.121m2.121 2.121l-2.121-2.121m2.121 2.121l2.121 2.121" />
  </svg>
);

// African delivery-themed images for POD (using placeholder URLs that represent African delivery scenarios)
const africaDeliveryImages = [
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // African delivery truck
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Market delivery
  'https://images.unsplash.com/photo-1593259037198-c3c4d56f3e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // African city delivery
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Motorcycle delivery
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Warehouse delivery
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Logistics center
];

// Mock POD data
const initialPODs = [
  {
    id: 'POD-001',
    shipmentId: 'SHIP-001',
    trackingNumber: 'TRK789456123',
    driverId: 'DRV-001',
    driverName: 'Musa Ibrahim',
    driverPhone: '+2348012345678',
    shipperId: 'SHP-001',
    shipperName: 'XYZ Wholesalers',
    recipientName: 'Mrs. Adebayo',
    recipientPhone: '+2348023456789',
    recipientSignature: 'signature_001.png',
    deliveryDate: '2024-02-21 14:15',
    deliveryLocation: 'Plot 15, Wuse Zone 5, Abuja',
    deliveryLatitude: 9.0765,
    deliveryLongitude: 7.3986,
    status: 'verified',
    verificationMethod: 'signature',
    images: [
      africaDeliveryImages[0],
      africaDeliveryImages[1],
    ],
    notes: 'Package delivered in good condition. Recipient satisfied.',
    verificationTime: '2024-02-21 14:30',
    verifiedBy: 'Admin User',
    qrCode: 'QR789456123',
    weight: '5.5kg',
    dimensions: '30x20x15cm',
    items: ['Electronics Package', 'Documents'],
    deliveryProof: {
      signature: true,
      photo: true,
      gps: true,
      timestamp: true,
    },
    issues: [],
  },
  {
    id: 'POD-002',
    shipmentId: 'SHIP-003',
    trackingNumber: 'TRK789456125',
    driverId: 'DRV-003',
    driverName: 'Amina Yusuf',
    driverPhone: '+2348034567890',
    shipperId: 'SHP-010',
    shipperName: 'Fresh Foods Market',
    recipientName: 'Emeka Okafor',
    recipientPhone: '+2348099990000',
    recipientSignature: 'signature_002.png',
    deliveryDate: '2024-02-19 16:45',
    deliveryLocation: 'No 33, Independence Layout, Enugu',
    deliveryLatitude: 6.4521,
    deliveryLongitude: 7.5248,
    status: 'verified',
    verificationMethod: 'photo',
    images: [
      africaDeliveryImages[2],
      africaDeliveryImages[3],
    ],
    notes: 'Temperature-sensitive items delivered as requested.',
    verificationTime: '2024-02-19 17:00',
    verifiedBy: 'Grace Okafor',
    qrCode: 'QR789456124',
    weight: '15kg',
    dimensions: '50x40x30cm',
    items: ['Medical Supplies', 'Lab Equipment'],
    deliveryProof: {
      signature: true,
      photo: true,
      gps: true,
      timestamp: true,
    },
    issues: [],
  },
  {
    id: 'POD-003',
    shipmentId: 'SHIP-004',
    trackingNumber: 'TRK789456126',
    driverId: 'DRV-006',
    driverName: 'Grace Okafor',
    driverPhone: '+2348056789012',
    shipperId: 'SHP-008',
    shipperName: 'SF Delivery Admin',
    recipientName: 'Femi Adeyemi',
    recipientPhone: '+2348011112222',
    recipientSignature: 'signature_003.png',
    deliveryDate: '2024-02-20 17:15',
    deliveryLocation: 'Plot 22, GRA, Ibadan',
    deliveryLatitude: 7.3775,
    deliveryLongitude: 3.9470,
    status: 'pending',
    verificationMethod: 'signature',
    images: [
      africaDeliveryImages[4],
    ],
    notes: 'Delivery completed successfully.',
    verificationTime: null,
    verifiedBy: null,
    qrCode: 'QR789456125',
    weight: '1kg',
    dimensions: 'Document Folder',
    items: ['Legal Documents'],
    deliveryProof: {
      signature: true,
      photo: false,
      gps: true,
      timestamp: true,
    },
    issues: ['Missing photo proof'],
  },
  {
    id: 'POD-004',
    shipmentId: 'SHIP-002',
    trackingNumber: 'TRK789456124',
    driverId: null,
    driverName: 'Not Assigned',
    driverPhone: null,
    shipperId: 'SHP-005',
    shipperName: 'Tech Solutions Ltd',
    recipientName: 'Obinna Nwosu',
    recipientPhone: '+2348056789012',
    recipientSignature: null,
    deliveryDate: null,
    deliveryLocation: 'No 45, New Market Road, Onitsha',
    deliveryLatitude: 6.1408,
    deliveryLongitude: 6.7889,
    status: 'pending_delivery',
    verificationMethod: null,
    images: [],
    notes: 'Awaiting driver assignment',
    verificationTime: null,
    verifiedBy: null,
    qrCode: 'QR789456126',
    weight: '8kg',
    dimensions: '45x30x20cm',
    items: ['Fashion Apparel'],
    deliveryProof: {
      signature: false,
      photo: false,
      gps: false,
      timestamp: false,
    },
    issues: ['Driver not assigned'],
  },
  {
    id: 'POD-005',
    shipmentId: 'SHIP-005',
    trackingNumber: 'TRK789456127',
    driverId: 'DRV-007',
    driverName: 'Ibrahim Sani',
    driverPhone: '+2348067890123',
    shipperId: 'SHP-009',
    shipperName: 'ABC Retail Store',
    recipientName: 'Aliyu Mohammed',
    recipientPhone: '+2348044441111',
    recipientSignature: 'signature_004.png',
    deliveryDate: '2024-02-20 18:30',
    deliveryLocation: 'Plot 10, GRA, Kano',
    deliveryLatitude: 12.0022,
    deliveryLongitude: 8.5920,
    status: 'disputed',
    verificationMethod: 'photo',
    images: [
      africaDeliveryImages[5],
    ],
    notes: 'Recipient claims package was damaged during delivery.',
    verificationTime: '2024-02-20 19:00',
    verifiedBy: 'Admin User',
    qrCode: 'QR789456127',
    weight: '25kg',
    dimensions: '60x40x30cm',
    items: ['Agricultural Equipment'],
    deliveryProof: {
      signature: true,
      photo: true,
      gps: true,
      timestamp: true,
    },
    issues: ['Damaged goods reported'],
  },
  {
    id: 'POD-006',
    shipmentId: 'SHIP-008',
    trackingNumber: 'TRK789456130',
    driverId: 'DRV-001',
    driverName: 'Musa Ibrahim',
    driverPhone: '+2348012345678',
    shipperId: 'SHP-008',
    shipperName: 'SF Delivery Admin',
    recipientName: 'CBN Security',
    recipientPhone: '+2348000002222',
    recipientSignature: 'signature_005.png',
    deliveryDate: '2024-02-20 18:00',
    deliveryLocation: 'Central Bank Building, Abuja',
    deliveryLatitude: 9.0765,
    deliveryLongitude: 7.3986,
    status: 'verified',
    verificationMethod: 'qr_code',
    images: [
      africaDeliveryImages[0],
    ],
    notes: 'High-security delivery completed successfully.',
    verificationTime: '2024-02-20 18:15',
    verifiedBy: 'Admin User',
    qrCode: 'QR789456128',
    weight: '3kg',
    dimensions: 'Secure Briefcase',
    items: ['Bank Documents'],
    deliveryProof: {
      signature: true,
      photo: true,
      gps: true,
      timestamp: true,
    },
    issues: [],
  },
  {
    id: 'POD-007',
    shipmentId: 'SHIP-006',
    trackingNumber: 'TRK789456128',
    driverId: 'DRV-001',
    driverName: 'Musa Ibrahim',
    driverPhone: '+2348012345678',
    shipperId: 'SHP-004',
    shipperName: 'XYZ Wholesalers',
    recipientName: 'Chika Nwankwo',
    recipientPhone: '+2348033334444',
    recipientSignature: null,
    deliveryLocation: 'Plot 18, GRA, Jos',
    deliveryLatitude: 9.8965,
    deliveryLongitude: 8.8583,
    status: 'failed',
    verificationMethod: null,
    images: [],
    notes: 'Delivery failed - Recipient not available after 3 attempts',
    verificationTime: '2024-02-19 10:00',
    verifiedBy: 'Admin User',
    qrCode: 'QR789456129',
    weight: '4kg',
    dimensions: '35x25x20cm',
    items: ['Electronics'],
    deliveryProof: {
      signature: false,
      photo: false,
      gps: true,
      timestamp: true,
    },
    issues: ['Recipient unavailable'],
  },
  {
    id: 'POD-008',
    shipmentId: 'SHIP-009',
    trackingNumber: 'TRK789456131',
    driverId: 'DRV-008',
    driverName: 'Robert Chen',
    driverPhone: '+2348088889999',
    shipperId: 'SHP-006',
    shipperName: 'MediCare Pharmaceuticals',
    recipientName: 'Dr. Ahmed',
    recipientPhone: '+2348077776666',
    recipientSignature: 'signature_006.png',
    deliveryDate: '2024-02-20 11:30',
    deliveryLocation: 'General Hospital, Port Harcourt',
    deliveryLatitude: 4.8156,
    deliveryLongitude: 7.0498,
    status: 'verified',
    verificationMethod: 'signature',
    images: [
      africaDeliveryImages[2],
    ],
    notes: 'Urgent medical supplies delivered on time.',
    verificationTime: '2024-02-20 11:45',
    verifiedBy: 'Grace Okafor',
    qrCode: 'QR789456130',
    weight: '8kg',
    dimensions: '40x30x25cm',
    items: ['Pharmaceuticals'],
    deliveryProof: {
      signature: true,
      photo: true,
      gps: true,
      timestamp: true,
    },
    issues: [],
  },
];

const PODManagement = () => {
  // State management
  const [pods, setPods] = useState(initialPODs);
  const [filteredPODs, setFilteredPODs] = useState(initialPODs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPOD, setSelectedPOD] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  
  // Form states
  const [verificationNotes, setVerificationNotes] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeResolution, setDisputeResolution] = useState('');

  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = pods.length;
    const verified = pods.filter(p => p.status === 'verified').length;
    const pending = pods.filter(p => p.status === 'pending').length;
    const disputed = pods.filter(p => p.status === 'disputed').length;
    const failed = pods.filter(p => p.status === 'failed').length;
    const pendingDelivery = pods.filter(p => p.status === 'pending_delivery').length;
    
    const signatureVerified = pods.filter(p => p.verificationMethod === 'signature').length;
    const photoVerified = pods.filter(p => p.verificationMethod === 'photo').length;
    const qrVerified = pods.filter(p => p.verificationMethod === 'qr_code').length;
    
    const today = new Date();
    const todayPODs = pods.filter(p => {
      if (!p.deliveryDate) return false;
      const podDate = new Date(p.deliveryDate);
      return podDate.toDateString() === today.toDateString();
    }).length;

    const successRate = total > 0 ? ((verified + pending) / total * 100).toFixed(1) : 0;
    const avgVerificationTime = '15 minutes';
    const issuesReported = pods.filter(p => p.issues && p.issues.length > 0).length;

    return {
      total,
      verified,
      pending,
      disputed,
      failed,
      pendingDelivery,
      signatureVerified,
      photoVerified,
      qrVerified,
      todayPODs,
      successRate,
      avgVerificationTime,
      issuesReported,
    };
  }, [pods]);

  // Filter PODs
  useEffect(() => {
    let result = [...pods];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(pod =>
        pod.id.toLowerCase().includes(term) ||
        pod.trackingNumber.toLowerCase().includes(term) ||
        pod.shipperName.toLowerCase().includes(term) ||
        pod.driverName.toLowerCase().includes(term) ||
        pod.recipientName.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(pod => pod.status === statusFilter);
    }

    // Apply verification filter
    if (verificationFilter !== 'all') {
      result = result.filter(pod => pod.verificationMethod === verificationFilter);
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          result = result.filter(pod => {
            if (!pod.deliveryDate) return false;
            const podDate = new Date(pod.deliveryDate);
            return podDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          result = result.filter(pod => {
            if (!pod.deliveryDate) return false;
            const podDate = new Date(pod.deliveryDate);
            return podDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          result = result.filter(pod => {
            if (!pod.deliveryDate) return false;
            const podDate = new Date(pod.deliveryDate);
            return podDate >= filterDate;
          });
          break;
      }
    }

    setFilteredPODs(result);
  }, [pods, searchTerm, statusFilter, verificationFilter, dateFilter]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      verified: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
      disputed: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: ExclamationTriangleIcon },
      failed: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
      pending_delivery: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: TruckIcon },
    };
    
    const configItem = config[status] || config.pending;
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${configItem.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getVerificationBadge = (method) => {
    const config = {
      signature: { color: 'bg-purple-100 text-purple-800', icon: SignatureIcon, label: 'Signature' },
      photo: { color: 'bg-blue-100 text-blue-800', icon: CameraIcon, label: 'Photo' },
      qr_code: { color: 'bg-green-100 text-green-800', icon: QrCodeIcon, label: 'QR Code' },
    };
    
    const configItem = config[method] || { color: 'bg-gray-100 text-gray-800', icon: ShieldCheckIcon, label: 'Not Verified' };
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {configItem.label}
      </span>
    );
  };

  const getDeliveryProofBadge = (proof) => {
    const items = [];
    if (proof.signature) items.push({ label: 'Signature', color: 'bg-purple-100 text-purple-800' });
    if (proof.photo) items.push({ label: 'Photo', color: 'bg-blue-100 text-blue-800' });
    if (proof.gps) items.push({ label: 'GPS', color: 'bg-green-100 text-green-800' });
    if (proof.timestamp) items.push({ label: 'Timestamp', color: 'bg-yellow-100 text-yellow-800' });
    
    return (
      <div className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <span key={index} className={`px-2 py-0.5 rounded-full text-xs ${item.color}`}>
            {item.label}
          </span>
        ))}
      </div>
    );
  };

  // Action handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotificationMessage('POD data refreshed successfully', 'success');
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const exportData = filteredPODs.map(pod => ({
        ID: pod.id,
        'Tracking Number': pod.trackingNumber,
        'Shipper': pod.shipperName,
        'Driver': pod.driverName,
        'Recipient': pod.recipientName,
        'Delivery Date': pod.deliveryDate ? formatDateTime(pod.deliveryDate) : 'N/A',
        Status: pod.status,
        'Verification Method': pod.verificationMethod || 'N/A',
        'Verified By': pod.verifiedBy || 'N/A',
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', `pods-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotificationMessage('POD data exported successfully', 'success');
    }, 1500);
  };

  const handleViewPOD = (pod) => {
    setSelectedPOD(pod);
    setIsViewModalOpen(true);
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleVerifyPOD = (pod) => {
    setSelectedPOD(pod);
    setVerificationNotes('');
    setIsVerifyModalOpen(true);
  };

  const handleConfirmVerification = () => {
    if (!selectedPOD) return;
    
    setPods(prev => prev.map(pod => 
      pod.id === selectedPOD.id 
        ? { 
            ...pod, 
            status: 'verified',
            verificationTime: new Date().toISOString(),
            verifiedBy: 'Admin User',
            notes: verificationNotes || pod.notes,
          } 
        : pod
    ));
    
    setIsVerifyModalOpen(false);
    setSelectedPOD(null);
    setVerificationNotes('');
    showNotificationMessage(`POD ${selectedPOD.id} verified successfully`, 'success');
  };

  const handleResolveDispute = (pod) => {
    setSelectedPOD(pod);
    setDisputeReason('');
    setDisputeResolution('');
    setIsDisputeModalOpen(true);
  };

  const handleConfirmDisputeResolution = () => {
    if (!selectedPOD || !disputeResolution) return;
    
    setPods(prev => prev.map(pod => 
      pod.id === selectedPOD.id 
        ? { 
            ...pod, 
            status: 'verified',
            notes: `Dispute resolved: ${disputeResolution}. ${disputeReason ? `Reason: ${disputeReason}` : ''}`,
            issues: pod.issues.filter(issue => issue !== 'Damaged goods reported'),
          } 
        : pod
    ));
    
    setIsDisputeModalOpen(false);
    setSelectedPOD(null);
    setDisputeReason('');
    setDisputeResolution('');
    showNotificationMessage(`Dispute for POD ${selectedPOD.id} resolved successfully`, 'success');
  };

  const handleResendPOD = (pod) => {
    setSelectedPOD(pod);
    setIsResendModalOpen(true);
  };

  const handleConfirmResend = () => {
    if (!selectedPOD) return;
    
    showNotificationMessage(`POD ${selectedPOD.id} resent to shipper and recipient`, 'success');
    setIsResendModalOpen(false);
    setSelectedPOD(null);
  };

  const handleDownloadPOD = (pod) => {
    showNotificationMessage(`Downloading POD ${pod.id}...`, 'info');
    setTimeout(() => {
      showNotificationMessage(`POD ${pod.id} downloaded successfully`, 'success');
    }, 1000);
  };

  // Stats cards - All rounded with hover effects
  const StatCard = ({ label, value, icon: Icon, color, change, suffix = '', valueColor = 'text-gray-900', hoverColor = 'hover:bg-gray-50' }) => (
    <div className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition-all duration-200 ${hoverColor} hover:shadow-md hover:border-gray-300`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}{suffix}</p>
        </div>
        <div className={`p-3 rounded-full ${color} transition-transform duration-200 hover:scale-105`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change.startsWith('+') ? (
            <ArrowTrendingUpIcon className="h-4 w-4" />
          ) : change.startsWith('-') ? (
            <ArrowTrendingDownIcon className="h-4 w-4" />
          ) : null}
          {change}
        </div>
      )}
    </div>
  );

  // Verification method card - All rounded
  const VerificationCard = ({ method, count, icon: Icon, color, percentage }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{method}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{count}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">{percentage}%</div>
          <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-current rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  // POD Image Card - All rounded
  const PODImageCard = ({ imageUrl, title, onClick }) => (
    <div 
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/80 text-xs">Click to view</p>
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
          <EyeIcon className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );

  // Notification Component
  const Notification = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`rounded-2xl shadow-lg p-4 flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' :
          notification.type === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          ) : notification.type === 'error' ? (
            <XCircleIcon className="h-5 w-5 text-red-600" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600" />
          )}
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
        </div>
      </div>
    );
  };

  // POD Detail Modal
  const PODDetailModal = () => {
    if (!selectedPOD) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Proof of Delivery Details</h3>
              <p className="text-sm text-gray-500">{selectedPOD.id} • {selectedPOD.trackingNumber}</p>
            </div>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">POD Status</p>
                    <div className="mt-1">{getStatusBadge(selectedPOD.status)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Verification Method</p>
                    <div className="mt-1">{getVerificationBadge(selectedPOD.verificationMethod)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CalendarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Date</p>
                    <p className="font-medium text-gray-900 mt-1">{formatDateTime(selectedPOD.deliveryDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Delivery Images */}
                {selectedPOD.images.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Delivery Evidence</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPOD.images.map((image, index) => (
                        <PODImageCard 
                          key={index}
                          imageUrl={image}
                          title={`Delivery Image ${index + 1}`}
                          onClick={() => handleViewImage(image)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Information */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Delivery Information</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <MapPinIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Delivery Location</p>
                          <p className="text-sm text-gray-600">{selectedPOD.deliveryLocation}</p>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                        <div className="text-center">
                          <MapPinIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Map view would be displayed here</p>
                          <p className="text-xs text-gray-500 mt-2">GPS: {selectedPOD.deliveryLatitude}, {selectedPOD.deliveryLongitude}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ClockIcon className="h-4 w-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-600">Delivery Time</p>
                        </div>
                        <p className="font-medium text-gray-900">{formatDateTime(selectedPOD.deliveryDate)}</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <UserIcon className="h-4 w-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-600">Recipient Phone</p>
                        </div>
                        <p className="font-medium text-gray-900">{selectedPOD.recipientPhone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Parties Information */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Parties Involved</h4>
                  <div className="space-y-4">
                    {/* Shipper */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <BuildingStorefrontIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Shipper</p>
                          <p className="text-sm text-gray-600">{selectedPOD.shipperName}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          Shipper ID: {selectedPOD.shipperId}
                        </span>
                      </div>
                    </div>

                    {/* Driver */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Driver</p>
                          <p className="text-sm text-gray-600">{selectedPOD.driverName}</p>
                          <p className="text-xs text-gray-500">{selectedPOD.driverPhone}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          Driver ID: {selectedPOD.driverId || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Recipient */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <UserGroupIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Recipient</p>
                          <p className="text-sm text-gray-600">{selectedPOD.recipientName}</p>
                          <p className="text-xs text-gray-500">{selectedPOD.recipientPhone}</p>
                        </div>
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                          Signed: {selectedPOD.recipientSignature ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Shipment Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-600">Weight</p>
                      <p className="font-medium text-gray-900 mt-1">{selectedPOD.weight}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-600">Dimensions</p>
                      <p className="font-medium text-gray-900 mt-1">{selectedPOD.dimensions}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Items</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPOD.items.map((item, index) => (
                        <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Delivery Proof */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Delivery Proof</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <SignatureIcon className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-700">Recipient Signature</span>
                      </div>
                      <span className={selectedPOD.deliveryProof.signature ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {selectedPOD.deliveryProof.signature ? '✓ Provided' : '✗ Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <CameraIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700">Delivery Photo</span>
                      </div>
                      <span className={selectedPOD.deliveryProof.photo ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {selectedPOD.deliveryProof.photo ? '✓ Provided' : '✗ Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-full">
                          <MapPinIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">GPS Location</span>
                      </div>
                      <span className={selectedPOD.deliveryProof.gps ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {selectedPOD.deliveryProof.gps ? '✓ Captured' : '✗ Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <ClockIcon className="h-4 w-4 text-yellow-600" />
                        </div>
                        <span className="text-sm text-gray-700">Timestamp</span>
                      </div>
                      <span className={selectedPOD.deliveryProof.timestamp ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {selectedPOD.deliveryProof.timestamp ? '✓ Recorded' : '✗ Missing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues & Notes */}
            <div className="mt-6 bg-gray-50 rounded-2xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4">Notes & Issues</h4>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Delivery Notes</p>
                  <p className="text-gray-900">{selectedPOD.notes}</p>
                </div>
                {selectedPOD.issues && selectedPOD.issues.length > 0 && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      <p className="text-sm font-medium text-red-700">Issues Reported</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedPOD.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-red-600">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedPOD.verificationTime && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-medium text-green-700">Verification Details</p>
                    </div>
                    <p className="text-sm text-green-600">
                      Verified by {selectedPOD.verifiedBy} at {formatDateTime(selectedPOD.verificationTime)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPOD(selectedPOD)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Download POD
                </button>
                {selectedPOD.status === 'pending' && (
                  <button
                    onClick={() => handleVerifyPOD(selectedPOD)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Verify POD
                  </button>
                )}
                {selectedPOD.status === 'disputed' && (
                  <button
                    onClick={() => handleResolveDispute(selectedPOD)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Resolve Dispute
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResendPOD(selectedPOD)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  Resend POD
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Image View Modal
  const ImageViewModal = () => {
    if (!selectedImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <img 
            src={selectedImage} 
            alt="Delivery evidence"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    );
  };

  // Verify POD Modal
  const VerifyPODModal = () => {
    if (!selectedPOD) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Verify Proof of Delivery</h3>
            <p className="text-sm text-gray-500 mt-1">{selectedPOD.id} • {selectedPOD.trackingNumber}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Notes
              </label>
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any notes about this verification..."
              />
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="confirmVerification" className="h-4 w-4" />
              <label htmlFor="confirmVerification" className="text-sm text-gray-700">
                I confirm that all delivery evidence has been reviewed and is satisfactory.
              </label>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setIsVerifyModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmVerification}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Confirm Verification
            </button>
          </div>
        </div>
      </div>
    );
  };



  // Dispute Resolution Modal
  const DisputeResolutionModal = () => {
    if (!selectedPOD) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Resolve Dispute</h3>
            <p className="text-sm text-gray-500 mt-1">{selectedPOD.id} • {selectedPOD.trackingNumber}</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dispute Reason
              </label>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe the dispute reason..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution
              </label>
              <textarea
                value={disputeResolution}
                onChange={(e) => setDisputeResolution(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe how this dispute was resolved..."
              />
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="confirmResolution" className="h-4 w-4" />
              <label htmlFor="confirmResolution" className="text-sm text-gray-700">
                I confirm that this dispute has been properly investigated and resolved.
              </label>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setIsDisputeModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDisputeResolution}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Resolve Dispute
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Resend POD Modal
  const ResendPODModal = () => {
    if (!selectedPOD) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Resend POD</h3>
            <p className="text-sm text-gray-500 mt-1">{selectedPOD.id}</p>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              This will send the Proof of Delivery document to both the shipper and recipient.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BuildingStorefrontIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{selectedPOD.shipperName}</p>
                  <p className="text-sm text-gray-500">Shipper</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{selectedPOD.recipientName}</p>
                  <p className="text-sm text-gray-500">Recipient</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setIsResendModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmResend}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send POD
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proof of Delivery Management</h1>
            <p className="text-sm text-gray-600 mt-1">Track, verify, and manage all delivery confirmations</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <ArrowDownTrayIcon className={`h-4 w-4 ${isExporting ? 'animate-pulse' : ''}`} />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total PODs"
            value={stats.total}
            icon={PODIcon}
            color="bg-blue-100 text-blue-600"
            change="+12%"
            valueColor="text-blue-700"
          />
          <StatCard 
            label="Verified Today"
            value={stats.todayPODs}
            icon={CheckCircleIcon}
            color="bg-green-100 text-green-600"
            change="+8%"
            valueColor="text-green-700"
          />
          <StatCard 
            label="Success Rate"
            value={stats.successRate}
            icon={ChartBarIcon}
            color="bg-purple-100 text-purple-600"
            suffix="%"
            change="+2.5%"
            valueColor="text-purple-700"
          />
          <StatCard 
            label="Avg Verification Time"
            value={stats.avgVerificationTime}
            icon={ClockIcon}
            color="bg-yellow-100 text-yellow-600"
            valueColor="text-yellow-700"
          />
        </div>

        {/* Verification Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <VerificationCard 
            method="Signature"
            count={stats.signatureVerified}
            icon={SignatureIcon}
            color="bg-purple-100 text-purple-600"
            percentage={stats.total > 0 ? Math.round((stats.signatureVerified / stats.total) * 100) : 0}
          />
          <VerificationCard 
            method="Photo"
            count={stats.photoVerified}
            icon={CameraIcon}
            color="bg-blue-100 text-blue-600"
            percentage={stats.total > 0 ? Math.round((stats.photoVerified / stats.total) * 100) : 0}
          />
          <VerificationCard 
            method="QR Code"
            count={stats.qrVerified}
            icon={QrCodeIcon}
            color="bg-green-100 text-green-600"
            percentage={stats.total > 0 ? Math.round((stats.qrVerified / stats.total) * 100) : 0}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search PODs by ID, tracking number, shipper, driver, or recipient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="disputed">Disputed</option>
                <option value="failed">Failed</option>
                <option value="pending_delivery">Pending Delivery</option>
              </select>

              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Methods</option>
                <option value="signature">Signature</option>
                <option value="photo">Photo</option>
                <option value="qr_code">QR Code</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>

              <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <FunnelIcon className="h-4 w-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* PODs Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POD ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipper
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPODs.map((pod) => (
                  <tr key={pod.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{pod.id}</p>
                        <p className="text-sm text-gray-500">{pod.trackingNumber}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <BuildingStorefrontIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{pod.shipperName}</p>
                          <p className="text-sm text-gray-500">ID: {pod.shipperId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <UserIcon className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{pod.recipientName}</p>
                          <p className="text-sm text-gray-500">{pod.recipientPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{formatDate(pod.deliveryDate)}</span>
                      </div>
                      {pod.deliveryDate && (
                        <div className="flex items-center gap-2 mt-1">
                          <ClockIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {new Date(pod.deliveryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(pod.status)}
                    </td>
                    <td className="px-6 py-4">
                      {getVerificationBadge(pod.verificationMethod)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewPOD(pod)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPOD(pod)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                          title="Download POD"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        {pod.status === 'pending' && (
                          <button
                            onClick={() => handleVerifyPOD(pod)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Verify POD"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                        )}
                        {pod.status === 'disputed' && (
                          <button
                            onClick={() => handleResolveDispute(pod)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
                            title="Resolve Dispute"
                          >
                            <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredPODs.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DocumentCheckIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No PODs found</h3>
              <p className="text-gray-500 mb-4">
                No proof of delivery records match your current filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setVerificationFilter('all');
                  setDateFilter('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Status Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Verified</p>
                <p className="text-2xl font-bold text-green-900">{stats.verified}</p>
              </div>
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Disputed</p>
                <p className="text-2xl font-bold text-orange-900">{stats.disputed}</p>
              </div>
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Failed</p>
                <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
              </div>
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Pending Delivery</p>
                <p className="text-2xl font-bold text-blue-900">{stats.pendingDelivery}</p>
              </div>
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PODDetailModal />
      <ImageViewModal />
      <VerifyPODModal />
      <DisputeResolutionModal />
      <ResendPODModal />
      <Notification />
    </div>
  );
};

export default PODManagement;
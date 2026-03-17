import React, { useState, useEffect } from 'react';
import { useDriverLocation } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  TruckIcon,
  MapIcon,
  ClockIcon,
  UserIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PhotoIcon,
  DocumentCheckIcon,
  XCircleIcon,
  CheckIcon,
  PhoneArrowUpRightIcon,
  ShareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// ==================== UTILITIES ====================
const Loader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-200 border-t-blue-600`}></div>
  );
};

const formatCurrency = (amount) => {
  return `₦${amount?.toLocaleString('en-NG') || '0'}`;
};

// ==================== COMPONENTS ====================
const JobStatusBadge = ({ status }) => {
  const statusConfig = {
    'pending': { 
      bg: 'bg-yellow-100', 
      text: 'text-yellow-800', 
      label: 'Pending Review'
    },
    'available': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      label: 'Available'
    },
    'accepted': { 
      bg: 'bg-indigo-100', 
      text: 'text-indigo-800', 
      label: 'Accepted'
    },
    'pickup-arrived': { 
      bg: 'bg-purple-100', 
      text: 'text-purple-800', 
      label: 'At Pickup'
    },
    'picked-up': { 
      bg: 'bg-green-100', 
      text: 'text-green-800', 
      label: 'Picked Up'
    },
    'in-transit': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      label: 'In Transit'
    },
    'delivery-arrived': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-800', 
      label: 'At Delivery'
    },
    'delivered': { 
      bg: 'bg-green-100', 
      text: 'text-green-800', 
      label: 'Delivered'
    },
    'failed': { 
      bg: 'bg-red-100', 
      text: 'text-red-800', 
      label: 'Failed'
    },
    'cancelled': { 
      bg: 'bg-gray-100', 
      text: 'text-gray-800', 
      label: 'Cancelled'
    }
  };
 
  const config = statusConfig[status] || statusConfig['pending'];
 
  return (
    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${config.bg} ${config.text} flex items-center`}>
      {config.label}
    </span>
  );
};

const ServiceTypeBadge = ({ type }) => {
  const typeConfig = {
    'ftl': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'FTL' },
    'ltl': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'LTL' },
    'express': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Express' },
    'same-day': { bg: 'bg-green-100', text: 'text-green-800', label: 'Same Day' },
    'last-mile': { bg: 'bg-teal-100', text: 'text-teal-800', label: 'Last Mile' },
    'scheduled': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Scheduled' }
  };
 
  const config = typeConfig[type] || typeConfig['express'];
 
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Job Card Component
const JobCard = ({ job, onSelect, onAccept, onReject }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">#{job.id}</h3>
            <ServiceTypeBadge type={job.serviceType} />
            <JobStatusBadge status={job.status} />
          </div>
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">{formatCurrency(job.payment.amount)}</p>
          <p className="text-xs text-gray-500">Earnings</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-4 mb-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <MapPinIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Pickup</p>
            <p className="text-sm text-gray-600">{job.pickup.address}</p>
            <div className="flex items-center mt-1">
              <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{job.pickup.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <MapPinIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Delivery</p>
            <p className="text-sm text-gray-600">{job.delivery.address}</p>
            <div className="flex items-center mt-1">
              <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">ETA: {job.delivery.eta}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <TruckIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Cargo</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{job.cargo.weight}</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{job.cargo.type}</span>
              {job.cargo.fragile && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Fragile</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Changed to rounded-full */}
      <div className="flex gap-3">
        <button
          onClick={() => onSelect(job)}
          className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all flex items-center justify-center"
        >
          <MapIcon className="w-4 h-4 mr-2" />
          View Details
        </button>
        
        {job.status === 'available' && (
          <>
            <button
              onClick={() => onAccept(job.id)}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all flex items-center justify-center"
              title="Accept Job"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onReject(job.id)}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all flex items-center justify-center"
              title="Reject Job"
            >
              <XCircleIcon className="w-4 h-4" />
            </button>
          </>
        )}
        
        {job.status === 'accepted' && (
          <button
            onClick={() => onSelect(job)}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all flex items-center justify-center"
          >
            <TruckIcon className="w-4 h-4 mr-2" />
            Start Job
          </button>
        )}
      </div>
    </div>
  );
};

// Job Details Modal
const JobDetailsModal = ({ job, isOpen, onClose, onUpdateStatus }) => {
  const [currentStep, setCurrentStep] = useState(job?.status || 'accepted');
  const [notes, setNotes] = useState('');

  if (!isOpen || !job) return null;

  const steps = [
    { key: 'accepted', label: 'Accepted', icon: CheckCircleIcon },
    { key: 'pickup-arrived', label: 'At Pickup', icon: MapPinIcon },
    { key: 'picked-up', label: 'Picked Up', icon: CheckCircleIcon },
    { key: 'in-transit', label: 'In Transit', icon: TruckIcon },
    { key: 'delivery-arrived', label: 'At Delivery', icon: MapPinIcon },
    { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon }
  ];

  const handleUpdateStatus = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(job.id, newStatus);
    }
    setCurrentStep(newStatus);
  };

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Delivery #{job.id}</h2>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Progress</h3>
              <JobStatusBadge status={currentStep} />
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index <= currentStepIndex;
                  const isCurrent = step.key === currentStep;
                  const nextIndex = index + 1;
                  const nextStep = steps[nextIndex];
                  
                  return (
                    <div key={step.key} className="flex items-start relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 z-10 ${
                        isActive ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        <StepIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                          </div>
                          {isCurrent && step.key !== 'delivered' && nextStep && (
                            <button
                              onClick={() => handleUpdateStatus(nextStep.key)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm"
                            >
                              Mark as {nextStep?.label || 'Complete'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pickup Details */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pickup Details</h4>
                  <p className="text-sm text-gray-600">Sender Information</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium">{job.pickup.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium">{job.pickup.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{job.pickup.contact.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time Window</p>
                  <p className="text-sm font-medium">{job.pickup.timeWindow}</p>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-green-50 rounded-2xl p-5">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <MapPinIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Delivery Details</h4>
                  <p className="text-sm text-gray-600">Recipient Information</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium">{job.delivery.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium">{job.delivery.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{job.delivery.contact.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time Window</p>
                  <p className="text-sm font-medium">{job.delivery.timeWindow}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <TruckIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cargo Details</h4>
                  <p className="text-sm text-gray-600">Shipment Information</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{formatCurrency(job.payment.amount)}</p>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium">{job.cargo.type}</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-sm font-medium">{job.cargo.weight}</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <p className="text-xs text-gray-500">Dimensions</p>
                <p className="text-sm font-medium">{job.cargo.dimensions}</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <p className="text-xs text-gray-500">Value</p>
                <p className="text-sm font-medium">{job.cargo.value}</p>
              </div>
            </div>
          </div>

          {/* Proof of Delivery Section */}
          {currentStep === 'delivery-arrived' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Proof of Delivery</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => alert('Photo capture would open here')}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center"
                >
                  <PhotoIcon className="w-8 h-8 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700">Capture Photo</span>
                </button>
                <button
                  onClick={() => alert('Signature capture would open here')}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center"
                >
                  <DocumentCheckIcon className="w-8 h-8 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700">Get Signature</span>
                </button>
                <div className="p-6 border border-gray-200 rounded-2xl">
                  <p className="text-sm font-medium text-gray-900 mb-2">Delivery Notes</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about the delivery..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Changed to rounded-full */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all flex items-center justify-center">
              <MapIcon className="w-5 h-5 mr-2" />
              Navigate to {currentStep.includes('pickup') ? 'Pickup' : 'Delivery'}
            </button>
            <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all flex items-center">
              <PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
              Call Contact
            </button>
            <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all flex items-center">
              <ShareIcon className="w-5 h-5 mr-2" />
              Share ETA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== ACTIVE JOBS PAGE ====================
const ActiveJobsPage = () => {
  const { user } = useAuth();
  const { sendLocation } = useDriverLocation(user?.id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/driver/bookings');
        const backendJobs = response.data.data.map(booking => ({
          id: booking._id,
          trackingNumber: booking.trackingNumber,
          status: booking.status === 'assigned' ? 'accepted' : booking.status === 'picked_up' ? 'picked-up' : booking.status === 'in_transit' ? 'in-transit' : booking.status,
          serviceType: 'express',
          description: booking.itemDetails?.description || 'Shipment',
          pickup: {
            address: `${booking.pickup?.address?.street}, ${booking.pickup?.address?.city}`,
            contact: { name: booking.pickup?.contactPerson || 'N/A', phone: booking.pickup?.contactPhone || 'N/A' },
            time: new Date(booking.pickup?.scheduledDate).toLocaleDateString(),
            timeWindow: new Date(booking.pickup?.scheduledDate).toLocaleDateString()
          },
          delivery: {
            address: `${booking.delivery?.address?.street}, ${booking.delivery?.address?.city}`,
            contact: { name: booking.delivery?.reciepentName || 'N/A', phone: booking.delivery?.reciepentPhone || 'N/A' },
            eta: 'TBD',
            timeWindow: 'TBD'
          },
          cargo: {
            type: booking.itemDetails?.description || 'General',
            weight: `${booking.itemDetails?.weight || 0} kg`,
            dimensions: `${booking.itemDetails?.dimensions?.length || 0} x ${booking.itemDetails?.dimensions?.width || 0} x ${booking.itemDetails?.dimensions?.height || 0} cm`,
            value: `₦${booking.pricing?.total?.toLocaleString() || 0}`,
            fragile: false
          },
          payment: {
            amount: booking.pricing?.total || 0,
            totalEarnings: booking.pricing?.total || 0
          }
        }));
        setJobs(backendJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'available') return job.status === 'available';
    if (activeFilter === 'active') return ['accepted', 'pickup-arrived', 'picked-up', 'in-transit', 'delivery-arrived'].includes(job.status);
    return job.status === activeFilter;
  }).filter(job => 
    job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'accepted' } : job
    ));
    alert(`Job ${jobId} accepted!`);
  };

  const handleRejectJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'cancelled' } : job
    ));
    alert(`Job ${jobId} rejected.`);
  };

  const handleUpdateStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));

    // Send real-time location update via socket
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        sendLocation(jobId, position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const stats = {
    total: jobs.length,
    available: jobs.filter(j => j.status === 'available').length,
    active: jobs.filter(j => ['accepted', 'pickup-arrived', 'picked-up', 'in-transit', 'delivery-arrived'].includes(j.status)).length,
    completed: jobs.filter(j => j.status === 'delivered').length,
    totalEarnings: jobs.reduce((sum, job) => sum + job.payment.totalEarnings, 0)
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Active Jobs</h1>
            <p className="text-gray-600">Manage your delivery assignments</p>
          </div>
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all flex items-center">
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all flex items-center">
              <MapIcon className="w-4 h-4 mr-2" />
              View Map
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Available</p>
            <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'available', 'active'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Jobs' : 
                 filter === 'available' ? 'Available' : 'Active'}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSelect={handleSelectJob}
            onAccept={handleAcceptJob}
            onReject={handleRejectJob}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <TruckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? "No jobs match your search criteria" 
              : "No jobs match the selected filter"}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default ActiveJobsPage;
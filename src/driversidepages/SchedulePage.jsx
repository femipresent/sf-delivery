import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  BellIcon,
  MapIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('day');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [availability, setAvailability] = useState('available');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobNumber: 'DEL-7890',
      customer: 'TechCorp Solutions',
      serviceType: 'Express Delivery',
      pickup: {
        address: '123 Warehouse St, Industrial Park',
        time: '09:00 AM',
        contact: 'John Smith',
        phone: '0803 111 2222'
      },
      delivery: {
        address: '456 Downtown Mall, City Center',
        time: '11:45 AM',
        contact: 'Sarah Johnson',
        phone: '0805 333 4444'
      },
      status: 'scheduled',
      priority: 'high',
      estimatedDuration: '2.5 hours',
      earnings: 8500,
      notes: 'Fragile items - Handle with care'
    },
    {
      id: 2,
      jobNumber: 'DEL-7891',
      customer: 'Global Electronics',
      serviceType: 'Standard Delivery',
      pickup: {
        address: '789 Tech Hub, Ikeja',
        time: '01:30 PM',
        contact: 'Michael Ade',
        phone: '0807 555 6666'
      },
      delivery: {
        address: '321 Business Center, VI',
        time: '03:15 PM',
        contact: 'Chinelo Obi',
        phone: '0809 777 8888'
      },
      status: 'in-progress',
      priority: 'medium',
      estimatedDuration: '1.75 hours',
      earnings: 6500,
      notes: 'Requires signature upon delivery'
    }
  ]);

  // REAL FUNCTIONALITY
  const handleSetAvailability = () => {
    const newStatus = availability === 'available' ? 'unavailable' : 'available';
    setAvailability(newStatus);
    // In real app, this would update backend
    console.log(`Availability set to: ${newStatus}`);
  };

  const handleCalendarView = () => {
    // In real app, this would switch to calendar view
    console.log('Switching to calendar view');
  };

  const handleViewShipmentDetails = (job) => {
    setSelectedJob(job);
    // In real app, this would open detailed modal or new page
    console.log(`Viewing details for ${job.jobNumber}`);
  };

  const handleCallCustomer = (phone, name) => {
    // Initiate phone call
    window.location.href = `tel:${phone}`;
    console.log(`Calling ${name} at ${phone}`);
  };

  const handleTextCustomer = (phone, name) => {
    // Initiate SMS
    window.location.href = `sms:${phone}`;
    console.log(`Texting ${name} at ${phone}`);
  };

  const handleNavigate = (address) => {
    // Open in Google Maps (adjust for iOS/Android as needed)
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    console.log(`Navigating to: ${address}`);
  };

  const handleScheduleReport = () => {
    // Generate and download report
    const reportData = {
      date: currentDate.toLocaleDateString(),
      totalJobs: jobs.length,
      totalEarnings: jobs.reduce((sum, job) => sum + job.earnings, 0),
      jobs: jobs.map(job => ({
        jobNumber: job.jobNumber,
        customer: job.customer,
        status: job.status,
        earnings: job.earnings
      }))
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule-report-${currentDate.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Schedule report generated');
  };

  const handleCallDispatch = () => {
    // Call dispatch number
    window.location.href = 'tel:08001234567';
    console.log('Calling dispatch support');
  };

  const handleAcceptJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'accepted' } : job
    ));
    // In real app, this would update backend
    console.log(`Job ${jobId} accepted`);
  };

  const handleRescheduleJob = (jobId) => {
    // In real app, this would open a proper date/time picker modal
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // Simulate opening a date picker
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1);
      
      setJobs(jobs.map(job => 
        job.id === jobId ? { 
          ...job, 
          pickup: { 
            ...job.pickup, 
            time: newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          status: 'rescheduled'
        } : job
      ));
      console.log(`Job ${jobId} rescheduled to tomorrow`);
    }
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to remove this job from your schedule?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
      if (selectedJob?.id === jobId) {
        setSelectedJob(null);
      }
      // In real app, this would update backend
      console.log(`Job ${jobId} removed`);
    }
  };

  const handleRefresh = () => {
    // In real app, this would fetch fresh data from API
    console.log('Refreshing schedule data');
    // Simulate API call
    setTimeout(() => {
      console.log('Schedule data refreshed');
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-purple-100 text-purple-800';
      case 'rescheduled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleViewAllJobs = () => {
    // In real app, this would navigate to jobs page or open modal
    console.log(`Viewing all ${jobs.length} jobs`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Delivery Schedule</h1>
            <p className="text-gray-600">Manage and track your daily assignments</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors flex items-center"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateDate('prev')}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">{currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</h2>
              </div>
              
              <button
                onClick={() => navigateDate('next')}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
              >
                Today
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedView('day')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setSelectedView('week')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedView('month')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Schedule Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">Total Jobs</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              <p className="text-xs text-gray-500 mt-1">Today: {jobs.filter(j => j.status === 'scheduled').length} scheduled</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <div className="flex items-center mb-2">
                <TruckIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{jobs.filter(j => j.status === 'in-progress').length}</p>
              <p className="text-xs text-gray-500 mt-1">Currently delivering</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
              <div className="flex items-center mb-2">
                <CalendarIcon className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm text-gray-600">Upcoming</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-gray-500 mt-1">Next 7 days</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-2">
                <CurrencyDollarIcon className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Estimated Earnings</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">₦{jobs.reduce((sum, job) => sum + job.earnings, 0).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Today's total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Upcoming Jobs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Deliveries</h3>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleRefresh}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-1" />
                  Refresh
                </button>
                <button 
                  onClick={handleViewAllJobs}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <TruckIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{job.jobNumber}</span>
                        <span className="ml-3 text-sm text-gray-600">{job.serviceType}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <UserIcon className="w-3 h-3 mr-2" />
                            <span>{job.customer}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="w-3 h-3 mr-2" />
                            <span>Pickup: {job.pickup.time}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-2">
                            ₦{job.earnings.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full mr-2 ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                              {job.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {job.notes && (
                        <div className="flex items-start text-sm text-gray-600 bg-yellow-50 p-3 rounded-xl">
                          <ExclamationCircleIcon className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                          <span>{job.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleViewShipmentDetails(job)}
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-full transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleNavigate(job.delivery.address)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full flex items-center transition-colors"
                      >
                        <MapIcon className="w-4 h-4 mr-1" />
                        Navigate
                      </button>
                      <button 
                        onClick={() => handleCallCustomer(job.delivery.phone, job.delivery.contact)}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-full flex items-center transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        Call
                      </button>
                      <button 
                        onClick={() => handleTextCustomer(job.delivery.phone, job.delivery.contact)}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-full flex items-center transition-colors"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                        Text
                      </button>
                    </div>
                    <button 
                      onClick={() => handleViewShipmentDetails(job)}
                      className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-full flex items-center transition-colors"
                    >
                      <DocumentTextIcon className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Selected Job Details */}
          {selectedJob ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{selectedJob.jobNumber}</span>
                    <span className="text-sm font-medium text-blue-600">₦{selectedJob.earnings.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedJob.customer}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <p className="text-xs text-gray-500 mb-1">Service Type</p>
                    <p className="text-sm font-medium">{selectedJob.serviceType}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="text-sm font-medium">{selectedJob.estimatedDuration}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-2xl">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <ClockIcon className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">Pickup Information</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedJob.pickup.address}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <ClockIcon className="w-3 h-3 mr-2" />
                      <span>{selectedJob.pickup.time}</span>
                      <span className="mx-2">•</span>
                      <PhoneIcon className="w-3 h-3 mr-2" />
                      <span>{selectedJob.pickup.contact}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button 
                        onClick={() => handleNavigate(selectedJob.pickup.address)}
                        className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full transition-colors"
                      >
                        Navigate
                      </button>
                      <button 
                        onClick={() => handleCallCustomer(selectedJob.pickup.phone, selectedJob.pickup.contact)}
                        className="flex-1 px-3 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        Call
                      </button>
                      <button 
                        onClick={() => handleTextCustomer(selectedJob.pickup.phone, selectedJob.pickup.contact)}
                        className="flex-1 px-3 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        Text
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-2xl">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <MapPinIcon className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">Delivery Information</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedJob.delivery.address}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <ClockIcon className="w-3 h-3 mr-2" />
                      <span>{selectedJob.delivery.time}</span>
                      <span className="mx-2">•</span>
                      <PhoneIcon className="w-3 h-3 mr-2" />
                      <span>{selectedJob.delivery.contact}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button 
                        onClick={() => handleNavigate(selectedJob.delivery.address)}
                        className="flex-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-full transition-colors"
                      >
                        Navigate
                      </button>
                      <button 
                        onClick={() => handleCallCustomer(selectedJob.delivery.phone, selectedJob.delivery.contact)}
                        className="flex-1 px-3 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        Call
                      </button>
                      <button 
                        onClick={() => handleTextCustomer(selectedJob.delivery.phone, selectedJob.delivery.contact)}
                        className="flex-1 px-3 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        Text
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedJob.notes && (
                  <div className="bg-yellow-50 p-4 rounded-2xl">
                    <div className="flex items-start">
                      <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Special Instructions</p>
                        <p className="text-sm text-gray-600">{selectedJob.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAcceptJob(selectedJob.id)}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
                  >
                    Accept Job
                  </button>
                  <button 
                    onClick={() => handleRescheduleJob(selectedJob.id)}
                    className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleViewAllJobs}
                  className="w-full p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center transition-colors"
                >
                  <ArchiveBoxIcon className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">View All Jobs</span>
                </button>
                <button 
                  onClick={handleSetAvailability}
                  className="w-full p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center transition-colors"
                >
                  <BellIcon className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">Set Availability</span>
                </button>
                <button 
                  onClick={handleCalendarView}
                  className="w-full p-4 bg-white hover:bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center transition-colors"
                >
                  <CalendarIcon className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">Calendar View</span>
                </button>
              </div>
            </div>
          )}

          {/* Support */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <button 
                onClick={handleScheduleReport}
                className="w-full p-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-2xl text-left transition-colors flex items-center"
              >
                <DocumentTextIcon className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Schedule Report</p>
                  <p className="text-sm text-gray-600">Generate daily report</p>
                </div>
              </button>
              <button 
                onClick={handleCallDispatch}
                className="w-full p-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-2xl text-left transition-colors flex items-center"
              >
                <PhoneIcon className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Call Dispatch</p>
                  <p className="text-sm text-gray-600">24/7 support line</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
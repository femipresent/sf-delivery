import React, { useState } from 'react';
import {
  DocumentTextIcon,
  DocumentArrowUpIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserIcon,
  TruckIcon,
  CalendarIcon,
  ShieldCheckIcon,
  PhotoIcon,
  CreditCardIcon,
  IdentificationIcon,
  PlusIcon,
  CloudArrowUpIcon,
  FunnelIcon,
  XCircleIcon,
  PencilIcon,
  ShareIcon,
  LockClosedIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const DocumentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Document categories
  const categories = [
    { id: 'all', name: 'All Documents', count: 24, color: 'bg-blue-100 text-blue-800' },
    { id: 'license', name: 'Driving License', count: 3, color: 'bg-green-100 text-green-800' },
    { id: 'vehicle', name: 'Vehicle Documents', count: 5, color: 'bg-purple-100 text-purple-800' },
    { id: 'insurance', name: 'Insurance', count: 4, color: 'bg-red-100 text-red-800' },
    { id: 'identification', name: 'Identification', count: 3, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'certificates', name: 'Certificates', count: 4, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'contracts', name: 'Contracts', count: 2, color: 'bg-pink-100 text-pink-800' },
    { id: 'reports', name: 'Reports', count: 3, color: 'bg-gray-100 text-gray-800' }
  ];

  // Document statuses
  const statuses = {
    verified: { label: 'Verified', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
    expired: { label: 'Expired', color: 'bg-red-100 text-red-800', icon: ExclamationCircleIcon },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    uploaded: { label: 'Uploaded', color: 'bg-blue-100 text-blue-800', icon: CloudArrowUpIcon }
  };

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Driver License - Front',
      category: 'license',
      type: 'image',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      expiryDate: '2026-05-30',
      status: 'verified',
      required: true,
      description: 'Valid Nigerian driver\'s license front side',
      previewUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Vehicle Insurance Certificate',
      category: 'insurance',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-02-01',
      expiryDate: '2024-12-31',
      status: 'verified',
      required: true,
      description: 'Comprehensive vehicle insurance policy',
      previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w-400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Vehicle Registration (Proof of Ownership)',
      category: 'vehicle',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2024-01-20',
      expiryDate: '2025-08-15',
      status: 'pending',
      required: true,
      description: 'Lagos State vehicle registration document',
      previewUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=400&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'International Passport',
      category: 'identification',
      type: 'image',
      size: '1.5 MB',
      uploadDate: '2024-01-10',
      expiryDate: '2028-03-20',
      status: 'verified',
      required: false,
      description: 'Valid international passport data page',
      previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Hazardous Materials Certificate',
      category: 'certificates',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2023-12-05',
      expiryDate: '2024-06-05',
      status: 'expired',
      required: true,
      description: 'Hazmat handling certification',
      previewUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=400&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Driver Contract Agreement',
      category: 'contracts',
      type: 'pdf',
      size: '4.5 MB',
      uploadDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'verified',
      required: true,
      description: 'Employment contract with S&F Delivery',
      previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop'
    },
    {
      id: 7,
      name: 'Vehicle Inspection Report',
      category: 'reports',
      type: 'pdf',
      size: '2.8 MB',
      uploadDate: '2024-02-10',
      expiryDate: '2024-08-10',
      status: 'pending',
      required: true,
      description: 'Monthly vehicle inspection report',
      previewUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=400&auto=format&fit=crop'
    },
    {
      id: 8,
      name: 'Medical Fitness Certificate',
      category: 'certificates',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2024-01-25',
      expiryDate: '2024-07-25',
      status: 'verified',
      required: true,
      description: 'Annual medical fitness certification',
      previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop'
    }
  ];

  // Filter documents based on category and search
  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Required documents checklist
  const requiredDocs = [
    { name: 'Valid Driver License', status: 'verified', category: 'license' },
    { name: 'Vehicle Registration', status: 'pending', category: 'vehicle' },
    { name: 'Vehicle Insurance', status: 'verified', category: 'insurance' },
    { name: 'Medical Certificate', status: 'verified', category: 'certificates' },
    { name: 'Hazardous Materials Cert', status: 'expired', category: 'certificates' },
    { name: 'Employment Contract', status: 'verified', category: 'contracts' }
  ];

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate upload process
      setTimeout(() => {
        alert(`${file.name} uploaded successfully!`);
        setUploading(false);
      }, 1500);
    }
  };

  // Handle document download
  const handleDownload = (doc) => {
    alert(`Downloading ${doc.name}...`);
    // In real app, this would trigger actual download
  };

  // Handle document delete
  const handleDelete = (docId, docName) => {
    if (window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      alert(`Document "${docName}" deleted successfully!`);
      // In real app, this would remove from state/backend
    }
  };

  // Handle document preview
  const handlePreview = (doc) => {
    setSelectedDoc(doc);
  };

  // Get document icon based on type
  const getDocIcon = (type) => {
    switch(type) {
      case 'pdf': return <DocumentTextIcon className="w-8 h-8 text-red-500" />;
      case 'image': return <PhotoIcon className="w-8 h-8 text-blue-500" />;
      case 'word': return <DocumentTextIcon className="w-8 h-8 text-blue-600" />;
      default: return <DocumentTextIcon className="w-8 h-8 text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">Manage your driving licenses, vehicle documents, and certifications</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <label className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors flex items-center shadow-sm hover:shadow-md cursor-pointer">
              <CloudArrowUpIcon className="w-5 h-5 mr-2" />
              Upload Document
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </label>
            <button className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors flex items-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <DocumentMagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by name or description..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Document Categories</h3>
            <span className="text-sm text-gray-600">{documents.length} total documents</span>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="flex items-center">
                  <span className={`mr-2 px-2 py-0.5 text-xs rounded-full ${category.color}`}>
                    {category.count}
                  </span>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center">
              <CloudArrowUpIcon className="w-5 h-5 text-blue-600 mr-3 animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Uploading document...</span>
                  <span className="text-xs text-gray-500">65%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Documents List */}
        <div className="lg:col-span-2">
          {/* Required Documents Checklist */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
                  Required Documents Checklist
                </h3>
                <p className="text-sm text-gray-600">Ensure all required documents are up-to-date</p>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {requiredDocs.filter(d => d.status === 'verified').length}/{requiredDocs.length} Complete
              </div>
            </div>
            
            <div className="space-y-3">
              {requiredDocs.map((doc, index) => {
                const StatusIcon = statuses[doc.status].icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${statuses[doc.status].color}`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${categories.find(c => c.id === doc.category)?.color}`}>
                            {categories.find(c => c.id === doc.category)?.name}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statuses[doc.status].color}`}>
                            {statuses[doc.status].label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors">
                      Upload Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All Documents</h3>
              <span className="text-sm text-gray-600">
                Showing {filteredDocs.length} of {documents.length} documents
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => {
                const StatusIcon = statuses[doc.status].icon;
                const daysUntilExpiry = getDaysUntilExpiry(doc.expiryDate);
                const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 30;
                
                return (
                  <div key={doc.id} className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        {getDocIcon(doc.type)}
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size} • {formatDate(doc.uploadDate)}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${statuses[doc.status].color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statuses[doc.status].label}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          Expires: {formatDate(doc.expiryDate)}
                        </div>
                        {isExpiringSoon && (
                          <div className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Expires in {daysUntilExpiry} days
                          </div>
                        )}
                        {daysUntilExpiry <= 0 && (
                          <div className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            EXPIRED
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${doc.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {doc.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreview(doc)}
                        className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-full transition-colors flex items-center justify-center"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium rounded-full transition-colors flex items-center justify-center"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Document Preview & Stats */}
        <div className="space-y-6">
          {/* Document Preview */}
          {selectedDoc ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Document Preview</h3>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-4">
                  {selectedDoc.type === 'image' ? (
                    <img
                      src={selectedDoc.previewUrl}
                      alt={selectedDoc.name}
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  ) : (
                    <DocumentTextIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Document Name</p>
                    <p className="font-medium text-gray-900">{selectedDoc.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium">{categories.find(c => c.id === selectedDoc.category)?.name}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">File Size</p>
                      <p className="text-sm font-medium">{selectedDoc.size}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Upload Date</p>
                      <p className="text-sm font-medium">{formatDate(selectedDoc.uploadDate)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                      <p className="text-sm font-medium">{formatDate(selectedDoc.expiryDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDownload(selectedDoc)}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors flex items-center justify-center"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Download
                </button>
                <button className="px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors flex items-center justify-center">
                  <ShareIcon className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Preview</h3>
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Select a document to preview</p>
                <p className="text-sm text-gray-500">Click on any document to view details and preview</p>
              </div>
            </div>
          )}

          {/* Document Statistics */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Statistics</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Verified Documents</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {documents.filter(d => d.status === 'verified').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-2xl">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700">Pending Review</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {documents.filter(d => d.status === 'pending').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-2xl">
                <div className="flex items-center">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700">Expiring Soon</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {documents.filter(d => getDaysUntilExpiry(d.expiryDate) <= 30 && getDaysUntilExpiry(d.expiryDate) > 0).length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex items-center">
                  <LockClosedIcon className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Required Complete</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {requiredDocs.filter(d => d.status === 'verified').length}/{requiredDocs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl text-left transition-colors flex items-center">
                <DocumentCheckIcon className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Renew Expiring Documents</p>
                  <p className="text-sm text-gray-600">Update documents expiring soon</p>
                </div>
              </button>
              
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl text-left transition-colors flex items-center">
                <ChartBarIcon className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Generate Report</p>
                  <p className="text-sm text-gray-600">Export all documents status</p>
                </div>
              </button>
              
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-2xl text-left transition-colors flex items-center">
                <IdentificationIcon className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">ID Verification</p>
                  <p className="text-sm text-gray-600">Verify your identification</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
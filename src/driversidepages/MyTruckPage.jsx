import React from 'react';
import {
  TruckIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  BoltIcon,
  MapPinIcon,
  CogIcon,
  Battery100Icon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const MyTruckPage = ({ driver }) => {
  const vehicle = driver.vehicle;

  const vehicleStats = [
    { label: 'Mileage', value: vehicle.mileage, icon: MapPinIcon, color: 'text-blue-600' },
    { label: 'Fuel Type', value: vehicle.fuelType, icon: BoltIcon, color: 'text-green-600' },
    { label: 'Capacity', value: vehicle.capacity, icon: TruckIcon, color: 'text-purple-600' },
    { label: 'Color', value: vehicle.color, icon: CogIcon, color: 'text-gray-600' }
  ];

  const maintenanceItems = [
    { label: 'Last Service', value: vehicle.lastService, status: 'completed', icon: CheckCircleIcon },
    { label: 'Next Service', value: vehicle.nextService, status: 'upcoming', icon: ClockIcon },
    { label: 'Insurance Expiry', value: vehicle.insuranceExpiry, status: 'valid', icon: ShieldCheckIcon }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      case 'valid':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Truck</h1>
        <p className="text-gray-600 text-sm md:text-base">Manage and monitor your vehicle details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Vehicle Image and Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Image Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Vehicle Overview</h2>
              <button className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-all">
                <PhotoIcon className="w-4 h-4 mr-2" />
                Update Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Image */}
              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Delivery Truck"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    Active
                  </span>
                </div>
              </div>

              {/* Basic Vehicle Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <TruckIcon className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Type</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{vehicle.type}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Plate</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{vehicle.plate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Year</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{vehicle.year}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Battery100Icon className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Status</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Statistics */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Vehicle Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vehicleStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance & Details Sidebar */}
        <div className="space-y-6">
          {/* Maintenance Schedule */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <WrenchScrewdriverIcon className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
            </div>

            <div className="space-y-3">
              {maintenanceItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${getStatusColor(item.status)}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-600">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition-all">
              Schedule Service
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-full font-medium transition-all">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Insurance Details
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full font-medium transition-all">
                <WrenchScrewdriverIcon className="w-4 h-4 mr-2" />
                Maintenance History
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-full font-medium transition-all">
                <BoltIcon className="w-4 h-4 mr-2" />
                Fuel Records
              </button>
            </div>
          </div>

          {/* Vehicle Health Status */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Engine</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Brakes</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tires</span>
                  <span className="font-medium text-yellow-600">Fair</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTruckPage;

import React, { useState } from 'react';
import MapView from '../components/MapView';
import {
  MapIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  SpeakerWaveIcon,
  ShareIcon,
  ArrowUturnLeftIcon,
  ArrowsPointingInIcon,
  PlusIcon,
  MinusIcon,
  InformationCircleIcon,
  TruckIcon,
  UserIcon,
  CurrencyDollarIcon,
  Battery100Icon
} from '@heroicons/react/24/outline';

const NavigationSystem = () => {
  const [destination, setDestination] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showAlternateRoutes, setShowAlternateRoutes] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(15);

  // Current route data
  const [currentRoute, setCurrentRoute] = useState({
    from: 'Current Location',
    to: 'Ikeja City Mall, Lagos',
    distance: '15.7 km',
    time: '32 minutes',
    traffic: 'Moderate',
    eta: '11:45 AM',
    nextTurn: 'Right onto Allen Avenue in 1.2 km'
  });

  // Driver stats
  const driverStats = [
    { label: 'Distance Today', value: '87.5 km', icon: MapIcon, color: 'bg-blue-100 text-blue-600' },
    { label: 'Deliveries', value: '12/15', icon: TruckIcon, color: 'bg-green-100 text-green-600' },
    { label: 'Fuel Efficiency', value: '18.2 km/L', icon: Battery100Icon, color: 'bg-purple-100 text-purple-600' },
    { label: 'Earnings Today', value: '₦24,500', icon: CurrencyDollarIcon, color: 'bg-amber-100 text-amber-600' }
  ];

  // Alternate routes
  const alternateRoutes = [
    { id: 1, name: 'Fastest Route', time: '32 min', distance: '15.7 km', traffic: 'Moderate', savings: '5 min' },
    { id: 2, name: 'Economic Route', time: '35 min', distance: '14.2 km', traffic: 'Light', savings: '8% fuel' },
    { id: 3, name: 'Alternative Route', time: '28 min', distance: '16.5 km', traffic: 'Heavy', savings: 'Avoid toll' }
  ];

  // Traffic alerts
  const trafficAlerts = [
    { id: 1, type: 'accident', location: 'Ikeja Bridge', delay: '10 min', severity: 'high' },
    { id: 2, type: 'construction', location: 'Allen Avenue', delay: '5 min', severity: 'medium' },
    { id: 3, type: 'road closure', location: 'Oba Akran Avenue', delay: '15 min', severity: 'high' }
  ];

  // Navigation steps
  const navigationSteps = [
    { id: 1, instruction: 'Head north on Airport Road', distance: '2.3 km', time: '5 min' },
    { id: 2, instruction: 'Turn right onto Allen Avenue', distance: '4.1 km', time: '8 min' },
    { id: 3, instruction: 'Continue straight for 3.2 km', distance: '3.2 km', time: '6 min' },
    { id: 4, instruction: 'Turn left into Ikeja City Mall', distance: '0.5 km', time: '2 min' }
  ];

  const handleStartNavigation = () => {
    if (!destination.trim()) {
      alert('Please enter a destination');
      return;
    }
    setIsNavigating(true);
    // In real app, this would trigger actual navigation
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    // In real app, this would stop navigation
  };

  const handleRouteSelect = (route) => {
    setCurrentRoute({
      ...currentRoute,
      time: route.time,
      distance: route.distance,
      traffic: route.traffic
    });
    setShowAlternateRoutes(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(20, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <MapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Navigation System</h1>
              <p className="text-xs text-gray-500">Real-time route guidance for drivers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full transition-colors flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              Driver Mode
            </button>
            
            {isNavigating ? (
              <button
                onClick={handleStopNavigation}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors flex items-center shadow-sm"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Stop Navigation
              </button>
            ) : (
              <button
                onClick={handleStartNavigation}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors flex items-center shadow-sm"
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Start Navigation
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Driver Stats Cards - All rounded */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {driverStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Destination Input */}
        <div className="mb-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <input
                  type="text"
                  value={currentRoute.from}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <MapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter delivery address..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for landmarks, gas stations, or restaurants..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map Area */}
          <div className="lg:col-span-2">
            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden h-[500px] relative">
              <MapView
                height="500px"
                center={[6.5244, 3.3792]}
                zoom={13}
                markers={[
                  { position: [6.5244, 3.3792], label: 'Current Location', popup: 'You are here', color: '#3B82F6', type: 'truck' },
                  { position: [6.6018, 3.3515], label: 'Destination', popup: isNavigating ? currentRoute.to : 'Enter destination to navigate', color: '#EF4444', type: 'dot' },
                ]}
                route={isNavigating ? [[6.5244, 3.3792], [6.5600, 3.3600], [6.6018, 3.3515]] : []}
                routeColor="#3B82F6"
              />
              {/* Overlay info bar */}
              {isNavigating && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4 z-[1000]">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-black/30 p-3 rounded-xl">
                      <div className="text-xs text-blue-300 mb-1">DISTANCE</div>
                      <div className="text-lg font-bold text-white">{currentRoute.distance}</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl">
                      <div className="text-xs text-blue-300 mb-1">ARRIVAL</div>
                      <div className="text-lg font-bold text-white">{currentRoute.eta}</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl">
                      <div className="text-xs text-blue-300 mb-1">TRAFFIC</div>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          currentRoute.traffic === 'Light' ? 'bg-green-500' :
                          currentRoute.traffic === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div className="text-lg font-bold text-white">{currentRoute.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Turn-by-Turn Directions */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowUturnLeftIcon className="w-5 h-5 text-blue-600 mr-2" />
                Turn-by-Turn Directions
              </h3>
              <div className="space-y-4">
                {navigationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{step.instruction}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{step.distance}</span>
                          <span className="text-sm text-gray-600">{step.time}</span>
                        </div>
                      </div>
                      {index < navigationSteps.length - 1 && (
                        <div className="mt-2 ml-4 border-l-2 border-blue-200 h-4"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Controls & Info */}
          <div className="space-y-6">
            {/* Route Summary - Rounded card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Route Summary</h3>
                <button
                  onClick={() => setShowAlternateRoutes(!showAlternateRoutes)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {showAlternateRoutes ? 'Hide Alternatives' : 'View Alternatives'}
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Selected Route</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {currentRoute.traffic} Traffic
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <span className="ml-2 font-medium">{currentRoute.distance}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <span className="ml-2 font-medium">{currentRoute.time}</span>
                    </div>
                  </div>
                </div>
                
                {showAlternateRoutes && (
                  <div className="space-y-2">
                    {alternateRoutes.map((route) => (
                      <button
                        key={route.id}
                        onClick={() => handleRouteSelect(route)}
                        className="w-full p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-left transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{route.name}</span>
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Save {route.savings}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{route.distance}</span>
                          <span>{route.time}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            route.traffic === 'Light' ? 'bg-green-100 text-green-800' :
                            route.traffic === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {route.traffic}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Traffic Alerts - Rounded card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ExclamationCircleIcon className="w-5 h-5 text-orange-500 mr-2" />
                Traffic Alerts
              </h3>
              <div className="space-y-3">
                {trafficAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl border ${
                      alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                      alert.severity === 'medium' ? 'bg-orange-50 border-orange-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 capitalize">{alert.type}</span>
                      <span className="text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded-full">+{alert.delay}</span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls - Rounded card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h3 className="font-semibold text-gray-900 mb-4">Navigation Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Voice Guidance</p>
                      <p className="text-xs text-gray-500">Turn-by-turn voice instructions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setVoiceGuidance(!voiceGuidance)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      voiceGuidance ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center transition-colors">
                    <ShareIcon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium">Share ETA</span>
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center transition-colors">
                    <ArrowPathIcon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium">Recalculate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Turn Info - Rounded card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ChevronRightIcon className="w-5 h-5 text-blue-600 mr-2" />
                Next Instruction
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-lg font-semibold text-gray-900">Right onto Allen Avenue</p>
                  <div className="flex items-center mt-2">
                    <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">In 1.2 km • Approx. 3 minutes</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm">
                  View Full Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSystem;
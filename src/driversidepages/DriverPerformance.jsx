import React, { useState } from 'react';
import {
  ChartBarIcon,
  StarIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  UserIcon,
  MapIcon,
  BoltIcon,
  ShieldCheckIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  CalendarDaysIcon,
  ChartPieIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  CogIcon,
  BellIcon,
  UsersIcon,
  BuildingOfficeIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const DriverPerformance = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  // Driver performance data
  const driverData = {
    name: 'Musa Ibrahim',
    rating: 4.9,
    totalDeliveries: 128,
    completedThisWeek: 24,
    onTimeRate: 96.5,
    earnings: {
      today: 24500,
      week: 156400,
      month: 425000
    },
    averageDeliveryTime: '32 min',
    fuelEfficiency: '18.2 km/L',
    customerSatisfaction: 4.8,
    safetyScore: 98,
    rank: 'Top 5%',
    vehicle: 'Toyota Hilux - XYZ123AB'
  };

  // Performance metrics
  const performanceData = {
    week: {
      deliveries: 24,
      onTime: 23,
      late: 1,
      earnings: 156400,
      distance: 287.5,
      fuelUsed: 15.8,
      hoursWorked: 42
    },
    month: {
      deliveries: 89,
      onTime: 86,
      late: 3,
      earnings: 425000,
      distance: 1250.3,
      fuelUsed: 68.7,
      hoursWorked: 168
    },
    quarter: {
      deliveries: 256,
      onTime: 248,
      late: 8,
      earnings: 1250000,
      distance: 3580.2,
      fuelUsed: 196.8,
      hoursWorked: 520
    }
  };

  // Weekly breakdown
  const weeklyData = [
    { day: 'Mon', deliveries: 5, earnings: 32500, rating: 4.9, onTime: '100%' },
    { day: 'Tue', deliveries: 4, earnings: 28500, rating: 5.0, onTime: '100%' },
    { day: 'Wed', deliveries: 5, earnings: 32000, rating: 4.8, onTime: '100%' },
    { day: 'Thu', deliveries: 3, earnings: 21000, rating: 4.9, onTime: '100%' },
    { day: 'Fri', deliveries: 4, earnings: 26500, rating: 4.8, onTime: '95%' },
    { day: 'Sat', deliveries: 3, earnings: 15800, rating: 5.0, onTime: '100%' },
    { day: 'Sun', deliveries: 0, earnings: 0, rating: '-', onTime: '-' }
  ];

  // Rating breakdown
  const ratingData = [
    { stars: 5, count: 118, percentage: 92.2 },
    { stars: 4, count: 8, percentage: 6.3 },
    { stars: 3, count: 2, percentage: 1.5 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  // Performance trends
  const trendData = [
    { month: 'Jan', deliveries: 35, rating: 4.7, earnings: 380000 },
    { month: 'Feb', deliveries: 32, rating: 4.8, earnings: 350000 },
    { month: 'Mar', deliveries: 38, rating: 4.9, earnings: 420000 },
    { month: 'Apr', deliveries: 40, rating: 4.9, earnings: 450000 },
    { month: 'May', deliveries: 42, rating: 4.9, earnings: 480000 },
    { month: 'Jun', deliveries: 45, rating: 5.0, earnings: 520000 }
  ];

  // Customer feedback
  const feedbackData = [
    { 
      id: 1, 
      customer: 'TechGadgets Ltd', 
      rating: 5, 
      comment: 'Excellent service! Always on time and professional.', 
      date: '2024-01-15',
      delivery: 'FRT-2024-00158'
    },
    { 
      id: 2, 
      customer: 'Office Supplies Inc', 
      rating: 5, 
      comment: 'Very careful with fragile items. Highly recommended!', 
      date: '2024-01-14',
      delivery: 'FRT-2024-00157'
    },
    { 
      id: 3, 
      customer: 'MediCare Pharmacy', 
      rating: 4, 
      comment: 'Good service but arrived 10 minutes late.', 
      date: '2024-01-13',
      delivery: 'FRT-2024-00156'
    }
  ];

  // Team comparison
  const comparisonData = {
    driver: {
      rating: 4.9,
      onTimeRate: 96.5,
      deliveriesPerDay: 4.8,
      earningsPerDelivery: 3250
    },
    teamAverage: {
      rating: 4.3,
      onTimeRate: 88.2,
      deliveriesPerDay: 3.5,
      earningsPerDelivery: 2850
    }
  };

  // Achievements
  const achievementsData = [
    { id: 1, name: 'Perfect Week', icon: TrophyIcon, earned: true, description: '5+ deliveries with 100% on-time rate' },
    { id: 2, name: 'Safety Star', icon: ShieldCheckIcon, earned: true, description: '30 days without incidents' },
    { id: 3, name: 'Top Earner', icon: CurrencyDollarIcon, earned: true, description: 'Top 10% in weekly earnings' },
    { id: 4, name: 'Customer Favorite', icon: FaceSmileIcon, earned: true, description: '4.8+ rating for 4 consecutive weeks' },
    { id: 5, name: 'Distance Master', icon: MapIcon, earned: false, description: '5000+ km in a quarter' }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  // Current metrics
  const currentMetrics = performanceData[timeRange];

  // Calculate performance vs team
  const calculatePerformanceVsTeam = (driverValue, teamValue) => {
    const difference = ((driverValue - teamValue) / teamValue) * 100;
    return {
      value: difference,
      isPositive: difference > 0,
      icon: difference > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
    };
  };

  // Performance comparison items
  const performanceComparisons = [
    {
      label: 'Customer Rating',
      driverValue: comparisonData.driver.rating,
      teamValue: comparisonData.teamAverage.rating,
      unit: '/5.0'
    },
    {
      label: 'On-Time Rate',
      driverValue: comparisonData.driver.onTimeRate,
      teamValue: comparisonData.teamAverage.onTimeRate,
      unit: '%'
    },
    {
      label: 'Daily Deliveries',
      driverValue: comparisonData.driver.deliveriesPerDay,
      teamValue: comparisonData.teamAverage.deliveriesPerDay,
      unit: '/day'
    },
    {
      label: 'Earnings/Delivery',
      driverValue: comparisonData.driver.earningsPerDelivery,
      teamValue: comparisonData.teamAverage.earningsPerDelivery,
      unit: '₦'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Performance</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{driverData.name}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <div className="flex items-center">
                <TruckIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{driverData.vehicle}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
              {['week', 'month', 'quarter'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    timeRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            
            <button className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm flex items-center">
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Rating Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <StarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {driverData.rank}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{driverData.rating}</h3>
          <p className="text-sm text-gray-600 mb-3">Customer Rating</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(driverData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-600">({driverData.totalDeliveries} deliveries)</span>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(currentMetrics.earnings)}</h3>
          <p className="text-sm text-gray-600 mb-3">Total Earnings ({timeRange})</p>
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>Today: {formatCurrency(driverData.earnings.today)}</span>
          </div>
        </div>

        {/* On-Time Performance */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
              +8.3%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{driverData.onTimeRate}%</h3>
          <p className="text-sm text-gray-600 mb-3">On-Time Delivery Rate</p>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-1" />
            <span>{currentMetrics.onTime} on-time • {currentMetrics.late} late</span>
          </div>
        </div>

        {/* Efficiency Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <BoltIcon className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Top Performer
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{driverData.fuelEfficiency}</h3>
          <p className="text-sm text-gray-600 mb-3">Fuel Efficiency</p>
          <div className="flex items-center text-sm text-gray-600">
            <MapIcon className="w-4 h-4 mr-1" />
            <span>{currentMetrics.distance} km • {currentMetrics.fuelUsed}L fuel</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-full max-w-max">
          {['overview', 'analytics', 'feedback', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Performance Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Jan 8 - Jan 14, 2024</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-16">
                    <span className="text-sm font-medium text-gray-900">{day.day}</span>
                  </div>
                  <div className="flex-1 flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Deliveries: {day.deliveries}</span>
                        <span className="text-sm font-medium text-gray-900">{day.onTime} on-time</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(day.deliveries / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(day.earnings)}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{day.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance vs Team Average */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance vs Team Average</h3>
            
            <div className="space-y-4">
              {performanceComparisons.map((item, index) => {
                const comparison = calculatePerformanceVsTeam(item.driverValue, item.teamValue);
                const Icon = comparison.icon;
                
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
                        comparison.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <Icon className="w-4 h-4 mr-1" />
                        <span>{comparison.isPositive ? '+' : ''}{comparison.value.toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {item.label.includes('Earnings') ? formatCurrency(item.driverValue) : item.driverValue}{item.unit}
                        </div>
                        <div className="text-sm text-gray-600">Your Performance</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg text-gray-600">
                          {item.label.includes('Earnings') ? formatCurrency(item.teamValue) : item.teamValue}{item.unit}
                        </div>
                        <div className="text-sm text-gray-500">Team Average</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Customer Feedback</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Feedback
              </button>
            </div>
            
            <div className="space-y-4">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{feedback.customer}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{feedback.date}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full">
                      {feedback.delivery}
                    </span>
                  </div>
                  <p className="text-gray-600">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Rating Breakdown */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Breakdown</h3>
            
            <div className="space-y-3">
              {ratingData.map((rating, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-3 h-3 ${i < rating.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-gray-900">{rating.percentage}%</span>
                    <div className="text-xs text-gray-500">({rating.count})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements & Badges</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {achievementsData.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className={`p-3 rounded-xl border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                        {achievement.earned && (
                          <div className="flex items-center text-xs text-green-600">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            <span>Earned</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Tips</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Maintain Current Pace</span>
                </div>
                <p className="text-xs text-gray-600">You're performing 12.5% above team average</p>
              </div>
              
              <div className="p-3 bg-white/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Earnings Opportunity</span>
                </div>
                <p className="text-xs text-gray-600">Increase weekend deliveries to boost earnings by 15%</p>
              </div>
              
              <div className="p-3 bg-white/50 rounded-xl">
                <div className="flex items-center mb-2">
                  <ClockIcon className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Focus Area</span>
                </div>
                <p className="text-xs text-gray-600">Work on reducing delivery time by 2-3 minutes per stop</p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Summary</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Total Deliveries</span>
                <span className="text-lg font-bold text-gray-900">{currentMetrics.deliveries}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Total Distance</span>
                <span className="text-lg font-bold text-gray-900">{currentMetrics.distance} km</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Hours Worked</span>
                <span className="text-lg font-bold text-gray-900">{currentMetrics.hoursWorked}h</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Fuel Consumption</span>
                <span className="text-lg font-bold text-gray-900">{currentMetrics.fuelUsed}L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center text-sm text-gray-600 mb-4 sm:mb-0">
          <InformationCircleIcon className="w-5 h-5 text-gray-400 mr-2" />
          <span>Performance metrics updated in real-time. Data refreshes every 15 minutes.</span>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm flex items-center">
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm flex items-center">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverPerformance;
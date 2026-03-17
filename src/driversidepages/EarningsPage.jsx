import React, { useState } from 'react';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CreditCardIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
  ChartBarIcon,
  TruckIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  EnvelopeIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const EarningsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState('bank');
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportCategory, setSupportCategory] = useState('payment');
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);

  // Earnings data
  const earningsData = {
    today: { amount: 18500, deliveries: 8, hours: 6.5 },
    week: { amount: 89200, deliveries: 32, hours: 28 },
    month: { amount: 342500, deliveries: 128, hours: 112 },
    total: { amount: 1856000, deliveries: 512, hours: 448 }
  };

  const periods = [
    { id: 'today', label: 'Today', amount: earningsData.today.amount },
    { id: 'week', label: 'This Week', amount: earningsData.week.amount },
    { id: 'month', label: 'This Month', amount: earningsData.month.amount },
    { id: 'total', label: 'All Time', amount: earningsData.total.amount }
  ];

  // Recent transactions
  const recentTransactions = [
    { id: 1, type: 'delivery', amount: 8500, description: 'Lagos to Ikeja • Electronics', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'delivery', amount: 7200, description: 'Victoria Island • Documents', time: '5 hours ago', status: 'completed' },
    { id: 3, type: 'bonus', amount: 2500, description: 'On-time Delivery Bonus', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'deduction', amount: -1200, description: 'Fuel Reimbursement', time: '2 days ago', status: 'completed' },
    { id: 5, type: 'delivery', amount: 9500, description: 'Airport • Express Delivery', time: '3 days ago', status: 'pending' }
  ];

  // Payout methods
  const payoutMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: BanknotesIcon, description: 'Standard 24-48 hours', fee: '₦100' },
    { id: 'mobile', name: 'Mobile Money', icon: PhoneIcon, description: 'Instant transfer', fee: '₦50' },
    { id: 'cash', name: 'Cash Pickup', icon: CurrencyDollarIcon, description: 'Agent locations', fee: '₦200' }
  ];

  // Earnings by service type
  const earningsByService = [
    { type: 'Express Delivery', amount: 125000, percentage: 36.5, deliveries: 47 },
    { type: 'Standard Delivery', amount: 98500, percentage: 28.8, deliveries: 52 },
    { type: 'Bulk Shipment', amount: 75200, percentage: 22.0, deliveries: 18 },
    { type: 'Scheduled Delivery', amount: 43800, percentage: 12.8, deliveries: 11 }
  ];

  // Support categories
  const supportCategories = [
    { id: 'payment', name: 'Payment Issues', icon: CurrencyDollarIcon },
    { id: 'withdrawal', name: 'Withdrawal Problems', icon: ArrowUpTrayIcon },
    { id: 'transaction', name: 'Transaction Dispute', icon: DocumentTextIcon },
    { id: 'account', name: 'Account Issues', icon: UserIcon },
    { id: 'technical', name: 'Technical Support', icon: InformationCircleIcon },
    { id: 'other', name: 'Other Issues', icon: ChatBubbleLeftRightIcon }
  ];

  // Contact information
  const contactInfo = [
    { type: 'phone', label: 'Support Hotline', value: '+234 800 123 4567', icon: PhoneIcon },
    { type: 'email', label: 'Email Support', value: 'support@deliveryapp.com', icon: EnvelopeIcon },
    { type: 'hours', label: 'Support Hours', value: '24/7', icon: ClockIcon }
  ];

  const currentPeriod = periods.find(p => p.id === selectedPeriod);

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG')}`;
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount || withdrawalAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    // In real app, this would process withdrawal
    alert(`Withdrawal request for ₦${withdrawalAmount} submitted`);
    setShowWithdrawalModal(false);
    setWithdrawalAmount('');
  };

  const handleContactSupport = () => {
    if (!supportMessage.trim()) {
      alert('Please enter your message');
      return;
    }
    
    // In real app, this would send support request
    console.log('Support request:', {
      category: supportCategory,
      message: supportMessage,
      timestamp: new Date().toISOString()
    });
    
    setShowSupportSuccess(true);
    setSupportMessage('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSupportSuccess(false);
      setShowContactSupport(false);
    }, 3000);
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'delivery': return <TruckIcon className="w-5 h-5" />;
      case 'bonus': return <ArrowTrendingUpIcon className="w-5 h-5" />;
      case 'deduction': return <ArrowTrendingDownIcon className="w-5 h-5" />;
      default: return <CurrencyDollarIcon className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type) => {
    switch(type) {
      case 'delivery': return 'bg-blue-100 text-blue-600';
      case 'bonus': return 'bg-green-100 text-green-600';
      case 'deduction': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      {/* Earnings Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">Earnings</h1>
            <p className="text-sm md:text-base text-gray-600">Track your income and manage payouts</p>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={() => setShowWithdrawalModal(true)}
              className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-sm hover:shadow-md text-sm md:text-base"
            >
              <div className="flex items-center">
                <ArrowUpTrayIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Request Payout</span>
                <span className="sm:hidden">Payout</span>
              </div>
            </button>
            <button className="px-3 py-2 md:px-4 md:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors flex items-center text-sm md:text-base">
              <ArrowDownTrayIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Period Selector - Made responsive */}
        <div className="flex flex-wrap gap-2 mb-6">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Overview - Improved responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        {/* Total Earnings Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <CurrencyDollarIcon className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xs md:text-sm bg-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full">Current</span>
          </div>
          <p className="text-xs md:text-sm opacity-90 mb-1 md:mb-2">{currentPeriod.label} Earnings</p>
          <p className="text-xl md:text-3xl font-bold mb-1 md:mb-2 truncate">{formatCurrency(currentPeriod.amount)}</p>
          <div className="flex items-center text-xs md:text-sm">
            <ArrowTrendingUpIcon className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            <span className="truncate">12% increase from last {selectedPeriod}</span>
          </div>
        </div>

        {/* Deliveries Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
              <TruckIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Completed Deliveries</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{earningsData[selectedPeriod].deliveries}</p>
            </div>
          </div>
          <div className="text-xs md:text-sm text-gray-600 truncate">
            Avg: ₦{Math.round(earningsData[selectedPeriod].amount / earningsData[selectedPeriod].deliveries)} per delivery
          </div>
        </div>

        {/* Hours Worked Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
              <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Hours Worked</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{earningsData[selectedPeriod].hours}</p>
            </div>
          </div>
          <div className="text-xs md:text-sm text-gray-600 truncate">
            Avg: ₦{Math.round(earningsData[selectedPeriod].amount / earningsData[selectedPeriod].hours)} per hour
          </div>
        </div>

        {/* Pending Payout Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
              <CreditCardIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Available for Payout</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{formatCurrency(24500)}</p>
            </div>
          </div>
          <button
            onClick={() => setShowWithdrawalModal(true)}
            className="w-full mt-1 md:mt-2 py-1.5 md:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-full transition-colors"
          >
            Withdraw Now
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Earnings Breakdown */}
        <div className="lg:col-span-2">
          {/* Earnings Chart Placeholder */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
              <div className="mb-3 md:mb-0">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Earnings Trend</h3>
                <p className="text-xs md:text-sm text-gray-600">Last 30 days performance</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm rounded-full">
                  Daily
                </button>
                <button className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-600 text-white text-xs md:text-sm rounded-full">
                  Weekly
                </button>
                <button className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm rounded-full">
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-48 md:h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center px-2">
                <ChartBarIcon className="w-8 h-8 md:w-12 md:h-12 text-blue-300 mx-auto mb-2 md:mb-3" />
                <p className="text-sm md:text-base text-gray-500 font-medium">Earnings Visualization</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Chart showing ₦342,500 earned this month</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gray-900">₦89.2K</div>
                <div className="text-xs text-gray-500">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gray-900">32</div>
                <div className="text-xs text-gray-500">Deliveries</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gray-900">₦2,787</div>
                <div className="text-xs text-gray-500">Avg. per Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-gray-900">+12%</div>
                <div className="text-xs text-gray-500">Growth</div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
              <div className="mb-3 md:mb-0">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <p className="text-xs md:text-sm text-gray-600">Latest payment activities</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium rounded-full px-3 py-1 hover:bg-blue-50 self-start md:self-auto">
                View All
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 md:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-2 md:mr-4 flex-shrink-0 ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm md:text-base font-medium text-gray-900 truncate">{transaction.description}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{transaction.time}</span>
                        {transaction.status === 'pending' && (
                          <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className={`text-sm md:text-base font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </p>
                    {transaction.status === 'completed' && (
                      <div className="flex items-center justify-end mt-1">
                        <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Controls */}
        <div className="space-y-4 md:space-y-6">
          {/* Earnings by Service Type */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Earnings by Service</h3>
            <div className="space-y-3 md:space-y-4">
              {earningsByService.map((service) => (
                <div key={service.type} className="space-y-1.5 md:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium text-gray-900 truncate">{service.type}</span>
                    <span className="text-xs md:text-sm font-medium text-gray-900 truncate ml-2">{formatCurrency(service.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-16 md:w-24 bg-gray-200 rounded-full h-1.5 md:h-2 mr-2 md:mr-3">
                        <div 
                          className="bg-blue-600 h-1.5 md:h-2 rounded-full" 
                          style={{ width: `${service.percentage}%` }}
                        ></div>
                      </div>
                      <span>{service.percentage}%</span>
                    </div>
                    <span>{service.deliveries} deliveries</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Performance Stats</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-sm text-gray-700">On-time Rate</span>
                </div>
                <span className="text-sm md:text-base font-medium text-gray-900">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-sm text-gray-700">Customer Rating</span>
                </div>
                <span className="text-sm md:text-base font-medium text-gray-900">4.8/5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowTrendingUpIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-sm text-gray-700">Weekly Growth</span>
                </div>
                <span className="text-sm md:text-base font-medium text-green-600">+12.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3" />
                  <span className="text-sm text-gray-700">Avg. Daily Earnings</span>
                </div>
                <span className="text-sm md:text-base font-medium text-gray-900">₦12,750</span>
              </div>
            </div>
          </div>

          {/* Payout History */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Payouts</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium rounded-full px-3 py-1 hover:bg-blue-50">
                View All
              </button>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">Bank Transfer</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base font-medium text-gray-900">₦45,200</p>
                  <div className="flex items-center justify-end">
                    <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">Paid</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">Mobile Money</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base font-medium text-gray-900">₦32,800</p>
                  <div className="flex items-center justify-end">
                    <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section - Enhanced with multiple contact options */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Need Help?</h3>
            <div className="space-y-2 md:space-y-3">
              <button 
                onClick={() => setShowContactSupport(true)}
                className="w-full p-2 md:p-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-full text-left transition-colors flex items-center"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 mr-2 md:mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact Support</p>
                  <p className="text-xs text-gray-600">Get help with payment issues</p>
                </div>
              </button>
              
              <button className="w-full p-2 md:p-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-full text-left transition-colors flex items-center">
                <DocumentTextIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 mr-2 md:mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Download Statement</p>
                  <p className="text-xs text-gray-600">Monthly earnings report</p>
                </div>
              </button>
              
              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Quick Contact</h4>
                <div className="space-y-2">
                  {contactInfo.map((contact) => (
                    <div key={contact.type} className="flex items-center text-xs text-gray-600">
                      <contact.icon className="w-3 h-3 mr-2" />
                      <span className="font-medium">{contact.label}:</span>
                      <span className="ml-1 text-blue-600">{contact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Modal */}
      {showContactSupport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Contact Support</h3>
              <button
                onClick={() => {
                  setShowContactSupport(false);
                  setSupportMessage('');
                  setSupportCategory('payment');
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Success Message */}
              {showSupportSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Message Sent Successfully!</p>
                      <p className="text-xs text-green-600 mt-1">Our support team will contact you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Issue Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {supportCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSupportCategory(category.id)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        supportCategory === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <category.icon className={`w-5 h-5 mb-1 ${
                          supportCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <span className="text-xs font-medium text-gray-900">{category.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your issue
                </label>
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Please provide details about your issue..."
                  rows="4"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">Include transaction IDs or specific details for faster resolution</p>
              </div>

              {/* Attachments (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Screenshots (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <ArrowUpTrayIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 md:space-x-3">
                <button
                  onClick={() => {
                    setShowContactSupport(false);
                    setSupportMessage('');
                    setSupportCategory('payment');
                  }}
                  className="flex-1 py-2 md:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactSupport}
                  className="flex-1 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors text-sm md:text-base"
                >
                  Send Message
                </button>
              </div>

              {/* Alternative Contact Info */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-2">Need immediate assistance?</p>
                <div className="space-y-1">
                  <button className="w-full flex items-center justify-center py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    Call Support: +234 800 123 4567
                  </button>
                  <button className="w-full flex items-center justify-center py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium rounded-full">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    Email: support@deliveryapp.com
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Request Payout</h3>
              <button
                onClick={() => setShowWithdrawalModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Available Balance */}
              <div className="bg-blue-50 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Available Balance</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(24500)}</p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Withdraw (₦)
                </label>
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  max="24500"
                  min="1000"
                />
                <p className="text-xs text-gray-500 mt-2">Minimum withdrawal: ₦1,000</p>
              </div>

              {/* Payout Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payout Method
                </label>
                <div className="space-y-2 md:space-y-3">
                  {payoutMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayoutMethod(method.id)}
                      className={`w-full p-3 md:p-4 border rounded-full text-left transition-colors ${
                        selectedPayoutMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 ${
                          selectedPayoutMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <method.icon className={`w-4 h-4 md:w-5 md:h-5 ${
                            selectedPayoutMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm md:text-base font-medium text-gray-900 truncate">{method.name}</p>
                            <span className="text-xs md:text-sm text-gray-500 ml-2">Fee: {method.fee}</span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 md:space-x-3">
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="flex-1 py-2 md:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdrawal}
                  className="flex-1 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors text-sm md:text-base"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsPage;
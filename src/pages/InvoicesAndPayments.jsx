import React, { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EyeIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  TruckIcon,
  MapPinIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const InvoicesAndPayments = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [invoices, setInvoices] = useState([]);
  const [cards, setCards] = useState([
    { id: 1, last4: '4242', brand: 'Visa', expires: '12/2025', isDefault: true }
  ]);
  const [banks, setBanks] = useState([
    { id: 1, bank: 'Zenith Bank', last4: '7890', account: '1234567890', isDefault: true }
  ]);
  
  // Form states for adding new payment methods
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  
  const [newBank, setNewBank] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    accountType: 'savings'
  });

  // Shipment data - 5 are delivered (paid), 5 are pending
  const allShipments = [
    // Delivered (Paid) Shipments - 5 items
    {
      id: 'FRT-2024-00157',
      trackingNumber: 'TRK789012344',
      name: 'Documents Package',
      status: 'Delivered',
      origin: 'Lagos Office',
      destination: 'Ikeja Office',
      service: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 14:30',
      amount: 3500,
      weight: '0.3 kg',
      driver: 'Musa Ibrahim',
      hasPOD: true,
      paymentDate: '2024-01-14 15:45',
      paymentMethod: 'Card Payment'
    },
    {
      id: 'FRT-2024-00156',
      trackingNumber: 'TRK789012343',
      name: 'Small Electronics',
      status: 'Delivered',
      origin: 'Lagos Seller',
      destination: 'Ibadan Customer',
      service: 'Express',
      scheduled: '2024-01-14',
      deliveredAt: '2024-01-14 16:45',
      amount: 12000,
      weight: '2.5 kg',
      driver: 'Chukwu Emeka',
      hasPOD: true,
      paymentDate: '2024-01-14 17:30',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'FRT-2024-00153',
      trackingNumber: 'TRK789012340',
      name: 'Food Items',
      status: 'Delivered',
      origin: 'Lagos Restaurant',
      destination: 'Lagos Office',
      service: 'Same-Day',
      scheduled: '2024-01-13',
      deliveredAt: '2024-01-13 18:20',
      amount: 3800,
      weight: '4.2 kg',
      driver: 'Tunde Lawal',
      hasPOD: true,
      paymentDate: '2024-01-13 19:15',
      paymentMethod: 'Card Payment'
    },
    {
      id: 'FRT-2024-00152',
      trackingNumber: 'TRK789012339',
      name: 'Office Supplies',
      status: 'Delivered',
      origin: 'Lagos Supplier',
      destination: 'Abuja Office',
      service: 'LTL',
      scheduled: '2024-01-13',
      deliveredAt: '2024-01-13 15:30',
      amount: 18500,
      weight: '25 kg',
      driver: 'Ngozi Okoro',
      hasPOD: true,
      paymentDate: '2024-01-13 16:45',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'FRT-2024-00151',
      trackingNumber: 'TRK789012338',
      name: 'Pharmaceuticals',
      status: 'Delivered',
      origin: 'Lagos Pharma',
      destination: 'Ibadan Clinic',
      service: 'Express',
      scheduled: '2024-01-12',
      deliveredAt: '2024-01-12 12:15',
      amount: 9500,
      weight: '5.2 kg',
      driver: 'Chinedu Obi',
      hasPOD: true,
      paymentDate: '2024-01-12 13:30',
      paymentMethod: 'Pay on Delivery'
    },
    
    // Pending Shipments - 5 items
    {
      id: 'FRT-2024-00158',
      trackingNumber: 'TRK789012345',
      name: 'Phone Delivery',
      status: 'In Transit',
      origin: 'Lagos Warehouse',
      destination: 'Lagos Customer',
      service: 'Same-Day',
      scheduled: '2024-01-15',
      deliveredAt: '',
      amount: 4500,
      weight: '0.5 kg',
      driver: 'John Okafor',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00155',
      trackingNumber: 'TRK789012342',
      name: 'Medical Supplies',
      status: 'Picked Up',
      origin: 'Lagos Pharmacy',
      destination: 'Lagos Hospital',
      service: 'Same-Day',
      scheduled: '2024-01-16',
      deliveredAt: '',
      amount: 5500,
      weight: '3.5 kg',
      driver: 'Amina Yusuf',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00154',
      trackingNumber: 'TRK789012341',
      name: 'Clothing Package',
      status: 'Picked Up',
      origin: 'Lagos Store',
      destination: 'Lagos Customer',
      service: 'Standard',
      scheduled: '2024-01-16',
      deliveredAt: '',
      amount: 4200,
      weight: '1.8 kg',
      driver: 'Bola Adekunle',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00150',
      trackingNumber: 'TRK789012337',
      name: 'Small Parcel',
      status: 'Booked',
      origin: 'Lagos Shop',
      destination: 'Port Harcourt',
      service: 'Standard',
      scheduled: '2024-01-17',
      deliveredAt: '',
      amount: 12500,
      weight: '3.8 kg',
      driver: '',
      hasPOD: false
    },
    {
      id: 'FRT-2024-00149',
      trackingNumber: 'TRK789012336',
      name: 'E-commerce Package',
      status: 'Assigned',
      origin: 'Lagos Fulfillment',
      destination: 'Lagos Customer',
      service: 'Last-Mile',
      scheduled: '2024-01-17',
      deliveredAt: '',
      amount: 3200,
      weight: '0.8 kg',
      driver: 'Kabiru Sani',
      hasPOD: false
    }
  ];

  // Initialize invoices on component mount
  useEffect(() => {
    const generatedInvoices = generateInvoices();
    setInvoices(generatedInvoices);
  }, []);

  // Generate invoices from shipment data
  const generateInvoices = () => {
    return allShipments.map((shipment, index) => {
      const invoiceDate = new Date(shipment.scheduled);
      const dueDate = new Date(invoiceDate);
      dueDate.setDate(dueDate.getDate() + 30);
      
      // Delivered shipments are paid, others are pending
      const isPaid = shipment.status === 'Delivered';
      const isOverdue = !isPaid && new Date() > dueDate;
      
      let status = 'pending';
      let statusColor = 'bg-yellow-100 text-yellow-800';
      
      if (isPaid) {
        status = 'paid';
        statusColor = 'bg-green-100 text-green-800';
      } else if (isOverdue) {
        status = 'overdue';
        statusColor = 'bg-red-100 text-red-800';
      }

      let customer = 'Customer';
      if (shipment.destination) {
        const destParts = shipment.destination.split(' ');
        customer = destParts[destParts.length - 1];
      }

      return {
        id: `INV-${shipment.id.slice(-3)}`,
        invoiceNumber: `INV-2024-${String(index + 1).padStart(3, '0')}`,
        shipmentId: shipment.id,
        trackingNumber: shipment.trackingNumber,
        description: shipment.name,
        customer: customer,
        amount: shipment.amount,
        issueDate: invoiceDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: status,
        statusColor: statusColor,
        deliveryStatus: shipment.status,
        service: shipment.service,
        origin: shipment.origin,
        destination: shipment.destination,
        driver: shipment.driver,
        weight: shipment.weight,
        paymentMethod: shipment.paymentMethod || 'Pending',
        paidDate: shipment.paymentDate ? shipment.paymentDate.split(' ')[0] : null,
        paidTime: shipment.paymentDate ? shipment.paymentDate.split(' ')[1] : null,
        hasPOD: shipment.hasPOD
      };
    });
  };

  // Calculate statistics
  const calculateStats = () => {
    const paidInvoices = invoices.filter(inv => inv.status === 'paid');
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
    
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    
    return {
      totalInvoices: invoices.length,
      paidInvoices: paidInvoices.length,
      pendingInvoices: pendingInvoices.length,
      overdueInvoices: overdueInvoices.length,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount
    };
  };

  const stats = calculateStats();

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      invoice.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Handle payment
  const handlePayInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    if (!selectedInvoice) return;
    
    const paymentMethods = ['Card Payment', 'Bank Transfer', 'Pay on Delivery'];
    const selectedMethod = paymentMethods[paymentMethod === 'card' ? 0 : 1];
    const now = new Date();
    
    const updatedInvoices = invoices.map(inv => 
      inv.id === selectedInvoice.id 
        ? {
            ...inv, 
            status: 'paid', 
            statusColor: 'bg-green-100 text-green-800',
            paymentMethod: selectedMethod,
            paidDate: now.toISOString().split('T')[0],
            paidTime: now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
          } 
        : inv
    );
    
    setInvoices(updatedInvoices);
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  };

  // Handle adding new card
  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv) {
      alert('Please fill all card details');
      return;
    }
    
    const last4 = newCard.cardNumber.slice(-4);
    const brand = newCard.cardNumber.startsWith('4') ? 'Visa' : 
                  newCard.cardNumber.startsWith('5') ? 'Mastercard' : 'Verve';
    
    const newCardObj = {
      id: cards.length + 1,
      last4: last4,
      brand: brand,
      expires: `${newCard.expiryMonth}/${newCard.expiryYear}`,
      isDefault: cards.length === 0
    };
    
    setCards([...cards, newCardObj]);
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    });
    setShowCardModal(false);
  };

  // Handle adding new bank
  const handleAddBankSubmit = (e) => {
    e.preventDefault();
    
    if (!newBank.bankName || !newBank.accountNumber || !newBank.accountName) {
      alert('Please fill all bank details');
      return;
    }
    
    const newBankObj = {
      id: banks.length + 1,
      bank: newBank.bankName,
      last4: newBank.accountNumber.slice(-4),
      account: newBank.accountNumber,
      accountName: newBank.accountName,
      accountType: newBank.accountType,
      isDefault: banks.length === 0
    };
    
    setBanks([...banks, newBankObj]);
    setNewBank({
      bankName: '',
      accountNumber: '',
      accountName: '',
      accountType: 'savings'
    });
    setShowBankModal(false);
  };

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-NG') || '0'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString, timeString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-NG')} ${timeString || ''}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircleIcon className="w-5 h-5" />;
      case 'pending': return <ClockIcon className="w-5 h-5" />;
      case 'overdue': return <XCircleIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoices & Payments</h1>
        <p className="text-gray-600 mt-2">Manage your shipment invoices and payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.paidAmount)}</p>
              <p className="text-xs text-gray-500">{stats.paidInvoices} invoices</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.pendingAmount)}</p>
              <p className="text-xs text-gray-500">{stats.pendingInvoices} invoices</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.overdueAmount)}</p>
              <p className="text-xs text-gray-500">{stats.overdueInvoices} invoices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl mb-6 shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'invoices'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Invoices ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'payments'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment History ({stats.paidInvoices})
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'methods'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment Methods
          </button>
        </div>

        <div className="p-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invoices..."
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
              {['all', 'paid', 'pending', 'overdue'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterStatus(filter)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                    filterStatus === filter
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All' : 
                   filter === 'paid' ? 'Paid' :
                   filter === 'pending' ? 'Pending' : 'Overdue'}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table - Shows ALL shipments */}
          {activeTab === 'invoices' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-500">{invoice.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Customer: {invoice.customer}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{invoice.shipmentId}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <TruckIcon className="w-3 h-3 mr-1" />
                            <span>{invoice.service}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            <span>{invoice.deliveryStatus}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                        <p className="text-xs text-gray-500">{invoice.weight}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-gray-900">Issued: {formatDate(invoice.issueDate)}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                            <span className={invoice.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-900'}>
                              Due: {formatDate(invoice.dueDate)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.statusColor}`}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1 capitalize">{invoice.status}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="View"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => window.print()}
                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Print"
                          >
                            <PrinterIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              const blob = new Blob([`Invoice: ${invoice.invoiceNumber}\nAmount: ${formatCurrency(invoice.amount)}\nStatus: ${invoice.status}`], {type: 'text/plain'});
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `${invoice.invoiceNumber}.txt`;
                              a.click();
                            }}
                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Download"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </button>
                          {invoice.status !== 'paid' && (
                            <button
                              onClick={() => handlePayInvoice(invoice)}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payment History - Shows ONLY paid invoices */}
          {activeTab === 'payments' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices
                    .filter(inv => inv.status === 'paid')
                    .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate))
                    .map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">PAY-{invoice.id.slice(-3)}</p>
                          <p className="text-sm text-gray-500">For {invoice.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-gray-500">Shipment: {invoice.shipmentId}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {invoice.paymentMethod.includes('Card') ? (
                              <CreditCardIcon className="w-4 h-4 text-gray-400 mr-2" />
                            ) : invoice.paymentMethod.includes('Bank') ? (
                              <BuildingOfficeIcon className="w-4 h-4 text-gray-400 mr-2" />
                            ) : (
                              <BanknotesIcon className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className="text-sm text-gray-700">{invoice.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-gray-900">
                                {formatDateTime(invoice.paidDate, invoice.paidTime)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === 'methods' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Credit Cards Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <CreditCardIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Credit & Debit Cards</h3>
                        <p className="text-sm text-gray-500">Visa, Mastercard, Verve</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {cards.map(card => (
                      <div key={card.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">•••• •••• •••• {card.last4}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500 mr-3">{card.brand}</span>
                              <span className="text-xs text-gray-500">Expires {card.expires}</span>
                              {card.isDefault && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (cards.length > 1) {
                                setCards(cards.filter(c => c.id !== card.id));
                              } else {
                                alert('Cannot remove the last payment method');
                              }
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowCardModal(true)}
                    className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-700 font-medium rounded-lg"
                  >
                    + Add New Card
                  </button>
                </div>

                {/* Bank Accounts Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <BuildingOfficeIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Bank Accounts</h3>
                        <p className="text-sm text-gray-500">Direct transfers</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {banks.map(bank => (
                      <div key={bank.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{bank.bank}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500">Account: ••••{bank.last4}</span>
                              {bank.isDefault && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{bank.accountName}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (banks.length > 1) {
                                setBanks(banks.filter(b => b.id !== bank.id));
                              } else {
                                alert('Cannot remove the last payment method');
                              }
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowBankModal(true)}
                    className="mt-4 w-full py-2.5 border-2 border-dashed border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-700 font-medium rounded-lg"
                  >
                    + Add New Bank Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Complete Payment</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Invoice: {selectedInvoice.invoiceNumber}</p>
                <p className="font-bold text-gray-900">{selectedInvoice.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-700">Amount Due:</span>
                  <span className="text-xl font-bold text-green-600">{formatCurrency(selectedInvoice.amount)}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Select Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <CreditCardIcon className="w-5 h-5 ml-3 mr-2 text-gray-400" />
                    <span className="flex-1">Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <BuildingOfficeIcon className="w-5 h-5 ml-3 mr-2 text-gray-400" />
                    <span className="flex-1">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Add New Card</h3>
                <button
                  onClick={() => setShowCardModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddCardSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      maxLength="19"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({...newCard, cardHolder: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Month
                      </label>
                      <input
                        type="text"
                        value={newCard.expiryMonth}
                        onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                        placeholder="MM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        maxLength="2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Year
                      </label>
                      <input
                        type="text"
                        value={newCard.expiryYear}
                        onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                        placeholder="YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        maxLength="2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      maxLength="3"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCardModal(false)}
                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                  >
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Add Bank Account</h3>
                <button
                  onClick={() => setShowBankModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddBankSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <select
                      value={newBank.bankName}
                      onChange={(e) => setNewBank({...newBank, bankName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Bank</option>
                      <option value="Zenith Bank">Zenith Bank</option>
                      <option value="First Bank">First Bank</option>
                      <option value="GTBank">GTBank</option>
                      <option value="Access Bank">Access Bank</option>
                      <option value="UBA">UBA</option>
                      <option value="Fidelity Bank">Fidelity Bank</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={newBank.accountNumber}
                      onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value})}
                      placeholder="0123456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={newBank.accountName}
                      onChange={(e) => setNewBank({...newBank, accountName: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      value={newBank.accountType}
                      onChange={(e) => setNewBank({...newBank, accountType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="savings">Savings Account</option>
                      <option value="current">Current Account</option>
                      <option value="business">Business Account</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBankModal(false)}
                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                  >
                    Add Bank Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesAndPayments;
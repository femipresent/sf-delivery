import React, { useState, useEffect, useMemo } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  DocumentDuplicateIcon,
  BellAlertIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

// Custom Icons
const RefreshIcon = ArrowPathIcon;
const InvoiceIcon = DocumentDuplicateIcon;

// Mock payment and billing data
const initialPayments = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-2024-001',
    shipperId: 'SHP-001',
    shipperName: 'XYZ Wholesalers',
    contactPerson: 'Sarah Johnson',
    amount: 185000,
    date: '2024-02-20',
    dueDate: '2024-03-15',
    status: 'paid',
    paymentMethod: 'bank_transfer',
    transactionId: 'TXN789456123',
    paymentDate: '2024-02-20',
    reference: 'PAY-XYZ-001',
    notes: 'Payment received via bank transfer',
    items: [
      { description: 'Shipment charges - Jan 2024', amount: 150000 },
      { description: 'Express delivery surcharge', amount: 25000 },
      { description: 'Insurance fee', amount: 10000 },
    ]
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-2024-002',
    shipperId: 'SHP-005',
    shipperName: 'Premium Clothing Boutique',
    contactPerson: 'Grace Williams',
    amount: 75000,
    date: '2024-02-19',
    dueDate: '2024-02-19',
    status: 'paid',
    paymentMethod: 'card',
    transactionId: 'TXN789456124',
    paymentDate: '2024-02-19',
    reference: 'PAY-PCB-001',
    notes: 'Automatic card payment',
    items: [
      { description: 'Shipment charges - Feb 2024', amount: 75000 },
    ]
  },
  {
    id: 'PAY-003',
    invoiceId: 'INV-2024-003',
    shipperId: 'SHP-003',
    shipperName: 'Fresh Foods Market',
    contactPerson: 'Mohammed Bello',
    amount: 125000,
    date: '2024-02-18',
    dueDate: '2024-02-18',
    status: 'paid',
    paymentMethod: 'prepaid',
    transactionId: 'PRE789456125',
    paymentDate: '2024-02-18',
    reference: 'PRE-FFM-001',
    notes: 'Prepaid account',
    items: [
      { description: 'Refrigerated shipment charges', amount: 125000 },
    ]
  },
  {
    id: 'PAY-004',
    invoiceId: 'INV-2024-004',
    shipperId: 'SHP-002',
    shipperName: 'Tech Solutions Ltd',
    contactPerson: 'Robert Chen',
    amount: 95000,
    date: '2024-02-15',
    dueDate: '2024-03-05',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    transactionId: null,
    paymentDate: null,
    reference: 'PAY-TSL-001',
    notes: 'Awaiting payment confirmation',
    items: [
      { description: 'Shipment charges - Feb 2024', amount: 95000 },
    ]
  },
  {
    id: 'PAY-005',
    invoiceId: 'INV-2024-005',
    shipperId: 'SHP-006',
    shipperName: 'MediCare Pharmaceuticals',
    contactPerson: 'Dr. Ibrahim Sani',
    amount: 250000,
    date: '2024-02-10',
    dueDate: '2024-04-05',
    status: 'overdue',
    paymentMethod: 'bank_transfer',
    transactionId: null,
    paymentDate: null,
    reference: 'PAY-MCP-001',
    notes: 'Payment overdue by 5 days',
    items: [
      { description: 'Q1 2024 shipment charges', amount: 250000 },
    ]
  },
  {
    id: 'PAY-006',
    invoiceId: 'INV-2024-006',
    shipperId: 'SHP-009',
    shipperName: 'Nigerian Agricultural Co.',
    contactPerson: 'Emeka Okafor',
    amount: 320000,
    date: '2024-02-05',
    dueDate: '2024-04-20',
    status: 'outstanding',
    paymentMethod: 'bank_transfer',
    transactionId: null,
    paymentDate: null,
    reference: 'PAY-NAC-001',
    notes: 'Net 60 terms',
    items: [
      { description: 'Bulk shipment charges', amount: 320000 },
    ]
  },
  {
    id: 'PAY-007',
    invoiceId: 'INV-2024-007',
    shipperId: 'SHP-010',
    shipperName: 'Lagos Fashion Hub',
    contactPerson: 'Fatima Sani',
    amount: 65000,
    date: '2024-02-01',
    dueDate: '2024-02-01',
    status: 'paid',
    paymentMethod: 'prepaid',
    transactionId: 'PRE789456126',
    paymentDate: '2024-02-01',
    reference: 'PRE-LFH-001',
    notes: 'Prepaid account',
    items: [
      { description: 'Express delivery charges', amount: 65000 },
    ]
  },
  {
    id: 'PAY-008',
    invoiceId: 'INV-2024-008',
    shipperId: 'SHP-004',
    shipperName: 'ABC Retail Store',
    contactPerson: 'John Doe',
    amount: 75000,
    date: '2024-01-28',
    dueDate: '2024-02-28',
    status: 'cancelled',
    paymentMethod: 'bank_transfer',
    transactionId: null,
    paymentDate: null,
    reference: 'PAY-ABC-001',
    notes: 'Invoice cancelled due to account suspension',
    items: [
      { description: 'December shipment charges', amount: 75000 },
    ]
  },
  {
    id: 'PAY-009',
    invoiceId: 'INV-2024-009',
    shipperId: 'SHP-008',
    shipperName: 'Global Electronics',
    contactPerson: 'Amina Yusuf',
    amount: 85000,
    date: '2024-01-25',
    dueDate: '2024-01-25',
    status: 'refunded',
    paymentMethod: 'card',
    transactionId: 'REF789456127',
    paymentDate: '2024-01-25',
    reference: 'REF-GLE-001',
    notes: 'Refund for cancelled shipment',
    items: [
      { description: 'Shipment charges - refund', amount: 85000 },
    ]
  },
  {
    id: 'PAY-010',
    invoiceId: 'INV-2024-010',
    shipperId: 'SHP-001',
    shipperName: 'XYZ Wholesalers',
    contactPerson: 'Sarah Johnson',
    amount: 125000,
    date: '2024-01-20',
    dueDate: '2024-02-15',
    status: 'paid',
    paymentMethod: 'bank_transfer',
    transactionId: 'TXN789456128',
    paymentDate: '2024-01-20',
    reference: 'PAY-XYZ-002',
    notes: 'December balance payment',
    items: [
      { description: 'Shipment charges - Dec 2023', amount: 125000 },
    ]
  },
];

const initialInvoices = [
  {
    id: 'INV-2024-011',
    shipperId: 'SHP-002',
    shipperName: 'Tech Solutions Ltd',
    amount: 45000,
    issueDate: '2024-02-20',
    dueDate: '2024-03-05',
    status: 'unpaid',
    description: 'Shipment charges for February',
    sentDate: '2024-02-20',
    viewed: true,
  },
  {
    id: 'INV-2024-012',
    shipperId: 'SHP-006',
    shipperName: 'MediCare Pharmaceuticals',
    amount: 150000,
    issueDate: '2024-02-19',
    dueDate: '2024-04-05',
    status: 'unpaid',
    description: 'Q1 2024 additional charges',
    sentDate: '2024-02-19',
    viewed: false,
  },
  {
    id: 'INV-2024-013',
    shipperId: 'SHP-009',
    shipperName: 'Nigerian Agricultural Co.',
    amount: 220000,
    issueDate: '2024-02-18',
    dueDate: '2024-04-20',
    status: 'unpaid',
    description: 'February bulk shipments',
    sentDate: '2024-02-18',
    viewed: true,
  },
  {
    id: 'INV-2024-014',
    shipperId: 'SHP-001',
    shipperName: 'XYZ Wholesalers',
    amount: 185000,
    issueDate: '2024-02-17',
    dueDate: '2024-03-15',
    status: 'paid',
    description: 'March shipment charges',
    sentDate: '2024-02-17',
    viewed: true,
  },
  {
    id: 'INV-2024-015',
    shipperId: 'SHP-003',
    shipperName: 'Fresh Foods Market',
    amount: 125000,
    issueDate: '2024-02-16',
    dueDate: '2024-02-16',
    status: 'paid',
    description: 'Weekly refrigerated shipments',
    sentDate: '2024-02-16',
    viewed: true,
  },
];

const PaymentBilling = () => {
  // State management
  const [payments, setPayments] = useState(initialPayments);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filteredPayments, setFilteredPayments] = useState(initialPayments);
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  // Modal states
  const [isViewPaymentModalOpen, setIsViewPaymentModalOpen] = useState(false);
  const [isViewInvoiceModalOpen, setIsViewInvoiceModalOpen] = useState(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  
  // Form states
  const [newInvoice, setNewInvoice] = useState({
    shipperId: '',
    amount: '',
    description: '',
    dueDate: '',
  });
  const [paymentRecord, setPaymentRecord] = useState({
    amount: '',
    paymentMethod: 'bank_transfer',
    transactionId: '',
    reference: '',
    notes: '',
  });

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
    const totalPayments = payments.length;
    const totalPaid = payments.filter(p => p.status === 'paid').length;
    const totalPending = payments.filter(p => p.status === 'pending').length;
    const totalOverdue = payments.filter(p => p.status === 'overdue').length;
    const totalOutstanding = payments.filter(p => p.status === 'outstanding').length;
    
    const totalRevenue = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const pendingAmount = payments
      .filter(p => p.status === 'pending' || p.status === 'outstanding')
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const overdueAmount = payments
      .filter(p => p.status === 'overdue')
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const avgPaymentTime = '2.5 days';
    const paymentSuccessRate = ((totalPaid / totalPayments) * 100).toFixed(1);
    
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(i => i.status === 'paid').length;
    const unpaidInvoices = invoices.filter(i => i.status === 'unpaid').length;
    
    return {
      totalPayments,
      totalPaid,
      totalPending,
      totalOverdue,
      totalOutstanding,
      totalRevenue,
      pendingAmount,
      overdueAmount,
      avgPaymentTime,
      paymentSuccessRate,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
    };
  }, [payments, invoices]);

  // Filter payments
  useEffect(() => {
    let result = [...payments];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(payment =>
        payment.id.toLowerCase().includes(term) ||
        payment.invoiceId.toLowerCase().includes(term) ||
        payment.shipperName.toLowerCase().includes(term) ||
        payment.contactPerson.toLowerCase().includes(term) ||
        payment.reference.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(payment => payment.status === statusFilter);
    }

    // Apply payment method filter
    if (paymentMethodFilter !== 'all') {
      result = result.filter(payment => payment.paymentMethod === paymentMethodFilter);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setDate(today.getDate());
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(today.getMonth() - 3);
          break;
      }
      
      if (dateRange !== 'all') {
        result = result.filter(payment => new Date(payment.date) >= filterDate);
      }
    }

    setFilteredPayments(result);
  }, [payments, searchTerm, statusFilter, paymentMethodFilter, dateRange]);

  // Filter invoices
  useEffect(() => {
    let result = [...invoices];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(invoice =>
        invoice.id.toLowerCase().includes(term) ||
        invoice.shipperName.toLowerCase().includes(term)
      );
    }

    // Apply status filter for invoices
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(result);
  }, [invoices, searchTerm, statusFilter]);

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      paid: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
      overdue: { color: 'bg-red-100 text-red-800 border-red-200', icon: ExclamationTriangleIcon },
      outstanding: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: ClockIcon },
      cancelled: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircleIcon },
      refunded: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: ReceiptRefundIcon },
      unpaid: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
    };
    
    const configItem = config[status] || config.pending;
    const Icon = configItem.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${configItem.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const config = {
      bank_transfer: { color: 'bg-blue-100 text-blue-800', label: 'Bank Transfer' },
      card: { color: 'bg-purple-100 text-purple-800', label: 'Card' },
      prepaid: { color: 'bg-green-100 text-green-800', label: 'Prepaid' },
      cash: { color: 'bg-yellow-100 text-yellow-800', label: 'Cash' },
      check: { color: 'bg-gray-100 text-gray-800', label: 'Check' },
    };
    
    const configItem = config[method] || { color: 'bg-gray-100 text-gray-800', label: method };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${configItem.color}`}>
        {configItem.label}
      </span>
    );
  };

  // Action handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotificationMessage('Payment data refreshed successfully', 'success');
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const exportData = filteredPayments.map(payment => ({
        ID: payment.id,
        'Invoice ID': payment.invoiceId,
        'Shipper': payment.shipperName,
        Amount: `₦${payment.amount.toLocaleString()}`,
        Date: payment.date,
        'Due Date': payment.dueDate,
        Status: payment.status,
        'Payment Method': payment.paymentMethod,
        'Transaction ID': payment.transactionId,
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', `payments-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotificationMessage('Payment data exported successfully', 'success');
    }, 1500);
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewPaymentModalOpen(true);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceModalOpen(true);
  };

  const handleRecordPayment = (payment) => {
    setSelectedPayment(payment);
    setPaymentRecord({
      amount: payment.amount.toString(),
      paymentMethod: 'bank_transfer',
      transactionId: '',
      reference: `PAY-${payment.id.slice(-3)}`,
      notes: '',
    });
    setIsRecordPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) return;
    
    const payment = parseFloat(paymentRecord.amount);
    if (isNaN(payment) || payment <= 0) {
      showNotificationMessage('Please enter a valid payment amount', 'error');
      return;
    }

    setPayments(prev => prev.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: 'paid',
            paymentDate: new Date().toISOString().split('T')[0],
            transactionId: paymentRecord.transactionId || `TXN${Date.now().toString().slice(-9)}`,
            notes: paymentRecord.notes,
          } 
        : p
    ));
    
    setIsRecordPaymentModalOpen(false);
    setSelectedPayment(null);
    setPaymentRecord({
      amount: '',
      paymentMethod: 'bank_transfer',
      transactionId: '',
      reference: '',
      notes: '',
    });
    showNotificationMessage(`Payment of ₦${payment.toLocaleString()} recorded successfully`, 'success');
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.shipperId || !newInvoice.amount || !newInvoice.dueDate) {
      showNotificationMessage('Please fill all required fields', 'error');
      return;
    }

    const invoice = {
      id: `INV-2024-${(invoices.length + 1).toString().padStart(3, '0')}`,
      shipperId: newInvoice.shipperId,
      shipperName: 'New Shipper',
      amount: parseFloat(newInvoice.amount),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      status: 'unpaid',
      description: newInvoice.description || 'Shipment charges',
      sentDate: new Date().toISOString().split('T')[0],
      viewed: false,
    };

    setInvoices(prev => [...prev, invoice]);
    setIsCreateInvoiceModalOpen(false);
    setNewInvoice({
      shipperId: '',
      amount: '',
      description: '',
      dueDate: '',
    });
    showNotificationMessage('Invoice created successfully', 'success');
  };

  const handleSendReminder = (payment) => {
    setSelectedPayment(payment);
    setIsReminderModalOpen(true);
  };

  const handleConfirmReminder = () => {
    if (!selectedPayment) return;
    
    showNotificationMessage(`Payment reminder sent to ${selectedPayment.shipperName}`, 'success');
    setIsReminderModalOpen(false);
    setSelectedPayment(null);
  };

  const handleInitiateRefund = (payment) => {
    setSelectedPayment(payment);
    setIsRefundModalOpen(true);
  };

  const handleConfirmRefund = () => {
    if (!selectedPayment) return;
    
    setPayments(prev => prev.map(p => 
      p.id === selectedPayment.id 
        ? { ...p, status: 'refunded' } 
        : p
    ));
    
    setIsRefundModalOpen(false);
    setSelectedPayment(null);
    showNotificationMessage(`Refund initiated for ${selectedPayment.shipperName}`, 'success');
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

  // Revenue card with progress - All rounded
  const RevenueCard = ({ label, value, target, progress, color = 'bg-green-500', icon: Icon }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
            <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-').replace('-500', '-600')}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progress}% collected</span>
          <span>Target: {target}</span>
        </div>
      </div>
    </div>
  );

  // Notification Component
  const Notification = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`rounded-xl shadow-lg p-4 flex items-center gap-3 ${
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

  // Payment Detail Modal
  const PaymentDetailModal = () => {
    if (!selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
              <p className="text-sm text-gray-500">{selectedPayment.id}</p>
            </div>
            <button
              onClick={() => setIsViewPaymentModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Amount</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CreditCardIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <div className="mt-1">{getPaymentMethodBadge(selectedPayment.paymentMethod)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Shipper Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Shipper Information</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <BuildingStorefrontIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedPayment.shipperName}</p>
                        <p className="text-sm text-gray-600">{selectedPayment.shipperId}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedPayment.contactPerson}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Timeline */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Invoice Issued</p>
                          <p className="text-xs text-gray-600">Invoice {selectedPayment.invoiceId}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{formatDate(selectedPayment.date)}</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <ClockIcon className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Due Date</p>
                          <p className="text-xs text-gray-600">Payment deadline</p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${new Date(selectedPayment.dueDate) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(selectedPayment.dueDate)}
                      </span>
                    </div>
                    
                    {selectedPayment.paymentDate && (
                      <>
                        <div className="flex justify-center">
                          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Payment Received</p>
                              <p className="text-xs text-gray-600">Transaction completed</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">{formatDate(selectedPayment.paymentDate)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Payment Details */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Details</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500">Reference Number</p>
                        <p className="text-sm font-medium">{selectedPayment.reference}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500">Transaction ID</p>
                        <p className="text-sm font-medium">{selectedPayment.transactionId || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Invoice Items</h5>
                      <div className="space-y-3">
                        {selectedPayment.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{item.description}</span>
                            <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">Total Amount</span>
                            <span className="font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedPayment.notes && (
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Notes</h5>
                        <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Actions */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPayment.status !== 'paid' && selectedPayment.status !== 'cancelled' && (
                      <button
                        onClick={() => {
                          setIsViewPaymentModalOpen(false);
                          handleRecordPayment(selectedPayment);
                        }}
                        className="px-4 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200 text-sm font-medium"
                      >
                        Record Payment
                      </button>
                    )}
                    
                    {selectedPayment.status === 'paid' && (
                      <button
                        onClick={() => {
                          setIsViewPaymentModalOpen(false);
                          handleInitiateRefund(selectedPayment);
                        }}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
                      >
                        Initiate Refund
                      </button>
                    )}
                    
                    {(selectedPayment.status === 'pending' || selectedPayment.status === 'overdue') && (
                      <button
                        onClick={() => {
                          setIsViewPaymentModalOpen(false);
                          handleSendReminder(selectedPayment);
                        }}
                        className="px-4 py-2.5 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-all duration-200 text-sm font-medium"
                      >
                        Send Reminder
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPayment.id);
                        showNotificationMessage('Payment ID copied to clipboard', 'info');
                      }}
                      className="px-4 py-2.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                    >
                      Copy Payment ID
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end rounded-b-2xl">
            <button
              onClick={() => setIsViewPaymentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Record Payment Modal
  const RecordPaymentModal = () => {
    if (!selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Record Payment</h3>
            <p className="text-gray-600 text-center mb-6">
              Record payment for {selectedPayment.shipperName}
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Invoice Amount</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (₦)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={paymentRecord.amount}
                  onChange={(e) => setPaymentRecord({...paymentRecord, amount: e.target.value})}
                  placeholder="Enter amount"
                  max={selectedPayment.amount}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={paymentRecord.paymentMethod}
                  onChange={(e) => setPaymentRecord({...paymentRecord, paymentMethod: e.target.value})}
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={paymentRecord.transactionId}
                  onChange={(e) => setPaymentRecord({...paymentRecord, transactionId: e.target.value})}
                  placeholder="Enter transaction ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={paymentRecord.reference}
                  onChange={(e) => setPaymentRecord({...paymentRecord, reference: e.target.value})}
                  placeholder="Enter reference number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="2"
                  value={paymentRecord.notes}
                  onChange={(e) => setPaymentRecord({...paymentRecord, notes: e.target.value})}
                  placeholder="Add any notes..."
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-center gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsRecordPaymentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPayment}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200"
            >
              Record Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Send Reminder Modal
  const SendReminderModal = () => {
    if (!selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
              <BellAlertIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Send Payment Reminder</h3>
            <p className="text-gray-600 text-center mb-6">
              Send payment reminder to {selectedPayment.shipperName}
            </p>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Outstanding Amount</span>
                  <span className="text-lg font-bold text-red-600">{formatCurrency(selectedPayment.amount)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Due Date</span>
                  <span className="text-sm font-medium">{formatDate(selectedPayment.dueDate)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                  <option value="friendly">Friendly Reminder</option>
                  <option value="urgent">Urgent Reminder</option>
                  <option value="final">Final Notice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Via</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">In-App Notification</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Message (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="3"
                  placeholder="Add a custom message..."
                  defaultValue={`Dear ${selectedPayment.contactPerson}, This is a reminder for invoice ${selectedPayment.invoiceId} due on ${formatDate(selectedPayment.dueDate)}. Amount due: ${formatCurrency(selectedPayment.amount)}.`}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-center gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsReminderModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReminder}
              className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-all duration-200"
            >
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Notification />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Payment & Billing</h1>
            <p className="text-gray-600 mt-2">Manage payments, invoices, and billing operations</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 disabled:opacity-50 hover:shadow-sm"
            >
              <RefreshIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 disabled:opacity-50 hover:shadow-sm"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </button>
            
            <button
              onClick={() => setIsCreateInvoiceModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 hover:shadow-sm"
            >
              <PlusIcon className="h-5 w-5" />
              Create Invoice
            </button>
          </div>
        </div>

        {/* Stats Dashboard - All cards rounded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Total Revenue" 
            value={formatCurrency(stats.totalRevenue).replace('NGN', '₦')}
            icon={CurrencyDollarIcon} 
            color="bg-purple-50 text-purple-600"
            change="+18.5%"
            hoverColor="hover:bg-purple-50/50"
            valueColor="text-purple-700"
          />
          <StatCard 
            label="Pending Amount" 
            value={formatCurrency(stats.pendingAmount).replace('NGN', '₦')}
            icon={ClockIcon} 
            color="bg-yellow-50 text-yellow-600"
            change="+5.3%"
            hoverColor="hover:bg-yellow-50/50"
            valueColor="text-yellow-700"
          />
          <StatCard 
            label="Overdue Amount" 
            value={formatCurrency(stats.overdueAmount).replace('NGN', '₦')}
            icon={ExclamationTriangleIcon} 
            color="bg-red-50 text-red-600"
            change="+2.1%"
            hoverColor="hover:bg-red-50/50"
            valueColor="text-red-600"
          />
          <StatCard 
            label="Payment Success Rate" 
            value={`${stats.paymentSuccessRate}%`}
            icon={CheckCircleIcon} 
            color="bg-green-50 text-green-600"
            change="+1.5%"
            hoverColor="hover:bg-green-50/50"
            valueColor="text-green-700"
          />
        </div>

        {/* Payment Status Distribution - All cards rounded */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Payments</p>
                <p className="text-lg font-bold text-green-600">{stats.totalPaid}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-lg font-bold text-yellow-600">{stats.totalPending}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-full">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Payments</p>
                <p className="text-lg font-bold text-red-600">{stats.totalOverdue}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-full">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-lg font-bold text-blue-600">{stats.totalInvoices}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <DocumentTextIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Collection Progress - All cards rounded */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <RevenueCard 
            label="Monthly Collection" 
            value={formatCurrency(1525000).replace('NGN', '₦')}
            target={formatCurrency(2000000).replace('NGN', '₦')}
            progress={76}
            color="bg-blue-500"
            icon={CurrencyDollarIcon}
          />
          
          <RevenueCard 
            label="Quarterly Collection" 
            value={formatCurrency(4850000).replace('NGN', '₦')}
            target={formatCurrency(6000000).replace('NGN', '₦')}
            progress={81}
            color="bg-green-500"
            icon={BanknotesIcon}
          />
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 hover:border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Payment Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgPaymentTime}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-full">
                <ClockIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">From invoice to payment</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by payment ID, invoice ID, shipper name, or reference..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px] bg-white transition-all duration-200 hover:border-gray-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="outstanding">Outstanding</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px] bg-white transition-all duration-200 hover:border-gray-400"
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
              >
                <option value="all">All Methods</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="card">Card</option>
                <option value="prepaid">Prepaid</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
              </select>
              
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px] bg-white transition-all duration-200 hover:border-gray-400"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="quarter">Past Quarter</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6 hover:shadow-md transition-all duration-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-2xl">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shipper & Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount & Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status & Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-2xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center rounded-b-2xl">
                    <div className="flex flex-col items-center justify-center">
                      <CreditCardIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">No payments found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                          payment.status === 'paid' ? 'bg-green-100' : 
                          payment.status === 'overdue' ? 'bg-red-100' :
                          payment.status === 'pending' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <CreditCardIcon className={`h-5 w-5 ${
                            payment.status === 'paid' ? 'text-green-600' : 
                            payment.status === 'overdue' ? 'text-red-600' :
                            payment.status === 'pending' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {payment.id}
                          </div>
                          <div className="text-sm text-gray-500">{payment.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <BuildingStorefrontIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{payment.shipperName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{payment.invoiceId}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.contactPerson}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Issued: {formatDate(payment.date)}
                        </div>
                        <div className={`text-sm ${new Date(payment.dueDate) < new Date() ? 'text-red-600' : 'text-gray-600'}`}>
                          Due: {formatDate(payment.dueDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>{getStatusBadge(payment.status)}</div>
                        <div>{getPaymentMethodBadge(payment.paymentMethod)}</div>
                        {payment.paymentDate && (
                          <div className="text-xs text-gray-500">
                            Paid: {formatDate(payment.paymentDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewPayment(payment)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        
                        {payment.status !== 'paid' && payment.status !== 'cancelled' && (
                          <button
                            onClick={() => handleRecordPayment(payment)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                            title="Record Payment"
                          >
                            <CreditCardIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {(payment.status === 'pending' || payment.status === 'overdue') && (
                          <button
                            onClick={() => handleSendReminder(payment)}
                            className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200"
                            title="Send Reminder"
                          >
                            <BellAlertIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {payment.status === 'paid' && (
                          <button
                            onClick={() => handleInitiateRefund(payment)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                            title="Initiate Refund"
                          >
                            <ReceiptRefundIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <p className="text-sm text-gray-600">Latest generated invoices</p>
          </div>
          <button
            onClick={() => setIsCreateInvoiceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 text-sm font-medium"
          >
            <PlusIcon className="h-4 w-4" />
            New Invoice
          </button>
        </div>
        
        <div className="space-y-3">
          {filteredInvoices.slice(0, 5).map((invoice) => (
            <div 
              key={invoice.id} 
              className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
              onClick={() => handleViewInvoice(invoice)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    invoice.status === 'paid' ? 'bg-green-100' : 'bg-red-100'
                  } group-hover:scale-105 transition-transform`}>
                    <InvoiceIcon className={`h-5 w-5 ${invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.shipperName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(invoice.status)}
                    <span className="text-sm text-gray-500">Due: {formatDate(invoice.dueDate)}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{invoice.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isViewPaymentModalOpen && <PaymentDetailModal />}
      {isRecordPaymentModalOpen && <RecordPaymentModal />}
      {isReminderModalOpen && <SendReminderModal />}
      {isRefundModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <ReceiptRefundIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Initiate Refund</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to initiate a refund for {selectedPayment?.shipperName}?
              </p>
              <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Refund Amount</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedPayment?.amount || 0)}</span>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsRefundModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRefund}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
                >
                  Initiate Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentBilling;
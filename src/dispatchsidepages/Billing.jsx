// BillingsPayments.jsx
import React, { useState } from 'react';
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  CalendarIcon,
  TruckIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  BellAlertIcon,
  LinkIcon,
  QrCodeIcon,
  // BanknoteIcon removed - doesn't exist in Heroicons
  // ReceiptRefundIcon removed - doesn't exist in Heroicons
  // ClipboardDocumentCheckIcon removed - doesn't exist in Heroicons
} from '@heroicons/react/24/outline';

const Billing = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('all');
  
  // Modal states
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Form states
  const [newInvoice, setNewInvoice] = useState({
    customerId: '',
    customerName: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    taxRate: 7.5,
    discount: 0,
    notes: '',
    paymentTerms: 'net30'
  });
  
  const [newPayment, setNewPayment] = useState({
    invoiceId: '',
    customerId: '',
    paymentMethod: 'bank-transfer',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    referenceNumber: '',
    notes: ''
  });

  // Filters state
  const [filters, setFilters] = useState({
    customer: 'all',
    amountRange: 'all',
    paymentMethod: 'all'
  });

  // Mock data for invoices
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      customerId: 'CUST-001',
      customerName: 'ABC Manufacturing Ltd',
      customerEmail: 'john@abcmanufacturing.com',
      customerPhone: '+234 801 234 5678',
      customerAddress: '123 Industrial Estate, Ikeja, Lagos',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-14',
      amount: 450000,
      tax: 33750,
      discount: 0,
      totalAmount: 483750,
      paidAmount: 483750,
      balance: 0,
      status: 'paid',
      paymentMethod: 'bank-transfer',
      paymentDate: '2024-01-20',
      items: [
        { description: 'Freight Services - Lagos to Abuja', quantity: 1, rate: 300000, amount: 300000 },
        { description: 'Express Delivery Fee', quantity: 1, rate: 100000, amount: 100000 },
        { description: 'Insurance Coverage', quantity: 1, rate: 50000, amount: 50000 }
      ],
      notes: 'Priority shipment for manufacturing equipment',
      createdBy: 'Admin User',
      createdAt: '2024-01-15T10:30:00'
    },
    {
      id: 'INV-2024-002',
      customerId: 'CUST-003',
      customerName: 'Oil & Gas Solutions',
      customerEmail: 'johnson@oilgas.com',
      customerPhone: '+234 803 456 7890',
      customerAddress: '789 Oil Field Road, Port Harcourt',
      invoiceDate: '2024-01-18',
      dueDate: '2024-02-17',
      amount: 1250000,
      tax: 93750,
      discount: 50000,
      totalAmount: 1293750,
      paidAmount: 800000,
      balance: 493750,
      status: 'partial',
      paymentMethod: 'bank-transfer',
      paymentDate: '2024-01-25',
      items: [
        { description: 'Heavy Machinery Transport', quantity: 2, rate: 500000, amount: 1000000 },
        { description: 'Special Handling Fee', quantity: 1, rate: 250000, amount: 250000 }
      ],
      notes: 'High-value equipment transport',
      createdBy: 'Admin User',
      createdAt: '2024-01-18T14:20:00'
    },
    {
      id: 'INV-2024-003',
      customerId: 'CUST-004',
      customerName: 'Tech Solutions Ltd',
      customerEmail: 'it@techsolutions.com',
      customerPhone: '+234 804 567 8901',
      customerAddress: '321 Tech Park, Victoria Island, Lagos',
      invoiceDate: '2024-01-20',
      dueDate: '2024-02-19',
      amount: 320000,
      tax: 24000,
      discount: 0,
      totalAmount: 344000,
      paidAmount: 0,
      balance: 344000,
      status: 'overdue',
      paymentMethod: null,
      paymentDate: null,
      items: [
        { description: 'IT Equipment Delivery', quantity: 4, rate: 80000, amount: 320000 }
      ],
      notes: 'Urgent delivery of servers',
      createdBy: 'Admin User',
      createdAt: '2024-01-20T09:15:00'
    },
    {
      id: 'INV-2024-004',
      customerId: 'CUST-002',
      customerName: 'Global Logistics Ltd',
      customerEmail: 'williams@globallogistics.com',
      customerPhone: '+234 802 345 6789',
      customerAddress: '456 Central Business District, Abuja',
      invoiceDate: '2024-01-22',
      dueDate: '2024-02-21',
      amount: 285000,
      tax: 21375,
      discount: 15000,
      totalAmount: 291375,
      paidAmount: 291375,
      balance: 0,
      status: 'paid',
      paymentMethod: 'card',
      paymentDate: '2024-01-25',
      items: [
        { description: 'Interstate Freight Services', quantity: 3, rate: 95000, amount: 285000 }
      ],
      notes: 'Regular monthly shipment',
      createdBy: 'Admin User',
      createdAt: '2024-01-22T11:45:00'
    },
    {
      id: 'INV-2024-005',
      customerId: 'CUST-005',
      customerName: 'Agricultural Supplies Co.',
      customerEmail: 'manager@agsupplies.com',
      customerPhone: '+234 805 678 9012',
      customerAddress: 'Farm Depot, Kano State',
      invoiceDate: '2024-01-25',
      dueDate: '2024-02-24',
      amount: 180000,
      tax: 13500,
      discount: 0,
      totalAmount: 193500,
      paidAmount: 0,
      balance: 193500,
      status: 'pending',
      paymentMethod: null,
      paymentDate: null,
      items: [
        { description: 'Farm Produce Transport', quantity: 2, rate: 90000, amount: 180000 }
      ],
      notes: 'Agricultural products to Kano',
      createdBy: 'Admin User',
      createdAt: '2024-01-25T13:30:00'
    }
  ]);

  // Mock data for payments with transaction details
  const [payments, setPayments] = useState([
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-001',
      customerId: 'CUST-001',
      customerName: 'ABC Manufacturing Ltd',
      paymentDate: '2024-01-20',
      amount: 483750,
      paymentMethod: 'bank-transfer',
      referenceNumber: 'TRX-00123456',
      bankName: 'First Bank Nigeria',
      accountNumber: '1234567890',
      accountName: 'ABC Manufacturing Ltd',
      transactionId: 'TXN-78901234',
      status: 'completed',
      confirmedBy: 'Admin User',
      confirmationDate: '2024-01-20T15:30:00',
      notes: 'Full payment received via bank transfer',
      paymentDetails: {
        bankFee: 1000,
        netAmount: 482750,
        currency: 'NGN',
        exchangeRate: 1
      }
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-002',
      customerId: 'CUST-003',
      customerName: 'Oil & Gas Solutions',
      paymentDate: '2024-01-25',
      amount: 800000,
      paymentMethod: 'bank-transfer',
      referenceNumber: 'TRX-00123457',
      bankName: 'Guaranty Trust Bank',
      accountNumber: '0987654321',
      accountName: 'Oil & Gas Solutions',
      transactionId: 'TXN-78901235',
      status: 'completed',
      confirmedBy: 'Admin User',
      confirmationDate: '2024-01-25T11:20:00',
      notes: 'Partial payment - balance pending',
      paymentDetails: {
        bankFee: 1500,
        netAmount: 798500,
        currency: 'NGN',
        exchangeRate: 1
      }
    },
    {
      id: 'PAY-2024-003',
      invoiceId: 'INV-2024-004',
      customerId: 'CUST-002',
      customerName: 'Global Logistics Ltd',
      paymentDate: '2024-01-25',
      amount: 291375,
      paymentMethod: 'card',
      referenceNumber: 'CARD-789012',
      cardType: 'Visa',
      lastFourDigits: '1234',
      authorizationCode: 'AUTH-5678',
      status: 'completed',
      confirmedBy: 'System',
      confirmationDate: '2024-01-25T16:45:00',
      notes: 'Credit card payment processed automatically',
      paymentDetails: {
        processingFee: 4360,
        netAmount: 287015,
        currency: 'NGN',
        exchangeRate: 1
      }
    },
    {
      id: 'PAY-2024-004',
      invoiceId: 'INV-2024-001',
      customerId: 'CUST-001',
      customerName: 'ABC Manufacturing Ltd',
      paymentDate: '2024-01-30',
      amount: 250000,
      paymentMethod: 'cash',
      referenceNumber: 'CASH-001',
      receivedBy: 'Cashier 1',
      receiptNumber: 'RC-789012',
      status: 'completed',
      confirmedBy: 'Admin User',
      confirmationDate: '2024-01-30T10:15:00',
      notes: 'Cash payment received at office',
      paymentDetails: {
        processingFee: 0,
        netAmount: 250000,
        currency: 'NGN',
        exchangeRate: 1
      }
    },
    {
      id: 'PAY-2024-005',
      invoiceId: 'INV-2024-002',
      customerId: 'CUST-003',
      customerName: 'Oil & Gas Solutions',
      paymentDate: '2024-02-01',
      amount: 200000,
      paymentMethod: 'mobile-money',
      referenceNumber: 'MM-789012',
      provider: 'MTN Mobile Money',
      senderNumber: '08031234567',
      receiverNumber: '08039876543',
      status: 'completed',
      confirmedBy: 'System',
      confirmationDate: '2024-02-01T14:30:00',
      notes: 'Mobile money transfer',
      paymentDetails: {
        processingFee: 100,
        netAmount: 199900,
        currency: 'NGN',
        exchangeRate: 1
      }
    }
  ]);

  // Mock data for customers (for dropdowns)
  const customers = [
    { id: 'CUST-001', name: 'ABC Manufacturing Ltd' },
    { id: 'CUST-002', name: 'Global Logistics Ltd' },
    { id: 'CUST-003', name: 'Oil & Gas Solutions' },
    { id: 'CUST-004', name: 'Tech Solutions Ltd' },
    { id: 'CUST-005', name: 'Agricultural Supplies Co.' },
    { id: 'CUST-006', name: 'Medical Supplies Inc.' },
    { id: 'CUST-007', name: 'Real Estate Developers' },
    { id: 'CUST-008', name: 'Retail Chain Stores' }
  ];

  // Constants
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'overdue', label: 'Overdue', color: 'red' },
    { value: 'partial', label: 'Partial', color: 'blue' }
  ];

  const paymentMethods = [
    { value: 'bank-transfer', label: 'Bank Transfer', icon: BanknotesIcon },
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon },
    { value: 'cash', label: 'Cash', icon: CurrencyDollarIcon },
    { value: 'mobile-money', label: 'Mobile Money', icon: PhoneIcon },
    { value: 'check', label: 'Check', icon: DocumentTextIcon }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'all-time', label: 'All Time' }
  ];

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method) => {
    switch(method) {
      case 'bank-transfer': return 'bg-blue-100 text-blue-800';
      case 'card': return 'bg-purple-100 text-purple-800';
      case 'cash': return 'bg-green-100 text-green-800';
      case 'mobile-money': return 'bg-yellow-100 text-yellow-800';
      case 'check': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method) => {
    const methodConfig = paymentMethods.find(m => m.value === method);
    return methodConfig ? methodConfig.icon : BanknotesIcon;
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalInvoices = invoices.length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const outstanding = invoices.reduce((sum, inv) => sum + inv.balance, 0);
    
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
    const partialInvoices = invoices.filter(inv => inv.status === 'partial').length;
    
    const totalPayments = payments.length;
    const paymentsThisMonth = payments.filter(p => {
      const paymentDate = new Date(p.paymentDate);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && 
             paymentDate.getFullYear() === now.getFullYear();
    }).length;

    const totalPaymentAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    return {
      totalInvoices,
      totalRevenue,
      totalPaid,
      outstanding,
      paidInvoices,
      pendingInvoices,
      overdueInvoices,
      partialInvoices,
      totalPayments,
      paymentsThisMonth,
      totalPaymentAmount
    };
  };

  const stats = calculateStats();

  // Filter and sort invoices
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!invoice.id.toLowerCase().includes(searchLower) &&
          !invoice.customerName.toLowerCase().includes(searchLower) &&
          !invoice.customerEmail.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Status filter
    if (filterStatus !== 'all' && invoice.status !== filterStatus) {
      return false;
    }

    // Active tab filter
    if (activeTab === 'paid' && invoice.status !== 'paid') return false;
    if (activeTab === 'pending' && invoice.status !== 'pending') return false;
    if (activeTab === 'overdue' && invoice.status !== 'overdue') return false;
    if (activeTab === 'partial' && invoice.status !== 'partial') return false;

    // Advanced filters
    if (filters.customer !== 'all' && invoice.customerId !== filters.customer) return false;
    
    if (filters.amountRange !== 'all') {
      const amount = invoice.totalAmount;
      switch(filters.amountRange) {
        case 'low': if (amount > 100000) return false; break;
        case 'medium': if (amount <= 100000 || amount > 500000) return false; break;
        case 'high': if (amount <= 500000) return false; break;
      }
    }

    return true;
  });

  // Sort invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    switch(sortBy) {
      case 'date':
        return multiplier * (new Date(b.invoiceDate) - new Date(a.invoiceDate));
      case 'amount':
        return multiplier * (b.totalAmount - a.totalAmount);
      case 'dueDate':
        return multiplier * (new Date(b.dueDate) - new Date(a.dueDate));
      case 'customer':
        return multiplier * a.customerName.localeCompare(b.customerName);
      default:
        return 0;
    }
  });

  // Filter and sort payments
  const filteredPayments = payments.filter(payment => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!payment.id.toLowerCase().includes(searchLower) &&
          !payment.customerName.toLowerCase().includes(searchLower) &&
          !payment.referenceNumber.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.paymentMethod !== 'all' && payment.paymentMethod !== filters.paymentMethod) return false;
    
    return true;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    return new Date(b.paymentDate) - new Date(a.paymentDate);
  });

  // Pagination
  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = sortedInvoices.slice(startIndex, endIndex);

  // Functions for invoice items
  const addInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const updateInvoiceItem = (index, field, value) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Calculate amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : updatedItems[index].quantity;
      const rate = field === 'rate' ? parseFloat(value) || 0 : updatedItems[index].rate;
      updatedItems[index].amount = quantity * rate;
    }
    
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const removeInvoiceItem = (index) => {
    const updatedItems = newInvoice.items.filter((_, i) => i !== index);
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const calculateInvoiceTotal = () => {
    const subtotal = newInvoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const tax = (subtotal * newInvoice.taxRate) / 100;
    const discount = parseFloat(newInvoice.discount) || 0;
    return subtotal + tax - discount;
  };

  // Handle creating new invoice
  const handleCreateInvoice = () => {
    if (!newInvoice.customerId) {
      alert('Please select a customer');
      return;
    }

    setLoading(true);
    
    const customer = customers.find(c => c.id === newInvoice.customerId);
    const subtotal = newInvoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const tax = (subtotal * newInvoice.taxRate) / 100;
    const discount = parseFloat(newInvoice.discount) || 0;
    const totalAmount = subtotal + tax - discount;

    const newInvoiceObj = {
      id: `INV-2024-${String(invoices.length + 1001).padStart(3, '0')}`,
      customerId: newInvoice.customerId,
      customerName: customer.name,
      customerEmail: '',
      customerPhone: '',
      invoiceDate: newInvoice.invoiceDate,
      dueDate: newInvoice.dueDate,
      amount: subtotal,
      tax: tax,
      discount: discount,
      totalAmount: totalAmount,
      paidAmount: 0,
      balance: totalAmount,
      status: 'pending',
      paymentMethod: null,
      paymentDate: null,
      items: newInvoice.items,
      notes: newInvoice.notes,
      createdBy: 'Current User',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setInvoices(prev => [newInvoiceObj, ...prev]);
      setNewInvoice({
        customerId: '',
        customerName: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
        taxRate: 7.5,
        discount: 0,
        notes: '',
        paymentTerms: 'net30'
      });
      setShowCreateInvoice(false);
      setLoading(false);
    }, 1000);
  };

  // Handle recording payment
  const handleRecordPayment = () => {
    if (!newPayment.invoiceId || !newPayment.amount) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);

    const invoice = invoices.find(inv => inv.id === newPayment.invoiceId);
    const paymentAmount = parseFloat(newPayment.amount);

    const newPaymentObj = {
      id: `PAY-2024-${String(payments.length + 1001).padStart(3, '0')}`,
      invoiceId: newPayment.invoiceId,
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      paymentDate: newPayment.paymentDate,
      amount: paymentAmount,
      paymentMethod: newPayment.paymentMethod,
      referenceNumber: newPayment.referenceNumber || `TRX-${Date.now()}`,
      status: 'completed',
      confirmedBy: 'Current User',
      confirmationDate: new Date().toISOString(),
      notes: newPayment.notes,
      paymentDetails: {
        processingFee: newPayment.paymentMethod === 'card' ? paymentAmount * 0.015 : 0,
        netAmount: newPayment.paymentMethod === 'card' ? paymentAmount * 0.985 : paymentAmount,
        currency: 'NGN',
        exchangeRate: 1
      }
    };

    // Update invoice payment status
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === newPayment.invoiceId) {
        const newPaidAmount = inv.paidAmount + paymentAmount;
        const newBalance = inv.totalAmount - newPaidAmount;
        let newStatus = inv.status;
        
        if (newBalance <= 0) {
          newStatus = 'paid';
        } else if (newPaidAmount > 0) {
          newStatus = 'partial';
        }

        return {
          ...inv,
          paidAmount: newPaidAmount,
          balance: newBalance,
          status: newStatus,
          paymentMethod: newPayment.paymentMethod,
          paymentDate: newPayment.paymentDate
        };
      }
      return inv;
    });

    setTimeout(() => {
      setPayments(prev => [newPaymentObj, ...prev]);
      setInvoices(updatedInvoices);
      setNewPayment({
        invoiceId: '',
        customerId: '',
        paymentMethod: 'bank-transfer',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        referenceNumber: '',
        notes: ''
      });
      setShowRecordPayment(false);
      setLoading(false);
    }, 1000);
  };

  // Handle selection
  const toggleSelection = (invoiceId) => {
    setSelectedItems(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const selectAllOnPage = () => {
    const currentPageIds = currentInvoices.map(inv => inv.id);
    
    if (selectedItems.length === currentPageIds.length) {
      setSelectedItems(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Handle sending invoice
  const handleSendInvoice = (invoiceId) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    alert(`Invoice ${invoiceId} sent to ${invoice.customerEmail || invoice.customerName}`);
  };

  // Handle download invoice
  const handleDownloadInvoice = (invoiceId) => {
    alert(`Downloading invoice ${invoiceId}...`);
  };

  // Handle reminder
  const handleSendReminder = (invoiceId) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    alert(`Payment reminder sent for invoice ${invoiceId} to ${invoice.customerName}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterType('all');
    setDateRange('this-month');
    setFilters({
      customer: 'all',
      amountRange: 'all',
      paymentMethod: 'all'
    });
  };

  // Export functions
  const handleExportInvoices = () => {
    alert('Exporting invoices data to CSV...');
  };

  const handleExportPayments = () => {
    alert('Exporting payments data to CSV...');
  };

  // Get overdue invoices
  const getOverdueInvoices = () => {
    const today = new Date();
    return invoices.filter(inv => {
      if (inv.status === 'paid') return false;
      const dueDate = new Date(inv.dueDate);
      return dueDate < today;
    });
  };

  // View transaction details
  const handleViewTransactionDetails = (payment) => {
    setSelectedTransaction(payment);
    setShowTransactionDetails(true);
  };

  // Component: Create Invoice Modal
  const CreateInvoiceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const invoiceTotal = calculateInvoiceTotal();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Create New Invoice</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in invoice details</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Customer Selection */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Select Customer *
                    </label>
                    <select
                      value={newInvoice.customerId}
                      onChange={(e) => {
                        const customer = customers.find(c => c.id === e.target.value);
                        setNewInvoice({
                          ...newInvoice,
                          customerId: e.target.value,
                          customerName: customer ? customer.name : ''
                        });
                      }}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} ({customer.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                  Invoice Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Invoice Date *
                    </label>
                    <input
                      type="date"
                      value={newInvoice.invoiceDate}
                      onChange={(e) => setNewInvoice({...newInvoice, invoiceDate: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Payment Terms
                    </label>
                    <select
                      value={newInvoice.paymentTerms}
                      onChange={(e) => setNewInvoice({...newInvoice, paymentTerms: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="prepaid">Prepaid</option>
                      <option value="net7">Net 7</option>
                      <option value="net15">Net 15</option>
                      <option value="net30">Net 30</option>
                      <option value="net45">Net 45</option>
                      <option value="net60">Net 60</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-medium text-gray-900 flex items-center text-sm sm:text-base mb-2 sm:mb-0">
                    <ReceiptPercentIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                    Invoice Items
                  </h3>
                  <button
                    onClick={addInvoiceItem}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center self-start sm:self-auto"
                  >
                    <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-3 overflow-x-auto">
                  <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-3 text-xs text-gray-500 font-medium mb-2">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-3">Rate (₦)</div>
                    <div className="col-span-1">Amount</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {newInvoice.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-lg">
                      <div className="col-span-1 sm:col-span-5">
                        <label className="block text-xs text-gray-500 mb-1 sm:hidden">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                          placeholder="Item description"
                          className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1 sm:hidden">Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(index, 'quantity', e.target.value)}
                          min="1"
                          className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-3">
                        <label className="block text-xs text-gray-500 mb-1 sm:hidden">Rate (₦)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateInvoiceItem(index, 'rate', e.target.value)}
                          placeholder="Rate"
                          className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-1 text-xs sm:text-sm font-medium">
                        <label className="block text-xs text-gray-500 mb-1 sm:hidden">Amount</label>
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="col-span-1 sm:col-span-1">
                        {newInvoice.items.length > 1 && (
                          <button
                            onClick={() => removeInvoiceItem(index)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      value={newInvoice.taxRate}
                      onChange={(e) => setNewInvoice({...newInvoice, taxRate: parseFloat(e.target.value) || 0})}
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Discount (₦)
                    </label>
                    <input
                      type="number"
                      value={newInvoice.discount}
                      onChange={(e) => setNewInvoice({...newInvoice, discount: parseFloat(e.target.value) || 0})}
                      className="w-full p-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-600">Subtotal:</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {formatCurrency(newInvoice.items.reduce((sum, item) => sum + (item.amount || 0), 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-600">Tax ({newInvoice.taxRate}%):</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {formatCurrency((newInvoice.items.reduce((sum, item) => sum + (item.amount || 0), 0) * newInvoice.taxRate) / 100)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-600">Discount:</span>
                    <span className="text-xs sm:text-sm font-medium text-red-600">
                      -{formatCurrency(parseFloat(newInvoice.discount) || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {formatCurrency(invoiceTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                  rows="3"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Additional notes for this invoice..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                disabled={loading}
                className="flex-1 px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Create Invoice
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Record Payment Modal
  const RecordPaymentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const pendingInvoices = invoices.filter(inv => inv.status !== 'paid');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Record Payment</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Record a new payment received</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Invoice Selection */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                  Invoice Details
                </h3>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Select Invoice *
                  </label>
                  <select
                    value={newPayment.invoiceId}
                    onChange={(e) => {
                      const selectedInvoice = invoices.find(inv => inv.id === e.target.value);
                      if (selectedInvoice) {
                        setNewPayment({
                          ...newPayment,
                          invoiceId: e.target.value,
                          customerId: selectedInvoice.customerId,
                          amount: selectedInvoice.balance.toString()
                        });
                      }
                    }}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select an invoice</option>
                    {pendingInvoices.map(invoice => (
                      <option key={invoice.id} value={invoice.id}>
                        {invoice.id} - {invoice.customerName} (Balance: {formatCurrency(invoice.balance)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <CurrencyDollarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Payment Date *
                    </label>
                    <input
                      type="date"
                      value={newPayment.paymentDate}
                      onChange={(e) => setNewPayment({...newPayment, paymentDate: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Amount (₦) *
                    </label>
                    <input
                      type="number"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {paymentMethods.map(method => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setNewPayment({...newPayment, paymentMethod: method.value})}
                          className={`p-2 sm:p-3 border rounded-lg text-xs sm:text-sm flex flex-col items-center justify-center transition-colors ${
                            newPayment.paymentMethod === method.value
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <method.icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                          <span className="text-center">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Reference Number
                    </label>
                    <input
                      type="text"
                      value={newPayment.referenceNumber}
                      onChange={(e) => setNewPayment({...newPayment, referenceNumber: e.target.value})}
                      placeholder="TRX-00123456 or Check #"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                  rows="3"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Payment notes..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordPayment}
                disabled={loading}
                className="flex-1 px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Record Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Invoice Details Modal
  const InvoiceDetailsModal = ({ invoice, isOpen, onClose }) => {
    if (!isOpen || !invoice) return null;

    const PaymentMethodIcon = getPaymentMethodIcon(invoice.paymentMethod);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{invoice.id}</h2>
                <div className="flex flex-wrap items-center mt-2 gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">Issued: {formatDate(invoice.invoiceDate)}</span>
                  <span className="text-xs sm:text-sm text-gray-500">Due: {formatDate(invoice.dueDate)}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors self-end sm:self-auto"
              >
                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-4 sm:space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Customer Name</p>
                      <p className="text-sm font-medium text-gray-900">{invoice.customerName}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Customer ID</p>
                        <p className="text-sm font-medium text-gray-900">{invoice.customerId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{invoice.customerPhone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{invoice.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-900">{invoice.customerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Items */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Invoice Items</h3>
                  <div className="space-y-3 overflow-x-auto">
                    <div className="min-w-full">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-3 bg-white rounded-lg border mb-2">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-sm font-medium text-gray-900">{item.description}</p>
                            <p className="text-xs text-gray-500">Quantity: {item.quantity} × {formatCurrency(item.rate)}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {invoice.notes && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Notes</h3>
                    <p className="text-sm text-gray-700">{invoice.notes}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Invoice Summary */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Invoice Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Subtotal</span>
                      <span className="text-xs sm:text-sm font-medium">{formatCurrency(invoice.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Tax</span>
                      <span className="text-xs sm:text-sm font-medium">{formatCurrency(invoice.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Discount</span>
                      <span className="text-xs sm:text-sm font-medium text-red-600">-{formatCurrency(invoice.discount)}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm sm:text-lg font-bold text-gray-900">Total Amount</span>
                        <span className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Payment Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Amount Paid</p>
                        <p className="text-base sm:text-lg font-bold text-green-600">{formatCurrency(invoice.paidAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Balance Due</p>
                        <p className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(invoice.balance)}</p>
                      </div>
                    </div>
                    
                    {invoice.paymentMethod && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Payment Method</p>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentMethodColor(invoice.paymentMethod)} flex items-center`}>
                              <PaymentMethodIcon className="w-3 h-3 mr-1" />
                              {paymentMethods.find(m => m.value === invoice.paymentMethod)?.label}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment Date</p>
                          <p className="text-xs sm:text-sm font-medium">{formatDate(invoice.paymentDate)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleSendInvoice(invoice.id)}
                    className="w-full px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center text-sm"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Invoice
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="w-full px-4 py-2 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 flex items-center justify-center text-sm"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Download PDF
                  </button>
                  {invoice.status !== 'paid' && (
                    <button
                      onClick={() => {
                        setShowRecordPayment(true);
                        setNewPayment({
                          ...newPayment,
                          invoiceId: invoice.id,
                          customerId: invoice.customerId,
                          amount: invoice.balance.toString()
                        });
                        onClose();
                      }}
                      className="w-full px-4 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center text-sm"
                    >
                      <CurrencyDollarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Record Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Transaction Details Modal
  const TransactionDetailsModal = ({ transaction, isOpen, onClose }) => {
    if (!isOpen || !transaction) return null;

    const PaymentMethodIcon = getPaymentMethodIcon(transaction.paymentMethod);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Transaction Details</h2>
                <div className="flex flex-wrap items-center mt-2 gap-2">
                  <span className="text-xs sm:text-sm text-gray-500">{transaction.id}</span>
                  <span className="text-xs sm:text-sm text-gray-500">•</span>
                  <span className="text-xs sm:text-sm text-gray-500">{formatDate(transaction.paymentDate)}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors self-end sm:self-auto"
              >
                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[70vh] p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-4 sm:space-y-6">
                {/* Transaction Summary */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <CurrencyDollarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                    Transaction Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment ID</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Invoice ID</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.invoiceId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(transaction.paymentDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Confirmed Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDateTime(transaction.confirmationDate)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment Method</p>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentMethodColor(transaction.paymentMethod)} flex items-center`}>
                            <PaymentMethodIcon className="w-3 h-3 mr-1" />
                            {paymentMethods.find(m => m.value === transaction.paymentMethod)?.label}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Reference Number</p>
                        <p className="text-sm font-medium text-gray-900 font-mono">{transaction.referenceNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Payment Details</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Gross Amount</p>
                          <p className="text-xl font-bold text-gray-900">{formatCurrency(transaction.amount)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Net Amount</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(transaction.paymentDetails?.netAmount || transaction.amount)}
                          </p>
                        </div>
                      </div>
                      
                      {transaction.paymentDetails && (
                        <div className="border-t pt-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-600">Processing Fee</span>
                              <span className="text-xs font-medium text-red-600">
                                -{formatCurrency(transaction.paymentDetails.processingFee || 0)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-600">Currency</span>
                              <span className="text-xs font-medium">{transaction.paymentDetails.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-600">Exchange Rate</span>
                              <span className="text-xs font-medium">{transaction.paymentDetails.exchangeRate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Method Specific Details */}
                {transaction.paymentMethod === 'bank-transfer' && transaction.bankName && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Bank Transfer Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Bank Name</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.bankName}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Account Number</p>
                          <p className="text-sm font-medium text-gray-900 font-mono">{transaction.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Account Name</p>
                          <p className="text-sm font-medium text-gray-900">{transaction.accountName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {transaction.paymentMethod === 'card' && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Card Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Card Type</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.cardType}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Last 4 Digits</p>
                          <p className="text-sm font-medium text-gray-900 font-mono">**** {transaction.lastFourDigits}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Authorization Code</p>
                          <p className="text-sm font-medium text-gray-900 font-mono">{transaction.authorizationCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {transaction.paymentMethod === 'mobile-money' && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Mobile Money Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Provider</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.provider}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Sender Number</p>
                          <p className="text-sm font-medium text-gray-900">{transaction.senderNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Receiver Number</p>
                          <p className="text-sm font-medium text-gray-900">{transaction.receiverNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {transaction.paymentMethod === 'cash' && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Cash Payment Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Received By</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.receivedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Receipt Number</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.receiptNumber}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Customer Name</p>
                      <p className="text-sm font-medium text-gray-900">{transaction.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer ID</p>
                      <p className="text-sm font-medium text-gray-900">{transaction.customerId}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Confirmation */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Status & Confirmation</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Transaction Status</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-green-700">Completed</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Confirmed By</p>
                      <p className="text-sm font-medium text-gray-900">{transaction.confirmedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Confirmation Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDateTime(transaction.confirmationDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {transaction.notes && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Notes</h3>
                    <p className="text-sm text-gray-700">{transaction.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => alert(`Download receipt for ${transaction.id}`)}
                    className="w-full px-4 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 flex items-center justify-center text-sm"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(transaction.id);
                      alert('Transaction ID copied to clipboard!');
                    }}
                    className="w-full px-4 py-2 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 flex items-center justify-center text-sm"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Copy Transaction ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Filters Panel
  const FiltersPanel = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 mb-4 sm:mb-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Customer</label>
          <select
            value={filters.customer}
            onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Customers</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount Range</label>
          <select
            value={filters.amountRange}
            onChange={(e) => setFilters({ ...filters, amountRange: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Amounts</option>
            <option value="low">Low (Under ₦100,000)</option>
            <option value="medium">Medium (₦100,000 - ₦500,000)</option>
            <option value="high">High (Over ₦500,000)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            {paymentMethods.map(method => (
              <option key={method.value} value={method.value}>{method.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={handleClearFilters}
          className="px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors duration-200"
        >
          Clear All Filters
        </button>
        <button
          onClick={() => setShowFilters(false)}
          className="px-3 py-1.5 text-xs sm:text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="mb-2 sm:mb-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Billings & Payments</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage invoices, payments, and billing operations</p>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 md:gap-3">
            <button 
              onClick={() => setShowCreateInvoice(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">New Invoice</span>
              <span className="xs:hidden">Invoice</span>
            </button>
            <button 
              onClick={() => setShowRecordPayment(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <CurrencyDollarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">Record Payment</span>
              <span className="xs:hidden">Payment</span>
            </button>
            <button 
              onClick={handleExportInvoices}
              className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Revenue</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full">
              <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="mx-1">•</span>
            <span>from last month</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Outstanding</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{formatCurrency(stats.outstanding)}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-full">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>{stats.overdueInvoices} overdue invoices</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Paid This Month</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{formatCurrency(stats.totalPaymentAmount)}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-full">
              <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>{stats.paymentsThisMonth} payments received</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Invoices</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stats.totalInvoices}</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-full">
              <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>{stats.paidInvoices} paid • {stats.pendingInvoices} pending</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Alerts */}
      {getOverdueInvoices().length > 0 && (
        <div className="mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-2 md:mb-0">
                <ExclamationTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Overdue Payments Alert</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    You have {getOverdueInvoices().length} overdue invoices totaling {formatCurrency(getOverdueInvoices().reduce((sum, inv) => sum + inv.balance, 0))}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button
                  onClick={() => {
                    const overdue = getOverdueInvoices();
                    if (overdue.length > 0) {
                      overdue.forEach(inv => handleSendReminder(inv.id));
                      alert(`Reminders sent for ${overdue.length} overdue invoices`);
                    }
                  }}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 flex items-center"
                >
                  <BellAlertIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Send Reminders</span>
                  <span className="sm:hidden">Remind</span>
                </button>
                <button
                  onClick={() => setShowFilters(true)}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Invoices
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'paid' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Paid ({stats.paidInvoices})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending ({stats.pendingInvoices})
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'overdue' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Overdue ({stats.overdueInvoices})
        </button>
        <button
          onClick={() => setActiveTab('partial')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'partial' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Partial ({stats.partialInvoices})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'payments' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Payments ({stats.totalPayments})
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoices by ID, customer, or amount..."
                className="w-full pl-8 pr-3 py-1.5 sm:pl-9 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-24 sm:w-auto"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-1.5 sm:p-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-24 sm:w-auto"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 sm:p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                <ChevronUpDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              </button>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 sm:p-2 border rounded-full transition-colors duration-200 ${
                showFilters ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-500'
              }`}
              title="Advanced Filters"
            >
              <FunnelIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            
            {selectedItems.length > 0 && (
              <button
                onClick={() => alert(`${selectedItems.length} invoices selected`)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
              >
                <span className="hidden sm:inline">Selected ({selectedItems.length})</span>
                <span className="sm:hidden">({selectedItems.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <FiltersPanel />

      {/* Invoices Table (Main View) */}
      {activeTab !== 'payments' ? (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input
                      type="checkbox"
                      checked={currentInvoices.every(inv => selectedItems.includes(inv.id)) && currentInvoices.length > 0}
                      onChange={selectAllOnPage}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">
                    Invoice
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[140px]">
                    Customer
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell min-w-[100px]">
                    Dates
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Amount
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInvoices.length > 0 ? (
                  currentInvoices.map((invoice) => (
                    <tr 
                      key={invoice.id} 
                      className={`hover:bg-gray-50 transition-colors duration-150 ${selectedItems.includes(invoice.id) ? 'bg-red-50' : ''}`}
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(invoice.id)}
                          onChange={() => toggleSelection(invoice.id)}
                          className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                        />
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-xs text-gray-500">{formatDate(invoice.invoiceDate)}</div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">{invoice.customerName}</div>
                        <div className="text-xs text-gray-500">{invoice.customerId}</div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 hidden sm:table-cell">
                        <div className="text-xs sm:text-sm text-gray-900">Due: {formatDate(invoice.dueDate)}</div>
                        {invoice.paymentDate && (
                          <div className="text-xs text-gray-500">Paid: {formatDate(invoice.paymentDate)}</div>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="text-xs sm:text-sm font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</div>
                        <div className="text-xs text-gray-500">
                          Paid: {formatCurrency(invoice.paidAmount)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.toUpperCase()}
                        </span>
                        {invoice.paymentMethod && (
                          <div className="mt-1 text-xs text-gray-500">
                            via {paymentMethods.find(m => m.value === invoice.paymentMethod)?.label}
                          </div>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setShowInvoiceDetails(true);
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                            title="View Details"
                          >
                            <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={() => handleSendInvoice(invoice.id)}
                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-colors duration-150"
                            title="Send Invoice"
                          >
                            <PaperAirplaneIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          {invoice.status !== 'paid' && (
                            <button
                              onClick={() => handleSendReminder(invoice.id)}
                              className="p-1 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100 rounded-full transition-colors duration-150"
                              title="Send Reminder"
                            >
                              <BellAlertIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
                      <DocumentTextIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                      <p className="text-xs sm:text-sm text-gray-500">No invoices found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                      <button 
                        onClick={() => setShowCreateInvoice(true)}
                        className="mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
                      >
                        Create New Invoice
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {currentInvoices.length > 0 && (
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-gray-500">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="p-1 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <span className="text-xs sm:text-sm text-gray-500">entries</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <span className="px-2 py-1 text-xs sm:text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Payments Table View */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Payment ID
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell min-w-[100px]">
                    Invoice
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    Customer
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Date
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Amount
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Method
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPayments.length > 0 ? (
                  sortedPayments.map((payment) => {
                    const PaymentMethodIcon = getPaymentMethodIcon(payment.paymentMethod);
                    return (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{payment.id}</div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 hidden sm:table-cell">
                          <div className="text-xs sm:text-sm text-gray-900">{payment.invoiceId}</div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">{payment.customerName}</div>
                          <div className="text-xs text-gray-500">{payment.customerId}</div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="text-xs sm:text-sm text-gray-900">{formatDate(payment.paymentDate)}</div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="text-xs sm:text-sm font-bold text-green-600">{formatCurrency(payment.amount)}</div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentMethodColor(payment.paymentMethod)} flex items-center`}>
                              <PaymentMethodIcon className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">{paymentMethods.find(m => m.value === payment.paymentMethod)?.label}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              onClick={() => handleViewTransactionDetails(payment)}
                              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                              title="View Transaction Details"
                            >
                              <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <button
                              onClick={() => alert(`Download receipt for ${payment.id}`)}
                              className="p-1 text-green-500 hover:text-green-700 hover:bg-green-100 rounded-full transition-colors duration-150"
                              title="Download Receipt"
                            >
                              <ArrowDownTrayIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
                      <CurrencyDollarIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                      <p className="text-xs sm:text-sm text-gray-500">No payments found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                      <button 
                        onClick={() => setShowRecordPayment(true)}
                        className="mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
                      >
                        Record Payment
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Activity Sidebar */}
      <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Outstanding Invoices Summary */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Outstanding Invoices Summary</h3>
          <div className="space-y-2 sm:space-y-3">
            {invoices
              .filter(inv => inv.balance > 0)
              .slice(0, 5)
              .map(invoice => (
                <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg">
                  <div className="mb-1 sm:mb-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-xs text-gray-500">{invoice.customerName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{formatCurrency(invoice.balance)}</div>
                    <div className="text-xs text-gray-500">Due {formatDate(invoice.dueDate)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Payment Methods</h3>
          <div className="space-y-3 sm:space-y-4">
            {paymentMethods.map(method => {
              const count = payments.filter(p => p.paymentMethod === method.value).length;
              const total = payments
                .filter(p => p.paymentMethod === method.value)
                .reduce((sum, p) => sum + p.amount, 0);
              
              if (count === 0) return null;
              
              const Icon = method.icon;
              
              return (
                <div key={method.value} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-1.5 sm:p-2 rounded-full ${getPaymentMethodColor(method.value).replace('text-', 'bg-').split(' ')[0]}`}>
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{method.label}</p>
                      <p className="text-xs text-gray-500">{count} payments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{formatCurrency(total)}</p>
                    <p className="text-xs text-gray-500">
                      {stats.totalPaymentAmount > 0 ? ((total / stats.totalPaymentAmount) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 animate-pulse">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-red-600 border-t-transparent mx-auto mb-2 sm:mb-3"></div>
            <p className="text-xs sm:text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={showCreateInvoice}
        onClose={() => setShowCreateInvoice(false)}
      />

      <RecordPaymentModal
        isOpen={showRecordPayment}
        onClose={() => setShowRecordPayment(false)}
      />

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        isOpen={showInvoiceDetails}
        onClose={() => {
          setShowInvoiceDetails(false);
          setSelectedInvoice(null);
        }}
      />

      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={showTransactionDetails}
        onClose={() => {
          setShowTransactionDetails(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
};

export default Billing;
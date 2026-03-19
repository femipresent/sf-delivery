import React, { useState, useEffect } from 'react';
import { CurrencyDollarIcon, CheckCircleIcon, ClockIcon, XCircleIcon, EyeIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, XMarkIcon, TruckIcon, MapPinIcon, CalendarIcon, CreditCardIcon, BuildingOfficeIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import API from '../api/axios';

const InvoicesAndPayments = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingLoading, setPayingLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoicesRes, paymentsRes] = await Promise.all([
          API.get('/payments/invoices').catch(() => ({ data: { data: [] } })),
          API.get('/payments/history').catch(() => ({ data: { data: [] } }))
        ]);
        setInvoices(invoicesRes.data.data || []);
        setPayments(paymentsRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => `₦${amount?.toLocaleString('en-NG') || '0'}`;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

  const stats = {
    total: invoices.reduce((s, i) => s + (i.amount || 0), 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((s, i) => s + (i.amount || 0), 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + (i.amount || 0), 0),
    paidCount: invoices.filter(i => i.status === 'paid').length,
    pendingCount: invoices.filter(i => i.status === 'pending').length,
    overdueCount: invoices.filter(i => i.status === 'overdue').length,
  };

  const filtered = invoices.filter(inv => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || inv.invoiceNumber?.toLowerCase().includes(q) || inv.booking?.trackingNumber?.toLowerCase().includes(q);
    const matchFilter = filterStatus === 'all' || inv.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const handlePayNow = async (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleInitiatePayment = async () => {
    if (!selectedInvoice) return;
    setPayingLoading(true);
    try {
      const res = await API.post('/payments/initialize', { invoiceId: selectedInvoice._id });
      if (res.data.data?.authorization_url) {
        window.location.href = res.data.data.authorization_url;
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Payment initialization failed');
    } finally {
      setPayingLoading(false);
      setShowPaymentModal(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'paid') return 'bg-green-100 text-green-800';
    if (status === 'overdue') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-200 border-t-green-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoices & Payments</h1>
        <p className="text-gray-600 mt-2">Manage your shipment invoices and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Amount', value: stats.total, icon: CurrencyDollarIcon, color: 'bg-blue-100 text-blue-600' },
          { label: 'Paid', value: stats.paid, sub: `${stats.paidCount} invoices`, icon: CheckCircleIcon, color: 'bg-green-100 text-green-600' },
          { label: 'Pending', value: stats.pending, sub: `${stats.pendingCount} invoices`, icon: ClockIcon, color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Overdue', value: stats.overdue, sub: `${stats.overdueCount} invoices`, icon: XCircleIcon, color: 'bg-red-100 text-red-600' },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${color.split(' ')[0]}`}>
                <Icon className={`w-6 h-6 ${color.split(' ')[1]}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(value)}</p>
                {sub && <p className="text-xs text-gray-500">{sub}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl mb-6 shadow-sm">
        <div className="flex border-b border-gray-200">
          {[['invoices', `Invoices (${invoices.length})`], ['payments', `Payment History (${payments.length})`]].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-center font-medium ${activeTab === tab ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><XMarkIcon className="w-4 h-4" /></button>}
            </div>
            <div className="flex space-x-2">
              {['all', 'paid', 'pending', 'overdue'].map(f => (
                <button key={f} onClick={() => setFilterStatus(f)} className={`px-3 py-1.5 text-sm font-medium rounded-full ${filterStatus === f ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'invoices' && (
            <div className="overflow-x-auto">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No invoices found</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Invoice', 'Shipment', 'Amount', 'Due Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((inv) => (
                      <tr key={inv._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{inv.invoiceNumber}</p>
                          <p className="text-sm text-gray-500">{formatDate(inv.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{inv.booking?.trackingNumber || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{inv.booking?.services || ''}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(inv.amount)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{formatDate(inv.dueDate)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => setSelectedInvoice(inv)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"><EyeIcon className="w-5 h-5" /></button>
                            {inv.status !== 'paid' && (
                              <button onClick={() => handlePayNow(inv)} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm">Pay Now</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="overflow-x-auto">
              {payments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No payment history found</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Reference', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4"><p className="font-medium text-gray-900">{p.reference}</p></td>
                        <td className="px-6 py-4"><p className="text-lg font-bold text-gray-900">{formatCurrency(p.amount)}</p></td>
                        <td className="px-6 py-4"><p className="text-sm text-gray-700">{p.channel || 'Paystack'}</p></td>
                        <td className="px-6 py-4"><p className="text-sm text-gray-900">{formatDate(p.paidAt || p.createdAt)}</p></td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Complete Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Invoice: {selectedInvoice.invoiceNumber}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-700">Amount Due:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(selectedInvoice.amount)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">You will be redirected to Paystack to complete your payment securely.</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg">Cancel</button>
              <button onClick={handleInitiatePayment} disabled={payingLoading} className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg">
                {payingLoading ? 'Processing...' : 'Pay with Paystack'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedInvoice && !showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invoice Details</h3>
              <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-500">Invoice #</span><span className="font-medium">{selectedInvoice.invoiceNumber}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-bold text-green-600">{formatCurrency(selectedInvoice.amount)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>{selectedInvoice.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Due Date</span><span className="font-medium">{formatDate(selectedInvoice.dueDate)}</span></div>
              {selectedInvoice.booking?.trackingNumber && <div className="flex justify-between"><span className="text-gray-500">Tracking #</span><span className="font-medium">{selectedInvoice.booking.trackingNumber}</span></div>}
            </div>
            <div className="flex space-x-3 mt-6">
              {selectedInvoice.status !== 'paid' && (
                <button onClick={() => { setShowPaymentModal(true); }} className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">Pay Now</button>
              )}
              <button onClick={() => setSelectedInvoice(null)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesAndPayments;

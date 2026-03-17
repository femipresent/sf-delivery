import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ShipperLayout from './components/layout/ShipperLayout';
import DriverLayout from './components/layout/DriverLayout';
import DispatcherLayout from './components/layout/DispatcherLayout';
import AdminDashboard from './components/layout/AdminDashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import BookShipment from './pages/BookShipment';
import TrackShipment from './pages/TrackShipment';
import ShipmentHistory from './pages/ShipmentHistory';
import ProofOfDelivery from './pages/ProofOfDelivery';
import InvoicesAndPayments from './pages/InvoicesAndPayments';
import ReportAndAnalytics from './pages/ReportAndAnalytics';
import ProfileAndSettings from './pages/ProfileAndSettings';

// Main App Component with Auth
const AppContent = () => {
  const { user, loading, logout } = useAuth();
  
  // Page state: 'landing' | 'shipper' | 'driver' | 'dispatcher' | 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    // Load from localStorage or default to landing
    const storedPage = localStorage.getItem('sf_currentPage');
    if (storedPage && user) {
      return storedPage;
    }
    return 'landing';
  });

  // Shipper state
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'book-shipment') return 'Book Shipment';
    if (hash === 'track-shipment') return 'Track Shipment';
    if (hash === 'shipment-history') return 'Shipment History';
    if (hash === 'proof-of-delivery') return 'Proof of Delivery';
    if (hash === 'invoices-and-payments') return 'Invoices & Payments';
    if (hash === 'reports-and-analytics') return 'Reports & Analytics';
    if (hash === 'profile-and-settings') return 'Profile & Settings';
    
    // Try to load from localStorage
    const storedTab = localStorage.getItem('sf_shipperTab');
    return storedTab || 'Dashboard';
  });

  // Driver state
  const [driverActiveTab, setDriverActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('sf_driverTab');
    return storedTab || 'Dashboard';
  });
  
  // Dispatcher state
  const [dispatcherActiveTab, setDispatcherActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('sf_dispatcherTab');
    return storedTab || 'dashboard';
  });

  // Admin state
  const [adminActiveModule, setAdminActiveModule] = useState(() => {
    const storedModule = localStorage.getItem('sf_adminModule');
    return storedModule || 'dashboard';
  });

  // Auth page states
  const [showLogin, setShowLogin] = useState(() => {
    return localStorage.getItem('sf_showLogin') === 'true';
  });
  const [showRegister, setShowRegister] = useState(() => {
    return localStorage.getItem('sf_showRegister') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(() => {
    return localStorage.getItem('sf_showAdminLogin') === 'true';
  });

  // Save states to localStorage
  useEffect(() => {
    if (currentPage !== 'landing') {
      localStorage.setItem('sf_currentPage', currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'shipper' && activeTab !== 'Dashboard') {
      localStorage.setItem('sf_shipperTab', activeTab);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    if (currentPage === 'driver') {
      localStorage.setItem('sf_driverTab', driverActiveTab);
    }
  }, [driverActiveTab, currentPage]);

  useEffect(() => {
    if (currentPage === 'dispatcher') {
      localStorage.setItem('sf_dispatcherTab', dispatcherActiveTab);
    }
  }, [dispatcherActiveTab, currentPage]);

  useEffect(() => {
    if (currentPage === 'admin') {
      localStorage.setItem('sf_adminModule', adminActiveModule);
    }
  }, [adminActiveModule, currentPage]);

  // Save auth page states to localStorage
  useEffect(() => {
    localStorage.setItem('sf_showLogin', showLogin.toString());
  }, [showLogin]);

  useEffect(() => {
    localStorage.setItem('sf_showRegister', showRegister.toString());
  }, [showRegister]);

  useEffect(() => {
    localStorage.setItem('sf_showAdminLogin', showAdminLogin.toString());
  }, [showAdminLogin]);

  // Initialize app based on authentication
  useEffect(() => {
    if (loading) return;

    // Don't auto-redirect to dashboard on page load
    // User must explicitly login to access their dashboard
    // This ensures landing page is always shown first
  }, [user, loading]);

  // Handle landing page buttons
  const handleShipperClick = () => {
    setCurrentPage('shipper');
    setActiveTab('Dashboard');
    localStorage.setItem('sf_shipperTab', 'Dashboard');
  };

  const handleDriverClick = () => {
    setCurrentPage('driver');
    setDriverActiveTab('Dashboard');
    localStorage.setItem('sf_driverTab', 'Dashboard');
  };
  
  const handleDispatcherClick = () => {
    setCurrentPage('dispatcher');
    setDispatcherActiveTab('dashboard');
    localStorage.setItem('sf_dispatcherTab', 'dashboard');
  };

  const handleAdminClick = () => {
    // Show admin login page
    setShowAdminLogin(true);
  };

  const handleBackToLanding = () => {
    logout(); // This will clear localStorage and set user to null
    setCurrentPage('landing');
    setShowLogin(false);
    setShowRegister(false);
    setShowAdminLogin(false);
    localStorage.removeItem('sf_currentPage');
    localStorage.removeItem('sf_shipperTab');
    localStorage.removeItem('sf_driverTab');
    localStorage.removeItem('sf_dispatcherTab');
    localStorage.removeItem('sf_adminModule');
    localStorage.removeItem('sf_showLogin');
    localStorage.removeItem('sf_showRegister');
    localStorage.removeItem('sf_showAdminLogin');
  };

  // Update URL hash when shipper tab changes
  useEffect(() => {
    if (currentPage !== 'shipper') return;
    
    let hash = '';
    switch (activeTab) {
      case 'Book Shipment':
        hash = 'book-shipment';
        break;
      case 'Track Shipment':
        hash = 'track-shipment';
        break;
      case 'Shipment History':
        hash = 'shipment-history';
        break;
      case 'Proof of Delivery':
        hash = 'proof-of-delivery';
        break;
      case 'Invoices & Payments':
        hash = 'invoices-and-payments';
        break;
      case 'Reports & Analytics':
        hash = 'reports-and-analytics';
        break;
      case 'Profile & Settings':
        hash = 'profile-and-settings';
        break;
      default:
        hash = '';
    }
    window.location.hash = hash;
  }, [activeTab, currentPage]);

  // Handler functions for ShipmentHistory
  const handleTrackShipment = (trackingNumber) => {
    if (trackingNumber) {
      setActiveTab('Track Shipment');
      localStorage.setItem('sf_shipperTab', 'Track Shipment');
      console.log('Tracking shipment:', trackingNumber);
    } else {
      setActiveTab('Track Shipment');
      localStorage.setItem('sf_shipperTab', 'Track Shipment');
    }
  };

  const handleBookShipment = () => {
    setActiveTab('Book Shipment');
    localStorage.setItem('sf_shipperTab', 'Book Shipment');
  };

  // Handler for LandingPage interactions
  const handleLandingLogin = (userType) => {
    // Show login page for all user types including admin
    setShowLogin(true);
  };

  const handleLandingSignup = (userType) => {
    setShowRegister(true);
  };

  // Handler for Get Started button - goes to signup page
  const handleGetStarted = (userType) => {
    setShowRegister(true);
  };

  // Handler for successful login from Login component
  const handleLoginSuccess = (userType) => {
    setCurrentPage(userType);
    setShowLogin(false);
    localStorage.removeItem('sf_showLogin');

    // Set default tabs based on user type
    switch(userType) {
      case 'shipper':
        setActiveTab('Dashboard');
        localStorage.setItem('sf_shipperTab', 'Dashboard');
        break;
      case 'driver':
        setDriverActiveTab('Dashboard');
        localStorage.setItem('sf_driverTab', 'Dashboard');
        break;
      case 'dispatcher':
        setDispatcherActiveTab('dashboard');
        localStorage.setItem('sf_dispatcherTab', 'dashboard');
        break;
    }
  };

  // Handler for successful admin login from AdminLogin component
  const handleAdminLoginSuccess = (userType) => {
    setCurrentPage(userType);
    setShowAdminLogin(false);
    localStorage.removeItem('sf_showAdminLogin');
    localStorage.setItem('sf_currentPage', 'admin');
  };

  // Handler for successful registration from Register component
  const handleRegisterSuccess = (userType, userData) => {
    setCurrentPage(userType);
    setShowRegister(false);
    localStorage.removeItem('sf_showRegister');

    switch(userType) {
      case 'shipper':
        setActiveTab('Dashboard');
        localStorage.setItem('sf_shipperTab', 'Dashboard');
        break;
      case 'driver':
        setDriverActiveTab('Dashboard');
        localStorage.setItem('sf_driverTab', 'Dashboard');
        break;
      case 'dispatcher':
        setDispatcherActiveTab('dashboard');
        localStorage.setItem('sf_dispatcherTab', 'dashboard');
        break;
      case 'admin':
        localStorage.setItem('sf_currentPage', 'admin');
        break;
    }
  };

  // Handler for back from auth pages
  const handleAuthBack = (target) => {
    if (target === 'login') {
      setShowRegister(false);
      setShowLogin(true);
    } else {
      setShowLogin(false);
      setShowRegister(false);
      setShowAdminLogin(false);
      setCurrentPage('landing');
      localStorage.removeItem('sf_showLogin');
      localStorage.removeItem('sf_showRegister');
      localStorage.removeItem('sf_showAdminLogin');
    }
  };

  // Render shipper content
  const renderShipperContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return null;
      case 'Book Shipment':
        return <BookShipment />;
      case 'Track Shipment':
        return <TrackShipment />;
      case 'Shipment History':
        return <ShipmentHistory 
          onTrackShipment={handleTrackShipment}
          onBookShipment={handleBookShipment}
        />;
      case 'Proof of Delivery':
        return <ProofOfDelivery />;
      case 'Invoices & Payments':
        return <InvoicesAndPayments />;
      case 'Reports & Analytics':
        return <ReportAndAnalytics />;
      case 'Profile & Settings':
        return <ProfileAndSettings onLogout={handleBackToLanding} />;
      default:
        return null; 
    }
  };

  // Show login page
  if (showLogin) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onBack={() => {
          setShowLogin(false);
          setCurrentPage('landing');
        }}
      />
    );
  }

  // Show admin login page
  if (showAdminLogin) {
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBack={() => {
          setShowAdminLogin(false);
          setCurrentPage('landing');
        }}
      />
    );
  }

  // Show register page
  if (showRegister) {
    return (
      <Register
        onRegisterSuccess={handleRegisterSuccess}
        onBack={handleAuthBack}
      />
    );
  }

  // Show landing page
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onLogin={handleLandingLogin}
        onSignup={handleLandingSignup}
        onAdminAccess={handleAdminClick}
      />
    );
  }

  // Show shipper dashboard
  if (currentPage === 'shipper') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShipperLayout 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onLogout={handleBackToLanding}
          user={user}
        >
          {renderShipperContent()}
        </ShipperLayout>
      </div>
    );
  }

  // Show driver dashboard
  if (currentPage === 'driver') {
    return (
      <div className="min-h-screen bg-gray-50">
        <DriverLayout 
          activeTab={driverActiveTab} 
          setActiveTab={setDriverActiveTab}
          onLogout={handleBackToLanding}
          user={user}
        />
      </div>
    );
  }

  // Show dispatcher dashboard
  if (currentPage === 'dispatcher') {
    return (
      <div className='min-h-screen bg-gray-50'>
        <DispatcherLayout
          activeModule={dispatcherActiveTab}
          onLogout={handleBackToLanding}
          user={user}
        />
      </div>
    );
  }

  // Show admin dashboard
  if (currentPage === 'admin') {
    return (
      <div className='min-h-screen bg-gray-50'>
        <AdminDashboard
          onLogout={handleBackToLanding}
          user={user}
          activeModule={adminActiveModule}
          onModuleChange={setAdminActiveModule}
        />
      </div>
    );
  }

  return null;
};

// Main App Component wrapped with AuthProvider and ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
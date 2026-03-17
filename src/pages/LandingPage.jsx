// LandingPage.jsx
import React from 'react';

const LandingPage = ({ onGetStarted, onLogin, onSignup, onAdminAccess }) => {
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-3 overflow-hidden border-2 border-green-500">
                <img
                  src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                  alt="S&F Delivery Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                S&F Delivery
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors font-medium text-sm"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors font-medium text-sm"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-600 hover:text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors font-medium text-sm"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors font-medium text-sm"
              >
                Contact
              </button>

              {onSignup ? (
                <button
                  onClick={() => onSignup('shipper')}
                  className="text-green-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              ) : null}

              <button
                onClick={() => onLogin('shipper')}
                className="text-green-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors text-sm"
              >
                Sign In
              </button>

              <button
                onClick={() => onGetStarted('shipper')}
                className="inline-flex items-center justify-center font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 rounded-full text-sm px-3 py-2"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menu">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 md:mt-10 mx-auto max-w-7xl">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block">Nigeria's Fastest</span>
                  <span className="block bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mt-1 md:mt-2">
                    Delivery Service
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
                  Ship anything, anywhere in Nigeria with real-time tracking, insured deliveries, and guaranteed on-time delivery.
                </p>
                
                <div className="mt-4 md:mt-6 space-y-2 sm:space-y-0 sm:flex sm:space-x-2 sm:items-center">
                  <button
                    onClick={() => onGetStarted('shipper')}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 rounded-lg text-sm px-3 py-2"
                  >
                    <span className="mr-1.5">🚚</span>
                    Start Shipping
                  </button>

                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-medium bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 active:scale-95 rounded-lg text-sm px-3 py-2"
                  >
                    <span className="mr-1.5">📖</span>
                    How It Works
                  </button>
                </div>
                
                <div className="mt-8 p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-full border border-green-100">
                  <p className="text-gray-700 mb-3 md:mb-4 text-base md:text-lg font-medium">Continue as:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => onLogin('shipper')}
                      className="inline-flex items-center justify-center font-medium bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition-all duration-200 active:scale-95 rounded-full px-4 py-2.5 text-sm md:text-base w-full sm:w-auto"
                    >
                      <span className="mr-2 text-base">📦</span>
                      Shipper
                    </button>
                    <button
                      onClick={() => onLogin('driver')}
                      className="inline-flex items-center justify-center font-medium bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition-all duration-200 active:scale-95 rounded-full px-4 py-2.5 text-sm md:text-base w-full sm:w-auto"
                    >
                      <span className="mr-2 text-base">🚛</span>
                      Driver
                    </button>
                    <button
                      onClick={() => onLogin('dispatcher')}
                      className="inline-flex items-center justify-center font-medium bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 transition-all duration-200 active:scale-95 rounded-full px-4 py-2.5 text-sm md:text-base w-full sm:w-auto"
                    >
                      <span className="mr-2 text-base">📋</span>
                      Dispatcher
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-4 text-center">
                    Already have an account?{' '}
                    <button 
                      onClick={() => onLogin('shipper')}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        <div className="hidden md:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-10 rounded-3xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="rounded-3xl shadow-2xl"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Delivery Service"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs md:text-base font-semibold text-green-600 uppercase mb-1 md:mb-2">
              Features
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose S&F Delivery
            </h3>
            <p className="mt-2 md:mt-4 text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most reliable delivery service across Nigeria
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🛡️</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Insured Deliveries</h4>
              <p className="text-sm md:text-base text-gray-600">Every shipment insured up to ₦5M. Your goods are protected.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">📍</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Real-Time Tracking</h4>
              <p className="text-sm md:text-base text-gray-600">Track shipments with GPS. Live updates from pickup to delivery.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">⏰</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">On-Time Guarantee</h4>
              <p className="text-sm md:text-base text-gray-600">98% on-time delivery rate. We guarantee arrival times.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Transparent Pricing</h4>
              <p className="text-sm md:text-base text-gray-600">No hidden fees. See exact costs before booking.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">📱</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Mobile App</h4>
              <p className="text-sm md:text-base text-gray-600">Manage everything on the go with our user-friendly app.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">👥</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-sm md:text-base text-gray-600">Round-the-clock support via phone, chat, and email.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs md:text-base font-semibold text-green-600 uppercase mb-1 md:mb-2">
              Process
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              How It Works
            </h3>
            <p className="mt-2 md:mt-4 text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get your items delivered in 4 simple steps
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl font-bold text-green-700 mb-4">
                1
              </div>
              <div className="text-2xl mb-2">📱</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Book Shipment</h4>
              <p className="text-gray-600">Enter shipment details and get instant quote</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl font-bold text-green-700 mb-4">
                2
              </div>
              <div className="text-2xl mb-2">📅</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Schedule Pickup</h4>
              <p className="text-gray-600">Choose pickup time and location</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl font-bold text-green-700 mb-4">
                3
              </div>
              <div className="text-2xl mb-2">📍</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Track Live</h4>
              <p className="text-gray-600">Real-time tracking from pickup to delivery</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl font-bold text-green-700 mb-4">
                4
              </div>
              <div className="text-2xl mb-2">✅</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Receive Delivery</h4>
              <p className="text-gray-600">Get confirmation when delivery is complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs md:text-base font-semibold text-green-600 uppercase mb-1 md:mb-2">
              Pricing
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h3>
            <p className="mt-2 md:mt-4 text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
              Pay only for what you ship with no hidden fees
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-md shadow border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Basic</h4>
              <div className="text-3xl font-bold text-gray-900 mb-4">₦500/kg</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Up to 10kg</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Next-day delivery</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Basic tracking</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <button
                onClick={() => onGetStarted('shipper')}
                className="w-full py-3 rounded-md font-medium bg-gray-100 text-gray-900 hover:bg-gray-200"
              >
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow border border-green-500 ring-2 ring-green-200">
              <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Most Popular
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Standard</h4>
              <div className="text-3xl font-bold text-gray-900 mb-4">₦400/kg</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Up to 50kg</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Same-day delivery</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Real-time tracking</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Insurance up to ₦100k</span>
                </li>
              </ul>
              <button
                onClick={() => onGetStarted('shipper')}
                className="w-full py-3 rounded-md font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Premium</h4>
              <div className="text-3xl font-bold text-gray-900 mb-4">₦300/kg</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Unlimited weight</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Express delivery</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Live GPS tracking</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">24/7 support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Insurance up to ₦500k</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
              </ul>
              <button
                onClick={() => onGetStarted('shipper')}
                className="w-full py-3 rounded-md font-medium bg-gray-100 text-gray-900 hover:bg-gray-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our team for any questions
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+234 800 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">support@sfdelivery.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Office</p>
                    <p className="text-gray-600">123 Lagos Street, Victoria Island, Lagos</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Send us a message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Your name" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="your@email.com" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
              Ready to ship with confidence?
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-xl text-green-100">
              Join thousands of satisfied customers across Nigeria
            </p>
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-0 md:flex md:gap-4 justify-center">
              <button
                onClick={() => onGetStarted('shipper')}
                className="w-full md:w-auto inline-flex items-center justify-center font-medium bg-white text-green-600 hover:bg-gray-100 shadow-xl transition-all duration-200 active:scale-95 rounded-full text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3"
              >
                <span className="mr-2">✨</span>
                Create Free Account
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full md:w-auto inline-flex items-center justify-center font-medium bg-transparent text-white border border-white hover:bg-green-800 transition-all duration-200 active:scale-95 rounded-full text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3"
              >
                <span className="mr-2">📞</span>
                Contact Sales
              </button>
            </div>
            <p className="mt-4 md:mt-6 text-green-200 text-xs md:text-sm">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Company',
                links: ['About', 'Careers', 'Press', 'Blog']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact Us', 'API Status', 'FAQ']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Cookie Policy', 'Compliance']
              },
              {
                title: 'Connect',
                links: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 md:mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <button className="text-sm md:text-base hover:text-white transition-colors">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2 md:mr-3 overflow-hidden">
                  <img
                    src="https://counseal.com/app/uploads/2024/04/website-featured-Grasping-the-Basics_-Business-Structures-in-Nigeria-1024x576.jpg"
                    alt="S&F Delivery Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg md:text-xl font-bold text-white">S&F Delivery</span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs md:text-sm text-gray-500">
                  © 2024 S&F Delivery. All rights reserved.
                  <span className="ml-2">
              <button
                onClick={onAdminAccess}
                className="text-xs text-blue-500 hover:text-blue-700 underline"
                title="Admin Access"
              >
                Staff Portal
              </button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
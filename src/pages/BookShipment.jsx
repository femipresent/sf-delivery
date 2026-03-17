
import React, { useState, useEffect, useRef, useMemo } from 'react';

const Loader = ({ size = 'md', color = 'green' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
 
  const colorClasses = {
    green: 'border-green-200 border-t-green-600',
    blue: 'border-blue-200 border-t-blue-600',
    white: 'border-gray-200 border-t-white'
  };
  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

const PulseLoader = () => (
  <div className="flex space-x-1">
    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const BookShipment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [shipmentType, setShipmentType] = useState('single');
  const [bulkData, setBulkData] = useState([]);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [calculatingQuote, setCalculatingQuote] = useState(false);
 
  const [shipmentData, setShipmentData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    pickupTime: '',
    serviceType: '',
    cargoType: '',
    weight: '',
    weightUnit: 'kg',
    length: '',
    width: '',
    height: '',
    dimensionsUnit: 'cm',
    quantity: '1',
    packaging: 'Box',
    specialHandling: '',
    description: '',
    senderName: '',
    senderCompany: '',
    senderEmail: '',
    senderPhone: '',
    receiverName: '',
    receiverCompany: '',
    receiverEmail: '',
    receiverPhone: '',
    quote: null,
    paymentMethod: 'pay_now',
    insurance: false,
    insuranceAmount: '50000',
    termsAccepted: false,
    documents: [],
    requiresCOD: false,
    codAmount: '',
    notes: ''
  });

  const [addressSuggestions, setAddressSuggestions] = useState({
    pickup: [],
    delivery: []
  });
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const addressInputTimeout = useRef(null);

  const serviceTypes = [
    { id: 'ftl', name: 'FTL (Full Truckload)', description: 'Dedicated truck for large shipments', basePrice: 45000, deliveryTime: '3-5 days' },
    { id: 'ltl', name: 'LTL (Less Than Truckload)', description: 'Shared truck space for smaller loads', basePrice: 12000, deliveryTime: '2-4 days' },
    { id: 'last_mile', name: 'Last-Mile Delivery', description: 'Local delivery service within cities', basePrice: 1800, deliveryTime: 'Same day' },
    { id: 'express', name: 'Express Delivery', description: 'Priority 1-2 business day delivery', basePrice: 2500, deliveryTime: '1-2 days' },
    { id: 'same_day', name: 'Same-Day Delivery', description: 'Delivery within 24 hours', basePrice: 3500, deliveryTime: 'Today' },
    { id: 'standard', name: 'Standard Delivery', description: '3-5 business days regular service', basePrice: 1500, deliveryTime: '3-5 days' },
  ];

  const cargoTypes = [
    'Documents', 'Electronics', 'Clothing & Textiles', 'Food Items', 'Medical Supplies',
    'Furniture', 'Machinery', 'Fragile Items', 'Temperature Sensitive', 'Hazardous Materials',
    'Automotive Parts', 'Construction Materials', 'Other'
  ];

  const packagingOptions = [
    'Box', 'Envelope', 'Pallet', 'Crate', 'Bag', 'Barrel', 'Carton', 'No Packaging'
  ];

  const insuranceOptions = [
    { value: '50000', label: 'Basic (₦50,000 Coverage)', price: 500 },
    { value: '100000', label: 'Standard (₦100,000 Coverage)', price: 1000 },
    { value: '250000', label: 'Premium (₦250,000 Coverage)', price: 2500 },
    { value: '500000', label: 'Comprehensive (₦500,000 Coverage)', price: 5000 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const downloadCSVTemplate = () => {
    const csvHeaders = [
      'Receiver Name*',
      'Receiver Phone*',
      'Receiver Email',
      'Receiver Company',
      'Delivery Address*',
      'Cargo Type*',
      'Weight (kg)*',
      'Quantity',
      'Packaging',
      'Description',
      'Special Instructions',
      'COD Amount',
      'Insurance (Yes/No)'
    ];
    const sampleData = [
      {
        'Receiver Name*': 'John Doe',
        'Receiver Phone*': '08012345678',
        'Receiver Email': 'john@example.com',
        'Receiver Company': 'ABC Corp',
        'Delivery Address*': '123 Main St, Lagos Island, Lagos',
        'Cargo Type*': 'Electronics',
        'Weight (kg)*': '5',
        'Quantity': '1',
        'Packaging': 'Box',
        'Description': 'Laptop shipment',
        'Special Instructions': 'Handle with care',
        'COD Amount': '0',
        'Insurance (Yes/No)': 'No'
      },
      {
        'Receiver Name*': 'Jane Smith',
        'Receiver Phone*': '08087654321',
        'Receiver Email': 'jane@example.com',
        'Receiver Company': 'XYZ Ltd',
        'Delivery Address*': '456 Market Rd, Abuja',
        'Cargo Type*': 'Documents',
        'Weight (kg)*': '0.5',
        'Quantity': '10',
        'Packaging': 'Envelope',
        'Description': 'Contract documents',
        'Special Instructions': 'Urgent delivery required',
        'COD Amount': '50000',
        'Insurance (Yes/No)': 'Yes'
      }
    ];
    let csvContent = csvHeaders.join(',') + '\n';
   
    sampleData.forEach(row => {
      const rowData = csvHeaders.map(header => {
        const value = row[header] || '';
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += rowData.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
   
    link.setAttribute('href', url);
    link.setAttribute('download', 'FreightFlow_Bulk_Shipment_Template.csv');
    link.style.visibility = 'hidden';
   
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setCsvLoading(true);
   
    const reader = new FileReader();
   
    reader.onload = (e) => {
      setTimeout(() => {
        const csvContent = e.target.result;
        const parsedData = parseCSV(csvContent);
        setBulkData(parsedData);
        setCsvLoading(false);
       
        const validCount = parsedData.filter(s => s.isValid).length;
        const invalidCount = parsedData.length - validCount;
       
        if (parsedData.length === 0) {
          alert('No data found in CSV file. Please check the format.');
        } else if (invalidCount > 0) {
          alert(`✅ ${validCount} valid shipments found\n⚠️ ${invalidCount} shipments have errors`);
        } else {
          alert(`✅ ${validCount} shipments successfully loaded and ready for booking!`);
        }
      }, 800);
    };
   
    reader.onerror = () => {
      setCsvLoading(false);
      alert('Error reading CSV file. Please try again.');
    };
   
    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    const shipments = [];
   
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      let values = [];
      let currentValue = '';
      let inQuotes = false;
     
      for (let char of line) {
        if (char === '"' && !inQuotes) {
          inQuotes = true;
        } else if (char === '"' && inQuotes) {
          inQuotes = false;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
     
      const shipment = {};
      headers.forEach((header, index) => {
        if (index < values.length) {
          let value = values[index];
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1).replace(/""/g, '"');
          }
          shipment[header] = value;
        }
      });
     
      const processedShipment = {
        id: i,
        receiverName: shipment['Receiver Name*'] || shipment['Receiver Name'] || '',
        receiverPhone: shipment['Receiver Phone*'] || shipment['Receiver Phone'] || '',
        receiverEmail: shipment['Receiver Email'] || '',
        receiverCompany: shipment['Receiver Company'] || '',
        deliveryAddress: shipment['Delivery Address*'] || shipment['Delivery Address'] || '',
        cargoType: shipment['Cargo Type*'] || shipment['Cargo Type'] || '',
        weight: shipment['Weight (kg)*'] || shipment['Weight'] || shipment['Weight (kg)'] || '',
        quantity: shipment['Quantity'] || '1',
        packaging: shipment['Packaging'] || 'Box',
        description: shipment['Description'] || '',
        specialInstructions: shipment['Special Instructions'] || shipment['Notes'] || '',
        codAmount: shipment['COD Amount'] || '0',
        insurance: (shipment['Insurance (Yes/No)'] || shipment['Insurance'] || 'No').toString().toLowerCase() === 'yes',
        status: 'pending',
        errors: []
      };
      const errors = [];
      if (!processedShipment.receiverName) errors.push('Receiver Name is required');
      if (!processedShipment.receiverPhone) errors.push('Receiver Phone is required');
      if (!processedShipment.deliveryAddress) errors.push('Delivery Address is required');
      if (!processedShipment.cargoType) errors.push('Cargo Type is required');
      if (!processedShipment.weight || isNaN(parseFloat(processedShipment.weight))) errors.push('Valid Weight is required');
     
      shipments.push({
        ...processedShipment,
        errors,
        isValid: errors.length === 0
      });
    }
    return shipments;
  };

  const processBulkShipments = () => {
    if (bulkData.length === 0) {
      alert('No bulk data to process. Please upload a CSV file first.');
      return;
    }
    const validShipments = bulkData.filter(s => s.isValid);
    const invalidShipments = bulkData.filter(s => !s.isValid);
    if (validShipments.length === 0) {
      alert('No valid shipments found. Please fix the errors in your CSV file.');
      return;
    }
    setBulkProcessing(true);
    setTimeout(() => {
      const trackingNumbers = validShipments.map((shipment, index) => ({
        ...shipment,
        trackingNumber: 'FF' + (Date.now() + index).toString().slice(-10),
        status: 'Booked',
        bookingDate: new Date().toISOString()
      }));
      const totalAmount = trackingNumbers.reduce((sum, shipment) => {
        const weight = parseFloat(shipment.weight) || 0;
        let basePrice = 1500;
        let weightCharge = weight <= 5 ? 0 : weight <= 20 ? 500 : weight <= 50 ? 1500 : weight * 50;
        let total = basePrice + weightCharge;
        if (shipment.insurance) total += 500;
        if (parseFloat(shipment.codAmount) > 0) total += parseFloat(shipment.codAmount) * 0.02;
        total *= 1.075;
       
        return sum + total;
      }, 0);
      alert(`✅ Bulk Booking Successful!\n\n📦 ${trackingNumbers.length} shipments booked\n💰 Total Amount: ₦${totalAmount.toLocaleString()}\n📧 Confirmation emails sent to all recipients`);
      setBulkData([]);
      setBulkProcessing(false);
      setShipmentType('single');
      setCurrentStep(1);
    }, 2000);
  };

  const removeBulkShipment = (id) => {
    setBulkData(prev => prev.filter(shipment => shipment.id !== id));
  };

  const getAddressSuggestions = async (query, type) => {
    if (!query || query.length < 2) {
      setAddressSuggestions(prev => ({
        ...prev,
        [type]: []
      }));
      return;
    }
    setLoadingSuggestions(true);
    
    const nigeriaCitiesAndStreets = [
      { id: 1, address: '1 Lekki-Ikoyi Link Road, Lekki, Lagos', description: 'Lekki, Lagos State - Premium Area' },
      { id: 2, address: '23 Admiralty Road, Lekki Phase 1, Lagos', description: 'Lekki Phase 1, Lagos State' },
      { id: 3, address: '5 Banana Island, Ikoyi, Lagos', description: 'Banana Island, Lagos State' },
      { id: 4, address: '12 Marina Drive, Marina, Lagos Island, Lagos', description: 'Marina, Lagos Island' },
      { id: 5, address: '456 Victoria Island Road, VI, Lagos', description: 'Victoria Island, Lagos State' },
      { id: 6, address: '78 Ikoyi Road, Ikoyi, Lagos', description: 'Ikoyi, Lagos State' },
      { id: 7, address: '234 Awolowo Road, Ikoyi, Lagos', description: 'Ikoyi, Lagos State - Upscale' },
      { id: 8, address: '321 Bishop Oluwole Street, Victoria Island, Lagos', description: 'Victoria Island, Lagos' },
      { id: 9, address: '567 Akin Adesola Street, Victoria Island, Lagos', description: 'Victoria Island, Lagos' },
      { id: 10, address: '89 Waziri Ibrahim Crescent, Victoria Island, Lagos', description: 'Victoria Island, Lagos State' },
      { id: 11, address: '234 Nnamdi Azikiwe Road, Ikeja, Lagos', description: 'Ikeja, Lagos State' },
      { id: 12, address: '456 Allen Avenue, Ikeja, Lagos', description: 'Ikeja, Lagos State' },
      { id: 13, address: '789 Opebi Road, Ikeja, Lagos', description: 'Opebi, Ikeja, Lagos' },
      { id: 14, address: '321 Oba Akran Avenue, Ikeja, Lagos', description: 'Ikeja, Lagos State' },
      { id: 15, address: '111 Alagomeji Road, Yaba, Lagos', description: 'Yaba, Lagos State' },
      { id: 16, address: '222 Sabo Road, Yaba, Lagos', description: 'Yaba, Lagos State' },
      { id: 17, address: '333 Balogun Street, Island, Lagos', description: 'Lagos Island, Lagos' },
      { id: 18, address: '444 Broad Street, Lagos Island, Lagos', description: 'Lagos Island, Lagos State' },
      { id: 19, address: '555 Apapa Wharf Road, Apapa, Lagos', description: 'Apapa, Lagos State' },
      { id: 20, address: '666 Lagos Port Road, Apapa, Lagos', description: 'Apapa, Lagos State' },
      { id: 21, address: '777 Ojodu Berger Avenue, Ojodu, Lagos', description: 'Ojodu, Lagos State' },
      { id: 22, address: '888 Iyana Ipaja Road, Lagos', description: 'Iyana Ipaja, Lagos' },
      { id: 23, address: '999 Surulere Avenue, Surulere, Lagos', description: 'Surulere, Lagos State' },
      { id: 24, address: '1010 Mushin Road, Mushin, Lagos', description: 'Mushin, Lagos State' },
      { id: 25, address: '1111 Shomolu Street, Shomolu, Lagos', description: 'Shomolu, Lagos State' },
      { id: 26, address: '1212 Bariga Road, Bariga, Lagos', description: 'Bariga, Lagos State' },
      { id: 27, address: '123 Cadastral Zone A02, Maitama, FCT Abuja', description: 'Maitama, FCT Abuja' },
      { id: 28, address: '456 Kasumu Road, Wuse II, Abuja', description: 'Wuse II, FCT Abuja' },
      { id: 29, address: '789 Gimbiya Road, Guzape, Abuja', description: 'Guzape, FCT Abuja' },
      { id: 30, address: '321 Plot 2A, Kofo Abayomi Street, Ikoyi, Abuja', description: 'Ikoyi, FCT Abuja' },
      { id: 31, address: '654 Cadastral Zone B02, Asokoro, Abuja', description: 'Asokoro, FCT Abuja' },
      { id: 32, address: '987 Dangote Road, Kado, Abuja', description: 'Kado, FCT Abuja' },
      { id: 33, address: '234 Jabi Road, Jabi, Abuja', description: 'Jabi, FCT Abuja' },
      { id: 34, address: '567 AO Road, Garki II, Abuja', description: 'Garki II, FCT Abuja' },
      { id: 35, address: '890 Plot 123, Aminu Kano Road, Wuse, Abuja', description: 'Wuse, FCT Abuja' },
      { id: 36, address: '111 Blantyre Street, Central Business District, Abuja', description: 'Central Business District, Abuja' },
      { id: 37, address: '123 Port Harcourt Road, Old GRA, Port Harcourt', description: 'Old GRA, Port Harcourt' },
      { id: 38, address: '456 Trans-Amadi Road, Port Harcourt', description: 'Trans-Amadi, Port Harcourt' },
      { id: 39, address: '789 Azikiwe Road, Port Harcourt', description: 'Azikiwe Road, Port Harcourt' },
      { id: 40, address: '321 GRA Phase II, Port Harcourt', description: 'GRA Phase II, Port Harcourt' },
      { id: 41, address: '654 Aba Road, Port Harcourt', description: 'Aba Road, Port Harcourt' },
      { id: 42, address: '987 Waterlines Avenue, Diobu, Port Harcourt', description: 'Diobu, Port Harcourt' },
      { id: 43, address: '123 Murtala Muhammad Way, GRA, Kano', description: 'GRA, Kano State' },
      { id: 44, address: '456 Audu Bako Road, Kano', description: 'Audu Bako Road, Kano' },
      { id: 45, address: '789 Cairo Road, Kano', description: 'Cairo Road, Kano State' },
      { id: 46, address: '321 Sabon Gari Road, Kano', description: 'Sabon Gari, Kano State' },
      { id: 47, address: '123 Abeokuta Road, Ibadan, Oyo', description: 'Abeokuta Road, Ibadan' },
      { id: 48, address: '456 Queen Elizabeth Road, Ibadan', description: 'Queen Elizabeth Road, Ibadan' },
      { id: 49, address: '789 Iwo Road, Ibadan, Oyo', description: 'Iwo Road, Ibadan' },
      { id: 50, address: '321 GRA, Ibadan, Oyo', description: 'GRA, Ibadan, Oyo State' },
      { id: 51, address: '123 Independence Layout, Enugu', description: 'Independence Layout, Enugu' },
      { id: 52, address: '456 Ogui Road, Enugu', description: 'Ogui Road, Enugu State' },
      { id: 53, address: '789 Nysc Road, Enugu', description: 'NYSC Road, Enugu' },
      { id: 54, address: '123 Sapele Road, Benin City', description: 'Sapele Road, Benin City' },
      { id: 55, address: '456 Auchi Road, Benin City', description: 'Auchi Road, Benin City' },
      { id: 56, address: '789 Akenzua Street, Benin City', description: 'Akenzua Street, Benin City' },
      { id: 57, address: '123 Adiabata Street, Calabar', description: 'Adiabata, Calabar' },
      { id: 58, address: '456 Calabar Road, Calabar', description: 'Calabar Road, Calabar' },
    ];
    
    const lowerQuery = query.toLowerCase();
    const filtered = nigeriaCitiesAndStreets.filter(item => 
      item.address.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
    
    setTimeout(() => {
      setAddressSuggestions(prev => ({
        ...prev,
        [type]: filtered.length > 0 ? filtered : [
          { id: 999, address: query, description: 'Use as typed address' }
        ]
      }));
      setLoadingSuggestions(false);
    }, 300);
  };

  const selectAddressSuggestion = (type, address) => {
    if (type === 'pickup') {
      setShipmentData(prev => ({ ...prev, pickupAddress: address.address }));
    } else {
      setShipmentData(prev => ({ ...prev, deliveryAddress: address.address }));
    }
    setAddressSuggestions(prev => ({
      ...prev,
      [type]: []
    }));
  };

  const calculateQuote = () => {
    setCalculatingQuote(true);
   
    setTimeout(() => {
      const selectedService = serviceTypes.find(s => s.id === shipmentData.serviceType);
      let basePrice = selectedService?.basePrice || 0;
     
      let weightCharge = 0;
      const weight = parseFloat(shipmentData.weight) || 0;
      if (weight > 0) {
        if (shipmentData.serviceType === 'ftl') {
          if (weight <= 5000) weightCharge = 0;
          else weightCharge = (weight - 5000) * 10;
        } else if (shipmentData.serviceType === 'ltl') {
          if (weight <= 100) weightCharge = 0;
          else if (weight <= 500) weightCharge = 1500;
          else if (weight <= 1000) weightCharge = 3500;
          else weightCharge = weight * 8;
        } else {
          if (weight <= 5) weightCharge = 0;
          else if (weight <= 20) weightCharge = 500;
          else if (weight <= 50) weightCharge = 1500;
          else if (weight <= 100) weightCharge = 3500;
          else weightCharge = weight * 50;
        }
      }
     
      let dimensionCharge = 0;
      const volume = (parseFloat(shipmentData.length) || 0) *
                    (parseFloat(shipmentData.width) || 0) *
                    (parseFloat(shipmentData.height) || 0) / 1000000;
      if (volume > 0.1) dimensionCharge = volume * 1000;
     
      const handlingCharge = shipmentData.specialHandling ? 1500 : 0;
     
      const selectedInsurance = insuranceOptions.find(ins => ins.value === shipmentData.insuranceAmount);
      const insuranceCharge = shipmentData.insurance ? (selectedInsurance?.price || 500) : 0;
     
      const codAmount = parseFloat(shipmentData.codAmount) || 0;
      const codCharge = shipmentData.requiresCOD ? codAmount * 0.02 : 0;
     
      const subtotal = basePrice + weightCharge + dimensionCharge + handlingCharge + insuranceCharge + codCharge;
      const vat = subtotal * 0.075;
      const total = subtotal + vat;
     
      const quote = {
        basePrice,
        weightCharge,
        dimensionCharge,
        handlingCharge,
        insuranceCharge,
        codCharge,
        subtotal,
        vat,
        total,
        estimatedDelivery: selectedService?.deliveryTime || '3-5 days',
        insuranceCoverage: shipmentData.insurance ? selectedInsurance?.value : 0
      };
     
      setShipmentData(prev => ({ ...prev, quote }));
      setCalculatingQuote(false);
    }, 800);
  };

  const handleInputChange = (field, value) => {
    setShipmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setShipmentData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index) => {
    setShipmentData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
       
        if (currentStep === 3) {
          calculateQuote();
        }
      } else {
        alert('Please fill in all required fields before proceeding.');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          shipmentData.pickupAddress &&
          shipmentData.deliveryAddress &&
          shipmentData.pickupDate &&
          shipmentData.serviceType
        );
      case 2:
        return shipmentData.weight && shipmentData.cargoType;
      case 3:
        return shipmentData.senderName && shipmentData.senderPhone &&
               shipmentData.receiverName && shipmentData.receiverPhone;
      case 4:
        return shipmentData.termsAccepted;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      const selectedService = serviceTypes.find(s => s.id === shipmentData.serviceType);
      
      const bookingPayload = {
        type: 'single',
        pickup: {
          address: {
            street: shipmentData.pickupAddress,
            city: shipmentData.pickupAddress.split(',')[1]?.trim() || 'Lagos',
            state: shipmentData.pickupAddress.split(',')[2]?.trim() || 'Lagos',
            country: 'Nigeria'
          },
          scheduledDate: shipmentData.pickupDate,
          scheduledTime: shipmentData.pickupDate + 'T' + (shipmentData.pickupTime?.split('-')[0] || '09:00') + ':00Z',
          contactPerson: shipmentData.senderName,
          contactPhone: shipmentData.senderPhone
        },
        delivery: {
          address: {
            street: shipmentData.deliveryAddress,
            city: shipmentData.deliveryAddress.split(',')[1]?.trim() || 'Abuja',
            state: shipmentData.deliveryAddress.split(',')[2]?.trim() || 'FCT',
            country: 'Nigeria'
          },
          reciepentName: shipmentData.receiverName,
          reciepentPhone: shipmentData.receiverPhone,
          deliveryInstructions: shipmentData.notes
        },
        services: {
          ftl: { selected: shipmentData.serviceType === 'ftl', price: 45000 },
          ltl: { selected: shipmentData.serviceType === 'ltl', price: 12000 },
          lastMile: { selected: shipmentData.serviceType === 'last_mile', price: 1800 },
          express: { selected: shipmentData.serviceType === 'express' || shipmentData.serviceType === 'same_day', price: 2500 }
        },
        itemDetails: {
          description: shipmentData.description || shipmentData.cargoType,
          weight: parseFloat(shipmentData.weight),
          dimensions: {
            length: parseFloat(shipmentData.length) || 0,
            width: parseFloat(shipmentData.width) || 0,
            height: parseFloat(shipmentData.height) || 0
          }
        }
      };

      const { default: API } = await import('../api/axios');
      const response = await API.post('/bookings', bookingPayload);
      const booking = response.data.data;

      alert(`✅ Shipment booked successfully!\n\n📦 Tracking Number: ${booking.trackingNumber}\n💰 Total Amount: ₦${booking.pricing.total.toLocaleString()}`);

      setCurrentStep(1);
      setSubmitting(false);
      setShipmentData({
        pickupAddress: '', deliveryAddress: '', pickupDate: '', pickupTime: '',
        serviceType: '', cargoType: '', weight: '', weightUnit: 'kg',
        length: '', width: '', height: '', dimensionsUnit: 'cm',
        quantity: '1', packaging: 'Box', specialHandling: '', description: '',
        senderName: '', senderCompany: '', senderEmail: '', senderPhone: '',
        receiverName: '', receiverCompany: '', receiverEmail: '', receiverPhone: '',
        quote: null, paymentMethod: 'pay_now', insurance: false,
        insuranceAmount: '50000', termsAccepted: false, documents: [],
        requiresCOD: false, codAmount: '', notes: ''
      });
    } catch (error) {
      alert(`❌ Booking failed: ${error.response?.data?.message || error.message}`);
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const RenderStep1 = ({ shipmentType, shipmentData, loadingSuggestions, addressSuggestions, handleInputChange, selectAddressSuggestion }) => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Shipment Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setShipmentType('single')}
            className={`p-4 border rounded-xl text-left transition-all ${
              shipmentType === 'single'
                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                : 'border-gray-300 hover:border-green-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                shipmentType === 'single' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Single Shipment</div>
                <div className="text-sm text-gray-600">Book one shipment at a time</div>
              </div>
            </div>
          </button>
         
          <button
            onClick={() => setShipmentType('bulk')}
            className={`p-4 border rounded-xl text-left transition-all ${
              shipmentType === 'bulk'
                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                : 'border-gray-300 hover:border-green-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                shipmentType === 'bulk' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Bulk Upload</div>
                <div className="text-sm text-gray-600">Upload multiple shipments via CSV</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {shipmentType === 'single' ? (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-900">Step 1: Shipment Details</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">Fill in pickup and delivery details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Pickup Information</h3>
              </div>
             
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                  <div className="relative">
                    <textarea
                      value={shipmentData.pickupAddress}
                      onChange={(e) => {
                        handleInputChange('pickupAddress', e.target.value);
                        getAddressSuggestions(e.target.value, 'pickup');
                      }}
                      placeholder="Start typing address... e.g., 123 Main St, Lagos"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows="3"
                      required
                    />
                    {loadingSuggestions && (
                      <div className="absolute right-3 top-3">
                        <Loader size="sm" color="green" />
                      </div>
                    )}
                   
                    {addressSuggestions.pickup.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {addressSuggestions.pickup.map(suggestion => (
                          <div
                            key={suggestion.id}
                            onClick={() => selectAddressSuggestion('pickup', suggestion)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{suggestion.address}</div>
                            <div className="text-sm text-gray-500">{suggestion.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">Start typing for address suggestions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
              </div>
             
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                  <div className="relative">
                    <textarea
                      value={shipmentData.deliveryAddress}
                      onChange={(e) => {
                        handleInputChange('deliveryAddress', e.target.value);
                        getAddressSuggestions(e.target.value, 'delivery');
                      }}
                      placeholder="Start typing address... e.g., 456 Market Rd, Abuja"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows="3"
                      required
                    />
                    {loadingSuggestions && (
                      <div className="absolute right-3 top-3">
                        <Loader size="sm" color="green" />
                      </div>
                    )}
                   
                    {addressSuggestions.delivery.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {addressSuggestions.delivery.map(suggestion => (
                          <div
                            key={suggestion.id}
                            onClick={() => selectAddressSuggestion('delivery', suggestion)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{suggestion.address}</div>
                            <div className="text-sm text-gray-500">{suggestion.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">Start typing for address suggestions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Pickup Schedule</h3>
              </div>
             
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                  <input
                    type="date"
                    value={shipmentData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    min={today}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <select
                    value={shipmentData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select preferred time</option>
                    <option value="08:00-10:00">Morning (8:00 AM - 10:00 AM)</option>
                    <option value="10:00-12:00">Late Morning (10:00 AM - 12:00 PM)</option>
                    <option value="12:00-14:00">Afternoon (12:00 PM - 2:00 PM)</option>
                    <option value="14:00-16:00">Late Afternoon (2:00 PM - 4:00 PM)</option>
                    <option value="16:00-18:00">Evening (4:00 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Service Type *</h3>
              </div>
             
              <div className="grid grid-cols-2 gap-3">
                {serviceTypes.slice(0, 4).map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleInputChange('serviceType', service.id)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      shipmentData.serviceType === service.id
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                        : 'border-gray-300 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                    <div className="text-sm font-semibold text-green-600 mt-2">₦{service.basePrice.toLocaleString()}</div>
                  </button>
                ))}
              </div>
             
              <div className="mt-2">
                <select
                  value={shipmentData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select service type...</option>
                  {serviceTypes.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ₦{service.basePrice.toLocaleString()} ({service.deliveryTime})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-900">Bulk Shipment Upload</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">Upload multiple shipments using a CSV template</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Download Template</h3>
                </div>
                <p className="text-gray-600">Get our CSV template with the correct format</p>
                <button
                  onClick={downloadCSVTemplate}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CSV Template
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 animate-pulse" style={{ animationDelay: '0.1s' }}>
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Fill & Upload</h3>
                </div>
                <p className="text-gray-600">Fill the template and upload your CSV file</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <div className="text-center">
                      {csvLoading ? (
                        <>
                          <div className="mx-auto h-12 w-12 flex items-center justify-center">
                            <Loader size="md" color="green" />
                          </div>
                          <p className="mt-1 text-sm text-gray-600">Processing CSV file...</p>
                          <div className="mt-2">
                            <PulseLoader />
                          </div>
                        </>
                      ) : (
                        <>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">Click to upload CSV file</p>
                          <p className="text-xs text-gray-500">CSV files only, up to 5MB</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 animate-pulse" style={{ animationDelay: '0.2s' }}>
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Review & Book</h3>
                </div>
                <p className="text-gray-600">Review shipments and book all at once</p>
                <button
                  onClick={processBulkShipments}
                  disabled={bulkData.length === 0 || bulkProcessing}
                  className={`w-full font-medium py-3 px-4 rounded-lg flex items-center justify-center ${
                    bulkData.length === 0 || bulkProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  {bulkProcessing ? (
                    <>
                      <Loader size="md" color="white" />
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Review & Book ({bulkData.length} shipments)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const RenderStep2 = ({ shipmentData, cargoTypes, packagingOptions, handleInputChange }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-blue-900">Step 2: Cargo Information</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">Provide details about your shipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cargo Type & Weight</h3>
          </div>
         
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type *</label>
              <select
                value={shipmentData.cargoType}
                onChange={(e) => handleInputChange('cargoType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select cargo type...</option>
                {cargoTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
           
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight *</label>
                <div className="flex">
                  <input
                    type="number"
                    value={shipmentData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                    step="0.01"
                    required
                  />
                  <select
                    value={shipmentData.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                    className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={shipmentData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Dimensions & Packaging</h3>
          </div>
         
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (Optional)</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="number"
                    value={shipmentData.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    placeholder="Length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={shipmentData.width}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    placeholder="Width"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={shipmentData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="Height"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
              </div>
              <div className="mt-1">
                <select
                  value={shipmentData.dimensionsUnit}
                  onChange={(e) => handleInputChange('dimensionsUnit', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-gray-50"
                >
                  <option value="cm">cm</option>
                  <option value="in">inches</option>
                  <option value="m">meters</option>
                </select>
              </div>
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Type</label>
              <select
                value={shipmentData.packaging}
                onChange={(e) => handleInputChange('packaging', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {packagingOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <span className="text-green-600 font-bold">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
        </div>
       
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Handling Instructions</label>
            <textarea
              value={shipmentData.specialHandling}
              onChange={(e) => handleInputChange('specialHandling', e.target.value)}
              placeholder="e.g., Fragile, Keep upright, Temperature sensitive, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="2"
            />
          </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={shipmentData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your shipment in detail..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const RenderStep3 = ({ shipmentData, handleInputChange }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-blue-900">Step 3: Contact Information</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">Provide sender and receiver details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Sender Information</h3>
          </div>
         
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={shipmentData.senderName}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={shipmentData.senderCompany}
                onChange={(e) => handleInputChange('senderCompany', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
           
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={shipmentData.senderEmail}
                  onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={shipmentData.senderPhone}
                  onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Receiver Information</h3>
          </div>
         
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={shipmentData.receiverName}
                onChange={(e) => handleInputChange('receiverName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={shipmentData.receiverCompany}
                onChange={(e) => handleInputChange('receiverCompany', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
           
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={shipmentData.receiverEmail}
                  onChange={(e) => handleInputChange('receiverEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={shipmentData.receiverPhone}
                  onChange={(e) => handleInputChange('receiverPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RenderStep4 = ({ shipmentData, calculatingQuote, handleInputChange, handleFileUpload, removeDocument, insuranceOptions }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-blue-900">Step 4: Review & Insurance</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">Review your shipment and add insurance if needed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Summary</h3>
           
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-medium">{shipmentData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup:</span>
                <span className="font-medium">{shipmentData.pickupAddress.substring(0, 30)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium">{shipmentData.deliveryAddress.substring(0, 30)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cargo:</span>
                <span className="font-medium">{shipmentData.cargoType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{shipmentData.weight} {shipmentData.weightUnit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Date:</span>
                <span className="font-medium">{shipmentData.pickupDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance</h3>
           
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={shipmentData.insurance}
                  onChange={(e) => handleInputChange('insurance', e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="insurance" className="ml-2 text-gray-700">Add insurance to my shipment</label>
              </div>
             
              {shipmentData.insurance && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Coverage</label>
                  <div className="space-y-2">
                    {insuranceOptions.map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          shipmentData.insuranceAmount === option.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="insuranceAmount"
                          value={option.value}
                          checked={shipmentData.insuranceAmount === option.value}
                          onChange={(e) => handleInputChange('insuranceAmount', e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-green-600">+₦{option.price.toLocaleString()}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
           
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-300 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                />
                <label htmlFor="document-upload" className="cursor-pointer">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Click to upload documents</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                  </div>
                </label>
              </div>
             
              {shipmentData.documents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                  {shipmentData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white border rounded">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm truncate max-w-xs">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash on Delivery</h3>
           
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requiresCOD"
                  checked={shipmentData.requiresCOD}
                  onChange={(e) => handleInputChange('requiresCOD', e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="requiresCOD" className="ml-2 text-gray-700">Require COD Collection</label>
              </div>
             
              {shipmentData.requiresCOD && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">COD Amount (₦)</label>
                  <input
                    type="number"
                    value={shipmentData.codAmount}
                    onChange={(e) => handleInputChange('codAmount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">2% COD fee will be applied</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
       
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={shipmentData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
              required
            />
            <label htmlFor="termsAccepted" className="ml-2 text-gray-700">
              I agree to the FreightFlow Terms of Service and confirm that all information provided is accurate. I understand that additional charges may apply for special handling requirements.
            </label>
          </div>
         
          <div className="mt-4">
            <button
              onClick={calculateQuote}
              disabled={calculatingQuote || !shipmentData.termsAccepted}
              className={`px-4 py-2 font-medium rounded-lg ${
                calculatingQuote || !shipmentData.termsAccepted
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02]'
              }`}
            >
              {calculatingQuote ? (
                <>
                  <Loader size="sm" color="white" />
                  <span className="ml-2">Calculating Quote...</span>
                </>
              ) : (
                'Calculate Shipping Quote'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RenderStep5 = ({ shipmentData, submitting, handleInputChange, handleSubmit, serviceTypes }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-blue-900">Step 5: Confirmation & Payment</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">Review your quote and complete booking</p>
      </div>

      {shipmentData.quote ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Quote</h3>
               
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">₦{shipmentData.quote.basePrice.toLocaleString()}</span>
                  </div>
                  {shipmentData.quote.weightCharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weight Charge:</span>
                      <span className="font-semibold">₦{shipmentData.quote.weightCharge.toLocaleString()}</span>
                    </div>
                  )}
                  {shipmentData.quote.dimensionCharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dimension Charge:</span>
                      <span className="font-semibold">₦{shipmentData.quote.dimensionCharge.toLocaleString()}</span>
                    </div>
                  )}
                  {shipmentData.quote.handlingCharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Handling Charge:</span>
                      <span className="font-semibold">₦{shipmentData.quote.handlingCharge.toLocaleString()}</span>
                    </div>
                  )}
                  {shipmentData.quote.insuranceCharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-semibold">₦{shipmentData.quote.insuranceCharge.toLocaleString()}</span>
                    </div>
                  )}
                  {shipmentData.quote.codCharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">COD Fee (2%):</span>
                      <span className="font-semibold">₦{shipmentData.quote.codCharge.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-gray-300 pt-3">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₦{shipmentData.quote.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">VAT (7.5%):</span>
                    <span className="font-semibold">₦{shipmentData.quote.vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-300 pt-3">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-green-600">₦{shipmentData.quote.total.toLocaleString()}</span>
                  </div>
                </div>
               
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Estimated Delivery:</span>
                    <span className="ml-2 font-bold">{shipmentData.quote.estimatedDelivery}</span>
                  </div>
                  {shipmentData.quote.insuranceCoverage > 0 && (
                    <div className="flex items-center mt-2">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Insurance Coverage:</span>
                      <span className="ml-2 font-bold">₦{shipmentData.quote.insuranceCoverage.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
               
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    shipmentData.paymentMethod === 'pay_now'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_now"
                      checked={shipmentData.paymentMethod === 'pay_now'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">Pay Now</div>
                      <div className="text-sm text-gray-600">Pay instantly with card or bank transfer</div>
                      <div className="text-sm text-green-600 mt-1">Get 5% discount on shipping</div>
                    </div>
                  </label>
                 
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    shipmentData.paymentMethod === 'pay_on_pickup'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_on_pickup"
                      checked={shipmentData.paymentMethod === 'pay_on_pickup'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">Pay on Pickup</div>
                      <div className="text-sm text-gray-600">Pay when our driver collects the package</div>
                    </div>
                  </label>
                 
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    shipmentData.paymentMethod === 'pay_on_delivery'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pay_on_delivery"
                      checked={shipmentData.paymentMethod === 'pay_on_delivery'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">Pay on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when package is delivered to receiver</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
               
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium">{serviceTypes.find(s => s.id === shipmentData.serviceType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cargo Type:</span>
                    <span className="font-medium">{shipmentData.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{shipmentData.weight} {shipmentData.weightUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Date:</span>
                    <span className="font-medium">{shipmentData.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receiver:</span>
                    <span className="font-medium">{shipmentData.receiverName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Ready to Book?</h3>
                <p className="text-gray-600">Click Book Shipment to confirm your booking</p>
              </div>
             
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`mt-4 md:mt-0 px-8 py-3 text-lg font-semibold rounded-full flex items-center justify-center ${
                  submitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02] transform transition-all'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader size="md" color="white" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Book Shipment - ₦{shipmentData.quote.total.toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Quote Available</h3>
          <p className="text-gray-600">Please go back to Step 4 and calculate your shipping quote first.</p>
          <button
            onClick={() => setCurrentStep(4)}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
          >
            Go Back to Step 4
          </button>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 md:p-6">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-xl animate-pulse mb-6">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Book Shipment</h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {shipmentType === 'single' ? 'Book a new shipment in 5 easy steps' : 'Upload multiple shipments via CSV'}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="mt-3 sm:mt-0 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm transition-all"
            >
              Back to Dashboard
            </button>
          </div>
         
          {shipmentType === 'single' && (
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      currentStep >= step ? 'bg-green-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${
                      currentStep >= step ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Details'}
                      {step === 2 && 'Cargo'}
                      {step === 3 && 'Contacts'}
                      {step === 4 && 'Review'}
                      {step === 5 && 'Confirm'}
                    </span>
                  </div>
                ))}
              </div>
             
              <div className="relative max-w-4xl mx-auto -mt-5">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-green-600 -translate-y-1/2 transition-all"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
       
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8">
          {shipmentType === 'single' ? (
            <>
              {currentStep === 1 && (
                <RenderStep1 
                  shipmentType={shipmentType}
                  shipmentData={shipmentData}
                  loadingSuggestions={loadingSuggestions}
                  addressSuggestions={addressSuggestions}
                  handleInputChange={handleInputChange}
                  selectAddressSuggestion={selectAddressSuggestion}
                />
              )}
              {currentStep === 2 && (
                <RenderStep2
                  shipmentData={shipmentData}
                  cargoTypes={cargoTypes}
                  packagingOptions={packagingOptions}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 3 && (
                <RenderStep3
                  shipmentData={shipmentData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 4 && (
                <RenderStep4
                  shipmentData={shipmentData}
                  calculatingQuote={calculatingQuote}
                  handleInputChange={handleInputChange}
                  handleFileUpload={handleFileUpload}
                  removeDocument={removeDocument}
                  insuranceOptions={insuranceOptions}
                />
              )}
              {currentStep === 5 && (
                <RenderStep5
                  shipmentData={shipmentData}
                  submitting={submitting}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  serviceTypes={serviceTypes}
                />
              )}
            </>
          ) : (
            <RenderStep1 
              shipmentType={shipmentType}
              shipmentData={shipmentData}
              loadingSuggestions={loadingSuggestions}
              addressSuggestions={addressSuggestions}
              handleInputChange={handleInputChange}
              selectAddressSuggestion={selectAddressSuggestion}
            />
          )}
         
          {shipmentType === 'single' && currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-5 py-2.5 font-medium rounded-full ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300 hover:scale-[1.02]'
                }`}
              >
                Previous
              </button>
             
              <button
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full hover:scale-[1.02]"
              >
                {currentStep === 4 ? 'Review & Get Quote' : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookShipment;
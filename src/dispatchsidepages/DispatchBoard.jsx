// ===== DISPATCH BOARD COMPONENT =====
const DispatchBoard= () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [autoDispatch, setAutoDispatch] = useState(false);
  const [selectedShipmentForQuickAction, setSelectedShipmentForQuickAction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Advanced filters
  const [filters, setFilters] = useState({
    shipmentType: 'all',
    priority: 'all',
    origin: 'all',
    destination: 'all',
    timeRange: 'today'
  });

  // Enhanced dispatch board with more columns
  const [dispatchBoard, setDispatchBoard] = useState({
    unassigned: [
      { 
        id: 'SH-7890', 
        type: 'FTL', 
        origin: 'Lagos', 
        destination: 'Abuja', 
        customer: 'ABC Manufacturing', 
        priority: 'high', 
        createdAt: '09:30 AM',
        cargo: { type: 'Electronics', weight: '150 kg', dimensions: '2.5 x 1.5 x 1.2 m', value: '₦2,500,000' },
        pickup: { address: '123 Warehouse St, Industrial Park', time: '10:30 AM', contact: 'John Smith', phone: '0803 123 4567' },
        delivery: { address: '456 Downtown Mall, City Center', time: '11:45 AM', contact: 'Sarah Johnson', phone: '0805 456 7890' },
        estimatedRevenue: '₦85,000',
        specialInstructions: 'Fragile - Handle with care'
      },
      { 
        id: 'SH-7891', 
        type: 'LTL', 
        origin: 'Ikeja', 
        destination: 'Victoria Island', 
        customer: 'XYZ Retail', 
        priority: 'medium', 
        createdAt: '10:15 AM',
        cargo: { type: 'Clothing', weight: '45 kg', dimensions: '1.5 x 1.0 x 0.8 m', value: '₦850,000' },
        pickup: { address: 'Retail Outlet, Ikeja', time: '11:00 AM', contact: 'Mr. Ade', phone: '0802 111 2222' },
        delivery: { address: 'Victoria Island Mall', time: '12:30 PM', contact: 'Mrs. Bello', phone: '0905 333 4444' },
        estimatedRevenue: '₦35,000',
        specialInstructions: 'Multiple packages'
      },
      { 
        id: 'SH-7892', 
        type: 'Express', 
        origin: 'Apapa', 
        destination: 'Ikeja', 
        customer: 'Tech Solutions Ltd', 
        priority: 'high', 
        createdAt: '10:45 AM',
        cargo: { type: 'IT Equipment', weight: '25 kg', dimensions: '1.0 x 0.8 x 0.6 m', value: '₦3,500,000' },
        pickup: { address: 'Apapa Port Terminal', time: '11:30 AM', contact: 'Mr. Johnson', phone: '0807 888 9999' },
        delivery: { address: 'Tech Park, Ikeja', time: '12:00 PM', contact: 'Ms. Williams', phone: '0818 777 6666' },
        estimatedRevenue: '₦45,000',
        specialInstructions: 'URGENT - Time sensitive'
      },
    ],
    
    assigned: [
      { 
        id: 'SH-7889', 
        driver: 'Musa Ibrahim', 
        vehicle: 'Toyota Hilux (LSD 123 XY)', 
        pickupTime: '11:00 AM', 
        status: 'en-route-pickup',
        driverPhone: '0808 123 4567',
        currentLocation: 'Ikeja',
        progress: 30,
        estimatedPickupETA: '15 mins',
        driverRating: 4.8,
        vehicleCapacity: '5 tons',
        driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop'
      },
      { 
        id: 'SH-7888', 
        driver: 'Chinedu Okoro', 
        vehicle: 'Ford Ranger (ABC 456 DE)', 
        pickupTime: '10:45 AM', 
        status: 'at-pickup',
        driverPhone: '0809 987 6543',
        currentLocation: 'Apapa Port',
        progress: 60,
        estimatedPickupETA: 'Arrived',
        driverRating: 4.6,
        vehicleCapacity: '3 tons',
        driverPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop'
      },
    ],
    
    pickup: [
      { 
        id: 'SH-7887', 
        driver: 'Amina Yusuf', 
        vehicle: 'Nissan Navara (XYZ 789 FG)', 
        deliveryETA: '12:30 PM', 
        currentLocation: 'Ibadan Expressway',
        driverPhone: '0812 345 6789',
        status: 'loading',
        progress: 45,
        loadingProgress: '75% loaded',
        nextStop: 'Lagos Mainland',
        trafficConditions: 'Moderate',
        driverPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop'
      },
    ],
    
    intransit: [
      { 
        id: 'SH-7886', 
        driver: 'Emeka Nwachukwu', 
        vehicle: 'Toyota Hiace (GHI 123 JK)', 
        deliveryETA: '1:15 PM', 
        currentLocation: 'Apapa',
        driverPhone: '0703 456 7890',
        status: 'in-transit',
        progress: 50,
        nextStop: 'Victoria Island',
        speed: '45 km/h',
        distanceRemaining: '12 km',
        lastUpdate: '5 mins ago',
        driverPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop'
      },
      { 
        id: 'SH-7885', 
        driver: 'Grace Okafor', 
        vehicle: 'Mitsubishi Canter (LMN 456 OP)', 
        deliveryETA: '2:30 PM', 
        currentLocation: 'Lekki-Epe Expressway',
        driverPhone: '0905 333 4444',
        status: 'in-transit',
        progress: 70,
        nextStop: 'Lekki Phase 1',
        speed: '60 km/h',
        distanceRemaining: '8 km',
        lastUpdate: '3 mins ago',
        driverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop'
      },
    ],
    
    delivery: [
      { 
        id: 'SH-7884', 
        driver: 'Ahmed Bello', 
        vehicle: 'Mercedes Sprinter (QRS 789 TU)', 
        deliveryETA: '11:45 AM', 
        currentLocation: 'Surulere',
        driverPhone: '0810 111 2222',
        status: 'at-delivery',
        progress: 90,
        deliveryAddress: '42 Allen Avenue, Ikeja',
        recipientName: 'Mr. Adebayo',
        recipientPhone: '0803 444 5555',
        podStatus: 'pending',
        driverPhoto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop'
      },
    ],
    
    completed: [
      { 
        id: 'SH-7883', 
        driver: 'John Okonkwo', 
        vehicle: 'Volvo Truck (VWX 123 YZ)', 
        deliveryTime: '10:15 AM', 
        status: 'delivered',
        deliveryProof: 'captured',
        rating: 5.0,
        revenue: '₦120,000',
        deliveryNotes: 'Customer satisfied, POD signed',
        driverPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop'
      },
    ],
    
    exceptions: [
      { 
        id: 'SH-7882', 
        driver: 'Samuel Eze', 
        vehicle: 'Toyota Hilux (AAA 111 BB)', 
        issue: 'failed-delivery',
        issueType: 'recipient-unavailable',
        status: 'exception',
        lastLocation: 'Victoria Island',
        attempts: 2,
        rescheduleTime: '3:00 PM',
        notes: 'Customer not available, will retry',
        driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop'
      },
    ]
  });

  // Available drivers for assignment
  const [availableDrivers, setAvailableDrivers] = useState([
    { id: 1, name: 'Musa Ibrahim', status: 'available', vehicle: 'Toyota Hilux', capacity: '5 tons', location: 'Ikeja', rating: 4.8, phone: '0808 123 4567', distance: '2.5 km' },
    { id: 2, name: 'Amina Yusuf', status: 'available', vehicle: 'Nissan Navara', capacity: '4 tons', location: 'Lekki', rating: 4.9, phone: '0812 345 6789', distance: '5.2 km' },
    { id: 3, name: 'Grace Okafor', status: 'available', vehicle: 'Mitsubishi Canter', capacity: '6 tons', location: 'Yaba', rating: 4.8, phone: '0905 333 4444', distance: '3.1 km' },
    { id: 4, name: 'Ahmed Bello', status: 'available', vehicle: 'Mercedes Sprinter', capacity: '3.5 tons', location: 'Surulere', rating: 4.7, phone: '0810 111 2222', distance: '4.8 km' },
  ]);

  // Board columns configuration
  const boardColumns = [
    { 
      key: 'unassigned', 
      title: 'Unassigned', 
      count: dispatchBoard.unassigned.length,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />
    },
    { 
      key: 'assigned', 
      title: 'Assigned', 
      count: dispatchBoard.assigned.length,
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-700',
      icon: <ClipboardIcon className="h-5 w-5" />
    },
    { 
      key: 'pickup', 
      title: 'Pickup', 
      count: dispatchBoard.pickup.length,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700',
      icon: <ArrowUpTrayIcon className="h-5 w-5" />
    },
    { 
      key: 'intransit', 
      title: 'In Transit', 
      count: dispatchBoard.intransit.length,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      icon: <TruckIcon className="h-5 w-5" />
    },
    { 
      key: 'delivery', 
      title: 'Delivery', 
      count: dispatchBoard.delivery.length,
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-700',
      icon: <MapPinIcon className="h-5 w-5" />
    },
    { 
      key: 'completed', 
      title: 'Completed', 
      count: dispatchBoard.completed.length,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
      icon: <CheckCircleIcon className="h-5 w-5" />
    },
    { 
      key: 'exceptions', 
      title: 'Exceptions', 
      count: dispatchBoard.exceptions.length,
      color: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-700',
      icon: <ExclamationTriangleIcon className="h-5 w-5" />
    },
  ];

  // Quick actions for shipments
  const quickActions = [
    { label: 'Assign Driver', icon: UserCircleIcon, action: 'assign' },
    { label: 'View Details', icon: EyeIcon, action: 'view' },
    { label: 'Track Live', icon: MapIcon, action: 'track' },
    { label: 'Call Customer', icon: PhoneIcon, action: 'call-customer' },
    { label: 'Update Status', icon: PencilIcon, action: 'update' },
    { label: 'Add Notes', icon: DocumentTextIcon, action: 'notes' },
  ];

  // ===== FUNCTIONS =====
  
  // Filter shipments based on search and filters
  const filterShipments = (shipments, columnKey) => {
    let filtered = [...shipments];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(shipment => 
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (shipment.customer && shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (shipment.driver && shipment.driver.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (shipment.origin && shipment.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (shipment.destination && shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply type filter
    if (filters.shipmentType !== 'all') {
      filtered = filtered.filter(shipment => shipment.type === filters.shipmentType);
    }
    
    // Apply priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(shipment => shipment.priority === filters.priority);
    }
    
    return filtered;
  };

  // Handle drag start
  const handleDragStart = (e, shipmentId, fromColumn) => {
    e.dataTransfer.setData('shipmentId', shipmentId);
    e.dataTransfer.setData('fromColumn', fromColumn);
    setDragActive(true);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, toColumn) => {
    e.preventDefault();
    setDragActive(false);
    
    const shipmentId = e.dataTransfer.getData('shipmentId');
    const fromColumn = e.dataTransfer.getData('fromColumn');
    
    if (fromColumn === toColumn) return;
    
    // Find the shipment
    let shipmentToMove = null;
    setDispatchBoard(prev => {
      const newBoard = { ...prev };
      
      // Remove from source column
      Object.keys(newBoard).forEach(column => {
        const index = newBoard[column].findIndex(s => s.id === shipmentId);
        if (index !== -1) {
          shipmentToMove = newBoard[column][index];
          newBoard[column].splice(index, 1);
        }
      });
      
      // Add to target column with updated status
      if (shipmentToMove) {
        let updatedShipment = { ...shipmentToMove };
        
        // Update status based on target column
        switch(toColumn) {
          case 'assigned':
            updatedShipment.status = 'assigned';
            break;
          case 'pickup':
            updatedShipment.status = 'at-pickup';
            break;
          case 'intransit':
            updatedShipment.status = 'in-transit';
            break;
          case 'delivery':
            updatedShipment.status = 'at-delivery';
            break;
          case 'completed':
            updatedShipment.status = 'delivered';
            updatedShipment.deliveryTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            break;
          case 'exceptions':
            updatedShipment.status = 'exception';
            break;
        }
        
        newBoard[toColumn].push(updatedShipment);
      }
      
      return newBoard;
    });
  };

  // Auto-assign function
  const handleAutoAssign = () => {
    if (dispatchBoard.unassigned.length === 0 || availableDrivers.length === 0) return;
    
    const shipmentsToAssign = [...dispatchBoard.unassigned].slice(0, 2); // Assign max 2 at once
    const availableDriversCopy = [...availableDrivers].filter(d => d.status === 'available');
    
    if (availableDriversCopy.length === 0) return;
    
    setDispatchBoard(prev => {
      const newBoard = { ...prev };
      const newAssigned = [];
      const remainingUnassigned = newBoard.unassigned.filter(shipment => 
        !shipmentsToAssign.some(s => s.id === shipment.id)
      );
      
      shipmentsToAssign.forEach((shipment, index) => {
        if (index < availableDriversCopy.length) {
          const driver = availableDriversCopy[index];
          const assignedShipment = {
            ...shipment,
            driver: driver.name,
            vehicle: driver.vehicle,
            driverPhone: driver.phone,
            driverPhoto: driver.photo,
            status: 'assigned',
            pickupTime: 'Now',
            progress: 10,
            driverRating: driver.rating,
            vehicleCapacity: driver.capacity
          };
          newAssigned.push(assignedShipment);
          
          // Update driver status
          setAvailableDrivers(prevDrivers => 
            prevDrivers.map(d => d.id === driver.id ? { ...d, status: 'on-job' } : d)
          );
        }
      });
      
      return {
        ...newBoard,
        unassigned: remainingUnassigned,
        assigned: [...newBoard.assigned, ...newAssigned]
      };
    });
  };

  // Quick assign to specific driver
  const handleQuickAssign = (shipmentId, driverId) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    if (!driver) return;
    
    setDispatchBoard(prev => {
      const newBoard = { ...prev };
      const shipmentIndex = newBoard.unassigned.findIndex(s => s.id === shipmentId);
      
      if (shipmentIndex !== -1) {
        const shipment = newBoard.unassigned[shipmentIndex];
        const assignedShipment = {
          ...shipment,
          driver: driver.name,
          vehicle: driver.vehicle,
          driverPhone: driver.phone,
          driverPhoto: driver.photo,
          status: 'assigned',
          pickupTime: 'Now',
          progress: 10,
          driverRating: driver.rating,
          vehicleCapacity: driver.capacity
        };
        
        // Remove from unassigned
        newBoard.unassigned.splice(shipmentIndex, 1);
        // Add to assigned
        newBoard.assigned.push(assignedShipment);
        
        // Update driver status
        setAvailableDrivers(prevDrivers => 
          prevDrivers.map(d => d.id === driverId ? { ...d, status: 'on-job' } : d)
        );
      }
      
      return newBoard;
    });
  };

  // Mark as delivered
  const handleMarkDelivered = (shipmentId) => {
    setDispatchBoard(prev => {
      const newBoard = { ...prev };
      
      // Find shipment in any column except completed
      let deliveredShipment = null;
      let sourceColumn = null;
      
      Object.keys(newBoard).forEach(column => {
        if (column !== 'completed') {
          const index = newBoard[column].findIndex(s => s.id === shipmentId);
          if (index !== -1) {
            deliveredShipment = newBoard[column][index];
            sourceColumn = column;
            newBoard[column].splice(index, 1);
          }
        }
      });
      
      if (deliveredShipment) {
        const completedShipment = {
          ...deliveredShipment,
          status: 'delivered',
          deliveryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          deliveryProof: 'pending',
          rating: null
        };
        
        newBoard.completed.push(completedShipment);
        
        // If there was a driver, make them available again
        if (deliveredShipment.driver) {
          setAvailableDrivers(prev => 
            prev.map(d => d.name === deliveredShipment.driver ? { ...d, status: 'available' } : d)
          );
        }
      }
      
      return newBoard;
    });
  };

  // Add new shipment
  const handleAddNewShipment = () => {
    const newId = `SH-${Math.floor(Math.random() * 9000 + 1000)}`;
    const types = ['FTL', 'LTL', 'Express', 'Same Day'];
    const origins = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'];
    const destinations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'];
    const customers = ['ABC Manufacturing', 'XYZ Retail', 'Tech Solutions', 'Global Logistics', 'Prime Suppliers'];
    const priorities = ['low', 'medium', 'high'];
    
    const newShipment = {
      id: newId,
      type: types[Math.floor(Math.random() * types.length)],
      origin: origins[Math.floor(Math.random() * origins.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      customer: customers[Math.floor(Math.random() * customers.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cargo: { 
        type: ['Electronics', 'Clothing', 'Food', 'Construction', 'Pharmaceuticals'][Math.floor(Math.random() * 5)],
        weight: `${Math.floor(Math.random() * 500) + 50} kg`,
        dimensions: `${(Math.random() * 3 + 1).toFixed(1)} x ${(Math.random() * 2 + 0.5).toFixed(1)} x ${(Math.random() * 1.5 + 0.5).toFixed(1)} m`,
        value: `₦${(Math.random() * 5000000 + 500000).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
      },
      pickup: {
        address: ['Industrial Park', 'Warehouse District', 'Commercial Area', 'Port Terminal'][Math.floor(Math.random() * 4)],
        time: 'ASAP',
        contact: ['John Smith', 'Sarah Johnson', 'Mr. Ade', 'Mrs. Bello'][Math.floor(Math.random() * 4)],
        phone: `080${Math.floor(Math.random() * 9000000 + 1000000)}`
      },
      delivery: {
        address: ['City Center', 'Business District', 'Residential Area', 'Industrial Zone'][Math.floor(Math.random() * 4)],
        time: 'Today',
        contact: ['Michael Brown', 'Jessica Wilson', 'Mr. Chukwu', 'Mrs. Adebayo'][Math.floor(Math.random() * 4)],
        phone: `081${Math.floor(Math.random() * 9000000 + 1000000)}`
      },
      estimatedRevenue: `₦${(Math.random() * 100000 + 20000).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`,
      specialInstructions: ['Fragile', 'Temperature controlled', 'Urgent', 'Multiple stops'][Math.floor(Math.random() * 4)]
    };
    
    setDispatchBoard(prev => ({
      ...prev,
      unassigned: [newShipment, ...prev.unassigned]
    }));
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return { class: 'bg-red-100 text-red-800', label: 'High' };
      case 'medium': return { class: 'bg-yellow-100 text-yellow-800', label: 'Medium' };
      case 'low': return { class: 'bg-green-100 text-green-800', label: 'Low' };
      default: return { class: 'bg-gray-100 text-gray-800', label: 'Normal' };
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'unassigned': return { class: 'bg-red-100 text-red-800', label: 'Unassigned' };
      case 'assigned': return { class: 'bg-yellow-100 text-yellow-800', label: 'Assigned' };
      case 'at-pickup': return { class: 'bg-orange-100 text-orange-800', label: 'At Pickup' };
      case 'loading': return { class: 'bg-blue-100 text-blue-800', label: 'Loading' };
      case 'in-transit': return { class: 'bg-purple-100 text-purple-800', label: 'In Transit' };
      case 'at-delivery': return { class: 'bg-indigo-100 text-indigo-800', label: 'At Delivery' };
      case 'delivered': return { class: 'bg-green-100 text-green-800', label: 'Delivered' };
      case 'exception': return { class: 'bg-gray-100 text-gray-800', label: 'Exception' };
      default: return { class: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  // Shipment Card Component
  const ShipmentCard = ({ shipment, columnKey }) => {
    const priorityBadge = getPriorityBadge(shipment.priority);
    const statusBadge = getStatusBadge(shipment.status);
    
    return (
      <div 
        draggable
        onDragStart={(e) => handleDragStart(e, shipment.id, columnKey)}
        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all cursor-move group"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="font-semibold text-gray-900">{shipment.id}</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${priorityBadge.class}`}>
              {priorityBadge.label}
            </span>
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setSelectedShipmentForQuickAction(shipment)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Quick Actions">
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </button>
            <button 
              onClick={() => handleViewShipmentDetails(shipment)}
              className="p-1 hover:bg-gray-100 rounded"
              title="View Details">
              <EyeIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Shipment Info */}
        <div className="mb-3">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPinIcon className="h-4 w-4 mr-1 text-green-500" />
            <span>{shipment.origin} → {shipment.destination}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            {shipment.customer}
          </div>
          {shipment.cargo && (
            <div className="text-xs text-gray-500">
              {shipment.cargo.type} • {shipment.cargo.weight}
            </div>
          )}
        </div>
        
        {/* Driver/Vehicle Info (if assigned) */}
        {(shipment.driver || shipment.vehicle) && (
          <div className="flex items-center mb-3 p-2 bg-gray-50 rounded-lg">
            {shipment.driverPhoto ? (
              <img 
                src={shipment.driverPhoto} 
                alt={shipment.driver}
                className="h-6 w-6 rounded-full mr-2"
              />
            ) : (
              <UserCircleIcon className="h-6 w-6 text-gray-400 mr-2" />
            )}
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-900">{shipment.driver}</div>
              <div className="text-xs text-gray-500">{shipment.vehicle}</div>
            </div>
            {shipment.driverRating && (
              <div className="flex items-center text-xs text-yellow-600">
                <SignalIcon className="h-3 w-3 mr-1" />
                {shipment.driverRating}
              </div>
            )}
          </div>
        )}
        
        {/* Status & Progress */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.class}`}>
            {statusBadge.label}
          </span>
          
          {shipment.progress !== undefined && (
            <div className="flex items-center">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${shipment.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{shipment.progress}%</span>
            </div>
          )}
        </div>
        
        {/* Quick Action Buttons */}
        {columnKey === 'unassigned' && availableDrivers.filter(d => d.status === 'available').length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Quick Assign:</div>
            <div className="flex flex-wrap gap-1">
              {availableDrivers
                .filter(d => d.status === 'available')
                .slice(0, 2)
                .map(driver => (
                  <button
                    key={driver.id}
                    onClick={() => handleQuickAssign(shipment.id, driver.id)}
                    className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center"
                  >
                    <UserCircleIcon className="h-3 w-3 mr-1" />
                    {driver.name.split(' ')[0]}
                  </button>
                ))}
            </div>
          </div>
        )}
        
        {columnKey === 'delivery' && (
          <button
            onClick={() => handleMarkDelivered(shipment.id)}
            className="mt-3 w-full py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-all"
          >
            Mark Delivered
          </button>
        )}
      </div>
    );
  };

  // Quick Actions Modal
  const QuickActionsModal = () => {
    if (!selectedShipmentForQuickAction) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-500">{selectedShipmentForQuickAction.id}</p>
            </div>
            <button
              onClick={() => setSelectedShipmentForQuickAction(null)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Handle action based on type
                    switch(action.action) {
                      case 'assign':
                        handleAssignDriver(selectedShipmentForQuickAction);
                        break;
                      case 'view':
                        handleViewShipmentDetails(selectedShipmentForQuickAction);
                        break;
                      case 'track':
                        handleTrackShipment(selectedShipmentForQuickAction);
                        break;
                      case 'call-customer':
                        handleCallDriver(selectedShipmentForQuickAction.pickup?.phone);
                        break;
                    }
                    setSelectedShipmentForQuickAction(null);
                  }}
                  className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 flex flex-col items-center justify-center"
                >
                  <action.icon className="h-6 w-6 text-gray-700 mb-2" />
                  <span className="text-xs text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filters Panel
  const FiltersPanel = () => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 mb-4 ${showFilters ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Shipment Type</label>
          <select
            value={filters.shipmentType}
            onChange={(e) => setFilters({ ...filters, shipmentType: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Types</option>
            <option value="FTL">FTL</option>
            <option value="LTL">LTL</option>
            <option value="Express">Express</option>
            <option value="Same Day">Same Day</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
          <select
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Origins</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Ibadan">Ibadan</option>
            <option value="Kano">Kano</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setFilters({
            shipmentType: 'all',
            priority: 'all',
            origin: 'all',
            destination: 'all',
            timeRange: 'today'
          })}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispatch Board</h1>
            <p className="text-gray-600">Manage and track all shipments in real-time</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shipments..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
              title="Filters"
            >
              <FunnelIcon className="h-5 w-5 text-gray-500" />
            </button>
            
            <button
              onClick={handleAutoAssign}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md"
            >
              Auto-Dispatch
            </button>
            
            <button
              onClick={handleAddNewShipment}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              New Shipment
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
        {boardColumns.map(column => (
          <div 
            key={column.key}
            className={`${column.color} border rounded-xl p-3 flex items-center justify-between`}
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${column.color.replace('bg-', 'bg-').replace('-50', '-100')} mr-3`}>
                {column.icon}
              </div>
              <div>
                <div className={`text-sm font-medium ${column.textColor}`}>{column.title}</div>
                <div className="text-lg font-bold text-gray-900">{column.count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Panel */}
      <FiltersPanel />

      {/* Drag & Drop Board */}
      <div className={`mb-6 ${dragActive ? 'bg-blue-50' : ''}`}>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {boardColumns.map(column => {
            const filteredShipments = filterShipments(dispatchBoard[column.key], column.key);
            
            return (
              <div 
                key={column.key}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.key)}
                className={`flex-shrink-0 w-80 ${column.color} border rounded-xl p-3 min-h-[600px]`}
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between mb-4 p-2 rounded-lg ${column.color.replace('-50', '-100')}`}>
                  <div className="flex items-center">
                    {column.icon}
                    <span className="ml-2 font-medium text-gray-900">{column.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${column.textColor.replace('text-', 'bg-').replace('-700', '-100')}`}>
                      {filteredShipments.length}
                    </span>
                  </div>
                </div>
                
                {/* Shipment Cards */}
                <div className="space-y-2">
                  {filteredShipments.map(shipment => (
                    <ShipmentCard 
                      key={shipment.id} 
                      shipment={shipment} 
                      columnKey={column.key}
                    />
                  ))}
                  
                  {filteredShipments.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <div className="p-3 rounded-full bg-gray-100 inline-block mb-2">
                        {column.key === 'unassigned' ? (
                          <QuestionMarkCircleIcon className="h-8 w-8" />
                        ) : column.key === 'completed' ? (
                          <CheckCircleIcon className="h-8 w-8" />
                        ) : (
                          <ClipboardIcon className="h-8 w-8" />
                        )}
                      </div>
                      <p className="text-sm">No shipments</p>
                    </div>
                  )}
                </div>
                
                {/* Add button for unassigned column */}
                {column.key === 'unassigned' && (
                  <button
                    onClick={handleAddNewShipment}
                    className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-gray-500 hover:text-gray-700 flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Shipment
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Drivers Panel */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Available Drivers</h3>
            <p className="text-sm text-gray-500">{availableDrivers.filter(d => d.status === 'available').length} drivers ready for assignment</p>
          </div>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {availableDrivers
            .filter(driver => driver.status === 'available')
            .map(driver => (
              <div key={driver.id} className="border border-gray-200 rounded-xl p-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{driver.name}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <TruckIcon className="h-3 w-3 mr-1" />
                      {driver.vehicle}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-medium">{driver.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Distance</div>
                    <div className="font-medium">{driver.distance}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Capacity</div>
                    <div className="font-medium">{driver.capacity}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Rating</div>
                    <div className="font-medium flex items-center">
                      <SignalIcon className="h-3 w-3 mr-1 text-yellow-500" />
                      {driver.rating}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleCallDriver(driver.phone)}
                    className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center justify-center"
                  >
                    <PhoneIcon className="h-3 w-3 mr-1" />
                    Call
                  </button>
                  <button
                    onClick={() => handleTextDriver(driver)}
                    className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-lg flex items-center justify-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" />
                    Message
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions Modal */}
      <QuickActionsModal />
    </div>
  );
};

// Export or use it in your main component
export default DispatchBoard;
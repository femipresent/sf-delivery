import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Hook for tracking a shipment's live location
export const useShipmentTracking = (bookingId) => {
    const [driverLocation, setDriverLocation] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!bookingId) return;

        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('track:join', bookingId);
        });

        socketRef.current.on('location:update', (data) => {
            setDriverLocation({ lat: data.lat, lng: data.lng, timestamp: data.timestamp });
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [bookingId]);

    return { driverLocation };
};

// Hook for driver to send location updates
export const useDriverLocation = (driverId) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!driverId) return;

        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('driver:join', driverId);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [driverId]);

    const sendLocation = (bookingId, lat, lng) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('driver:location', { bookingId, lat, lng, driverId });
        }
    };

    return { sendLocation };
};

export default useShipmentTracking;

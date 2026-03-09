import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../utils/constants';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const clientRef = useRef(null);

    useEffect(() => {
        const wsUrl = API_BASE_URL.endsWith('/api')
            ? API_BASE_URL.replace('/api', '/ws')
            : `${API_BASE_URL}/ws`;

        const client = new Client({
            webSocketFactory: () => new SockJS(wsUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket Server');
                setConnected(true);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketClose: () => {
                console.log('WebSocket Connection Closed');
                setConnected(false);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ client: clientRef.current, connected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketClient = () => {
    return useContext(WebSocketContext);
};

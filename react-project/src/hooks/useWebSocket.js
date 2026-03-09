import { useEffect, useRef } from 'react';
import { useWebSocketClient } from '../context/WebSocketContext';

export const useWebSocket = (topic, onMessageReceived) => {
    const { client, connected } = useWebSocketClient();
    const subscriptionRef = useRef(null);

    const callbackRef = useRef(onMessageReceived);
    useEffect(() => {
        callbackRef.current = onMessageReceived;
    }, [onMessageReceived]);

    useEffect(() => {
        if (!connected || !client) return;

        subscriptionRef.current = client.subscribe(topic, (message) => {
            if (message.body) {
                try {
                    const parsedMessage = JSON.parse(message.body);
                    if (callbackRef.current) {
                        callbackRef.current(parsedMessage);
                    }
                } catch (e) {
                    console.error("Error parsing websocket message", e);
                }
            }
        });

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [topic, connected, client]);

    return { connected };
};

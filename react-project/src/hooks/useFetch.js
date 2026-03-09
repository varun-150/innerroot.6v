import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/constants';

export const useFetch = (endpoint, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(options.headers || {})
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]); // Note: In a real app, wrap `options` with useMemo or stringify it to avoid infinite loops

    return { data, loading, error };
};

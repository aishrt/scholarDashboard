import { useState } from 'react';
import storage from '../utils/storage';
import { api } from '../utils/api';

const useGetData = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = async (endpoint: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const token = storage.getToken();
      const response = await api.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading, error };
};

export default useGetData;

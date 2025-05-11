import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { env } from '../utils/env';

interface FetchOptions {
  verifyAuth?: boolean;
  headers?: Record<string, string>;
}

const useDeleteData = <R>(endpoint: string, options?: FetchOptions) => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = useCallback(async () => {
    setLoading(true);
    try {
      let headers = {
        ...options?.headers,
      };

      if (options?.verifyAuth) {
        headers = {
          ...headers,
          Authorization: `Bearer your_token_here`,
        };
      }

      const response = await api.delete(endpoint, { headers });
      setData(response.data);
      setError(null);

      if (env.enableLogging) {
        toast.success('Data deleted successfully!');
      }
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      if (env.enableLogging) {
        toast.error('Failed to delete data');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  return { data, loading, error, deleteData };
};

export default useDeleteData;

// const { data, loading, error, deleteData } = useDeleteData<MyResponseType>("/api/example");

// const handleDelete = async () => {
//   await deleteData();
// };

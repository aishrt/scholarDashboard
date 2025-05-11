import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { env } from '../utils/env';
import storage from '../utils/storage';

interface FetchOptions {
  verifyAuth?: boolean;
  headers?: Record<string, string>;
}

const usePutData = <T, R>(endpoint: string, options?: FetchOptions) => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = useCallback(
    async (payload: T) => {
      setLoading(true);
      try {
        let headers = {
          ...options?.headers,
        };

        if (options?.verifyAuth) {
          headers = {
            ...headers,
            Authorization: `Bearer ${storage.getToken()}`,
          };
        }

        const response = await api.put(endpoint, payload, { headers });
        setData(response.data);
        setError(null);

        if (env.enableLogging) {
          toast.success(response?.data?.message || 'Data updated successfully!');
        }
        return response.data;
      } catch (err: any) {
        console.error("Error updating data:", err);
        setError(err.response?.data?.message || err.message);
        if (env.enableLogging) {
          toast.error(err.response?.data?.message || 'Failed to update data');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  return { data, loading, error, putData };
};

export default usePutData;

// const { data, loading, error, putData } = usePutData<MyRequestType, MyResponseType>("/api/example");

// const handleUpdate = async () => {
//   const payload = { name: "John Doe", age: 31 };
//   await putData(payload);
// };

import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { env } from '../utils/env';
import storage from '../utils/storage';

interface FetchOptions {
  verifyAuth?: boolean;
  headers?: Record<string, string>;
}

const usePostData = <T, R>(endpoint: string, options?: FetchOptions) => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = useCallback(
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

        const response = await api.post(endpoint, payload, { headers });
        setData(response.data);
        setError(null);

        if (env.enableLogging) {
          toast.success(response?.data?.message || 'Data posted successfully!');
        }
        return response.data;
      } catch (err: any) {
        console.log("err-----------", err);
        setError(err.response?.data?.message || err.message);
        if (env.enableLogging) {
          toast.error(err.response?.data?.message || 'Failed to post data');
        }
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  return { data, loading, error, postData };
};

export default usePostData;

// const { data, loading, error, postData } = usePostData<MyRequestType, MyResponseType>("/api/example");

// const handleSubmit = async () => {
//   const payload = { name: "John Doe", age: 30 };
//   await postData(payload);
// };

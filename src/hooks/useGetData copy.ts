import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

interface FetchOptions extends AxiosRequestConfig {
  verifyAuth?: boolean;
}

const useGetData = <T>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let headers = {
        'Content-Type': 'application/json',
        ...options?.headers,
      };

      if (options?.verifyAuth) {
        headers = {
          ...headers,
          Authorization: `Bearer your_token_here`,
        };
      }

      const axiosConfig: AxiosRequestConfig = {
        method: options?.method || 'GET',
        ...options,
        headers,
        url,
      };
      toast.success('Data fetched !');

      const response = await axios(axiosConfig);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetData;

// const { data, loading, error, refetch } = useGetData<Product[]>("/api/products", {
//   verifyAuth: true,
// });

// // Trigger a manual refetch
// <button onClick={refetch}>Reload Data</button>

// ++++++++++++++++++++++++++++++++++++++++++++++

// import { useState, useEffect } from "react";

// interface FetchOptions extends RequestInit {
//   verifyAuth?: boolean;
// }

// const useFetch = <T>(url: string, options?: FetchOptions) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Default headers
//         let headers: HeadersInit = {
//           "Content-Type": "application/json",
//           ...options?.headers, // Merge user-defined headers
//         };

//         // If verifyAuth is true, add Authorization header
//         if (options?.verifyAuth) {
//           headers = {
//             ...headers,
//             Authorization: `Bearer your_token_here`,
//           };
//         }

//         // Default method: GET (unless overridden in options)
//         const fetchOptions: RequestInit = {
//           method: "GET",
//           ...options, // Merge user-defined options
//           headers, // Use the merged headers
//         };

//         const response = await fetch(url, fetchOptions);
//         if (!response.ok) {
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const result: T = await response.json();
//         setData(result);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, options]);

//   return { data, loading, error };
// };

// export default useFetch;

// import { useState, useEffect } from 'react';
// const useExampleHook = () => {
//     const [data, setData] = useState<any>(null);
//     const [loading, setLoading] = useState<any>(true);
//     const [error, setError] = useState<any>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://fakestoreapi.com/products');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const result = await response.json();
//                 setData(result);
//             } catch (err) {
//                 setError(err as any);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return { data, loading, error };
// };

// export default useExampleHook;

// =================================================

// import { useState, useEffect } from 'react';

// interface FetchOptions extends RequestInit {}

// const useFetch = <T,>(url: string, options?: FetchOptions) => {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (!url) return;

//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await fetch(url, options);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//                 }
//                 const result = await response.json();
//                 setData(result);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An unknown error occurred');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url, JSON.stringify(options)]);

//     return { data, loading, error };
// };

// export default useFetch;

// const { data, loading, error } = useFetch<ResponseType>('https://api.example.com/delete/1', {
//     method: 'DELETE',
//     headers: {
//         'Authorization': 'Bearer your_token_here',
//     },
// });

// =================================================

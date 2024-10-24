import { useState, useEffect } from "react";

type FetchDataResult<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

export const useFetchData = <T,>(url: string): FetchDataResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result.products || result);
      } catch (error) {
        setError((error as Error).message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url]);

  return { data, loading, error };
};

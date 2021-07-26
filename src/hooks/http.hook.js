import { useState, useCallback } from "react";

const api = "https://link-minimizer.herokuapp.com";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(api + url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError };
};

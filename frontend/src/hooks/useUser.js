import { BACKEND_URL } from "@/app/constants";
import useSWR from "swr";

export default function useUser(id) {
  async function fetcher([url, options]) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const error = new Error();
        error.message = "Unable to fetch user data";
        throw error;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      const error = new Error();
      error.name = "Unable to fetch user data";
      error.message = err.message;
      throw error;
    }
  }

  const { data, error, isLoading, mutate } = useSWR(
    [
      `${BACKEND_URL}/api/contacts/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true, // bypass ngrok browser warning
        },
      },
    ],
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

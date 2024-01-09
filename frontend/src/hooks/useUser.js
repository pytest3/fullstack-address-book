import { BACKEND_URL } from "@/app/constants";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function useUser(id) {
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

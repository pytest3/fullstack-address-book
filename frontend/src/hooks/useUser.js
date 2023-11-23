import useSWR from "swr";

export default function useUser(id) {
  async function fetcher(url) {
    try {
      const res = await fetch(url);
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
    `http://localhost:3000/api/contacts/${id}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default async function fetcher([url, options]) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const error = new Error();
      error.message = "Network response was not ok";
      throw error;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    const error = new Error();
    error.name = "Unable to fetch data";
    error.message = err.message;
    throw error;
  }
}

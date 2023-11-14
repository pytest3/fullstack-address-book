export async function sendRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
}

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

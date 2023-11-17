import React from "react";

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        isSuccess: false,
        isError: true,
        isPending: false,
        isLoading: false,
      };
    case "success":
      return {
        ...state,
        isSuccess: true,
        isError: false,
        isPending: false,
        isLoading: false,
        response: action.response,
      };
    case "pending":
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isPending: true,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isPending: false,
        isLoading: true,
      };
  }
}

export function useHttp(url) {
  const [state, dispatch] = React.useReducer(reducer, {
    isSuccess: false,
    isError: false,
    isPending: false,
    isLoading: false,
    response: null,
  });

  // dispatch({ type: "pending" });

  async function sendRequest(method = "GET", body) {
    const options = {
      method: method,
      headers: {
        Accept: "application/json", // for get request
        "Content-Type": "application/json", // for put / post
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    dispatch({ type: "pending" });

    try {
      dispatch({ type: "loading" });

      const response = await fetch(url, options);

      if (!response.ok) {
        dispatch({ type: "error" });
        throw new Error("Network response was not OK");
      }

      const data = await response.json();

      dispatch({ type: "success", data });

      console.log(data);

      return data;
    } catch (err) {
      dispatch({ type: "error" });
      console.log({
        status: "error",
        error: { message: err.message || "cannot create contact" },
      });
    }
  }

  return { sendRequest, ...state };
}

"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

export default function page() {
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, error, isLoading } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );

  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(data);
  }, [data]);

  console.log(data);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "cancel" : "edit"}
      </button>
      <form>
        <label>{data.name}</label>
        <input
          type="text"
          onChange={(e) => {
            setValue({ ...value, full_name: e.target.value });
          }}
          value={value ? value.full_name : ""}
        ></input>
      </form>
    </div>
  );
}

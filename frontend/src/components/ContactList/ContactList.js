"use client";

import React from "react";
import useSWR from "swr";
import styles from "./styles.module.css";

export default function ContactList() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/contacts",
    fetcher
  );

  console.log(data);

  if (error) return <div>Failed to fetch data</div>;
  if (isLoading) return <div>Loading data</div>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Birthday</th>
          <th>Marital status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, first_name, last_name, birthday, marital_status }) => {
          return (
            <tr>
              <td>{id} </td>
              <td>{first_name} </td>
              <td>{last_name} </td>
              <td>{new Date(birthday).toLocaleDateString()} </td>
              <td>{marital_status} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

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
    <table
      className={styles.table}
      style={{ "--vertical-padding": "5px", "--horizontal-padding": "15px" }}
    >
      <thead>
        <tr>
          <th>Id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Birthday</th>
          <th>Marital status</th>
          <th>Emails</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({ id, first_name, last_name, birthday, marital_status, emails }) => {
            const count = 2;
            return (
              <React.Fragment key={id}>
                <tr key={id}>
                  <td
                    className={`${styles.bottomPaddingBorder} ${styles.topPadding}`}
                    rowSpan={count}
                  >
                    {id}
                  </td>
                  <td
                    className={`${styles.bottomPaddingBorder} ${styles.topPadding}`}
                    rowSpan={count}
                  >
                    {first_name}
                  </td>
                  <td
                    className={`${styles.bottomPaddingBorder} ${styles.topPadding}`}
                    rowSpan={count}
                  >
                    {last_name}
                  </td>
                  <td
                    className={`${styles.bottomPaddingBorder} ${styles.topPadding}`}
                    rowSpan={count}
                  >
                    {new Date(birthday).toLocaleDateString()}
                  </td>
                  <td
                    className={`${styles.bottomPaddingBorder} ${styles.topPadding}`}
                    rowSpan={count}
                  >
                    {marital_status}
                  </td>
                  <td className={styles.topPadding}>
                    {emails[0]?.email_address}
                  </td>
                </tr>
                <tr>
                  <td className={styles.bottomPaddingBorder}>
                    {emails[1]?.email_address}
                  </td>
                </tr>
              </React.Fragment>
            );
          }
        )}
      </tbody>
    </table>
  );
}

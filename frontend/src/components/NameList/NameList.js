"use client";

import React from "react";
import styles from "./NameList.module.css";
import { UserCircle2 } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";

export default function NameList() {
  async function fetcher(...args) {
    const res = await fetch(...args, {
      headers: { Accept: "application/json" },
    });
    return res.json();
  }

  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:3000/api/contacts",
  //   fetcher
  // );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Unable to fetch data. Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.map(({ id, first_name, last_name }) => {
        return (
          <article key={id} className={styles.card}>
            <InitialsAvatar
              avatarWrapperStyles={styles.avatarWrapper}
              avatarStyles={styles.avatar}
              firstName={first_name}
              lastName={last_name}
            />
            <div className={styles.name}>{first_name}</div>
            <div className={styles.job}>{last_name}</div>
          </article>
        );
      })}
    </div>
  );
}

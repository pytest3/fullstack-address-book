"use client";

import React from "react";
import styles from "./NameList.module.css";
import { UserCircle2 } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";

export default function NameList() {
  async function fetcher(...args) {
    const res = await fetch(...args, {
      headers: { Accept: "application/json" },
    });
    return res.json();
  }

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/contacts",
    fetcher
  );

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
          <Link
            key={id}
            href={`./contact-details/${id}`}
            className={styles.link}
          >
            <article
              key={id}
              className={styles.card}
              onClick={() => console.log(id)}
            >
              <InitialsAvatar
                firstName={first_name}
                lastName={last_name}
                className={styles.initialsAvatar}
                fontSize="20px"
                circleSize="52px"
              />
              <div className={styles.name}>{first_name}</div>
              <div className={styles.job}>{last_name}</div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
